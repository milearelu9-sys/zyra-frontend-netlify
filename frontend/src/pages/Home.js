import React, { useState, useEffect } from 'react';

export default function Home() {
  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 0,
    activeValidators: 0,
    currentBlockHeight: 0,
    networkHashRate: 0,
    totalValueLocked: 0,
    circulatingSupply: 0
  });

  const [networkActivity, setNetworkActivity] = useState([]);

  useEffect(() => {
    fetchBlockchainStats();
    fetchNetworkActivity();
    const interval = setInterval(() => {
      fetchBlockchainStats();
      fetchNetworkActivity();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlockchainStats = async () => {
    try {
      // Mock data - replace with actual API calls
      setBlockchainStats({
        totalTransactions: 125847,
        activeValidators: 42,
        currentBlockHeight: 8759,
        networkHashRate: 12.7,
        totalValueLocked: 2847593,
        circulatingSupply: 15000000
      });
    } catch (error) {
      console.error('Error fetching blockchain stats:', error);
    }
  };

  const fetchNetworkActivity = async () => {
    try {
      // Mock network activity data
      const activities = [
        { type: 'transaction', amount: 150.5, timestamp: new Date(Date.now() - 30000) },
        { type: 'block', height: 8759, timestamp: new Date(Date.now() - 45000) },
        { type: 'staking', amount: 1000, timestamp: new Date(Date.now() - 60000) },
        { type: 'transaction', amount: 75.25, timestamp: new Date(Date.now() - 90000) },
        { type: 'governance', proposal: 'Network Upgrade v2.1', timestamp: new Date(Date.now() - 120000) }
      ];
      setNetworkActivity(activities);
    } catch (error) {
      console.error('Error fetching network activity:', error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to Zyra
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
          The next-generation blockchain platform providing lightning-fast transactions, 
          secure staking, and comprehensive DeFi solutions for the decentralized future.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Network Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Block Height</h3>
          <p className="text-2xl font-bold text-white">{blockchainStats.currentBlockHeight.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Total Transactions</h3>
          <p className="text-2xl font-bold text-white">{blockchainStats.totalTransactions.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Active Validators</h3>
          <p className="text-2xl font-bold text-white">{blockchainStats.activeValidators}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Hash Rate (TH/s)</h3>
          <p className="text-2xl font-bold text-white">{blockchainStats.networkHashRate}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">TVL</h3>
          <p className="text-2xl font-bold text-white">${(blockchainStats.totalValueLocked / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Circulating Supply</h3>
          <p className="text-2xl font-bold text-white">{(blockchainStats.circulatingSupply / 1000000).toFixed(1)}M ZYRA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Platform Features */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-blue-200 text-sm">Process 10,000+ TPS with sub-second finality</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Ultra Secure</h3>
              <p className="text-blue-200 text-sm">Advanced cryptography and consensus mechanisms</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">Low Fees</h3>
              <p className="text-blue-200 text-sm">Transaction fees as low as $0.001</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-white mb-2">Eco-Friendly</h3>
              <p className="text-blue-200 text-sm">Energy-efficient Proof-of-Stake consensus</p>
            </div>
          </div>
        </div>

        {/* Live Network Activity */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Live Network Activity</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {networkActivity.map((activity, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    {activity.type === 'transaction' && (
                      <p className="text-white">
                        <span className="text-blue-300">Transaction:</span> {activity.amount} ZYRA
                      </p>
                    )}
                    {activity.type === 'block' && (
                      <p className="text-white">
                        <span className="text-purple-300">New Block:</span> #{activity.height}
                      </p>
                    )}
                    {activity.type === 'staking' && (
                      <p className="text-white">
                        <span className="text-yellow-300">Staking:</span> {activity.amount} ZYRA
                      </p>
                    )}
                    {activity.type === 'governance' && (
                      <p className="text-white">
                        <span className="text-green-300">Governance:</span> {activity.proposal}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
          <h3 className="text-xl font-bold text-white mb-2">Wallet</h3>
          <p className="text-blue-200 text-sm">Manage your ZYRA tokens securely</p>
          <div className="mt-4 text-blue-300 text-sm font-semibold">Access Wallet →</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">Explorer</h3>
          <p className="text-blue-200 text-sm">Search blocks and transactions</p>
          <div className="mt-4 text-purple-300 text-sm font-semibold">Explore Network →</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">Staking</h3>
          <p className="text-blue-200 text-sm">Earn rewards by staking ZYRA</p>
          <div className="mt-4 text-green-300 text-sm font-semibold">Start Staking →</div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
          <h3 className="text-xl font-bold text-white mb-2">Trading</h3>
          <p className="text-blue-200 text-sm">Trade ZYRA and other tokens</p>
          <div className="mt-4 text-orange-300 text-sm font-semibold">Start Trading →</div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Updates</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="text-lg font-semibold text-white">Zyra Network v2.1 Launched</h4>
            <p className="text-blue-200 text-sm">Enhanced transaction throughput and improved consensus mechanism</p>
            <p className="text-gray-400 text-xs mt-1">2 days ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="text-lg font-semibold text-white">New Staking Rewards Program</h4>
            <p className="text-blue-200 text-sm">Increased APY for long-term stakers up to 12%</p>
            <p className="text-gray-400 text-xs mt-1">5 days ago</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="text-lg font-semibold text-white">Cross-chain Bridge Integration</h4>
            <p className="text-blue-200 text-sm">Seamless asset transfers between Zyra and other blockchains</p>
            <p className="text-gray-400 text-xs mt-1">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
