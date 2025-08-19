# Zyra Frontend (Netlify Package)

This folder contains a minimal, Netlify-ready package for deploying the Zyra site.

Deploy steps:
1. Push this folder to a new GitHub repository (root of the repo should contain this README and `netlify.toml`).
2. In Netlify: New site from Git → select the repo. Netlify will use `netlify.toml` (base=frontend, publish=.next).
3. Set environment variables if needed (e.g. `NEXT_PUBLIC_API_BASE`).
4. After deploy, visit `/` for the landing page and `/explorer` for the live explorer.

Configuring chain/network:
- Use URL query params or localStorage to set `chainId`, `chainHex`, `chainName`, `rpc`, `ws`.
- Example: `/explorer?chainId=8453&chainHex=0x2105&chainName=Base%20Mainnet&rpc=https%3A%2F%2Fbase-rpc.publicnode.com&ws=wss%3A%2F%2Fbase-rpc.publicnode.com`.
