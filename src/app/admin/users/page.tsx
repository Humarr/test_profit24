// app/admin/users/page.tsx

"use client";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/toast/useToast";
import { Edit, Trash2, Plus } from "lucide-react";
import Spinner from "@/components/Spinner";
// import { ENDPOINT_URL } from '../../../../endpoint'
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  subscriptions: Subscription[];
}

interface Subscription {
  id: string;
  plan: string;
  active: boolean;
  expiresAt: string;
}

export default function AdminUsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    subscription: { plan: "", active: false, expiresAt: "" },
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function openAdd() {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "user",
      subscription: { plan: "", active: false, expiresAt: "" },
    });
    setShowForm(true);
  }

  function openEdit(user: User) {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      subscription: user.subscriptions[0]
        ? {
            plan: user.subscriptions[0].plan,
            active: user.subscriptions[0].active,
            expiresAt: user.subscriptions[0].expiresAt.split("T")[0],
          }
        : { plan: "", active: false, expiresAt: "" },
    });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast("User deleted", "success");
      setUsers((u) => u.filter((user) => user.id !== id));
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  async function handleSubmit() {
    const url = editing ? `/api/admin/users/${editing.id}` : `/api/admin/users`;
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
      fetchUsers();
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-600">
          Manage Users
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-1 rounded hover:bg-brand-purple-800"
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-1 text-brand-purple-600">
                  {u.name}
                </h2>
                <p className="text-sm text-gray-700">{u.email}</p>
                <p className="text-sm text-gray-500">{u.phone || "No phone"}</p>
                <p className="text-sm mt-1 text-brand-purple-600">
                  <span className="font-medium">Role:</span> {u.role}
                </p>
                <p className="text-sm text-gray-600">
                  Joined: {new Date(u.createdAt).toLocaleDateString()}
                </p>
                {u.subscriptions.length > 0 && (
                  <div className="mt-2 p-2 border rounded bg-brand-cream-50">
                    <p className="text-sm text-brand-purple-600">
                      <span className="font-medium">Plan:</span>{" "}
                      {u.subscriptions[0].plan}
                    </p>
                    <p className="text-sm text-brand-purple-600">
                      <span className="font-medium">Active:</span>{" "}
                      {u.subscriptions[0].active ? "Yes" : "No"}
                    </p>
                    <p className="text-sm text-brand-purple-600">
                      <span className="font-medium">Expires:</span>{" "}
                      {new Date(
                        u.subscriptions[0].expiresAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => openEdit(u)}
                  className="text-brand-purple-700 hover:text-brand-purple-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-brand-purple-600">
              {editing ? "Edit User" : "Add User"}
            </h2>
            <input
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <select
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="border-t pt-4">
              <h3 className="font-semibold text-sm mb-2 text-brand-purple-600">
                Subscription
              </h3>
              <input
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 mb-2 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
                placeholder="Plan"
                value={form.subscription.plan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subscription: {
                      ...form.subscription,
                      plan: e.target.value,
                    },
                  })
                }
              />
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 mb-2 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
                value={form.subscription.expiresAt}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subscription: {
                      ...form.subscription,
                      expiresAt: e.target.value,
                    },
                  })
                }
              />
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.subscription.active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subscription: {
                        ...form.subscription,
                        active: e.target.checked,
                      },
                    })
                  }
                />
                <span className="text-brand-slate-600">Active</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 border rounded border-brand-purple-300 hover:bg-brand-purple-100 w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600"
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
