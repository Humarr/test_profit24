import { NextResponse } from "next/server"

const STATIC_RATES: Record<string, number> = {
  NGN: 1,
  USD: 0.0011,
  EUR: 0.0010,
  GBP: 0.0009,
  BTC: 0.000000015,
}

// Cache variables
let cachedRates: Record<string, number> | null = null
let lastFetchTimestamp = 0
const CACHE_DURATION_MS = 60 * 60 * 1000 // 1 hour

async function fetchExchangeRates(base = "NGN") {
  const now = Date.now()
  if (cachedRates && now - lastFetchTimestamp < CACHE_DURATION_MS) {
    return cachedRates
  }

  const API_KEY = process.env.EXCHANGE_RATE_API_KEY!

  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${base}&access_key=${API_KEY}`, {
      headers: {
        "Content-Type": "application/json",
        "access_key": API_KEY
      },
    })
    if (!res.ok) throw new Error("Failed to fetch exchange rates")

    const data = await res.json()
    cachedRates = data.rates
    lastFetchTimestamp = now
    console.log("fetchExchangeRates: ", data, "cachedRates: ", cachedRates, "lastFetchTimestamp: ", lastFetchTimestamp)
    return cachedRates
  } catch (err) {
     const error = err as Error
     console.log("Error in investment calc: ", error)
    return cachedRates // Return cached if fetch fails, even if stale
  }
}

export async function POST(req: Request) {
  try {
    const { amount, months, currency } = await req.json()

    if (!amount || !months || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Manual 40% monthly compounding
    const rate = 0.4
    let finalAmount = amount
    for (let i = 0; i < months; i++) {
      finalAmount *= 1 + rate
    }

    // Get real-time rates with caching
    const liveRates = await fetchExchangeRates("NGN")

    // Use live rate if available, else fallback to static
    let conversionRate = liveRates?.[currency] ?? STATIC_RATES[currency]

    // Special case for BTC (keep static for now)
    if (currency === "BTC") {
      conversionRate = STATIC_RATES.BTC
    }

    if (!conversionRate) {
      return NextResponse.json(
        { error: "Unsupported currency" },
        { status: 400 }
      )
    }

    const convertedAmount = finalAmount * conversionRate

    return NextResponse.json({
      currency,
      initialAmount: amount,
      months,
      result: parseFloat(convertedAmount.toFixed(currency === "BTC" ? 8 : 2)),
      usedLiveRate: !!liveRates,
      conversionRate,
      cachedAt: new Date(lastFetchTimestamp).toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", detail: err },
      { status: 500 }
    )
  }
}
