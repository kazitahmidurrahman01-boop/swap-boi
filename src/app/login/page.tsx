'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  BookOpen, 
  ShieldCheck, 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { store } from '@/lib/store';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const demoAccounts = [
    {
      name: 'Kazi Tahmidur Rahman',
      email: 'tahmidur@student.aiub.edu',
      role: 'AIUB Student (Default)',
      color: 'bg-emerald-600',
      initials: 'TR',
      institution: 'AIUB CSE'
    },
    {
      name: 'Tanvir Hasan',
      email: 'tanvir.hasan@aiub.edu',
      role: 'Verified Seller',
      color: 'bg-teal-700',
      initials: 'TH',
      institution: 'AIUB Software'
    },
    {
      name: 'Farhana Akter',
      email: 'farhana.du@du.ac.bd',
      role: 'DU Student',
      color: 'bg-green-700',
      initials: 'FA',
      institution: 'Dhaka University'
    },
    {
      name: 'Swap Boi Admin',
      email: 'admin@swapboi.com.bd',
      role: 'System Administrator',
      color: 'bg-forest-dark',
      initials: 'SB',
      institution: 'Safety Team'
    }
  ];

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword(demoEmail.startsWith('admin') ? 'admin123' : 'student123');
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const res = store.login(demoEmail, demoEmail.startsWith('admin') ? 'admin123' : 'student123');
      setLoading(false);
      if (res.success) {
        if (demoEmail.startsWith('admin')) {
          router.push('/admin');
        } else {
          router.push(redirectUrl);
        }
      } else {
        setErrorMessage(res.error || 'Login failed');
      }
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const res = store.login(email, password);
      setLoading(false);
      if (res.success) {
        if (res.user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push(redirectUrl);
        }
      } else {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    }, 500);
  };

  const handleGoogleSelect = (demoEmail: string) => {
    setGoogleModalOpen(false);
    setLoading(true);
    setTimeout(() => {
      store.loginWithGoogle(demoEmail);
      setLoading(false);
      router.push(redirectUrl);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-surface-border shadow-elevated overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Green Panel matching Screen 4 */}
        <div className="md:col-span-5 bg-linear-to-b from-forest-dark via-forest to-forest-light p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Welcome to Swap Boi
            </h2>
            <p className="text-sm text-mint leading-relaxed">
              Log in to manage your book listings, negotiate campus exchanges, and connect with fellow students.
            </p>
          </div>

          {/* Quick Demo Credentials Reminder Box */}
          <div className="my-6 p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2 text-xs relative z-10">
            <p className="font-bold text-fresh-light flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fresh-light" /> Instant 1-Click Access
            </p>
            <p className="text-white/85 text-[11px] leading-relaxed">
              Click any student account on the right or sign in with Google to test full marketplace workflows immediately.
            </p>
          </div>

          <div className="text-xs text-mint/80 relative z-10 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Swap Boi</span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-fresh-light" /> Student Safe
            </span>
          </div>
        </div>

        {/* Right Form Panel matching Screen 4 */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-charcoal tracking-tight">Student Log In</h3>
            <p className="text-xs text-charcoal-muted mt-1">
              Enter your student email and password to access your dashboard
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={() => setGoogleModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl border border-surface-border hover:bg-surface text-charcoal font-semibold text-xs flex items-center justify-center gap-3 transition shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-surface-border flex-1" />
            <span className="text-[10px] text-charcoal-light font-bold uppercase tracking-wider">or sign in with email</span>
            <div className="h-px bg-surface-border flex-1" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Student Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. tahmidur@student.aiub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-charcoal">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-forest hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-surface-border text-xs focus:outline-hidden focus:border-fresh text-charcoal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-forest focus:ring-fresh"
                />
                <span className="text-charcoal-muted text-[11px]">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-light disabled:opacity-50 text-white font-bold text-xs shadow-card transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Accounts Box */}
          <div className="mt-5 p-3 rounded-2xl bg-surface border border-surface-border space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-forest" /> Quick Test Accounts (1-Click Login):
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickLogin(acc.email)}
                  className="p-2 rounded-xl border border-surface-border hover:border-mint-border bg-white text-left transition flex items-center gap-2 group"
                >
                  <div className={`w-7 h-7 rounded-lg ${acc.color} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                    {acc.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-charcoal group-hover:text-forest truncate">{acc.name}</p>
                    <p className="text-[9px] text-charcoal-light truncate">{acc.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-charcoal-muted mt-4">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="text-forest font-bold hover:underline">
              Create an Account
            </Link>
          </p>

        </div>

      </div>

      {/* Google Sign-In Simulation Modal */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-elevated border border-surface-border space-y-4 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h4 className="font-bold text-sm text-charcoal">Sign in with Google</h4>
              </div>
              <button onClick={() => setGoogleModalOpen(false)} className="text-charcoal-light hover:text-charcoal text-sm">
                ✕
              </button>
            </div>

            <p className="text-xs text-charcoal-muted">
              Choose an active university student account to continue to <strong>Swap Boi</strong>:
            </p>

            <div className="space-y-2">
              {demoAccounts.slice(0, 3).map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleGoogleSelect(acc.email)}
                  className="w-full p-2.5 rounded-2xl border border-surface-border hover:bg-mint/40 text-left flex items-center gap-3 transition"
                >
                  <div className={`w-8 h-8 rounded-full ${acc.color} text-white font-bold text-xs flex items-center justify-center`}>
                    {acc.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-charcoal truncate">{acc.name}</p>
                    <p className="text-[11px] text-charcoal-light truncate">{acc.email}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleGoogleSelect('tahmidur@student.aiub.edu')}
              className="w-full py-2 rounded-xl bg-surface border border-surface-border text-charcoal text-xs font-semibold hover:bg-white"
            >
              Use another student account
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-forest">Loading login system...</div>}>
      <LoginContent />
    </Suspense>
  );
}
