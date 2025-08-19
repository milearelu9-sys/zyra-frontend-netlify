import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({
    overview: {},
    assets: [],
    transactions: [],
    performance: {},
    allocations: []
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('30d');
  const [sortBy, setSortBy] = useState('value');

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const mockData = {
        overview: {
          totalValue: 45672.89,
          totalChange24h: 1234.56,
          changePercent24h: 2.78,
          totalAssets: 12,
          totalTransactions: 1456,
          pnl: 8945.23,
          pnlPercent: 24.35
        },
        assets: [
          {
            symbol: 'ZYRA',
            name: 'Zyra Network',
            balance: 15234.67,
            value: 22851.01,
            price: 1.50,
            change24h: 2.34,
            changePercent24h: 3.45,
            allocation: 50.1,
            logo: '🟢'
          },
          {
            symbol: 'ZETH',
            name: 'Zyra Ethereum',
            balance: 8.456,
            value: 13421.20,
            price: 1587.45,
            change24h: -45.23,
            changePercent24h: -2.85,
            allocation: 29.4,
            logo: '🔷'
          },
          {
            symbol: 'ZBTC',
            name: 'Zyra Bitcoin',
            balance: 0.234,
            value: 9856.78,
            price: 42123.45,
            change24h: 567.89,
            changePercent24h: 1.37,
            allocation: 21.6,
            logo: '🟡'
          },
          {
            symbol: 'ZUSDC',
            name: 'Zyra USD Coin',
            balance: 5423.12,
            value: 5423.12,
            price: 1.00,
            change24h: 0.00,
            changePercent24h: 0.00,
            allocation: 11.9,
            logo: '🔵'
          },
          {
            symbol: 'ZUNI',
            name: 'Zyra Uniswap',
            balance: 234.56,
            value: 1876.54,
            price: 7.99,
            change24h: 12.34,
            changePercent24h: 5.67,
            allocation: 4.1,
            logo: '🦄'
          },
          {
            symbol: 'ZLINK',
            name: 'Zyra Chainlink',
            balance: 123.45,
            value: 1543.21,
            price: 12.50,
            change24h: -8.76,
            changePercent24h: -1.23,
            allocation: 3.4,
            logo: '🔗'
          }
        ],
        transactions: [
          {
            id: 'txn-001',
            type: 'buy',
            symbol: 'ZYRA',
            amount: 1000,
            price: 1.45,
            value: 1450.00,
            timestamp: '2025-08-14T14:30:00Z',
            status: 'completed',
            hash: '0x1a2b3c4d5e6f...',
            fee: 0.25
          },
          {
            id: 'txn-002',
            type: 'sell',
            symbol: 'ZETH',
            amount: 2.5,
            price: 1620.00,
            value: 4050.00,
            timestamp: '2025-08-14T12:15:00Z',
            status: 'completed',
            hash: '0x2b3c4d5e6f1a...',
            fee: 2.03
          },
          {
            id: 'txn-003',
            type: 'stake',
            symbol: 'ZYRA',
            amount: 5000,
            price: 1.48,
            value: 7400.00,
            timestamp: '2025-08-14T09:45:00Z',
            status: 'completed',
            hash: '0x3c4d5e6f1a2b...',
            fee: 0.00
          },
          {
            id: 'txn-004',
            type: 'swap',
            symbol: 'ZBTC → ZYRA',
            amount: 0.1,
            price: 42000.00,
            value: 4200.00,
            timestamp: '2025-08-13T18:20:00Z',
            status: 'completed',
            hash: '0x4d5e6f1a2b3c...',
            fee: 8.40
          },
          {
            id: 'txn-005',
            type: 'receive',
            symbol: 'ZYRA',
            amount: 250,
            price: 1.52,
            value: 380.00,
            timestamp: '2025-08-13T16:10:00Z',
            status: 'completed',
            hash: '0x5e6f1a2b3c4d...',
            fee: 0.00
          }
        ],
        performance: {
          '7d': { value: 44523.12, change: 1149.77, changePercent: 2.65 },
          '30d': { value: 42134.56, change: 3538.33, changePercent: 8.40 },
          '90d': { value: 38967.23, change: 6705.66, changePercent: 17.21 },
          '1y': { value: 32456.78, change: 13216.11, changePercent: 40.73 }
        },
        allocations: [
          { category: 'Native Tokens', percentage: 50.1, value: 22851.01, color: 'bg-blue-500' },
          { category: 'Stablecoins', percentage: 11.9, value: 5423.12, color: 'bg-green-500' },
          { category: 'DeFi Tokens', percentage: 7.5, value: 3419.75, color: 'bg-purple-500' },
          { category: 'Wrapped Assets', percentage: 30.5, value: 13978.01, color: 'bg-yellow-500' }
        ]
      };

      setPortfolioData(mockData);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num, decimals = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatPercent = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'buy': return '🟢';
      case 'sell': return '🔴';
      case 'stake': return '🔒';
      case 'swap': return '🔄';
      case 'receive': return '📥';
      case 'send': return '📤';
      default: return '⚪';
    }
  };

  const sortedAssets = [...portfolioData.assets].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'balance':
        return b.balance - a.balance;
      case 'change':
        return b.changePercent24h - a.changePercent24h;
      case 'value':
      default:
        return b.value - a.value;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Portfolio</h1>
            <p className="text-blue-200">Track your investments and performance</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Value</h3>
            <p className="text-3xl font-bold text-white">{formatCurrency(portfolioData.overview.totalValue)}</p>
            <p className={`text-sm ${portfolioData.overview.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(portfolioData.overview.changePercent24h)} (24h)
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">24h Change</h3>
            <p className={`text-3xl font-bold ${portfolioData.overview.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioData.overview.totalChange24h >= 0 ? '+' : ''}{formatCurrency(portfolioData.overview.totalChange24h)}
            </p>
            <p className="text-gray-400 text-sm">Daily P&L</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total P&L</h3>
            <p className="text-3xl font-bold text-green-400">+{formatCurrency(portfolioData.overview.pnl)}</p>
            <p className="text-green-400 text-sm">+{formatPercent(portfolioData.overview.pnlPercent)}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Assets</h3>
            <p className="text-3xl font-bold text-white">{portfolioData.overview.totalAssets}</p>
            <p className="text-gray-400 text-sm">{portfolioData.overview.totalTransactions} transactions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'assets', 'transactions', 'analytics'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Chart Placeholder */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Portfolio Performance</h3>
                <div className="flex space-x-2">
                  {['7d', '30d', '90d', '1y'].map((period) => (
                    <button
                      key={period}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        timeframe === period
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-center py-16 text-gray-400">
                <div className="text-6xl mb-4">📈</div>
                <p>Portfolio performance chart would be displayed here</p>
                <p className="text-sm mt-2">Showing {timeframe} performance data</p>
                {portfolioData.performance[timeframe] && (
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(portfolioData.performance[timeframe].value)}
                    </p>
                    <p className={`text-lg ${portfolioData.performance[timeframe].change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercent(portfolioData.performance[timeframe].changePercent)} ({timeframe})
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Asset Allocation</h3>
              <div className="space-y-4">
                {portfolioData.allocations.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{allocation.category}</span>
                      <span className="text-blue-200">{allocation.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`${allocation.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${allocation.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400">{formatCurrency(allocation.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Your Assets</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white px-4 py-2 rounded border border-white/20"
              >
                <option value="value">Sort by Value</option>
                <option value="name">Sort by Name</option>
                <option value="balance">Sort by Balance</option>
                <option value="change">Sort by Change</option>
              </select>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="text-left p-4 text-blue-200 font-semibold">Asset</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Balance</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Price</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">24h Change</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Value</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAssets.map((asset, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{asset.logo}</div>
                            <div>
                              <p className="text-white font-semibold">{asset.symbol}</p>
                              <p className="text-gray-400 text-sm">{asset.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-white font-semibold">{formatNumber(asset.balance, 4)}</p>
                          <p className="text-gray-400 text-sm">{asset.symbol}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-white">{formatCurrency(asset.price)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className={`font-semibold ${asset.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatPercent(asset.changePercent24h)}
                          </p>
                          <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {asset.change24h >= 0 ? '+' : ''}{formatCurrency(asset.change24h)}
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-white font-semibold">{formatCurrency(asset.value)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-blue-200">{asset.allocation}%</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="text-left p-4 text-blue-200 font-semibold">Type</th>
                      <th className="text-left p-4 text-blue-200 font-semibold">Asset</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Amount</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Price</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Value</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Fee</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Date</th>
                      <th className="text-right p-4 text-blue-200 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getTransactionIcon(tx.type)}</span>
                            <span className="text-white capitalize font-semibold">{tx.type}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white font-semibold">{tx.symbol}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-white">{formatNumber(tx.amount, 4)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-white">{formatCurrency(tx.price)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-white font-semibold">{formatCurrency(tx.value)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-gray-400">{formatCurrency(tx.fee)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-gray-400 text-sm">{formatDate(tx.timestamp)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Performing Asset</span>
                  <div className="text-right">
                    <p className="text-white font-semibold">ZUNI</p>
                    <p className="text-green-400 text-sm">+5.67%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Worst Performing Asset</span>
                  <div className="text-right">
                    <p className="text-white font-semibold">ZETH</p>
                    <p className="text-red-400 text-sm">-2.85%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Fees Paid</span>
                  <p className="text-white font-semibold">$10.68</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Buy Price</span>
                  <p className="text-white font-semibold">$1.47</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Activity Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Transactions</span>
                  <p className="text-white font-semibold">{portfolioData.overview.totalTransactions}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Buy Orders</span>
                  <p className="text-green-400 font-semibold">156</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sell Orders</span>
                  <p className="text-red-400 font-semibold">89</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Staking Rewards</span>
                  <p className="text-purple-400 font-semibold">234 ZYRA</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
