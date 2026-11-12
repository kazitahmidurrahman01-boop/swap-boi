'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Bell, 
  BellRing, 
  Trash2, 
  BookOpen, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book } from '@/types';
import { formatBDT } from '@/lib/utils';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [notifiedMap, setNotifiedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setWishlist(store.getWishlist());
    const unsubscribe = store.subscribe(() => {
      setWishlist(store.getWishlist());
    });
    return unsubscribe;
  }, []);

  const handleToggleNotify = (bookId: string) => {
    setNotifiedMap((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleRemove = (bookId: string) => {
    store.toggleWishlist(bookId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Title matching Screen 13: My Wishlist (3) */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Keep track of textbooks you want. We will alert you whenever a student posts a lower price or nearby exchange.
          </p>
        </div>

        <Link
          href="/explore"
          className="text-xs font-semibold text-forest hover:text-fresh flex items-center gap-1"
        >
          <span>Find more books</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl border border-surface-border p-12 text-center space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-mint text-forest flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-charcoal">Your wishlist is empty</h3>
          <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
            Browse the marketplace and tap the heart icon on any textbook to save it to your wishlist.
          </p>
          <Link
            href="/explore"
            className="inline-block px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold"
          >
            Explore Books Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlist.map((book) => {
            const isNotified = notifiedMap[book.id] ?? true;
            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-surface-border p-4 shadow-soft hover:shadow-card transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-14 h-18 rounded-xl bg-linear-to-b ${book.coverColor} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-mint px-2 py-0.5 rounded">
                      {book.subject}
                    </span>
                    <h3 className="font-bold text-sm text-charcoal truncate mt-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted truncate">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-forest mt-1">
                      <span>{formatBDT(book.sellPrice || book.rentalWeeklyPrice)}</span>
                      <span className="text-charcoal-light font-normal">•</span>
                      <span className="capitalize font-medium text-charcoal-muted">{book.listingType}</span>
                      <span className="text-charcoal-light font-normal">•</span>
                      <span className="font-medium text-charcoal-light">{book.locationArea}</span>
                    </div>
                  </div>
                </div>

                {/* Right Actions matching Screen 13: "Get Notified" button */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => handleToggleNotify(book.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isNotified
                        ? 'bg-mint text-forest border border-mint-border'
                        : 'bg-white border border-surface-border text-charcoal-muted hover:bg-surface'
                    }`}
                  >
                    {isNotified ? (
                      <>
                        <BellRing className="w-3.5 h-3.5 text-fresh" />
                        <span>Notified</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Get Notified</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/book/${book.id}`}
                    className="p-2 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition shadow-2xs"
                    title="View Book"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleRemove(book.id)}
                    className="p-2 rounded-xl border border-surface-border text-charcoal-light hover:text-red-500 hover:bg-red-50 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
