"use client";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/toast/useToast";
import { Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import Spinner from "@/components/Spinner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  active: boolean;
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const toast = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: "", content: "", active: true });

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setAnnouncements(data.announcements);
    } catch (e) {
      const error = e as Error;
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  function openAdd() {
    setEditing(null);
    setForm({ title: "", content: "", active: true });
    setShowForm(true);
  }

  function openEdit(a: Announcement) {
    setEditing(a);
    setForm({ title: a.title, content: a.content, active: a.active });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast("Deleted", "success");
      setAnnouncements((list) => list.filter((a) => a.id !== id));
    } catch (e) {
      const error = e as Error;
      toast(error.message, "error");
    }
  }

  async function handleSubmit() {
    const url = editing
      ? `/api/admin/announcements/${editing.id}`
      : "/api/admin/announcements";
    const method = editing ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submit failed");
      toast(editing ? "Updated" : "Added", "success");
      setShowForm(false);
      fetchAnnouncements();
    } catch (e) {
      const error = e as Error;
      toast(error.message, "error");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">
          Manage Announcements
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-2 rounded hover:bg-brand-purple-800 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Announcement</span>
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
            >
              <div className="flex-1">
                <h2 className="font-bold text-brand-purple-700 text-sm md:text-base">
                  {a.title}
                </h2>
                <p
                  className="text-xs text-gray-500 mt-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: a.content }}
                ></p>
                <p className="text-xs text-brand-slate-500 mt-1">
                  Created: {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(a)}
                  className={
                    a.active
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-400 hover:text-gray-600"
                  }
                >
                  {a.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => openEdit(a)}
                  className="text-brand-purple-700 hover:text-brand-purple-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!announcements.length && (
        <p className="text-center text-gray-500">No announcements found</p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-brand-purple-600">
              {editing ? "Edit Announcement" : "Add Announcement"}
            </h2>
            <input
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700 resize-none"
              placeholder="Announcement content (can use HTML)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <label className="flex items-center space-x-2 text-sm text-brand-slate-700">
              <input
                className="w-4 h-4 text-brand-purple-500"
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span>Active</span>
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 text-brand-purple-600 w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  async function toggleActive(a: Announcement) {
    try {
      const res = await fetch(`/api/admin/announcements/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !a.active }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Toggle failed");
      toast("Updated", "success");
      fetchAnnouncements();
    } catch (e) {
      const error = e as Error;
      toast(error.message, "error");
    }
  }
}
