import { User } from "@/app/api/user/[id]/route";
    
interface Props {
  user: User & {
    referredBy?: { id: string; name: string; email: string } | null;
    referredUsers?: { id: string; name: string; email: string }[]; // ✅ optional
  };
}

export default function ReferralInfoCard({ user }: Props) {
  if (!user) return null;

  const referredUsers = user.referredUsers ?? [];

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-brand-purple-700">Referral Info</h2>

      {/* Referred By */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-brand-slate-600">Referred By</h3>
        {user.referredBy ? (
          <div className="p-3 rounded bg-brand-purple-50">
            <p className="font-medium text-brand-slate-700">{user.referredBy.name}</p>
            <p className="text-sm text-brand-slate-500">{user.referredBy.email}</p>
          </div>
        ) : (
          <p className="text-brand-slate-500 italic">This user was not referred by anyone.</p>
        )}
      </div>

      {/* Referred Users */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-brand-slate-600">Referred Users</h3>
        {referredUsers.length > 0 ? (
          <ul className="divide-y divide-brand-purple-100 border rounded">
            {referredUsers.map((ref) => (
              <li key={ref.id} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-brand-slate-700">{ref.name}</p>
                  <p className="text-sm text-brand-slate-500">{ref.email}</p>
                </div>
                <a
                  href={`/admin/users/${ref.id}`}
                  className="text-brand-purple-500 text-sm font-semibold hover:underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-brand-slate-500 italic">This user has not referred anyone yet.</p>
        )}
      </div>
    </div>
  );
}
