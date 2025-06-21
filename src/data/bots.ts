// data/bots.ts

export type Bot = {
    id: string
    name: string
    minAmount: string
    performance: string
    fee: string
    bgColor: string
    description: string
    tier: 'Standard' | 'Premium' | 'Enterprise'
    imageUrl?: string
  }
  
  export const bots: Bot[] = [
    {
      id: '1',
      name: 'BETA COPIER',
      minAmount: '$500',
      performance: '112%',
      fee: '12%',
      bgColor: 'bg-white',
      tier: 'Standard',
      description: 'BETA COPIER is a stable bot with low risk, perfect for beginners starting out in automation.',
      imageUrl: '/images/beta.jpg',
    },
    {
      id: '2',
      name: 'ALPHA TRADER',
      minAmount: '$1500',
      performance: '125%',
      fee: '15%',
      bgColor: 'bg-brand-purple-50',
      tier: 'Premium',
      description: 'ALPHA TRADER uses AI-backed strategies to seek higher returns. Designed for intermediate traders.',
      imageUrl: '/images/alpha.jpg',
    },
    {
      id: '3',
      name: 'OMEGA SCALPER',
      minAmount: '$2000',
      performance: '135%',
      fee: '18%',
      bgColor: 'bg-white',
      tier: 'Enterprise',
      description: 'OMEGA SCALPER executes rapid trades in volatile markets. High risk, high reward.',
      imageUrl: '/images/omega.jpg',
    },
  ]
  