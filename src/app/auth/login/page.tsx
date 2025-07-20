/* eslint-disable react/no-unescaped-entities */
// login
'use client'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/toast/useToast'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const addToast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // addToast('Login attempt detected!', 'info');
      // console.log("email : ", form.email, "admin email : ", process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      // Check for admin email
      if (form.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        addToast('Admin login attempt detected!', 'info');
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        console.log("Admin response: ", response);
  
        const data = await response.json();
        console.log("Admin data: ", data);
  
        if (response.ok) {
          console.log("Admin data: ", data);
          addToast(`${data.name} login successful!`, 'success');
          addToast('Taking you to your dashboard, Admin!', 'info');
          window.location.href = '/admin';

          await fetch('/api/mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: form.email,
              subject: 'Admin login successful!',
              content: 'You have successfully logged in to your admin account.\nIf that was not you, please contact us at contact@profits24traders.com or reach out to our support team. Change your password as soon as possible.',
            }),
          });
          return; // ✅ Prevents further execution
        } else {
          addToast(data.error || 'Admin login failed.', 'error');
          return; // ✅ Stop further login attempt
        }
      }
  
      // Default user login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("User data: ", data);
        addToast('Login successful!', 'success');
        addToast('Taking you to your dashboard, User!', 'info');
        window.location.href = '/dashboard';

        // await fetch('/api/mail', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     to: form.email,
        //     subject: 'User login successful!',
        //     content: 'You have successfully logged in to your user account.\nIf that was not you, please contact us at contact@profits24traders.com or reach out to our support team. Change your password as soon as possible.',
        //   }),
        // });
      } else {
        addToast(data.error || 'Login failed.', 'error');
      }
  
    } catch (error) {
      console.error('LOGIN_ERROR:', error);
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">Login to your account</h2>
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          
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