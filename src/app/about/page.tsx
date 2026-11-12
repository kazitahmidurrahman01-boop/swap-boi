'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart, Users, Globe, Target, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Brand Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-forest text-white flex items-center justify-center mx-auto shadow-card">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-charcoal tracking-tight">
          About Swap Boi
        </h1>
        <p className="text-forest text-lg font-bold">
          Give Your Books a Second Life.
        </p>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Swap Boi is Bangladesh&apos;s pioneering student book marketplace and exchange network, designed to make educational learning materials affordable, accessible, and circular across schools, colleges, and universities.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mint text-forest flex items-center justify-center">
            <Target className="w-5 h-5 text-fresh" />
          </div>
          <h2 className="text-xl font-bold text-charcoal">Our Mission</h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Every semester in Bangladesh, millions of high-quality textbooks sit unused on bookshelves while junior students struggle to afford new copies. Our mission is to connect students directly within their campuses, eliminating financial barriers to academic excellence.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-mint text-forest flex items-center justify-center">
            <Globe className="w-5 h-5 text-fresh" />
          </div>
          <h2 className="text-xl font-bold text-charcoal">Campus Community First</h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            By building safe peer-to-peer mechanisms around institutions like AIUB, Dhaka University, BUET, NSU, and colleges nationwide, we cultivate trust and foster student camaraderie with zero commercial commission.
          </p>
        </div>
      </div>

      {/* Core Principles (Zero Human photos) */}
      <div className="bg-forest text-white p-8 sm:p-12 rounded-3xl shadow-elevated space-y-6">
        <h3 className="text-2xl font-extrabold text-center">Built on 4 Core Pillars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/10 space-y-2">
            <ShieldCheck className="w-8 h-8 text-fresh-light mx-auto" />
            <h4 className="font-bold text-sm">Verified Students</h4>
            <p className="text-xs text-mint/80">Every user is authenticated with university or institutional credentials.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 space-y-2">
            <Heart className="w-8 h-8 text-fresh-light mx-auto" />
            <h4 className="font-bold text-sm">Free Donations</h4>
            <p className="text-xs text-mint/80">Support underprivileged students through direct textbook gifts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 space-y-2">
            <BookOpen className="w-8 h-8 text-fresh-light mx-auto" />
            <h4 className="font-bold text-sm">Authorized E-Books</h4>
            <p className="text-xs text-mint/80">Open digital textbooks and curriculum guides available online 24/7.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 space-y-2">
            <Users className="w-8 h-8 text-fresh-light mx-auto" />
            <h4 className="font-bold text-sm">Zero Commission</h4>
            <p className="text-xs text-mint/80">100% of deal value stays between students. No hidden platform cuts.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
