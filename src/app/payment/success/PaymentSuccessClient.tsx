// app/payment/success/PaymentSuccessClient.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/toast/useToast"

export default function PaymentSuccessClient() {
  const [loading, setLoading] = useState(true)
  const params = useSearchParams()
  const reference = params?.get("reference") || ""
  const toast = useToast()

  useEffect(() => {
    if (!reference) {
      toast("Payment reference missing", "error", 5000)
      setLoading(false)
      return
    }

    fetch(`/api/paystack/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast("Payment confirmed! Redirecting...", "success", 5000)
          setTimeout(() => {
            window.location.href = `${process.env.NEXT_PUBLIC_WHATSAPP_URL}/?text=Hello%20I%20have%20just%20completed%20a%20payment%20for%20my%20bot%20plan%20and%20I%20need%20your%20help%20to%20get%20started.%20Please%20provide%20me%20with%20the%20details%20of%20the%20bot%20so%20I%20can%20start%20using%20it.%20Thank%20you!` || ""
          }, 1500)
        } else {
          toast(data.error || "Payment verification failed", "error", 7000)
        }
      })
      .catch(() => {
        toast("Connection failed. Try again later.", "error", 7000)
      })
      .finally(() => setLoading(false))
  }, [reference, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white p-4">
      <div className="bg-brand-purple-50 text-brand-purple-700 text-center p-8 rounded-xl shadow-lg">
        {loading ? "Verifying payment..." : "Finished! Check chat window."}
      </div>
    </div>
  )
}
