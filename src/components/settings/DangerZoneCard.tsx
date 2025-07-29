"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ENDPOINT_URL } from "../../../endpoint";

interface DangerZoneCardProps {
  userId: string;
}

export function DangerZoneCard({ userId }: DangerZoneCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${ENDPOINT_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        // cache: 'no-store', // ensure it's always fresh
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      setSuccess(true);
      setConfirmOpen(false);
      alert("User deleted successfully");
      // Optionally, redirect admin to users list here
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
        onClick={() => setConfirmOpen(true)}
        disabled={loading}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        Delete User
      </button>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-red-700">Confirm Deletion</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you absolutely sure you want to permanently delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium cursor-pointer"
                onClick={() => setConfirmOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
