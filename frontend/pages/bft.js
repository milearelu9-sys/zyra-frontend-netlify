import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

function randn(mean = 0, std = 1) {
  // Box-Muller
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Ultra-advanced HotStuff-like simulator (simplified, no crypto). Supports view changes and pacemaker jitter.
function BFT() {
  const [cfg, setCfg] = useState({
    n: 4,
    f: 1,
    leaderPolicy: 'round-robin', // or 'sticky'
    baseLatency: 120, // ms
    jitter: 40, // ms
    dropRate: 0.02, // 2%
    timeout: 1200, // ms per view
    optimistic: true,
    byzantine: [], // indices of byz nodes
  });
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.25x - 4x
  const [view, setView] = useState(1);
  const [height, setHeight] = useState(1); // committed height
  const [lockedQC, setLockedQC] = useState(null);
  const [log, setLog] = useState([]);
  const [safety, setSafety] = useState({ equivocations: 0, safetyOk: true });
  const [liveness, setLiveness] = useState({ stalledViews: 0, lastCommitView: 0 });

  const nodes = useMemo(() => Array.from({ length: cfg.n }, (_, i) => ({
    id: i,
    lockedView: 0,
    highQC: 0,
    votedView: 0,
    byz: cfg.byzantine.includes(i),
  })), [cfg]);

  const eventsRef = useRef([]); // pending network events
  const tRef = useRef({ now: 0, deadline: cfg.timeout });
  const leaderRef = useRef(0);
  const stateRef = useRef({
    view: 1,
    proposeQC: 0,
    genVotes: new Set(),
    preCommitVotes: new Set(),
    commitVotes: new Set(),
    chain: [], // {view, blockId}
  });

  useEffect(() => { tRef.current.deadline = cfg.timeout; }, [cfg.timeout]);

  function leaderFor(v) {
    if (cfg.leaderPolicy === 'sticky') return leaderRef.current;
    return (v - 1) % cfg.n;
  }

  function schedule(from, to, type, payload) {
    if (Math.random() < cfg.dropRate) return; // drop
    const latency = clamp(
      randn(cfg.baseLatency, cfg.jitter),
      Math.max(5, cfg.baseLatency - 3 * cfg.jitter),
      cfg.baseLatency + 3 * cfg.jitter
    );
    const at = tRef.current.now + Math.max(1, latency / speed);
    eventsRef.current.push({ at, from, to, type, payload });
  }

  function broadcast(from, type, payload) {
    for (let to = 0; to < cfg.n; to++) {
      if (to === from) continue;
      schedule(from, to, type, payload);
    }
  }

  function appendLog(line) {
    setLog((l) => [line, ...l.slice(0, 199)]);
  }

  function startView(v) {
    const leader = leaderFor(v);
    if (cfg.leaderPolicy === 'sticky') leaderRef.current = leader;
    stateRef.current.view = v;
    stateRef.current.genVotes.clear();
    stateRef.current.preCommitVotes.clear();
    stateRef.current.commitVotes.clear();
    tRef.current.deadline = tRef.current.now + Math.max(50, cfg.timeout / speed);
    appendLog(`▶ view ${v} leader n${leader}`);
    // leader proposes
    proposeBlock(leader, v);
  }

  function proposeBlock(leader, v) {
    const blockId = `${v}-${Math.random().toString(36).slice(2, 6)}`;
    stateRef.current.chain.push({ view: v, blockId });
    const payload = { v, blockId, justifyQC: Math.max(lockedQC || 0, stateRef.current.proposeQC || 0) };
    // Byzantine leader may equivocate
    if (nodes[leader].byz) {
      const blockId2 = `${v}-X${Math.random().toString(36).slice(2, 4)}`;
      broadcast(leader, 'PROPOSE', { ...payload, blockId });
      broadcast(leader, 'PROPOSE', { ...payload, blockId: blockId2 });
      setSafety((s) => ({ ...s, equivocations: s.equivocations + 1, safetyOk: false }));
      appendLog(`⚠ leader n${leader} equivocated in view ${v}`);
    } else {
      broadcast(leader, 'PROPOSE', payload);
    }
  }

  function onPropose(msg) {
    const { v, blockId, justifyQC } = msg.payload;
    const node = nodes[msg.to];
    if (v !== stateRef.current.view) return; // stale
    // vote if safe (HotStuff safety: v > node.lockedView and justifyQC >= node.lockedView)
    const safe = v > node.lockedView && justifyQC >= node.lockedView;
    if (!safe) return;
    node.highQC = Math.max(node.highQC, justifyQC, v - 1);
    node.votedView = v;
    // Byzantine node may vote randomly
    if (node.byz && Math.random() < 0.5) return;
    schedule(msg.to, leaderFor(v), 'VOTE-GEN', { v, blockId });
  }

  function onVoteGen(msg) {
    const { v, blockId } = msg.payload;
    if (v !== stateRef.current.view) return;
    stateRef.current.genVotes.add(msg.from);
    if (stateRef.current.genVotes.size >= cfg.n - cfg.f) {
      // got QC for generic phase
      stateRef.current.proposeQC = v;
      // progress to pre-commit votes
      broadcast(leaderFor(v), 'VOTE-PRE', { v, blockId });
    }
  }

  function onVotePre(msg) {
    const { v, blockId } = msg.payload;
    const node = nodes[msg.to];
    if (v !== stateRef.current.view) return;
    // lock
    node.lockedView = Math.max(node.lockedView, v);
    if (node.byz && Math.random() < 0.1) return;
    schedule(msg.to, leaderFor(v), 'VOTE-COMMIT', { v, blockId });
  }

  function onVoteCommit(msg) {
    const { v } = msg.payload;
    if (v !== stateRef.current.view) return;
    stateRef.current.commitVotes.add(msg.from);
    if (stateRef.current.commitVotes.size >= cfg.n - cfg.f) {
      // commit rule (3-chain simplified): commit v-2, lock v-1
      const newHeight = Math.max(height, v - 1);
      setHeight(newHeight);
      setLockedQC(v);
      setLiveness((L) => ({ ...L, lastCommitView: v }));
      appendLog(`✅ commit at view ${v} (height ≈ ${newHeight})`);
      // next view
      setTimeout(() => setView((x) => x + 1), 0);
    }
  }

  // Event loop
  useEffect(() => {
    if (!running) return;
    let raf;
    const tick = () => {
      tRef.current.now += 16 * speed; // ~60fps
      // timeout / view-change
      if (tRef.current.now > tRef.current.deadline) {
        setLiveness((L) => ({ ...L, stalledViews: L.stalledViews + 1 }));
        // pacemaker: rotate leader or bump timeout
        if (cfg.leaderPolicy !== 'sticky') {
          setView((v) => v + 1);
        } else {
          // sticky leader: increase timeout to stabilize
          tRef.current.deadline = tRef.current.now + (cfg.timeout * 1.5) / speed;
        }
        appendLog(`⏱ view ${stateRef.current.view} timeout → view-change`);
      }
      // deliver events due
      eventsRef.current.sort((a, b) => a.at - b.at);
      while (eventsRef.current.length && eventsRef.current[0].at <= tRef.current.now) {
        const ev = eventsRef.current.shift();
        switch (ev.type) {
          case 'PROPOSE': onPropose(ev); break;
          case 'VOTE-GEN': onVoteGen(ev); break;
          case 'VOTE-PRE': onVotePre(ev); break;
          case 'VOTE-COMMIT': onVoteCommit(ev); break;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed, cfg]);

  // Start a view when the number changes
  useEffect(() => {
    startView(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  function reset() {
    eventsRef.current = [];
    tRef.current.now = 0;
    setView(1);
    setHeight(1);
    setLockedQC(null);
    setSafety({ equivocations: 0, safetyOk: true });
    setLiveness({ stalledViews: 0, lastCommitView: 0 });
    appendLog('↺ reset');
  }

  // UI helpers
  const leader = leaderFor(view);
  const quorum = cfg.n - cfg.f;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">⚖️ Ultra-Advanced BFT (HotStuff) Visualizer</h1>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">← Back</Link>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Consensus</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex flex-col">Nodes (n)
                <input type="number" min={4} max={50} value={cfg.n}
                  onChange={(e)=>setCfg(c=>({...c, n: Number(e.target.value), f: Math.floor((Number(e.target.value)-1)/3)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col">Faults (f)
                <input type="number" min={1} max={Math.floor((cfg.n-1)/3)} value={cfg.f}
                  onChange={(e)=>setCfg(c=>({...c, f: clamp(Number(e.target.value),1,Math.floor((c.n-1)/3))}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col col-span-2">Leader policy
                <select value={cfg.leaderPolicy} onChange={(e)=>setCfg(c=>({...c, leaderPolicy:e.target.value}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1">
                  <option value="round-robin">Round-robin</option>
                  <option value="sticky">Sticky</option>
                </select>
              </label>
              <label className="flex items-center gap-2 col-span-2">
                <input type="checkbox" checked={cfg.optimistic} onChange={(e)=>setCfg(c=>({...c, optimistic:e.target.checked}))} />
                Optimistic responsiveness
              </label>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Network</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex flex-col">Base latency (ms)
                <input type="number" min={10} max={2000} value={cfg.baseLatency}
                  onChange={(e)=>setCfg(c=>({...c, baseLatency:Number(e.target.value)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col">Jitter (ms)
                <input type="number" min={0} max={1000} value={cfg.jitter}
                  onChange={(e)=>setCfg(c=>({...c, jitter:Number(e.target.value)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col">Drop rate
                <input type="number" step="0.01" min={0} max={0.5} value={cfg.dropRate}
                  onChange={(e)=>setCfg(c=>({...c, dropRate:clamp(Number(e.target.value),0,0.5)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col">Timeout (ms)
                <input type="number" min={200} max={5000} value={cfg.timeout}
                  onChange={(e)=>setCfg(c=>({...c, timeout:Number(e.target.value)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col col-span-2">Speed
                <input type="range" min={0.25} max={4} step={0.25} value={speed}
                  onChange={(e)=>setSpeed(Number(e.target.value))} />
                <span className="text-xs text-white/70">{speed.toFixed(2)}x</span>
              </label>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Control</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={()=>setRunning(true)} className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded">Start</button>
              <button onClick={()=>setRunning(false)} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded">Pause</button>
              <button onClick={()=>setView(v=>v+1)} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">Step View</button>
              <button onClick={reset} className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded">Reset</button>
            </div>
            <div className="mt-4 text-sm space-y-1">
              <div>View: <span className="font-mono">{view}</span> • Leader: <span className="font-mono">n{leader}</span> • Quorum: <span className="font-mono">{quorum}</span></div>
              <div>Height: <span className="font-mono">{height}</span> • LockedQC: <span className="font-mono">{lockedQC ?? '-'}</span></div>
              <div>Safety: <span className={safety.safetyOk? 'text-green-400':'text-red-400'}>{safety.safetyOk? 'OK':'Violated'}</span> (equivocations: {safety.equivocations})</div>
              <div>Liveness: stalled views {liveness.stalledViews}, last commit at view {liveness.lastCommitView}</div>
            </div>
          </div>
        </div>

        {/* Nodes State */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Nodes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {nodes.map(n => (
              <div key={n.id} className={`rounded border p-3 ${n.byz? 'border-red-500/50 bg-red-500/10':'border-white/10 bg-black/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono">n{n.id}</div>
                  {leader===n.id && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">leader</span>}
                </div>
                <div className="text-xs space-y-1">
                  <div>lockedView: <span className="font-mono">{n.lockedView}</span></div>
                  <div>highQC: <span className="font-mono">{n.highQC}</span></div>
                  <div>votedView: <span className="font-mono">{n.votedView}</span></div>
                  <div>byzantine: {n.byz? 'yes':'no'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Log */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Event log</h3>
          <div className="max-h-64 overflow-auto font-mono text-xs space-y-1">
            {log.map((l, i) => <div key={i} className="text-white/80">{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BFT), { ssr: false });
