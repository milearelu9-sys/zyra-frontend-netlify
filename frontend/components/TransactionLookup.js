import React, { useState } from "react";
import { makeJsonRpcProvider, bestProvider, formatEther, formatUnits } from "../eth/provider";

const TransactionLookup = ({ rpcUrl = "http://127.0.0.1:8545" }) => {
  const [txHash, setTxHash] = useState("");
  const [txData, setTxData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const hash = txHash.trim();
    if (!hash) return;
    setLoading(true);
    setError(null);
    setTxData(null);
    try {
      const provider = rpcUrl ? makeJsonRpcProvider(rpcUrl) : await bestProvider();

      // Fetch transaction
      const tx = await provider.getTransaction(hash);
      if (!tx) {
        setError("Transaction not found");
        setLoading(false);
        return;
      }

      // Fetch receipt for status and gas info (can be null if pending)
      const receipt = await provider.getTransactionReceipt(hash);
      setTxData({ tx, receipt });
    } catch (err) {
      console.error(err);
      setError("Error fetching transaction");
    } finally {
      setLoading(false);
    }
  };

  const gasPriceGwei = (tx) => {
    const gp = tx?.gasPrice ?? tx?.maxFeePerGas;
    return gp ? `${formatUnits(gp, "gwei")} GWEI` : "—";
  };

  const effectiveCostEth = (receipt) => {
    if (!receipt?.gasUsed || !receipt?.effectiveGasPrice) return "—";
    try {
      const cost = receipt.gasUsed * receipt.effectiveGasPrice;
      return `${formatEther(cost)} ETH`;
    } catch {
      // BigInt-safe calculation
      try {
        const used = BigInt(receipt.gasUsed.toString());
        const price = BigInt(receipt.effectiveGasPrice.toString());
        const total = used * price;
        return `${formatEther(total)} ETH`;
      } catch {
        return "—";
      }
    }
  };

  return (
    <div className="tx-lookup" style={{ maxWidth: 900 }}>
      <h2>🔍 Zyra Transaction Lookup</h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Enter transaction hash (0x…)"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          style={{ flex: 1, minWidth: 320, padding: 8 }}
        />
        <button onClick={handleSearch} disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "#ef4444", marginTop: 12 }}>{error}</p>}

      {txData && (
        <div className="tx-details" style={{ marginTop: 16, padding: 12, border: "1px solid #334155", borderRadius: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <div><b>From:</b><br />{txData.tx.from}</div>
            <div><b>To:</b><br />{txData.tx.to || "Contract creation"}</div>
            <div><b>Value:</b><br />{formatEther(txData.tx.value || 0)} ETH</div>
            <div><b>Nonce:</b><br />{txData.tx.nonce}</div>
            <div><b>Gas Limit:</b><br />{txData.tx.gasLimit?.toString?.() ?? "—"}</div>
            <div><b>Gas Price:</b><br />{gasPriceGwei(txData.tx)}</div>
            <div><b>Status:</b><br />{txData.receipt ? (txData.receipt.status === 1 ? "✅ Success" : "❌ Failed") : "⏳ Pending"}</div>
            <div><b>Block:</b><br />{txData.receipt?.blockNumber ?? "—"}</div>
            <div><b>Gas Used:</b><br />{txData.receipt?.gasUsed?.toString?.() ?? "—"}</div>
            <div><b>Tx Cost (est):</b><br />{effectiveCostEth(txData.receipt)}</div>
          </div>
          <div style={{ marginTop: 12, wordBreak: "break-all" }}>
            <b>Transaction Hash:</b> {txData.tx.hash}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLookup;
