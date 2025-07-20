/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useToast } from "@/components/toast/useToast";
import { redirect } from "next/navigation";

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  amount: string;
  onSuccess: () => void;
}

export default function BankTransferModal({
  isOpen,
  onClose,
  plan,
  amount,
  onSuccess,
}: BankTransferModalProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleProceed = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flutterwave/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, amount, currency: "USD" }),
      });

      const data = await res.json();
      if (!res.ok || !data.tx_ref || !data.email) {
        throw new Error(
          data.error || "Failed to initialize Flutterwave payment"
        );
      }

      // Dynamically import flutterwave inline script
      // const { loadScript } = await import("@/lib/loadFlutterwave") // we'll create this utility
      // await loadScript()

      const flutterwaveModule = await import("@/lib/loadFlutterwave");
      await flutterwaveModule.loadScript();

      // Launch Flutterwave Inline Payment
      (window as any).FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
        tx_ref: data.tx_ref,
        amount: parseFloat(amount),
        currency: data.currency || "USD",
        customer: {
          email: data.email,
        },
        meta: {
          userId: data.userId,
          plan: plan,
        },
        redirect_url: "https://cc1d38f1484e.ngrok-free.app/payment/success",
        callback: (response: any) => {
          if (response.status === "successful") {
            toast("✅ Payment successful", "success", 5000);
            onSuccess();
          } else {
            toast("❌ Payment not successful", "error", 5000);
          }
        },
        onclose: () => {
          toast("❌ Payment cancelled", "error", 5000);
        },
        customizations: {
          title: "Bot Payment",
          description: `Activate ${plan} Plan`,
          logo: "/logo.png",
        },
      });
    } catch (err) {
      const error = err as Error;
      toast(error.message || "Flutterwave error", "error", 5000);
      if (error.message === "Unauthorized") return redirect("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-brand-purple-900 mb-4">
          Pay with Card
        </h2>
        <p className="mb-2 text-brand-slate-900">
          Plan: <strong>{plan}</strong>
        </p>
        <p className="mb-4 text-brand-slate-900">
          Amount: <strong>${amount}</strong>
        </p>

        <button
          disabled={loading}
          onClick={handleProceed}
          className={`w-full py-4 rounded-xl text-white font-bold cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-purple-600 hover:bg-brand-purple-800"
          }`}
        >
          {loading ? "Loading..." : "Proceed to Payment"}
        </button>

        <button
          onClick={onClose}
          type="button"
          className="mt-4 w-full text-center text-brand-purple-500 font-semibold hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
