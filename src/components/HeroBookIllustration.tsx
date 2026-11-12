'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ShoppingBag, Calendar, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function HeroBookIllustration() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Background Soft Glow Circles matching Reference Layout */}
      <div className="absolute inset-4 rounded-full bg-mint/80 filter blur-xl -z-10" />
      <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-dashed border-fresh/25 animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-linear-to-tr from-mint via-white to-surface-card shadow-card flex items-center justify-center">
        <div className="w-[280px] h-[280px] rounded-full bg-linear-to-b from-mint-subtle to-mint/40 border border-mint-border/50" />
      </div>

      {/* Center 3D Floating Book Composition (Zero Human, Pure Tech & Books) */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Floating Open Book Graphics */}
        <div className="animate-float-slow transition-transform duration-700">
          <div className="relative w-64 h-48 filter drop-shadow-2xl">
            {/* SVG 3D Open Textbook with Golden Bookmark & Pages */}
            <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Book Spine & Base Shadow */}
              <ellipse cx="140" cy="180" rx="90" ry="12" fill="#146B3A" fillOpacity="0.15" />
              
              {/* Left Page Stack (Thickness) */}
              <path d="M25 155 C65 145 110 148 138 160 L138 65 C110 52 65 50 25 60 Z" fill="#E2ECE5" />
              <path d="M28 152 C68 142 110 145 138 157 L138 62 C110 49 68 47 28 57 Z" fill="#EDF5EF" />
              <path d="M30 150 C70 140 110 143 140 155 L140 60 C110 47 70 45 30 55 Z" fill="#FFFFFF" stroke="#D1EAD8" strokeWidth="1.5" />
              
              {/* Right Page Stack (Thickness) */}
              <path d="M255 155 C215 145 170 148 142 160 L142 65 C170 52 215 50 255 60 Z" fill="#E2ECE5" />
              <path d="M252 152 C212 142 170 145 142 157 L142 62 C170 49 212 47 252 57 Z" fill="#EDF5EF" />
              <path d="M250 150 C210 140 170 143 140 155 L140 60 C170 47 210 45 250 55 Z" fill="#FFFFFF" stroke="#D1EAD8" strokeWidth="1.5" />

              {/* Book Spine Center Crease */}
              <line x1="140" y1="60" x2="140" y2="155" stroke="#146B3A" strokeWidth="2.5" strokeLinecap="round" />

              {/* Text Lines Simulation on Pages */}
              <line x1="45" y1="75" x2="120" y2="70" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="90" x2="115" y2="85" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="105" x2="122" y2="100" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="120" x2="100" y2="116" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />

              <line x1="160" y1="70" x2="235" y2="75" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <line x1="165" y1="85" x2="235" y2="90" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="158" y1="100" x2="235" y2="105" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <line x1="162" y1="116" x2="215" y2="120" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />

              {/* Green Silk Ribbon Bookmark */}
              <path d="M140 60 C145 90 135 140 145 175 L152 168 L158 178 C150 140 145 90 140 60 Z" fill="#22A55D" />

              {/* Decorative Educational Geometry on Top Page */}
              <circle cx="85" cy="132" r="8" fill="#146B3A" fillOpacity="0.15" />
              <polygon points="195,128 205,142 185,142" fill="#22A55D" fillOpacity="0.2" />
            </svg>

            {/* Subtle floating star / sparkle */}
            <div className="absolute -top-3 -right-2 text-fresh animate-pulse">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>

        {/* Stacked Textbook Base */}
        <div className="relative -mt-6 w-52 h-14 bg-linear-to-r from-forest via-forest-light to-forest rounded-lg shadow-elevated transform -rotate-2 border-b-4 border-forest-dark flex items-center justify-between px-4 text-white text-xs font-bold tracking-wider">
          <span className="flex items-center gap-1.5 truncate">
            <BookOpen className="w-4 h-4 text-fresh-light shrink-0" />
            HSC & UNIVERSITY GUIDES
          </span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">
            BD 2024
          </span>
        </div>

      </div>

      {/* Floating Action Pill 1: SELL (Top Right) */}
      <Link 
        href="/explore?type=sell"
        className="absolute top-8 right-0 sm:-right-4 bg-white/95 backdrop-blur-xs border border-mint-border shadow-card hover:shadow-elevated rounded-2xl px-4 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-forest group-hover:bg-fresh group-hover:text-white transition">
          <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="block text-xs font-bold text-forest">Sell</span>
          <span className="text-[10px] text-charcoal-light">Earn from old books</span>
        </div>
      </Link>

      {/* Floating Action Pill 2: EXCHANGE (Middle Right) */}
      <Link 
        href="/explore?type=exchange"
        className="absolute top-36 right-[-8px] sm:-right-8 bg-white/95 backdrop-blur-xs border border-mint-border shadow-card hover:shadow-elevated rounded-2xl px-4 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-forest group-hover:bg-fresh group-hover:text-white transition">
          <RefreshCw className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="block text-xs font-bold text-forest">Exchange</span>
          <span className="text-[10px] text-charcoal-light">Swap with peers</span>
        </div>
      </Link>

      {/* Floating Action Pill 3: RENT (Lower Right) */}
      <Link 
        href="/rentals"
        className="absolute bottom-16 right-0 sm:-right-4 bg-white/95 backdrop-blur-xs border border-mint-border shadow-card hover:shadow-elevated rounded-2xl px-4 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-forest group-hover:bg-fresh group-hover:text-white transition">
          <Calendar className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="block text-xs font-bold text-forest">Rent</span>
          <span className="text-[10px] text-charcoal-light">From ৳10 / day</span>
        </div>
      </Link>

      {/* Floating Action Pill 4: DONATE (Bottom Center-Right) */}
      <Link 
        href="/donate"
        className="absolute -bottom-2 right-12 sm:right-16 bg-white/95 backdrop-blur-xs border border-mint-border shadow-card hover:shadow-elevated rounded-2xl px-4 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-forest group-hover:bg-fresh group-hover:text-white transition">
          <Heart className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="block text-xs font-bold text-forest">Donate</span>
          <span className="text-[10px] text-charcoal-light">Give for free</span>
        </div>
      </Link>

    </div>
  );
}
