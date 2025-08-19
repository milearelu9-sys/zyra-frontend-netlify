import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

// Seeded RNG for reproducible simulations
function createRng(seedStr = 'zyra') {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  let s = (h || 1) >>> 0;
  return { random(){ s = (1664525 * s + 1013904223) >>> 0; return (s >>> 0) / 0x100000000; } };
}
function randn(rng, mean = 0, std = 1) {
  // Box-Muller with seeded uniforms
  let u = 0, v = 0;
  while (u === 0) u = rng.random();
  while (v === 0) v = rng.random();
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Ultra-advanced HotStuff-like simulator with pacemaker, adversaries, partitions, metrics
function BFT() {
  const [cfg, setCfg] = useState({
    n: 4,
    f: 1,
    leaderPolicy: 'round-robin', // 'round-robin' | 'sticky' | 'random' | 'hotshot'
    baseLatency: 120,
    jitter: 40,
    dropRate: 0.02,
    timeout: 1200,
    optimistic: true,
    byzantine: [], // indices of byz nodes
    // Adversary knobs (apply to nodes listed in byzantine)
    byzEquivocate: true,
    byzVoteDropProb: 0.0,
    byzVoteDelay: 0,
    // Partition control
    partition: { enabled: false, until: 0 }
  });
  const [seed, setSeed] = useState('zyra');
  const rngRef = useRef(createRng(seed));

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [view, setView] = useState(1);
  const [height, setHeight] = useState(1);
  const [lockedQC, setLockedQC] = useState(null);
  const [log, setLog] = useState([]);
  const [safety, setSafety] = useState({ equivocations: 0, safetyOk: true });
  const [liveness, setLiveness] = useState({ stalledViews: 0, lastCommitView: 0 });
  const [metrics, setMetrics] = useState({ sent: 0, dropped: 0, delivered: 0, avgLatency: 0, commits: 0 });

  const nodes = useMemo(() => Array.from({ length: cfg.n }, (_, i) => ({
    id: i,
    lockedView: 0,
    highQC: 0,
    votedView: 0,
    byz: cfg.byzantine.includes(i),
  })), [cfg.n, cfg.byzantine]);

  const eventsRef = useRef([]); // network events
  const tRef = useRef({ now: 0, deadline: cfg.timeout });
  const leaderRef = useRef(0);
  const lastTimedOutRef = useRef(false);
  const stateRef = useRef({ view: 1, proposeQC: 0, genVotes: new Set(), preCommitVotes: new Set(), commitVotes: new Set(), chain: [] });
  const metricsRef = useRef({ sent: 0, dropped: 0, delivered: 0, latencySum: 0, latencyCount: 0, commits: 0 });

  useEffect(() => { tRef.current.deadline = cfg.timeout; }, [cfg.timeout]);
  useEffect(() => { rngRef.current = createRng(seed); }, [seed]);

  function appendLog(line) { setLog((l) => [line, ...l.slice(0, 199)]); }

  // Decide leader for a view with advanced policies
  function pickLeader(v) {
    switch (cfg.leaderPolicy) {
      case 'sticky': return leaderRef.current;
      case 'random': leaderRef.current = Math.floor(rngRef.current.random() * cfg.n); return leaderRef.current;
      case 'hotshot':
        if (lastTimedOutRef.current) leaderRef.current = (leaderRef.current + 1) % cfg.n; // rotate on timeout only
        return leaderRef.current;
      case 'round-robin':
      default: return (v - 1) % cfg.n;
    }
  }

  function startView(v) {
    const leader = pickLeader(v);
    stateRef.current.view = v;
    stateRef.current.genVotes.clear();
    stateRef.current.preCommitVotes.clear();
    stateRef.current.commitVotes.clear();
    tRef.current.deadline = tRef.current.now + Math.max(50, cfg.timeout / speed);
    appendLog(`▶ view ${v} leader n${leader}`);
    proposeBlock(leader, v);
  }

  function schedule(from, to, type, payload) {
    // Partition cut (drop cross-group) if enabled
    if (cfg.partition?.enabled && tRef.current.now < cfg.partition.until) {
      const groupA = (i) => i < Math.floor(cfg.n / 2);
      if (groupA(from) !== groupA(to)) { metricsRef.current.sent++; metricsRef.current.dropped++; return; }
    }
    // Random drop
    if (rngRef.current.random() < cfg.dropRate) { metricsRef.current.sent++; metricsRef.current.dropped++; return; }
    // Base latency with jitter (+ adversarial delays on votes)
    let latency = clamp(
      randn(rngRef.current, cfg.baseLatency, cfg.jitter),
      Math.max(5, cfg.baseLatency - 3 * cfg.jitter),
      cfg.baseLatency + 3 * cfg.jitter
    );
    if (nodes[from]?.byz && /^VOTE/.test(type)) latency += cfg.byzVoteDelay;

    const sentAt = tRef.current.now;
    const at = sentAt + Math.max(1, latency / speed);
    eventsRef.current.push({ at, sentAt, from, to, type, payload });
    metricsRef.current.sent++;
  }

  function broadcast(from, type, payload) { for (let to = 0; to < cfg.n; to++) { if (to !== from) schedule(from, to, type, payload); } }

  function proposeBlock(leader, v) {
    const blockId = `${v}-${Math.floor(rngRef.current.random() * 1e6).toString(36)}`;
    stateRef.current.chain.push({ view: v, blockId });
    const payload = { v, blockId, justifyQC: Math.max(lockedQC || 0, stateRef.current.proposeQC || 0) };
    if (nodes[leader].byz && cfg.byzEquivocate) {
      const blockId2 = `${v}-X${Math.floor(rngRef.current.random() * 1e6).toString(36)}`;
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
    const safe = v > node.lockedView && justifyQC >= node.lockedView;
    if (!safe) return;
    node.highQC = Math.max(node.highQC, justifyQC, v - 1);
    node.votedView = v;
    // Byz node may drop vote
    if (node.byz && rngRef.current.random() < cfg.byzVoteDropProb) return;
    schedule(msg.to, pickLeader(v), 'VOTE-GEN', { v, blockId });
    // Optimistic responsiveness: push deadline forward as progress is made
    if (cfg.optimistic) tRef.current.deadline = Math.max(tRef.current.deadline, tRef.current.now + (cfg.timeout * 0.6) / speed);
  }

  function onVoteGen(msg) {
    const { v, blockId } = msg.payload;
    if (v !== stateRef.current.view) return;
    stateRef.current.genVotes.add(msg.from);
    if (stateRef.current.genVotes.size >= cfg.n - cfg.f) {
      stateRef.current.proposeQC = v;
      broadcast(pickLeader(v), 'VOTE-PRE', { v, blockId });
    }
  }

  function onVotePre(msg) {
    const { v, blockId } = msg.payload;
    const node = nodes[msg.to];
    if (v !== stateRef.current.view) return;
    node.lockedView = Math.max(node.lockedView, v);
    if (node.byz && rngRef.current.random() < cfg.byzVoteDropProb * 0.5) return;
    schedule(msg.to, pickLeader(v), 'VOTE-COMMIT', { v, blockId });
  }

  function onVoteCommit(msg) {
    const { v } = msg.payload;
    if (v !== stateRef.current.view) return;
    stateRef.current.commitVotes.add(msg.from);
    if (stateRef.current.commitVotes.size >= cfg.n - cfg.f) {
      const newHeight = Math.max(height, v - 1);
      setHeight(newHeight);
      setLockedQC(v);
      setLiveness((L) => ({ ...L, lastCommitView: v }));
      metricsRef.current.commits++;
      appendLog(`✅ commit at view ${v} (height ≈ ${newHeight})`);
      lastTimedOutRef.current = false; // successful view
      setTimeout(() => setView((x) => x + 1), 0);
    }
  }

  // Event loop with metrics reporting and pacemaker
  useEffect(() => {
    if (!running) return;
    let raf; let lastReport = 0;
    const tick = () => {
      tRef.current.now += 16 * speed; // ~60fps
      // timeout / view-change
      if (tRef.current.now > tRef.current.deadline) {
        setLiveness((L) => ({ ...L, stalledViews: L.stalledViews + 1 }));
        lastTimedOutRef.current = true;
        if (cfg.leaderPolicy === 'sticky') {
          tRef.current.deadline = tRef.current.now + (cfg.timeout * 1.5) / speed;
        } else {
          setView((v) => v + 1);
        }
        appendLog(`⏱ view ${stateRef.current.view} timeout → view-change`);
      }
      // deliver events due
      eventsRef.current.sort((a, b) => a.at - b.at);
      while (eventsRef.current.length && eventsRef.current[0].at <= tRef.current.now) {
        const ev = eventsRef.current.shift();
        metricsRef.current.delivered++;
        const lat = (tRef.current.now - ev.sentAt);
        metricsRef.current.latencySum += lat; metricsRef.current.latencyCount++;
        switch (ev.type) {
          case 'PROPOSE': onPropose(ev); break;
          case 'VOTE-GEN': onVoteGen(ev); break;
          case 'VOTE-PRE': onVotePre(ev); break;
          case 'VOTE-COMMIT': onVoteCommit(ev); break;
        }
      }
      // periodic metrics state update
      if (tRef.current.now - lastReport > 250) {
        lastReport = tRef.current.now;
        const m = metricsRef.current;
        setMetrics({ sent: m.sent, dropped: m.dropped, delivered: m.delivered, avgLatency: m.latencyCount? (m.latencySum / m.latencyCount) : 0, commits: m.commits });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed, cfg.leaderPolicy]);

  // Start a view when the number changes
  useEffect(() => { startView(view); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [view]);

  function reset() {
    eventsRef.current = [];
    tRef.current.now = 0;
    setView(1);
    setHeight(1);
    setLockedQC(null);
    setSafety({ equivocations: 0, safetyOk: true });
    setLiveness({ stalledViews: 0, lastCommitView: 0 });
    metricsRef.current = { sent: 0, dropped: 0, delivered: 0, latencySum: 0, latencyCount: 0, commits: 0 };
    appendLog('↺ reset');
  }

  function applyPreset(name) {
    setRunning(false);
    switch (name) {
      case 'stable': setCfg({ ...cfg, n: 4, f: 1, leaderPolicy: 'round-robin', baseLatency: 120, jitter: 10, dropRate: 0.0, timeout: 1000, optimistic: true, byzantine: [], byzEquivocate: false, byzVoteDropProb: 0, byzVoteDelay: 0, partition: { enabled:false, until:0 } }); appendLog('🎛 Preset: Stable network'); break;
      case 'flaky': setCfg({ ...cfg, n: 4, f: 1, leaderPolicy: 'round-robin', baseLatency: 140, jitter: 80, dropRate: 0.10, timeout: 1500, optimistic: true, byzantine: [], byzEquivocate: false, byzVoteDropProb: 0.1, byzVoteDelay: 0, partition: { enabled:false, until:0 } }); appendLog('🎛 Preset: Flaky network'); break;
      case 'byz-leader': setCfg({ ...cfg, n: 4, f: 1, leaderPolicy: 'sticky', baseLatency: 120, jitter: 20, dropRate: 0.0, timeout: 1200, optimistic: true, byzantine: [0], byzEquivocate: true, byzVoteDropProb: 0.0, byzVoteDelay: 0, partition: { enabled:false, until:0 } }); appendLog('🎛 Preset: Byzantine leader (n0)'); break;
      case 'geo-latency': setCfg({ ...cfg, n: 7, f: 2, leaderPolicy: 'round-robin', baseLatency: 600, jitter: 120, dropRate: 0.02, timeout: 2500, optimistic: true, byzantine: [], byzEquivocate: false, byzVoteDropProb: 0, byzVoteDelay: 0, partition: { enabled:false, until:0 } }); appendLog('🎛 Preset: High-latency geo spread'); break;
      case 'stress': setCfg({ ...cfg, n: 10, f: 3, leaderPolicy: 'round-robin', baseLatency: 200, jitter: 200, dropRate: 0.30, timeout: 3000, optimistic: false, byzantine: [], byzEquivocate: false, byzVoteDropProb: 0.2, byzVoteDelay: 50, partition: { enabled:false, until:0 } }); appendLog('🎛 Preset: Stress (drops + jitter)'); break;
    }
    reset(); setView(1); setRunning(true);
  }

  // UI helpers
  const leader = pickLeader(view);
  const quorum = cfg.n - cfg.f;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">⚖️ Ultra-Advanced BFT (HotStuff) Visualizer</h1>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">← Back</Link>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Consensus</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex flex-col">Seed
                <input value={seed} onChange={(e)=>setSeed(e.target.value)} className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
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
                  <option value="random">Random</option>
                  <option value="hotshot">Hotshot (rotate on timeout)</option>
                </select>
              </label>
              <label className="flex items-center gap-2 col-span-2">
                <input type="checkbox" checked={cfg.optimistic} onChange={(e)=>setCfg(c=>({...c, optimistic:e.target.checked}))} />
                Optimistic responsiveness
              </label>
              <label className="flex flex-col col-span-2">Byzantine nodes (comma-separated)
                <input value={cfg.byzantine.join(',')} onChange={(e)=>{
                  const list = e.target.value.split(',').map(s=>s.trim()).filter(Boolean).map(Number).filter(x=>Number.isFinite(x) && x>=0 && x<cfg.n);
                  setCfg(c=>({...c, byzantine: Array.from(new Set(list))}));
                }} className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
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
              <div className="col-span-2 flex gap-2 mt-1">
                <button onClick={()=>setCfg(c=>({...c, partition:{ enabled:true, until: tRef.current.now + 5000 }}))} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded">Start Partition 5s</button>
                <button onClick={()=>setCfg(c=>({...c, partition:{ enabled:false, until: 0 }}))} className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded">Clear Partition</button>
                <div className="text-xs text-white/70 self-center">Partition: {cfg.partition.enabled && tRef.current.now < cfg.partition.until ? 'active' : 'off'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Adversary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex items-center gap-2 col-span-2">
                <input type="checkbox" checked={cfg.byzEquivocate} onChange={(e)=>setCfg(c=>({...c, byzEquivocate:e.target.checked}))} />
                Equivocate proposals (if leader is byzantine)
              </label>
              <label className="flex flex-col">Vote drop prob
                <input type="number" step="0.05" min={0} max={1} value={cfg.byzVoteDropProb}
                  onChange={(e)=>setCfg(c=>({...c, byzVoteDropProb: clamp(Number(e.target.value), 0, 1)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
              <label className="flex flex-col">Vote delay (ms)
                <input type="number" min={0} max={1000} value={cfg.byzVoteDelay}
                  onChange={(e)=>setCfg(c=>({...c, byzVoteDelay: Math.max(0, Number(e.target.value)||0)}))}
                  className="mt-1 bg-black/40 border border-white/10 rounded px-2 py-1" />
              </label>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Control & Stats</h3>
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
              <div className="pt-2 text-xs text-white/80">Msgs sent {metrics.sent} • dropped {metrics.dropped} • delivered {metrics.delivered} • avg latency {metrics.avgLatency.toFixed(1)} ms • commits {metrics.commits}</div>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Presets</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>applyPreset('stable')} className="nav-btn">Stable</button>
            <button onClick={()=>applyPreset('flaky')} className="nav-btn">Flaky Network</button>
            <button onClick={()=>applyPreset('byz-leader')} className="nav-btn">Byzantine Leader</button>
            <button onClick={()=>applyPreset('geo-latency')} className="nav-btn">High Latency Geo</button>
            <button onClick={()=>applyPreset('stress')} className="nav-btn">Stress</button>
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

