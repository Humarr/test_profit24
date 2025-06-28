'use client'
import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/components/toast/useToast'
import { Trash2, Edit, Plus } from 'lucide-react'
import Image from 'next/image'
import Spinner from '@/components/Spinner'

interface Bot {
  id: string
  name: string
  description: string
  tier: string
  minAmount: string
  performance: string
  fee: string
  imageUrl?: string
  bgColor: string
  stats: Record<string, any>
}

export default function AdminBotsPage() {
  const toast = useToast()
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Bot | null>(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    tier: '',
    minAmount: '',
    performance: '',
    fee: '',
    imageUrl: '',
    bgColor: '',
    stats: '{}',
  })

  const fetchBots = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bots')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setBots(data.bots)
    } catch (e) {
      toast((e as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchBots() }, [fetchBots])

  function openAdd() {
    setEditing(null)
    setForm({ name: '', description: '', tier: '', minAmount: '', performance: '', fee: '', imageUrl: '', bgColor: '', stats: '{}' })
    setShowForm(true)
  }

  function openEdit(bot: Bot) {
    setEditing(bot)
    setForm({
      name: bot.name,
      description: bot.description,
      tier: bot.tier,
      minAmount: bot.minAmount,
      performance: bot.performance,
      fee: bot.fee,
      imageUrl: bot.imageUrl || '',
      bgColor: bot.bgColor,
      stats: JSON.stringify(bot.stats),
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this bot?')) return
    try {
      const res = await fetch(`/api/admin/bots/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      toast('Bot deleted', 'success')
      setBots(bots => bots.filter(b => b.id !== id))
    } catch (e) {
      toast((e as Error).message, 'error')
    }
  }

  async function handleSubmit() {
    const url = editing ? `/api/admin/bots/${editing.id}` : '/api/admin/bots'
    const method = editing ? 'PATCH' : 'POST'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submit failed')
      toast(editing ? 'Bot updated' : 'Bot created', 'success')
      setShowForm(false)
      fetchBots()
    } catch (e) {
      toast((e as Error).message, 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 scrollbar-hide">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">Manage Bots</h1>
        <button onClick={openAdd} className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-1 rounded hover:bg-brand-purple-800">
          <Plus size={16}/><span>Add Bot</span>
        </button>
      </div>

      {loading ? <Spinner/> :
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map(b => (
          <div key={b.id} className="bg-white rounded shadow overflow-hidden flex flex-col">
            <div className={`h-40 w-full overflow-hidden ${b.bgColor}`}>
              {b.imageUrl ? (
                <Image src={b.imageUrl} alt={b.name} width={500} height={500} className="w-full h-full object-cover"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-slate-500 font-bold text-xl">{b.name[0]}</div>
              )}
            </div>
            <div className="p-2 flex-1 flex flex-col">
              <h2 className="font-semibold text-sm md:text-base line-clamp-2 text-brand-slate-700">{b.name}</h2>
              <p className="text-xs text-gray-600 mt-1">Tier: {b.tier}</p>
              <div className="mt-auto flex justify-end space-x-2">
                <button onClick={() => openEdit(b)} className="text-brand-purple-700 hover:text-brand-purple-900">
                  <Edit size={16}/>
                </button>
                <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 scrollbar-hide">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold text-brand-purple-600">{editing ? 'Edit Bot' : 'Add Bot'}</h2>
            {['name','description','tier','minAmount','performance','fee','imageUrl','bgColor','stats'].map((field) => (
              <input key={field} placeholder={field} value={form[field as keyof typeof form]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              />
            ))}
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowForm(false)} className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 text-brand-purple-600 w-full">Cancel</button>
              <button onClick={handleSubmit} className="w-full py-3 bg-brand-purple-500 text-white rounded-lg hover:bg-brand-purple-600 transition">{editing ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
