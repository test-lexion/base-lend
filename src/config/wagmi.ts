import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, baseSepolia } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

export const queryClient = new QueryClient()

// Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [base, baseSepolia],
  projectId,
  ssr: false
})

// Create the AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: [base, baseSepolia],
  projectId,
  metadata: {
    name: 'Base Lending Market',
    description: 'Decentralized Crypto Lending on Base',
    url: 'https://baselending.io',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
    email: false,
    socials: []
  }
})

export const config = wagmiAdapter.wagmiConfig
