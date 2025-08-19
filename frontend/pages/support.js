import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Support() {
  const [supportData, setSupportData] = useState({
    tickets: [],
    faqs: [],
    guides: [],
    knowledgeBase: []
  });

  const [activeTab, setActiveTab] = useState('help-center');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: '',
    attachments: []
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    fetchSupportData();
  }, []);

  useEffect(() => {
    // Filter FAQs based on search query
    const filtered = supportData.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, supportData.faqs]);

  const fetchSupportData = async () => {
    try {
      const mockData = {
        tickets: [
          {
            id: 'ZYR-SUPPORT-001',
            subject: 'Wallet connection issues',
            status: 'open',
            priority: 'high',
            category: 'technical',
            createdAt: '2025-08-15T10:30:00Z',
            updatedAt: '2025-08-16T14:22:00Z',
            agent: 'Alice Johnson',
            responses: 3
          },
          {
            id: 'ZYR-SUPPORT-002',
            subject: 'Staking rewards not showing',
            status: 'in-progress',
            priority: 'medium',
            category: 'staking',
            createdAt: '2025-08-14T09:15:00Z',
            updatedAt: '2025-08-16T11:45:00Z',
            agent: 'Bob Smith',
            responses: 5
          },
          {
            id: 'ZYR-SUPPORT-003',
            subject: 'Transaction failed but fee deducted',
            status: 'resolved',
            priority: 'high',
            category: 'transactions',
            createdAt: '2025-08-13T16:20:00Z',
            updatedAt: '2025-08-15T10:30:00Z',
            agent: 'Carol Davis',
            responses: 8
          }
        ],
        faqs: [
          {
            id: 1,
            question: 'How do I connect my wallet to Zyra Network?',
            answer: 'To connect your wallet to Zyra Network, click the "Connect Wallet" button in the top right corner of any page. Select your preferred wallet (MetaMask, WalletConnect, etc.) and approve the connection. Make sure you have the Zyra Network added to your wallet settings.',
            category: 'Wallet',
            tags: ['wallet', 'connection', 'metamask'],
            helpful: 156,
            views: 2341
          },
          {
            id: 2,
            question: 'What are the staking requirements for Zyra?',
            answer: 'To stake ZYRA tokens, you need a minimum of 100 ZYRA. Staking rewards are distributed daily based on your stake amount and the current APY. You can unstake at any time, but there is a 7-day unbonding period.',
            category: 'Staking',
            tags: ['staking', 'requirements', 'rewards'],
            helpful: 203,
            views: 3456
          },
          {
            id: 3,
            question: 'How do I add Zyra Network to my wallet?',
            answer: 'To add Zyra Network: 1) Open your wallet settings, 2) Select "Add Network", 3) Use these details: Network Name: Zyra Network, RPC URL: https://rpc.zyranetwork.com, Chain ID: 2024, Symbol: ZYRA, Block Explorer: https://explorer.zyranetwork.com',
            category: 'Wallet',
            tags: ['network', 'rpc', 'setup'],
            helpful: 189,
            views: 2987
          },
          {
            id: 4,
            question: 'What are the transaction fees on Zyra?',
            answer: 'Zyra Network features extremely low transaction fees, typically ranging from 0.001 to 0.01 ZYRA per transaction. Fees are dynamic and adjust based on network congestion to ensure fast and cost-effective transactions.',
            category: 'Transactions',
            tags: ['fees', 'gas', 'cost'],
            helpful: 145,
            views: 1876
          },
          {
            id: 5,
            question: 'How do I participate in governance?',
            answer: 'ZYRA token holders can participate in governance by staking their tokens and voting on proposals. Each staked ZYRA token equals one vote. Proposals are published in the governance section and typically have a 7-day voting period.',
            category: 'Governance',
            tags: ['governance', 'voting', 'dao'],
            helpful: 98,
            views: 1543
          },
          {
            id: 6,
            question: 'Is Zyra Network secure?',
            answer: 'Yes, Zyra Network employs multiple security measures including consensus mechanism security, smart contract audits, bug bounty programs, and continuous monitoring. All major protocols undergo comprehensive security audits before deployment.',
            category: 'Security',
            tags: ['security', 'audits', 'safety'],
            helpful: 167,
            views: 2234
          }
        ],
        guides: [
          {
            id: 1,
            title: 'Getting Started with Zyra Network',
            description: 'Complete guide for new users to set up wallet and make first transaction',
            difficulty: 'Beginner',
            duration: '10 minutes',
            steps: 8,
            category: 'Getting Started'
          },
          {
            id: 2,
            title: 'Staking ZYRA Tokens',
            description: 'Step-by-step guide to stake ZYRA tokens and earn rewards',
            difficulty: 'Beginner',
            duration: '15 minutes',
            steps: 6,
            category: 'Staking'
          },
          {
            id: 3,
            title: 'Using DeFi Protocols',
            description: 'How to provide liquidity and use DeFi features on Zyra',
            difficulty: 'Intermediate',
            duration: '25 minutes',
            steps: 12,
            category: 'DeFi'
          },
          {
            id: 4,
            title: 'Running a Validator Node',
            description: 'Complete guide to set up and run a validator node',
            difficulty: 'Advanced',
            duration: '60 minutes',
            steps: 20,
            category: 'Validators'
          }
        ],
        knowledgeBase: [
          {
            category: 'Wallet & Setup',
            articles: 15,
            description: 'Wallet connection, network setup, and basic configuration'
          },
          {
            category: 'Trading & DeFi',
            articles: 23,
            description: 'Token swapping, liquidity provision, and DeFi protocols'
          },
          {
            category: 'Staking & Rewards',
            articles: 18,
            description: 'Staking mechanics, reward distribution, and validators'
          },
          {
            category: 'Governance',
            articles: 12,
            description: 'Voting, proposals, and community governance'
          },
          {
            category: 'Technical',
            articles: 31,
            description: 'API documentation, development guides, and troubleshooting'
          },
          {
            category: 'Security',
            articles: 9,
            description: 'Security best practices and safety guidelines'
          }
        ]
      };

      setSupportData(mockData);
      setFilteredFaqs(mockData.faqs);
    } catch (error) {
      console.error('Error fetching support data:', error);
    }
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    alert(`Support ticket "${newTicket.subject}" submitted successfully! You will receive a confirmation email shortly.`);
    setNewTicket({
      subject: '',
      category: 'technical',
      priority: 'medium',
      description: '',
      attachments: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'critical': return 'bg-red-600/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Support Center</h1>
            <p className="text-blue-200">Get help, find answers, and connect with our support team</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-white font-semibold">Live Chat</h3>
            <p className="text-gray-400 text-sm">Available 24/7</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="text-white font-semibold">Email Support</h3>
            <p className="text-gray-400 text-sm">Response in 4h</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-white font-semibold">Documentation</h3>
            <p className="text-gray-400 text-sm">Comprehensive guides</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">🎥</div>
            <h3 className="text-white font-semibold">Video Tutorials</h3>
            <p className="text-gray-400 text-sm">Step-by-step videos</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['help-center', 'submit-ticket', 'my-tickets', 'knowledge-base'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Help Center Tab */}
        {activeTab === 'help-center' && (
          <div className="space-y-8">
            {/* Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white text-center mb-4">How can we help you?</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help articles, guides, and FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 text-white px-4 py-4 pl-12 rounded-lg border border-white/20 placeholder-gray-400"
                  />
                  <div className="absolute left-4 top-4 text-gray-400">🔍</div>
                </div>
              </div>
            </div>

            {/* Popular Guides */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Popular Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportData.guides.map((guide) => (
                  <div key={guide.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{guide.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>📖 {guide.steps} steps</span>
                      <span>⏱️ {guide.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.slice(0, 6).map((faq) => (
                  <details key={faq.id} className="bg-white/5 rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold">{faq.question}</h3>
                        <div className="flex space-x-2 text-xs text-gray-400">
                          <span>👍 {faq.helpful}</span>
                          <span>👀 {faq.views}</span>
                        </div>
                      </div>
                    </summary>
                    <div className="p-4 pt-0">
                      <p className="text-blue-200 mb-3">{faq.answer}</p>
                      <div className="flex space-x-2">
                        {faq.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
              {searchQuery && filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No FAQs found matching "{searchQuery}". Try different keywords or submit a support ticket.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Ticket Tab */}
        {activeTab === 'submit-ticket' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Submit Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-gray-400"
                    placeholder="Brief description of your issue..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="staking">Staking & Rewards</option>
                      <option value="transactions">Transactions</option>
                      <option value="wallet">Wallet Connection</option>
                      <option value="defi">DeFi & Trading</option>
                      <option value="governance">Governance</option>
                      <option value="billing">Billing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    rows="6"
                    required
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-gray-400"
                    placeholder="Please provide detailed information about your issue, including steps to reproduce, error messages, and what you expected to happen..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">📎</div>
                    <p className="text-gray-400">Drop files here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Max 5MB per file. Images, videos, logs accepted.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        )}

        {/* My Tickets Tab */}
        {activeTab === 'my-tickets' && (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">My Support Tickets</h2>
              <div className="space-y-4">
                {supportData.tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                        <p className="text-gray-400 text-sm">#{ticket.id}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Created:</span>
                        <p className="text-white">{formatDate(ticket.createdAt)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Updated:</span>
                        <p className="text-white">{formatDate(ticket.updatedAt)}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Agent:</span>
                        <p className="text-white">{ticket.agent}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Responses:</span>
                        <p className="text-white">{ticket.responses}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-sm capitalize">
                        Category: {ticket.category}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge-base' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Knowledge Base Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportData.knowledgeBase.map((category, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer">
                    <h3 className="text-xl font-bold text-white mb-2">{category.category}</h3>
                    <p className="text-blue-200 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{category.articles} articles</span>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                        Browse →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                <p className="text-gray-400 text-sm mb-4">Get instant help from our support team</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm mb-4">Send us an email and we'll respond within 4 hours</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Send Email
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-4xl mb-3">🎥</div>
                <h3 className="text-xl font-bold text-white mb-2">Video Call</h3>
                <p className="text-gray-400 text-sm mb-4">Schedule a video call for complex issues</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
