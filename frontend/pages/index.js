import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveHead from '../components/LiveHead';

export default function Home() {
  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 0,
    activeValidators: 0,
    currentBlockHeight: 0,
    networkHashRate: 0
  });

  useEffect(() => {
    // Fetch blockchain stats
    const fetchStats = async () => {
      try {
        // Mock data - replace with actual API calls
        setBlockchainStats({
          totalTransactions: 125847,
          activeValidators: 42,
          currentBlockHeight: 8759,
          networkHashRate: 12.7
        });
      } catch (error) {
        console.error('Error fetching blockchain stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Zyra Blockchain
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Next-generation blockchain platform providing fast, secure, and scalable 
            decentralized solutions for the future of digital transactions.
          </p>
        </header>

        {/* Live head */}
        <div className="mb-10">
          <LiveHead showActions={true} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-white">{blockchainStats.totalTransactions.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Active Validators</h3>
            <p className="text-3xl font-bold text-white">{blockchainStats.activeValidators}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Block Height</h3>
            <p className="text-3xl font-bold text-white">{blockchainStats.currentBlockHeight.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Hash Rate (TH/s)</h3>
            <p className="text-3xl font-bold text-white">{blockchainStats.networkHashRate}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/wallet" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-white mb-2">Wallet</h3>
              <p className="text-blue-200 text-sm">Manage your Zyra tokens and transactions</p>
            </div>
          </Link>

          <Link href="/explorer" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-white mb-2">Block Explorer</h3>
              <p className="text-blue-200 text-sm">Explore blocks and network activity</p>
            </div>
          </Link>

          {/* New: Transaction Lookup */}
          <Link href="/tx" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🔎</div>
              <h3 className="text-lg font-bold text-white mb-2">Tx Lookup</h3>
              <p className="text-blue-200 text-sm">Search a transaction by hash</p>
            </div>
          </Link>

          <Link href="/staking" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-white mb-2">Staking</h3>
              <p className="text-blue-200 text-sm">Stake tokens and earn rewards</p>
            </div>
          </Link>

          <Link href="/trading" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-bold text-white mb-2">Trading</h3>
              <p className="text-blue-200 text-sm">Trade tokens on the DEX</p>
            </div>
          </Link>

          <Link href="/governance" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🗳️</div>
              <h3 className="text-lg font-bold text-white mb-2">Governance</h3>
              <p className="text-blue-200 text-sm">Vote on network proposals</p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">Analytics</h3>
              <p className="text-blue-200 text-sm">Network metrics and insights</p>
            </div>
          </Link>

          <Link href="/defi" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">�</div>
              <h3 className="text-lg font-bold text-white mb-2">DeFi Hub</h3>
              <p className="text-blue-200 text-sm">Decentralized finance protocols</p>
            </div>
          </Link>

          <Link href="/nft" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="text-lg font-bold text-white mb-2">NFT Marketplace</h3>
              <p className="text-blue-200 text-sm">Trade unique digital assets</p>
            </div>
          </Link>

          <Link href="/bridge" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🌉</div>
              <h3 className="text-lg font-bold text-white mb-2">Bridge</h3>
              <p className="text-blue-200 text-sm">Cross-chain asset transfers</p>
            </div>
          </Link>

          <Link href="/nodes" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🖥️</div>
              <h3 className="text-lg font-bold text-white mb-2">Nodes</h3>
              <p className="text-blue-200 text-sm">Run validators and earn rewards</p>
            </div>
          </Link>

          <Link href="/mining" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">⛏️</div>
              <h3 className="text-lg font-bold text-white mb-2">Mining</h3>
              <p className="text-blue-200 text-sm">Monitor mining operations</p>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-white mb-2">Dashboard</h3>
              <p className="text-blue-200 text-sm">Advanced network monitoring</p>
            </div>
          </Link>

          <Link href="/developers" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">👨‍💻</div>
              <h3 className="text-lg font-bold text-white mb-2">Developers</h3>
              <p className="text-blue-200 text-sm">APIs, SDKs, and documentation</p>
            </div>
          </Link>

          <Link href="/security" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold text-white mb-2">Security</h3>
              <p className="text-blue-200 text-sm">Network security monitoring</p>
            </div>
          </Link>

          <Link href="/community" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-bold text-white mb-2">Community</h3>
              <p className="text-blue-200 text-sm">Forums, events, and discussions</p>
            </div>
          </Link>

          <Link href="/support" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🎧</div>
              <h3 className="text-lg font-bold text-white mb-2">Support</h3>
              <p className="text-blue-200 text-sm">Help center and documentation</p>
            </div>
          </Link>

          <Link href="/news" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">📰</div>
              <h3 className="text-lg font-bold text-white mb-2">News</h3>
              <p className="text-blue-200 text-sm">Latest updates and announcements</p>
            </div>
          </Link>

          <Link href="/marketplace" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="text-lg font-bold text-white mb-2">Marketplace</h3>
              <p className="text-blue-200 text-sm">Buy and sell digital assets</p>
            </div>
          </Link>

          <Link href="/portfolio" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-lg font-bold text-white mb-2">Portfolio</h3>
              <p className="text-blue-200 text-sm">Track your investments</p>
            </div>
          </Link>

          <Link href="/quantum-ai" className="group">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 transform hover:scale-105 border border-blue-400/30">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-bold text-white mb-2">Quantum AI</h3>
              <p className="text-blue-200 text-sm">Revolutionary AI-powered blockchain intelligence</p>
            </div>
          </Link>

          <Link href="/metaverse-bridge" className="group">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 border border-purple-400/30">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-lg font-bold text-white mb-2">Metaverse Bridge</h3>
              <p className="text-blue-200 text-sm">Cross-reality asset transfer protocol</p>
            </div>
          </Link>

          <Link href="/quantum-mining" className="group">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 transform hover:scale-105 border border-cyan-400/30">
              <div className="text-3xl mb-3">⚛️</div>
              <h3 className="text-lg font-bold text-white mb-2">Quantum Mining</h3>
              <p className="text-blue-200 text-sm">Next-gen quantum computing mining</p>
            </div>
          </Link>

          <Link href="/time-travel-protocol" className="group">
            <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-violet-500/30 hover:to-indigo-500/30 transition-all duration-300 transform hover:scale-105 border border-violet-400/30">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="text-lg font-bold text-white mb-2">Time Travel Protocol</h3>
              <p className="text-blue-200 text-sm">Temporal blockchain state management</p>
            </div>
          </Link>

          <Link href="/neural-consensus" className="group">
            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-pink-500/30 hover:to-rose-500/30 transition-all duration-300 transform hover:scale-105 border border-pink-400/30">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-bold text-white mb-2">Neural Consensus</h3>
              <p className="text-blue-200 text-sm">Brain-inspired distributed consensus</p>
            </div>
          </Link>

          <Link href="/interdimensional-storage" className="group">
            <div className="bg-gradient-to-br from-indigo-600/20 to-black/40 backdrop-blur-sm rounded-lg p-6 hover:from-indigo-500/30 hover:to-black/50 transition-all duration-300 transform hover:scale-105 border border-indigo-400/30">
              <div className="text-3xl mb-3">🌀</div>
              <h3 className="text-lg font-bold text-white mb-2">Interdimensional Storage</h3>
              <p className="text-blue-200 text-sm">Infinite storage across parallel dimensions</p>
            </div>
          </Link>

          <Link href="/consciousness-interface" className="group">
            <div className="bg-gradient-to-br from-yellow-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-6 hover:from-yellow-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 border border-yellow-400/30">
              <div className="text-3xl mb-3">🕉️</div>
              <h3 className="text-lg font-bold text-white mb-2">Consciousness Interface</h3>
              <p className="text-blue-200 text-sm">Direct neural-blockchain consciousness connection</p>
            </div>
          </Link>

          <Link href="/settings" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-lg font-bold text-white mb-2">Settings</h3>
              <p className="text-blue-200 text-sm">Configure your preferences</p>
            </div>
          </Link>

          <Link href="/documentation" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-white mb-2">Documentation</h3>
              <p className="text-blue-200 text-sm">Comprehensive guides and tutorials</p>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Zyra?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-blue-200">Process thousands of transactions per second with minimal fees</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-blue-200">Advanced cryptographic security and decentralized validation</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h3>
              <p className="text-blue-200">Energy-efficient consensus mechanism with minimal environmental impact</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-blue-200">
          <p>&copy; 2025 Zyra Blockchain. Built for the decentralized future.</p>
        </footer>
      </div>
    </div>
  );
}
