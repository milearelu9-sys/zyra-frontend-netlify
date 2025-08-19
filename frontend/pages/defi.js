import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DeFi() {
  const [defiData, setDefiData] = useState({
    protocols: [],
    totalValueLocked: 0,
    pools: [],
    yields: [],
    markets: []
  });

  const [activeTab, setActiveTab] = useState('swap');
  const [swapForm, setSwapForm] = useState({
    fromToken: 'ZYRA',
    toToken: 'USDC',
    fromAmount: '',
    toAmount: '',
    slippage: 0.5
  });

  const [poolForm, setPoolForm] = useState({
    token1: 'ZYRA',
    token2: 'USDC',
    amount1: '',
    amount2: '',
    selectedPool: null
  });

  useEffect(() => {
    fetchDeFiData();
    const interval = setInterval(fetchDeFiData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDeFiData = async () => {
    try {
      const mockData = {
        protocols: [
          {
            name: 'ZyraSwap',
            tvl: 25000000,
            volume24h: 1200000,
            change24h: 12.5,
            apy: 15.6
          },
          {
            name: 'ZyraLend',
            tvl: 18500000,
            volume24h: 850000,
            change24h: -3.2,
            apy: 8.9
          },
          {
            name: 'ZyraYield',
            tvl: 12300000,
            volume24h: 420000,
            change24h: 7.8,
            apy: 22.1
          }
        ],
        totalValueLocked: 55800000,
        pools: [
          {
            pair: 'ZYRA/USDC',
            tvl: 8500000,
            apr: 18.5,
            volume24h: 450000,
            fees24h: 1350
          },
          {
            pair: 'ZYRA/ETH',
            tvl: 6200000,
            apr: 22.1,
            volume24h: 320000,
            fees24h: 960
          },
          {
            pair: 'USDC/USDT',
            tvl: 4100000,
            apr: 5.2,
            volume24h: 280000,
            fees24h: 840
          }
        ],
        yields: [
          {
            protocol: 'ZyraYield',
            asset: 'ZYRA',
            apy: 25.6,
            tvl: 3200000,
            risk: 'Medium'
          },
          {
            protocol: 'ZyraLend',
            asset: 'USDC',
            apy: 12.8,
            tvl: 5600000,
            risk: 'Low'
          },
          {
            protocol: 'ZyraStake',
            asset: 'ZYRA',
            apy: 18.5,
            tvl: 12500000,
            risk: 'Low'
          }
        ],
        markets: [
          {
            asset: 'ZYRA',
            totalSupply: 980000,
            totalBorrow: 450000,
            supplyApy: 8.5,
            borrowApy: 12.3,
            utilizationRate: 45.9,
            price: 2.45
          },
          {
            asset: 'USDC',
            totalSupply: 2200000,
            totalBorrow: 1650000,
            supplyApy: 6.2,
            borrowApy: 9.8,
            utilizationRate: 75.0,
            price: 1.00
          }
        ]
      };

      setDefiData(mockData);
    } catch (error) {
      console.error('Error fetching DeFi data:', error);
    }
  };

  const handleSwap = async () => {
    if (!swapForm.fromAmount) return;
    
    // Mock swap calculation
    const rate = swapForm.fromToken === 'ZYRA' ? 2.45 : 0.41;
    const toAmount = (parseFloat(swapForm.fromAmount) * rate).toFixed(6);
    
    setSwapForm(prev => ({ ...prev, toAmount }));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">DeFi Hub</h1>
            <p className="text-blue-200">Decentralized Finance on Zyra Network</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* DeFi Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Total Value Locked</h3>
            <p className="text-3xl font-bold text-white">${formatNumber(defiData.totalValueLocked)}</p>
            <p className="text-green-400 text-sm">+15.6% from last week</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Active Protocols</h3>
            <p className="text-3xl font-bold text-white">{defiData.protocols.length}</p>
            <p className="text-blue-400 text-sm">Across ecosystem</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">24h Volume</h3>
            <p className="text-3xl font-bold text-white">${formatNumber(defiData.protocols.reduce((sum, p) => sum + p.volume24h, 0))}</p>
            <p className="text-yellow-400 text-sm">All protocols</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Avg APY</h3>
            <p className="text-3xl font-bold text-white">{(defiData.protocols.reduce((sum, p) => sum + p.apy, 0) / defiData.protocols.length || 0).toFixed(1)}%</p>
            <p className="text-purple-400 text-sm">Weighted average</p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Swap Interface */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'swap' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab('swap')}
              >
                Swap
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'pool' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab('pool')}
              >
                Pool
              </button>
            </div>

            {activeTab === 'swap' && (
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">From</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={swapForm.fromAmount}
                      onChange={(e) => setSwapForm(prev => ({ ...prev, fromAmount: e.target.value }))}
                      placeholder="0.0"
                      className="flex-1 bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                    <select
                      value={swapForm.fromToken}
                      onChange={(e) => setSwapForm(prev => ({ ...prev, fromToken: e.target.value }))}
                      className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="ZYRA">ZYRA</option>
                      <option value="USDC">USDC</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">To</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={swapForm.toAmount}
                      readOnly
                      placeholder="0.0"
                      className="flex-1 bg-white/5 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                    <select
                      value={swapForm.toToken}
                      onChange={(e) => setSwapForm(prev => ({ ...prev, toToken: e.target.value }))}
                      className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="USDC">USDC</option>
                      <option value="ZYRA">ZYRA</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Slippage: {swapForm.slippage}%</span>
                  <span>Fee: 0.3%</span>
                </div>

                <button
                  onClick={handleSwap}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  Swap Tokens
                </button>
              </div>
            )}

            {activeTab === 'pool' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Token 1</label>
                    <input
                      type="number"
                      value={poolForm.amount1}
                      onChange={(e) => setPoolForm(prev => ({ ...prev, amount1: e.target.value }))}
                      placeholder="0.0"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Token 2</label>
                    <input
                      type="number"
                      value={poolForm.amount2}
                      onChange={(e) => setPoolForm(prev => ({ ...prev, amount2: e.target.value }))}
                      placeholder="0.0"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all">
                  Add Liquidity
                </button>
              </div>
            )}
          </div>

          {/* Top Pools */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Top Liquidity Pools</h3>
            <div className="space-y-4">
              {defiData.pools.map((pool, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{pool.pair}</span>
                    <span className="text-green-400 font-bold">{pool.apr}% APR</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">TVL</p>
                      <p className="text-white font-semibold">${formatNumber(pool.tvl)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">24h Volume</p>
                      <p className="text-white font-semibold">${formatNumber(pool.volume24h)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">24h Fees</p>
                      <p className="text-white font-semibold">${formatNumber(pool.fees24h)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Protocols Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">DeFi Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defiData.protocols.map((protocol, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{protocol.name}</h3>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${
                    protocol.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {protocol.change24h >= 0 ? '+' : ''}{protocol.change24h.toFixed(1)}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">TVL</span>
                    <span className="text-white font-semibold">${formatNumber(protocol.tvl)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Volume</span>
                    <span className="text-white font-semibold">${formatNumber(protocol.volume24h)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">APY</span>
                    <span className="text-purple-400 font-semibold">{protocol.apy.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yield Farming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Yield Farming</h3>
            <div className="space-y-4">
              {defiData.yields.map((yield_, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-white font-semibold">{yield_.protocol}</span>
                      <span className="text-gray-400 ml-2">({yield_.asset})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">{yield_.apy}% APY</div>
                      <div className={`text-xs ${getRiskColor(yield_.risk)}`}>{yield_.risk} Risk</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">TVL: ${formatNumber(yield_.tvl)}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                      Farm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lending Markets */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Lending Markets</h3>
            <div className="space-y-4">
              {defiData.markets.map((market, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold text-lg">{market.asset}</span>
                    <span className="text-blue-400 font-bold">${market.price.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Supply APY</p>
                      <p className="text-green-400 font-semibold">{market.supplyApy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Borrow APY</p>
                      <p className="text-red-400 font-semibold">{market.borrowApy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Total Supply</p>
                      <p className="text-white font-semibold">{formatNumber(market.totalSupply)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Utilization</p>
                      <p className="text-yellow-400 font-semibold">{market.utilizationRate}%</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm transition-colors">
                      Supply
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition-colors">
                      Borrow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
