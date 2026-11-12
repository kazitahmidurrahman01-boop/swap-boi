'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book } from '@/types';
import { formatBDT, formatDistance } from '@/lib/utils';

export default function RentalMarketplacePage() {
  const router = useRouter();
  const [rentals, setRentals] = useState<Book[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number>(7);

  useEffect(() => {
    const all = store.getBooks();
    setRentals(all.filter((b) => b.listingType === 'rent'));
    const unsubscribe = store.subscribe(() => {
      setRentals(store.getBooks().filter((b) => b.listingType === 'rent'));
    });
    return unsubscribe;
  }, []);

  const handleRentClick = (bookId: string) => {
    router.push(`/offer/new?bookId=${bookId}&type=rent`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner matching Screen 11 */}
      <div className="bg-linear-to-r from-mint via-white to-surface rounded-3xl p-8 border border-mint-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-white text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-fresh-light" />
            <span>Semester Book Rental</span>
          </div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Rent Textbooks. Save Up to 90%.
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Why buy expensive hardcover books for just one term? Rent from senior students, pay a nominal weekly fee, and get your security deposit refunded upon return.
          </p>
        </div>

        {/* Info card */}
        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card space-y-2 text-xs w-full md:w-80">
          <p className="font-bold text-forest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-fresh" /> Security Deposit Protected
          </p>
          <p className="text-charcoal-muted text-[11px] leading-relaxed">
            The security deposit is safely returned when the book is handed back in clean, acceptable condition.
          </p>
        </div>
      </div>

      {/* Rentals List matching Screen 11 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-charcoal tracking-tight">Available Rental Textbooks</h2>
          <span className="text-xs text-charcoal-muted font-semibold">{rentals.length} Books Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((book) => {
            const weeklyRate = book.rentalWeeklyPrice || 50;
            const deposit = book.securityDeposit || 300;
            return (
              <div
                key={book.id}
                className="bg-white rounded-3xl border border-surface-border p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-22 rounded-xl bg-linear-to-b ${book.coverColor} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-mint px-2 py-0.5 rounded">
                        {book.subject}
                      </span>
                      <h3 className="font-bold text-sm text-charcoal truncate mt-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-charcoal-light truncate">
                        {book.author}
                      </p>
                      <p className="text-[11px] text-charcoal-muted mt-1">
                        Owner: {book.user.fullName} ({book.user.institution.split(' ')[0]})
                      </p>
                    </div>
                  </div>

                  {/* Pricing Box matching Screen 11 */}
                  <div className="bg-surface rounded-2xl p-4 border border-surface-border space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-charcoal-muted">Rental Price:</span>
                      <strong className="text-forest text-sm font-extrabold">
                        {formatBDT(weeklyRate)} / 7 days
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-surface-border pt-1.5">
                      <span className="text-charcoal-muted">Security Deposit:</span>
                      <strong className="text-charcoal text-xs">
                        {formatBDT(deposit)} <span className="text-[10px] text-fresh font-normal">(Refundable)</span>
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Rent Button matching Screen 11 */}
                <button
                  onClick={() => handleRentClick(book.id)}
                  className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-card flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Rent Now</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
