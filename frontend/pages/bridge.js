import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Bridge() {
  const [bridgeData, setBridgeData] = useState({
    supportedChains: [],
    transactions: [],
    fees: {},
    limits: {}
  });

  const [bridgeForm, setBridgeForm] = useState({
    fromChain: 'ethereum',
    toChain: 'zyra',
    token: 'USDC',
    amount: '',
    recipient: ''
  });

  const [bridgeStatus, setBridgeStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchBridgeData();
  }, []);

  const fetchBridgeData = async () => {
    try {
      const mockData = {
        supportedChains: [
          {
            id: 'ethereum',
            name: 'Ethereum',
            logo: '⟠',
            rpc: 'https://mainnet.infura.io/v3/...',
            status: 'active',
            bridgeFee: 0.003
          },
          {
            id: 'bsc',
            name: 'Binance Smart Chain',
            logo: '◉',
            rpc: 'https://bsc-dataseed.binance.org/',
            status: 'active',
            bridgeFee: 0.001
          },
          {
            id: 'polygon',
            name: 'Polygon',
            logo: '⬡',
            rpc: 'https://polygon-rpc.com/',
            status: 'active',
            bridgeFee: 0.0005
          },
          {
            id: 'arbitrum',
            name: 'Arbitrum',
            logo: '🔷',
            rpc: 'https://arb1.arbitrum.io/rpc',
            status: 'maintenance',
            bridgeFee: 0.002
          },
          {
            id: 'zyra',
            name: 'Zyra Network',
            logo: '⚡',
            rpc: 'https://rpc.zyra.network',
            status: 'active',
            bridgeFee: 0.0001
          }
        ],
        transactions: [
          {
            id: 'tx_001',
            fromChain: 'ethereum',
            toChain: 'zyra',
            token: 'USDC',
            amount: 1000,
            status: 'completed',
            timestamp: new Date(Date.now() - 3600000),
            txHash: '0xabc123...',
            confirmations: 15
          },
          {
            id: 'tx_002',
            fromChain: 'bsc',
            toChain: 'zyra',
            token: 'USDT',
            amount: 500,
            status: 'processing',
            timestamp: new Date(Date.now() - 1800000),
            txHash: '0xdef456...',
            confirmations: 8
          }
        ],
        fees: {
          ethereum: { base: 0.003, gas: 150000 },
          bsc: { base: 0.001, gas: 100000 },
          polygon: { base: 0.0005, gas: 80000 },
          arbitrum: { base: 0.002, gas: 120000 },
          zyra: { base: 0.0001, gas: 50000 }
        },
        limits: {
          min: 10,
          max: 100000,
          daily: 500000
        }
      };

      setBridgeData(mockData);
    } catch (error) {
      console.error('Error fetching bridge data:', error);
    }
  };

  const handleBridge = async (e) => {
    e.preventDefault();
    if (!bridgeForm.amount || !bridgeForm.recipient) return;

    setIsProcessing(true);
    setBridgeStatus({
      step: 1,
      message: 'Initiating bridge transaction...',
      txHash: null
    });

    // Mock bridge process
    setTimeout(() => {
      setBridgeStatus({
        step: 2,
        message: 'Waiting for confirmations...',
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      });
    }, 2000);

    setTimeout(() => {
      setBridgeStatus({
        step: 3,
        message: 'Processing on destination chain...',
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      });
    }, 5000);

    setTimeout(() => {
      setBridgeStatus({
        step: 4,
        message: 'Bridge completed successfully!',
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      });
      setIsProcessing(false);
    }, 8000);
  };

  const getChainInfo = (chainId) => {
    return bridgeData.supportedChains.find(chain => chain.id === chainId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'inactive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTransactionStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const calculateFee = () => {
    if (!bridgeForm.amount || !bridgeForm.fromChain) return 0;
    const chainInfo = getChainInfo(bridgeForm.fromChain);
    return chainInfo ? parseFloat(bridgeForm.amount) * chainInfo.bridgeFee : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Cross-Chain Bridge</h1>
            <p className="text-blue-200">Transfer assets across different blockchain networks</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bridge Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Bridge Assets</h2>
              
              <form onSubmit={handleBridge} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">From Chain</label>
                    <select
                      value={bridgeForm.fromChain}
                      onChange={(e) => setBridgeForm(prev => ({ ...prev, fromChain: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      {bridgeData.supportedChains.filter(chain => chain.id !== 'zyra').map(chain => (
                        <option key={chain.id} value={chain.id}>
                          {chain.logo} {chain.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">To Chain</label>
                    <select
                      value={bridgeForm.toChain}
                      onChange={(e) => setBridgeForm(prev => ({ ...prev, toChain: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="zyra">⚡ Zyra Network</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setBridgeForm(prev => ({
                        ...prev,
                        fromChain: prev.toChain === 'zyra' ? 'ethereum' : prev.toChain,
                        toChain: prev.fromChain
                      }));
                    }}
                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Token</label>
                  <select
                    value={bridgeForm.token}
                    onChange={(e) => setBridgeForm(prev => ({ ...prev, token: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  >
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                    <option value="WBTC">WBTC</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={bridgeForm.amount}
                      onChange={(e) => setBridgeForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Enter amount"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                      min={bridgeData.limits.min}
                      max={bridgeData.limits.max}
                    />
                    <div className="absolute right-3 top-3 text-gray-400 text-sm">
                      {bridgeForm.token}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>Min: {bridgeData.limits.min} {bridgeForm.token}</span>
                    <span>Max: {formatNumber(bridgeData.limits.max)} {bridgeForm.token}</span>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Recipient Address</label>
                  <input
                    type="text"
                    value={bridgeForm.recipient}
                    onChange={(e) => setBridgeForm(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="0x... or leave empty for same address"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  />
                </div>

                {/* Transaction Summary */}
                {bridgeForm.amount && (
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <h3 className="text-white font-semibold mb-2">Transaction Summary</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white">{bridgeForm.amount} {bridgeForm.token}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Bridge Fee</span>
                      <span className="text-yellow-400">{calculateFee().toFixed(6)} {bridgeForm.token}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">You'll receive</span>
                      <span className="text-green-400">
                        {(parseFloat(bridgeForm.amount) - calculateFee()).toFixed(6)} {bridgeForm.token}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Estimated time</span>
                      <span className="text-blue-400">2-5 minutes</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing || !bridgeForm.amount || !getChainInfo(bridgeForm.fromChain)?.status === 'active'}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all"
                >
                  {isProcessing ? 'Processing...' : 'Start Bridge'}
                </button>
              </form>
            </div>

            {/* Bridge Status */}
            {bridgeStatus && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Bridge Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {bridgeStatus.step < 4 ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                      ) : (
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Step {bridgeStatus.step} of 4</p>
                      <p className="text-gray-400">{bridgeStatus.message}</p>
                      {bridgeStatus.txHash && (
                        <p className="text-blue-400 text-sm">Tx: {bridgeStatus.txHash}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(bridgeStatus.step / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supported Chains */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Supported Chains</h3>
              <div className="space-y-3">
                {bridgeData.supportedChains.map((chain) => (
                  <div key={chain.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{chain.logo}</span>
                      <div>
                        <p className="text-white font-semibold">{chain.name}</p>
                        <p className="text-gray-400 text-sm">Fee: {chain.bridgeFee}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-semibold ${getStatusColor(chain.status)}`}>
                        {chain.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bridge Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Bridge Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Volume</span>
                  <span className="text-white font-bold">$12.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transactions</span>
                  <span className="text-white font-bold">8,432</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Time</span>
                  <span className="text-white font-bold">3.2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400 font-bold">99.8%</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {bridgeData.transactions.map((tx) => (
                  <div key={tx.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {getChainInfo(tx.fromChain)?.logo} → {getChainInfo(tx.toChain)?.logo}
                        </p>
                        <p className="text-gray-400 text-xs">{tx.amount} {tx.token}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getTransactionStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{tx.timestamp.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Bridge), { ssr: false });
