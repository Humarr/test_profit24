'use client'
import { useEffect, useState } from "react"
// import CurrencyDropdown from "./CurrencyDropdown"

export default function InvestmentCalculator() {
    console.log("rendering InvestmentCalculator component")
  const [investment, setInvestment] = useState(500)
  const [months, setMonths] = useState(1)
  const currency = "USD"
  // const [currency, setCurrency] = useState("USD")
  // const [currency, setCurrency] = useState("NGN")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const monthOptions = [1, 2, 3, 4, 5, 6]
  // const monthOptions = [1, 3, 6, 12, 24, 36]

  const formatValue = (value: number) => value.toLocaleString()
  // const formatValue = (value: number) =>
  //   new Intl.NumberFormat("en-US", {
  //     style: currency === "BTC" ? "decimal" : "currency",
  //     currency: currency === "BTC" ? "USD" : currency,
  //     minimumFractionDigits: currency === "BTC" ? 8 : 2,
  //   }).format(value)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("/api/investment-calc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: investment, months, currency }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Something went wrong")

        setResult(data.result)
      } catch (err) {
        const error = err as Error
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [investment, months, currency])

  return (
    <section className="w-full px-6 py-16 bg-brand-purple-700 scrollbar-hide" id="calculator">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 my-2">
          <h3 className="text-lg font-medium text-brand-purple-100">Initial investment</h3>
          <div className="text-2xl font-bold text-brand-purple-100">${formatValue(investment)}</div>
        </div>

        {/* Card */}
        <div className="bg-brand-purple-400/20 backdrop-blur-sm rounded-xl p-6 mb-8 my-2">
          <div className="mb-8">
            <input
              type="range"
              min="500"
              max="50000"
              step="100"
              value={investment}
              onChange={(e) => setInvestment(parseInt(e.target.value))}
              className="w-full bg-white rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-brand-purple-100 text-sm">
              <span>{currency} 500</span>
              <span>{currency} 50,000</span>
            </div>
          </div>

          <h4 className="text-white mb-4">Months to compound</h4>
          <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-6 scrollbar-hide my-2">
            {monthOptions.map((opt) => {
              const active = months === opt
              return (
                <button
                  key={opt}
                  onClick={() => setMonths(opt)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-brand-purple-600 scale-105"
                      : "bg-brand-purple-400 text-white hover:scale-105"
                  }`}
                >
                  {opt} {opt === 1 ? "month" : "months"}
                </button>
              )
            })}
          </div>
        </div>

        {/* Currency Selector */}
        {/* <div className="flex justify-end mb-6 my-2">
          <CurrencyDropdown selected={currency} onChange={setCurrency} />
        </div> */}

        {/* Result */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Total amount <span className="hidden sm:inline">(capital + ROI)</span></h3>
          <div className="text-2xl font-bold text-white">
            {loading ? "Calculating..." : result !== null ? `$
             ${formatValue(result)}` : "--"}
          </div>
        </div>

        {error && <p className="text-red-300 mt-4">{error}</p>}
      </div>
    </section>
  )
}
