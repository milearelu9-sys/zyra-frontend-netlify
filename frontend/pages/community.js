import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Community() {
  const [communityData, setCommunityData] = useState({
    stats: {},
    forums: [],
    events: [],
    proposals: [],
    contributors: [],
    socials: []
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      const mockData = {
        stats: {
          totalMembers: 45672,
          activeMembers: 8934,
          monthlyGrowth: 12.5,
          forumPosts: 23456,
          githubContributors: 89,
          discordMembers: 15234
        },
        forums: [
          {
            id: 1,
            category: 'General Discussion',
            description: 'General topics about Zyra blockchain',
            posts: 3450,
            members: 5672,
            lastActivity: '2 minutes ago',
            moderators: ['Alice', 'Bob', 'Carol']
          },
          {
            id: 2,
            category: 'Development',
            description: 'Technical discussions and development help',
            posts: 1890,
            members: 1234,
            lastActivity: '15 minutes ago',
            moderators: ['Dave', 'Eve']
          },
          {
            id: 3,
            category: 'DeFi & Trading',
            description: 'DeFi protocols, trading strategies, and market analysis',
            posts: 2567,
            members: 3421,
            lastActivity: '1 hour ago',
            moderators: ['Frank', 'Grace']
          },
          {
            id: 4,
            category: 'Node Operators',
            description: 'Validator and node operation discussions',
            posts: 987,
            members: 567,
            lastActivity: '3 hours ago',
            moderators: ['Henry', 'Ivy']
          },
          {
            id: 5,
            category: 'Governance',
            description: 'Network governance proposals and voting',
            posts: 456,
            members: 789,
            lastActivity: '6 hours ago',
            moderators: ['Jack', 'Kate']
          }
        ],
        events: [
          {
            id: 1,
            title: 'Zyra Developer Workshop',
            type: 'Workshop',
            date: '2025-08-25',
            time: '14:00 UTC',
            location: 'Online',
            participants: 156,
            maxParticipants: 200,
            description: 'Learn to build DApps on Zyra Network with hands-on coding sessions.',
            status: 'upcoming'
          },
          {
            id: 2,
            title: 'Community AMA with Core Team',
            type: 'AMA',
            date: '2025-08-30',
            time: '18:00 UTC',
            location: 'Discord',
            participants: 89,
            maxParticipants: null,
            description: 'Ask the core development team anything about Zyra\'s roadmap.',
            status: 'upcoming'
          },
          {
            id: 3,
            title: 'DeFi Summer Hackathon',
            type: 'Hackathon',
            date: '2025-09-15',
            time: '00:00 UTC',
            location: 'Virtual',
            participants: 45,
            maxParticipants: 100,
            description: '48-hour hackathon focused on innovative DeFi solutions.',
            status: 'registration'
          },
          {
            id: 4,
            title: 'Blockchain Conference 2025',
            type: 'Conference',
            date: '2025-10-12',
            time: '09:00 UTC',
            location: 'San Francisco',
            participants: 234,
            maxParticipants: 500,
            description: 'Annual blockchain conference featuring Zyra ecosystem projects.',
            status: 'upcoming'
          }
        ],
        proposals: [
          {
            id: 'ZYR-PROP-001',
            title: 'Increase Block Size Limit',
            author: 'CoreTeam',
            status: 'active',
            votesFor: 15672,
            votesAgainst: 3421,
            abstain: 891,
            endDate: '2025-08-20',
            description: 'Proposal to increase the block size limit from 2MB to 4MB to improve throughput.',
            category: 'protocol'
          },
          {
            id: 'ZYR-PROP-002',
            title: 'Community Fund Allocation',
            author: 'CommunityDAO',
            status: 'passed',
            votesFor: 23451,
            votesAgainst: 1234,
            abstain: 567,
            endDate: '2025-08-10',
            description: 'Allocate 500,000 ZYRA from community fund for ecosystem development.',
            category: 'funding'
          },
          {
            id: 'ZYR-PROP-003',
            title: 'New Staking Rewards Model',
            author: 'StakingCommittee',
            status: 'draft',
            votesFor: 0,
            votesAgainst: 0,
            abstain: 0,
            endDate: '2025-08-25',
            description: 'Implement dynamic staking rewards based on network participation.',
            category: 'rewards'
          }
        ],
        contributors: [
          {
            name: 'Alice Johnson',
            role: 'Core Developer',
            contributions: 342,
            joinDate: '2024-01-15',
            avatar: '👩‍💻',
            specialization: 'Consensus & Protocol'
          },
          {
            name: 'Bob Smith',
            role: 'DeFi Lead',
            contributions: 198,
            joinDate: '2024-03-20',
            avatar: '👨‍💼',
            specialization: 'DeFi Protocols'
          },
          {
            name: 'Carol Davis',
            role: 'Community Manager',
            contributions: 156,
            joinDate: '2024-02-10',
            avatar: '👩‍🎓',
            specialization: 'Community Growth'
          },
          {
            name: 'Dave Wilson',
            role: 'Security Researcher',
            contributions: 89,
            joinDate: '2024-04-05',
            avatar: '👨‍🔬',
            specialization: 'Security Audits'
          },
          {
            name: 'Eve Brown',
            role: 'Frontend Developer',
            contributions: 234,
            joinDate: '2024-01-30',
            avatar: '👩‍🎨',
            specialization: 'UI/UX Design'
          }
        ],
        socials: [
          {
            platform: 'Discord',
            members: 15234,
            growth: '+8.5%',
            url: 'https://discord.gg/zyra',
            icon: '💬'
          },
          {
            platform: 'Twitter',
            members: 23456,
            growth: '+12.3%',
            url: 'https://twitter.com/zyranetwork',
            icon: '🐦'
          },
          {
            platform: 'GitHub',
            members: 1234,
            growth: '+15.7%',
            url: 'https://github.com/zyra-network',
            icon: '🐙'
          },
          {
            platform: 'Telegram',
            members: 8765,
            growth: '+6.2%',
            url: 'https://t.me/zyranetwork',
            icon: '✈️'
          },
          {
            platform: 'Reddit',
            members: 4567,
            growth: '+9.8%',
            url: 'https://reddit.com/r/zyranetwork',
            icon: '🤖'
          }
        ]
      };

      setCommunityData(mockData);
    } catch (error) {
      console.error('Error fetching community data:', error);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    alert(`New post "${newPost.title}" submitted to ${newPost.category} category!`);
    setNewPost({ title: '', content: '', category: 'general' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400';
      case 'passed': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'draft': return 'bg-gray-500/20 text-gray-400';
      case 'upcoming': return 'bg-purple-500/20 text-purple-400';
      case 'registration': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Community Hub</h1>
            <p className="text-blue-200">Connect, contribute, and grow with the Zyra community</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Members</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(communityData.stats.totalMembers)}</p>
            <p className="text-green-400 text-xs">+{communityData.stats.monthlyGrowth}% this month</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Active Members</h3>
            <p className="text-2xl font-bold text-green-400">{formatNumber(communityData.stats.activeMembers)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Forum Posts</h3>
            <p className="text-2xl font-bold text-purple-400">{formatNumber(communityData.stats.forumPosts)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Contributors</h3>
            <p className="text-2xl font-bold text-yellow-400">{communityData.stats.githubContributors}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Discord</h3>
            <p className="text-2xl font-bold text-cyan-400">{formatNumber(communityData.stats.discordMembers)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Growth Rate</h3>
            <p className="text-2xl font-bold text-orange-400">+{communityData.stats.monthlyGrowth}%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'forums', 'events', 'governance', 'contributors'].map((tab) => (
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
          <div className="space-y-8">
            {/* Social Media Channels */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Join Our Community</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {communityData.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all text-center group"
                  >
                    <div className="text-3xl mb-2">{social.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{social.platform}</h3>
                    <p className="text-blue-200 font-bold">{formatNumber(social.members)}</p>
                    <p className="text-green-400 text-sm">{social.growth}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">Join Discussion</h3>
                <p className="text-gray-400 text-sm mb-4">Participate in community forums</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Browse Forums
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">🗳️</div>
                <h3 className="text-xl font-bold text-white mb-2">Vote on Proposals</h3>
                <p className="text-gray-400 text-sm mb-4">Shape the future of Zyra</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Proposals
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="text-xl font-bold text-white mb-2">Contribute Code</h3>
                <p className="text-gray-400 text-sm mb-4">Help build the ecosystem</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  GitHub Repo
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="text-xl font-bold text-white mb-2">Attend Events</h3>
                <p className="text-gray-400 text-sm mb-4">Join workshops and meetups</p>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Events
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="space-y-6">
            {/* New Post Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Start New Discussion</h3>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Discussion title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-gray-400"
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  >
                    <option value="general">General Discussion</option>
                    <option value="development">Development</option>
                    <option value="defi">DeFi & Trading</option>
                    <option value="nodes">Node Operators</option>
                    <option value="governance">Governance</option>
                  </select>
                </div>
                <textarea
                  rows="4"
                  placeholder="Share your thoughts..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-gray-400"
                ></textarea>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Start Discussion
                </button>
              </form>
            </div>

            {/* Forum Categories */}
            <div className="space-y-4">
              {communityData.forums.map((forum) => (
                <div key={forum.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{forum.category}</h3>
                      <p className="text-gray-400">{forum.description}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{forum.lastActivity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-6 text-sm">
                      <span className="text-blue-200">
                        <strong>{formatNumber(forum.posts)}</strong> posts
                      </span>
                      <span className="text-green-200">
                        <strong>{formatNumber(forum.members)}</strong> members
                      </span>
                      <span className="text-purple-200">
                        Mods: {forum.moderators.join(', ')}
                      </span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                      Enter Forum
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityData.events.map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <p className="text-gray-400">{event.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                <p className="text-blue-200 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">📅 Date:</span>
                    <span className="text-white">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🕐 Time:</span>
                    <span className="text-white">{event.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">📍 Location:</span>
                    <span className="text-white">{event.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">👥 Participants:</span>
                    <span className="text-white">
                      {event.participants}{event.maxParticipants ? ` / ${event.maxParticipants}` : ''}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all">
                  {event.status === 'registration' ? 'Register Now' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Governance Tab */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            {communityData.proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                    <p className="text-gray-400">#{proposal.id} • by {proposal.author}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>

                <p className="text-blue-200 mb-4">{proposal.description}</p>

                {proposal.status !== 'draft' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/20">
                      <p className="text-2xl font-bold text-green-400">{formatNumber(proposal.votesFor)}</p>
                      <p className="text-green-200 text-sm">For</p>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/20">
                      <p className="text-2xl font-bold text-red-400">{formatNumber(proposal.votesAgainst)}</p>
                      <p className="text-red-200 text-sm">Against</p>
                    </div>
                    <div className="bg-gray-500/10 rounded-lg p-3 text-center border border-gray-500/20">
                      <p className="text-2xl font-bold text-gray-400">{formatNumber(proposal.abstain)}</p>
                      <p className="text-gray-200 text-sm">Abstain</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    {proposal.status === 'active' ? 'Ends' : 'Ended'}: {formatDate(proposal.endDate)}
                  </span>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                      View Details
                    </button>
                    {proposal.status === 'active' && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        Vote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contributors Tab */}
        {activeTab === 'contributors' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Top Contributors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityData.contributors.map((contributor, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">{contributor.avatar}</div>
                    <h3 className="text-lg font-bold text-white">{contributor.name}</h3>
                    <p className="text-blue-200 mb-2">{contributor.role}</p>
                    <p className="text-gray-400 text-sm mb-2">{contributor.specialization}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">{contributor.contributions} commits</span>
                      <span className="text-gray-400">Since {formatDate(contributor.joinDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Want to Contribute?</h3>
              <p className="text-blue-200 mb-6">
                Join our growing community of contributors and help build the future of decentralized finance.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                  View GitHub
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Contributor Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
