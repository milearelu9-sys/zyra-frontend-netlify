import Head from "next/head";
import Link from "next/link";
import TransactionLookup from "../components/TransactionLookup";
import LiveHead from "../components/LiveHead";
import PendingTxs from "../components/PendingTxs";

export default function TxPage() {
  const rpc = process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545";
  return (
    <>
      <Head>
        <title>ZYRA | Transaction Lookup</title>
        <meta name="description" content="Search blockchain transactions by hash using ethers v6." />
      </Head>

      {/* Page background to match dashboard */}
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 py-6 md:py-10">
          {/* Top bar / nav */}
          <header className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3 text-white hover:opacity-90">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm grid place-items-center border border-white/20">
                <span className="text-lg font-bold">Z</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">Zyra Blockchain</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-3">
              <Link href="/" className="text-blue-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10">Home</Link>
              <Link href="/explorer" className="text-blue-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10">Explorer</Link>
              <Link href="/wallet" className="text-blue-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10">Wallet</Link>
              <Link href="/analytics" className="text-blue-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10">Analytics</Link>
              <span className="px-3 py-2 rounded-lg bg-white/10 text-white font-semibold">Tx Lookup</span>
            </nav>
          </header>

          {/* Page title and blurb */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Transaction Lookup</h2>
            <p className="text-blue-200">Enter a transaction hash to fetch details (from, to, value, gas, status, block).</p>
          </div>

          {/* Live head stats */}
          <div className="mb-6">
            <LiveHead showActions={true} />
          </div>

          {/* Pending transactions feed */}
          <div className="mb-6">
            <PendingTxs limit={20} />
          </div>

          {/* Card container */}
          <section className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
            <TransactionLookup rpcUrl={rpc} />
          </section>
        </div>
      </div>
    </>
  );
}
