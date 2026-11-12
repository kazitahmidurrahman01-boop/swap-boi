'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Repeat, 
  Calendar, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  BookOpen, 
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { store } from '@/lib/store';
import { ListingType, AcademicLevel, BookCondition } from '@/types';

export default function PostBookPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [listingType, setListingType] = useState<ListingType>('exchange');

  // Step 1: Basic Info
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Textbook');
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>('hsc');
  const [condition, setCondition] = useState<BookCondition>('like_new');
  const [coverColor, setCoverColor] = useState('from-emerald-700 via-teal-800 to-green-950');

  // Step 2: Specific Pricing & Location
  const [sellPrice, setSellPrice] = useState<number>(350);
  const [originalPrice, setOriginalPrice] = useState<number>(550);
  const [exchangePreferences, setExchangePreferences] = useState('');
  const [rentalWeeklyPrice, setRentalWeeklyPrice] = useState<number>(50);
  const [securityDeposit, setSecurityDeposit] = useState<number>(300);
  const [description, setDescription] = useState('');
  const [locationCity, setLocationCity] = useState('Dhaka');
  const [locationArea, setLocationArea] = useState('Kuril / AIUB Campus');

  const [published, setPublished] = useState(false);
  const [createdBookId, setCreatedBookId] = useState('');

  const coverPalettes = [
    { label: 'Emerald Forest', class: 'from-emerald-700 via-teal-800 to-green-950' },
    { label: 'Warm Amber', class: 'from-amber-700 via-rose-800 to-red-950' },
    { label: 'Deep Indigo', class: 'from-blue-900 via-indigo-950 to-slate-900' },
    { label: 'Royal Violet', class: 'from-purple-800 via-indigo-900 to-slate-950' },
    { label: 'Sunset Orange', class: 'from-orange-600 via-red-700 to-rose-900' },
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = store.addBook({
      title: title || 'HSC Mathematics 1st Paper',
      author: author || 'NCTB Curriculum Board',
      edition: edition || '2023 Edition',
      subject: subject || 'Mathematics',
      category,
      academicLevel,
      condition,
      listingType,
      sellPrice: listingType === 'sell' ? Number(sellPrice) : listingType === 'exchange' ? Number(sellPrice) : 0,
      originalPrice: Number(originalPrice) || undefined,
      exchangePreferences: listingType === 'exchange' ? (exchangePreferences || 'Open to similar syllabus books') : undefined,
      rentalDailyPrice: listingType === 'rent' ? Math.round(Number(rentalWeeklyPrice) / 7) : undefined,
      rentalWeeklyPrice: listingType === 'rent' ? Number(rentalWeeklyPrice) : undefined,
      securityDeposit: listingType === 'rent' ? Number(securityDeposit) : undefined,
      description: description || 'Textbook in great condition, well preserved with clean pages. Ready for campus handover.',
      coverColor,
      locationCity,
      locationArea,
      coordinates: { lat: 23.8223, lng: 90.4274 },
      distanceKm: 1.5,
      isAvailable: true,
      isModerated: true,
    });

    setCreatedBookId(newBook.id);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-mint text-forest flex items-center justify-center mx-auto shadow-card">
          <CheckCircle2 className="w-10 h-10 text-fresh" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-charcoal">Book Published Successfully!</h2>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto">
            Your book <strong>{title || 'HSC Mathematics 1st Paper'}</strong> is now live on the marketplace. Nearby students can view, buy, rent, or send exchange offers.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => router.push(`/book/${createdBookId}`)}
            className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition shadow-sm"
          >
            View Book Listing
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-white border border-surface-border hover:bg-surface text-charcoal text-xs font-bold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">Post a Book</h1>
        <p className="text-xs text-charcoal-muted mt-1">Share your books with fellow students in 3 quick steps</p>
      </div>

      {/* Stepper matching Screen 6 */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 text-xs font-semibold">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-forest' : 'text-charcoal-light'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-forest text-white' : 'bg-surface border border-surface-border'
          }`}>
            1
          </div>
          <span>Book Info</span>
        </div>
        <div className="w-8 h-px bg-surface-border" />

        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-forest' : 'text-charcoal-light'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-forest text-white' : 'bg-surface border border-surface-border'
          }`}>
            2
          </div>
          <span>Details & Price</span>
        </div>
        <div className="w-8 h-px bg-surface-border" />

        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-forest' : 'text-charcoal-light'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 3 ? 'bg-forest text-white' : 'bg-surface border border-surface-border'
          }`}>
            3
          </div>
          <span>Publish</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card">
        
        {/* STEP 1: BOOK INFO & LISTING TYPE (Screen 6) */}
        {step === 1 && (
          <div className="space-y-6">
            
            {/* Listing Type 4 Options matching Screen 6 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2.5">
                Listing Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'sell', label: 'Sell', icon: ShoppingBag, desc: 'Set a cash price' },
                  { id: 'exchange', label: 'Exchange', icon: Repeat, desc: 'Swap with another book' },
                  { id: 'rent', label: 'Rent', icon: Calendar, desc: 'Short-term semester loan' },
                  { id: 'donate', label: 'Donate', icon: Heart, desc: 'Give for free' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = listingType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setListingType(item.id as ListingType)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-forest bg-mint text-forest shadow-2xs font-bold ring-2 ring-forest/20'
                          : 'border-surface-border bg-white text-charcoal hover:bg-surface'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-forest text-white' : 'bg-surface text-charcoal-light'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold capitalize">{item.label}</span>
                      <span className="text-[10px] text-charcoal-light">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Book Title */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">Book Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. HSC Mathematics 1st Paper"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-hidden focus:border-fresh text-charcoal"
              />
            </div>

            {/* Author & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Author / Publisher</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. K. M. Tapan / NCTB"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden text-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Subject *</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden text-charcoal"
                />
              </div>
            </div>

            {/* Category & Academic Level matching Screen 6 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value="Textbook">Textbook</option>
                  <option value="Academic">Academic</option>
                  <option value="Reference">Reference</option>
                  <option value="Rental">Rental</option>
                  <option value="Literature">Literature / Fiction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Academic Level *</label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value as AcademicLevel)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value="hsc">HSC (Higher Secondary)</option>
                  <option value="ssc">SSC (Secondary)</option>
                  <option value="university_undergrad">University Undergrad</option>
                  <option value="university_postgrad">University Postgrad</option>
                  <option value="o_levels">O / A Levels</option>
                  <option value="other">General / Other</option>
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1.5">Condition *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'new', label: 'Brand New' },
                  { id: 'like_new', label: 'Like New' },
                  { id: 'good', label: 'Good' },
                  { id: 'acceptable', label: 'Acceptable' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCondition(c.id as BookCondition)}
                    className={`py-2 px-3 rounded-xl border text-center transition ${
                      condition === c.id
                        ? 'border-forest bg-mint text-forest font-bold'
                        : 'border-surface-border hover:bg-surface text-charcoal'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Color Theme Picker */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1.5">Cover Visual Theme</label>
              <div className="flex items-center gap-3">
                {coverPalettes.map((pal) => (
                  <button
                    key={pal.class}
                    type="button"
                    onClick={() => setCoverColor(pal.class)}
                    className={`w-9 h-9 rounded-xl bg-linear-to-b ${pal.class} border-2 transition ${
                      coverColor === pal.class ? 'border-forest scale-110 shadow-sm' : 'border-transparent'
                    }`}
                    title={pal.label}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4 border-t border-surface-border">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <span>Next: Details & Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: DETAILS & PRICING */}
        {step === 2 && (
          <div className="space-y-6">
            
            {/* Conditional Fields based on listingType */}
            {listingType === 'sell' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Selling Price (৳ BDT) *</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm font-bold text-forest focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Original Price (৳ BDT)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-charcoal focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {listingType === 'exchange' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">What books would you like to exchange for?</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for HSC Physics 2nd Paper or Class 12 Biology Guide..."
                    value={exchangePreferences}
                    onChange={(e) => setExchangePreferences(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-charcoal focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Estimated Book Value (৳ BDT)</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-forest font-bold focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {listingType === 'rent' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Rental Fee (৳ / 7 days) *</label>
                  <input
                    type="number"
                    value={rentalWeeklyPrice}
                    onChange={(e) => setRentalWeeklyPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-forest font-bold focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Security Deposit (Refundable ৳) *</label>
                  <input
                    type="number"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-charcoal focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {listingType === 'donate' && (
              <div className="bg-mint-subtle p-4 rounded-2xl border border-mint-border space-y-2">
                <p className="text-xs font-bold text-forest">Free Student Donation</p>
                <p className="text-xs text-charcoal-muted">
                  This book will be listed for ৳0 so junior students or peers facing financial hardship can request it freely.
                </p>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">Book Condition & Highlights</label>
              <textarea
                rows={3}
                placeholder="Mention any pencil markings, highlighted chapters, completeness of question solutions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-charcoal focus:outline-hidden"
              />
            </div>

            {/* Location Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">City *</label>
                <select
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-hidden bg-white text-charcoal"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Campus / Pickup Area *</label>
                <input
                  type="text"
                  placeholder="e.g. Kuril / AIUB Campus or Dhanmondi 27"
                  value={locationArea}
                  onChange={(e) => setLocationArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-xs text-charcoal focus:outline-hidden"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-charcoal text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <span>Review & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: PUBLISH REVIEW */}
        {step === 3 && (
          <form onSubmit={handlePublish} className="space-y-6">
            
            <h3 className="font-bold text-sm text-charcoal">Review Your Listing Summary</h3>

            {/* Summary Preview Box */}
            <div className="bg-surface p-5 rounded-2xl border border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              
              <div className={`aspect-3/4 rounded-xl bg-linear-to-b ${coverColor} p-4 text-white flex flex-col justify-between shadow-soft`}>
                <span className="text-[10px] uppercase font-bold tracking-wider">{subject || 'Academic'}</span>
                <div>
                  <p className="font-extrabold text-sm leading-tight">{title || 'Untitled Book'}</p>
                  <p className="text-[10px] text-white/80 mt-1">{author || 'Author'}</p>
                </div>
                <span className="text-[9px] bg-white/20 px-1 py-0.5 rounded capitalize">{academicLevel}</span>
              </div>

              <div className="sm:col-span-2 space-y-2 text-xs">
                <p><strong>Title:</strong> {title || 'HSC Mathematics 1st Paper'}</p>
                <p><strong>Listing Type:</strong> <span className="uppercase text-forest font-bold">{listingType}</span></p>
                {listingType === 'sell' && <p><strong>Price:</strong> ৳{sellPrice}</p>}
                {listingType === 'exchange' && <p><strong>Desired Swap:</strong> {exchangePreferences || 'Open to offers'}</p>}
                {listingType === 'rent' && <p><strong>Rent:</strong> ৳{rentalWeeklyPrice}/week (Deposit: ৳{securityDeposit})</p>}
                <p><strong>Condition:</strong> <span className="capitalize">{condition}</span></p>
                <p><strong>Location:</strong> {locationArea}, {locationCity}</p>
                <p className="text-charcoal-muted line-clamp-2"><strong>Notes:</strong> {description || 'Standard condition.'}</p>
              </div>

            </div>

            <div className="p-3 bg-mint rounded-xl text-xs text-forest flex items-center gap-2">
              <Check className="w-4 h-4 text-fresh shrink-0" />
              <span>By publishing, you agree to meet peers in safe, public student campus areas.</span>
            </div>

            {/* Publish & Back Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-charcoal text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-fresh hover:bg-fresh-hover text-white text-xs font-extrabold shadow-card transition"
              >
                Publish Book Now
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
