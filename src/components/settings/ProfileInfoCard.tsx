"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/toast/useToast";
import { ENDPOINT_URL } from "../../../endpoint";

export default function ProfileInfoCard() {
    const params = useParams(); // ✅ Not a promise
    const id = params?.id as string;
  const toast = useToast();

  const [initial, setInitial] = useState({ name: "", email: "", phone: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
        if (!id){
            toast("User not found", "error");
            return;
        }
      try {
        setLoading(true);
        const res = await fetch(`${ENDPOINT_URL}/api/user/${id}`, {
          method: 'GET',
          // cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load user");
        const { name, email, phone } = data.user;
        setInitial({ name, email, phone: phone || "" });
        setForm({ name, email, phone: phone || "" });
      } catch (err) {
        toast((err as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id, toast]);

  const hasChanges =
    form.name !== initial.name ||
    form.email !== initial.email ||
    form.phone !== initial.phone;

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${ENDPOINT_URL}/api/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");
      toast("Profile updated!", "success");
      setInitial(form); // Update initial state after successful save
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-brand-purple-700">Profile Information</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brand-slate-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
          value={form.name}
          disabled={loading}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brand-slate-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
          value={form.email}
          disabled={loading}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-brand-slate-700">Phone</label>
        <input
          type="tel"
          className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
          value={form.phone}
          disabled={loading}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={() => setForm(initial)}
          className="px-4 py-2 rounded-lg border text-brand-purple-700 hover:bg-brand-purple-50"
          disabled={loading || saving || !hasChanges}
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-white ${
            !hasChanges || loading || saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-purple-600 hover:bg-brand-purple-700"
          }`}
          disabled={!hasChanges || loading || saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
