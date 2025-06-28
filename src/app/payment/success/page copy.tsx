"use client"
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/toast/useToast"

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true)
  const params = useSearchParams()
  const reference = params?.get("reference") || ""
  const toast = useToast()
//   const router = useRouter()

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
            window.location.href = "https://wa.me/234XXXXXXXXXX"
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
