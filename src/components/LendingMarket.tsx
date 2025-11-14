import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ArrowRight, TrendingUp, Lock } from 'lucide-react'
import { useAccount } from 'wagmi'
import { toast } from 'sonner'

interface Asset {
  symbol: string
  name: string
  logo: string
  supplyAPY: string
  borrowAPY: string
  totalSupply: string
  totalBorrow: string
  liquidity: string
  collateralFactor: string
}

const assets: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '⟠',
    supplyAPY: '3.25',
    borrowAPY: '5.42',
    totalSupply: '$45.2M',
    totalBorrow: '$28.1M',
    liquidity: '$17.1M',
    collateralFactor: '80',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '$',
    supplyAPY: '4.15',
    borrowAPY: '6.28',
    totalSupply: '$52.8M',
    totalBorrow: '$35.4M',
    liquidity: '$17.4M',
    collateralFactor: '85',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    logo: '₿',
    supplyAPY: '2.85',
    borrowAPY: '4.92',
    totalSupply: '$18.6M',
    totalBorrow: '$9.8M',
    liquidity: '$8.8M',
    collateralFactor: '75',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    logo: '◈',
    supplyAPY: '3.95',
    borrowAPY: '5.87',
    totalSupply: '$7.9M',
    totalBorrow: '$4.9M',
    liquidity: '$3.0M',
    collateralFactor: '80',
  },
]

export const LendingMarket = () => {
  const { isConnected } = useAccount()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [amount, setAmount] = useState('')
  const [activeTab, setActiveTab] = useState('supply')

  const handleAction = (action: 'supply' | 'borrow') => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }
    if (!selectedAsset || !amount) {
      toast.error('Please select an asset and enter an amount')
      return
    }
    toast.success(`${action === 'supply' ? 'Supplying' : 'Borrowing'} ${amount} ${selectedAsset.symbol}...`)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="supply" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Supply
          </TabsTrigger>
          <TabsTrigger value="borrow" className="gap-2">
            <Lock className="w-4 h-4" />
            Borrow
          </TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-4">
          <div className="grid gap-4">
            {assets.map((asset) => (
              <Card
                key={asset.symbol}
                className={`p-6 cursor-pointer transition-all hover:shadow-glow-secondary border ${
                  selectedAsset?.symbol === asset.symbol && activeTab === 'supply'
                    ? 'border-secondary shadow-glow-secondary'
                    : 'border-border/50'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-2xl font-bold">
                      {asset.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{asset.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Supply APY</span>
                      <span className="text-xl font-bold text-secondary">{asset.supplyAPY}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Liquidity: {asset.liquidity}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedAsset && (
            <Card className="p-6 border-secondary/50 shadow-glow-secondary">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Amount to Supply</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Balance: 0.00 {selectedAsset.symbol}</p>
                </div>
                <Button
                  onClick={() => handleAction('supply')}
                  className="w-full bg-gradient-secondary hover:shadow-glow-secondary transition-all gap-2"
                  size="lg"
                >
                  Supply {selectedAsset.symbol}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="borrow" className="space-y-4">
          <div className="grid gap-4">
            {assets.map((asset) => (
              <Card
                key={asset.symbol}
                className={`p-6 cursor-pointer transition-all hover:shadow-glow-borrow border ${
                  selectedAsset?.symbol === asset.symbol && activeTab === 'borrow'
                    ? 'border-borrow shadow-glow-borrow'
                    : 'border-border/50'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-borrow flex items-center justify-center text-2xl font-bold">
                      {asset.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{asset.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Borrow APY</span>
                      <span className="text-xl font-bold text-borrow">{asset.borrowAPY}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Collateral: {asset.collateralFactor}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedAsset && (
            <Card className="p-6 border-borrow/50 shadow-glow-borrow">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Amount to Borrow</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Available: 0.00 {selectedAsset.symbol}</p>
                </div>
                <Button
                  onClick={() => handleAction('borrow')}
                  className="w-full bg-gradient-borrow hover:shadow-glow-borrow transition-all gap-2"
                  size="lg"
                >
                  Borrow {selectedAsset.symbol}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
