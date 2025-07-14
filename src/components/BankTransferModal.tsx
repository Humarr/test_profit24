/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from "react"
import { useToast } from "@/components/toast/useToast"
import PaystackPop from '@paystack/inline-js';
import { redirect } from "next/navigation";


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
        body: JSON.stringify({ plan, amount, currency: "USD" }),
      })

      const data = await res.json()
      if (!res.ok || !data.reference || !data.email) {
        throw new Error(data.error || "Failed to initialize payment")
      }

      const paystack = new PaystackPop()

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        reference: data.reference,
        email: data.email,
        amount: parseInt(amount, 10) * 100,
        currency: "USD",
        metadata: { custom_fields: [{ display_name: "Plan", variable_name: "plan", value: plan }], },
        onSuccess: (trx: any) => {
          toast(`✅ Payment successful: ${trx.reference}`, "success", 5000)
          onSuccess()
        },
        onCancel: () => {
          toast("❌ Payment was cancelled", "error", 4000)
        },
      })
    } catch (err) {
      const error = err as Error
      toast(error.message || "Error initiating payment", "error", 5000)
      if (error.message === "Unauthorized") return redirect("/auth/login")
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
        <h2 className="text-2xl font-bold text-brand-purple-900 mb-4">Pay with Card</h2>
        <p className="mb-2 text-brand-slate-900">Plan: <strong>{plan}</strong></p>
        <p className="mb-4 text-brand-slate-900">Amount: <strong>${amount}</strong></p>

        <button
          disabled={loading}
          onClick={handleProceed}
          className={`w-full py-4 rounded-xl text-white font-bold cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-purple-600 hover:bg-brand-purple-800"
          }`}
        >
          {loading ? "Loading..." : "Proceed to Payment"}
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
