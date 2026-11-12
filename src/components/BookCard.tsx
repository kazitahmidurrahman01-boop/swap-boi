'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, BookOpen, ShieldCheck } from 'lucide-react';
import { Book } from '@/types';
import { store } from '@/lib/store';
import { formatBDT, formatDistance, getConditionBadge, getListingTypeBadge } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  onWishlistChange?: () => void;
}

export default function BookCard({ book, onWishlistChange }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(store.isInWishlist(book.id));

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = store.toggleWishlist(book.id);
    setIsWishlisted(updated);
    if (onWishlistChange) onWishlistChange();
  };

  const cond = getConditionBadge(book.condition);
  const typeBadge = getListingTypeBadge(book.listingType);

  return (
    <div className="group bg-white rounded-2xl border border-surface-border p-3 shadow-soft hover:shadow-card hover:border-mint-border transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Cover Display */}
      <Link href={`/book/${book.id}`} className="block relative aspect-3/4 rounded-xl overflow-hidden mb-3">
        {/* Book Cover Gradient & Mock Art */}
        <div className={`w-full h-full bg-linear-to-b ${book.coverColor} p-4 flex flex-col justify-between text-white shadow-inner group-hover:scale-102 transition-transform duration-300`}>
          
          {/* Top Badges */}
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs">
              {book.subject}
            </span>
          </div>

          {/* Center Book Art / Title */}
          <div className="my-auto text-center px-1">
            <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight drop-shadow-sm line-clamp-2">
              {book.title}
            </h4>
            <p className="text-[11px] text-white/80 mt-1 truncate">
              {book.author}
            </p>
          </div>

          {/* Bottom Academic Level Badge */}
          <div className="flex items-center justify-between text-[10px] text-white/90">
            <span className="capitalize">{book.academicLevel.replace('_', ' ')}</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-mono">
              {cond.label}
            </span>
          </div>
        </div>

        {/* Wishlist Button in Top-Right */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-charcoal shadow-sm hover:scale-110 hover:bg-white transition-all z-10"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-muted hover:text-red-500'
            }`}
          />
        </button>
      </Link>

      {/* Book Meta & Pricing */}
      <div className="space-y-1.5 px-1">
        <Link href={`/book/${book.id}`} className="block">
          <h3 className="font-bold text-sm text-charcoal hover:text-forest transition line-clamp-1">
            {book.title}
          </h3>
          <p className="text-xs text-charcoal-light truncate">
            {book.edition || book.author}
          </p>
        </Link>

        {/* Pricing / Type info matching reference: "৳450 • Sell", "৳300 • Exchange", "৳50/wk • Rent" */}
        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
            {book.listingType === 'sell' && (
              <span>{formatBDT(book.sellPrice)}</span>
            )}
            {book.listingType === 'exchange' && (
              <span>{formatBDT(book.sellPrice || 0)}</span>
            )}
            {book.listingType === 'rent' && (
              <span>{formatBDT(book.rentalWeeklyPrice || 50)}<span className="text-[10px] font-normal text-charcoal-light">/wk</span></span>
            )}
            {book.listingType === 'donate' && (
              <span className="text-fresh">FREE</span>
            )}
            <span className="text-charcoal-light font-normal">•</span>
            <span className={`text-[11px] font-medium capitalize ${typeBadge.text}`}>
              {book.listingType}
            </span>
          </div>
        </div>

        {/* Distance Indicator matching reference image: "📍 1.2 km away" */}
        <div className="flex items-center justify-between text-[11px] text-charcoal-light pt-1 border-t border-surface-border">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-fresh shrink-0" />
            <span className="truncate">{book.locationArea.split(',')[0]}</span>
          </span>
          <span className="font-medium shrink-0">
            {formatDistance(book.distanceKm)}
          </span>
        </div>
      </div>

    </div>
  );
}
