'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  Repeat, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Check, 
  X, 
  Eye, 
  Search,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { store } from '@/lib/store';
import { UserProfile, Book, UserReport, Offer } from '@/types';
import { formatBDT } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'books' | 'deals' | 'reports'>('overview');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [stats, setStats] = useState(store.getStats());

  useEffect(() => {
    const refresh = () => {
      setBooks(store.getBooks());
      setReports(store.getReports());
      setOffers(store.getOffers());
      setStats(store.getStats());
    };
    refresh();
    const unsubscribe = store.subscribe(refresh);
    return unsubscribe;
  }, []);

  const handleVerifyStudent = (userId: string, isVerified: boolean) => {
    store.verifyStudent(userId, isVerified);
  };

  const handleModerateBook = (bookId: string, isAvailable: boolean) => {
    store.updateBook(bookId, { isAvailable, isModerated: true });
  };

  const handleResolveReport = (reportId: string, status: UserReport['status']) => {
    store.updateReportStatus(reportId, status);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-surface py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Navigation Bar matching Screen 14 */}
        <div className="bg-forest-dark text-white rounded-3xl p-5 mb-6 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fresh flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                Swap Boi <span className="text-fresh-light font-mono text-sm px-2 py-0.5 rounded bg-white/10 ml-1">ADMIN</span>
              </span>
              <p className="text-[11px] text-gray-300">Campus Trust, Student Verification & Marketplace Moderation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-mint px-3 py-1 rounded-full bg-white/10 font-mono">
              System: Operational (PostgreSQL / Supabase Ready)
            </span>
            <Link
              href="/dashboard"
              className="text-xs font-semibold bg-white text-forest px-3 py-1.5 rounded-xl hover:bg-mint transition"
            >
              Back to App
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Admin Menu matching Screen 14 */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-3xl border border-surface-border shadow-soft space-y-1.5">
            {[
              { id: 'overview', label: 'Dashboard', icon: TrendingUp },
              { id: 'users', label: 'Student Verification', icon: Users, badge: '2 Pending' },
              { id: 'books', label: 'Book Moderation', icon: BookOpen, badge: `${books.length}` },
              { id: 'deals', label: 'Deals & Exchanges', icon: Repeat },
              { id: 'reports', label: 'Reports & Safety', icon: AlertTriangle, badge: `${reports.filter(r => r.status === 'pending').length}` },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isSel
                      ? 'bg-forest text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-surface'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isSel ? 'bg-white/20 text-white' : 'bg-surface text-charcoal'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Right Main Admin Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* OVERVIEW TAB matching Screen 14 */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 4 Stat Cards matching Screen 14 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-light">Total Users</span>
                    <p className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono mt-1">12,430</p>
                    <span className="text-[10px] text-fresh font-semibold flex items-center gap-1 mt-1">
                      +14% from last month
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-light">Books Listed</span>
                    <p className="text-2xl sm:text-3xl font-extrabold text-forest font-mono mt-1">8,750</p>
                    <span className="text-[10px] text-fresh font-semibold flex items-center gap-1 mt-1">
                      +85 added today
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-light">Deals Completed</span>
                    <p className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono mt-1">2,340</p>
                    <span className="text-[10px] text-fresh font-semibold flex items-center gap-1 mt-1">
                      100% verified swaps
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-light">Active Rentals</span>
                    <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1">420</p>
                    <span className="text-[10px] text-charcoal-light font-semibold flex items-center gap-1 mt-1">
                      ৳126,000 deposits held
                    </span>
                  </div>
                </div>

                {/* Platform Activity Chart Visualization matching Screen 14 */}
                <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                    <div>
                      <h3 className="font-extrabold text-sm text-charcoal">Platform Activity (30 Days)</h3>
                      <p className="text-xs text-charcoal-muted">Monthly trend of new student registrations vs textbook listings</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-forest">
                        <span className="w-3 h-3 rounded-full bg-forest inline-block" /> Listings
                      </span>
                      <span className="flex items-center gap-1.5 text-fresh">
                        <span className="w-3 h-3 rounded-full bg-fresh inline-block" /> Users
                      </span>
                    </div>
                  </div>

                  {/* SVG Line / Area Graph Simulation matching Screen 14 chart */}
                  <div className="h-48 w-full flex items-end justify-between gap-1 pt-6 px-2 select-none">
                    {[40, 55, 45, 68, 75, 60, 85, 92, 88, 110, 105, 128, 140, 135, 150].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          style={{ height: `${(val / 150) * 100}%` }}
                          className="w-full bg-linear-to-t from-forest to-fresh rounded-t-md opacity-85 group-hover:opacity-100 transition-all relative"
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold bg-charcoal text-white px-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            {val * 18}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-charcoal-light">{i * 2 + 1}d</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft space-y-2">
                    <h4 className="font-bold text-xs text-charcoal">Pending Safety Reports</h4>
                    <p className="text-xs text-charcoal-muted">
                      {reports.filter((r) => r.status === 'pending').length} reports await moderation review.
                    </p>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="text-xs font-bold text-forest hover:text-fresh flex items-center gap-1 pt-1"
                    >
                      <span>Review reports</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft space-y-2">
                    <h4 className="font-bold text-xs text-charcoal">Student ID Verifications</h4>
                    <p className="text-xs text-charcoal-muted">
                      AIUB, DU, and BUET students requesting green verified badges.
                    </p>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="text-xs font-bold text-forest hover:text-fresh flex items-center gap-1 pt-1"
                    >
                      <span>Verify student IDs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* USERS / STUDENT VERIFICATION TAB */}
            {activeTab === 'users' && (
              <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div>
                    <h3 className="font-bold text-base text-charcoal">Student ID Verification Queue</h3>
                    <p className="text-xs text-charcoal-muted">Review student institutional emails and campus IDs</p>
                  </div>
                </div>

                <div className="divide-y divide-surface-border">
                  {[
                    { id: 'user-tahmidur', name: 'Kazi Tahmidur Rahman', institution: 'AIUB (CSE)', idNo: '22-47891-2', verified: true },
                    { id: 'user-tanvir', name: 'Tanvir Hasan', institution: 'AIUB (Software Eng)', idNo: '21-45612-1', verified: true },
                    { id: 'user-farhana', name: 'Farhana Akter', institution: 'Dhaka University (Physics)', idNo: 'DU-PHYS-89', verified: false },
                    { id: 'user-shahriar', name: 'Shahriar Kabir', institution: 'BUET (EEE)', idNo: 'BUET-2006112', verified: true },
                  ].map((st) => (
                    <div key={st.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-forest text-white font-bold text-xs flex items-center justify-center">
                          {st.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-charcoal flex items-center gap-1">
                            {st.name}
                            {st.verified && <ShieldCheck className="w-3.5 h-3.5 text-fresh" />}
                          </p>
                          <p className="text-[11px] text-charcoal-muted">{st.institution} • Student ID: {st.idNo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {st.verified ? (
                          <span className="text-[11px] font-semibold text-forest bg-mint px-2.5 py-1 rounded-lg">
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => handleVerifyStudent(st.id, true)}
                            className="px-3 py-1 rounded-lg bg-fresh text-white text-xs font-bold hover:bg-fresh-hover transition"
                          >
                            Approve Badge
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOOKS MODERATION TAB */}
            {activeTab === 'books' && (
              <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div>
                    <h3 className="font-bold text-base text-charcoal">Marketplace Listings Moderation</h3>
                    <p className="text-xs text-charcoal-muted">Ensure all posted books comply with copyright and student guidelines</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {books.map((b) => (
                    <div key={b.id} className="p-3.5 bg-surface rounded-2xl border border-surface-border flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-14 rounded-lg bg-linear-to-b ${b.coverColor} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-charcoal truncate">{b.title}</p>
                          <p className="text-[11px] text-charcoal-muted">
                            {formatBDT(b.sellPrice || b.rentalWeeklyPrice)} • {b.listingType.toUpperCase()} • By {b.user.fullName}
                          </p>
                          <span className="text-[10px] text-charcoal-light">{b.locationArea}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/book/${b.id}`}
                          className="p-1.5 rounded-lg border border-surface-border hover:bg-white text-charcoal text-xs"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleModerateBook(b.id, !b.isAvailable)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            b.isAvailable ? 'bg-amber-100 text-amber-800' : 'bg-mint text-forest'
                          }`}
                        >
                          {b.isAvailable ? 'Unpublish' : 'Make Active'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEALS TAB */}
            {activeTab === 'deals' && (
              <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <h3 className="font-bold text-base text-charcoal">All Campus Deals & Swaps</h3>
                  <span className="text-xs text-charcoal-muted font-semibold">{offers.length} active deals</span>
                </div>

                <div className="space-y-3">
                  {offers.map((off) => (
                    <div key={off.id} className="p-4 bg-surface rounded-2xl border border-surface-border flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-forest uppercase">{off.offerType} Offer</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            off.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {off.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-charcoal mt-1">
                          Book: <strong>{off.book.title}</strong>
                        </p>
                        <p className="text-[11px] text-charcoal-muted">
                          Between {off.sender.fullName} and {off.receiver.fullName}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-forest">
                          {off.offeredBook ? `Swap: ${off.offeredBook.title}` : `Amount: ৳${off.offeredCash}`}
                        </p>
                        <p className="text-[10px] text-charcoal-light">{off.meetingLocation || 'Campus meetup'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
              <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <h3 className="font-bold text-base text-charcoal">Student Complaints & Safety Reports</h3>
                </div>

                <div className="space-y-3">
                  {reports.map((rep) => (
                    <div key={rep.id} className="p-4 bg-surface rounded-2xl border border-surface-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> {rep.reason}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                          rep.status === 'resolved' ? 'bg-mint text-forest' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal">
                        Reported Item: <strong>{rep.reportedBookTitle || 'Book listing'}</strong> by student <strong>{rep.reportedUserName || 'User'}</strong>
                      </p>
                      <p className="text-[11px] text-charcoal-muted bg-white p-2.5 rounded-xl border border-surface-border">
                        &ldquo;{rep.details}&rdquo; — Filed by {rep.reporterName}
                      </p>
                      {rep.status === 'pending' && (
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => handleResolveReport(rep.id, 'dismissed')}
                            className="px-3 py-1 rounded-lg border text-xs font-semibold text-charcoal hover:bg-white"
                          >
                            Dismiss
                          </button>
                          <button
                            onClick={() => handleResolveReport(rep.id, 'resolved')}
                            className="px-3 py-1 rounded-lg bg-forest text-white text-xs font-bold hover:bg-forest-light"
                          >
                            Resolve & Warn
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
