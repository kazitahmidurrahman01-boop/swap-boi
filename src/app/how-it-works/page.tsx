'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  MessageSquare, 
  Repeat, 
  ShieldCheck, 
  Calendar, 
  Heart, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Snap & Post Your Book',
      desc: 'Choose whether you want to Sell, Exchange, Rent, or Donate. Select your campus area, set condition and price.',
      icon: BookOpen,
      color: 'bg-forest',
    },
    {
      step: '02',
      title: 'Nearby Students Discover',
      desc: 'Students at your university or within 1 to 10 km search by curriculum, subject, or academic level and find your book.',
      icon: Search,
      color: 'bg-fresh',
    },
    {
      step: '03',
      title: 'Chat & Propose Deals',
      desc: 'Use the in-app chat to agree on prices, propose book swaps with cash adjustments, or schedule rental durations.',
      icon: MessageSquare,
      color: 'bg-forest-light',
    },
    {
      step: '04',
      title: 'Safe Campus Meetup',
      desc: 'Meet safely at your university cafeteria, campus gate, or departmental library. Inspect the book and confirm the deal.',
      icon: ShieldCheck,
      color: 'bg-emerald-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-forest bg-mint px-3 py-1 rounded-full uppercase tracking-wider">
          Student Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          How Swap Boi Works
        </h1>
        <p className="text-sm text-charcoal-muted leading-relaxed">
          The simple, safe, and community-driven textbook marketplace created exclusively for students in Bangladesh.
        </p>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="bg-white rounded-3xl border border-surface-border p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${s.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold text-forest/20 font-mono">{s.step}</span>
                </div>
                <h3 className="font-extrabold text-base text-charcoal">{s.title}</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed mt-2">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Listing Channels Detailed */}
      <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 shadow-card space-y-8">
        <h2 className="text-2xl font-extrabold text-charcoal text-center">4 Ways to Share Textbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-surface border border-surface-border space-y-2">
            <h3 className="font-bold text-sm text-forest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fresh" /> 1. Buy & Sell
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Recoup your investment after finishing a semester. Junior students get essential guides at 50% to 80% off Nilkhet or bookstore prices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-surface-border space-y-2">
            <h3 className="font-bold text-sm text-forest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fresh" /> 2. Exchange with Cash Adjustment
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Finished HSC Physics 1st Paper? Swap directly for HSC Physics 2nd Paper with a peer. Add nominal cash if one book is newer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-surface-border space-y-2">
            <h3 className="font-bold text-sm text-forest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fresh" /> 3. Textbook Rentals
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Rent high-value reference textbooks (e.g. Sedra Smith, Karumanchi) for the few weeks needed before midterms. Fully refundable deposit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-surface-border space-y-2">
            <h3 className="font-bold text-sm text-forest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fresh" /> 4. Free Book Donations
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Pay it forward. Give your used NCTB school or college books to deserving students facing financial difficulties across Bangladesh.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-card transition"
          >
            <span>Start Exploring Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
