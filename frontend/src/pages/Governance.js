import React, { useState, useEffect } from 'react';

export default function Governance() {
  const [proposals, setProposals] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: '',
    executionDelay: 7,
    showForm: false
  });
  const [activeTab, setActiveTab] = useState('active');

  const governanceStats = {
    totalProposals: 24,
    activeProposals: 3,
    totalVoters: 1247,
    quorumThreshold: 5000000,
    votingPower: 2500.75
  };

  useEffect(() => {
    fetchProposals();
    fetchUserVotes();
  }, []);

  const fetchProposals = async () => {
    try {
      // Mock proposal data - replace with actual API calls
      const mockProposals = [
        {
          id: '1',
          title: 'Zyra Network Upgrade v2.2',
          description: 'Propose upgrading the Zyra network to version 2.2 which includes improved transaction throughput, enhanced security features, and reduced transaction fees. This upgrade will implement sharding technology to increase scalability.',
          category: 'Protocol Upgrade',
          proposer: '0x742d35Cc6639C0532fEb996DD9BaA4a2ce0f6e3f',
          startTime: new Date(Date.now() - 86400000).toISOString(),
          endTime: new Date(Date.now() + 6 * 86400000).toISOString(),
          status: 'active',
          votesFor: 3250000,
          votesAgainst: 750000,
          totalVotes: 4000000,
          quorum: 5000000,
          executionDelay: 7,
          category: 'Technical'
        },
        {
          id: '2',
          title: 'Increase Validator Rewards by 15%',
          description: 'Proposal to increase validator rewards from 8% to 9.2% annually to incentivize more participation in network security and maintain decentralization. This change will help attract new validators and retain existing ones.',
          category: 'Economic',
          proposer: '0x95ba1f109551bD432803012645Hac136c29F47cd',
          startTime: new Date(Date.now() - 172800000).toISOString(),
          endTime: new Date(Date.now() + 4 * 86400000).toISOString(),
          status: 'active',
          votesFor: 2800000,
          votesAgainst: 1200000,
          totalVotes: 4000000,
          quorum: 5000000,
          executionDelay: 14,
          category: 'Economic'
        },
        {
          id: '3',
          title: 'Community Fund Allocation for DeFi Development',
          description: 'Allocate 500,000 ZYRA from the community fund to support DeFi protocol development on the Zyra ecosystem. This will fund grants for developers building DEXes, lending protocols, and other DeFi applications.',
          category: 'Funding',
          proposer: '0x8ba1f109551bD432803012645Hac136c29F47cd',
          startTime: new Date(Date.now() - 259200000).toISOString(),
          endTime: new Date(Date.now() + 2 * 86400000).toISOString(),
          status: 'active',
          votesFor: 4200000,
          votesAgainst: 800000,
          totalVotes: 5000000,
          quorum: 5000000,
          executionDelay: 3,
          category: 'Funding'
        },
        {
          id: '4',
          title: 'Reduce Block Time to 10 Seconds',
          description: 'Proposal to reduce the average block time from 15 seconds to 10 seconds to improve user experience and transaction confirmation speed.',
          category: 'Technical',
          proposer: '0x742d35Cc6639C0532fEb996DD9BaA4a2ce0f6e3f',
          startTime: new Date(Date.now() - 604800000).toISOString(),
          endTime: new Date(Date.now() - 86400000).toISOString(),
          status: 'passed',
          votesFor: 5500000,
          votesAgainst: 1000000,
          totalVotes: 6500000,
          quorum: 5000000,
          executionDelay: 7,
          category: 'Technical'
        },
        {
          id: '5',
          title: 'Implement Cross-Chain Bridge',
          description: 'Develop and deploy a secure cross-chain bridge to enable asset transfers between Zyra and Ethereum networks.',
          category: 'Technical',
          proposer: '0x95ba1f109551bD432803012645Hac136c29F47cd',
          startTime: new Date(Date.now() - 1209600000).toISOString(),
          endTime: new Date(Date.now() - 604800000).toISOString(),
          status: 'failed',
          votesFor: 2000000,
          votesAgainst: 4500000,
          totalVotes: 6500000,
          quorum: 5000000,
          executionDelay: 14,
          category: 'Technical'
        }
      ];

      setProposals(mockProposals);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const fetchUserVotes = async () => {
    try {
      // Mock user votes - replace with actual API call
      setUserVotes({
        '1': 'for',
        '4': 'for'
      });
    } catch (error) {
      console.error('Error fetching user votes:', error);
    }
  };

  const submitVote = async (proposalId, vote) => {
    try {
      // Mock vote submission - replace with actual voting logic
      setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
      
      // Update proposal vote counts
      setProposals(prev => prev.map(proposal => {
        if (proposal.id === proposalId) {
          const votePower = governanceStats.votingPower;
          return {
            ...proposal,
            votesFor: vote === 'for' ? proposal.votesFor + votePower : proposal.votesFor,
            votesAgainst: vote === 'against' ? proposal.votesAgainst + votePower : proposal.votesAgainst,
            totalVotes: proposal.totalVotes + votePower
          };
        }
        return proposal;
      }));

      alert(`Successfully voted ${vote} on proposal!`);
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote');
    }
  };

  const createProposal = async (e) => {
    e.preventDefault();
    setNewProposal(prev => ({ ...prev, loading: true }));

    try {
      // Mock proposal creation - replace with actual logic
      const proposal = {
        id: Date.now().toString(),
        title: newProposal.title,
        description: newProposal.description,
        category: newProposal.category,
        proposer: '0x' + Math.random().toString(16).substr(2, 40),
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 7 * 86400000).toISOString(),
        status: 'active',
        votesFor: 0,
        votesAgainst: 0,
        totalVotes: 0,
        quorum: 5000000,
        executionDelay: newProposal.executionDelay
      };

      setProposals(prev => [proposal, ...prev]);
      setNewProposal({
        title: '',
        description: '',
        category: '',
        executionDelay: 7,
        showForm: false,
        loading: false
      });

      alert('Proposal created successfully!');
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal');
      setNewProposal(prev => ({ ...prev, loading: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-600';
      case 'passed': return 'bg-green-600';
      case 'failed': return 'bg-red-600';
      case 'executed': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const calculateProgress = (proposal) => {
    return Math.min((proposal.totalVotes / proposal.quorum) * 100, 100);
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Voting ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  const filteredProposals = proposals.filter(proposal => {
    if (activeTab === 'active') return proposal.status === 'active';
    if (activeTab === 'passed') return proposal.status === 'passed';
    if (activeTab === 'failed') return proposal.status === 'failed';
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Zyra Governance</h1>
        <button
          onClick={() => setNewProposal(prev => ({ ...prev, showForm: !prev.showForm }))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Create Proposal
        </button>
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Total Proposals</h3>
          <p className="text-3xl font-bold text-white">{governanceStats.totalProposals}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Active Proposals</h3>
          <p className="text-3xl font-bold text-white">{governanceStats.activeProposals}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Total Voters</h3>
          <p className="text-3xl font-bold text-white">{governanceStats.totalVoters.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Quorum</h3>
          <p className="text-2xl font-bold text-white">{(governanceStats.quorumThreshold / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">My Voting Power</h3>
          <p className="text-2xl font-bold text-white">{governanceStats.votingPower.toFixed(2)}</p>
        </div>
      </div>

      {/* Create Proposal Form */}
      {newProposal.showForm && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Create New Proposal</h2>
          <form onSubmit={createProposal} className="space-y-4">
            <div>
              <label className="text-blue-200 text-sm block mb-1">Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter proposal title"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="text-blue-200 text-sm block mb-1">Category</label>
              <select
                value={newProposal.category}
                onChange={(e) => setNewProposal(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-gray-300"
                required
              >
                <option value="">Select category...</option>
                <option value="Technical">Technical</option>
                <option value="Economic">Economic</option>
                <option value="Funding">Funding</option>
                <option value="Governance">Governance</option>
              </select>
            </div>
            <div>
              <label className="text-blue-200 text-sm block mb-1">Description</label>
              <textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the proposal"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="text-blue-200 text-sm block mb-1">Execution Delay (days)</label>
              <input
                type="number"
                value={newProposal.executionDelay}
                onChange={(e) => setNewProposal(prev => ({ ...prev, executionDelay: parseInt(e.target.value) }))}
                min="1"
                max="30"
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-gray-300"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={newProposal.loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {newProposal.loading ? 'Creating...' : 'Submit Proposal'}
              </button>
              <button
                type="button"
                onClick={() => setNewProposal(prev => ({ ...prev, showForm: false }))}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Proposal Tabs */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="flex space-x-4 mb-6">
          {['active', 'passed', 'failed', 'all'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/20 text-blue-200 hover:bg-white/30'
              }`}
            >
              {tab} Proposals
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map(proposal => (
            <div key={proposal.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded text-sm text-white ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-600 rounded text-sm text-white">
                      {proposal.category}
                    </span>
                  </div>
                  <p className="text-blue-200 text-sm mb-3">{proposal.description}</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Proposer: {proposal.proposer}</div>
                    <div>Started: {new Date(proposal.startTime).toLocaleString()}</div>
                    <div>Ends: {new Date(proposal.endTime).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Voting Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 text-sm">Participation: {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%</span>
                  <span className="text-gray-400 text-sm">{getTimeRemaining(proposal.endTime)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${calculateProgress(proposal)}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-green-400 text-lg font-bold">{((proposal.votesFor / 1000000)).toFixed(2)}M</div>
                    <div className="text-green-400 text-sm">For ({((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 text-lg font-bold">{((proposal.votesAgainst / 1000000)).toFixed(2)}M</div>
                    <div className="text-red-400 text-sm">Against ({((proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}%)</div>
                  </div>
                </div>
              </div>

              {/* Voting Buttons */}
              {proposal.status === 'active' && (
                <div className="flex space-x-4">
                  {!userVotes[proposal.id] ? (
                    <>
                      <button
                        onClick={() => submitVote(proposal.id, 'for')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Vote For
                      </button>
                      <button
                        onClick={() => submitVote(proposal.id, 'against')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Vote Against
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 text-center py-2 px-4 bg-gray-600 rounded-lg text-white">
                      You voted: {userVotes[proposal.id].toUpperCase()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No {activeTab} proposals found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
