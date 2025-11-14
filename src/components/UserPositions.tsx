import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { useAccount } from 'wagmi'

export const UserPositions = () => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <Card className="p-12 text-center border-border/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground">
              Connect your wallet to view your lending and borrowing positions
            </p>
          </div>
        </div>
      </Card>
    )
  }

  // Mock data for demonstration
  const healthFactor = 2.45
  const totalSupplied = 5240.50
  const totalBorrowed = 2180.25
  const netAPY = 4.32
  const borrowLimit = totalSupplied * 0.8
  const borrowLimitUsed = (totalBorrowed / borrowLimit) * 100

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/50">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Health Factor</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-secondary">{healthFactor}</span>
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-secondary font-medium">Safe</span>
            </div>
            <Progress value={Math.min((healthFactor / 5) * 100, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Liquidation occurs when health factor {'<'} 1.0
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 border-secondary/30">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Supplied</p>
                <p className="text-2xl font-bold text-foreground">${totalSupplied.toFixed(2)}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ETH</span>
                <span className="text-foreground">$3,240.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">USDC</span>
                <span className="text-foreground">$2,000.50</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-borrow/30">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-borrow/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-borrow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Borrowed</p>
                <p className="text-2xl font-bold text-foreground">${totalBorrowed.toFixed(2)}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">USDC</span>
                <span className="text-foreground">$1,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">DAI</span>
                <span className="text-foreground">$680.25</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/50">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-foreground">Borrow Limit</h3>
            <span className="text-sm text-muted-foreground">
              ${totalBorrowed.toFixed(2)} / ${borrowLimit.toFixed(2)}
            </span>
          </div>
          <Progress value={borrowLimitUsed} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Limit Used</span>
            <span className={borrowLimitUsed > 80 ? 'text-destructive' : 'text-foreground'}>
              {borrowLimitUsed.toFixed(1)}%
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-hero border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net APY</p>
            <p className="text-3xl font-bold text-foreground">{netAPY}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Estimated Yearly</p>
            <p className="text-xl font-bold text-secondary">+${(totalSupplied * netAPY / 100).toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
