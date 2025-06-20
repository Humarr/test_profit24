/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Login to your account</h2>
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-slate-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-left flex gap-2">
            <p className="text-sm font-sans text-brand-slate-400">Forgot Password?</p>
            <Link href="/auth/forgot-password" className="text-brand-purple-600 underline text-sm cursor-pointer font-bold">
              Reset Password
            </Link>
          </div>
          <Link href="/auth/login">
          <button className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans">
            Login
          </button>
          </Link>
          <div className="text-center text-sm font-sans mt-4 text-brand-slate-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-brand-purple-600 underline cursor-pointer font-bold">
              Create account now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}