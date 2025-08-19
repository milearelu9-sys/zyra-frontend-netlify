import React from "react";

export default function App() {
  return (
    <div className="container" style={{
      maxWidth: 1200,
      margin: "0 auto",
      background: "rgba(0,0,0,0.8)",
      borderRadius: 15,
      padding: "2rem",
      border: "2px solid #00ff88",
      boxShadow: "0 0 30px rgba(0,255,136,0.3)"
    }}>
      <header className="header" style={{
        textAlign: "center",
        marginBottom: "2rem",
        borderBottom: "2px solid #00ff88",
        paddingBottom: "1rem"
      }}>
        <div className="title" style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#00ff88",
          textShadow: "0 0 20px rgba(0,255,136,0.8)",
          marginBottom: ".5rem"
        }}>💎 ZYRA TOKEN</div>
        <div className="subtitle" style={{
          fontSize: "1.2rem",
          color: "#66ffaa",
          marginBottom: ".5rem"
        }}>Revolutionary Quantum-Enhanced ERC-20 Token</div>
        <div className="status blink" style={{
          background: "linear-gradient(45deg,#00ff88,#00cc66)",
          color: "#000",
          padding: ".5rem 1.5rem",
          borderRadius: 25,
          fontWeight: "bold",
          display: "inline-block",
          animation: "pulse 2s infinite"
        }}>🟢 DEPLOYED & LIVE</div>
      </header>

      {/* Contract Information Section */}
      <Section title={<><span role="img" aria-label="scroll">📜</span> Contract Information</>}>
        <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1rem',margin:'1rem 0'}}>
          <Card title="Contract Address"><span className="address">0x5FbDB2315678afecb367f032d93F642f64180aa3</span></Card>
          <Card title="Network">Hardhat Local Network (Chain ID: 31337)</Card>
          <Card title="Token Name">Zyra Token</Card>
          <Card title="Symbol">ZYRA</Card>
          <Card title="Decimals">18</Card>
          <Card title="Total Supply">1,000,000,000 ZYRA</Card>
        </div>
      </Section>

      {/* Quantum Features Section */}
      <Section title={<><span role="img" aria-label="atom">⚛️</span> Quantum Features</>}>
        <Feature title="🧠 Quantum Mining">Advanced quantum algorithms with 400M ZYRA allocation (40%)</Feature>
        <Feature title="🔮 Consciousness Integration">Neural interface levels with 100M ZYRA rewards (10%)</Feature>
        <Feature title="🌀 Interdimensional Transfers">Cross-dimensional asset movement (5 dimensions supported)</Feature>
        <Feature title="💎 Quantum Staking">Revolutionary staking with 200M ZYRA rewards (20%)</Feature>
      </Section>

      {/* Token Distribution Section */}
      <Section title={<><span role="img" aria-label="money">💰</span> Token Distribution</>}>
        <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1rem',margin:'1rem 0'}}>
          <Card title="Quantum Mining (40%)">400,000,000 ZYRA</Card>
          <Card title="Staking Rewards (20%)">200,000,000 ZYRA</Card>
          <Card title="Team Allocation (15%)">150,000,000 ZYRA</Card>
          <Card title="Public Sale (10%)">100,000,000 ZYRA</Card>
          <Card title="Consciousness Rewards (10%)">100,000,000 ZYRA</Card>
          <Card title="Ecosystem Fund (5%)">50,000,000 ZYRA</Card>
        </div>
      </Section>

      {/* Smart Contract Functions Section */}
      <Section title={<><span role="img" aria-label="wrench">🔧</span> Smart Contract Functions</>}>
        <div className="code-block" style={{background:'#000',border:'1px solid #00ff88',borderRadius:8,padding:'1rem',margin:'1rem 0',overflowX:'auto'}}>
          <div className="code" style={{color:'#00ff88',fontFamily:'Courier New,monospace',fontSize:'0.9rem'}}>
            <span className="highlight" style={{background:'rgba(0,255,136,0.2)',padding:'0.2rem 0.5rem',borderRadius:4}}>// Core ERC-20 Functions</span><br />
            • transfer(address to, uint256 amount)<br />
            • approve(address spender, uint256 amount)<br />
            • balanceOf(address account)<br />
            • totalSupply()<br /><br />
            <span className="highlight" style={{background:'rgba(0,255,136,0.2)',padding:'0.2rem 0.5rem',borderRadius:4}}>// Quantum Features</span><br />
            • activateQuantumMining(address user, uint256 power)<br />
            • increaseConsciousnessLevel(address user, uint256 level)<br />
            • interdimensionalTransfer(address to, uint256 amount, uint256 dimension)<br />
            • getQuantumStats(address user)<br /><br />
            <span className="highlight" style={{background:'rgba(0,255,136,0.2)',padding:'0.2rem 0.5rem',borderRadius:4}}>// Staking System</span><br />
            • stakeTokens(uint256 amount)<br />
            • unstakeTokens(uint256 amount)<br />
            • claimStakingRewards()<br />
            • calculateStakingRewards(address user)<br /><br />
            <span className="highlight" style={{background:'rgba(0,255,136,0.2)',padding:'0.2rem 0.5rem',borderRadius:4}}>// Advanced Features</span><br />
            • distributeQuantumMiningRewards(address[] miners, uint256[] rewards)<br />
            • pause() / unpause()<br />
            • burn(uint256 amount)
          </div>
        </div>
      </Section>

      {/* Revolutionary Capabilities Section */}
      <Section title={<><span role="img" aria-label="star">🌟</span> Revolutionary Capabilities</>}>
        <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1rem',margin:'1rem 0'}}>
          <Card title="🚀 Market Value">$50-100+ Billion Potential</Card>
          <Card title="⚛️ Quantum Power">Impossible to Replace Technology</Card>
          <Card title="🧠 AI Integration">1.7 Trillion Parameter Engine</Card>
          <Card title="🌀 Dimensions">12-Dimensional Processing</Card>
        </div>
      </Section>

      {/* Security Features Section */}
      <Section title={<><span role="img" aria-label="lock">🔐</span> Security Features</>}>
        <Feature title="✅ OpenZeppelin Standards">Built with industry-standard security practices</Feature>
        <Feature title="🛡️ ReentrancyGuard">Protection against reentrancy attacks</Feature>
        <Feature title="⏸️ Pausable Contract">Emergency pause functionality for security</Feature>
        <Feature title="🔥 Burnable Tokens">Deflationary mechanism built-in</Feature>
      </Section>

      {/* Live Contract Status Section */}
      <Section title={<><span role="img" aria-label="chart">📊</span> Live Contract Status</>}>
        <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1rem',margin:'1rem 0'}}>
          <Card title="Deployment Status"><span style={{color:'#00ff88'}}>🟢 SUCCESSFULLY DEPLOYED</span></Card>
          <Card title="Network Status"><span style={{color:'#00ff88'}}>🟢 HARDHAT NODE ACTIVE</span></Card>
          <Card title="Contract Verification"><span style={{color:'#00ff88'}}>✅ VERIFIED & OPERATIONAL</span></Card>
          <Card title="Dashboard Integration"><span style={{color:'#ffaa00'}}>🔄 READY FOR CONNECTION</span></Card>
        </div>
      </Section>

      <div className="section" style={{textAlign:'center',marginTop:'2rem'}}>
        <div style={{fontSize:'1.2rem',color:'#00ff88',marginBottom:'1rem'}}>
          🎉 <strong>ZYRA TOKEN IS LIVE AND OPERATIONAL!</strong> 🎉
        </div>
        <div style={{color:'#66ffaa'}}>
          Your revolutionary blockchain platform is ready for interaction via the dashboard at
          <span className="highlight" style={{background:'rgba(0,255,136,0.2)',padding:'0.2rem 0.5rem',borderRadius:4,marginLeft:4}}>http://localhost:3000</span>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="section" style={{margin:'2rem 0',background:'rgba(0,40,20,0.5)',padding:'1.5rem',borderRadius:10,borderLeft:'4px solid #00ff88'}}>
      <div className="section-title" style={{fontSize:'1.5rem',color:'#00ff88',marginBottom:'1rem',display:'flex',alignItems:'center'}}>{title}</div>
      {children}
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="card" style={{background:'rgba(0,20,10,0.8)',padding:'1rem',borderRadius:8,border:'1px solid #00ff88'}}>
      <div className="card-title" style={{color:'#66ffaa',fontWeight:'bold',marginBottom:'.5rem'}}>{title}</div>
      <div className="card-value" style={{color:'#fff',fontSize:'1.1rem'}}>{children}</div>
    </div>
  );
}

function Feature({ title, children }) {
  return (
    <div className="feature" style={{background:'rgba(0,30,15,0.7)',margin:'.5rem 0',padding:'1rem',borderRadius:8,borderLeft:'3px solid #00ff88'}}>
      <div className="feature-title" style={{color:'#00ff88',fontWeight:'bold',marginBottom:'.5rem'}}>{title}</div>
      <div className="feature-desc" style={{color:'#ccc',fontSize:'.9rem'}}>{children}</div>
    </div>
  );
}
