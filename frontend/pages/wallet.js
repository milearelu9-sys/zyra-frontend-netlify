import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Wallet() {
  const [wallet, setWallet] = useState({
    address: '',
    balance: 0,
    connected: false,
    privateKey: '',
    publicKey: ''
  });
  
  const [transactions, setTransactions] = useState([]);
  const [sendForm, setSendForm] = useState({
    recipient: '',
    amount: '',
    loading: false
  });

  const [newWalletForm, setNewWalletForm] = useState({
    password: '',
    confirmPassword: '',
    showForm: false
  });

  useEffect(() => {
    // Load wallet from localStorage if exists
    const savedWallet = localStorage.getItem('zyra_wallet');
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet);
      setWallet(prev => ({ ...prev, ...walletData, connected: true }));
      fetchTransactions(walletData.address);
    }
  }, []);

  const generateWallet = async () => {
    if (newWalletForm.password !== newWalletForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Mock wallet generation - replace with actual crypto library
      const newWallet = {
        address: '0x' + Math.random().toString(16).substr(2, 40),
        balance: 0,
        privateKey: '0x' + Math.random().toString(16).substr(2, 64),
        publicKey: '0x' + Math.random().toString(16).substr(2, 128),
        connected: true
      };

      setWallet(newWallet);
      localStorage.setItem('zyra_wallet', JSON.stringify(newWallet));
      setNewWalletForm({ password: '', confirmPassword: '', showForm: false });
    } catch (error) {
      console.error('Error generating wallet:', error);
      alert('Error generating wallet');
    }
  };

  const connectWallet = async () => {
    try {
      // Mock connection - replace with actual wallet connection logic
      const mockWallet = {
        address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        balance: 1000.5,
        connected: true
      };
      
      setWallet(prev => ({ ...prev, ...mockWallet }));
      fetchTransactions(mockWallet.address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: '',
      balance: 0,
      connected: false,
      privateKey: '',
      publicKey: ''
    });
    setTransactions([]);
    localStorage.removeItem('zyra_wallet');
  };

  const fetchTransactions = async (address) => {
    try {
      // Mock transaction data - replace with actual API call
      const mockTransactions = [
        {
          hash: '0xabc123...',
          from: '0xdef456...',
          to: address,
          amount: 50.25,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          status: 'confirmed'
        },
        {
          hash: '0xghi789...',
          from: address,
          to: '0xjkl012...',
          amount: 25.5,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          status: 'confirmed'
        }
      ];
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    setSendForm(prev => ({ ...prev, loading: true }));

    try {
      // Mock transaction sending - replace with actual transaction logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTransaction = {
        hash: '0x' + Math.random().toString(16).substr(2, 10) + '...',
        from: wallet.address,
        to: sendForm.recipient,
        amount: parseFloat(sendForm.amount),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setWallet(prev => ({ ...prev, balance: prev.balance - parseFloat(sendForm.amount) }));
      setSendForm({ recipient: '', amount: '', loading: false });
      alert('Transaction sent successfully!');
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Error sending transaction');
      setSendForm(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Zyra Wallet</h1>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {!wallet.connected ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Connect Your Wallet</h2>
            
            <div className="space-y-4">
              <button
                onClick={connectWallet}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Connect Existing Wallet
              </button>
              
              <button
                onClick={() => setNewWalletForm(prev => ({ ...prev, showForm: !prev.showForm }))}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Create New Wallet
              </button>
            </div>

            {newWalletForm.showForm && (
              <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Create New Wallet</h3>
                <input
                  type="password"
                  placeholder="Password"
                  value={newWalletForm.password}
                  onChange={(e) => setNewWalletForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300 mb-3"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={newWalletForm.confirmPassword}
                  onChange={(e) => setNewWalletForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300 mb-4"
                />
                <button
                  onClick={generateWallet}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Generate Wallet
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Wallet Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">Wallet Overview</h2>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-blue-200 text-sm">Wallet Address</label>
                  <p className="text-white font-mono bg-black/20 p-3 rounded-lg break-all">
                    {wallet.address}
                  </p>
                </div>
                <div>
                  <label className="text-blue-200 text-sm">Balance</label>
                  <p className="text-3xl font-bold text-white">{wallet.balance.toFixed(4)} ZYRA</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Send Transaction */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Send Transaction</h3>
                <form onSubmit={sendTransaction} className="space-y-4">
                  <div>
                    <label className="text-blue-200 text-sm block mb-1">Recipient Address</label>
                    <input
                      type="text"
                      value={sendForm.recipient}
                      onChange={(e) => setSendForm(prev => ({ ...prev, recipient: e.target.value }))}
                      placeholder="0x..."
                      className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-blue-200 text-sm block mb-1">Amount (ZYRA)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={sendForm.amount}
                      onChange={(e) => setSendForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.0000"
                      max={wallet.balance}
                      className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sendForm.loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    {sendForm.loading ? 'Sending...' : 'Send Transaction'}
                  </button>
                </form>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-blue-200">No transactions found</p>
                  ) : (
                    transactions.map((tx, index) => (
                      <div key={index} className="bg-black/20 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-white font-mono text-sm">{tx.hash}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-200 text-sm">
                            {tx.from === wallet.address ? 'To: ' + tx.to.substr(0, 10) + '...' : 'From: ' + tx.from.substr(0, 10) + '...'}
                          </span>
                          <span className={`font-bold ${tx.from === wallet.address ? 'text-red-400' : 'text-green-400'}`}>
                            {tx.from === wallet.address ? '-' : '+'}{tx.amount} ZYRA
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
