import React, { useState } from "react"
import { useToast } from "@/components/toast/useToast"

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: string
  onSuccess: () => void // NEW callback
}

export default function CryptoPaymentModal({
  isOpen,
  onClose,
  plan,
  amount,
  onSuccess,
}: CryptoPaymentModalProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletAddress.trim()) {
      toast("Please enter your wallet address", "error", 4000)
      return
    }

    setLoading(true)
    try {
      // Simulate API call for crypto payment
      await new Promise((r) => setTimeout(r, 2000))

      toast(`Crypto payment initiated for ${plan} (₦${amount})`, "success", 5000)
      onClose()
      onSuccess()
      setWalletAddress("")
    } catch {
      toast("Failed to initiate crypto payment", "error", 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-brand-slate-900/80 flex justify-center items-center p-6 z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="crypto-payment-title"
    >
      <div
        className="bg-brand-white rounded-3xl w-full max-w-md p-8 shadow-2xl text-brand-purple-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="crypto-payment-title"
          className="text-2xl font-extrabold mb-6 tracking-wide"
        >
          Pay via Crypto
        </h2>
        <p className="mb-8 text-lg font-semibold text-brand-purple-700">
          Plan: <span className="text-brand-purple-900">{plan}</span> &mdash; Amount:{" "}
          <span className="text-brand-purple-900">₦{amount}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="wallet"
            className="block mb-2 font-semibold text-brand-purple-700"
          >
            Wallet Address
          </label>
          <input
            id="wallet"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your crypto wallet address"
            className="w-full px-4 py-3 mb-6 border border-brand-slate-300 rounded-2xl text-brand-purple-900 placeholder:text-brand-purple-400 focus:outline-none focus:ring-4 focus:ring-brand-purple-400 focus:border-transparent transition"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 font-bold rounded-2xl text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-purple-500 transition ${
              loading
                ? "bg-brand-purple-300 cursor-not-allowed"
                : "bg-gradient-to-r from-brand-purple-600 to-brand-purple-800 hover:from-brand-purple-700 hover:to-brand-purple-900"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 text-center text-brand-purple-600 font-bold hover:underline focus:outline-none cursor-pointer"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
