// /app/api/convert/route.ts
import { NextResponse } from 'next/server'

const STATIC_RATES: Record<string, number> = {
  NGN: 1,
  USD: 0.0011,
  EUR: 0.0010,
  GBP: 0.0009,
  BTC: 0.000000015,
}

const EXCHANGE_API_KEY = process.env.EXCHANGE_RATE_API_KEY!
const CACHE_DURATION_MS = 60 * 60 * 1000

let cachedFiatRates: Record<string, number> | null = null
let fiatCacheTime = 0
let cachedBTC: number | null = null
let btcCacheTime = 0

async function fetchFiatRates(base = 'NGN') {
  const now = Date.now()
  if (cachedFiatRates && now - fiatCacheTime < CACHE_DURATION_MS) return cachedFiatRates

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${base}`)
    const data = await res.json()

    if (data?.result !== "success" || !data.conversion_rates) {
      throw new Error("Invalid response from ExchangeRate-API")
    }

    cachedFiatRates = data.conversion_rates
    fiatCacheTime = now
    return cachedFiatRates
  } catch (err) {
    console.error("❌ Error fetching fiat rates:", err)
    return cachedFiatRates
  }
}

async function fetchBTCtoNGN() {
  const now = Date.now()
  if (cachedBTC && now - btcCacheTime < CACHE_DURATION_MS) return cachedBTC

  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ngn')
    const data = await res.json()

    if (!data?.bitcoin?.ngn) throw new Error("Invalid BTC data")

    const rate = 1 / data.bitcoin.ngn
    cachedBTC = rate
    btcCacheTime = now
    return rate
  } catch (err) {
    console.error("❌ Error fetching BTC rate:", err)
    return STATIC_RATES.BTC
  }
}

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json()

    if (!amount || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let conversionRate: number | undefined

    if (currency === 'BTC') {
      conversionRate = await fetchBTCtoNGN()
    } else {
      const rates = await fetchFiatRates('NGN')
      conversionRate = rates?.[currency] ?? STATIC_RATES[currency]
    }

    if (!conversionRate) {
      return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
    }

    const amountInNGN = amount / conversionRate

    return NextResponse.json({
      currency,
      originalAmount: amount,
      convertedToNGN: parseFloat(amountInNGN.toFixed(2)),
      usedLiveRate: true,
      conversionRate,
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
        detail: (err as Error).message,
      },
      { status: 500 }
    )
  }
}
