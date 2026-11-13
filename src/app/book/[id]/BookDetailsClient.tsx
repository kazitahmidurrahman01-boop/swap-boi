'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Flag, 
  MapPin, 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  ShoppingBag, 
  Repeat, 
  Calendar, 
  BookOpen, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book, UserProfile } from '@/types';
import { formatBDT, formatDistance, getConditionBadge, getListingTypeBadge } from '@/lib/utils';
import BookCard from '@/components/BookCard';

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getActiveUser());
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('Duplicate or misleading listing');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  useEffect(() => {
    const b = store.getBookById(bookId);
    setBook(b);
    if (b) {
      setIsWishlisted(store.isInWishlist(b.id));
    }
    const unsubscribe = store.subscribe(() => {
      const updated = store.getBookById(bookId);
      setBook(updated);
      if (updated) {
        setIsWishlisted(store.isInWishlist(updated.id));
      }
      setCurrentUser(store.getActiveUser());
    });
    return unsubscribe;
  }, [bookId]);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-charcoal">Book Not Found</h2>
        <p className="text-sm text-charcoal-muted mt-2">The book you are looking for may have been completed or removed.</p>
        <Link href="/explore" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-forest text-white font-semibold text-sm">
          Back to Explore
        </Link>
      </div>
    );
  }

  const cond = getConditionBadge(book.condition);
  const typeBadge = getListingTypeBadge(book.listingType);
  const isOwner = currentUser.id === book.userId;

  const handleWishlistToggle = () => {
    const updated = store.toggleWishlist(book.id);
    setIsWishlisted(updated);
  };

  const handleStartChat = () => {
    // Navigate to chat or offer
    router.push(`/chat?bookId=${book.id}&sellerId=${book.userId}`);
  };

  const handleOpenOfferModal = (type: 'sell' | 'exchange' | 'rent' | 'donate') => {
    router.push(`/offer/new?bookId=${book.id}&type=${type}`);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    store.addReport({
      reporterId: currentUser.id,
      reporterName: currentUser.fullName,
      reportedBookId: book.id,
      reportedBookTitle: book.title,
      reportedUserId: book.userId,
      reportedUserName: book.user.fullName,
      reason: reportReason,
      details: 'Reported via Book Details screen',
    });
    setReportSuccess(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSuccess(false);
    }, 1500);
  };

  const relatedBooks = store.getBooks().filter((b) => b.id !== book.id && (b.subject === book.subject || b.academicLevel === book.academicLevel)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Breadcrumb Navigation matching Screen 3 */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-muted">
        <Link href="/explore" className="hover:text-forest transition">Explore</Link>
        <span>&gt;</span>
        <span className="text-forest font-semibold">Book Details</span>
      </nav>

      {/* Main Book Details Card matching Screen 3 */}
      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cover Presentation & Thumbnails */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-elevated border border-surface-border">
            {/* Rich gradient book visual representation */}
            <div className={`w-full h-full bg-linear-to-b ${book.coverColor} p-8 flex flex-col justify-between text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest bg-black/40 px-3 py-1 rounded-lg backdrop-blur-xs">
                  {book.subject}
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-mono">
                  {book.academicLevel.toUpperCase()}
                </span>
              </div>

              <div className="text-center my-auto px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-white/90 font-medium mt-2">
                  {book.author}
                </p>
                {book.edition && (
                  <p className="text-xs text-white/75 mt-1 font-mono">
                    {book.edition}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-white/90 border-t border-white/20 pt-3">
                <span>{book.publisher || 'NCTB / Academic'}</span>
                <span>Swap Boi Verified</span>
              </div>
            </div>
          </div>

          {/* Multiple Cover Angles Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                className={`aspect-3/4 rounded-xl border-2 cursor-pointer overflow-hidden p-2 flex flex-col items-center justify-center text-center ${
                  idx === 1 ? 'border-forest bg-mint/50' : 'border-surface-border bg-surface'
                }`}
              >
                <BookOpen className="w-4 h-4 text-forest mb-1" />
                <span className="text-[10px] font-semibold text-charcoal-muted">View {idx}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Book Info, Pricing, Seller Box, and Actions */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-charcoal-muted">
                <span>Subject: <strong className="text-charcoal">{book.subject}</strong></span>
                <span>•</span>
                <span>Level: <strong className="text-charcoal uppercase">{book.academicLevel.replace('_', ' ')}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" /> 4.8 (36 reviews)
                </span>
              </div>
            </div>

            {/* Seller Summary Box (Initials Avatar, Zero Human Photo) */}
            <div className="bg-surface rounded-2xl border border-surface-border p-3.5 flex items-center justify-between gap-4 sm:w-64">
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-xl ${book.user.avatarBg} text-white font-extrabold text-sm flex items-center justify-center shadow-xs`}>
                  {book.user.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-charcoal truncate max-w-[110px]">{book.user.fullName}</p>
                    {book.user.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-fresh shrink-0" />}
                  </div>
                  <p className="text-[11px] text-charcoal-light truncate max-w-[110px]">{book.user.institution.split(' ')[0]} Student</p>
                  <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5 mt-0.5">
                    <Star className="w-3 h-3 fill-current" /> {book.user.ratingScore} ({book.user.ratingCount})
                  </p>
                </div>
              </div>

              {!isOwner && (
                <button
                  onClick={handleStartChat}
                  className="px-3 py-1.5 rounded-xl bg-forest hover:bg-fresh text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              )}
            </div>
          </div>

          {/* Pricing & Badges */}
          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-3xl font-extrabold text-forest">
              {book.listingType === 'sell' && formatBDT(book.sellPrice)}
              {book.listingType === 'exchange' && formatBDT(book.sellPrice || 0)}
              {book.listingType === 'rent' && `${formatBDT(book.rentalWeeklyPrice || 50)} / 7 days`}
              {book.listingType === 'donate' && 'FREE DONATION'}
            </span>
            {book.originalPrice && book.listingType === 'sell' && (
              <span className="text-sm text-charcoal-light line-through">
                {formatBDT(book.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-mint text-forest border border-mint-border">
              Type: {book.listingType}
            </span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${cond.color}`}>
              Condition: {cond.label}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-surface text-charcoal border border-surface-border flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-fresh" />
              {book.locationArea} ({formatDistance(book.distanceKm)})
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Description</h3>
            <p className="text-sm text-charcoal leading-relaxed whitespace-pre-line bg-surface/60 p-4 rounded-xl border border-surface-border">
              {book.description}
            </p>
          </div>

          {/* Exchange or Rental Specific Info */}
          {book.listingType === 'exchange' && book.exchangePreferences && (
            <div className="bg-mint-subtle border border-mint-border p-4 rounded-xl space-y-1">
              <p className="text-xs font-bold text-forest flex items-center gap-1">
                <Repeat className="w-4 h-4 text-fresh" /> Desired Exchange Books:
              </p>
              <p className="text-xs text-charcoal font-medium">{book.exchangePreferences}</p>
            </div>
          )}

          {book.listingType === 'rent' && (
            <div className="bg-mint-subtle border border-mint-border p-4 rounded-xl grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-charcoal-muted block">Rental Price:</span>
                <strong className="text-forest text-sm">{formatBDT(book.rentalWeeklyPrice)} / 7 days</strong>
              </div>
              <div>
                <span className="text-charcoal-muted block">Security Deposit (Refundable):</span>
                <strong className="text-charcoal text-sm">{formatBDT(book.securityDeposit || 300)}</strong>
              </div>
            </div>
          )}

          {/* Primary Action Buttons matching Screen 3 */}
          {!isOwner ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <button
                onClick={() => handleOpenOfferModal('sell')}
                className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-card flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => handleOpenOfferModal('exchange')}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-mint text-forest border border-mint-border font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
              >
                <Repeat className="w-4 h-4 text-fresh" />
                <span>Make Exchange Offer</span>
              </button>

              {book.listingType === 'rent' ? (
                <button
                  onClick={() => handleOpenOfferModal('rent')}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-mint text-teal-800 border border-teal-200 font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Rent This Book</span>
                </button>
              ) : book.listingType === 'donate' ? (
                <button
                  onClick={() => handleOpenOfferModal('donate')}
                  className="w-full py-3.5 rounded-xl bg-fresh hover:bg-fresh-hover text-white font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
                >
                  <Heart className="w-4 h-4" />
                  <span>Request Donation</span>
                </button>
              ) : (
                <button
                  onClick={handleStartChat}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-surface text-charcoal border border-surface-border font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4 text-forest" />
                  <span>Ask Question</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-3 bg-mint rounded-xl text-xs text-forest font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-fresh" />
              You posted this book. Manage it in your Student Dashboard.
            </div>
          )}

          {/* Secondary Actions (Wishlist & Report) */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-border text-xs">
            <button
              onClick={handleWishlistToggle}
              className="flex items-center gap-1.5 font-semibold text-charcoal hover:text-forest transition"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-muted'}`} />
              <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="flex items-center gap-1.5 font-semibold text-charcoal-muted hover:text-red-600 transition"
            >
              <Flag className="w-4 h-4" />
              <span>Report Listing</span>
            </button>
          </div>

        </div>

      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-charcoal">Related Books & Guides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedBooks.map((rel) => (
              <BookCard key={rel.id} book={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Report Listing Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-elevated border border-surface-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-charcoal flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Report Listing
              </h3>
              <button onClick={() => setReportModalOpen(false)} className="text-charcoal-light hover:text-charcoal">
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-4 bg-mint text-forest text-center rounded-xl text-xs font-semibold">
                Report submitted for review. Thank you for keeping Swap Boi safe!
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <p className="text-xs text-charcoal-muted">
                  Please let us know why you are reporting <strong>{book.title}</strong>:
                </p>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-surface-border text-charcoal"
                >
                  <option value="Duplicate or misleading listing">Duplicate or misleading listing</option>
                  <option value="Incorrect academic edition / condition">Incorrect academic edition / condition</option>
                  <option value="Unresponsive seller">Unresponsive seller</option>
                  <option value="Suspected non-student commercial seller">Suspected non-student commercial seller</option>
                  <option value="Inappropriate content">Inappropriate content</option>
                </select>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-muted hover:bg-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
