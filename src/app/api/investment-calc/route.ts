import { NextResponse } from 'next/server'

// Static fallback rates
const STATIC_RATES: Record<string, number> = {
  NGN: 1,
  USD: 0.0011,
  EUR: 0.0010,
  GBP: 0.0009,
  BTC: 0.000000015,
}

// Load API key from environment
const EXCHANGE_API_KEY = process.env.EXCHANGE_RATE_API_KEY!
const CACHE_DURATION_MS = 60 * 60 * 1000 // 1 hour

// Caching variables
let cachedFiatRates: Record<string, number> | null = null
let fiatCacheTime = 0
let cachedBTC: number | null = null
let btcCacheTime = 0

// Fetch live fiat exchange rates from ExchangeRate-API
async function fetchFiatRates(base = 'NGN') {
  const now = Date.now()

  if (cachedFiatRates && now - fiatCacheTime < CACHE_DURATION_MS) {
    return cachedFiatRates
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${base}`
    console.log("🌍 Fetching from ExchangeRate-API:", url)
    const res = await fetch(url)
    const data = await res.json()
    console.log("fetchFiatRates: ", data)

    if (!data || data.result !== "success" || !data.conversion_rates) {
      throw new Error("Invalid response from ExchangeRate-API")
    }

    cachedFiatRates = data.conversion_rates
    fiatCacheTime = now

    return cachedFiatRates
  } catch (err) {
    console.error("❌ Error fetching fiat rates:", err)
    return cachedFiatRates // fallback to last cache
  }
}

// Fetch NGN to BTC rate via CoinGecko
async function fetchBTCtoNGN() {
  const now = Date.now()

  if (cachedBTC && now - btcCacheTime < CACHE_DURATION_MS) {
    return cachedBTC
  }

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

// Main handler
export async function POST(req: Request) {
  try {
    const { amount, months, currency } = await req.json()

    if (!amount || !months || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 40% monthly compound interest
    const rate = 0.4
    let finalAmount = amount
    for (let i = 0; i < months; i++) {
      finalAmount *= 1 + rate
    }

    let conversionRate: number | undefined

    if (currency === 'BTC') {
      conversionRate = await fetchBTCtoNGN()
    } else {
      const rates = await fetchFiatRates('NGN') // NGN is base
      conversionRate = rates?.[currency] ?? STATIC_RATES[currency]
    }

    if (!conversionRate) {
      return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
    }

    const convertedAmount = finalAmount * conversionRate

    return NextResponse.json({
      currency,
      initialAmount: amount,
      months,
      result: parseFloat(convertedAmount.toFixed(currency === 'BTC' ? 8 : 2)),
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
