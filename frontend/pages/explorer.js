import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { bestProvider, makeBrowserProvider, ensureChain, HARDHAT, formatEther, formatUnits } from '../eth/provider';

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('block');
  const [searchResult, setSearchResult] = useState(null);
  const [recentBlocks, setRecentBlocks] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [networkStats, setNetworkStats] = useState({ latestBlock: 0, totalTransactions: 0, avgBlockTime: 0 });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // New: dashboard-style state
  const [liveOn, setLiveOn] = useState(true);
  const [account, setAccount] = useState(null);
  const [netInfo, setNetInfo] = useState({ chainId: '-', name: '' });
  const [details, setDetails] = useState(null);

  const providerRef = useRef(null);
  const lastTsRef = useRef(null);
  const avgBlockRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let p;
    async function init(){
      try{
        p = await bestProvider();
        if(!mounted) return;
        providerRef.current = p;
        const net = await p.getNetwork();
        setNetInfo({ chainId: Number(net.chainId), name: net.name || '' });
        // Bootstrap recent data
        const tip = await p.getBlockNumber();
        await primeRecent(tip, 8);
        // Subscribe to new blocks
        p.on('block', handleBlock);
      }catch(err){ console.error('Explorer init failed', err); }
    }
    init();

    return () => {
      mounted = false;
      try{ if(p) p.off('block', handleBlock); }catch{}
    };
  }, []);

  async function primeRecent(tip, count){
    const p = providerRef.current; if(!p) return;
    for(let i=0; i<count; i++){
      const bn = tip - i; if(bn < 0) break;
      await fetchAndApplyBlock(bn);
    }
  }

  async function handleBlock(bn){
    if (!liveOn) return;
    await fetchAndApplyBlock(bn);
  }

  async function fetchAndApplyBlock(bn){
    const p = providerRef.current; if(!p) return;
    try{
      const block = await p.getBlock(bn, true); // include transactions
      if(!block) return;
      const tsMs = Number(block.timestamp) * 1000;
      // Stats: avg block time (EMA)
      try{
        const prev = lastTsRef.current;
        if(prev){
          const dt = Math.max(1, (tsMs - prev) / 1000);
          const alpha = 0.3;
          const prevAvg = avgBlockRef.current ?? dt;
          const avg = alpha*dt + (1-alpha)*prevAvg;
          avgBlockRef.current = avg;
          setNetworkStats(s => ({ ...s, latestBlock: block.number, avgBlockTime: Number(avg.toFixed(2)) }));
        } else {
          setNetworkStats(s => ({ ...s, latestBlock: block.number }));
        }
        lastTsRef.current = tsMs;
      }catch{}

      // Recent blocks list
      const blkEntry = {
        height: block.number,
        hash: block.hash,
        timestamp: new Date(tsMs).toISOString(),
        transactions: (block.transactions || []).length,
        miner: block.miner || block.minerAddress || '—',
        gasUsed: block.gasUsed?.toString?.() ?? '—'
      };
      setRecentBlocks(prev => [blkEntry, ...prev.filter(b => b.height !== blkEntry.height)].slice(0, 20));

      // Recent transactions
      const txs = (block.transactions || []).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: Number(formatEther(tx.value || 0)).toFixed(6),
        timestamp: new Date(tsMs).toISOString(),
        status: 'pending',
        blockHeight: block.number
      }));
      if(txs.length){
        setRecentTransactions(prev => [...txs, ...prev].slice(0, 200));
        // Fetch receipts to update status asynchronously
        for(const tx of txs){
          p.getTransactionReceipt(tx.hash).then(rec => {
            if(!rec) return; // still pending
            setRecentTransactions(prev => prev.map(t => t.hash === tx.hash ? { ...t, status: rec.status === 1 ? 'success' : 'failed' } : t));
          }).catch(()=>{});
        }
      }

      // Window total transactions (approx last 12 blocks)
      setNetworkStats(s => ({ ...s, totalTransactions: ( [blkEntry, ...recentBlocks].slice(0, 12).reduce((a,b)=>a+(b.transactions||0),0) ) }));
    }catch(err){ console.error('fetch block failed', err); }
  }

  // Dashboard header actions
  async function connectWallet(){
    try{
      const injected = await makeBrowserProvider();
      if(!injected){ alert('No wallet detected'); return; }
      await injected.send('eth_requestAccounts', []);
      const signer = await injected.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    }catch(e){ alert('Connect failed: '+(e?.message||e)); }
  }
  async function switchLocal(){
    try{ await ensureChain(HARDHAT); }catch(e){ alert('Switch failed: '+(e?.message||e)); }
  }
  function toggleLive(){ setLiveOn(v=>!v); }
  function clearLists(){ setRecentBlocks([]); setRecentTransactions([]); setDetails(null); }

  async function handleSearchToolbar(){
    if(!searchQuery.trim()) return;
    const p = providerRef.current || await bestProvider();
    setLoading(true); setSearchResult(null);
    const q = searchQuery.trim();
    const isHex = /^0x[0-9a-fA-F]+$/.test(q);
    try{
      // Try tx first if looks like hash
      if(isHex && q.length === 66){
        const tx = await p.getTransaction(q);
        if(tx){
          const rec = await p.getTransactionReceipt(q);
          let blockTime = null;
          if(rec?.blockNumber){ const b = await p.getBlock(rec.blockNumber); blockTime = b ? new Date(Number(b.timestamp)*1000).toISOString() : null; }
          const fee = rec?.gasUsed && rec?.effectiveGasPrice ? formatEther(BigInt(rec.gasUsed.toString()) * BigInt(rec.effectiveGasPrice.toString())) : null;
          setSearchResult({ type:'transaction', hash: tx.hash, from: tx.from, to: tx.to, value: Number(formatEther(tx.value||0)).toFixed(6), fee, timestamp: blockTime, status: rec ? (rec.status===1?'success':'failed'):'pending', blockHeight: rec?.blockNumber??'—', confirmations: rec?.confirmations??'—', gasUsed: rec?.gasUsed?.toString?.()??'—', gasPrice: tx.gasPrice ? `${formatUnits(tx.gasPrice, 'gwei')} gwei` : (tx.maxFeePerGas ? `${formatUnits(tx.maxFeePerGas, 'gwei')} gwei` : '—') });
          setDetails({ kind:'tx', data: tx });
          return;
        }
        // else maybe block hash
        const blkByHash = await p.getBlock(q, true);
        if(blkByHash){ setSearchResult({ type:'block', height: blkByHash.number, hash: blkByHash.hash, previousHash: blkByHash.parentHash, timestamp: new Date(Number(blkByHash.timestamp)*1000).toISOString(), transactions: (blkByHash.transactions||[]).length, gasUsed: blkByHash.gasUsed?.toString?.()??'—', miner: blkByHash.miner||'—' }); setDetails({ kind:'block', data: blkByHash }); return; }
      }
      // Numeric block number
      if(/^\d+$/.test(q)){
        const blk = await p.getBlock(parseInt(q,10), true);
        if(blk){ setSearchResult({ type:'block', height: blk.number, hash: blk.hash, previousHash: blk.parentHash, timestamp: new Date(Number(blk.timestamp)*1000).toISOString(), transactions: (blk.transactions||[]).length, gasUsed: blk.gasUsed?.toString?.()??'—', miner: blk.miner||'—' }); setDetails({ kind:'block', data: blk }); return; }
      }
      // Address pattern
      if(/^0x[0-9a-fA-F]{40}$/.test(q)){
        const hits = recentTransactions.filter(t => t.from?.toLowerCase() === q.toLowerCase() || t.to?.toLowerCase() === q.toLowerCase());
        setSearchResult({ type:'address', address: q, balance: '—', transactionCount: hits.length, firstSeen: hits[hits.length-1]?.timestamp, lastSeen: hits[0]?.timestamp });
        setDetails({ kind:'address', data: { address: q, hits } });
        return;
      }
      setSearchResult({ type:'error', message: 'Not found' });
    }catch(err){ console.error('search failed', err); setSearchResult({ type:'error', message:'Search error' }); }
    finally{ setLoading(false); }
  }

  function formatTimeAgo(ts){
    try{
      const time = new Date(ts); const now = Date.now(); const diffMs = now - time.getTime();
      const s = Math.floor(diffMs/1000), m = Math.floor(s/60), h = Math.floor(m/60);
      if(s<60) return `${s}s ago`; if(m<60) return `${m}m ago`; if(h<24) return `${h}h ago`; return time.toLocaleString();
    }catch{ return String(ts); }
  }

  async function sendTestTx(){
    try{
      setSending(true);
      const injected = await makeBrowserProvider();
      if(!injected){ alert('No wallet detected'); return; }
      await ensureChain(HARDHAT);
      const signer = await injected.getSigner();
      const addr = await signer.getAddress();
      // Add a pending entry optimistically
      const pending = { hash: '(pending)', from: addr, to: addr, value: '0.000000', timestamp: new Date().toISOString(), status: 'pending', blockHeight: '—' };
      setRecentTransactions(prev => [pending, ...prev].slice(0, 200));
      const tx = await signer.sendTransaction({ to: addr, value: 0n });
      // replace placeholder with real hash
      setRecentTransactions(prev => prev.map(t => t.hash === '(pending)' ? { ...t, hash: tx.hash } : t));
      const rec = await injected.waitForTransaction(tx.hash);
      alert(`Tx mined in block ${rec.blockNumber}`);
    }catch(err){ console.error(err); alert('Send failed: '+(err?.message||err)); }
    finally{ setSending(false); }
  }

  return (
    <div>
      {/* Dashboard-style header */}
      <header className="zx-header">
        <div className="zx-container">
          <div className="zx-title">🔍 ZYRA Live Explorer <span className="badge">Chain {netInfo.chainId}{netInfo.name?` • ${netInfo.name}`:''}</span></div>
          <div className="toolbar">
            <span className="pill">Latest Block: <b>{networkStats.latestBlock || '-'}</b></span>
            <span className="pill">Tx Feed: <b>{recentTransactions.length}</b></span>
            <button className="btn" onClick={connectWallet}>{account ? `Connected: ${account.slice(0, 6)}…${account.slice(-4)}` : 'Connect Wallet'}</button>
            <button className="btn secondary" onClick={switchLocal}>Switch to Local (31337)</button>
            <button className="btn secondary" onClick={sendTestTx} disabled={sending}>{sending? 'Sending…':'Send Test Tx (0 ETH)'}</button>
            <button className="btn secondary" onClick={toggleLive}>{liveOn? 'Pause Live':'Resume Live'}</button>
            <button className="btn secondary" onClick={clearLists}>Clear</button>
            <div className="search">
              <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search tx hash / block number / block hash / address" />
              <button className="btn" onClick={handleSearchToolbar}>{loading? 'Searching…':'Search'}</button>
            </div>
            <Link className="btn secondary" href="/">← Back to Dashboard</Link>
          </div>
        </div>
      </header>

      {/* Main content panels */}
      <main className="zx-main">
        <section className="panel">
          <h3>⛓️ Latest Blocks</h3>
          <div className="body list" id="blocks">
            {recentBlocks.map((block) => (
              <div key={block.height} className="item mono" onClick={()=>setDetails({ kind:'block', data:block })}>
                <div className="row">
                  <div>#{block.height}</div>
                  <div className="muted">{new Date(block.timestamp).toLocaleTimeString?.() || formatTimeAgo(block.timestamp)}</div>
                  <div className="pill">{block.transactions} txs</div>
                  <div className="hash" title={block.hash}>{(block.hash||'').slice(0, 10)}…{(block.hash||'').slice(-6)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>⚡ Live Transactions</h3>
          <div className="body list" id="txs">
            {recentTransactions.slice(0, 200).map((tx) => (
              <div key={tx.hash + (tx.timestamp||'')} className="item mono" onClick={()=>setDetails({ kind:'tx', data: tx })}>
                <div className="row">
                  <div className="hash" title={tx.hash||'(pending)'}>{(tx.hash||'(pending)').slice(0, 10)}…{(tx.hash||'(pending)').slice(-6)}</div>
                  <div className="muted">blk {tx.blockHeight ?? ''}</div>
                  <div className="addr">{(tx.from||'').slice(0,6)}… → {(tx.to||'').slice(0,6)}…</div>
                  <div className="value">{tx.value} ETH</div>
                  <div className="muted">
                    <span className={tx.status==='success'?'success': tx.status==='failed'?'fail':'muted'}>{tx.status}</span>
                  </div>
                  <div className="muted">{formatTimeAgo(tx.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" style={{ gridColumn: '1 / -1' }}>
          <h3>📋 Details</h3>
          <div className="body">
            <div className="details mono">
              {!details && <span className="muted">Select a tx or block…</span>}
              {!!details && (
                <pre>{JSON.stringify(details.data, null, 2)}</pre>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Styles from dashboard/public/explorer.html adapted into styled-jsx */}
      <style jsx global>{`
        :root { --bg:#0a0a0a; --bg2:#121826; --panel:rgba(0,0,0,0.6); --pri:#00ff88; --sec:#0066ff; --gold:#ffd700; --text:#e8f2ee; --muted:#9be7c4; --border: rgba(0,255,136,0.35); }
        .zx-header{ position:sticky; top:0; z-index:5; backdrop-filter: blur(10px); background: linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.25)); border-bottom:1px solid var(--border); }
        .zx-container{ max-width:1300px; margin:0 auto; padding:18px; }
        .zx-title{ font-weight:800; letter-spacing:.3px; font-size:22px; display:flex; align-items:center; gap:10px; color: var(--text); }
        .zx-title .badge{ background: linear-gradient(45deg, var(--pri), var(--sec)); color:#000; padding:2px 8px; border-radius:999px; font-size:12px; font-weight:800 }
        .toolbar{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px }
        .pill{ border:1px solid var(--border); color: var(--muted); padding:6px 10px; border-radius:999px; background: rgba(0,255,136,0.08); font-size: 13px }
        .btn{ background: linear-gradient(45deg, var(--pri), var(--sec)); color:#000; border:0; padding:8px 12px; border-radius:10px; font-weight:800; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center }
        .btn.secondary{ background: rgba(0,255,136,0.08); color: var(--muted); border:1px solid var(--border) }
        .btn:disabled{ opacity:.6; cursor:not-allowed }
        .search{ flex:1; min-width:260px; display:flex; gap:8px }
        .search input{ flex:1; background: rgba(255,255,255,0.04); color: var(--text); border:1px solid rgba(255,255,255,0.12); border-radius: 10px; padding:9px 12px; outline:none }
        .zx-main{ padding:18px; max-width:1300px; margin:0 auto; display:grid; grid-template-columns: 1fr 1fr; gap:18px; background: linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%); min-height: 100vh; }
        @media (max-width:1100px){ .zx-main{ grid-template-columns: 1fr } }
        .panel{ background: var(--panel); border:1px solid var(--border); border-radius: 14px; overflow:hidden }
        .panel h3{ margin:0; padding: 14px; border-bottom: 1px solid var(--border); color: var(--pri) }
        .panel .body{ padding: 12px; max-height: 520px; overflow:auto }
        .list{ display:grid; gap:10px }
        .item{ border:1px solid var(--border); border-radius: 12px; padding:10px; background: rgba(0,255,136,0.05); display:grid; gap:8px }
        .row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center }
        .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 12px; color: var(--text) }
        .muted{ color: #b7cec4 }
        .hash{ color: var(--pri); cursor: pointer }
        .addr{ color: var(--muted) }
        .value{ color: var(--gold); font-weight: 800 }
        .success{ color: #3fe28f; font-weight: 700 }
        .fail{ color: #ff6b6b; font-weight: 700 }
        .details{ background: rgba(255,255,255,0.03); border:1px dashed var(--border); border-radius: 12px; padding: 12px; font-size: 13px }
        .details pre{ margin:0; white-space: pre-wrap; word-break: break-word }
      `}</style>
    </div>
  );
}
