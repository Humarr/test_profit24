'use client'
import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { useToast } from '@/components/toast/useToast'
import { Trash2, Edit, Plus } from 'lucide-react'
import Image from 'next/image'
// import { ENDPOINT_URL } from '../../../../endpoint'
interface Webinar { id: string; title: string; videoUrl: string; thumbnail: string; duration: string }

export default function AdminWebinarsPage() {
  const toast = useToast()
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Webinar | null>(null)
  const [form, setForm] = useState({ title: '', videoUrl: '', thumbnail: '', duration: '' })

  
  const fetchWebinars = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/webinars`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setWebinars(data.webinars)
    } catch (e) {
      const error = e as Error
      toast(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setWebinars, toast])
  
  useEffect(() => { fetchWebinars() }, [fetchWebinars])

  function openAdd() {
    setEditing(null)
    setForm({ title: '', videoUrl: '', thumbnail: '', duration: '' })
    setShowForm(true)
  }

  function openEdit(w: Webinar) {
    setEditing(w)
    setForm({ title: w.title, videoUrl: w.videoUrl, thumbnail: w.thumbnail, duration: w.duration })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this webinar?')) return
    try {
      const res = await fetch(`/api/admin/webinars/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      toast('Deleted', 'success')
      setWebinars(ws => ws.filter(w => w.id !== id))
    } catch (e) {
      const error = e as Error
      toast(error.message, 'error') }
  }

  async function handleSubmit() {
    const url = editing ? `/api/admin/webinars/${editing.id}` : `/api/admin/webinars`
    const method = editing ? 'PATCH' : 'POST'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submit failed')
      toast(editing ? 'Updated' : 'Added', 'success')
      setShowForm(false)
      fetchWebinars()
    } catch (e) {
      const error = e as Error
       toast(error.message, 'error') }
  }



  const [uploadingThumb, setUploadingThumb] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)


  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
  
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    formData.append('folder', 'webinars')
  
    setUploadingThumb(true)
    setUploadProgress(0)
  
    try {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`)
  
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total)
          setUploadProgress(percent)
        }
      })
  
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        if (xhr.status !== 200 || !res.secure_url) {
          console.log(res)
          throw new Error('Upload failed.')
        }
        setForm(prev => ({ ...prev, thumbnail: res.secure_url }))
        setUploadingThumb(false)
        toast('Thumbnail uploaded!', 'success')
      }
  
      xhr.onerror = () => {
        setUploadingThumb(false)
        toast('Upload failed.', 'error')
      }
  
      xhr.send(formData)
    } catch (error) {
      const err = error as Error
      setUploadingThumb(false)
      toast(err.message || 'Upload error', 'error')
    }
  }
  




  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">Manage Webinars</h1>
        <button onClick={openAdd} className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-1 rounded hover:bg-brand-purple-800">
          <Plus size={16}/><span>Add Webinar</span>
        </button>
      </div>

      {loading ? <p>Loading...</p> :
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {webinars.map(w => (
          <div key={w.id} className="bg-brand-purple-50 rounded shadow overflow-hidden flex flex-col">
            <div className="h-40 w-full overflow-hidden bg-gray-100">
              <Image 
              src={w.thumbnail} 
              alt={w.title} 
              width={500}
               height={500}
                className="w-full h-full object-cover"/>
            </div>
            <div className="p-2 flex-1 flex flex-col">
              <h2 className="font-semibold text-sm md:text-base line-clamp-2 text-brand-slate-700">{w.title}</h2>
              <p className="text-xs text-brand-slate-600 mt-1">{w.duration}</p>
              <div className="mt-auto flex justify-end space-x-2">
                <button onClick={() => openEdit(w)} className="text-brand-purple-700 hover:text-brand-purple-900 cursor-pointer">
                  <Edit size={16}/>
                </button>
                <button onClick={() => handleDelete(w.id)} className="text-red-600 hover:text-red-800 cursor-pointer">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {showForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
      <h2 className="text-lg font-semibold text-brand-purple-600">{editing ? 'Edit Webinar' : 'Add Webinar'}</h2>

      <input
        className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
        placeholder="YouTube URL"
        value={form.videoUrl}
        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
      />

      {/* THUMBNAIL UPLOAD SECTION */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-brand-slate-600">Thumbnail</label>

        {uploadingThumb ? (
          <div className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-brand-purple-200 bg-brand-slate-50 rounded-lg">
            <svg className="animate-spin h-6 w-6 text-brand-purple-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm text-brand-slate-500">{uploadProgress}%</p>
          </div>
        ) : form.thumbnail ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-brand-cream-300 bg-brand-slate-100">
            <Image
              src={form.thumbnail}
              alt="Thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"

            />
            <button
              onClick={() => setForm({ ...form, thumbnail: '' })}
              className="absolute top-2 right-2 bg-white/70 text-brand-purple-700 hover:text-red-500 px-2 py-1 rounded text-xs"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="upload-thumb"
            className="w-full h-48 flex items-center justify-center text-center border-2 border-dashed border-brand-purple-300 bg-brand-cream-100 text-brand-purple-600 cursor-pointer rounded-lg hover:bg-brand-purple-50"
          >
            Click to upload thumbnail
            <input
              id="upload-thumb"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </label>
        )}
      </div>

      <input
        className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
        placeholder="Duration (12:45)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setShowForm(false)}
          className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 font-sans text-brand-purple-600 cursor-pointer w-full"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans cursor-pointer"
          disabled={uploadingThumb}
        >
          {editing ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}
