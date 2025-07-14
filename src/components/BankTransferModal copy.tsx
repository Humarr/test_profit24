/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from "react"
import { useToast } from "@/components/toast/useToast"

interface BankTransferModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: string
  onSuccess: () => void
}

export default function BankTransferModal({
  isOpen,
  onClose,
  plan,
  amount,
  onSuccess,
}: BankTransferModalProps) {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  if (!isOpen) return null

  const handleProceed = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, amount }),
      })

      const data = await res.json()
      if (!res.ok || !data.authorization_url) {
        throw new Error(data.error || "Failed to initialize payment")
      }
      
      window.location.href = data.authorization_url
      onSuccess()
    } catch (err) {
      const error = err as Error
      toast(error.message || "Error initiating payment", "error", 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-brand-purple-900 mb-4">Bank Transfer Payment</h2>
        <p className="mb-2 text-brand-slate-600 font-medium">
          Plan: <span className="text-brand-purple-800 font-semibold">{plan}</span>
        </p>
        <p className="mb-4 text-brand-slate-600 font-medium">
          Amount: <span className="text-brand-purple-800 font-semibold">₦{amount}</span>
        </p>

        <div className="bg-brand-purple-100 p-4 rounded-lg mb-6 text-sm text-brand-slate-800">
          <p className="mb-1 font-semibold">Account Name: <span className="font-normal">PROFIT24 SYSTEMS</span></p>
          <p className="mb-1 font-semibold">Account Number: <span className="font-normal">0123456789</span></p>
          <p className="mb-1 font-semibold">Bank: <span className="font-normal">GTBank</span></p>
          <p className="text-xs text-brand-slate-500 mt-2 italic">You'll be redirected to Paystack after clicking proceed</p>
        </div>

        <button
          disabled={loading}
          onClick={handleProceed}
          className={`w-full py-4 rounded-xl text-white font-bold text-center transition cursor-pointer ${
            loading
              ? "bg-brand-purple-300 cursor-not-allowed"
              : "bg-brand-purple-600 hover:bg-brand-purple-800"
          }`}
        >
          {loading ? "Redirecting..." : "Proceed to Payment"}
        </button>

        <button
          onClick={onClose}
          type="button"
          className="mt-4 w-full text-center text-brand-purple-500 font-semibold hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
