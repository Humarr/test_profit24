import React from "react"

interface PaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: string
  onBankTransferSelect: () => void
  onCryptoSelect: () => void
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  plan,
  amount,
  onBankTransferSelect,
  onCryptoSelect,
}: PaymentMethodModalProps) {
  if (!isOpen) return null

  const isComingSoon = true
  return (
    <div
      className="fixed inset-0 bg-brand-slate-900/80 flex justify-center items-end p-6 z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="payment-method-title"
    >
      <div
        className="bg-brand-white rounded-t-3xl w-full max-w-md p-8 shadow-2xl text-brand-purple-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="payment-method-title"
          className="text-2xl font-extrabold mb-6 tracking-wide"
        >
          Choose Payment Method
        </h2>
        <p className="mb-8 text-lg font-semibold text-brand-purple-700">
          Plan: <span className="text-brand-purple-900">{plan}</span> &mdash; Amount:{" "}
          <span className="text-brand-purple-900">${amount}</span>
        </p>

        <button
          onClick={() => {
            onBankTransferSelect()
            onClose()
          }}
          className="w-full mb-5 py-4 bg-gradient-to-r from-brand-purple-600 to-brand-purple-800 text-white rounded-2xl font-bold shadow-lg hover:from-brand-purple-700 hover:to-brand-purple-900 focus:outline-none focus:ring-4 focus:ring-brand-purple-400 transition cursor-pointer"
          type="button"
        >
          Pay via Paystack
        </button>

        <button
          onClick={() => {
            onCryptoSelect()
            onClose()
          }}
          className="w-full py-4 bg-brand-purple-100 text-brand-purple-700 rounded-2xl font-semibold shadow-sm hover:bg-brand-purple-200 focus:outline-none focus:ring-4 focus:ring-brand-purple-300 transition cursor-pointer"
          type="button"
          disabled={isComingSoon}
          title="Coming soon"
        >
          Pay via Crypto (coming soon)
        </button>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 text-center text-brand-purple-600 font-bold hover:underline focus:outline-none"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
