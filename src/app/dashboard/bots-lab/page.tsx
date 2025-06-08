export default function BotsLabPage() {
    const bots = [
      {
        id: 1,
        name: "BETA COPIER",
        minAmount: "$500",
        performance: "112%",
        fee: "12%",
        bgColor: "bg-white"
      },
      {
        id: 2,
        name: "BETA COPIER",
        minAmount: "$1000",
        performance: "112%",
        fee: "12%",
        bgColor: "bg-brand-purple-50"
      },
      {
        id: 3,
        name: "BETA COPIER",
        minAmount: "$1000",
        performance: "112%",
        fee: "12%",
        bgColor: "bg-white"
      },
      {
        id: 4,
        name: "ALPHA TRADER",
        minAmount: "$1500",
        performance: "125%",
        fee: "15%",
        bgColor: "bg-brand-purple-50"
      },
      {
        id: 5,
        name: "OMEGA SCALPER",
        minAmount: "$2000",
        performance: "135%",
        fee: "18%",
        bgColor: "bg-white"
      },
      {
        id: 6,
        name: "GAMMA HEDGER",
        minAmount: "$2500",
        performance: "140%",
        fee: "20%",
        bgColor: "bg-brand-purple-50"
      }
    ]
  
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">BOTS LAB</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div 
              key={bot.id} 
              className={`${bot.bgColor} rounded-xl p-6 border border-brand-cream-300 shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="text-lg font-bold text-brand-slate-700 mb-2">{bot.name}</h3>
              <a href="#" className="text-sm text-brand-purple-600 hover:underline mb-4 inline-block">
                Click to view bot information
              </a>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-brand-slate-500">Min {bot.minAmount} and above</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-brand-slate-500">Overall: {bot.performance}</span>
                  <span className="text-sm text-brand-slate-500">Performance fee: {bot.fee}</span>
                </div>
              </div>
              <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition">
                START COPYING
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }