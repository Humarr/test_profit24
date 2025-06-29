interface Props {
    activations?: {
      id: string;
      active: boolean;
      startedAt: Date;
      bot: {
        id: string;
        name: string;
        tier: string;
        performance: string;
      };
    }[];
  }
  
  export default function BotActivationsList({ activations = [] }: Props) {
    return (
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-brand-purple-700">Bot Activations</h2>
  
        {activations.length === 0 ? (
          <p className="text-brand-slate-500 italic">No bot activations for this user.</p>
        ) : (
          <ul className="space-y-3">
            {activations.map((act) => (
              <li
                key={act.id}
                className="border rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <div>
                  <p className="font-semibold text-brand-slate-700">{act.bot.name}</p>
                  <p className="text-sm text-brand-slate-500">Tier: {act.bot.tier}</p>
                  <p className="text-sm text-brand-slate-500">
                    Started: {new Date(act.startedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-brand-slate-500">Performance: {act.bot.performance}</p>
                </div>
  
                <div className="flex-shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      act.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {act.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  