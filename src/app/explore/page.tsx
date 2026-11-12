'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  BookOpen, 
  ChevronDown,
  Filter
} from 'lucide-react';
import BookCard from '@/components/BookCard';
import { store } from '@/lib/store';
import { Book, AcademicLevel, BookCondition, ListingType } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const typeParam = searchParams.get('type') || '';
  const catParam = searchParams.get('cat') || '';
  const levelParam = searchParams.get('level') || '';
  const locationParam = searchParams.get('location') || '';

  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(catParam);
  const [selectedLevel, setSelectedLevel] = useState<string>(levelParam);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('nearest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setBooks(store.getBooks());
    const unsubscribe = store.subscribe(() => {
      setBooks(store.getBooks());
    });
    return unsubscribe;
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedCondition('');
    setMaxRadiusKm(10);
    setSortBy('nearest');
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search text match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesSubject = book.subject.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesSubject) return false;
      }

      // Type match
      if (selectedType && book.listingType !== selectedType) {
        return false;
      }

      // Category match
      if (selectedCategory && book.category !== selectedCategory) {
        return false;
      }

      // Academic level match
      if (selectedLevel) {
        if (selectedLevel === 'university') {
          if (!book.academicLevel.includes('university')) return false;
        } else if (book.academicLevel !== selectedLevel) {
          return false;
        }
      }

      // Condition match
      if (selectedCondition && book.condition !== selectedCondition) {
        return false;
      }

      // Radius match
      if (book.distanceKm && book.distanceKm > maxRadiusKm) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nearest') {
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      }
      if (sortBy === 'price_low') {
        const pA = a.sellPrice || a.rentalWeeklyPrice || 0;
        const pB = b.sellPrice || b.rentalWeeklyPrice || 0;
        return pA - pB;
      }
      if (sortBy === 'price_high') {
        const pA = a.sellPrice || a.rentalWeeklyPrice || 0;
        const pB = b.sellPrice || b.rentalWeeklyPrice || 0;
        return pB - pA;
      }
      if (sortBy === 'popular') {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      return 0;
    });
  }, [books, searchTerm, selectedType, selectedCategory, selectedLevel, selectedCondition, maxRadiusKm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Search & Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-5 h-5 text-charcoal-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search books, authors, subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-border bg-white text-sm focus:outline-hidden focus:border-fresh text-charcoal"
          />
        </div>

        {/* Results Counter & Sort Dropdown matching Screen 2 */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-surface-border text-xs font-semibold text-charcoal"
          >
            <Filter className="w-4 h-4 text-forest" />
            <span>Filters</span>
          </button>

          <span className="text-xs sm:text-sm font-semibold text-charcoal-muted">
            <span className="text-forest font-bold">{filteredBooks.length}</span> Books Found
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-light hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-white border border-surface-border rounded-xl px-3 py-2 text-charcoal focus:outline-hidden cursor-pointer"
            >
              <option value="nearest">Nearest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start">
        
        {/* Left Filter Sidebar matching Screen 2 */}
        <aside className={`md:col-span-1 lg:col-span-1 bg-white p-5 rounded-2xl border border-surface-border shadow-soft space-y-6 ${
          mobileFilterOpen ? 'block' : 'hidden md:block'
        }`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-forest" />
              <h3 className="font-bold text-sm text-charcoal">Filters</h3>
            </div>
            <button
              onClick={handleClearFilters}
              className="text-xs text-fresh hover:text-forest font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Category</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { name: 'Textbook', count: 1240 },
                { name: 'Academic', count: 850 },
                { name: 'Reference', count: 421 },
                { name: 'Rental', count: 215 },
              ].map((c) => (
                <label key={c.name} className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-charcoal group-hover:text-forest">
                    <input
                      type="checkbox"
                      checked={selectedCategory === c.name}
                      onChange={() => setSelectedCategory(selectedCategory === c.name ? '' : c.name)}
                      className="rounded text-forest focus:ring-fresh"
                    />
                    <span>{c.name}</span>
                  </span>
                  <span className="text-[11px] text-charcoal-light">({c.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Academic Level */}
          <div className="space-y-2 pt-3 border-t border-surface-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Academic Level</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'SSC', val: 'ssc' },
                { label: 'HSC', val: 'hsc' },
                { label: 'University', val: 'university' },
                { label: 'O/A Levels', val: 'o_levels' },
              ].map((lvl) => (
                <label key={lvl.val} className="flex items-center gap-2 cursor-pointer text-charcoal hover:text-forest">
                  <input
                    type="checkbox"
                    checked={selectedLevel === lvl.val}
                    onChange={() => setSelectedLevel(selectedLevel === lvl.val ? '' : lvl.val)}
                    className="rounded text-forest focus:ring-fresh"
                  />
                  <span>{lvl.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2 pt-3 border-t border-surface-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Condition</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'New', val: 'new' },
                { label: 'Like New', val: 'like_new' },
                { label: 'Good', val: 'good' },
                { label: 'Acceptable', val: 'acceptable' },
              ].map((c) => (
                <label key={c.val} className="flex items-center gap-2 cursor-pointer text-charcoal hover:text-forest">
                  <input
                    type="checkbox"
                    checked={selectedCondition === c.val}
                    onChange={() => setSelectedCondition(selectedCondition === c.val ? '' : c.val)}
                    className="rounded text-forest focus:ring-fresh"
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Listing Type */}
          <div className="space-y-2 pt-3 border-t border-surface-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Listing Type</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'Sell', val: 'sell' },
                { label: 'Exchange', val: 'exchange' },
                { label: 'Rent', val: 'rent' },
                { label: 'Donate', val: 'donate' },
              ].map((t) => (
                <label key={t.val} className="flex items-center gap-2 cursor-pointer text-charcoal hover:text-forest">
                  <input
                    type="checkbox"
                    checked={selectedType === t.val}
                    onChange={() => setSelectedType(selectedType === t.val ? '' : t.val)}
                    className="rounded text-forest focus:ring-fresh"
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nearby Radius */}
          <div className="space-y-2 pt-3 border-t border-surface-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Distance</h4>
            <select
              value={maxRadiusKm}
              onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
              className="w-full text-xs font-medium bg-surface border border-surface-border rounded-xl px-2.5 py-2 text-charcoal focus:outline-hidden"
            >
              <option value={1}>Within 1 km</option>
              <option value={3}>Within 3 km</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={25}>Within 25 km</option>
            </select>
          </div>

        </aside>

        {/* Right Books Grid matching Screen 2 */}
        <main className="md:col-span-3 lg:col-span-4">
          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-surface-border p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-forest mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-charcoal">No books match your filters</h3>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                Try widening your distance radius, removing some category filters, or searching for broader subjects.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-forest">Loading books catalog...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
