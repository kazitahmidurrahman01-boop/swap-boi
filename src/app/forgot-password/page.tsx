'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-surface-border shadow-elevated p-8 space-y-6">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-forest font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div>
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">Reset Password</h2>
          <p className="text-xs text-charcoal-muted mt-1">
            Enter your university or registered email address and we&apos;ll send you password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-mint-subtle border border-mint-border p-5 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-fresh mx-auto" />
            <p className="text-sm font-bold text-forest">Recovery Email Sent!</p>
            <p className="text-xs text-charcoal-muted">
              We&apos;ve sent instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Your Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@aiub.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-card transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
