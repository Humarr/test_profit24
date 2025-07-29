"use client";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/toast/useToast";
import { Edit } from "lucide-react";
import Spinner from "@/components/Spinner";
import { ENDPOINT_URL } from '../../../../endpoint'
interface Transaction {
  id: string;
  reference: string;
  amount: number;
  status: string;
  plan: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
}

export default function AdminTransactionsPage() {
  const toast = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [status, setStatus] = useState("");

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ENDPOINT_URL}/api/admin/transactions`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setTransactions(data.transactions);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const openEdit = (t: Transaction) => {
    setEditing(t);
    setStatus(t.status);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${ENDPOINT_URL}/api/admin/transactions/${editing?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      toast("Transaction updated", "success");
      setEditing(null);
      fetchTransactions();
    } catch (e) {
      toast((e as Error).message, "error");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">
        Manage Transactions
      </h1>

      {loading ? (
        <Spinner/>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop / Tablet Table View */}
          <table className="min-w-full bg-white rounded shadow hidden sm:table">
            <thead className="bg-brand-purple-700 text-white">
              <tr>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  User
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  Reference
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  Plan
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  Amount
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  Status
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-semibold">
                  Date
                </th>
                <th className="p-3 text-right text-xs md:text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t text-brand-slate-700">
                  <td className="p-3">
                    {t.user.name} <br />
                    <span className="text-xs text-brand-slate-400">
                      {t.user.email}
                    </span>
                  </td>
                  <td className="p-3">{t.reference}</td>
                  <td className="p-3">{t.plan}</td>
                  <td className="p-3">₦{t.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        t.status === "success"
                          ? "bg-green-100 text-green-800"
                          : t.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => openEdit(t)}
                      className="text-brand-purple-700 hover:text-brand-purple-900"
                      aria-label={`Edit transaction ${t.reference}`}
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="grid gap-4 mt-4 sm:hidden">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded shadow p-4 space-y-2"
                role="group"
                aria-label={`Transaction ${t.reference}`}
              >
                <div className="text-sm font-semibold text-brand-slate-700">
                  {t.user.name}{" "}
                  <span className="block text-xs text-brand-slate-400">
                    {t.user.email}
                  </span>
                </div>
                <div className="text-xs text-brand-slate-700">
                  <strong className="text-brand-slate-700">Reference:</strong> {t.reference}
                </div>
                <div className="text-xs text-brand-slate-700">
                  <strong className="text-brand-slate-700">Plan:</strong> {t.plan}
                </div>
                <div className="text-xs text-brand-slate-700">
                  <strong className="text-brand-slate-700">Amount:</strong> ₦{t.amount.toLocaleString()}
                </div>
                <div className="text-xs text-brand-slate-700">
                  <strong className="text-brand-slate-700">Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      t.status === "success"
                        ? "text-green-700"
                        : t.status === "failed"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="text-xs text-brand-slate-700">
                  <strong className="text-brand-slate-700">Date:</strong> {new Date(t.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={() => openEdit(t)}
                  className="mt-2 w-full text-center text-brand-purple-700 hover:text-brand-purple-900 flex justify-center"
                  aria-label={`Edit transaction ${t.reference}`}
                >
                  <Edit size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-brand-purple-600">
              Edit Transaction Status
            </h2>
            <select
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 text-brand-slate-700"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="initialized">initialized</option>
              <option value="success">success</option>
              <option value="failed">failed</option>
            </select>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditing(null)}
                className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 font-sans text-brand-purple-600 cursor-pointer w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
