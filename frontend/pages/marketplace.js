import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Marketplace() {
  const [marketplaceData, setMarketplaceData] = useState({
    categories: [],
    featured: [],
    listings: [],
    stats: {}
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  useEffect(() => {
    // Filter and sort listings
    let filtered = marketplaceData.listings;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (priceRange.min) {
      filtered = filtered.filter(item => item.price >= parseFloat(priceRange.min));
    }
    
    if (priceRange.max) {
      filtered = filtered.filter(item => item.price <= parseFloat(priceRange.max));
    }
    
    // Sort listings
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
        break;
    }
    
    setFilteredListings(filtered);
  }, [activeCategory, sortBy, priceRange, searchQuery, marketplaceData.listings]);

  const fetchMarketplaceData = async () => {
    try {
      const mockData = {
        categories: [
          { id: 'all', name: 'All Items', count: 2847 },
          { id: 'nfts', name: 'NFTs', count: 1234 },
          { id: 'tokens', name: 'Tokens', count: 567 },
          { id: 'domains', name: 'Domains', count: 234 },
          { id: 'art', name: 'Digital Art', count: 456 },
          { id: 'gaming', name: 'Gaming Items', count: 189 },
          { id: 'music', name: 'Music', count: 167 }
        ],
        stats: {
          totalVolume: '45.7M',
          totalItems: 2847,
          activeListings: 1923,
          totalUsers: 12456,
          avgPrice: '2.34',
          floorPrice: '0.05'
        },
        featured: [
          {
            id: 'featured-1',
            name: 'Genesis Zyra Collection',
            description: 'Limited edition commemorative NFTs celebrating Zyra Network mainnet launch',
            price: 15.5,
            currency: 'ZYRA',
            seller: 'ZyraTeam',
            category: 'nfts',
            image: '🎨',
            featured: true,
            verified: true,
            rarity: 'Legendary',
            views: 15674,
            likes: 892
          },
          {
            id: 'featured-2',
            name: 'Premium Domain: zyra.chain',
            description: 'Premium blockchain domain perfect for DeFi projects and applications',
            price: 250.0,
            currency: 'ZYRA',
            seller: 'DomainMaster',
            category: 'domains',
            image: '🌐',
            featured: true,
            verified: true,
            views: 8934,
            likes: 445
          }
        ],
        listings: [
          {
            id: 1,
            name: 'Cosmic Warrior #0001',
            description: 'Rare cosmic warrior NFT with unique animated features and special abilities',
            price: 8.5,
            currency: 'ZYRA',
            seller: 'ArtistOne',
            category: 'nfts',
            image: '🚀',
            verified: true,
            rarity: 'Epic',
            listedAt: '2025-08-14T10:30:00Z',
            views: 2341,
            likes: 156,
            tags: ['animated', 'rare', 'cosmic', 'warrior']
          },
          {
            id: 2,
            name: 'ZTOKEN - Utility Token',
            description: 'Utility token for accessing premium features in Zyra ecosystem applications',
            price: 0.75,
            currency: 'ZYRA',
            seller: 'TokenCreator',
            category: 'tokens',
            image: '🪙',
            verified: false,
            listedAt: '2025-08-14T08:15:00Z',
            views: 1876,
            likes: 89,
            tags: ['utility', 'token', 'access']
          },
          {
            id: 3,
            name: 'defi.zyra Domain',
            description: 'Premium domain name perfect for DeFi protocols and applications on Zyra Network',
            price: 125.0,
            currency: 'ZYRA',
            seller: 'DomainExpert',
            category: 'domains',
            image: '🌍',
            verified: true,
            listedAt: '2025-08-13T16:45:00Z',
            views: 3456,
            likes: 234,
            tags: ['domain', 'defi', 'premium']
          },
          {
            id: 4,
            name: 'Digital Landscape #0042',
            description: 'Stunning digital artwork showcasing futuristic blockchain landscapes',
            price: 12.0,
            currency: 'ZYRA',
            seller: 'DigitalArtist',
            category: 'art',
            image: '🎭',
            verified: true,
            rarity: 'Rare',
            listedAt: '2025-08-13T14:20:00Z',
            views: 1654,
            likes: 123,
            tags: ['art', 'landscape', 'digital', 'futuristic']
          },
          {
            id: 5,
            name: 'Legendary Sword of Zyra',
            description: 'Powerful legendary weapon for blockchain-based RPG games with special attributes',
            price: 45.0,
            currency: 'ZYRA',
            seller: 'GameDev',
            category: 'gaming',
            image: '⚔️',
            verified: true,
            rarity: 'Legendary',
            listedAt: '2025-08-13T11:30:00Z',
            views: 4567,
            likes: 345,
            tags: ['gaming', 'weapon', 'legendary', 'rpg']
          },
          {
            id: 6,
            name: 'Electronic Music Track #001',
            description: 'Original electronic music composition with full commercial rights included',
            price: 3.5,
            currency: 'ZYRA',
            seller: 'MusicProducer',
            category: 'music',
            image: '🎵',
            verified: false,
            listedAt: '2025-08-12T19:15:00Z',
            views: 987,
            likes: 67,
            tags: ['music', 'electronic', 'original', 'commercial']
          },
          {
            id: 7,
            name: 'Zyra Validator Badge',
            description: 'Exclusive badge for early validator node operators with special privileges',
            price: 25.0,
            currency: 'ZYRA',
            seller: 'ValidatorDAO',
            category: 'nfts',
            image: '🏆',
            verified: true,
            rarity: 'Epic',
            listedAt: '2025-08-12T15:45:00Z',
            views: 5432,
            likes: 456,
            tags: ['validator', 'badge', 'exclusive', 'privilege']
          },
          {
            id: 8,
            name: 'trading.zyra Premium Domain',
            description: 'Perfect domain for trading platforms and financial services on Zyra',
            price: 180.0,
            currency: 'ZYRA',
            seller: 'DomainInvestor',
            category: 'domains',
            image: '💼',
            verified: true,
            listedAt: '2025-08-12T12:20:00Z',
            views: 2789,
            likes: 189,
            tags: ['trading', 'domain', 'financial', 'premium']
          }
        ]
      };

      setMarketplaceData(mockData);
      setFilteredListings(mockData.listings);
    } catch (error) {
      console.error('Error fetching marketplace data:', error);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Zyra Marketplace</h1>
            <p className="text-blue-200">Discover, buy, and sell digital assets on Zyra Network</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Volume</h3>
            <p className="text-2xl font-bold text-white">{marketplaceData.stats.totalVolume}</p>
            <p className="text-green-400 text-xs">ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Total Items</h3>
            <p className="text-2xl font-bold text-green-400">{marketplaceData.stats.totalItems?.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Active Listings</h3>
            <p className="text-2xl font-bold text-purple-400">{marketplaceData.stats.activeListings?.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Users</h3>
            <p className="text-2xl font-bold text-yellow-400">{marketplaceData.stats.totalUsers?.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Avg Price</h3>
            <p className="text-2xl font-bold text-cyan-400">{marketplaceData.stats.avgPrice}</p>
            <p className="text-cyan-200 text-xs">ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Floor Price</h3>
            <p className="text-2xl font-bold text-orange-400">{marketplaceData.stats.floorPrice}</p>
            <p className="text-orange-200 text-xs">ZYRA</p>
          </div>
        </div>

        {/* Featured Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">⭐ Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketplaceData.featured.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="text-6xl">{item.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      {item.verified && <span className="text-green-400">✓</span>}
                      <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                    
                    <p className="text-blue-200 text-sm mb-3">{item.description}</p>
                    
                    {item.rarity && (
                      <div className="mb-3">
                        <span className={`font-semibold ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(item.price)} <span className="text-lg text-blue-200">{item.currency}</span>
                        </p>
                        <p className="text-gray-400 text-sm">by @{item.seller}</p>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <p>👀 {item.views.toLocaleString()}</p>
                        <p>👍 {item.likes.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 placeholder-gray-400"
                />
              </div>

              {/* Categories */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Categories</label>
                <div className="space-y-2">
                  {marketplaceData.categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name} <span className="text-xs opacity-75">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Price Range (ZYRA)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="bg-white/10 text-white px-3 py-2 rounded border border-white/20 placeholder-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="bg-white/10 text-white px-3 py-2 rounded border border-white/20 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-white font-semibold mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20"
                >
                  <option value="recent">Recently Listed</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Create Listing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-lg font-bold text-white mb-2">Sell Your Items</h3>
              <p className="text-blue-200 text-sm mb-4">
                List your digital assets and earn ZYRA tokens
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors">
                Create Listing
              </button>
            </div>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === 'all' ? 'All Items' : marketplaceData.categories.find(c => c.id === activeCategory)?.name}
                <span className="text-lg text-gray-400 ml-2">({filteredListings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{item.image}</div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      {item.verified && <span className="text-green-400 text-sm">✓</span>}
                    </div>
                    {item.rarity && (
                      <span className={`text-sm font-semibold ${getRarityColor(item.rarity)}`}>
                        {item.rarity}
                      </span>
                    )}
                  </div>

                  <p className="text-blue-200 text-sm mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xl font-bold text-white">
                        {formatPrice(item.price)} <span className="text-sm text-blue-200">{item.currency}</span>
                      </p>
                      <p className="text-gray-400 text-xs">by @{item.seller}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>👀 {item.views}</p>
                      <p>👍 {item.likes}</p>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 mb-3">
                    Listed {formatDate(item.listedAt)}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors">
                      Buy Now
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded text-sm transition-colors">
                      Make Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
