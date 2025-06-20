// forgot-password
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Forgot Password?</h2>
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400"
            />
          </div>
          <Link href="/auth/forgot-password/reset">
          <button className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans">
            Get Reset Link
          </button>
          </Link>
          <div className="text-center text-sm font-sans mt-4 text-brand-slate-400">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-brand-purple-600 font-bold underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}