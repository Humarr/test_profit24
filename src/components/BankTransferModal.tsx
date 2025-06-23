'use client'

import { useState, useRef } from 'react'
import { useToast } from '@/components/toast/useToast'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

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
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const addToast = useToast()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

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
      onSuccess()
      router.refresh()
    } catch (error) {
      addToast((error as Error).message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleFileClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-brand-slate-900/70 transition-opacity duration-300',
        {
          'opacity-100 pointer-events-auto': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
        }
      )}
      onClick={onClose} // clicking outside closes modal
    >
      <div
        className="bg-brand-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-brand-purple-900 relative"
        onClick={(e) => e.stopPropagation()} // prevent modal close on inner click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-wide">Pay via Bank Transfer</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-brand-purple-500 hover:text-red-500 transition-colors duration-200 font-semibold"
          >
            ×
          </button>
        </div>

        {/* Info */}
        <div className="space-y-2 text-brand-purple-700 mb-6 text-lg font-semibold">
          <p>
            <span className="text-brand-purple-900 font-bold">Plan:</span> {plan}
          </p>
          <p>
            <span className="text-brand-purple-900 font-bold">Amount:</span> ₦{amount}
          </p>
          <p>
            <span className="text-brand-purple-900 font-bold">Bank:</span> Wema Bank
          </p>
          <p>
            <span className="text-brand-purple-900 font-bold">Account Name:</span> TradeBot Solutions
          </p>
          <p>
            <span className="text-brand-purple-900 font-bold">Account Number:</span> 0123456789
          </p>
        </div>

        {/* Custom File Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-brand-purple-700 mb-3">
            Upload Payment Screenshot:
          </label>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileClick}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-orange-400 to-brand-orange-600 text-white font-bold shadow-lg hover:from-brand-orange-500 hover:to-brand-orange-700 focus:outline-none focus:ring-4 focus:ring-brand-orange-300 transition cursor-pointer"
          >
            {file ? `Change File (${file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name})` : 'Select File'}
          </button>
          {file && (
            <p className="mt-2 text-brand-purple-800 italic text-sm truncate" title={file.name}>
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className={clsx(
            'w-full py-3 rounded-3xl font-extrabold text-white shadow-lg transition-colors duration-200 bg-gradient-to-r from-brand-purple-600 to-brand-purple-800 hover:from-brand-purple-700 hover:to-brand-purple-900 focus:outline-none focus:ring-4 focus:ring-brand-purple-400 cursor-pointer',
            uploading
              ? 'bg-brand-purple-400 cursor-not-allowed'
              : 'bg-brand-purple-700 hover:bg-brand-purple-800 focus:outline-none focus:ring-4 focus:ring-brand-purple-400'
          )}
        >
          {uploading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </div>
    </div>
  )
}
