import { ethers } from "ethers";

// Network presets
export const HARDHAT = {
  chainId: 31337,
  hex: "0x7A69",
  name: "Hardhat Localhost",
  rpcUrls: ["http://127.0.0.1:8545"],
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  blockExplorerUrls: []
};

export function getRpcUrl() {
  return process.env.NEXT_PUBLIC_RPC_URL || HARDHAT.rpcUrls[0];
}

export function makeJsonRpcProvider(url = getRpcUrl()) {
  return new ethers.JsonRpcProvider(url);
}

export function hasWindow() {
  return typeof window !== "undefined";
}

export function hasEthereum() {
  return hasWindow() && typeof window.ethereum !== "undefined";
}

export async function makeBrowserProvider() {
  if (!hasEthereum()) return null;
  // ethers v6 BrowserProvider
  return new ethers.BrowserProvider(window.ethereum);
}

export async function requestAccounts() {
  const provider = await makeBrowserProvider();
  if (!provider) throw new Error("No injected wallet available");
  await provider.send("eth_requestAccounts", []);
  return provider;
}

export async function ensureChain(chain = HARDHAT) {
  if (!hasEthereum()) return false;
  const hex = chain.hex || "0x" + chain.chainId.toString(16);
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hex }]
    });
    return true;
  } catch (err) {
    if (err && err.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: hex,
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: chain.blockExplorerUrls || []
          }]
        });
        return true;
      } catch (_) {
        return false;
      }
    }
    return false;
  }
}

export async function getSigner() {
  const provider = await requestAccounts();
  return await provider.getSigner();
}

export async function bestProvider() {
  const injected = await makeBrowserProvider();
  if (injected) return injected;
  return makeJsonRpcProvider();
}

export async function getTx(txHash, provider) {
  const p = provider || (await bestProvider());
  return p.getTransaction(txHash);
}

export async function getReceipt(txHash, provider) {
  const p = provider || (await bestProvider());
  return p.getTransactionReceipt(txHash);
}

export async function waitForTx(txHash, provider) {
  const p = provider || (await bestProvider());
  // ethers v6: wait for mined receipt
  return p.waitForTransaction(txHash);
}

// Re-export common utils
export const { formatEther, parseEther, formatUnits, parseUnits } = ethers;
