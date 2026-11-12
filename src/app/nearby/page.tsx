'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Sliders, 
  Layers, 
  Compass, 
  Navigation, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { store } from '@/lib/store';
import { Book } from '@/types';
import { formatBDT, formatDistance, getListingTypeBadge } from '@/lib/utils';
import BookCard from '@/components/BookCard';

export default function NearbyPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(5);
  const [selectedCity, setSelectedCity] = useState<string>('Dhaka - Kuril & AIUB');
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');
  const [activePinBook, setActivePinBook] = useState<Book | null>(null);

  useEffect(() => {
    setBooks(store.getBooks());
    const unsubscribe = store.subscribe(() => {
      setBooks(store.getBooks());
    });
    return unsubscribe;
  }, []);

  const nearbyBooks = useMemo(() => {
    return books.filter((b) => (b.distanceKm || 0) <= selectedRadius).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [books, selectedRadius]);

  const campusHubs = [
    { name: 'Dhaka - Kuril & AIUB', lat: 23.8223, lng: 90.4274 },
    { name: 'Dhaka - Nilkhet & DU', lat: 23.7335, lng: 90.3929 },
    { name: 'Dhaka - Palashi & BUET', lat: 23.7265, lng: 90.3888 },
    { name: 'Dhaka - Dhanmondi', lat: 23.7465, lng: 90.3760 },
    { name: 'Dhaka - Mirpur 10', lat: 23.8068, lng: 90.3687 },
    { name: 'Dhaka - Uttara Sector 3', lat: 23.8680, lng: 90.3980 },
    { name: 'Chittagong - Agrabad & CU', lat: 22.3350, lng: 91.8150 },
    { name: 'Sylhet - Zindabazar & SUST', lat: 24.9000, lng: 91.8700 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header matching Screen 9 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-border">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-forest" />
            Nearby Books Discovery
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Discover peer textbooks within walking distance of your campus. Exact residential locations remain private.
          </p>
        </div>

        {/* View Switch matching Screen 9: List | Map */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-surface-border self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'both' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'map' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'list' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Filter Sidebar matching Screen 9 */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-3xl border border-surface-border shadow-soft space-y-6">
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-3">
              Search Radius
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Within 1 km', val: 1 },
                { label: 'Within 3 km', val: 3 },
                { label: 'Within 5 km', val: 5 },
                { label: 'Within 10 km', val: 10 },
              ].map((rad) => (
                <label
                  key={rad.val}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                    selectedRadius === rad.val
                      ? 'border-forest bg-mint text-forest font-bold shadow-2xs'
                      : 'border-surface-border hover:bg-surface text-charcoal text-xs font-medium'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radius"
                      checked={selectedRadius === rad.val}
                      onChange={() => setSelectedRadius(rad.val)}
                      className="text-forest focus:ring-fresh"
                    />
                    <span>{rad.label}</span>
                  </span>
                  <span className="text-[10px] text-charcoal-light">
                    {books.filter((b) => (b.distanceKm || 0) <= rad.val).length} books
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Selector */}
          <div className="space-y-2 pt-4 border-t border-surface-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Select Campus Hub
            </h3>
            <div className="relative">
              <MapPin className="w-4 h-4 text-forest absolute left-3 top-3 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold bg-surface border border-surface-border rounded-xl text-charcoal focus:outline-hidden"
              >
                {campusHubs.map((hub) => (
                  <option key={hub.name} value={hub.name}>{hub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Note matching specifications */}
          <div className="bg-mint-subtle p-3.5 rounded-2xl border border-mint-border text-xs text-forest space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-fresh" /> Location Privacy
            </p>
            <p className="text-[11px] text-charcoal-muted leading-relaxed">
              We never disclose students&apos; residential addresses. All pins are fuzzily positioned around university campuses and public junctions.
            </p>
          </div>

        </aside>

        {/* Center / Right: Interactive Radar & Map + Side List */}
        <div className={`lg:col-span-9 grid grid-cols-1 ${
          viewMode === 'both' ? 'xl:grid-cols-12' : ''
        } gap-6`}>
          
          {/* Interactive Radar Map View matching Screen 9 */}
          {(viewMode === 'both' || viewMode === 'map') && (
            <div className={`${viewMode === 'both' ? 'xl:col-span-7' : 'w-full'} bg-white rounded-3xl border border-surface-border p-4 shadow-card flex flex-col justify-between relative overflow-hidden min-h-[460px]`}>
              
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-fresh" />
                  Live Campus Radar ({selectedRadius} km range)
                </span>
                <span className="text-[11px] font-semibold text-forest bg-mint px-2 py-0.5 rounded-full">
                  {nearbyBooks.length} Books Found
                </span>
              </div>

              {/* Radar Graphical Map Container */}
              <div className="relative my-auto w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center select-none py-6">
                
                {/* Concentric green distance circles matching Screen 9 */}
                <div className="absolute w-[360px] h-[360px] rounded-full border border-forest/20 bg-forest/5 flex items-center justify-center">
                  <span className="absolute top-2 text-[9px] font-mono font-bold text-forest/70">{selectedRadius} KM</span>
                </div>
                
                <div className="absolute w-[260px] h-[260px] rounded-full border border-fresh/30 bg-fresh/5 flex items-center justify-center">
                  <span className="absolute top-2 text-[9px] font-mono font-bold text-fresh/80">{Math.round(selectedRadius * 0.6)} KM</span>
                </div>

                <div className="absolute w-[160px] h-[160px] rounded-full border border-fresh/40 bg-fresh/10 flex items-center justify-center">
                  <span className="absolute top-2 text-[9px] font-mono font-bold text-fresh">{Math.round(selectedRadius * 0.3)} KM</span>
                </div>

                {/* Radar Sweeping Beam */}
                <div className="absolute w-[360px] h-[360px] rounded-full overflow-hidden pointer-events-none">
                  <div className="w-1/2 h-1/2 origin-bottom-right bg-linear-to-tl from-fresh/20 to-transparent animate-[spin_10s_linear_infinite]" />
                </div>

                {/* Center User Campus Marker */}
                <div className="relative z-20 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-forest/20">
                  <MapPin className="w-4 h-4" />
                </div>

                {/* Interactive Book Pins scattered by relative distance */}
                {nearbyBooks.map((b, idx) => {
                  // Project polar coordinates to map area
                  const angle = (idx * 65 + 30) * (Math.PI / 180);
                  const distFraction = Math.min(0.9, (b.distanceKm || 1) / selectedRadius);
                  const radiusPx = 160 * distFraction;
                  const x = Math.cos(angle) * radiusPx;
                  const y = Math.sin(angle) * radiusPx;

                  return (
                    <button
                      key={b.id}
                      onClick={() => setActivePinBook(b)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute z-30 group p-1 transition-transform hover:scale-110"
                      title={`${b.title} (${b.distanceKm} km)`}
                    >
                      <div className="bg-forest text-white text-[10px] font-bold px-2 py-1 rounded-xl shadow-md border border-white flex items-center gap-1 group-hover:bg-fresh">
                        <BookOpen className="w-3 h-3 text-white" />
                        <span className="truncate max-w-[80px]">{b.title.split(' ')[0]}</span>
                        <span className="text-mint font-normal">{b.distanceKm}km</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pin Inspection Card */}
              {activePinBook && (
                <div className="p-3 bg-mint-subtle border border-mint-border rounded-2xl flex items-center justify-between gap-3 animate-fade-in">
                  <div>
                    <p className="text-xs font-bold text-charcoal">{activePinBook.title}</p>
                    <p className="text-[11px] text-charcoal-muted">
                      {formatBDT(activePinBook.sellPrice)} • {formatDistance(activePinBook.distanceKm)} at {activePinBook.locationArea}
                    </p>
                  </div>
                  <Link
                    href={`/book/${activePinBook.id}`}
                    className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-bold flex items-center gap-1 hover:bg-forest-light shrink-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

            </div>
          )}

          {/* Right Side List View matching Screen 9 */}
          {(viewMode === 'both' || viewMode === 'list') && (
            <div className={`${viewMode === 'both' ? 'xl:col-span-5' : 'w-full'} space-y-3`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted px-1">
                Nearby Student Listings
              </h3>

              <div className="space-y-2.5">
                {nearbyBooks.map((b) => {
                  const typeBadge = getListingTypeBadge(b.listingType);
                  return (
                    <Link
                      key={b.id}
                      href={`/book/${b.id}`}
                      className="block p-3.5 bg-white rounded-2xl border border-surface-border hover:border-mint-border shadow-soft hover:shadow-card transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-16 rounded-xl bg-linear-to-b ${b.coverColor} flex items-center justify-center text-white shrink-0 shadow-2xs group-hover:scale-105 transition`}>
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-charcoal group-hover:text-forest truncate">
                            {b.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-forest font-bold mt-1">
                            <span>{formatBDT(b.sellPrice || b.rentalWeeklyPrice)}</span>
                            <span className="text-charcoal-light font-normal">•</span>
                            <span className={`capitalize font-medium ${typeBadge.text}`}>{b.listingType}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-charcoal-light mt-1.5 pt-1 border-t border-surface-border">
                            <span className="truncate">{b.locationArea}</span>
                            <span className="font-semibold text-charcoal shrink-0">{formatDistance(b.distanceKm)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
