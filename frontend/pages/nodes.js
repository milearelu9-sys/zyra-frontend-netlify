import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Nodes() {
  const [nodeData, setNodeData] = useState({
    myNodes: [],
    availableNodes: [],
    networkStats: {},
    rewards: {},
    nodeTypes: []
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('my-nodes');
  const [showNodeSetup, setShowNodeSetup] = useState(false);
  const [nodeForm, setNodeForm] = useState({
    type: 'validator',
    stake: '',
    commission: 5,
    location: 'us-east',
    specs: 'medium'
  });

  useEffect(() => {
    fetchNodeData();
    const interval = setInterval(fetchNodeData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNodeData = async () => {
    try {
      const mockData = {
        myNodes: [
          {
            id: 'node-001',
            type: 'validator',
            status: 'active',
            stake: 50000,
            commission: 5.5,
            uptime: 99.7,
            location: 'US East',
            rewards24h: 125.6,
            delegators: 234,
            totalDelegated: 450000,
            version: '1.2.3',
            lastBlock: 2847391
          },
          {
            id: 'node-002',
            type: 'sentry',
            status: 'syncing',
            stake: 0,
            commission: 0,
            uptime: 98.2,
            location: 'EU West',
            rewards24h: 0,
            delegators: 0,
            totalDelegated: 0,
            version: '1.2.2',
            lastBlock: 2847385
          }
        ],
        availableNodes: Array.from({ length: 50 }, (_, i) => ({
          id: `validator-${i + 1}`,
          name: `Validator ${i + 1}`,
          commission: 3 + Math.random() * 7,
          stake: 10000 + Math.random() * 90000,
          uptime: 95 + Math.random() * 5,
          apr: 8 + Math.random() * 12,
          location: ['US East', 'US West', 'EU West', 'EU East', 'Asia Pacific'][Math.floor(Math.random() * 5)],
          delegators: Math.floor(50 + Math.random() * 500),
          status: Math.random() > 0.1 ? 'active' : 'jailed',
          verified: Math.random() > 0.3
        })),
        networkStats: {
          totalNodes: 156,
          activeValidators: 125,
          totalStaked: 12500000,
          averageUptime: 98.5,
          networkHashrate: 45.6,
          blockTime: 6.2
        },
        rewards: {
          totalEarned: 1256.78,
          pendingRewards: 45.23,
          claimableRewards: 89.45,
          estimatedApr: 12.5
        },
        nodeTypes: [
          {
            type: 'validator',
            name: 'Validator Node',
            description: 'Participate in consensus and earn staking rewards',
            minStake: 10000,
            requirements: ['24/7 uptime', 'High-performance server', 'Reliable internet'],
            rewards: '8-15% APR',
            cost: 'High'
          },
          {
            type: 'sentry',
            name: 'Sentry Node',
            description: 'Relay transactions and support network security',
            minStake: 0,
            requirements: ['Good uptime', 'Standard server', 'Stable connection'],
            rewards: 'Network fees',
            cost: 'Medium'
          },
          {
            type: 'archive',
            name: 'Archive Node',
            description: 'Store complete blockchain history for dApps',
            minStake: 0,
            requirements: ['Large storage', 'High bandwidth', 'Reliable hosting'],
            rewards: 'Service fees',
            cost: 'Very High'
          }
        ]
      };

      setNodeData(mockData);
    } catch (error) {
      console.error('Error fetching node data:', error);
    }
  };

  const handleNodeSetup = async (e) => {
    e.preventDefault();
    if (!nodeForm.stake && nodeForm.type === 'validator') return;

    // Mock node setup
    alert(`Setting up ${nodeForm.type} node with ${nodeForm.stake} ZYRA stake`);
    setShowNodeSetup(false);
  };

  const handleDelegate = (nodeId, amount) => {
    alert(`Delegating ${amount} ZYRA to ${nodeId}`);
  };

  const handleUndelegate = (nodeId, amount) => {
    alert(`Undelegating ${amount} ZYRA from ${nodeId}`);
  };

  const handleClaimRewards = () => {
    alert(`Claiming ${nodeData.rewards.claimableRewards} ZYRA in rewards`);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'syncing': return 'text-yellow-400 bg-yellow-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'jailed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Node Management</h1>
            <p className="text-blue-200">Run nodes and participate in network consensus</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowNodeSetup(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Setup Node
            </button>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Nodes</h3>
            <p className="text-2xl font-bold text-white">{nodeData.networkStats.totalNodes}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Active Validators</h3>
            <p className="text-2xl font-bold text-green-400">{nodeData.networkStats.activeValidators}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Staked</h3>
            <p className="text-2xl font-bold text-purple-400">{formatNumber(nodeData.networkStats.totalStaked)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Avg Uptime</h3>
            <p className="text-2xl font-bold text-blue-400">{nodeData.networkStats.averageUptime}%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Block Time</h3>
            <p className="text-2xl font-bold text-yellow-400">{nodeData.networkStats.blockTime}s</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Hash Rate</h3>
            <p className="text-2xl font-bold text-cyan-400">{nodeData.networkStats.networkHashrate}TH/s</p>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">My Rewards</h2>
            <button
              onClick={handleClaimRewards}
              disabled={nodeData.rewards.claimableRewards === 0}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              Claim Rewards
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Total Earned</p>
              <p className="text-2xl font-bold text-green-400">{nodeData.rewards.totalEarned.toFixed(2)} ZYRA</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pending Rewards</p>
              <p className="text-2xl font-bold text-yellow-400">{nodeData.rewards.pendingRewards.toFixed(2)} ZYRA</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Claimable</p>
              <p className="text-2xl font-bold text-blue-400">{nodeData.rewards.claimableRewards.toFixed(2)} ZYRA</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Estimated APR</p>
              <p className="text-2xl font-bold text-purple-400">{nodeData.rewards.estimatedApr}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['my-nodes', 'validators', 'node-types'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* My Nodes Tab */}
        {activeTab === 'my-nodes' && (
          <div className="space-y-6">
            {nodeData.myNodes.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 text-center border border-white/20">
                <div className="text-6xl mb-4">🖥️</div>
                <h3 className="text-xl font-bold text-white mb-2">No Nodes Running</h3>
                <p className="text-gray-400 mb-6">Set up your first node to start earning rewards</p>
                <button
                  onClick={() => setShowNodeSetup(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Setup First Node
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {nodeData.myNodes.map((node) => (
                  <div key={node.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{node.id}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(node.status)}`}>
                            {node.status}
                          </span>
                          <span className="text-gray-400">{node.type} • {node.location}</span>
                          <span className="text-gray-400">v{node.version}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{node.rewards24h.toFixed(2)} ZYRA</p>
                        <p className="text-gray-400 text-sm">24h rewards</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Uptime</p>
                        <p className="text-white font-bold">{node.uptime}%</p>
                      </div>
                      {node.type === 'validator' && (
                        <>
                          <div>
                            <p className="text-gray-400 text-sm">My Stake</p>
                            <p className="text-white font-bold">{formatNumber(node.stake)} ZYRA</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Commission</p>
                            <p className="text-white font-bold">{node.commission}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Delegators</p>
                            <p className="text-white font-bold">{node.delegators}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Total Delegated</p>
                            <p className="text-white font-bold">{formatNumber(node.totalDelegated)} ZYRA</p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-gray-400 text-sm">Last Block</p>
                        <p className="text-white font-bold">#{formatNumber(node.lastBlock)}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                        View Details
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors">
                        Update Config
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                        Stop Node
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Validators Tab */}
        {activeTab === 'validators' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">All Validators</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4">Validator</th>
                    <th className="text-right py-3 px-4">Commission</th>
                    <th className="text-right py-3 px-4">APR</th>
                    <th className="text-right py-3 px-4">Stake</th>
                    <th className="text-right py-3 px-4">Uptime</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nodeData.availableNodes.slice(0, 20).map((validator) => (
                    <tr key={validator.id} className="border-b border-gray-700 hover:bg-white/5">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {validator.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold">{validator.name}</span>
                            {validator.verified && (
                              <svg className="inline w-4 h-4 text-blue-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            <div className="text-gray-400 text-sm">{validator.location} • {validator.delegators} delegators</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4">{validator.commission.toFixed(1)}%</td>
                      <td className="text-right py-4 px-4 text-green-400 font-semibold">{validator.apr.toFixed(1)}%</td>
                      <td className="text-right py-4 px-4">{formatNumber(validator.stake)} ZYRA</td>
                      <td className="text-right py-4 px-4">
                        <span className={validator.uptime > 99 ? 'text-green-400' : validator.uptime > 95 ? 'text-yellow-400' : 'text-red-400'}>
                          {validator.uptime.toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(validator.status)}`}>
                          {validator.status}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => handleDelegate(validator.id, 100)}
                          disabled={validator.status !== 'active'}
                          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm transition-colors mr-2"
                        >
                          Delegate
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Node Types Tab */}
        {activeTab === 'node-types' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodeData.nodeTypes.map((nodeType) => (
              <div key={nodeType.type} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">
                    {nodeType.type === 'validator' ? '⚡' : nodeType.type === 'sentry' ? '🛡️' : '📚'}
                  </div>
                  <h3 className="text-xl font-bold text-white">{nodeType.name}</h3>
                  <p className="text-gray-400 mt-2">{nodeType.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Min Stake Required</p>
                    <p className="text-white font-semibold">
                      {nodeType.minStake > 0 ? `${formatNumber(nodeType.minStake)} ZYRA` : 'None'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Expected Rewards</p>
                    <p className="text-green-400 font-semibold">{nodeType.rewards}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Operating Cost</p>
                    <p className="text-yellow-400 font-semibold">{nodeType.cost}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Requirements</p>
                    <ul className="text-white text-sm mt-1">
                      {nodeType.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNodeForm(prev => ({ ...prev, type: nodeType.type }));
                    setShowNodeSetup(true);
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all"
                >
                  Setup {nodeType.name}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Node Setup Modal */}
        {showNodeSetup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Setup Node</h3>
                <button
                  onClick={() => setShowNodeSetup(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleNodeSetup} className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Node Type</label>
                  <select
                    value={nodeForm.type}
                    onChange={(e) => setNodeForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  >
                    <option value="validator">Validator Node</option>
                    <option value="sentry">Sentry Node</option>
                    <option value="archive">Archive Node</option>
                  </select>
                </div>

                {nodeForm.type === 'validator' && (
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Stake Amount</label>
                    <input
                      type="number"
                      value={nodeForm.stake}
                      onChange={(e) => setNodeForm(prev => ({ ...prev, stake: e.target.value }))}
                      placeholder="Minimum 10,000 ZYRA"
                      min="10000"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Location</label>
                    <select
                      value={nodeForm.location}
                      onChange={(e) => setNodeForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="us-east">US East</option>
                      <option value="us-west">US West</option>
                      <option value="eu-west">EU West</option>
                      <option value="asia">Asia Pacific</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Server Specs</label>
                    <select
                      value={nodeForm.specs}
                      onChange={(e) => setNodeForm(prev => ({ ...prev, specs: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="small">Small (2 CPU, 4GB RAM)</option>
                      <option value="medium">Medium (4 CPU, 8GB RAM)</option>
                      <option value="large">Large (8 CPU, 16GB RAM)</option>
                    </select>
                  </div>
                </div>

                {nodeForm.type === 'validator' && (
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Commission Rate (%)</label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={nodeForm.commission}
                      onChange={(e) => setNodeForm(prev => ({ ...prev, commission: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>0%</span>
                      <span className="text-white font-semibold">{nodeForm.commission}%</span>
                      <span>20%</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Setup Node ({nodeForm.type === 'validator' ? '10,000' : '0'} ZYRA)
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Nodes), { ssr: false });
