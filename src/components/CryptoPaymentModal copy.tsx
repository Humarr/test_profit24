import React, { useState } from "react";
import { useToast } from "@/components/toast/useToast";

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  amount: string;
}

export default function CryptoPaymentModal({
  isOpen,
  onClose,
  plan,
  amount,
}: CryptoPaymentModalProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      toast("Please enter your wallet address", "error", 4000);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call for crypto payment
      await new Promise((r) => setTimeout(r, 2000));

      toast(`Crypto payment initiated for ${plan} ($${amount})`, "success", 5000);
      onClose();
      setWalletAddress("");
    } catch {
      toast("Failed to initiate crypto payment", "error", 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="crypto-payment-title"
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="crypto-payment-title" className="text-xl font-bold mb-4">
          Pay via Crypto
        </h2>
        <p className="mb-4">
          Plan: <strong>{plan}</strong> — Amount: <strong>${amount}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold" htmlFor="wallet">
            Wallet Address
          </label>
          <input
            id="wallet"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your crypto wallet address"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded ${
              loading
                ? "bg-brand-purple-300 cursor-not-allowed"
                : "bg-brand-purple-500 hover:bg-brand-purple-600 text-white"
            } focus:outline-none focus:ring-2 focus:ring-brand-purple-400`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 text-center text-brand-purple-500 hover:underline focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
