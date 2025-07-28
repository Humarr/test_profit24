/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { useToast } from "@/components/toast/useToast"
import { FaCopy } from "react-icons/fa"

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: string // in USD
  onSuccess: () => void
}

const wallets = {
  BTC: "bc1qexamplewalletaddressbtc",
  ETH: "0xExampleEthAddress",
  USDT: "TExampleUSDTTRC20",
}

export default function CryptoPaymentModal({
  isOpen,
  onClose,
  plan,
  amount,
  onSuccess,
}: CryptoPaymentModalProps) {
  const [currency, setCurrency] = useState<"BTC" | "ETH" | "USDT">("USDT")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [txHash, setTxHash] = useState("")
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (!currency || !amount) return
    const fetchRate = async () => {
      try {
        const res = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(amount), currency }),
        })
        const data = await res.json()
        if (data.convertedToNGN || data.convertedToNGN === 0) {
          setConvertedAmount(data.originalAmount / data.conversionRate)
        }
      } catch {
        toast("Failed to convert amount", "error", 5000)
      }
    }

    fetchRate()
  }, [currency, amount, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!txHash.trim()) {
      toast("Please enter your transaction hash", "error", 4000)
      return
    }

    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 2000)) // simulate
      toast(`Crypto payment submitted. We’ll verify and activate your plan.`, "success", 5000)
      onClose()
      onSuccess()
    } catch {
      toast("Something went wrong", "error", 5000)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-brand-slate-900/80 flex justify-center items-center p-6 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 relative"
      >
        <h2 className="text-2xl font-bold text-brand-purple-900 mb-4">Crypto Payment</h2>
        <p className="mb-2">Plan: <strong>{plan}</strong></p>
        <p className="mb-4">Amount: <strong>${amount} USD</strong></p>

        <label className="block font-semibold mb-2">Select Coin</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as any)}
          className="w-full mb-4 px-4 py-2 border rounded-xl text-brand-slate-700"
        >
          <option value="USDT">USDT (TRC20)</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Wallet Address</label>
          <div className="flex items-center justify-between bg-brand-slate-100 p-2 rounded-lg text-sm">
            <span className="break-all">{wallets[currency]}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(wallets[currency])
                toast("Copied to clipboard", "success", 2000)
              }}
            >
              <FaCopy />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Send exactly:</label>
          {convertedAmount === null ? (
            <p className="text-sm text-brand-slate-500 italic">Calculating...</p>
          ) : (
            <p className="font-semibold text-lg">{convertedAmount.toFixed(6)} {currency}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="txhash" className="block mb-2 font-medium">Your Transaction Hash</label>
          <input
            id="txhash"
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Paste your TX hash here"
            className="w-full px-4 py-3 mb-6 border border-brand-slate-300 rounded-xl"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 font-bold rounded-xl text-white shadow-md transition ${
              loading
                ? "bg-brand-purple-300 cursor-not-allowed"
                : "bg-brand-purple-600 hover:bg-brand-purple-800"
            }`}
          >
            {loading ? "Submitting..." : "I’ve Sent the Crypto"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-center text-brand-purple-500 font-semibold hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
