import React from "react";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  amount: string;
  onBankTransferSelect: () => void;
  onCryptoSelect: () => void;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  plan,
  amount,
  onBankTransferSelect,
  onCryptoSelect,
}: PaymentMethodModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-brand-slate-900/60 flex justify-center items-end p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-brand-cream-500 rounded-t-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-brand-slate-700">Choose Payment Method</h2>
        <p className="mb-6 text-brand-slate-700">
          Plan: <strong>{plan}</strong> - Amount: <strong>${amount}</strong>
        </p>
        <button
          onClick={() => {
            onBankTransferSelect();
            onClose();
          }}
          className="w-full mb-4 py-3 bg-brand-purple-500 text-white rounded-lg font-semibold hover:bg-brand-purple-600 cursor-pointer"
        >
          Pay via Bank Transfer
        </button>
        <button
          onClick={() => {
            onCryptoSelect();
            onClose();
          }}
          className="w-full py-3 bg-brand-purple-200 text-brand-purple-700 rounded-lg font-semibold hover:bg-brand-purple-300 cursor-pointer"
        >
          Pay via Crypto (coming soon)
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 text-center text-brand-purple-500 hover:underline cursor-pointer font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
