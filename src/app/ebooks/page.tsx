'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { store } from '@/lib/store';
import { EBook } from '@/types';

export default function EBooksCatalogPage() {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'Academic' | 'Reference' | 'Free'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setEbooks(store.getEBooks());
  }, []);

  const filteredEbooks = ebooks.filter((eb) => {
    if (activeTab !== 'all' && eb.category !== activeTab) {
      if (activeTab === 'Free' && !eb.licenseType.toLowerCase().includes('open')) return false;
      if (activeTab !== 'Free' && eb.category !== activeTab) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        eb.title.toLowerCase().includes(q) ||
        eb.author.toLowerCase().includes(q) ||
        eb.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner matching Screen 10 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-forest" />
            E-Books Library (Read Online)
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
            Free & authorized digital textbooks, curriculum guides, and open academic references for Bangladeshi students.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-charcoal-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search e-books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-border bg-white text-xs text-charcoal focus:outline-hidden focus:border-fresh"
          />
        </div>
      </div>

      {/* Filter Tabs matching Screen 10: All | Academic | Reference | Free */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-2">
        {[
          { id: 'all', label: 'All E-Books' },
          { id: 'Academic', label: 'Academic' },
          { id: 'Reference', label: 'Reference' },
          { id: 'Free', label: 'Free Curriculum' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-forest text-white shadow-xs'
                : 'bg-white border border-surface-border text-charcoal hover:bg-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Legal & Educational Authorization Badge */}
      <div className="p-3.5 bg-mint-subtle border border-mint-border rounded-2xl flex items-center gap-3 text-xs text-forest">
        <ShieldCheck className="w-5 h-5 text-fresh shrink-0" />
        <span>
          <strong>Authorized Content Only:</strong> Swap Boi exclusively hosts authorized Open Educational Resources (OER), NCTB open curriculum books, and Creative Commons academic materials.
        </span>
      </div>

      {/* E-Books Grid matching Screen 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEbooks.map((eb) => (
          <div
            key={eb.id}
            className="bg-white rounded-3xl border border-surface-border p-5 shadow-soft hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              {/* E-Book Cover Card matching Screen 10 */}
              <div className={`aspect-16/10 rounded-2xl bg-linear-to-b ${eb.coverColor} p-5 text-white flex flex-col justify-between shadow-inner mb-4 relative overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {eb.subject}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
                    [PDF]
                  </span>
                </div>

                <div className="my-auto text-center">
                  <FileText className="w-8 h-8 text-white mx-auto mb-2 opacity-80" />
                  <h3 className="text-base sm:text-lg font-extrabold leading-tight">
                    {eb.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    {eb.author}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/90 border-t border-white/20 pt-2">
                  <span>{eb.pageCount} Pages</span>
                  <span>{eb.fileSizeMb} MB</span>
                </div>
              </div>

              {/* Meta */}
              <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2 mb-3">
                {eb.description}
              </p>
            </div>

            {/* Read Button matching Screen 10 */}
            <div className="pt-3 border-t border-surface-border flex items-center justify-between">
              <span className="text-[11px] text-charcoal-light flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {eb.readsCount} reads
              </span>
              <Link
                href={`/ebooks/${eb.id}`}
                className="px-5 py-2 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Read Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
