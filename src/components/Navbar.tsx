'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  PlusCircle, 
  MessageSquare, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { store } from '@/lib/store';
import { UserProfile } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(store.getWishlist().length);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setWishlistCount(store.getWishlist().length);
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Nearby', href: '/nearby' },
    { name: 'E-Books', href: '/ebooks' },
    { name: 'Rent', href: '/rentals' },
    { name: 'Donate', href: '/donate' },
    { name: 'About', href: '/about' },
  ];

  const handleSwitchUser = (userId: string) => {
    store.setCurrentUser(userId);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white shadow-sm group-hover:bg-fresh transition-colors">
              <BookOpen className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-forest flex items-center gap-1">
                Swap <span className="text-fresh">Boi</span>
              </span>
              <span className="hidden sm:block text-[10px] text-charcoal-muted tracking-tight -mt-1 font-medium">
                Student Marketplace
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-forest bg-mint font-semibold'
                      : 'text-charcoal-muted hover:text-forest hover:bg-surface'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              href="/dashboard/wishlist"
              className="relative p-2 rounded-lg text-charcoal-muted hover:text-forest hover:bg-surface transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-fresh text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Chat Link */}
            <Link
              href="/chat"
              className="relative p-2 rounded-lg text-charcoal-muted hover:text-forest hover:bg-surface transition-colors"
              title="Messages & Deals"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fresh rounded-full" />
            </Link>

            {/* Post a Book CTA Button */}
            <Link
              href="/post-book"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-fresh text-white text-sm font-semibold hover:bg-fresh-hover transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Book</span>
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-surface-border hover:bg-surface transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg ${currentUser.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                  {currentUser.avatarInitials}
                </div>
                <div className="hidden xl:block text-left text-xs">
                  <p className="font-semibold text-charcoal leading-none truncate max-w-[100px]">
                    {currentUser.fullName}
                  </p>
                  <p className="text-[10px] text-charcoal-light truncate max-w-[100px] mt-0.5">
                    {currentUser.institution.split(' ')[0]}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-charcoal-light mr-1" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-surface-border py-2 z-50">
                  <div className="px-4 py-3 border-b border-surface-border bg-mint-subtle rounded-t-2xl">
                    <p className="text-xs text-charcoal-light uppercase font-semibold">Active Profile</p>
                    <p className="text-sm font-bold text-forest truncate">{currentUser.fullName}</p>
                    <p className="text-xs text-charcoal-muted truncate">{currentUser.email}</p>
                    {currentUser.isVerified && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-forest bg-mint px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-fresh" /> Verified Student
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-mint hover:text-forest"
                    >
                      <User className="w-4 h-4 text-forest" />
                      Student Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-mint hover:text-forest"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-forest" />
                      My Public Profile
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-mint hover:text-forest font-semibold"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      Admin Dashboard
                    </Link>
                  </div>

                  {/* Quick Student Switcher for pairing demo */}
                  <div className="border-t border-surface-border px-4 py-2 bg-surface">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light mb-1.5">
                      Switch Student Persona
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleSwitchUser('user-tahmidur')}
                        className={`w-full text-left text-xs px-2 py-1 rounded flex items-center justify-between ${
                          currentUser.id === 'user-tahmidur' ? 'bg-mint text-forest font-bold' : 'hover:bg-white text-charcoal-muted'
                        }`}
                      >
                        <span>Tahmidur (AIUB)</span>
                        {currentUser.id === 'user-tahmidur' && <span className="text-[10px] bg-forest text-white px-1 rounded">Active</span>}
                      </button>
                      <button
                        onClick={() => handleSwitchUser('user-tanvir')}
                        className={`w-full text-left text-xs px-2 py-1 rounded flex items-center justify-between ${
                          currentUser.id === 'user-tanvir' ? 'bg-mint text-forest font-bold' : 'hover:bg-white text-charcoal-muted'
                        }`}
                      >
                        <span>Tanvir (AIUB Seller)</span>
                        {currentUser.id === 'user-tanvir' && <span className="text-[10px] bg-forest text-white px-1 rounded">Active</span>}
                      </button>
                      <button
                        onClick={() => handleSwitchUser('user-farhana')}
                        className={`w-full text-left text-xs px-2 py-1 rounded flex items-center justify-between ${
                          currentUser.id === 'user-farhana' ? 'bg-mint text-forest font-bold' : 'hover:bg-white text-charcoal-muted'
                        }`}
                      >
                        <span>Farhana (DU Student)</span>
                        {currentUser.id === 'user-farhana' && <span className="text-[10px] bg-forest text-white px-1 rounded">Active</span>}
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-surface-border pt-1">
                    <Link
                      href="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out / Switch Account
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-muted md:hidden hover:bg-surface"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-border bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal hover:bg-mint hover:text-forest"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-surface-border">
            <Link
              href="/post-book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-fresh text-white font-semibold"
            >
              <PlusCircle className="w-5 h-5" />
              Post a Book
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
