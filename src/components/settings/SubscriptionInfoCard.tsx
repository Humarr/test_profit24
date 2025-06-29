"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/toast/useToast";

interface Subscription {
  id: string;
  plan: string;
  active: boolean;
  expiresAt: string;
}

export default function SubscriptionInfoCard() {
  const params = useParams(); // ✅ Not a promise
  const id = params?.id as string;
  const toast = useToast();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load subscription");
        setSubscription(data.user.subscriptions?.[0] || null);
      } catch (err) {
        toast((err as Error).message, "error");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSubscription();
  }, [id, toast]);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-brand-purple-700">Subscription</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : !subscription ? (
        <p className="italic text-gray-500">No active subscription found.</p>
      ) : (
        <div className="space-y-2 text-sm text-brand-slate-700">
          <p>
            <span className="font-medium">Plan:</span> {subscription.plan}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className={subscription.active ? "text-green-600" : "text-red-600"}>
              {subscription.active ? "Active" : "Inactive"}
            </span>
          </p>
          <p>
            <span className="font-medium">Expires:</span>{" "}
            {new Date(subscription.expiresAt).toLocaleDateString()}
          </p>

          {/* Admin controls - optional */}
          <div className="pt-4">
            <button
              onClick={() => toast("Renew feature not implemented yet!", "info")}
              className="px-4 py-2 rounded bg-brand-purple-500 text-white font-semibold hover:bg-brand-purple-600 transition"
            >
              Renew Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
