'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Smartphone, 
  Calendar, 
  Heart, 
  Flame, 
  ArrowRight, 
  Plus, 
  ShieldCheck, 
  Users, 
  Repeat, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import HeroBookIllustration from '@/components/HeroBookIllustration';
import BookCard from '@/components/BookCard';
import { store } from '@/lib/store';
import { Book } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Dhaka');

  useEffect(() => {
    setBooks(store.getBooks());
    const unsubscribe = store.subscribe(() => {
      setBooks(store.getBooks());
    });
    return unsubscribe;
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`);
  };

  const categories = [
    { name: 'Textbook', icon: BookOpen, href: '/explore?cat=Textbook', count: '1,240' },
    { name: 'Academic', icon: GraduationCap, href: '/explore?cat=Academic', count: '850' },
    { name: 'E-Book', icon: Smartphone, href: '/ebooks', count: '312' },
    { name: 'Rental', icon: Calendar, href: '/rentals', count: '215' },
    { name: 'Donate', icon: Heart, href: '/donate', count: '148' },
    { name: 'Popular', icon: Flame, href: '/explore?sort=popular', count: 'Trending' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* 1. HERO SECTION (Matching Reference Screen 1) */}
      <section className="relative pt-6 sm:pt-10 pb-8 bg-linear-to-b from-mint-subtle/70 via-surface to-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Student Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint border border-mint-border text-forest text-xs font-semibold shadow-2xs">
                <span className="text-fresh">🌱</span>
                <span>For Students</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15]">
                Give Your Books a <br />
                <span className="text-forest underline decoration-fresh decoration-4 underline-offset-8">
                  Second Life.
                </span>
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
                Buy, sell, exchange, rent or donate books with students near you. Join Bangladesh&apos;s fastest growing student-to-student book community.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-semibold text-sm shadow-card transition-all hover:translate-y--0.5"
                >
                  <span>Explore Books</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/post-book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-mint text-forest border border-mint-border font-semibold text-sm shadow-soft transition-all"
                >
                  <Plus className="w-4 h-4 text-fresh" />
                  <span>Post a Book</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-3 text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-fresh" /> Verified Campus Students
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-fresh" /> 0% Commission
                </span>
              </div>

            </div>

            {/* Right Hero Visual: 3D Floating Book Composition (Zero Human, Reference compliant) */}
            <div className="lg:col-span-5 relative">
              <HeroBookIllustration />
            </div>

          </div>

          {/* Search Box on Hero Bar matching Screen 1 */}
          <div className="mt-10 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-card border border-surface-border flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="w-5 h-5 text-charcoal-light absolute left-3.5" />
                <input
                  type="text"
                  placeholder="Search books, e-books, subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl focus:outline-hidden focus:bg-mint-subtle/50 text-charcoal placeholder:text-charcoal-light"
                />
              </div>

              <div className="h-6 w-px bg-surface-border hidden sm:block" />

              <div className="relative w-full sm:w-48 flex items-center">
                <MapPin className="w-4 h-4 text-forest absolute left-3 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-sm bg-transparent rounded-xl focus:outline-hidden text-charcoal font-medium cursor-pointer"
                >
                  <option value="Dhaka">Dhaka (All)</option>
                  <option value="Kuril / AIUB">Kuril / AIUB</option>
                  <option value="Nilkhet / DU">Nilkhet / DU</option>
                  <option value="Palashi / BUET">Palashi / BUET</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Mirpur">Mirpur</option>
                  <option value="Uttara">Uttara</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-fresh hover:bg-fresh-hover text-white font-semibold text-sm transition shadow-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Categories Bar (Matching Reference Screen 1) */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="bg-white hover:bg-mint border border-surface-border hover:border-fresh/40 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all shadow-2xs group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-mint group-hover:bg-fresh group-hover:text-white text-forest flex items-center justify-center mb-1.5 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-charcoal group-hover:text-forest">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 2. RECENTLY ADDED BOOKS SECTION (Matching Reference Screen 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
              Recently Added Books
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Fresh listings available for buy, exchange, rent, or donation right now.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-fresh transition"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {books.slice(0, 5).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 3. CORE EXCHANGE & MARKETPLACE CHANNELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-mint via-white to-mint/50 rounded-3xl p-6 sm:p-10 border border-mint-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="space-y-2 p-3">
              <div className="w-10 h-10 rounded-xl bg-forest text-white flex items-center justify-center font-bold text-sm mx-auto md:mx-0">
                1
              </div>
              <h3 className="font-bold text-charcoal text-base">Buy & Sell Directly</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Save 50% to 80% on official NCTB and university reference books without middleman markups.
              </p>
            </div>

            <div className="space-y-2 p-3">
              <div className="w-10 h-10 rounded-xl bg-fresh text-white flex items-center justify-center font-bold text-sm mx-auto md:mx-0">
                2
              </div>
              <h3 className="font-bold text-charcoal text-base">Peer Book Exchange</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Exchange your completed semester guides for the next semester&apos;s books with cash adjustments.
              </p>
            </div>

            <div className="space-y-2 p-3">
              <div className="w-10 h-10 rounded-xl bg-forest-light text-white flex items-center justify-center font-bold text-sm mx-auto md:mx-0">
                3
              </div>
              <h3 className="font-bold text-charcoal text-base">Affordable Rentals</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Rent expensive engineering or medical reference books for just the exam weeks or full semesters.
              </p>
            </div>

            <div className="space-y-2 p-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mx-auto md:mx-0">
                4
              </div>
              <h3 className="font-bold text-charcoal text-base">Donate to Students</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Support junior students across Bangladesh by giving completed textbooks to peers in genuine need.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CAMPUS STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 shadow-elevated">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-forest-light/40">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-fresh-light font-mono">12,430+</p>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">Verified Students</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-fresh-light font-mono">8,750+</p>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">Textbooks Circulating</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-fresh-light font-mono">2,340+</p>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">Deals Completed</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-fresh-light font-mono">৳1.8M+</p>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">Student Money Saved</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
