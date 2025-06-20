/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Eye, EyeOff, Clock } from 'lucide-react'

export default function RegisterPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const otpInputs = useRef<(HTMLInputElement | null)[]>([])

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^[0-9]$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  // Handle OTP key down (backspace)
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus()
    }
  }

  // Timer countdown
  useEffect(() => {
    if (activeStep !== 1 || timeLeft <= 0) return
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [timeLeft, activeStep])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Step Indicators */}
      <div className="flex justify-center gap-4 mb-8">
        {['Get started', 'Verify', 'Complete registration'].map((step, index) => (
          <button
            key={step}
            onClick={() => setActiveStep(index)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeStep === index
                ? 'bg-brand-purple-500 text-white'
                : 'bg-white text-brand-slate-700 border border-brand-cream-300'
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        {activeStep === 0 && (
          <>
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Let's get started</h2>
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="agreement" className="mt-1 mr-2" />
                <label htmlFor="agreement" className="text-sm text-brand-slate-500">
                  I agree to the <Link href="#" className="text-brand-purple-600 underline font-bold">Profit24 Scalper User Agreement</Link> and <Link href="#" className="text-brand-purple-600 underline font-bold">Privacy Policy</Link>
                </label>
              </div>
              <button className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition">
                Proceed
              </button>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-brand-purple-600 underline">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Verify email</h2>
            <div className="space-y-6">
              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                        otpInputs.current[index] = el;
                      }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-brand-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                  />
                ))}
              </div>
              <button className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition">
                Verify email
              </button>
              <button className="w-full py-3 bg-white text-brand-slate-700 rounded-lg font-medium border border-brand-cream-300 hover:bg-brand-purple-50 transition">
                Change email
              </button>
              <div className="flex items-center justify-center gap-2 text-brand-slate-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="text-center">
                Haven't received the code?{' '}
                <Link href="/auth/login" className="text-brand-purple-600 underline">
                  Resend new code
                </Link>
              </div>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Complete your registration</h2>
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 appearance-none">
                    <option value="">Trading experience</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-slate-400" />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Referral ID (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="How much do you want to trade with?"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-slate-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
                />
                <button 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition mt-6">
                Create Account
              </button>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-brand-purple-600 underline">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}