import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react'
import { Card } from './ui/card'

const stats = [
  {
    label: 'Total Market Size',
    value: '$124.5M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Total Borrowed',
    value: '$78.2M',
    change: '+8.3%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Active Users',
    value: '12,458',
    change: '+245',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Avg. Health Factor',
    value: '2.45',
    change: '-0.05',
    trend: 'down',
    icon: TrendingDown,
  },
]

export const MarketStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === 'up'
        
        return (
          <Card key={stat.label} className="p-6 hover:shadow-glow-primary transition-all cursor-pointer border-border/50">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-secondary' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isPositive ? 'bg-secondary/10' : 'bg-destructive/10'}`}>
                <Icon className={`w-5 h-5 ${isPositive ? 'text-secondary' : 'text-destructive'}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
