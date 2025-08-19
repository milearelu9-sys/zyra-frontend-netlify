import React, { useEffect, useRef, useState } from "react";
import { bestProvider, makeBrowserProvider, ensureChain, HARDHAT } from "../eth/provider";

/**
 * LiveHead
 * - Subscribes to the chain head and shows latest block, age, tx count, avg block time, and RPC latency.
 * - Optional action buttons: Connect (MetaMask), Switch to Local 31337, and manual Ping.
 */
export default function LiveHead({ showActions = true, className = "" }) {
  const [tip, setTip] = useState({ number: "—", age: "—", txs: 0, gasUsed: "—" });
  const [avgBlockTime, setAvgBlockTime] = useState("—");
  const [tps, setTps] = useState("—");
  const [latency, setLatency] = useState("—");
  const [connecting, setConnecting] = useState(false);

  const providerRef = useRef(null);
  const lastBlockTsRef = useRef(null);
  const emaBlockRef = useRef(null);
  const emaTpsRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let p;
    let pingId;
    (async () => {
      try {
        p = await bestProvider();
        if (!mounted) return;
        providerRef.current = p;

        // Prime with current tip
        const bn = await p.getBlockNumber();
        const b = await p.getBlock(bn, true);
        if (b) applyBlock(b);

        // Subscribe to new blocks
        p.on("block", handleBlock);

        // Start latency pings
        pingId = setInterval(pingRpc, 10000);
        pingRpc();
      } catch (e) {
        console.error("LiveHead init failed", e);
      }
    })();

    return () => {
      mounted = false;
      try { if (p) p.off("block", handleBlock); } catch {}
      if (pingId) clearInterval(pingId);
    };
  }, []);

  async function handleBlock(bn) {
    const p = providerRef.current; if (!p) return;
    try {
      const block = await p.getBlock(bn, true);
      if (block) applyBlock(block);
    } catch (e) {
      console.error("getBlock failed", e);
    }
  }

  function applyBlock(block) {
    const tsSec = Number(block.timestamp || 0);
    const nowSec = Math.floor(Date.now() / 1000);
    const age = tsSec ? Math.max(0, nowSec - tsSec) : 0;

    // Update EMAs
    const prevTs = lastBlockTsRef.current;
    if (prevTs != null && tsSec) {
      const dt = Math.max(1, tsSec - prevTs); // seconds
      const alpha = 0.3;
      const prevAvg = emaBlockRef.current ?? dt;
      const newAvg = alpha * dt + (1 - alpha) * prevAvg;
      emaBlockRef.current = newAvg;
      setAvgBlockTime(newAvg.toFixed(2));

      const txc = Array.isArray(block.transactions) ? block.transactions.length : 0;
      const tpsNow = txc / dt;
      const prevTps = emaTpsRef.current ?? tpsNow;
      const newTps = alpha * tpsNow + (1 - alpha) * prevTps;
      emaTpsRef.current = newTps;
      setTps(newTps.toFixed(2));
    }
    if (tsSec) lastBlockTsRef.current = tsSec;

    setTip({
      number: block.number,
      age: age < 60 ? `${age}s` : `${Math.floor(age / 60)}m ${age % 60}s`,
      txs: Array.isArray(block.transactions) ? block.transactions.length : 0,
      gasUsed: block.gasUsed?.toString?.() ?? "—",
    });
  }

  async function pingRpc() {
    const p = providerRef.current; if (!p) return;
    const t0 = performance.now();
    try {
      await p.getBlockNumber();
      const ms = performance.now() - t0;
      setLatency(`${Math.round(ms)} ms`);
    } catch {
      setLatency("—");
    }
  }

  async function connectAndSwitch() {
    try {
      setConnecting(true);
      const injected = await makeBrowserProvider();
      if (!injected) {
        alert("No wallet detected. Please install MetaMask.");
        return;
      }
      await ensureChain(HARDHAT);
      await injected.send("eth_requestAccounts", []);
      alert("Wallet connected and network set to Hardhat (31337)");
    } catch (e) {
      alert(`Connect failed: ${e?.message || e}`);
    } finally { setConnecting(false); }
  }

  return (
    <div className={("bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 md:p-5 " + className).trim()}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-blue-200 text-sm">Latest Block</div>
          <div className="text-white text-2xl font-extrabold leading-tight">{String(tip.number)}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <Stat label="Age" value={tip.age} />
          <Stat label="Txs in Block" value={String(tip.txs)} />
          <Stat label="Avg Block Time" value={String(avgBlockTime)} />
          <Stat label="TPS" value={String(tps)} />
          <Stat label="RPC Latency" value={String(latency)} />
        </div>
      </div>

      <div className="mt-3 text-xs text-blue-200">Gas Used (latest): <span className="text-white font-mono">{tip.gasUsed}</span></div>

      {showActions && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <button onClick={connectAndSwitch} disabled={connecting} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm">
            {connecting ? "Connecting…" : "Connect & Switch to 31337"}
          </button>
          <button onClick={pingRpc} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">Ping RPC</button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }){
  return (
    <div>
      <div className="text-blue-200">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  );
}
