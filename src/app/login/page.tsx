'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, ShieldCheck, Check } from 'lucide-react';
import { store } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Find matching or default to Tahmidur
      store.setCurrentUser('user-tahmidur');
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      store.setCurrentUser('user-tahmidur');
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-surface-border shadow-elevated overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Green Panel */}
        <div className="md:col-span-5 bg-linear-to-b from-forest-dark via-forest to-forest-light p-8 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Welcome Back to Swap Boi
            </h2>
            <p className="text-sm text-mint leading-relaxed">
              Log in to negotiate textbook deals, exchange semester notes, and chat with campus peers.
            </p>
          </div>

          <div className="my-6 p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-xs">
            <p className="font-bold text-fresh-light">Quick Demo Access:</p>
            <p className="text-white/80">Click &ldquo;Sign In with Google&rdquo; or submit with any email to instantly log in as a student.</p>
          </div>

          <div className="text-xs text-mint/80">
            © {new Date().getFullYear()} Swap Boi Bangladesh
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-charcoal tracking-tight">Student Login</h3>
            <p className="text-xs text-charcoal-muted mt-1">Access your books, chats, and active offers</p>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-3 px-4 rounded-xl border border-surface-border hover:bg-surface text-charcoal font-semibold text-xs flex items-center justify-center gap-3 transition shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-surface-border flex-1" />
            <span className="text-[11px] text-charcoal-light font-medium uppercase">or with email</span>
            <div className="h-px bg-surface-border flex-1" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="student@aiub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-charcoal">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-forest hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light disabled:opacity-50 text-white font-bold text-sm shadow-card transition"
            >
              {loading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-xs text-charcoal-muted mt-5">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="text-forest font-bold hover:underline">
              Create an Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
