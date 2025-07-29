'use client'
import { useEffect, useState } from 'react';
// import { ENDPOINT_URL } from "../../endpoint"
interface Announcement {
  id: string;
  title: string;
  content: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`/api/dashboard/announcements`, {
          method: 'GET',
          // cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        });
        const data = await res.json();
        setAnnouncements(data.announcements);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return null;

  if (announcements.length === 0) return null;

  return (
    <div className="mb-6 bg-brand-purple-50 border-l-4 border-brand-purple-500 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold text-brand-purple-700 mb-2">Announcements</h2>
      <ul className="space-y-2">
        {announcements.map((ann) => (
          <li key={ann.id} className="text-brand-slate-700">
            <h3 className="font-semibold text-brand-purple-600">{ann.title}</h3>
            <p className="text-sm">{ann.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
