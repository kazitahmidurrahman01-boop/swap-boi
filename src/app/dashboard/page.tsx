'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Repeat, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Gift, 
  Settings,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book, UserProfile, Offer } from '@/types';
import { formatBDT } from '@/lib/utils';
import BookCard from '@/components/BookCard';

export default function StudentDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(store.getCurrentUser());
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [myOffers, setMyOffers] = useState<Offer[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const u = store.getCurrentUser();
      setUser(u);
      if (u) {
        const allBooks = store.getBooks();
        setMyBooks(allBooks.filter((b) => b.userId === u.id));
        setMyOffers(store.getOffersForUser(u.id));
      } else {
        setMyBooks([]);
        setMyOffers([]);
      }
      setWishlistCount(store.getWishlist().length);
    };
    refresh();
    const unsubscribe = store.subscribe(refresh);
    return unsubscribe;
  }, []);

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to remove this book listing?')) {
      store.deleteBook(id);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-mint text-forest flex items-center justify-center mx-auto shadow-card">
          <BookOpen className="w-8 h-8 text-forest" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-charcoal">Student Login Required</h2>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto">
            Please log in with your university or student account to view your active books, outgoing offers, and deal history.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/login?redirect=/dashboard"
            className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition shadow-sm"
          >
            Log In Now
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-charcoal text-xs font-semibold transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Top Greeting Banner */}
      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl ${user.avatarBg} text-white font-extrabold text-xl flex items-center justify-center shadow-soft`}>
            {user.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
                Welcome back, {user.fullName.split(' ')[0]}!
              </h1>
              {user.isVerified && <ShieldCheck className="w-5 h-5 text-fresh" />}
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              {user.institution} • {user.department || 'Student'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/post-book"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-fresh hover:bg-fresh-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Book</span>
          </Link>
          <Link
            href="/profile"
            className="px-4 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-charcoal text-xs font-semibold transition"
          >
            Public Profile
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light">My Active Books</span>
          <p className="text-2xl font-extrabold text-forest font-mono mt-1">{myBooks.length}</p>
          <span className="text-[10px] text-charcoal-muted mt-1 block">Listed on marketplace</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light">Deals Completed</span>
          <p className="text-2xl font-extrabold text-charcoal font-mono mt-1">{user.dealsCompleted}</p>
          <span className="text-[10px] text-fresh font-semibold mt-1 block">100% successful</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light">Active Offers</span>
          <p className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{myOffers.length}</p>
          <span className="text-[10px] text-charcoal-muted mt-1 block">Pending negotiation</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light">Wishlist Items</span>
          <p className="text-2xl font-extrabold text-charcoal font-mono mt-1">{wishlistCount}</p>
          <span className="text-[10px] text-charcoal-muted mt-1 block">Saved alerts</span>
        </div>
      </div>

      {/* My Books Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-charcoal tracking-tight">My Book Listings</h2>
            <p className="text-xs text-charcoal-muted">Manage, edit, or remove books currently listed by you</p>
          </div>
          <Link
            href="/post-book"
            className="text-xs font-bold text-forest hover:text-fresh flex items-center gap-1"
          >
            <span>+ Add new listing</span>
          </Link>
        </div>

        {myBooks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-surface-border p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-charcoal-light mx-auto" />
            <h3 className="font-bold text-base text-charcoal">You haven&apos;t posted any books yet</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              Give your old textbooks a second life by posting them for sell, exchange, rent, or donation.
            </p>
            <Link
              href="/post-book"
              className="inline-block px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold"
            >
              Post a Book Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-surface-border p-4 shadow-soft flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-16 rounded-xl bg-linear-to-b ${book.coverColor} flex items-center justify-center text-white shrink-0`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-charcoal truncate">{book.title}</h4>
                    <p className="text-[11px] text-forest font-bold mt-0.5">
                      {formatBDT(book.sellPrice || book.rentalWeeklyPrice)} • <span className="uppercase">{book.listingType}</span>
                    </p>
                    <span className="text-[10px] text-charcoal-light">{book.locationArea}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/book/${book.id}`}
                    className="p-2 rounded-xl text-charcoal-muted hover:bg-surface text-xs font-semibold"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="p-2 rounded-xl text-charcoal-light hover:text-red-500 hover:bg-red-50"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Offers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-charcoal tracking-tight">Recent Offers & Deals</h2>
          <Link href="/chat" className="text-xs font-bold text-forest hover:text-fresh flex items-center gap-1">
            <span>Open Chat & Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-surface-border divide-y divide-surface-border shadow-soft overflow-hidden">
          {myOffers.length === 0 ? (
            <div className="p-8 text-center text-xs text-charcoal-muted">
              No recent offers. Browse explore to make an offer.
            </div>
          ) : (
            myOffers.map((off) => (
              <div key={off.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest uppercase">{off.offerType} Offer</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      off.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {off.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-charcoal mt-1">Book: {off.book.title}</p>
                  <p className="text-[11px] text-charcoal-muted">
                    {off.senderId === user.id ? `Sent to ${off.receiver.fullName}` : `Received from ${off.sender.fullName}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <p className="font-bold text-forest">{off.offeredBook ? `Swap: ${off.offeredBook.title}` : `৳${off.offeredCash}`}</p>
                    <p className="text-[10px] text-charcoal-light">{off.meetingLocation || 'Campus meetup'}</p>
                  </div>
                  <Link
                    href="/chat"
                    className="px-4 py-1.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition shadow-2xs"
                  >
                    Open Chat
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
