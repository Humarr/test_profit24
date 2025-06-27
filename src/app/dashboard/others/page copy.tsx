import { Download } from 'lucide-react'
import Image from 'next/image'

export default function OthersPage() {
  const learnResources = [
    {
      id: 1,
      title: "BETTER WAY TO TRADE",
      thumbnail: "/doc1.jpg",
      category: "LEARN WITH US"
    },
    {
      id: 2,
      title: "TRADING PSYCHOLOGY",
      thumbnail: "/doc2.jpg",
      category: "LEARN WITH US"
    },
    {
      id: 3,
      title: "RISK MANAGEMENT",
      thumbnail: "/doc3.jpg",
      category: "LEARN WITH US"
    }
  ]

  const forexSignals = [
    {
      id: 4,
      title: "EUR/USD ANALYSIS",
      thumbnail: "/doc4.jpg",
      category: "FOREX SIGNAL"
    },
    {
      id: 5,
      title: "GBP/JPY WEEKLY",
      thumbnail: "/doc5.jpg",
      category: "FOREX SIGNAL"
    },
    {
      id: 6,
      title: "GOLD TREND REPORT",
      thumbnail: "/doc6.jpg",
      category: "FOREX SIGNAL"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-brand-slate-700 mb-8">RESOURCES</h1>
      
      {/* Learn With Us Section */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-brand-slate-700 mb-6">LEARN WITH US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learnResources.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* PDF Thumbnail Image */}
              <Image
                src="/images/pdf-thumb.png"
                alt="PDF Preview"
                width={300}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-brand-slate-700 mb-3">{doc.title}</h3>
                <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Forex Signals Section */}
      <div>
        <h2 className="text-xl font-bold text-brand-slate-700 mb-6">FOREX SIGNAL</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forexSignals.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* PDF Thumbnail Image */}
              <Image
                src="/images/pdf-thumb.png"
                alt="PDF Preview"
                width={300}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-brand-slate-700 mb-3">{doc.title}</h3>
                <button className="w-full py-2 bg-brand-purple-600 text-white rounded-lg font-medium hover:bg-brand-purple-700 transition flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
