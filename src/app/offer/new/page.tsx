'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Repeat, 
  ShoppingBag, 
  Calendar, 
  Heart, 
  BookOpen, 
  CheckCircle2, 
  Plus 
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book, UserProfile } from '@/types';
import { formatBDT } from '@/lib/utils';

function MakeOfferContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId') || '';
  const initialType = (searchParams.get('type') as any) || 'exchange';

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getCurrentUser());
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  
  const [offerType, setOfferType] = useState<'sell' | 'exchange' | 'rent' | 'donate'>(initialType);
  const [offeredCash, setOfferedCash] = useState<number>(0);
  const [selectedOfferedBookId, setSelectedOfferedBookId] = useState<string>('');
  const [rentalDays, setRentalDays] = useState<number>(7);
  const [donationReason, setDonationReason] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (bookId) {
      const b = store.getBookById(bookId);
      setBook(b);
    }
    const user = store.getCurrentUser();
    setCurrentUser(user);
    const userBooks = store.getBooks().filter((b) => b.userId === user.id);
    setMyBooks(userBooks);
    if (userBooks.length > 0) {
      setSelectedOfferedBookId(userBooks[0].id);
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-charcoal">Please select a book to make an offer.</p>
        <Link href="/explore" className="text-forest text-xs font-bold underline mt-2 block">
          Browse Books
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const offer = store.createOffer({
        bookId: book.id,
        offerType,
        offeredCash: Number(offeredCash) || 0,
        offeredBookId: offerType === 'exchange' ? selectedOfferedBookId : undefined,
        rentalDurationDays: offerType === 'rent' ? rentalDays : undefined,
        donationReason: offerType === 'donate' ? donationReason : undefined,
        message: message || `Hi! I would like to make a ${offerType} offer for "${book.title}".`,
      });

      // Find conversation and redirect to chat screen 8
      const convs = store.getConversations();
      const matchingConv = convs.find((c) => c.offerId === offer.id || c.bookId === book.id);
      
      setTimeout(() => {
        router.push(`/chat?convId=${matchingConv ? matchingConv.id : ''}`);
      }, 500);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      <Link href={`/book/${book.id}`} className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest font-semibold mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Book Details
      </Link>

      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Title matching Screen 7 */}
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">Make an Offer</h1>
          <p className="text-xs text-charcoal-muted mt-1">Submit your negotiation offer to the seller</p>
        </div>

        {/* Target Book Preview Banner matching Screen 7 */}
        <div className="bg-surface rounded-2xl border border-surface-border p-3.5 flex items-center gap-3">
          <div className={`w-12 h-16 rounded-lg bg-linear-to-b ${book.coverColor} flex items-center justify-center text-white shrink-0 shadow-xs`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-charcoal truncate">{book.title}</h3>
            <p className="text-xs text-charcoal-muted truncate">By {book.author}</p>
            <p className="text-xs font-bold text-forest mt-0.5">
              Listed for: {formatBDT(book.sellPrice || book.rentalWeeklyPrice || 0)} • {book.listingType.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Offer Type Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'exchange', label: 'Exchange', icon: Repeat },
            { id: 'sell', label: 'Buy / Cash', icon: ShoppingBag },
            { id: 'rent', label: 'Rent', icon: Calendar },
            { id: 'donate', label: 'Request Free', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = offerType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setOfferType(tab.id as any)}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                  isSel ? 'border-forest bg-mint text-forest' : 'border-surface-border text-charcoal hover:bg-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Dual Inputs matching Screen 7: Extra Cash & Exchange Book */}
          {offerType === 'exchange' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Extra Cash Adjustment (৳ BDT)
                </label>
                <input
                  type="number"
                  value={offeredCash}
                  onChange={(e) => setOfferedCash(Number(e.target.value))}
                  placeholder="৳0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm font-bold text-forest focus:outline-hidden"
                />
                <span className="text-[10px] text-charcoal-light mt-1 block">
                  Add cash if your book has lower value
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Select Book to Exchange
                </label>
                {myBooks.length > 0 ? (
                  <select
                    value={selectedOfferedBookId}
                    onChange={(e) => setSelectedOfferedBookId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                  >
                    {myBooks.map((mb) => (
                      <option key={mb.id} value={mb.id}>
                        {mb.title} ({formatBDT(mb.sellPrice)})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-xs text-charcoal-muted p-2 rounded-lg bg-surface border border-surface-border">
                    No books in your inventory yet.{' '}
                    <Link href="/post-book" className="text-forest underline font-bold">
                      Post one first
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {offerType === 'sell' && (
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Your Price Offer (৳ BDT) *
              </label>
              <input
                type="number"
                value={offeredCash || book.sellPrice || 0}
                onChange={(e) => setOfferedCash(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm font-bold text-forest focus:outline-hidden"
              />
            </div>
          )}

          {offerType === 'rent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Rental Duration (Days)</label>
                <select
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value={7}>7 Days (1 Week)</option>
                  <option value={15}>15 Days</option>
                  <option value={30}>30 Days (1 Month)</option>
                  <option value={90}>Full Semester (3 Months)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Calculated Rental Fee</label>
                <div className="px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-sm font-bold text-forest">
                  ৳{Math.round(((book.rentalWeeklyPrice || 50) / 7) * rentalDays)} + ৳{book.securityDeposit || 300} deposit
                </div>
              </div>
            </div>
          )}

          {offerType === 'donate' && (
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Why do you need this donated book?
              </label>
              <textarea
                rows={2}
                placeholder="Mention your department, semester, and how this will help your studies..."
                value={donationReason}
                onChange={(e) => setDonationReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-charcoal focus:outline-hidden"
              />
            </div>
          )}

          {/* Chat Message to Seller */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1">
              Message to Seller
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Hi Tanvir, can we meet tomorrow at AIUB Building D cafeteria?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-charcoal focus:outline-hidden"
            />
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-card transition"
            >
              {submitting ? 'Sending Offer...' : 'Send Offer & Open Chat'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default function MakeOfferPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-forest">Loading offer form...</div>}>
      <MakeOfferContent />
    </Suspense>
  );
}
