import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Wallet from './Wallet';
// import Explorer from './Explorer'; // removed: use embedded explorer page
import Staking from './Staking';
import Trading from './Trading';
import Governance from './Governance';

function ExplorerEmbed() {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        title="Explorer"
        src="/explorer"
        className="w-full h-full border-0"
        allow="clipboard-read; clipboard-write; encrypted-media; fullscreen"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                Zyra Blockchain
              </Link>
              <div className="flex space-x-6">
                <Link to="/" className="text-white hover:text-blue-300 transition-colors">
                  Home
                </Link>
                <Link to="/wallet" className="text-white hover:text-blue-300 transition-colors">
                  Wallet
                </Link>
                <Link to="/explorer" className="text-white hover:text-blue-300 transition-colors">
                  Explorer
                </Link>
                <Link to="/staking" className="text-white hover:text-blue-300 transition-colors">
                  Staking
                </Link>
                <Link to="/trading" className="text-white hover:text-blue-300 transition-colors">
                  Trading
                </Link>
                <Link to="/governance" className="text-white hover:text-blue-300 transition-colors">
                  Governance
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/explorer" element={<ExplorerEmbed />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/governance" element={<Governance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
