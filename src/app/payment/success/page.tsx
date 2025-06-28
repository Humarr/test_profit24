// app/payment/success/page.tsx
import { Suspense } from "react"
import PaymentSuccessClient from "./PaymentSuccessClient"
import Spinner from "@/components/Spinner"

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
      <Spinner />
    </div>
  }>
      <PaymentSuccessClient />
    </Suspense>
  )
}
