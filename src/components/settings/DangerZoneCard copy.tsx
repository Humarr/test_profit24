"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DangerZoneCardProps {
  userId: string;
}

export function DangerZoneCard({ userId }: DangerZoneCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure? This will permanently delete the user.")) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      setSuccess(true);
      // Maybe redirect or refresh? Up to you
      alert("User deleted successfully");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-red-300 rounded-lg p-6 bg-red-50">
      <h2 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h2>
      <p className="text-sm text-red-600 mb-4">
        Deleting this user is permanent and cannot be undone. All associated data will be lost.
      </p>

      {error && <div className="text-sm text-red-700 mb-2">{error}</div>}
      {success && <div className="text-sm text-green-700 mb-2">User deleted successfully</div>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        Delete User
      </button>
    </div>
  );
}
