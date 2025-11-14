import { useAccount, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import { Wallet, LogOut } from 'lucide-react'

export const WalletButton = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm font-mono text-foreground">{formatAddress(address)}</span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => {
        const btn = document.querySelector('appkit-button') as HTMLElement
        btn?.click()
      }}
      className="gap-2 bg-gradient-primary hover:shadow-glow-primary transition-all"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
