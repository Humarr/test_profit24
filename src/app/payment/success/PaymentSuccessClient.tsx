/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/toast/useToast"
import { FaSpinner } from "react-icons/fa"
import Link from "next/link"
// import { ENDPOINT_URL } from "../../../../endpoint"
import { fetchToken } from "@/lib/api/fetchToken"

export default function PaymentSuccessClient() {
  const [whatsappURL, setWhatsappURL] = useState("")
  const [loading, setLoading] = useState(true)
  // const [token, setToken] = useState("")
  const params = useSearchParams()
  const reference = params?.get("reference") || ""
  const toast = useToast()

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        toast("Payment reference missing", "error", 5000)
        setLoading(false)
        return
      }

      const token = await fetchToken()
      console.log("token: ", token)
      if (!token) {
        toast("Token missing", "error", 5000)
        setLoading(false)
        return
      }

      // setToken(token) // Optional: if you need token in state elsewhere

      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (data.success) {
          toast("Payment confirmed! Redirecting...", "success", 5000)

          const message = encodeURIComponent(
            `Hello, I just completed a payment for the "${data.plan}" bot plan.\n\n` +
              `Transaction Reference: ${data.reference}\n` +
              `Name: ${data.fullName || "Not available"}\n` +
              `Email: ${data.email}\n` +
              `Amount Paid: ${data.paidAmount} ${data.currency || "NGN"}\n\n` +
              `Please help me get started. Thank you!`
          )

          const redirectURL = `${process.env.NEXT_PUBLIC_WHATSAPP_URL}?text=${message}`
          setWhatsappURL(redirectURL)

          setTimeout(() => {
            window.location.href = redirectURL
          }, 1500)
        } else {
          toast(data.error || "Payment verification failed", "error", 7000)
        }
      } catch (error) {
        const err = error as Error
        toast(err.message || "Connection failed. Try again later.", "error", 7000)
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [reference, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white p-4">
      <div className="bg-brand-purple-50 text-brand-purple-700 text-center p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
        {loading ? (
          <>
            <FaSpinner className="animate-spin text-3xl text-brand-purple-700" />
            <p className="text-sm font-medium">Verifying your payment...</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium">
              Payment verified! If you're not redirected automatically, click below to chat with us on WhatsApp:
            </p>
            {whatsappURL && (
              <Link
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-purple-600 text-white px-4 py-2 rounded-lg hover:bg-brand-purple-700 transition-all"
              >
                Open WhatsApp
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}
