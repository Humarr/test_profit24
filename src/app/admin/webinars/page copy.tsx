'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useToast } from '@/components/toast/useToast'
import { Trash2, Edit, Plus } from 'lucide-react'
import Image from 'next/image'

interface Webinar {
  id: string
  title: string
  videoUrl: string
  thumbnail: string
  duration: string
}

export default function AdminWebinarsPage() {
  const toast = useToast()
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [loading, setLoading] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Webinar | null>(null)
  const [form, setForm] = useState({ title: '', videoUrl: '', duration: '', thumbnail: '' })

 
  const fetchWebinars = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/webinars')
      const data = await res.json()
      if (res.ok) setWebinars(data.webinars)
      else throw new Error(data.error || 'Failed to load')
    } catch (err) {
      const error = err as Error
      toast(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchWebinars()
  }, [fetchWebinars])


  const openAdd = () => {
    setEditing(null)
    setForm({ title: '', videoUrl: '', duration: '', thumbnail: '' })
    setShowForm(true)
  }

  const openEdit = (w: Webinar) => {
    setEditing(w)
    setForm({ title: w.title, videoUrl: w.videoUrl, duration: w.duration, thumbnail: w.thumbnail })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this webinar?')) return
    try {
      const res = await fetch(`/api/admin/webinars/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete')
      toast('Deleted', 'success')
      setWebinars((ws) => ws.filter((w) => w.id !== id))
    } catch (err) {
      const error = err as Error
      toast(error.message, 'error')
    }
  }

  const handleSubmit = async () => {
    const url = editing ? `/api/admin/webinars/${editing.id}` : '/api/admin/webinars'
    const method = editing ? 'PATCH' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      toast(editing ? 'Updated' : 'Added', 'success')
      setShowForm(false)
      fetchWebinars()
    } catch (err) {
      const error = err as Error
      toast(error.message, 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-purple-600">Manage Webinars</h1>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-brand-purple-600 text-white rounded hover:bg-brand-purple-700"
        >
          <Plus size={16} />
          <span>Add Webinar</span>
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((w) => (
            <div key={w.id} className="bg-white rounded shadow p-4 flex flex-col">
              <Image 
              src={w.thumbnail} 
              alt={w.title} 
              width={500}
              height={500}
              className="h-40 w-full object-cover rounded" />
              <h2 className="font-semibold mt-3">{w.title}</h2>
              <p className="text-sm text-gray-600">{w.duration}</p>
              <div className="mt-auto flex justify-end space-x-2">
                <button onClick={() => openEdit(w)} title="Edit" className="text-brand-purple-600 hover:text-brand-purple-900">
                  <Edit />
                </button>
                <button onClick={() => handleDelete(w.id)} title="Delete" className="text-red-500 hover:text-red-700">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Webinar' : 'Add Webinar'}</h2>
            <div className="space-y-3">
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="YouTube URL"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Thumbnail URL"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Duration (e.g. 12:45)"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-brand-purple-600 text-white hover:bg-brand-purple-700"
              >
                {editing ? 'Save Changes' : 'Add Webinar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
