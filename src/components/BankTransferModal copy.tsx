// components/BankTransferModal.tsx
'use client'

import { useState } from 'react'
import { useToast } from '@/components/toast/useToast'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface BankTransferModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: string
}

export default function BankTransferModal({ isOpen, onClose, plan, amount }: BankTransferModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const addToast = useToast()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!file) {
      addToast('Please upload your payment evidence', 'error')
      return
    }

    const formData = new FormData()
    formData.append('evidence', file)
    formData.append('plan', plan)
    formData.append('amount', amount)

    try {
      setUploading(true)

      const res = await fetch('/api/user/bank-payment', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      addToast('Payment submitted successfully. Awaiting verification.', 'success')
      onClose()
      router.refresh()
    } catch (error) {
      const err = error as Error
      addToast(err.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300',
        { 'opacity-100 pointer-events-auto': isOpen, 'opacity-0 pointer-events-none': !isOpen }
      )}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-brand-slate-800">Pay via Bank Transfer</h2>
          <button onClick={onClose} className="text-sm text-brand-slate-400 hover:text-red-500">
            Close
          </button>
        </div>

        <div className="space-y-2 text-sm text-brand-slate-600">
          <p><strong>Plan:</strong> {plan}</p>
          <p><strong>Amount:</strong> ₦{amount}</p>
          <p><strong>Bank:</strong> Wema Bank</p>
          <p><strong>Account Name:</strong> TradeBot Solutions</p>
          <p><strong>Account Number:</strong> 0123456789</p>
        </div>

        <label className="block text-sm mt-4">
          Upload Payment Screenshot:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 text-brand-slate-600"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-brand-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-brand-purple-700 disabled:opacity-50"
        >
          {uploading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </div>
    </div>
  )
}
