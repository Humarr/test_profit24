'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useToast } from '@/components/toast/useToast'
import Spinner from '@/components/Spinner'

interface Offer {
  id: string
  title: string
  subtitle: string
  price: number
  features: string[]
  popular: boolean
}

export default function AdminOffersPage() {
  const toast = useToast()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Offer | null>(null)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    price: '',
    features: '',
    popular: false
  })

  const fetchOffers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/offers')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load offers')
      setOffers(data.offers)
    } catch (e) {
      toast((e as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchOffers() }, [fetchOffers])

  function openAdd() {
    setEditing(null)
    setForm({ title: '', subtitle: '', price: '', features: '', popular: false })
    setShowForm(true)
  }

  function openEdit(offer: Offer) {
    setEditing(offer)
    setForm({
      title: offer.title,
      subtitle: offer.subtitle,
      price: offer.price.toString(),
      features: offer.features.join('\n'),
      popular: offer.popular
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this offer?')) return
    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      toast('Offer deleted', 'success')
      fetchOffers()
    } catch (e) {
      toast((e as Error).message, 'error')
    }
  }

  async function handleSubmit() {
    const url = editing ? `/api/admin/offers/${editing.id}` : '/api/admin/offers'
    const method = editing ? 'PATCH' : 'POST'
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          subtitle: form.subtitle,
          price: parseInt(form.price, 10),
          features: form.features.split('\n').map(f => f.trim()).filter(f => f),
          popular: form.popular
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submit failed')
      toast(editing ? 'Offer updated' : 'Offer created', 'success')
      setShowForm(false)
      fetchOffers()
    } catch (e) {
      toast((e as Error).message, 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">Manage Offers</h1>
        <button onClick={openAdd} className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-1 rounded hover:bg-brand-purple-800">
          <Plus size={16}/><span>Add Offer</span>
        </button>
      </div>

      {loading ? <Spinner/> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map(o => (
            <div key={o.id} className="bg-white rounded shadow p-4 flex flex-col">
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-brand-purple-700">{o.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{o.subtitle}</p>
                <p className="text-lg font-bold text-brand-purple-800 mb-2">₦{o.price.toLocaleString()}</p>
                <ul className="text-sm text-gray-700 list-disc ml-5 mb-2">
                  {o.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                {o.popular && (
                  <span className="inline-block px-2 py-1 text-xs bg-brand-orange-500 text-white rounded-full font-semibold">Popular</span>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button onClick={() => openEdit(o)} className="text-brand-purple-700 hover:text-brand-purple-900">
                  <Edit size={16}/>
                </button>
                <button onClick={() => handleDelete(o.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-brand-purple-600">{editing ? 'Edit Offer' : 'Add Offer'}</h2>
            <input className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/>
            <input className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700" placeholder="Subtitle" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})}/>
            <input className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700" placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}/>
            <textarea className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700 h-32" placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})}/>
            <label className="flex items-center gap-2 text-brand-slate-500">
              <input  type="checkbox" checked={form.popular} onChange={e => setForm({...form, popular: e.target.checked})}/>
              <span>Mark as Popular</span>
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowForm(false)} className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 text-brand-purple-600 w-full">Cancel</button>
              <button onClick={handleSubmit} className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
