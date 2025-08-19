import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NFT() {
  const [nftData, setNftData] = useState({
    collections: [],
    trending: [],
    recentSales: [],
    userNFTs: [],
    marketplace: []
  });

  const [activeTab, setActiveTab] = useState('marketplace');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'price_low_to_high'
  });

  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showMintModal, setShowMintModal] = useState(false);

  useEffect(() => {
    fetchNFTData();
    const interval = setInterval(fetchNFTData, 60000);
    return () => clearInterval(interval);
  }, [filters]);

  const fetchNFTData = async () => {
    try {
      const mockData = {
        collections: [
          {
            id: 1,
            name: 'Zyra Guardians',
            description: 'Elite protectors of the Zyra Network',
            floorPrice: 2.5,
            volume24h: 156.7,
            items: 5000,
            owners: 2340,
            image: '/api/placeholder/300/300',
            verified: true
          },
          {
            id: 2,
            name: 'Cyber Nodes',
            description: 'Digital representations of network validators',
            floorPrice: 1.8,
            volume24h: 89.3,
            items: 10000,
            owners: 4567,
            image: '/api/placeholder/300/300',
            verified: true
          },
          {
            id: 3,
            name: 'Quantum Artifacts',
            description: 'Rare items from the digital realm',
            floorPrice: 5.2,
            volume24h: 234.1,
            items: 2500,
            owners: 1890,
            image: '/api/placeholder/300/300',
            verified: false
          }
        ],
        trending: Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          name: `NFT #${1000 + i}`,
          collection: 'Zyra Guardians',
          price: 2.5 + Math.random() * 10,
          image: '/api/placeholder/200/200',
          rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)]
        })),
        recentSales: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          nftName: `NFT #${2000 + i}`,
          collection: ['Zyra Guardians', 'Cyber Nodes', 'Quantum Artifacts'][i % 3],
          price: 1.5 + Math.random() * 8,
          buyer: `0x${Math.random().toString(16).substr(2, 8)}...`,
          seller: `0x${Math.random().toString(16).substr(2, 8)}...`,
          timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString()
        })),
        marketplace: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `NFT #${3000 + i}`,
          collection: ['Zyra Guardians', 'Cyber Nodes', 'Quantum Artifacts'][i % 3],
          price: 0.5 + Math.random() * 15,
          image: '/api/placeholder/250/250',
          rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
          attributes: [
            { trait: 'Background', value: ['Blue', 'Red', 'Green', 'Purple'][Math.floor(Math.random() * 4)] },
            { trait: 'Eyes', value: ['Normal', 'Laser', 'Glowing'][Math.floor(Math.random() * 3)] },
            { trait: 'Accessory', value: ['None', 'Hat', 'Glasses'][Math.floor(Math.random() * 3)] }
          ]
        }))
      };

      setNftData(mockData);
    } catch (error) {
      console.error('Error fetching NFT data:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const handleBuyNFT = (nft) => {
    setSelectedNFT(nft);
    // Mock purchase logic
    alert(`Purchase initiated for ${nft.name} at ${nft.price} ZYRA`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">NFT Marketplace</h1>
            <p className="text-blue-200">Discover, collect, and trade unique digital assets</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowMintModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Mint NFT
            </button>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {['marketplace', 'collections', 'activity', 'create'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-semibold capitalize transition-colors ${
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

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftData.collections.map((collection) => (
                <div key={collection.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:bg-white/15 transition-all">
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                      {collection.verified && (
                        <svg className="w-5 h-5 text-blue-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{collection.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Floor Price</p>
                        <p className="text-white font-bold">{collection.floorPrice} ZYRA</p>
                      </div>
                      <div>
                        <p className="text-gray-400">24h Volume</p>
                        <p className="text-green-400 font-bold">{collection.volume24h} ZYRA</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Items</p>
                        <p className="text-white font-bold">{formatNumber(collection.items)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Owners</p>
                        <p className="text-white font-bold">{formatNumber(collection.owners)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div>
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  >
                    <option value="all">All Categories</option>
                    <option value="art">Art</option>
                    <option value="gaming">Gaming</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="utility">Utility</option>
                  </select>
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-1">0 - 1 ZYRA</option>
                    <option value="1-5">1 - 5 ZYRA</option>
                    <option value="5-10">5 - 10 ZYRA</option>
                    <option value="10+">10+ ZYRA</option>
                  </select>
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  >
                    <option value="price_low_to_high">Price: Low to High</option>
                    <option value="price_high_to_low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nftData.marketplace.map((nft) => (
                <div key={nft.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="relative">
                    <div className="h-64 bg-gradient-to-br from-purple-500 to-blue-500"></div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getRarityColor(nft.rarity)} bg-black/50`}>
                        {nft.rarity}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{nft.collection}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-gray-400 text-xs">Price</p>
                        <p className="text-white font-bold">{nft.price.toFixed(2)} ZYRA</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">USD</p>
                        <p className="text-green-400 font-bold">${(nft.price * 2.45).toFixed(2)}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyNFT(nft)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all transform group-hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Sales</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-4">Item</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-center py-3 px-4">From</th>
                      <th className="text-center py-3 px-4">To</th>
                      <th className="text-right py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nftData.recentSales.map((sale) => (
                      <tr key={sale.id} className="border-b border-gray-700 hover:bg-white/5">
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-semibold">{sale.nftName}</span>
                            <div className="text-gray-400 text-sm">{sale.collection}</div>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <div className="font-bold">{sale.price.toFixed(2)} ZYRA</div>
                          <div className="text-gray-400 text-sm">${(sale.price * 2.45).toFixed(2)}</div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="text-gray-400">{sale.seller}</span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="text-gray-400">{sale.buyer}</span>
                        </td>
                        <td className="text-right py-4 px-4 text-gray-400">
                          {sale.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Trending NFTs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nftData.trending.slice(0, 8).map((nft) => (
                  <div key={nft.id} className="bg-white/5 rounded-lg p-3">
                    <div className="h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded mb-2"></div>
                    <h4 className="text-white font-semibold text-sm">{nft.name}</h4>
                    <p className="text-gray-400 text-xs">{nft.collection}</p>
                    <p className="text-green-400 font-bold text-sm">{nft.price.toFixed(2)} ZYRA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New NFT</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Upload File</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-gray-400">Drag and drop your file here, or click to browse</p>
                    <button type="button" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Choose File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="Enter NFT name"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your NFT"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                  ></textarea>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Collection</label>
                  <select className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20">
                    <option>Select a collection</option>
                    <option>Create new collection</option>
                    <option>Zyra Guardians</option>
                    <option>Cyber Nodes</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Royalties (%)</label>
                    <input
                      type="number"
                      placeholder="0-10"
                      min="0"
                      max="10"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Supply</label>
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Create NFT (0.1 ZYRA)
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
