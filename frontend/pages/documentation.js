import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Documentation() {
  const [docData, setDocData] = useState({
    sections: [],
    searchResults: [],
    recentlyViewed: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedItems, setExpandedItems] = useState(['getting-started']);

  useEffect(() => {
    fetchDocumentationData();
  }, []);

  const fetchDocumentationData = async () => {
    try {
      const mockData = {
        sections: [
          {
            id: 'getting-started',
            title: '🚀 Getting Started',
            description: 'Learn the basics of Zyra Network',
            articles: [
              { id: 'what-is-zyra', title: 'What is Zyra Network?', readTime: '5 min', difficulty: 'Beginner' },
              { id: 'create-wallet', title: 'Creating Your First Wallet', readTime: '10 min', difficulty: 'Beginner' },
              { id: 'first-transaction', title: 'Making Your First Transaction', readTime: '8 min', difficulty: 'Beginner' },
              { id: 'network-overview', title: 'Network Architecture Overview', readTime: '12 min', difficulty: 'Intermediate' }
            ]
          },
          {
            id: 'wallet-guide',
            title: '💰 Wallet Management',
            description: 'Complete guide to wallet operations',
            articles: [
              { id: 'wallet-types', title: 'Types of Wallets', readTime: '6 min', difficulty: 'Beginner' },
              { id: 'wallet-security', title: 'Securing Your Wallet', readTime: '15 min', difficulty: 'Intermediate' },
              { id: 'backup-recovery', title: 'Backup and Recovery', readTime: '10 min', difficulty: 'Beginner' },
              { id: 'multi-sig', title: 'Multi-Signature Wallets', readTime: '20 min', difficulty: 'Advanced' }
            ]
          },
          {
            id: 'staking',
            title: '🏆 Staking Guide',
            description: 'Everything about staking and rewards',
            articles: [
              { id: 'staking-basics', title: 'Staking Fundamentals', readTime: '8 min', difficulty: 'Beginner' },
              { id: 'validator-selection', title: 'Choosing Validators', readTime: '12 min', difficulty: 'Intermediate' },
              { id: 'staking-rewards', title: 'Understanding Rewards', readTime: '10 min', difficulty: 'Beginner' },
              { id: 'delegation-strategies', title: 'Delegation Strategies', readTime: '18 min', difficulty: 'Advanced' }
            ]
          },
          {
            id: 'defi',
            title: '🏦 DeFi Protocols',
            description: 'Decentralized finance on Zyra',
            articles: [
              { id: 'defi-intro', title: 'Introduction to DeFi', readTime: '10 min', difficulty: 'Beginner' },
              { id: 'liquidity-pools', title: 'Liquidity Pools Explained', readTime: '15 min', difficulty: 'Intermediate' },
              { id: 'yield-farming', title: 'Yield Farming Strategies', readTime: '20 min', difficulty: 'Advanced' },
              { id: 'impermanent-loss', title: 'Understanding Impermanent Loss', readTime: '12 min', difficulty: 'Intermediate' }
            ]
          },
          {
            id: 'developers',
            title: '👨‍💻 Developer Resources',
            description: 'Build on Zyra Network',
            articles: [
              { id: 'dev-setup', title: 'Development Environment Setup', readTime: '25 min', difficulty: 'Intermediate' },
              { id: 'smart-contracts', title: 'Smart Contract Development', readTime: '45 min', difficulty: 'Advanced' },
              { id: 'api-reference', title: 'API Reference Guide', readTime: '30 min', difficulty: 'Intermediate' },
              { id: 'testing-deployment', title: 'Testing and Deployment', readTime: '35 min', difficulty: 'Advanced' }
            ]
          },
          {
            id: 'governance',
            title: '🗳️ Governance',
            description: 'Participate in network governance',
            articles: [
              { id: 'governance-overview', title: 'Governance Overview', readTime: '8 min', difficulty: 'Beginner' },
              { id: 'voting-process', title: 'Voting Process', readTime: '12 min', difficulty: 'Beginner' },
              { id: 'proposal-creation', title: 'Creating Proposals', readTime: '18 min', difficulty: 'Intermediate' },
              { id: 'dao-participation', title: 'DAO Participation', readTime: '15 min', difficulty: 'Intermediate' }
            ]
          },
          {
            id: 'security',
            title: '🛡️ Security Best Practices',
            description: 'Keep your assets safe',
            articles: [
              { id: 'security-fundamentals', title: 'Security Fundamentals', readTime: '10 min', difficulty: 'Beginner' },
              { id: 'phishing-protection', title: 'Avoiding Phishing Attacks', readTime: '8 min', difficulty: 'Beginner' },
              { id: 'cold-storage', title: 'Cold Storage Solutions', readTime: '15 min', difficulty: 'Intermediate' },
              { id: 'audit-smart-contracts', title: 'Auditing Smart Contracts', readTime: '30 min', difficulty: 'Advanced' }
            ]
          },
          {
            id: 'troubleshooting',
            title: '🔧 Troubleshooting',
            description: 'Common issues and solutions',
            articles: [
              { id: 'connection-issues', title: 'Connection Problems', readTime: '5 min', difficulty: 'Beginner' },
              { id: 'transaction-stuck', title: 'Stuck Transactions', readTime: '8 min', difficulty: 'Beginner' },
              { id: 'gas-fees', title: 'Understanding Gas Fees', readTime: '10 min', difficulty: 'Intermediate' },
              { id: 'error-messages', title: 'Common Error Messages', readTime: '12 min', difficulty: 'Beginner' }
            ]
          }
        ],
        recentlyViewed: [
          { id: 'create-wallet', title: 'Creating Your First Wallet', section: 'Getting Started' },
          { id: 'staking-basics', title: 'Staking Fundamentals', section: 'Staking Guide' },
          { id: 'defi-intro', title: 'Introduction to DeFi', section: 'DeFi Protocols' }
        ]
      };

      setDocData(mockData);
    } catch (error) {
      console.error('Error fetching documentation data:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = [];
      docData.sections.forEach(section => {
        section.articles.forEach(article => {
          if (
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            section.title.toLowerCase().includes(query.toLowerCase())
          ) {
            results.push({
              ...article,
              sectionTitle: section.title,
              sectionId: section.id
            });
          }
        });
      });
      setDocData(prev => ({ ...prev, searchResults: results }));
    } else {
      setDocData(prev => ({ ...prev, searchResults: [] }));
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedItems(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const currentSection = docData.sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Documentation</h1>
            <p className="text-blue-200">Comprehensive guides and references for Zyra Network</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-4 pl-12 rounded-lg border border-white/20 placeholder-gray-400 text-lg"
              />
              <div className="absolute left-4 top-4 text-gray-400 text-xl">🔍</div>
            </div>
            {searchQuery && (
              <div className="mt-4 text-center text-gray-300">
                {docData.searchResults.length > 0 
                  ? `Found ${docData.searchResults.length} results` 
                  : 'No results found'
                }
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-6">
            {/* Recently Viewed */}
            {docData.recentlyViewed.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">📖 Recently Viewed</h3>
                <div className="space-y-2">
                  {docData.recentlyViewed.map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors"
                    >
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.section}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">📚 Table of Contents</h3>
              <div className="space-y-2">
                {docData.sections.map((section) => (
                  <div key={section.id}>
                    <button
                      className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                        activeSection === section.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setActiveSection(section.id);
                        toggleSection(section.id);
                      }}
                    >
                      <span className="text-sm font-semibold">{section.title}</span>
                      <span className="text-xs">
                        {expandedItems.includes(section.id) ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    {expandedItems.includes(section.id) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {section.articles.map((article) => (
                          <button
                            key={article.id}
                            className="w-full text-left p-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                          >
                            {article.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">🔗 Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  📋 API Documentation
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  🎯 Bug Bounty Program
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  💬 Community Forum
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  🎧 Support Center
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  📰 Latest News
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Results */}
            {searchQuery && docData.searchResults.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Search Results</h2>
                {docData.searchResults.map((result) => (
                  <div key={result.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{result.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(result.difficulty)}`}>
                        {result.difficulty}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm mb-2">{result.sectionTitle}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">⏱️ {result.readTime}</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        Read Article
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery && docData.searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                <p className="text-gray-400">Try different keywords or browse the sections below</p>
              </div>
            ) : (
              /* Section Content */
              <div className="space-y-6">
                {currentSection ? (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h2 className="text-3xl font-bold text-white mb-4">{currentSection.title}</h2>
                      <p className="text-blue-200 text-lg">{currentSection.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentSection.articles.map((article) => (
                        <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white">{article.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400 text-sm">⏱️ {article.readTime}</span>
                            <span className="text-blue-300 text-sm">📖 Article</span>
                          </div>
                          
                          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 rounded transition-all">
                            Read Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Overview */
                  <div className="space-y-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h2 className="text-3xl font-bold text-white mb-4">Welcome to Zyra Documentation</h2>
                      <p className="text-blue-200 text-lg mb-6">
                        Find everything you need to know about using, developing on, and participating in the Zyra Network ecosystem.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-4xl mb-3">🚀</div>
                          <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
                          <p className="text-gray-400 text-sm">New to Zyra? Start here for the basics</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl mb-3">👨‍💻</div>
                          <h3 className="text-lg font-bold text-white mb-2">For Developers</h3>
                          <p className="text-gray-400 text-sm">Build amazing applications on Zyra</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl mb-3">🔧</div>
                          <h3 className="text-lg font-bold text-white mb-2">Advanced Topics</h3>
                          <p className="text-gray-400 text-sm">Deep dive into complex concepts</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-4">📊 Documentation Stats</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-400">32</p>
                          <p className="text-gray-400 text-sm">Total Articles</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-400">8</p>
                          <p className="text-gray-400 text-sm">Categories</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-400">5.2K</p>
                          <p className="text-gray-400 text-sm">Views Today</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-400">98%</p>
                          <p className="text-gray-400 text-sm">Up to Date</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
