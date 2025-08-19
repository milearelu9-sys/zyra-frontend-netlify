import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    networkMetrics: {},
    transactionStats: {},
    validatorPerformance: [],
    economicMetrics: {},
    geographicDistribution: [],
    timeSeriesData: []
  });

  const [selectedMetric, setSelectedMetric] = useState('transactions');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 60000);
    return () => clearInterval(interval);
  }, [selectedMetric, timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Mock analytics data
      const mockData = {
        networkMetrics: {
          totalAddresses: 45678,
          activeAddresses: 8934,
          newAddressesToday: 234,
          networkGrowthRate: 12.5,
          hashRateGrowth: 8.3,
          decentralizationIndex: 0.78
        },
        transactionStats: {
          totalTransactions: 1256789,
          dailyTransactions: 15432,
          avgTransactionSize: 245.7,
          medianTransactionValue: 12.5,
          avgFee: 0.0023,
          throughputTrend: 'increasing'
        },
        validatorPerformance: Array.from({ length: 10 }, (_, i) => ({
          id: `validator-${i + 1}`,
          name: `Validator ${i + 1}`,
          performance: 95 + Math.random() * 5,
          blocksProduced: 1500 + Math.random() * 500,
          uptime: 99.1 + Math.random() * 0.8,
          stake: 10000 + Math.random() * 50000,
          commission: 3 + Math.random() * 7
        })),
        economicMetrics: {
          marketCap: 125000000,
          tradingVolume24h: 2500000,
          priceChange24h: 5.67,
          stakingRatio: 0.453,
          inflationRate: 0.085,
          burnRate: 0.023
        },
        geographicDistribution: [
          { region: 'North America', percentage: 35.2, nodes: 156 },
          { region: 'Europe', percentage: 28.7, nodes: 127 },
          { region: 'Asia Pacific', percentage: 22.1, nodes: 98 },
          { region: 'South America', percentage: 8.3, nodes: 37 },
          { region: 'Africa', percentage: 3.9, nodes: 17 },
          { region: 'Oceania', percentage: 1.8, nodes: 8 }
        ],
        timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          transactions: 12000 + Math.random() * 8000,
          uniqueAddresses: 5000 + Math.random() * 2000,
          volume: 1500000 + Math.random() * 1000000,
          hashRate: 10 + Math.random() * 5
        }))
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getChangeColor = (value) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Network Analytics</h1>
            <p className="text-blue-200">Comprehensive blockchain network analysis</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Controls */}
        <div className="flex space-x-4 mb-8">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
          >
            <option value="transactions">Transactions</option>
            <option value="addresses">Active Addresses</option>
            <option value="volume">Trading Volume</option>
            <option value="hashrate">Hash Rate</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Total Addresses</h3>
            <p className="text-3xl font-bold text-white mb-2">{formatNumber(analyticsData.networkMetrics.totalAddresses)}</p>
            <div className="flex items-center">
              <span className="text-green-400 text-sm">+{analyticsData.networkMetrics.newAddressesToday} today</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Active Addresses</h3>
            <p className="text-3xl font-bold text-white mb-2">{formatNumber(analyticsData.networkMetrics.activeAddresses)}</p>
            <div className="flex items-center">
              <span className={`text-sm ${getChangeColor(analyticsData.networkMetrics.networkGrowthRate)}`}>
                {analyticsData.networkMetrics.networkGrowthRate >= 0 ? '+' : ''}{analyticsData.networkMetrics.networkGrowthRate}%
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Daily Transactions</h3>
            <p className="text-3xl font-bold text-white mb-2">{formatNumber(analyticsData.transactionStats.dailyTransactions)}</p>
            <div className="flex items-center">
              <span className="text-blue-400 text-sm">Avg fee: ${analyticsData.transactionStats.avgFee}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-2">Market Cap</h3>
            <p className="text-3xl font-bold text-white mb-2">${formatNumber(analyticsData.economicMetrics.marketCap)}</p>
            <div className="flex items-center">
              <span className={`text-sm ${getChangeColor(analyticsData.economicMetrics.priceChange24h)}`}>
                {analyticsData.economicMetrics.priceChange24h >= 0 ? '+' : ''}{analyticsData.economicMetrics.priceChange24h}% 24h
              </span>
            </div>
          </div>
        </div>

        {/* Validator Performance */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Top Validator Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4">Validator</th>
                  <th className="text-right py-3 px-4">Performance</th>
                  <th className="text-right py-3 px-4">Blocks Produced</th>
                  <th className="text-right py-3 px-4">Uptime</th>
                  <th className="text-right py-3 px-4">Stake</th>
                  <th className="text-right py-3 px-4">Commission</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.validatorPerformance.slice(0, 8).map((validator, index) => (
                  <tr key={validator.id} className="border-b border-gray-700 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          #{index + 1}
                        </div>
                        <span>{validator.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="flex items-center justify-end">
                        <span className="text-green-400 font-semibold">{validator.performance.toFixed(1)}%</span>
                        <div className="ml-2 w-12 h-2 bg-gray-700 rounded-full">
                          <div 
                            className="h-2 bg-green-400 rounded-full" 
                            style={{ width: `${validator.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">{Math.floor(validator.blocksProduced).toLocaleString()}</td>
                    <td className="text-right py-4 px-4">
                      <span className={validator.uptime > 99 ? 'text-green-400' : 'text-yellow-400'}>
                        {validator.uptime.toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right py-4 px-4">{formatNumber(validator.stake)} ZYRA</td>
                    <td className="text-right py-4 px-4">{validator.commission.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Geographic Distribution */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Node Geographic Distribution</h3>
            <div className="space-y-4">
              {analyticsData.geographicDistribution.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{region.region}</span>
                      <span className="text-blue-200 text-sm">{region.nodes} nodes</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Metrics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Economic Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-blue-200 text-sm font-medium mb-2">24h Trading Volume</h4>
                <p className="text-2xl font-bold text-white">${formatNumber(analyticsData.economicMetrics.tradingVolume24h)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-blue-200 text-sm font-medium mb-2">Staking Ratio</h4>
                <p className="text-2xl font-bold text-white">{(analyticsData.economicMetrics.stakingRatio * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-blue-200 text-sm font-medium mb-2">Inflation Rate</h4>
                <p className="text-2xl font-bold text-yellow-400">{(analyticsData.economicMetrics.inflationRate * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-blue-200 text-sm font-medium mb-2">Burn Rate</h4>
                <p className="text-2xl font-bold text-red-400">{(analyticsData.economicMetrics.burnRate * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Health Indicators */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Network Health Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="text-lg font-semibold text-white mb-1">Decentralization Index</h4>
              <p className="text-3xl font-bold text-green-400">{analyticsData.networkMetrics.decentralizationIndex}</p>
              <p className="text-sm text-gray-400">Higher is better</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <h4 className="text-lg font-semibold text-white mb-1">Hash Rate Growth</h4>
              <p className="text-3xl font-bold text-blue-400">+{analyticsData.networkMetrics.hashRateGrowth}%</p>
              <p className="text-sm text-gray-400">Last 30 days</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="text-lg font-semibold text-white mb-1">Transaction Throughput</h4>
              <p className="text-3xl font-bold text-purple-400">{analyticsData.transactionStats.throughputTrend}</p>
              <p className="text-sm text-gray-400">Trend analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
