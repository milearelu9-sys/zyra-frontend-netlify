import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Security() {
  const [securityData, setSecurityData] = useState({
    networkHealth: {},
    vulnerabilities: [],
    audits: [],
    bugBounty: {},
    securityTips: [],
    incidents: []
  });

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSecurityData();
    const interval = setInterval(fetchSecurityData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityData = async () => {
    try {
      const mockData = {
        networkHealth: {
          overallScore: 94.5,
          consensusHealth: 98.2,
          nodeDistribution: 87.6,
          uptimeScore: 99.1,
          securityScore: 92.3,
          lastUpdate: new Date()
        },
        vulnerabilities: [
          {
            id: 'ZYR-2025-001',
            severity: 'Medium',
            title: 'Potential integer overflow in staking contract',
            status: 'Fixed',
            reportedDate: '2025-08-10',
            fixedDate: '2025-08-12',
            reporter: 'WhiteHat Security',
            bounty: 5000
          },
          {
            id: 'ZYR-2025-002',
            severity: 'Low',
            title: 'Gas optimization opportunity in token transfers',
            status: 'In Progress',
            reportedDate: '2025-08-08',
            fixedDate: null,
            reporter: 'Community Researcher',
            bounty: 1000
          },
          {
            id: 'ZYR-2025-003',
            severity: 'High',
            title: 'Race condition in multi-sig wallet implementation',
            status: 'Fixed',
            reportedDate: '2025-07-25',
            fixedDate: '2025-07-26',
            reporter: 'Trail of Bits',
            bounty: 25000
          }
        ],
        audits: [
          {
            company: 'Trail of Bits',
            date: '2025-07-15',
            scope: 'Core Protocol Audit',
            status: 'Completed',
            findings: { critical: 0, high: 1, medium: 3, low: 8 },
            report: 'https://audits.zyra.network/trail-of-bits-2025-07.pdf'
          },
          {
            company: 'ConsenSys Diligence',
            date: '2025-06-20',
            scope: 'Smart Contract Security Review',
            status: 'Completed',
            findings: { critical: 0, high: 0, medium: 2, low: 5 },
            report: 'https://audits.zyra.network/consensys-2025-06.pdf'
          },
          {
            company: 'OpenZeppelin',
            date: '2025-05-10',
            scope: 'DeFi Protocol Audit',
            status: 'Completed',
            findings: { critical: 0, high: 2, medium: 4, low: 12 },
            report: 'https://audits.zyra.network/openzeppelin-2025-05.pdf'
          },
          {
            company: 'Quantstamp',
            date: '2025-08-20',
            scope: 'Bridge Security Audit',
            status: 'In Progress',
            findings: { critical: 0, high: 0, medium: 0, low: 0 },
            report: null
          }
        ],
        bugBounty: {
          totalPaid: 285000,
          activeProgram: true,
          participantsCount: 1247,
          vulnerabilitiesFound: 38,
          rewards: {
            critical: { min: 50000, max: 250000 },
            high: { min: 10000, max: 50000 },
            medium: { min: 2500, max: 10000 },
            low: { min: 500, max: 2500 }
          }
        },
        securityTips: [
          {
            title: 'Secure Your Private Keys',
            description: 'Never share your private keys or seed phrases. Use hardware wallets for large amounts.',
            icon: '🔐'
          },
          {
            title: 'Verify Contract Addresses',
            description: 'Always double-check smart contract addresses before interacting with them.',
            icon: '✅'
          },
          {
            title: 'Use Reputable Wallets',
            description: 'Only use well-known and audited wallet applications from official sources.',
            icon: '👛'
          },
          {
            title: 'Enable 2FA',
            description: 'Use two-factor authentication on all accounts related to your crypto assets.',
            icon: '🔒'
          },
          {
            title: 'Regular Security Audits',
            description: 'Keep your systems updated and regularly audit your security practices.',
            icon: '🛡️'
          },
          {
            title: 'Beware of Phishing',
            description: 'Be cautious of suspicious links, emails, and websites asking for your credentials.',
            icon: '🎣'
          }
        ],
        incidents: [
          {
            date: '2025-07-26',
            severity: 'High',
            title: 'Multi-sig wallet vulnerability patched',
            description: 'Race condition in multi-signature wallet implementation was discovered and immediately patched.',
            impact: 'No funds at risk, preventive fix applied',
            status: 'Resolved'
          },
          {
            date: '2025-06-15',
            severity: 'Medium',
            title: 'DDoS attack mitigated',
            description: 'Network experienced increased traffic load, successfully mitigated with rate limiting.',
            impact: 'Brief performance degradation, no service interruption',
            status: 'Resolved'
          },
          {
            date: '2025-05-20',
            severity: 'Low',
            title: 'Minor explorer API rate limit bypass',
            description: 'Rate limiting bypass in block explorer API was discovered and fixed.',
            impact: 'No security risk, improved rate limiting implemented',
            status: 'Resolved'
          }
        ]
      };

      setSecurityData(mockData);
    } catch (error) {
      console.error('Error fetching security data:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'fixed':
      case 'completed':
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'in progress': return 'bg-blue-500/20 text-blue-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Security Center</h1>
            <p className="text-blue-200">Network security status, audits, and best practices</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Security Score */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Network Security Health</h2>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-400">{securityData.networkHealth.overallScore}</p>
              <p className="text-gray-400 text-sm">Overall Score</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-600"/>
                  <circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - securityData.networkHealth.consensusHealth / 100)}`}
                    className="text-green-400 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{securityData.networkHealth.consensusHealth?.toFixed(0)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Consensus Health</p>
            </div>

            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-600"/>
                  <circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - securityData.networkHealth.nodeDistribution / 100)}`}
                    className="text-blue-400 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{securityData.networkHealth.nodeDistribution?.toFixed(0)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Node Distribution</p>
            </div>

            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-600"/>
                  <circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - securityData.networkHealth.uptimeScore / 100)}`}
                    className="text-purple-400 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{securityData.networkHealth.uptimeScore?.toFixed(0)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Network Uptime</p>
            </div>

            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-600"/>
                  <circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - securityData.networkHealth.securityScore / 100)}`}
                    className="text-yellow-400 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{securityData.networkHealth.securityScore?.toFixed(0)}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Security Score</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'audits', 'vulnerabilities', 'bug-bounty', 'tips', 'incidents'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bug Bounty Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🏆 Bug Bounty Program</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Paid Out</p>
                  <p className="text-2xl font-bold text-green-400">${formatNumber(securityData.bugBounty.totalPaid)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Researchers</p>
                  <p className="text-2xl font-bold text-blue-400">{formatNumber(securityData.bugBounty.participantsCount)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Critical:</span>
                  <span className="text-red-400">${formatNumber(securityData.bugBounty.rewards.critical.min)} - ${formatNumber(securityData.bugBounty.rewards.critical.max)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">High:</span>
                  <span className="text-orange-400">${formatNumber(securityData.bugBounty.rewards.high.min)} - ${formatNumber(securityData.bugBounty.rewards.high.max)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Medium:</span>
                  <span className="text-yellow-400">${formatNumber(securityData.bugBounty.rewards.medium.min)} - ${formatNumber(securityData.bugBounty.rewards.medium.max)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Low:</span>
                  <span className="text-green-400">${formatNumber(securityData.bugBounty.rewards.low.min)} - ${formatNumber(securityData.bugBounty.rewards.low.max)}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all">
                Join Bug Bounty Program
              </button>
            </div>

            {/* Recent Audits */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🔍 Recent Security Audits</h3>
              <div className="space-y-4">
                {securityData.audits.slice(0, 3).map((audit, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{audit.company}</h4>
                        <p className="text-gray-400 text-sm">{audit.scope}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{audit.date}</span>
                      <div className="flex space-x-4">
                        <span className="text-red-400">C: {audit.findings.critical}</span>
                        <span className="text-orange-400">H: {audit.findings.high}</span>
                        <span className="text-yellow-400">M: {audit.findings.medium}</span>
                        <span className="text-green-400">L: {audit.findings.low}</span>
                      </div>
                    </div>
                    {audit.report && (
                      <a href={audit.report} className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        View Report →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audits Tab */}
        {activeTab === 'audits' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Security Audits</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4">Audit Company</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Scope</th>
                    <th className="text-center py-3 px-4">Findings</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {securityData.audits.map((audit, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-white/5">
                      <td className="py-4 px-4 font-semibold">{audit.company}</td>
                      <td className="py-4 px-4">{audit.date}</td>
                      <td className="py-4 px-4">{audit.scope}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center space-x-2 text-sm">
                          <span className="text-red-400">C:{audit.findings.critical}</span>
                          <span className="text-orange-400">H:{audit.findings.high}</span>
                          <span className="text-yellow-400">M:{audit.findings.medium}</span>
                          <span className="text-green-400">L:{audit.findings.low}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(audit.status)}`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        {audit.report ? (
                          <a href={audit.report} className="text-blue-400 hover:text-blue-300 transition-colors">
                            View PDF
                          </a>
                        ) : (
                          <span className="text-gray-500">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vulnerabilities Tab */}
        {activeTab === 'vulnerabilities' && (
          <div className="space-y-4">
            {securityData.vulnerabilities.map((vuln, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{vuln.title}</h3>
                    <p className="text-gray-400">ID: {vuln.id} • Reported by: {vuln.reporter}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(vuln.status)}`}>
                      {vuln.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Reported Date</p>
                    <p className="text-white font-semibold">{vuln.reportedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Fixed Date</p>
                    <p className="text-white font-semibold">{vuln.fixedDate || 'In Progress'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Bounty Reward</p>
                    <p className="text-green-400 font-semibold">${formatNumber(vuln.bounty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bug Bounty Tab */}
        {activeTab === 'bug-bounty' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">🏆 Bug Bounty Program</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">${formatNumber(securityData.bugBounty.totalPaid)}</p>
                  <p className="text-gray-400">Total Paid</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">{formatNumber(securityData.bugBounty.participantsCount)}</p>
                  <p className="text-gray-400">Participants</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-400">{securityData.bugBounty.vulnerabilitiesFound}</p>
                  <p className="text-gray-400">Vulnerabilities Found</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{securityData.bugBounty.activeProgram ? 'Active' : 'Inactive'}</p>
                  <p className="text-gray-400">Program Status</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Reward Structure</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <span className="text-red-400 font-semibold">Critical</span>
                      <span className="text-white">${formatNumber(securityData.bugBounty.rewards.critical.min)} - ${formatNumber(securityData.bugBounty.rewards.critical.max)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <span className="text-orange-400 font-semibold">High</span>
                      <span className="text-white">${formatNumber(securityData.bugBounty.rewards.high.min)} - ${formatNumber(securityData.bugBounty.rewards.high.max)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <span className="text-yellow-400 font-semibold">Medium</span>
                      <span className="text-white">${formatNumber(securityData.bugBounty.rewards.medium.min)} - ${formatNumber(securityData.bugBounty.rewards.medium.max)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <span className="text-green-400 font-semibold">Low</span>
                      <span className="text-white">${formatNumber(securityData.bugBounty.rewards.low.min)} - ${formatNumber(securityData.bugBounty.rewards.low.max)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Program Rules</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Test only on testnets or local environments
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Report vulnerabilities responsibly
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Provide clear reproduction steps
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      No social engineering or physical attacks
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      First valid report gets the reward
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all">
                  Submit Vulnerability Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tips Tab */}
        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityData.securityTips.map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-4">{tip.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
                    <p className="text-blue-200">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {securityData.incidents.map((incident, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{incident.title}</h3>
                    <p className="text-gray-400">{incident.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                <p className="text-blue-200 mb-2">{incident.description}</p>
                <p className="text-gray-300 text-sm"><strong>Impact:</strong> {incident.impact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Security), { ssr: false });
