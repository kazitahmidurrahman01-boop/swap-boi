import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white pt-16 pb-12 border-t border-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-light/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-fresh flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Swap <span className="text-fresh-light">Boi</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
              Give Your Books a Second Life. Bangladesh&apos;s premier student-to-student textbook exchange, buy/sell, rental, and donation platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-mint">
              <ShieldCheck className="w-4 h-4 text-fresh-light" />
              <span>Campus Verified Students Only • Safe Peer-to-Peer</span>
            </div>
            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-fresh-light" /> Dhaka, Chittagong, Rajshahi, Sylhet & Across Bangladesh</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-fresh-light" /> support@swapboi.com.bd</p>
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fresh-light mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href="/explore" className="hover:text-white transition">Buy & Sell Textbooks</Link></li>
              <li><Link href="/explore?type=exchange" className="hover:text-white transition">Book Exchange</Link></li>
              <li><Link href="/rentals" className="hover:text-white transition">Semester Book Rental</Link></li>
              <li><Link href="/donate" className="hover:text-white transition">Free Book Donations</Link></li>
              <li><Link href="/ebooks" className="hover:text-white transition">Digital E-Book Library</Link></li>
              <li><Link href="/nearby" className="hover:text-white transition">Nearby Campus Discovery</Link></li>
            </ul>
          </div>

          {/* Academic Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fresh-light mb-4">
              Academic Levels
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href="/explore?level=ssc" className="hover:text-white transition">SSC Science & Commerce</Link></li>
              <li><Link href="/explore?level=hsc" className="hover:text-white transition">HSC 1st & 2nd Paper</Link></li>
              <li><Link href="/explore?level=university_undergrad" className="hover:text-white transition">Engineering (CSE / EEE)</Link></li>
              <li><Link href="/explore?level=university_undergrad" className="hover:text-white transition">BBA & Economics</Link></li>
              <li><Link href="/explore?level=o_levels" className="hover:text-white transition">O / A Levels (Edexcel/CIE)</Link></li>
              <li><Link href="/explore?level=university_undergrad" className="hover:text-white transition">Medical & Dental</Link></li>
            </ul>
          </div>

          {/* Quick Links & Admin */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fresh-light mb-4">
              Platform & Trust
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Swap Boi</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact & Support</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Student Dashboard</Link></li>
              <li><Link href="/admin" className="text-emerald-300 font-semibold hover:text-white transition">Admin Portal</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Swap Boi Bangladesh. Built for students, by students.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Campus Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
