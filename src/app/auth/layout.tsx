import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-purple-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brand-purple-600">
            Profit24 SCALPER
          </Link>
          {/* <div className="flex gap-4">
            <Link 
              href="/auth/login" 
              className="px-4 py-2 border border-brand-purple-500 text-brand-purple-500 rounded-lg font-medium hover:bg-brand-purple-50 transition"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition"
            >
              Register
            </Link>
          </div> */}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
    </div>
  )
}