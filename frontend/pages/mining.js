import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Mining() {
  const [miningData, setMiningData] = useState({
    pools: [],
    myMiners: [],
    networkStats: {},
    profitability: {},
    hardware: []
  });

  const [selectedPool, setSelectedPool] = useState(null);
  const [minerForm, setMinerForm] = useState({
    algorithm: 'SHA-256',
    hardware: 'ASIC',
    hashrate: '',
    powerConsumption: '',
    electricityCost: 0.1
  });

  const [showAddMiner, setShowAddMiner] = useState(false);

  useEffect(() => {
    fetchMiningData();
    const interval = setInterval(fetchMiningData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMiningData = async () => {
    try {
      const mockData = {
        pools: [
          {
            id: 'zyra-main',
            name: 'Zyra Main Pool',
            url: 'stratum+tcp://pool.zyra.network:4444',
            fee: 1.5,
            miners: 2340,
            hashrate: 45.6,
            blocks24h: 142,
            payout: 'PPS+',
            minPayout: 0.01,
            status: 'active'
          },
          {
            id: 'zyra-solo',
            name: 'Zyra Solo Mining',
            url: 'stratum+tcp://solo.zyra.network:4445',
            fee: 0.5,
            miners: 89,
            hashrate: 8.2,
            blocks24h: 18,
            payout: 'Solo',
            minPayout: 0.1,
            status: 'active'
          },
          {
            id: 'community-pool',
            name: 'Community Pool',
            url: 'stratum+tcp://community.zyra.network:4446',
            fee: 2.0,
            miners: 1567,
            hashrate: 32.1,
            blocks24h: 98,
            payout: 'PPLNS',
            minPayout: 0.005,
            status: 'active'
          }
        ],
        myMiners: [
          {
            id: 'miner-001',
            name: 'Mining Rig #1',
            algorithm: 'SHA-256',
            hashrate: 14.5,
            power: 1400,
            temperature: 68,
            uptime: 99.2,
            pool: 'zyra-main',
            status: 'mining',
            shares: {
              accepted: 1250,
              rejected: 12,
              invalid: 3
            },
            earnings24h: 0.025,
            lastSeen: new Date()
          },
          {
            id: 'miner-002',
            name: 'Mining Rig #2',
            algorithm: 'SHA-256',
            hashrate: 0,
            power: 0,
            temperature: 0,
            uptime: 0,
            pool: 'zyra-main',
            status: 'offline',
            shares: {
              accepted: 0,
              rejected: 0,
              invalid: 0
            },
            earnings24h: 0,
            lastSeen: new Date(Date.now() - 3600000)
          }
        ],
        networkStats: {
          difficulty: 25847329.45,
          hashrate: 156.7,
          blockTime: 600,
          nextAdjustment: 1456,
          reward: 6.25,
          halvingBlocks: 145600
        },
        profitability: {
          revenuePerTH: 0.08,
          electricityCost: 0.12,
          profitPerTH: 0.06,
          breakEvenHashrate: 2.5,
          roi: 265
        },
        hardware: [
          {
            name: 'Antminer S19 Pro',
            hashrate: 110,
            power: 3250,
            price: 3500,
            efficiency: 29.5,
            algorithm: 'SHA-256'
          },
          {
            name: 'Whatsminer M30S++',
            hashrate: 112,
            power: 3472,
            price: 3800,
            efficiency: 31,
            algorithm: 'SHA-256'
          },
          {
            name: 'Antminer S19j Pro',
            hashrate: 104,
            power: 3068,
            price: 3200,
            efficiency: 29.5,
            algorithm: 'SHA-256'
          }
        ]
      };

      setMiningData(mockData);
    } catch (error) {
      console.error('Error fetching mining data:', error);
    }
  };

  const handleAddMiner = async (e) => {
    e.preventDefault();
    // Mock add miner logic
    alert(`Adding miner: ${minerForm.hashrate} TH/s ${minerForm.hardware}`);
    setShowAddMiner(false);
  };

  const handleStartMining = (minerId) => {
    alert(`Starting mining on ${minerId}`);
  };

  const handleStopMining = (minerId) => {
    alert(`Stopping mining on ${minerId}`);
  };

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1000000) return (num / 1000000).toFixed(decimals) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(decimals) + 'K';
    return num.toFixed(decimals);
  };

  const formatHashrate = (hashrate) => {
    if (hashrate >= 1000) return (hashrate / 1000).toFixed(1) + ' PH/s';
    return hashrate.toFixed(1) + ' TH/s';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'mining': return 'text-green-400 bg-green-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      case 'error': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const calculateProfitability = (hashrate, power) => {
    const revenue = hashrate * miningData.profitability.revenuePerTH;
    const cost = (power / 1000) * 24 * minerForm.electricityCost;
    return revenue - cost;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Mining Dashboard</h1>
            <p className="text-blue-200">Monitor and manage your mining operations</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAddMiner(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Miner
            </button>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Network Hashrate</h3>
            <p className="text-2xl font-bold text-white">{formatHashrate(miningData.networkStats.hashrate)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Difficulty</h3>
            <p className="text-2xl font-bold text-yellow-400">{formatNumber(miningData.networkStats.difficulty, 0)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Block Reward</h3>
            <p className="text-2xl font-bold text-green-400">{miningData.networkStats.reward} ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Block Time</h3>
            <p className="text-2xl font-bold text-purple-400">{miningData.networkStats.blockTime}s</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Next Difficulty</h3>
            <p className="text-2xl font-bold text-cyan-400">{miningData.networkStats.nextAdjustment} blocks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Halving In</h3>
            <p className="text-2xl font-bold text-orange-400">{formatNumber(miningData.networkStats.halvingBlocks, 0)}</p>
          </div>
        </div>

        {/* Profitability Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Profitability Calculator</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Revenue per TH/s</p>
              <p className="text-2xl font-bold text-green-400">${miningData.profitability.revenuePerTH.toFixed(3)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Electricity Cost</p>
              <p className="text-2xl font-bold text-red-400">${miningData.profitability.electricityCost.toFixed(3)}/kWh</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Profit per TH/s</p>
              <p className="text-2xl font-bold text-blue-400">${miningData.profitability.profitPerTH.toFixed(3)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Break-even Hashrate</p>
              <p className="text-2xl font-bold text-yellow-400">{miningData.profitability.breakEvenHashrate} TH/s</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Estimated ROI</p>
              <p className="text-2xl font-bold text-purple-400">{miningData.profitability.roi} days</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Miners */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Miners</h2>
              <div className="text-right">
                <p className="text-green-400 font-bold text-lg">
                  {miningData.myMiners.reduce((sum, miner) => sum + miner.earnings24h, 0).toFixed(3)} ZYRA
                </p>
                <p className="text-gray-400 text-sm">24h earnings</p>
              </div>
            </div>

            {miningData.myMiners.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⛏️</div>
                <h3 className="text-xl font-bold text-white mb-2">No Miners Added</h3>
                <p className="text-gray-400 mb-6">Add your first miner to start monitoring</p>
                <button
                  onClick={() => setShowAddMiner(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Add First Miner
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {miningData.myMiners.map((miner) => (
                  <div key={miner.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{miner.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(miner.status)}`}>
                            {miner.status}
                          </span>
                          <span className="text-gray-400 text-sm">Pool: {miner.pool}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">{miner.earnings24h.toFixed(4)} ZYRA</p>
                        <p className="text-gray-400 text-sm">24h earnings</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-gray-400 text-sm">Hashrate</p>
                        <p className="text-white font-bold">{miner.hashrate} TH/s</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Power</p>
                        <p className="text-white font-bold">{miner.power}W</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Temperature</p>
                        <p className={`font-bold ${miner.temperature > 80 ? 'text-red-400' : miner.temperature > 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {miner.temperature}°C
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Uptime</p>
                        <p className="text-white font-bold">{miner.uptime.toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                      <span>Accepted: {miner.shares.accepted}</span>
                      <span>Rejected: {miner.shares.rejected}</span>
                      <span>Invalid: {miner.shares.invalid}</span>
                      <span>Last seen: {miner.lastSeen.toLocaleTimeString()}</span>
                    </div>

                    <div className="flex space-x-2">
                      {miner.status === 'mining' ? (
                        <button
                          onClick={() => handleStopMining(miner.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                        >
                          Stop Mining
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartMining(miner.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                        >
                          Start Mining
                        </button>
                      )}
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        Configure
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mining Pools */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Mining Pools</h2>
            <div className="space-y-4">
              {miningData.pools.map((pool) => (
                <div key={pool.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{pool.name}</h3>
                      <p className="text-gray-400 text-sm font-mono">{pool.url}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 bg-green-400/20 px-2 py-1 rounded text-sm font-semibold">
                        {pool.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-gray-400 text-sm">Pool Fee</p>
                      <p className="text-white font-bold">{pool.fee}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Miners</p>
                      <p className="text-white font-bold">{formatNumber(pool.miners, 0)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Pool Hashrate</p>
                      <p className="text-white font-bold">{formatHashrate(pool.hashrate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">24h Blocks</p>
                      <p className="text-white font-bold">{pool.blocks24h}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-400">Payout: {pool.payout}</span>
                    <span className="text-gray-400">Min: {pool.minPayout} ZYRA</span>
                  </div>

                  <button
                    onClick={() => setSelectedPool(pool)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                  >
                    Connect to Pool
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hardware Comparison */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Hardware Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4">Hardware</th>
                  <th className="text-right py-3 px-4">Hashrate</th>
                  <th className="text-right py-3 px-4">Power</th>
                  <th className="text-right py-3 px-4">Efficiency</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">Daily Profit</th>
                  <th className="text-right py-3 px-4">ROI</th>
                </tr>
              </thead>
              <tbody>
                {miningData.hardware.map((hw, index) => {
                  const dailyProfit = calculateProfitability(hw.hashrate, hw.power);
                  const roi = hw.price / (dailyProfit * 30);
                  
                  return (
                    <tr key={index} className="border-b border-gray-700 hover:bg-white/5">
                      <td className="py-4 px-4 font-semibold">{hw.name}</td>
                      <td className="text-right py-4 px-4">{hw.hashrate} TH/s</td>
                      <td className="text-right py-4 px-4">{hw.power}W</td>
                      <td className="text-right py-4 px-4">{hw.efficiency} J/TH</td>
                      <td className="text-right py-4 px-4">${formatNumber(hw.price, 0)}</td>
                      <td className="text-right py-4 px-4 text-green-400 font-bold">
                        ${dailyProfit.toFixed(2)}
                      </td>
                      <td className="text-right py-4 px-4">
                        <span className={roi < 12 ? 'text-green-400' : roi < 24 ? 'text-yellow-400' : 'text-red-400'}>
                          {roi.toFixed(1)}mo
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Miner Modal */}
        {showAddMiner && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Add New Miner</h3>
                <button
                  onClick={() => setShowAddMiner(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddMiner} className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Hardware Type</label>
                  <select
                    value={minerForm.hardware}
                    onChange={(e) => setMinerForm(prev => ({ ...prev, hardware: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  >
                    <option value="ASIC">ASIC Miner</option>
                    <option value="GPU">GPU Rig</option>
                    <option value="CPU">CPU Miner</option>
                    <option value="FPGA">FPGA Miner</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Algorithm</label>
                  <select
                    value={minerForm.algorithm}
                    onChange={(e) => setMinerForm(prev => ({ ...prev, algorithm: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  >
                    <option value="SHA-256">SHA-256</option>
                    <option value="Scrypt">Scrypt</option>
                    <option value="Ethash">Ethash</option>
                    <option value="X11">X11</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Hashrate (TH/s)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={minerForm.hashrate}
                    onChange={(e) => setMinerForm(prev => ({ ...prev, hashrate: e.target.value }))}
                    placeholder="14.5"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Power Consumption (W)</label>
                  <input
                    type="number"
                    value={minerForm.powerConsumption}
                    onChange={(e) => setMinerForm(prev => ({ ...prev, powerConsumption: e.target.value }))}
                    placeholder="1400"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Electricity Cost ($/kWh)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={minerForm.electricityCost}
                    onChange={(e) => setMinerForm(prev => ({ ...prev, electricityCost: parseFloat(e.target.value) }))}
                    placeholder="0.10"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  />
                </div>

                {minerForm.hashrate && minerForm.powerConsumption && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Estimated Profitability</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Revenue:</span>
                        <span className="text-green-400">${(parseFloat(minerForm.hashrate) * miningData.profitability.revenuePerTH).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Electricity:</span>
                        <span className="text-red-400">${((parseFloat(minerForm.powerConsumption) / 1000) * 24 * minerForm.electricityCost).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Daily Profit:</span>
                        <span className="text-blue-400">${calculateProfitability(parseFloat(minerForm.hashrate), parseFloat(minerForm.powerConsumption)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Add Miner
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
