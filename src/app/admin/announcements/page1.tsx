"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/admin/announcements");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load announcements");
        setAnnouncements(data.announcements);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-brand-slate-800">Announcements</h1>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 bg-brand-purple-500 hover:bg-brand-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          New Announcement
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-brand-purple-500" size={32} />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center font-medium">{error}</div>
      ) : announcements.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No announcements found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Created At</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-gray-800">{a.title}</td>
                  <td className="px-4 py-3">
                    {a.active ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex justify-end gap-2">
                    <Link
                      href={`/admin/announcements/${a.id}`}
                      className="text-brand-purple-500 hover:underline text-sm font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => alert("TODO: implement delete")}
                      className="text-red-500 hover:underline text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
