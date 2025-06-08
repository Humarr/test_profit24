'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalItems = 78
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nigerianNames = [
    { name: "Adebayo Ogunlesi", amount: "$12,450" },
    { name: "Chinedu Okonkwo", amount: "$11,890" },
    { name: "Folake Adebayo", amount: "$10,750" },
    { name: "Gbenga Akintunde", amount: "$9,430" },
    { name: "Ifeoma Eze", amount: "$8,920" },
    { name: "Jide Olanrewaju", amount: "$7,680" },
    { name: "Kemi Balogun", amount: "$6,540" },
    { name: "Leke Adesina", amount: "$5,870" },
    { name: "Ngozi Chukwu", amount: "$4,950" }
  ]

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold font-sans text-brand-slate-500">LEADERBOARD</h1>
        </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold font-sans text-brand-slate-700">Top Performers</h1>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate-400" />
            <input
              type="text"
              placeholder="Search traders..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-cream-300 bg-brand-cream-100 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 placeholder:text-brand-slate-400 text-brand-slate-600 font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-brand-slate-500 border-b border-brand-cream-300">
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium text-right">Amount Earned</th>
              </tr>
            </thead>
            <tbody>
              {nigerianNames.map((trader, index) => (
                <tr 
                  key={index} 
                  className={cn(
                    "border-b border-brand-cream-200",
                    index < 3 ? "bg-brand-purple-500 text-white" : "bg-brand-purple-50 text-slate-500"
                  )}
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium">{trader.name}</td>
                  <td className="py-4 px-4 text-right font-medium">{trader.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-brand-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg border border-brand-cream-300",
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-purple-50 text-brand-slate-600"
              )}
            >
              &lt;
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg border border-brand-cream-300",
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-purple-50 text-brand-slate-600"
              )}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}