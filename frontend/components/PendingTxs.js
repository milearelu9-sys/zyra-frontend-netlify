import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeBrowserProvider, ensureChain, HARDHAT, formatEther, getRpcUrl, bestProvider } from "../eth/provider";

/**
 * PendingTxs
 * Live pending transaction feed using a WebSocket RPC when available.
 * - Tries NEXT_PUBLIC_WS_URL, else derives from configured RPC by swapping http->ws.
 * - Falls back to local-only (shows txs sent from this dApp) if no WS is available.
 */
export default function PendingTxs({ limit = 30, className = "", showActions = true }) {
  const [items, setItems] = useState([]); // { hash, from, to, valueEth, seenAt, detailsLoaded }
  const [wsState, setWsState] = useState("connecting"); // connecting | connected | unavailable | error
  const [sending, setSending] = useState(false);

  const wsRef = useRef(null);
  const seenRef = useRef(new Set());
  const pollIdRef = useRef(null);

  const wsUrl = useMemo(() => {
    const env = process.env.NEXT_PUBLIC_WS_URL;
    if (env && typeof env === "string") return env;
    try {
      const rpc = getRpcUrl ? getRpcUrl() : null;
      if (!rpc) return null;
      // naive transform http(s):// -> ws(s)://
      if (rpc.startsWith("http://")) return rpc.replace(/^http:\/\//i, "ws://");
      if (rpc.startsWith("https://")) return rpc.replace(/^https:\/\//i, "wss://");
    } catch {}
    return null;
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!wsUrl) {
        setWsState("unavailable");
        return;
      }
      try {
        const { WebSocketProvider } = await import("ethers");
        const ws = new WebSocketProvider(wsUrl);
        wsRef.current = ws;
        setWsState("connected");

        const onPending = async (hash) => {
          if (!active || !hash || seenRef.current.has(hash)) return;
          seenRef.current.add(hash);
          // Insert placeholder
          setItems((prev) => [{ hash, seenAt: Date.now(), detailsLoaded: false }, ...prev].slice(0, limit));
          try {
            const tx = await ws.getTransaction(hash);
            if (!tx) return;
            setItems((prev) => prev.map((it) => it.hash === hash ? {
              ...it,
              from: tx.from,
              to: tx.to,
              valueEth: tx.value ? safeFormat(tx.value) : "0.0",
              detailsLoaded: true,
            } : it));
          } catch {}
        };

        const pruneMined = async () => {
          const current = wsRef.current; if (!current) return;
          const snapshot = itemsRef.current;
          if (!snapshot.length) return;
          const kept = [];
          for (const it of snapshot) {
            try {
              const rec = await current.getTransactionReceipt(it.hash);
              if (!rec) kept.push(it); // still pending
            } catch {
              kept.push(it);
            }
          }
          if (active) setItems(kept.slice(0, limit));
        };

        ws.on("pending", onPending);
        ws.on("block", pruneMined);
        pollIdRef.current = setInterval(pruneMined, 4000);
      } catch (e) {
        console.warn("PendingTxs: WS init failed", e);
        setWsState("error");
      }
    })();

    return () => {
      active = false;
      try { if (wsRef.current) { wsRef.current.removeAllListeners?.(); wsRef.current.destroy?.(); } } catch {}
      if (pollIdRef.current) clearInterval(pollIdRef.current);
    };
  }, [wsUrl, limit]);

  // keep a ref to items for pruning without stale closure
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  function safeFormat(value) {
    try { return Number(formatEther(value)).toFixed(6); } catch { return "0.0"; }
  }

  function ageString(seenAt) {
    const s = Math.max(0, Math.floor((Date.now() - (seenAt || 0)) / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    return `${m}m ${s % 60}s ago`;
  }

  async function sendTestTx() {
    try {
      setSending(true);
      const injected = await makeBrowserProvider();
      if (!injected) { alert("No wallet detected"); return; }
      await ensureChain(HARDHAT);
      const signer = await injected.getSigner();
      const addr = await signer.getAddress();
      const tx = await signer.sendTransaction({ to: addr, value: 0n });
      // If no WS, still surface locally-sent tx
      if (wsState !== "connected") {
        const entry = { hash: tx.hash, from: addr, to: addr, valueEth: "0.000000", seenAt: Date.now(), detailsLoaded: true };
        seenRef.current.add(tx.hash);
        setItems((prev) => [entry, ...prev].slice(0, limit));
      }
    } catch (e) {
      alert(`Send failed: ${e?.message || e}`);
    } finally { setSending(false); }
  }

  function clearAll() {
    setItems([]);
    seenRef.current.clear();
  }

  return (
    <div className={("bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 md:p-5 " + className).trim()}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${wsState === 'connected' ? 'bg-green-400' : wsState === 'connecting' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
          <h3 className="text-white font-semibold">Pending Transactions</h3>
          <span className="text-xs text-blue-200">{wsState === 'connected' ? 'live via WebSocket' : wsState === 'unavailable' ? 'WS unavailable' : wsState}</span>
        </div>
        <div className="flex items-center gap-2">
          {showActions && (
            <button onClick={sendTestTx} disabled={sending} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm">{sending ? 'Sending…' : 'Send Test Tx'}</button>
          )}
          <button onClick={clearAll} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm">Clear</button>
        </div>
      </div>

      {wsState !== 'connected' && (
        <div className="text-xs text-blue-200 mb-3">
          To enable live pending feed, set NEXT_PUBLIC_WS_URL to a WebSocket RPC (e.g. ws://127.0.0.1:8545) or run a node that supports eth_subscribe.
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-blue-200 text-sm">No pending transactions.</div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-auto">
          {items.map((it) => (
            <div key={it.hash} className="bg-black/20 p-3 rounded-lg">
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs font-mono text-gray-300 truncate">{it.hash}</span>
                <span className="text-xs text-gray-400">{ageString(it.seenAt)}</span>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div className="text-gray-300"><span className="text-xs">From:</span><br/><span className="font-mono text-xs">{short(it.from)}</span></div>
                <div className="text-center text-white font-semibold">{it.valueEth ? `${it.valueEth} ETH` : '—'}</div>
                <div className="text-gray-300 text-right"><span className="text-xs">To:</span><br/><span className="font-mono text-xs">{short(it.to)}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function short(addr) {
  if (!addr) return '—';
  try { return `${addr.slice(0, 8)}…${addr.slice(-6)}`; } catch { return addr; }
}
