'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  BookOpen, 
  Gift, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Users,
  Sparkles
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book } from '@/types';
import BookCard from '@/components/BookCard';

export default function DonatePage() {
  const router = useRouter();
  const [freeBooks, setFreeBooks] = useState<Book[]>([]);

  useEffect(() => {
    const all = store.getBooks();
    setFreeBooks(all.filter((b) => b.listingType === 'donate'));
    const unsubscribe = store.subscribe(() => {
      setFreeBooks(store.getBooks().filter((b) => b.listingType === 'donate'));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Banner matching Screen 12 */}
      <div className="bg-linear-to-b from-mint via-white to-surface rounded-3xl p-8 sm:p-12 border border-mint-border text-center max-w-3xl mx-auto shadow-card space-y-6">
        
        {/* Stylized Book Heart Graphic (Zero Human Photo strictly respected) */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-fresh/20 filter blur-lg animate-pulse" />
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-forest text-white flex items-center justify-center shadow-elevated">
            <BookOpen className="w-10 h-10 text-fresh-light" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm">
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            Donate a Book
          </h1>
          <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
            Share your books with students who need them. Support peers across Bangladesh who face textbook affordability challenges.
          </p>
        </div>

        <div>
          <Link
            href="/post-book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-card transition-all hover:scale-102"
          >
            <span>Donate Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal-muted border-t border-surface-border">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-fresh" /> 100% Free of Cost</span>
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-fresh" /> Direct Student-to-Student Handover</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> Over 140+ Donated Books</span>
        </div>

      </div>

      {/* Available Free Donated Books */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
              Available Free Donated Books
            </h2>
            <p className="text-xs text-charcoal-muted">
              Students in need can request these books free of charge.
            </p>
          </div>
        </div>

        {freeBooks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-surface-border p-10 text-center space-y-3">
            <p className="text-xs text-charcoal-muted">All current donated books have been claimed! Post a donation above to help.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {freeBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
