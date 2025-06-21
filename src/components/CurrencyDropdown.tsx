'use client'
import { useState } from "react"

interface Props {
  selected: string
  onChange: (currency: string) => void
}

const currencies = [
  { label: "Naira (₦)", value: "NGN" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "BTC", value: "BTC" },
]

export default function CurrencyDropdown({ selected, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedLabel = currencies.find((c) => c.value === selected)?.label

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-between items-center w-full rounded-md border border-brand-cream-300 bg-white px-4 py-2 text-sm font-medium text-brand-slate-700 shadow-sm hover:bg-brand-purple-50 focus:outline-none"
      >
        {selectedLabel}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {currencies.map((currency) => (
              <button
                key={currency.value}
                onClick={() => {
                  onChange(currency.value)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-purple-50 text-brand-slate-700 font-medium font-sans ${
                  currency.value === selected ? "font-bold text-brand-purple-600" : ""
                }`}
              >
                {currency.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
