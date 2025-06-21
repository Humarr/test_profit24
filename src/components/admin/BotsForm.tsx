'use client'

import { useState, ChangeEvent } from 'react'
import { useToast } from '@/components/toast/useToast'

export default function CreateBotForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    tier: 'Standard',
    minAmount: '',
    performance: '',
    fee: '',
    imageUrl: '',
    bgColor: 'bg-white',
  })

  const addToast = useToast()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bots', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      addToast('Bot created successfully', 'success')
    } catch (err) {
        const error = err as Error
      addToast(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg space-y-4">
      <input name="name" placeholder="Name" onChange={(e) => handleChange(e)} className="input" />
      <input name="description" placeholder="Description" onChange={(e) => handleChange(e)} className="input" />
      <input name="tier" placeholder="Tier" onChange={(e) => handleChange(e)} className="input" />
      <input name="minAmount" placeholder="Min Amount" onChange={(e) => handleChange(e)} className="input" />
      <input name="performance" placeholder="Performance" onChange={(e) => handleChange(e)} className="input" />
      <input name="fee" placeholder="Fee" onChange={(e) => handleChange(e)} className="input" />
      <input name="imageUrl" placeholder="Image URL" onChange={(e) => handleChange(e)} className="input" />
      <input name="bgColor" placeholder="bg-white / bg-brand-purple-50" onChange={(e) => handleChange(e)} className="input" />

      <button onClick={handleSubmit} disabled={loading} className="btn btn-primary">
        {loading ? 'Creating...' : 'Create Bot'}
      </button>
    </div>
  )
}
