'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  BookOpen, 
  Repeat, 
  Heart, 
  Calendar, 
  Gift, 
  Settings, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Edit3, 
  CheckCircle2, 
  Mail, 
  Phone,
  Clock
} from 'lucide-react';
import { store } from '@/lib/store';
import { UserProfile, Book, Review } from '@/types';
import BookCard from '@/components/BookCard';

export default function StudentProfilePage() {
  const [user, setUser] = useState<UserProfile>(store.getCurrentUser());
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'rentals' | 'donations'>('listings');
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit Form state
  const [fullName, setFullName] = useState(user.fullName);
  const [institution, setInstitution] = useState(user.institution);
  const [department, setDepartment] = useState(user.department || '');
  const [bio, setBio] = useState(user.bio);
  const [locationArea, setLocationArea] = useState(user.locationArea);

  useEffect(() => {
    const loadData = () => {
      const current = store.getCurrentUser();
      setUser(current);
      setFullName(current.fullName);
      setInstitution(current.institution);
      setDepartment(current.department || '');
      setBio(current.bio);
      setLocationArea(current.locationArea);

      const all = store.getBooks();
      setMyBooks(all.filter((b) => b.userId === current.id));
      setReviews(store.getReviews());
    };

    loadData();
    const unsubscribe = store.subscribe(loadData);
    return unsubscribe;
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateUserProfile({
      fullName,
      institution,
      department,
      bio,
      locationArea,
    });
    setIsEditing(false);
  };

  const userRentals = myBooks.filter((b) => b.listingType === 'rent');
  const userDonations = myBooks.filter((b) => b.listingType === 'donate');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar matching Screen 5 */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-surface-border p-5 shadow-soft space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light px-3 mb-2">Student Menu</p>
          
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-mint text-forest font-bold text-xs"
          >
            <User className="w-4 h-4 text-fresh" />
            <span>My Profile</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <BookOpen className="w-4 h-4 text-charcoal-light" />
            <span>My Listings</span>
          </Link>

          <Link
            href="/dashboard/offers"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <Repeat className="w-4 h-4 text-charcoal-light" />
            <span>My Offers & Deals</span>
          </Link>

          <Link
            href="/dashboard/wishlist"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <Heart className="w-4 h-4 text-charcoal-light" />
            <span>Wishlist</span>
          </Link>

          <Link
            href="/rentals"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <Calendar className="w-4 h-4 text-charcoal-light" />
            <span>Rented Books</span>
          </Link>

          <Link
            href="/donate"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <Gift className="w-4 h-4 text-charcoal-light" />
            <span>Donated Books</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface text-charcoal font-medium text-xs transition"
          >
            <Settings className="w-4 h-4 text-charcoal-light" />
            <span>Settings</span>
          </Link>
        </aside>

        {/* Right Main Profile Area matching Screen 5 */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Profile Card */}
          <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-card">
            
            {/* Curved Green Banner */}
            <div className="h-28 sm:h-36 bg-linear-to-r from-forest-dark via-forest to-fresh relative p-6 flex items-end">
              <div className="absolute right-6 top-6 text-white/20">
                <BookOpen className="w-24 h-24 stroke-1" />
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="px-6 pb-6 pt-0 relative">
              
              {/* Profile Avatar & Header Actions */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
                
                {/* Initials-based avatar (Zero Human photo strictly maintained) */}
                <div className="flex items-end gap-4">
                  <div className={`w-24 h-24 rounded-2xl ${user.avatarBg} text-white font-extrabold text-2xl flex items-center justify-center border-4 border-white shadow-elevated`}>
                    {user.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">{user.fullName}</h1>
                      {user.isVerified && (
                        <span title="Verified Student">
                          <ShieldCheck className="w-5 h-5 text-fresh fill-mint" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted">
                      {user.institution} • {user.department || 'Undergraduate'}
                    </p>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-xl bg-white border border-surface-border hover:bg-surface text-xs font-semibold text-charcoal shadow-soft flex items-center gap-1.5 transition self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5 text-forest" />
                  <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Edit Profile Form Modal / Inline */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="bg-surface p-5 rounded-2xl border border-surface-border space-y-4 my-4">
                  <h3 className="font-bold text-sm text-charcoal">Update Profile Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-white text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1">Institution</label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-white text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1">Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-white text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1">Campus / Area</label>
                      <input
                        type="text"
                        value={locationArea}
                        onChange={(e) => setLocationArea(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-white text-charcoal"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal block mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-white text-charcoal"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-muted"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest text-white hover:bg-forest-light shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Profile Stats Row matching Screen 5: 24 Listings • 18 Deals • 4.9 Rating */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-surface-border my-4 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-charcoal font-mono">{user.booksListed || myBooks.length}</p>
                  <p className="text-[11px] font-semibold text-charcoal-light uppercase tracking-wider">Listings</p>
                </div>
                <div className="border-x border-surface-border">
                  <p className="text-xl sm:text-2xl font-extrabold text-forest font-mono">{user.dealsCompleted}</p>
                  <p className="text-[11px] font-semibold text-charcoal-light uppercase tracking-wider">Deals</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-600 flex items-center justify-center gap-1 font-mono">
                    <Star className="w-5 h-5 fill-current" /> {user.ratingScore}
                  </p>
                  <p className="text-[11px] font-semibold text-charcoal-light uppercase tracking-wider">Rating</p>
                </div>
              </div>

              {/* About Me Section matching Screen 5 */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">About Me</h3>
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed bg-surface/80 p-3.5 rounded-xl border border-surface-border">
                  {user.bio}
                </p>
              </div>

              {/* Extra Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-muted mt-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-fresh" /> {user.locationArea}, {user.locationCity}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-fresh" /> Member since {user.joinedDate}
                </span>
                <span className="flex items-center gap-1.5 text-forest font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-fresh" /> ID: {user.studentIdNumber || 'Verified by Admin'}
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Tabs for Profile Activity */}
          <div className="space-y-4">
            
            <div className="flex items-center gap-2 border-b border-surface-border pb-1">
              {[
                { id: 'listings', label: `My Listings (${myBooks.length})` },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'rentals', label: `Rentals (${userRentals.length})` },
                { id: 'donations', label: `Donations (${userDonations.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    activeTab === tab.id
                      ? 'bg-forest text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Listings */}
            {activeTab === 'listings' && (
              <div>
                {myBooks.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-surface-border text-center space-y-3">
                    <BookOpen className="w-8 h-8 text-charcoal-light mx-auto" />
                    <p className="text-xs text-charcoal-muted">You haven&apos;t posted any books yet.</p>
                    <Link href="/post-book" className="inline-block px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold">
                      Post Your First Book
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {myBooks.map((b) => (
                      <BookCard key={b.id} book={b} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-4 rounded-2xl border border-surface-border shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${rev.reviewer.avatarBg} text-white font-bold text-xs flex items-center justify-center`}>
                          {rev.reviewer.avatarInitials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-charcoal">{rev.reviewer.fullName}</p>
                          <p className="text-[10px] text-charcoal-light">{rev.reviewer.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-600 text-xs font-bold gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> {rev.rating}.0
                      </div>
                    </div>
                    <p className="text-xs text-charcoal leading-relaxed pl-10">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Rentals */}
            {activeTab === 'rentals' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {userRentals.length > 0 ? (
                  userRentals.map((b) => <BookCard key={b.id} book={b} />)
                ) : (
                  <p className="text-xs text-charcoal-muted col-span-3 py-6 text-center">No active rental books.</p>
                )}
              </div>
            )}

            {/* Tab 4: Donations */}
            {activeTab === 'donations' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {userDonations.length > 0 ? (
                  userDonations.map((b) => <BookCard key={b.id} book={b} />)
                ) : (
                  <p className="text-xs text-charcoal-muted col-span-3 py-6 text-center">No donated books posted yet.</p>
                )}
              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}
