import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Staking() {
  const [stakingData, setStakingData] = useState({
    totalStaked: 0,
    myStake: 0,
    rewards: 0,
    validators: [],
    isValidator: false
  });

  const [stakeForm, setStakeForm] = useState({
    amount: '',
    validator: '',
    loading: false
  });

  const [unstakeForm, setUnstakeForm] = useState({
    amount: '',
    loading: false
  });

  const [validatorForm, setValidatorForm] = useState({
    name: '',
    description: '',
    commission: '',
    minStake: '',
    loading: false,
    showForm: false
  });

  const [activeTab, setActiveTab] = useState('stake');

  useEffect(() => {
    fetchStakingData();
    const interval = setInterval(fetchStakingData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStakingData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockValidators = [
        {
          id: '1',
          name: 'Zyra Validator 1',
          address: '0x742d35Cc6639C0532fEb996DD9BaA4a2ce0f6e3f',
          totalStaked: 15000.5,
          commission: 5,
          uptime: 99.8,
          status: 'active',
          description: 'Professional validator with 99.8% uptime',
          rewardRate: 8.5
        },
        {
          id: '2',
          name: 'SecureNode Validator',
          address: '0x8ba1f109551bD432803012645Hac136c29F47cd',
          totalStaked: 12500.25,
          commission: 3,
          uptime: 99.9,
          status: 'active',
          description: 'High-performance validator with low commission',
          rewardRate: 9.2
        },
        {
          id: '3',
          name: 'CommunityValidator',
          address: '0x95ba1f109551bD432803012645Hac136c29F47cd',
          totalStaked: 8750.75,
          commission: 7,
          uptime: 98.5,
          status: 'active',
          description: 'Community-run validator supporting decentralization',
          rewardRate: 7.8
        }
      ];

      setStakingData({
        totalStaked: 45250.89,
        myStake: 1250.5,
        rewards: 15.75,
        validators: mockValidators,
        isValidator: false
      });
    } catch (error) {
      console.error('Error fetching staking data:', error);
    }
  };

  const handleStake = async (e) => {
    e.preventDefault();
    setStakeForm(prev => ({ ...prev, loading: true }));

    try {
      // Mock staking - replace with actual staking logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const stakeAmount = parseFloat(stakeForm.amount);
      setStakingData(prev => ({
        ...prev,
        myStake: prev.myStake + stakeAmount,
        totalStaked: prev.totalStaked + stakeAmount
      }));

      setStakeForm({ amount: '', validator: '', loading: false });
      alert(`Successfully staked ${stakeAmount} ZYRA!`);
    } catch (error) {
      console.error('Error staking:', error);
      alert('Error staking tokens');
      setStakeForm(prev => ({ ...prev, loading: false }));
    }
  };

  const handleUnstake = async (e) => {
    e.preventDefault();
    setUnstakeForm(prev => ({ ...prev, loading: true }));

    try {
      // Mock unstaking - replace with actual unstaking logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const unstakeAmount = parseFloat(unstakeForm.amount);
      setStakingData(prev => ({
        ...prev,
        myStake: prev.myStake - unstakeAmount,
        totalStaked: prev.totalStaked - unstakeAmount
      }));

      setUnstakeForm({ amount: '', loading: false });
      alert(`Successfully initiated unstaking of ${unstakeAmount} ZYRA! (21 day unbonding period)`);
    } catch (error) {
      console.error('Error unstaking:', error);
      alert('Error unstaking tokens');
      setUnstakeForm(prev => ({ ...prev, loading: false }));
    }
  };

  const handleClaimRewards = async () => {
    try {
      // Mock reward claiming - replace with actual logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const claimedRewards = stakingData.rewards;
      setStakingData(prev => ({
        ...prev,
        rewards: 0
      }));

      alert(`Successfully claimed ${claimedRewards.toFixed(4)} ZYRA in rewards!`);
    } catch (error) {
      console.error('Error claiming rewards:', error);
      alert('Error claiming rewards');
    }
  };

  const handleBecomeValidator = async (e) => {
    e.preventDefault();
    setValidatorForm(prev => ({ ...prev, loading: true }));

    try {
      // Mock validator registration - replace with actual logic
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newValidator = {
        id: Date.now().toString(),
        name: validatorForm.name,
        address: '0x' + Math.random().toString(16).substr(2, 40),
        totalStaked: parseFloat(validatorForm.minStake),
        commission: parseFloat(validatorForm.commission),
        uptime: 0,
        status: 'pending',
        description: validatorForm.description,
        rewardRate: 0
      };

      setStakingData(prev => ({
        ...prev,
        validators: [...prev.validators, newValidator],
        isValidator: true
      }));

      setValidatorForm({
        name: '',
        description: '',
        commission: '',
        minStake: '',
        loading: false,
        showForm: false
      });

      alert('Successfully registered as a validator! Your node is now pending activation.');
    } catch (error) {
      console.error('Error becoming validator:', error);
      alert('Error registering as validator');
      setValidatorForm(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Zyra Staking</h1>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Total Staked</h3>
            <p className="text-3xl font-bold text-white">{stakingData.totalStaked.toLocaleString()} ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">My Stake</h3>
            <p className="text-3xl font-bold text-white">{stakingData.myStake.toFixed(2)} ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Pending Rewards</h3>
            <p className="text-3xl font-bold text-green-400">{stakingData.rewards.toFixed(4)} ZYRA</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Active Validators</h3>
            <p className="text-3xl font-bold text-white">{stakingData.validators.filter(v => v.status === 'active').length}</p>
          </div>
        </div>

        {/* Claim Rewards */}
        {stakingData.rewards > 0 && (
          <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">Rewards Available</h3>
                <p className="text-green-200">You have {stakingData.rewards.toFixed(4)} ZYRA in pending rewards</p>
              </div>
              <button
                onClick={handleClaimRewards}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('stake')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'stake' ? 'bg-blue-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
              }`}
            >
              Stake Tokens
            </button>
            <button
              onClick={() => setActiveTab('unstake')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'unstake' ? 'bg-blue-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
              }`}
            >
              Unstake Tokens
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'validator' ? 'bg-blue-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
              }`}
            >
              Become Validator
            </button>
          </div>

          {/* Stake Tab */}
          {activeTab === 'stake' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Stake Your Tokens</h3>
              <form onSubmit={handleStake} className="space-y-4 max-w-md">
                <div>
                  <label className="text-blue-200 text-sm block mb-1">Select Validator</label>
                  <select
                    value={stakeForm.validator}
                    onChange={(e) => setStakeForm(prev => ({ ...prev, validator: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-gray-300"
                    required
                  >
                    <option value="">Select a validator...</option>
                    {stakingData.validators.filter(v => v.status === 'active').map(validator => (
                      <option key={validator.id} value={validator.id}>
                        {validator.name} ({validator.commission}% commission, {validator.rewardRate}% APY)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-blue-200 text-sm block mb-1">Amount (ZYRA)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={stakeForm.amount}
                    onChange={(e) => setStakeForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.0000"
                    min="1"
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={stakeForm.loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  {stakeForm.loading ? 'Staking...' : 'Stake Tokens'}
                </button>
              </form>
            </div>
          )}

          {/* Unstake Tab */}
          {activeTab === 'unstake' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Unstake Your Tokens</h3>
              <p className="text-blue-200 mb-4">
                Note: Unstaked tokens have a 21-day unbonding period before they can be withdrawn.
              </p>
              <form onSubmit={handleUnstake} className="space-y-4 max-w-md">
                <div>
                  <label className="text-blue-200 text-sm block mb-1">Amount (ZYRA)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={unstakeForm.amount}
                    onChange={(e) => setUnstakeForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.0000"
                    min="0.0001"
                    max={stakingData.myStake}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum: {stakingData.myStake.toFixed(4)} ZYRA
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={unstakeForm.loading || stakingData.myStake === 0}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  {unstakeForm.loading ? 'Unstaking...' : 'Unstake Tokens'}
                </button>
              </form>
            </div>
          )}

          {/* Validator Tab */}
          {activeTab === 'validator' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Become a Validator</h3>
              {!stakingData.isValidator ? (
                <>
                  <p className="text-blue-200 mb-4">
                    Run your own validator node and earn rewards by helping to secure the Zyra network.
                    Minimum stake: 1000 ZYRA.
                  </p>
                  {!validatorForm.showForm ? (
                    <button
                      onClick={() => setValidatorForm(prev => ({ ...prev, showForm: true }))}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Start Validator Setup
                    </button>
                  ) : (
                    <form onSubmit={handleBecomeValidator} className="space-y-4 max-w-md">
                      <div>
                        <label className="text-blue-200 text-sm block mb-1">Validator Name</label>
                        <input
                          type="text"
                          value={validatorForm.name}
                          onChange={(e) => setValidatorForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter validator name"
                          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-blue-200 text-sm block mb-1">Description</label>
                        <textarea
                          value={validatorForm.description}
                          onChange={(e) => setValidatorForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your validator"
                          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                          rows="3"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-blue-200 text-sm block mb-1">Commission Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={validatorForm.commission}
                          onChange={(e) => setValidatorForm(prev => ({ ...prev, commission: e.target.value }))}
                          placeholder="5.0"
                          min="0"
                          max="100"
                          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-blue-200 text-sm block mb-1">Initial Stake (ZYRA)</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={validatorForm.minStake}
                          onChange={(e) => setValidatorForm(prev => ({ ...prev, minStake: e.target.value }))}
                          placeholder="1000.0000"
                          min="1000"
                          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-300"
                          required
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={validatorForm.loading}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                        >
                          {validatorForm.loading ? 'Setting up...' : 'Become Validator'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setValidatorForm(prev => ({ ...prev, showForm: false }))}
                          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="bg-green-600/20 border border-green-500 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Validator Status: Active</h4>
                  <p className="text-green-200">
                    Your validator node is running successfully! Monitor your performance in the validator dashboard.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Validators List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Active Validators</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4">Validator</th>
                  <th className="text-right py-3 px-4">Total Staked</th>
                  <th className="text-right py-3 px-4">Commission</th>
                  <th className="text-right py-3 px-4">APY</th>
                  <th className="text-right py-3 px-4">Uptime</th>
                  <th className="text-center py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {stakingData.validators.map((validator, index) => (
                  <tr key={validator.id} className="border-b border-gray-700 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold">{validator.name}</div>
                        <div className="text-sm text-gray-400 font-mono">{validator.address.substr(0, 20)}...</div>
                        <div className="text-xs text-gray-500">{validator.description}</div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      {validator.totalStaked.toLocaleString()} ZYRA
                    </td>
                    <td className="text-right py-4 px-4">
                      {validator.commission}%
                    </td>
                    <td className="text-right py-4 px-4 text-green-400">
                      {validator.rewardRate}%
                    </td>
                    <td className="text-right py-4 px-4">
                      {validator.uptime}%
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`px-3 py-1 rounded text-sm ${
                        validator.status === 'active' ? 'bg-green-600' : 
                        validator.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {validator.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
