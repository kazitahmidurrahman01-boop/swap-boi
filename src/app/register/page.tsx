'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { store } from '@/lib/store';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('American International University-Bangladesh (AIUB)');
  const [academicLevel, setAcademicLevel] = useState('university_undergrad');
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Mock registration or store update
      const initials = fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'ST';

      store.updateUserProfile({
        fullName: fullName || 'New Student',
        email: email || 'student@aiub.edu',
        institution,
        avatarInitials: initials,
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 800);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      store.setCurrentUser('user-tahmidur');
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-surface-border shadow-elevated overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Green Hero Panel matching Screen 4 */}
        <div className="md:col-span-5 bg-linear-to-b from-forest-dark via-forest to-forest-light p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Join Swap Boi
            </h2>
            <p className="text-sm text-mint leading-relaxed">
              A student community for buying, selling, exchanging, renting and donating books across Bangladesh.
            </p>
          </div>

          {/* Clean 3D Book Graphic Illustration */}
          <div className="my-8 relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/10 filter blur-xl absolute" />
            <div className="relative z-10 w-36 h-28 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col justify-between shadow-2xl transform -rotate-3">
              <BookOpen className="w-8 h-8 text-fresh-light" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">AIUB & Campus Hub</p>
                <p className="text-[10px] text-mint-border">Zero Commission • Student Safe</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-mint/90 relative z-10">
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-fresh-light" /> Verified Student IDs only</p>
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-fresh-light" /> Safe campus meetup locations</p>
            <p className="flex items-center gap-2"><Check className="w-4 h-4 text-fresh-light" /> Keep textbook knowledge alive</p>
          </div>
        </div>

        {/* Right Form Panel matching Screen 4 */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-charcoal tracking-tight">Create Account</h3>
            <p className="text-xs text-charcoal-muted mt-1">Get started in seconds with your university or college email</p>
          </div>

          {/* Google Auth Button */}
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
            <span className="text-[11px] text-charcoal-light font-medium uppercase">or</span>
            <div className="h-px bg-surface-border flex-1" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Kazi Tahmidur Rahman"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="student@aiub.edu or yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Institution</label>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value="AIUB">AIUB</option>
                  <option value="Dhaka University (DU)">Dhaka University (DU)</option>
                  <option value="BUET">BUET</option>
                  <option value="North South University (NSU)">North South University (NSU)</option>
                  <option value="BRAC University">BRAC University</option>
                  <option value="Notre Dame College">Notre Dame College</option>
                  <option value="Dhaka College">Dhaka College</option>
                  <option value="Viqarunnisa Noon">Viqarunnisa Noon</option>
                  <option value="Other School/College">Other Institution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Academic Level</label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value="university_undergrad">University Undergrad</option>
                  <option value="hsc">HSC (Class 11-12)</option>
                  <option value="ssc">SSC (Class 9-10)</option>
                  <option value="o_levels">O / A Levels</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded mt-0.5 text-forest focus:ring-fresh"
              />
              <span className="text-xs text-charcoal-muted leading-tight">
                I agree to the <span className="text-forest underline">Terms & Privacy Policy</span> of Swap Boi.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light disabled:opacity-50 text-white font-bold text-sm shadow-card transition"
            >
              {loading ? 'Creating Account...' : success ? 'Account Created! Redirecting...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-xs text-charcoal-muted mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-forest font-bold hover:underline">
              Log In
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
