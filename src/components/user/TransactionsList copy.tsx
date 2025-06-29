import { User } from "@/app/api/user/[id]/route";

interface Props {
  transactions: User['transactions'];
}

export default function TransactionsList({ transactions }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-brand-purple-700">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-brand-slate-500 italic">No transactions recorded for this user.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="border rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                <p className="font-semibold text-brand-slate-700">Plan: {tx.plan}</p>
                <p className="text-sm text-brand-slate-500">Amount: ₦{tx.amount.toLocaleString()}</p>
                <p className="text-sm text-brand-slate-500">Ref: {tx.reference}</p>
                <p className="text-sm text-brand-slate-500">Date: {new Date(tx.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex-shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tx.status === "success"
                      ? "bg-green-100 text-green-800"
                      : tx.status === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
