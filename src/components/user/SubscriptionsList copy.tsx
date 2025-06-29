import { User } from "@/app/api/user/[id]/route";

interface Props {
  subscriptions: User['subscriptions'];
}

export default function SubscriptionsList({ subscriptions }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-brand-purple-700">Subscriptions</h2>

      {subscriptions.length === 0 ? (
        <p className="text-brand-slate-500 italic">No subscriptions found for this user.</p>
      ) : (
        <ul className="space-y-3">
          {subscriptions.map((sub) => (
            <li
              key={sub.id}
              className="border rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                <p className="font-semibold text-brand-slate-700">{sub.plan}</p>
                <p className="text-sm text-brand-slate-500">Expires: {new Date(sub.expiresAt).toLocaleDateString()}</p>
              </div>

              <div className="flex-shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sub.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {sub.active ? "Active" : "Inactive"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
