import React, { useState, useEffect } from 'react';

export default function Trading() {
  const [activeTab, setActiveTab] = useState('spot');
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });
  const [tradeHistory, setTradeHistory] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedPair, setSelectedPair] = useState('ZYRA/USDT');
  const [orderForm, setOrderForm] = useState({
    type: 'buy',
    orderType: 'limit',
    price: '',
    amount: '',
    total: ''
  });

  const tradingPairs = [
    { pair: 'ZYRA/USDT', price: 2.45, change: 5.67, volume: '1,245,678' },
    { pair: 'ZYRA/ETH', price: 0.0015, change: -2.34, volume: '890,123' },
    { pair: 'ZYRA/BTC', price: 0.000054, change: 8.92, volume: '567,890' },
    { pair: 'ZYRA/BNB', price: 0.0085, change: 3.21, volume: '345,678' }
  ];

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, [selectedPair]);

  const fetchMarketData = async () => {
    try {
      // Mock market data - replace with actual API calls
      const mockOrderbook = {
        bids: Array.from({ length: 20 }, (_, i) => ({
          price: (2.45 - (i * 0.001)).toFixed(3),
          amount: (Math.random() * 10000).toFixed(2),
          total: 0
        })),
        asks: Array.from({ length: 20 }, (_, i) => ({
          price: (2.46 + (i * 0.001)).toFixed(3),
          amount: (Math.random() * 10000).toFixed(2),
          total: 0
        }))
      };

      const mockTrades = Array.from({ length: 50 }, (_, i) => ({
        price: (2.45 + (Math.random() - 0.5) * 0.1).toFixed(3),
        amount: (Math.random() * 1000).toFixed(2),
        time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
        type: Math.random() > 0.5 ? 'buy' : 'sell'
      }));

      const mockUserOrders = [
        {
          id: '1',
          pair: 'ZYRA/USDT',
          type: 'buy',
          price: '2.40',
          amount: '500.00',
          filled: '150.00',
          status: 'partial',
          time: new Date(Date.now() - 300000).toLocaleString()
        },
        {
          id: '2',
          pair: 'ZYRA/USDT',
          type: 'sell',
          price: '2.50',
          amount: '300.00',
          filled: '0.00',
          status: 'open',
          time: new Date(Date.now() - 600000).toLocaleString()
        }
      ];

      setOrderbook(mockOrderbook);
      setTradeHistory(mockTrades);
      setUserOrders(mockUserOrders);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock order submission - replace with actual API call
      const newOrder = {
        id: Date.now().toString(),
        pair: selectedPair,
        type: orderForm.type,
        price: orderForm.price,
        amount: orderForm.amount,
        filled: '0.00',
        status: 'open',
        time: new Date().toLocaleString()
      };

      setUserOrders(prev => [newOrder, ...prev]);
      setOrderForm({ type: 'buy', orderType: 'limit', price: '', amount: '', total: '' });
      alert(`${orderForm.type.toUpperCase()} order placed successfully!`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setUserOrders(prev => prev.filter(order => order.id !== orderId));
      alert('Order cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const calculateTotal = () => {
    const price = parseFloat(orderForm.price) || 0;
    const amount = parseFloat(orderForm.amount) || 0;
    return (price * amount).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Zyra Trading</h1>
        <div className="flex space-x-4">
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
          >
            {tradingPairs.map(pair => (
              <option key={pair.pair} value={pair.pair}>
                {pair.pair}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trading Pairs Overview */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tradingPairs.map(pair => (
            <div
              key={pair.pair}
              onClick={() => setSelectedPair(pair.pair)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedPair === pair.pair
                  ? 'bg-blue-600/30 border border-blue-400'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">{pair.pair}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  pair.change >= 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{pair.price}</div>
              <div className="text-sm text-gray-400">Vol: {pair.volume}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setOrderForm(prev => ({ ...prev, type: 'buy' }))}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  orderForm.type === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderForm(prev => ({ ...prev, type: 'sell' }))}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  orderForm.type === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                Sell
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-blue-200 text-sm block mb-1">Order Type</label>
                <select
                  value={orderForm.orderType}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, orderType: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-gray-300"
                >
                  <option value="limit">Limit Order</option>
                  <option value="market">Market Order</option>
                </select>
              </div>

              {orderForm.orderType === 'limit' && (
                <div>
                  <label className="text-blue-200 text-sm block mb-1">Price (USDT)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={orderForm.price}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.000"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-blue-200 text-sm block mb-1">Amount (ZYRA)</label>
                <input
                  type="number"
                  step="0.01"
                  value={orderForm.amount}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                  required
                />
              </div>

              {orderForm.orderType === 'limit' && (
                <div>
                  <label className="text-blue-200 text-sm block mb-1">Total (USDT)</label>
                  <input
                    type="text"
                    value={calculateTotal()}
                    readOnly
                    className="w-full p-3 rounded-lg bg-gray-600 text-gray-300 border border-gray-300"
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  orderForm.type === 'buy'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {orderForm.type === 'buy' ? 'Buy' : 'Sell'} ZYRA
              </button>
            </form>

            {/* Balance Info */}
            <div className="mt-6 pt-6 border-t border-gray-600">
              <h4 className="text-white font-semibold mb-2">Available Balance</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>ZYRA:</span>
                  <span>1,250.50</span>
                </div>
                <div className="flex justify-between">
                  <span>USDT:</span>
                  <span>3,847.92</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Orderbook - {selectedPair}</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Asks */}
              <div>
                <h4 className="text-red-400 font-semibold mb-2 text-center">Asks (Sell Orders)</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {orderbook.asks.slice(0, 15).map((ask, index) => (
                    <div key={index} className="flex justify-between text-sm bg-red-900/20 p-2 rounded">
                      <span className="text-red-400">{ask.price}</span>
                      <span className="text-white">{ask.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bids */}
              <div>
                <h4 className="text-green-400 font-semibold mb-2 text-center">Bids (Buy Orders)</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {orderbook.bids.slice(0, 15).map((bid, index) => (
                    <div key={index} className="flex justify-between text-sm bg-green-900/20 p-2 rounded">
                      <span className="text-green-400">{bid.price}</span>
                      <span className="text-white">{bid.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trade History */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Recent Trades</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {tradeHistory.slice(0, 20).map((trade, index) => (
                <div key={index} className="flex justify-between items-center text-sm p-2 hover:bg-white/5 rounded">
                  <span className={trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                    {trade.price}
                  </span>
                  <span className="text-white">{trade.amount}</span>
                  <span className="text-gray-400">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Orders */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">My Orders</h3>
            
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveTab('open')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'open'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                Open Orders
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                History
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeTab === 'open' && userOrders.filter(order => order.status !== 'filled').map(order => (
                <div key={order.id} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-semibold ${
                      order.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {order.type.toUpperCase()}
                    </span>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span>{order.price} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>{order.amount} ZYRA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filled:</span>
                      <span>{order.filled} ZYRA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === 'open' ? 'bg-blue-600' : 
                        order.status === 'partial' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === 'history' && (
                <div className="text-center text-gray-400 py-8">
                  <p>No trading history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
