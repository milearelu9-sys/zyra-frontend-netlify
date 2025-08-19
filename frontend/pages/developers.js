import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Developers() {
  const [devData, setDevData] = useState({
    apis: [],
    sdks: [],
    tutorials: [],
    documentation: [],
    tools: [],
    examples: []
  });

  const [activeTab, setActiveTab] = useState('apis');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  const fetchDeveloperData = async () => {
    try {
      const mockData = {
        apis: [
          {
            name: 'Zyra Core API',
            version: '2.1.0',
            description: 'Core blockchain functionality including blocks, transactions, and accounts',
            endpoint: 'https://api.zyra.network/v2',
            methods: ['GET', 'POST'],
            rateLimit: '1000/hour',
            status: 'stable'
          },
          {
            name: 'Zyra DeFi API',
            version: '1.5.2',
            description: 'DeFi protocols, liquidity pools, and yield farming data',
            endpoint: 'https://defi-api.zyra.network/v1',
            methods: ['GET', 'POST', 'PUT'],
            rateLimit: '500/hour',
            status: 'stable'
          },
          {
            name: 'Zyra NFT API',
            version: '1.2.1',
            description: 'NFT marketplace, collections, and metadata services',
            endpoint: 'https://nft-api.zyra.network/v1',
            methods: ['GET', 'POST'],
            rateLimit: '2000/hour',
            status: 'beta'
          },
          {
            name: 'Zyra Analytics API',
            version: '1.0.4',
            description: 'Network statistics, performance metrics, and historical data',
            endpoint: 'https://analytics-api.zyra.network/v1',
            methods: ['GET'],
            rateLimit: '100/hour',
            status: 'stable'
          }
        ],
        sdks: [
          {
            name: 'zyra-js',
            language: 'JavaScript',
            version: '3.2.1',
            description: 'Official JavaScript SDK for web and Node.js applications',
            downloads: '45.2K',
            github: 'https://github.com/zyra/zyra-js',
            npm: 'npm install zyra-js'
          },
          {
            name: 'zyra-python',
            language: 'Python',
            version: '2.1.8',
            description: 'Python SDK for backend applications and data analysis',
            downloads: '28.7K',
            github: 'https://github.com/zyra/zyra-python',
            npm: 'pip install zyra-python'
          },
          {
            name: 'zyra-go',
            language: 'Go',
            version: '1.4.2',
            description: 'Go SDK for high-performance blockchain applications',
            downloads: '15.3K',
            github: 'https://github.com/zyra/zyra-go',
            npm: 'go get github.com/zyra/zyra-go'
          },
          {
            name: 'zyra-rust',
            language: 'Rust',
            version: '0.9.5',
            description: 'Rust SDK for systems programming and smart contracts',
            downloads: '8.1K',
            github: 'https://github.com/zyra/zyra-rust',
            npm: 'cargo add zyra-rust'
          }
        ],
        tutorials: [
          {
            title: 'Building Your First DApp',
            difficulty: 'Beginner',
            duration: '45 min',
            description: 'Learn to create a simple decentralized application on Zyra',
            tags: ['DApp', 'Smart Contracts', 'Frontend']
          },
          {
            title: 'Integrating Zyra Wallet',
            difficulty: 'Intermediate',
            duration: '30 min',
            description: 'Add wallet connectivity to your web application',
            tags: ['Wallet', 'Integration', 'Web3']
          },
          {
            title: 'DeFi Protocol Development',
            difficulty: 'Advanced',
            duration: '120 min',
            description: 'Build a complete DeFi protocol with lending and borrowing',
            tags: ['DeFi', 'Smart Contracts', 'Advanced']
          },
          {
            title: 'NFT Marketplace Creation',
            difficulty: 'Intermediate',
            duration: '90 min',
            description: 'Create your own NFT marketplace on Zyra Network',
            tags: ['NFT', 'Marketplace', 'Smart Contracts']
          }
        ],
        documentation: [
          {
            category: 'Getting Started',
            pages: [
              'Quick Start Guide',
              'Network Configuration',
              'Account Setup',
              'First Transaction'
            ]
          },
          {
            category: 'Smart Contracts',
            pages: [
              'Contract Development',
              'Deployment Guide',
              'Testing Framework',
              'Security Best Practices'
            ]
          },
          {
            category: 'APIs & SDKs',
            pages: [
              'REST API Reference',
              'WebSocket API',
              'SDK Documentation',
              'Rate Limits'
            ]
          },
          {
            category: 'DeFi Development',
            pages: [
              'Liquidity Pools',
              'Yield Farming',
              'Token Standards',
              'Oracle Integration'
            ]
          }
        ],
        tools: [
          {
            name: 'Zyra Studio',
            type: 'IDE Extension',
            description: 'VS Code extension for smart contract development',
            downloads: '12.5K',
            rating: 4.8
          },
          {
            name: 'Zyra CLI',
            type: 'Command Line',
            description: 'Command line interface for network interaction',
            downloads: '23.1K',
            rating: 4.9
          },
          {
            name: 'Contract Deployer',
            type: 'Web Tool',
            description: 'Web-based smart contract deployment tool',
            downloads: '8.7K',
            rating: 4.6
          },
          {
            name: 'Network Explorer',
            type: 'Development Tool',
            description: 'Advanced blockchain explorer for developers',
            downloads: '31.2K',
            rating: 4.7
          }
        ],
        examples: [
          {
            name: 'Token Contract',
            language: 'Solidity',
            description: 'ERC-20 compatible token contract example',
            lines: 156
          },
          {
            name: 'DeFi Pool',
            language: 'Solidity',
            description: 'Liquidity pool contract with yield farming',
            lines: 342
          },
          {
            name: 'NFT Collection',
            language: 'Solidity',
            description: 'ERC-721 NFT collection with metadata',
            lines: 198
          },
          {
            name: 'Voting DAO',
            language: 'Solidity',
            description: 'Decentralized governance voting contract',
            lines: 267
          }
        ]
      };

      setDevData(mockData);
    } catch (error) {
      console.error('Error fetching developer data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-500/20 text-green-400';
      case 'beta': return 'bg-yellow-500/20 text-yellow-400';
      case 'alpha': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const codeExamples = {
    javascript: `// Connect to Zyra Network
import { ZyraSDK } from 'zyra-js';

const zyra = new ZyraSDK({
  network: 'mainnet',
  apiKey: 'your-api-key'
});

// Send a transaction
async function sendTransaction() {
  const tx = await zyra.transactions.send({
    to: '0x742d35Cc6634C0532925a3b8D2D2bb4e688fE0Cc',
    value: zyra.utils.toZyra('1.5'),
    gasLimit: 21000
  });
  
  console.log('Transaction hash:', tx.hash);
  return tx;
}`,
    python: `# Zyra Python SDK Example
from zyra import ZyraClient

# Initialize client
client = ZyraClient(
    network='mainnet',
    api_key='your-api-key'
)

# Get account balance
def get_balance(address):
    balance = client.accounts.get_balance(address)
    return client.utils.from_wei(balance, 'ether')

# Deploy smart contract
def deploy_contract(contract_code, constructor_args):
    tx = client.contracts.deploy(
        code=contract_code,
        args=constructor_args,
        gas_limit=500000
    )
    return tx.contract_address`,
    go: `// Zyra Go SDK Example
package main

import (
    "fmt"
    "github.com/zyra/zyra-go"
)

func main() {
    // Create client
    client := zyra.NewClient(&zyra.Config{
        Network: "mainnet",
        APIKey:  "your-api-key",
    })

    // Get latest block
    block, err := client.Blocks.Latest()
    if err != nil {
        panic(err)
    }

    fmt.Printf("Latest block: %d\\n", block.Number)
}`,
    rust: `// Zyra Rust SDK Example
use zyra_rust::{ZyraClient, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize client
    let config = Config {
        network: "mainnet".to_string(),
        api_key: "your-api-key".to_string(),
    };
    
    let client = ZyraClient::new(config);

    // Get network status
    let status = client.network().status().await?;
    println!("Network status: {:?}", status);

    Ok(())
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Developer Hub</h1>
            <p className="text-blue-200">Build the future of decentralized applications on Zyra</p>
          </div>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Active Developers</h3>
            <p className="text-2xl font-bold text-white">2,847</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">Smart Contracts</h3>
            <p className="text-2xl font-bold text-green-400">15,672</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">DApps Deployed</h3>
            <p className="text-2xl font-bold text-purple-400">1,234</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-blue-200 text-sm font-medium mb-1">API Calls/Day</h3>
            <p className="text-2xl font-bold text-yellow-400">890K</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['apis', 'sdks', 'tutorials', 'documentation', 'tools', 'examples'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
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

        {/* APIs Tab */}
        {activeTab === 'apis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devData.apis.map((api, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{api.name}</h3>
                    <p className="text-gray-400">v{api.version}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(api.status)}`}>
                    {api.status}
                  </span>
                </div>
                <p className="text-blue-200 mb-4">{api.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Endpoint:</span>
                    <span className="text-white font-mono">{api.endpoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Methods:</span>
                    <span className="text-white">{api.methods.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate Limit:</span>
                    <span className="text-yellow-400">{api.rateLimit}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    View Docs
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Try API
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SDKs Tab */}
        {activeTab === 'sdks' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {devData.sdks.map((sdk, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{sdk.name}</h3>
                      <p className="text-gray-400">{sdk.language} • v{sdk.version}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">{sdk.downloads}</p>
                      <p className="text-gray-400 text-sm">downloads</p>
                    </div>
                  </div>
                  <p className="text-blue-200 mb-4">{sdk.description}</p>
                  <div className="bg-gray-800/50 rounded p-3 mb-4 font-mono text-sm text-green-400">
                    {sdk.npm}
                  </div>
                  <div className="flex space-x-2">
                    <a href={sdk.github} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors">
                      GitHub
                    </a>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                      Documentation
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Code Example */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Quick Start Example</h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              <pre className="bg-gray-900 rounded p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  {codeExamples[selectedLanguage]}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devData.tutorials.map((tutorial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{tutorial.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                <p className="text-blue-200 mb-4">{tutorial.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">⏱️ {tutorial.duration}</span>
                  <div className="flex flex-wrap gap-2">
                    {tutorial.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition-all">
                  Start Tutorial
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devData.documentation.map((section, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">{section.category}</h3>
                <div className="space-y-2">
                  {section.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-blue-200">{page}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devData.tools.map((tool, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    <p className="text-gray-400">{tool.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-white font-bold">{tool.rating}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{tool.downloads} downloads</p>
                  </div>
                </div>
                <p className="text-blue-200 mb-4">{tool.description}</p>
                <div className="flex space-x-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Download
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devData.examples.map((example, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{example.name}</h3>
                    <p className="text-gray-400">{example.language} • {example.lines} lines</p>
                  </div>
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-blue-200 mb-6">{example.description}</p>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    View Code
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
