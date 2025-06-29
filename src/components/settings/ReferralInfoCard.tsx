"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/toast/useToast";

interface ReferredBy {
  id: string;
  name: string;
  email: string;
  myReferralCode: string;
}

interface ReferredUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ReferralInfoCard() {
  const params = useParams(); // ✅ Not a promise
  const id = params?.id as string;
  const toast = useToast();

  const [referredBy, setReferredBy] = useState<ReferredBy | null>(null);
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load referrals");

        setReferredBy(data.user.referredBy);
        setReferredUsers(data.user.referredUsers || []);
      } catch (err) {
        toast((err as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchReferrals();
  }, [id, toast]);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-brand-purple-700">Referral Information</h2>

      <div className="space-y-2">
        <h3 className="font-bold text-brand-slate-600">Referred By:</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : referredBy ? (
          <div className="text-sm text-brand-slate-700">
            <p><span className="font-medium">Name:</span> {referredBy.name}</p>
            <p><span className="font-medium">Email:</span> {referredBy.email}</p>
            <p><span className="font-medium">Referral Code:</span> {referredBy.myReferralCode}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">This user signed up without a referral.</p>
        )}
      </div>

      <div className="space-y-2 pt-4">
        <h3 className="font-bold text-brand-slate-600">Users Referred By This User:</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : referredUsers.length === 0 ? (
          <p className="text-sm text-gray-500 italic">This user hasn’t referred anyone yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-brand-purple-100 text-brand-purple-800">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {referredUsers.map((ru) => (
                  <tr key={ru.id} className="border-t hover:bg-brand-purple-50">
                    <td className="px-4 py-2">{ru.name}</td>
                    <td className="px-4 py-2">{ru.email}</td>
                    <td className="px-4 py-2">{new Date(ru.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
