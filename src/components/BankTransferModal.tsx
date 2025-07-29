/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/toast/useToast";
import { redirect, useRouter } from "next/navigation";
// import { ENDPOINT_URL } from "../../endpoint"
import { fetchToken } from "@/lib/api/fetchToken";
// import router from "next/router"

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
  const [ngnAmount, setNgnAmount] = useState<number | null>(null);
  const [converting, setConverting] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const convertToNGN = async () => {
      try {
        setConverting(true);
        const res = await fetch(`/api/convert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(amount), currency: "USD" }),
        });

        const data = await res.json();
        if (!res.ok || !data.convertedToNGN)
          throw new Error(data.error || "Failed to convert");

        setNgnAmount(data.convertedToNGN);
      } catch (error) {
        console.error("Conversion failed:", error);
        toast("Error converting to Naira", "error", 4000);
        setNgnAmount(null);
      } finally {
        setConverting(false);
      }
    };

    if (isOpen) convertToNGN();
  }, [amount, isOpen, toast]);

  
  useEffect(() => {
    fetchToken().then((token) => {
      if (token) setToken(token);
    });
  }, []);
  
  if (!isOpen || !token) return null;

  const handleProceed = async () => {
    if (!ngnAmount) {
      toast("Conversion failed. Cannot proceed.", "error", 4000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({
          plan,
          amount: ngnAmount.toString(),
          currency: "NGN",
        }),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok || !data.reference || !data.email) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      const { default: PaystackPop } = await import("@paystack/inline-js");
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        reference: data.reference,
        email: data.email,
        amount: Math.round(ngnAmount * 100), // NGN kobo
        currency: "NGN",
        metadata: {
          custom_fields: [
            { display_name: "Plan", variable_name: "plan", value: plan },
          ],
        },
        onSuccess: (trx: any) => {
          toast(`✅ Payment successful: ${trx.reference}`, "success", 5000);
          onSuccess();
          onSuccess();

          const params = new URLSearchParams({
            reference: trx.reference,
            plan,
          })
          
          router.push(`/payment/success?${params.toString()}`);
          // router.push(`/payment/success?reference=${trx.reference}&plan=${plan}`);

          
        },
        onCancel: () => {
          toast("❌ Payment was cancelled", "error", 4000);
        },
      });
    } catch (err) {
      const error = err as Error;
      toast(error.message || "Error initiating payment", "error", 5000);
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

        <p className="mb-1 text-brand-slate-900">
          Amount (USD): <strong>${amount}</strong>
        </p>

        <p className="mb-6 text-brand-slate-900">
          Amount (NGN):{" "}
          {converting ? (
            <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded-sm" />
          ) : ngnAmount ? (
            <strong>
              ₦{ngnAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            </strong>
          ) : (
            <span className="text-red-500 font-semibold">
              Failed to convert
            </span>
          )}
        </p>

        <button
          disabled={loading || converting || !ngnAmount}
          onClick={handleProceed}
          className={`w-full py-4 rounded-xl text-white font-bold cursor-pointer ${
            loading || converting || !ngnAmount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-purple-600 hover:bg-brand-purple-800"
          }`}
        >
          {loading
            ? "Loading..."
            : converting
            ? "Converting..."
            : "Proceed to Payment"}
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
