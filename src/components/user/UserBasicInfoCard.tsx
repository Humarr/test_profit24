import { User } from "@/app/api/user/[id]/route";

interface Props {
  user: User;
}

export default function UserBasicInfoCard({ user }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-brand-purple-700">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Name</label>
          <p className="text-brand-slate-700">{user.name}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Email</label>
          <p className="text-brand-slate-700">{user.email}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Phone</label>
          <p className="text-brand-slate-700">{user.phone || "—"}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Experience</label>
          <p className="text-brand-slate-700">{user.experience || "—"}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Trading Amount</label>
          <p className="text-brand-slate-700">{user.tradingAmount || "—"}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-slate-500 mb-1">Role</label>
          <p className="text-brand-slate-700 capitalize">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
