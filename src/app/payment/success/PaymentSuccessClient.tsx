/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/toast/useToast"
import { FaSpinner } from "react-icons/fa" // Spinner icon
import Link from "next/link"

export default function PaymentSuccessClient() {
  const [whatsappURL, setWhatsappURL] = useState("")
  const [loading, setLoading] = useState(true)
  const params = useSearchParams()
  const reference = params?.get("reference") || ""
  // const plan = params?.get("plan") || ""
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
      })
      .catch(() => {
        toast("Connection failed. Try again later.", "error", 7000)
      })
      .finally(() => setLoading(false))
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

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-brand-white p-4">
  //     <div className="bg-brand-purple-50 text-brand-purple-700 text-center p-8 rounded-xl shadow-lg flex flex-col items-center gap-3">
  //       {loading ? (
  //         <>
  //           <FaSpinner className="animate-spin text-3xl text-brand-purple-700" />
  //           <p className="text-sm font-medium">Verifying your payment...</p>
  //         </>
  //       ) : (
  //         <p className="text-sm font-medium">Finished! Check your WhatsApp.</p>
  //       )}
  //     </div>
  //   </div>
  // )
}
