"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/toast/useToast";
import { ENDPOINT_URL } from "../../../endpoint";

interface SecurityInfo {
  email: string;
  role: string;
}

export default function SecurityCard() {
  const params = useParams(); // ✅ Not a promise
  const id = params?.id as string;
  const toast = useToast();

  const [security, setSecurity] = useState<SecurityInfo | null>(null);
  const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${ENDPOINT_URL}/api/user/${id}`, {
          method: 'GET',
          // cache: 'no-store', // ensure it's always fresh
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load security info");
        setSecurity({ email: data.user.email, role: data.user.role });
      } catch (err) {
        toast((err as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSecurity();
  }, [id, toast]);

//   const handleRoleChange = async (newRole: string) => {
//     try {
//       setSaving(true);
//       const res = await fetch(`/api/user/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: newRole }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to update role");
//       setSecurity((prev) => prev && { ...prev, role: newRole });
//       toast(`Role updated to ${newRole}`, "success");
//     } catch (err) {
//       toast((err as Error).message, "error");
//     } finally {
//       setSaving(false);
//     }
//   };

  const handleResetPassword = () => {
    toast("Password reset not implemented yet!", "info");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-brand-purple-700">Security</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : security ? (
        <div className="space-y-2 text-sm text-brand-slate-700">
          <p>
            <span className="font-medium">Email (username):</span> {security.email}
          </p>
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className={security.role === "admin" ? "text-green-600" : "text-gray-600"}>
              {security.role}
            </span>
          </p>

          <div className="flex gap-4 pt-4 flex-wrap">
            <button
              onClick={handleResetPassword}
              className="px-4 py-2 rounded bg-brand-orange-500 text-white font-semibold hover:bg-brand-orange-600 transition"
            >
              Reset Password
            </button>

            {/* <button
              disabled={saving || !security}
              onClick={() => handleRoleChange(security.role === "admin" ? "user" : "admin")}
              className={`px-4 py-2 rounded font-semibold transition ${
                security.role === "admin"
                  ? "bg-brand-red-500 hover:bg-brand-red-600"
                  : "bg-brand-purple-500 hover:bg-brand-purple-600"
              } text-white`}
            >
              {saving
                ? "Updating..."
                : security.role === "admin"
                ? "Demote to User"
                : "Promote to Admin"}
            </button> */}
          </div>
        </div>
      ) : (
        <p className="italic text-gray-500">No security data found.</p>
      )}
    </div>
  );
}
