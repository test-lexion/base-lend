import { WalletButton } from '@/components/WalletButton'
import { MarketStats } from '@/components/MarketStats'
import { LendingMarket } from '@/components/LendingMarket'
import { UserPositions } from '@/components/UserPositions'
import { Coins, Github, Twitter } from 'lucide-react'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Base Lending</h1>
                <p className="text-xs text-muted-foreground">Decentralized Finance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <WalletButton />
              <appkit-button />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Supply, Borrow, and Earn on{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Base</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The most efficient decentralized lending protocol on Base blockchain. Supply assets to
              earn interest, or use them as collateral to borrow.
            </p>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-8 container mx-auto px-4">
        <MarketStats />
      </section>

      {/* Main Content */}
      <section className="py-8 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Markets</h2>
              <LendingMarket />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Your Positions</h2>
            <UserPositions />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Base Lending. Built on Base blockchain.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
