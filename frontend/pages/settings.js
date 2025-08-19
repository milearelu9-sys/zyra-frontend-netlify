import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Settings() {
  const [settings, setSettings] = useState({
    account: {
      username: 'user@zyra.network',
      displayName: 'Zyra User',
      avatar: '👤',
      language: 'en',
      timezone: 'UTC',
      notifications: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginNotifications: true,
      apiAccess: false,
      trustedDevices: []
    },
    privacy: {
      publicProfile: false,
      showBalance: false,
      trackingOptOut: false,
      dataSharing: false
    },
    network: {
      rpcEndpoint: 'https://rpc.zyranetwork.com',
      chainId: 2024,
      gasPrice: 'auto',
      blockConfirmations: 12
    },
    display: {
      theme: 'dark',
      currency: 'USD',
      priceAlerts: true,
      compactView: false
    }
  });

  const [activeTab, setActiveTab] = useState('account');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      // Mock API call - replace with actual API
      console.log('Fetching user settings...');
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Mock API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnsavedChanges(false);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      fetchUserSettings();
      setUnsavedChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            <p className="text-blue-200">Configure your account and preferences</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Save/Reset Bar */}
        {unsavedChanges && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⚠️</span>
                <span className="text-white">You have unsaved changes</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleReset}
                  className="text-gray-300 hover:text-white px-3 py-1 text-sm transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 h-fit">
            <h3 className="text-lg font-bold text-white mb-4">Settings</h3>
            <div className="space-y-2">
              {[
                { id: 'account', label: 'Account', icon: '👤' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'privacy', label: 'Privacy', icon: '🛡️' },
                { id: 'network', label: 'Network', icon: '🌐' },
                { id: 'display', label: 'Display', icon: '🎨' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-5xl">{settings.account.avatar}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{settings.account.displayName}</h4>
                      <p className="text-gray-400">{settings.account.username}</p>
                    </div>
                    <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Display Name</label>
                      <input
                        type="text"
                        value={settings.account.displayName}
                        onChange={(e) => handleSettingChange('account', 'displayName', e.target.value)}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.account.username}
                        onChange={(e) => handleSettingChange('account', 'username', e.target.value)}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Language</label>
                      <select
                        value={settings.account.language}
                        onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Timezone</label>
                      <select
                        value={settings.account.timezone}
                        onChange={(e) => handleSettingChange('account', 'timezone', e.target.value)}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="GMT">Greenwich Mean Time</option>
                        <option value="JST">Japan Standard Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Email Notifications</h4>
                      <p className="text-gray-400 text-sm">Receive important updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.account.notifications}
                        onChange={(e) => handleSettingChange('account', 'notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="text-white font-semibold">Two-Factor Authentication</h4>
                      <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Session Timeout (minutes)</label>
                    <select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full md:w-64 bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={240}>4 hours</option>
                      <option value={480}>8 hours</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Login Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.loginNotifications}
                        onChange={(e) => handleSettingChange('security', 'loginNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">API Access</h4>
                      <p className="text-gray-400 text-sm">Allow third-party applications to access your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.apiAccess}
                        onChange={(e) => handleSettingChange('security', 'apiAccess', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3">Security Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors">
                        Change Password
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                        Revoke All Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="text-white font-semibold">Public Profile</h4>
                      <p className="text-gray-400 text-sm">Allow others to view your basic profile information</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.publicProfile}
                        onChange={(e) => handleSettingChange('privacy', 'publicProfile', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Show Balance</h4>
                      <p className="text-gray-400 text-sm">Display your wallet balance publicly</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showBalance}
                        onChange={(e) => handleSettingChange('privacy', 'showBalance', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Opt-out of Analytics</h4>
                      <p className="text-gray-400 text-sm">Prevent collection of usage analytics data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.trackingOptOut}
                        onChange={(e) => handleSettingChange('privacy', 'trackingOptOut', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Data Sharing</h4>
                      <p className="text-gray-400 text-sm">Share anonymized data to improve the platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.dataSharing}
                        onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3">Data Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                        Download My Data
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Network Settings */}
            {activeTab === 'network' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Network Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">RPC Endpoint</label>
                    <input
                      type="url"
                      value={settings.network.rpcEndpoint}
                      onChange={(e) => handleSettingChange('network', 'rpcEndpoint', e.target.value)}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      placeholder="https://rpc.zyranetwork.com"
                    />
                    <p className="text-gray-400 text-sm mt-1">Custom RPC endpoint for network connections</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Chain ID</label>
                      <input
                        type="number"
                        value={settings.network.chainId}
                        onChange={(e) => handleSettingChange('network', 'chainId', parseInt(e.target.value))}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Gas Price Strategy</label>
                      <select
                        value={settings.network.gasPrice}
                        onChange={(e) => handleSettingChange('network', 'gasPrice', e.target.value)}
                        className="w-full bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                      >
                        <option value="auto">Auto</option>
                        <option value="fast">Fast</option>
                        <option value="standard">Standard</option>
                        <option value="slow">Slow</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Block Confirmations</label>
                    <select
                      value={settings.network.blockConfirmations}
                      onChange={(e) => handleSettingChange('network', 'blockConfirmations', parseInt(e.target.value))}
                      className="w-full md:w-64 bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                    >
                      <option value={1}>1 Confirmation</option>
                      <option value={3}>3 Confirmations</option>
                      <option value={6}>6 Confirmations</option>
                      <option value={12}>12 Confirmations</option>
                      <option value={24}>24 Confirmations</option>
                    </select>
                    <p className="text-gray-400 text-sm mt-1">Required confirmations before considering transactions final</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3">Network Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 font-semibold">Connected</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">Mainnet • Block #8759</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                        Test Connection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Display Settings */}
            {activeTab === 'display' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Display Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['dark', 'light', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          className={`p-4 rounded-lg border-2 transition-all capitalize ${
                            settings.display.theme === theme
                              ? 'border-blue-500 bg-blue-500/20'
                              : 'border-white/20 bg-white/5 hover:border-white/30'
                          }`}
                          onClick={() => handleSettingChange('display', 'theme', theme)}
                        >
                          <div className="text-2xl mb-2">
                            {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🔄'}
                          </div>
                          <span className="text-white">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Currency</label>
                    <select
                      value={settings.display.currency}
                      onChange={(e) => handleSettingChange('display', 'currency', e.target.value)}
                      className="w-full md:w-64 bg-white/10 text-white px-4 py-3 rounded border border-white/20"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="BTC">BTC (₿)</option>
                      <option value="ETH">ETH (Ξ)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Price Alerts</h4>
                      <p className="text-gray-400 text-sm">Show desktop notifications for price changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.display.priceAlerts}
                        onChange={(e) => handleSettingChange('display', 'priceAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-white/10">
                    <div>
                      <h4 className="text-white font-semibold">Compact View</h4>
                      <p className="text-gray-400 text-sm">Use condensed layout for better space utilization</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.display.compactView}
                        onChange={(e) => handleSettingChange('display', 'compactView', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
