'use client'
import { useState, useEffect } from 'react';
// import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/toast/useToast';
import Spinner from '@/components/Spinner';
import { ENDPOINT_URL } from '../../../../endpoint'
interface Subscription {
  id: string;
  plan: string;
  active: boolean;
  expiresAt: string;
  user: { id: string; name: string; email: string };
}

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}/api/admin/subscriptions`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch subscriptions");
        setSubs(data.subscriptions);
      } catch (e) {
        toast((e as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchSubs();
  }, [toast]);

  // const handleDelete = async (id: string) => {
  //   if (!confirm('Delete this subscription?')) return;
  //   try {
  //     const res = await fetch(`/api/admin/subscriptions/${id}`, { method: 'DELETE' });
  //     if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
  //     setSubs(s => s.filter(sub => sub.id !== id));
  //     toast('Subscription deleted', 'success');
  //   } catch (e) {
  //     toast((e as Error).message, 'error');
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-brand-purple-600 mb-6">Manage Subscriptions</h1>
      {loading ? <Spinner/> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-purple-600">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Plan</th>
                <th className="p-2">Active</th>
                <th className="p-2">Expires</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {subs.map(sub => (
                <tr key={sub.id} className="border-t text-brand-slate-400">
                  <td className="p-2">
                    <div className="font-bold">{sub.user.name}</div>
                    <div className="text-sm">{sub.user.email}</div>
                  </td>
                  <td className="p-2">{sub.plan}</td>
                  <td className="p-2">{sub.active ? 'Yes' : 'No'}</td>
                  <td className="p-2">{new Date(sub.expiresAt).toLocaleDateString()}</td>
                  {/* <td className="p-2 flex gap-2">
                    <button className="text-brand-purple-600 hover:text-brand-purple-900 cursor-pointer">
                      <Edit size={16}/>
                    </button>
                    <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-800 cursor-pointer">
                      <Trash2 size={16}/>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {subs.length === 0 && <p className="mt-4 text-gray-600">No subscriptions found.</p>}
        </div>
      )}
    </div>
  );
}
