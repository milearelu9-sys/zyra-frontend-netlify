import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function News() {
  const [newsData, setNewsData] = useState({
    featured: [],
    categories: [],
    recentNews: [],
    trending: []
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNewsData();
  }, []);

  useEffect(() => {
    // Filter news based on category and search
    let filtered = newsData.recentNews;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(news => news.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredNews(filtered);
  }, [activeCategory, searchQuery, newsData.recentNews]);

  const fetchNewsData = async () => {
    try {
      const mockData = {
        featured: [
          {
            id: 1,
            title: 'Zyra Network Mainnet Launch: A New Era of DeFi Innovation',
            excerpt: 'After months of rigorous testing and development, Zyra Network officially launches its mainnet with groundbreaking features for the DeFi ecosystem.',
            content: 'Full article content here...',
            author: 'Zyra Core Team',
            publishDate: '2025-08-14T08:00:00Z',
            readTime: '8 min read',
            category: 'announcements',
            tags: ['mainnet', 'launch', 'defi', 'innovation'],
            image: '🚀',
            featured: true,
            views: 15674,
            likes: 892,
            comments: 156
          },
          {
            id: 2,
            title: 'Major Partnership with Leading DeFi Protocols Announced',
            excerpt: 'Zyra Network forms strategic partnerships with top DeFi protocols to enhance liquidity and expand ecosystem capabilities.',
            content: 'Full article content here...',
            author: 'Partnership Team',
            publishDate: '2025-08-13T14:30:00Z',
            readTime: '5 min read',
            category: 'partnerships',
            tags: ['partnership', 'defi', 'liquidity', 'ecosystem'],
            image: '🤝',
            featured: true,
            views: 12543,
            likes: 675,
            comments: 89
          }
        ],
        categories: [
          { name: 'all', label: 'All News', count: 156 },
          { name: 'announcements', label: 'Announcements', count: 34 },
          { name: 'partnerships', label: 'Partnerships', count: 23 },
          { name: 'technical', label: 'Technical Updates', count: 45 },
          { name: 'community', label: 'Community', count: 28 },
          { name: 'events', label: 'Events', count: 16 },
          { name: 'research', label: 'Research', count: 10 }
        ],
        recentNews: [
          {
            id: 3,
            title: 'Cross-Chain Bridge Security Audit Completed Successfully',
            excerpt: 'Leading security firm completes comprehensive audit of Zyra\'s cross-chain bridge protocol with excellent results.',
            author: 'Security Team',
            publishDate: '2025-08-12T16:45:00Z',
            readTime: '6 min read',
            category: 'technical',
            tags: ['security', 'audit', 'bridge', 'cross-chain'],
            image: '🔐',
            views: 8934,
            likes: 423,
            comments: 67
          },
          {
            id: 4,
            title: 'Community Governance Proposal: Dynamic Fee Structure',
            excerpt: 'New governance proposal introduces dynamic transaction fees based on network congestion and demand.',
            author: 'Governance Committee',
            publishDate: '2025-08-11T11:20:00Z',
            readTime: '4 min read',
            category: 'community',
            tags: ['governance', 'fees', 'proposal', 'community'],
            image: '🗳️',
            views: 6754,
            likes: 312,
            comments: 94
          },
          {
            id: 5,
            title: 'Q3 2025 Development Roadmap Released',
            excerpt: 'Core development team unveils ambitious roadmap for Q3 2025, featuring privacy enhancements and scalability improvements.',
            author: 'Development Team',
            publishDate: '2025-08-10T09:15:00Z',
            readTime: '10 min read',
            category: 'technical',
            tags: ['roadmap', 'development', 'privacy', 'scalability'],
            image: '🗺️',
            views: 11276,
            likes: 789,
            comments: 134
          },
          {
            id: 6,
            title: 'Zyra DEX Reaches $500M in Total Volume Locked',
            excerpt: 'Zyra decentralized exchange achieves major milestone with $500 million in total volume locked across all liquidity pools.',
            author: 'DeFi Analytics Team',
            publishDate: '2025-08-09T15:30:00Z',
            readTime: '3 min read',
            category: 'announcements',
            tags: ['dex', 'milestone', 'tvl', 'defi'],
            image: '💰',
            views: 9845,
            likes: 567,
            comments: 78
          },
          {
            id: 7,
            title: 'Educational Series: Understanding Yield Farming on Zyra',
            excerpt: 'Comprehensive guide to yield farming strategies and opportunities available on the Zyra Network ecosystem.',
            author: 'Education Team',
            publishDate: '2025-08-08T13:45:00Z',
            readTime: '12 min read',
            category: 'research',
            tags: ['education', 'yield-farming', 'defi', 'tutorial'],
            image: '📚',
            views: 7623,
            likes: 445,
            comments: 102
          },
          {
            id: 8,
            title: 'Weekly Network Health Report - August 2025',
            excerpt: 'Comprehensive analysis of network performance, validator activity, and key metrics for the past week.',
            author: 'Network Analytics',
            publishDate: '2025-08-07T18:00:00Z',
            readTime: '7 min read',
            category: 'technical',
            tags: ['analytics', 'network', 'health', 'report'],
            image: '📊',
            views: 5432,
            likes: 234,
            comments: 45
          }
        ],
        trending: [
          { id: 1, title: 'Zyra Network Mainnet Launch', views: 15674, trend: '+125%' },
          { id: 2, title: 'Cross-Chain Bridge Audit', views: 8934, trend: '+67%' },
          { id: 3, title: 'Q3 Development Roadmap', views: 11276, trend: '+89%' },
          { id: 4, title: 'DEX $500M Milestone', views: 9845, trend: '+45%' },
          { id: 5, title: 'Dynamic Fee Proposal', views: 6754, trend: '+34%' }
        ]
      };

      setNewsData(mockData);
      setFilteredNews(mockData.recentNews);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Zyra News</h1>
            <p className="text-blue-200">Stay updated with the latest developments and announcements</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newsData.categories.map((category) => (
                  <button
                    key={category.name}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.label}
                    <span className="ml-1 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Articles */}
            {activeCategory === 'all' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Featured Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsData.featured.map((article) => (
                    <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                      <div className="flex items-center mb-4">
                        <div className="text-4xl mr-3">{article.image}</div>
                        <div>
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-semibold capitalize">
                            {article.category}
                          </span>
                          <span className="text-yellow-400 ml-2 text-sm">⭐ Featured</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                      <p className="text-blue-200 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <span>👤 {article.author}</span>
                          <span>📅 {formatDate(article.publishDate)}</span>
                          <span>⏱️ {article.readTime}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>👀 {formatViews(article.views)}</span>
                          <span>👍 {article.likes}</span>
                          <span>💬 {article.comments}</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent News */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === 'all' ? 'Recent News' : `${newsData.categories.find(c => c.name === activeCategory)?.label} News`}
              </h2>
              
              <div className="space-y-4">
                {filteredNews.map((article) => (
                  <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-3xl">{article.image}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-semibold capitalize">
                            {article.category}
                          </span>
                          <span className="text-gray-400 ml-3 text-sm">
                            {formatDate(article.publishDate)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                        <p className="text-blue-200 text-sm mb-3">{article.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>👤 {article.author}</span>
                            <span>⏱️ {article.readTime}</span>
                            <span>👀 {formatViews(article.views)}</span>
                            <span>👍 {article.likes}</span>
                          </div>
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded text-sm transition-all">
                            Read Article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                  <p className="text-gray-400">
                    {searchQuery ? `No articles match "${searchQuery}"` : `No articles in ${activeCategory} category`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Articles */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🔥 Trending</h3>
              <div className="space-y-4">
                {newsData.trending.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white line-clamp-2">{item.title}</h4>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{formatViews(item.views)} views</span>
                        <span className="text-green-400">{item.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">📧 Newsletter</h3>
              <p className="text-blue-200 text-sm mb-4">
                Get the latest Zyra Network updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 placeholder-gray-400 text-sm"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 rounded transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  📋 Developer Documentation
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  🗳️ Governance Proposals
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  📊 Network Analytics
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  🎯 Bug Bounty Program
                </a>
                <a href="#" className="block text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  💬 Community Forum
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">📱 Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm text-center transition-colors">
                  🐦 Twitter
                </a>
                <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm text-center transition-colors">
                  💬 Discord
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm text-center transition-colors">
                  🐙 GitHub
                </a>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm text-center transition-colors">
                  ✈️ Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
