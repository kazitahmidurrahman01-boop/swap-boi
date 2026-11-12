'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  List,
  ShieldCheck
} from 'lucide-react';
import { store } from '@/lib/store';
import { EBook } from '@/types';

export default function EBookReaderPage() {
  const params = useParams();
  const router = useRouter();
  const ebookId = params.id as string;

  const [ebook, setEbook] = useState<EBook | undefined>(undefined);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number>(16);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [bookmarked, setBookmarked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const eb = store.getEBookById(ebookId);
    setEbook(eb);
  }, [ebookId]);

  if (!ebook) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <p className="text-sm text-charcoal">E-Book not found.</p>
        <Link href="/ebooks" className="text-forest underline text-xs font-bold mt-2 inline-block">
          Return to E-Book Library
        </Link>
      </div>
    );
  }

  const currentChapter = ebook.chapters[currentChapterIndex] || ebook.chapters[0];

  const themeClasses = {
    light: 'bg-white text-gray-900 border-surface-border',
    sepia: 'bg-[#FBF0D9] text-[#5F4B32] border-[#E8DCC4]',
    dark: 'bg-[#181C1A] text-gray-200 border-[#2C3330]',
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] flex flex-col transition-colors ${
      theme === 'dark' ? 'bg-[#121614]' : theme === 'sepia' ? 'bg-[#F4EBD0]' : 'bg-surface'
    }`}>
      
      {/* Top Reader Controls Bar */}
      <header className={`sticky top-0 z-40 px-4 py-3 border-b flex items-center justify-between transition-colors ${
        theme === 'dark' ? 'bg-[#181C1A] border-[#2C3330] text-gray-200' : 'bg-white border-surface-border text-charcoal'
      }`}>
        
        <div className="flex items-center gap-3">
          <Link
            href="/ebooks"
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-charcoal-muted"
            title="Exit Reader"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="max-w-xs sm:max-w-md truncate">
            <h2 className="text-xs sm:text-sm font-bold truncate">{ebook.title}</h2>
            <p className="text-[10px] text-charcoal-light truncate">{currentChapter.title}</p>
          </div>
        </div>

        {/* Reader Customization Tools */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Chapter Drawer Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-1"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Contents</span>
          </button>

          {/* Font Size Adjusters */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setFontSize(Math.max(13, fontSize - 1))}
              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20"
              title="Decrease font"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20"
              title="Increase font"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Palette Switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTheme('light')}
              className={`w-6 h-6 rounded-full border bg-white ${theme === 'light' ? 'ring-2 ring-forest' : ''}`}
              title="Light Mode"
            />
            <button
              onClick={() => setTheme('sepia')}
              className={`w-6 h-6 rounded-full border bg-[#FBF0D9] ${theme === 'sepia' ? 'ring-2 ring-amber-700' : ''}`}
              title="Sepia Paper Mode"
            />
            <button
              onClick={() => setTheme('dark')}
              className={`w-6 h-6 rounded-full border bg-[#1F2937] ${theme === 'dark' ? 'ring-2 ring-emerald-500' : ''}`}
              title="Dark Night Mode"
            />
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-1.5 rounded-lg text-charcoal-muted hover:text-forest"
            title="Bookmark Page"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-forest text-forest' : ''}`} />
          </button>

        </div>

      </header>

      {/* Main Reading Workspace */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
        
        {/* Reader Document Container */}
        <article
          className={`p-6 sm:p-12 rounded-3xl border shadow-card transition-all duration-300 leading-relaxed font-serif ${themeClasses[theme]}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="border-b pb-4 mb-6 not-italic font-sans flex items-center justify-between text-xs text-charcoal-muted">
            <span className="font-bold text-forest uppercase tracking-wider">{ebook.subject}</span>
            <span>Page {currentChapter.page} of {ebook.pageCount}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold not-italic font-sans mb-6">
            {currentChapter.title}
          </h1>

          <div className="space-y-6">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              {currentChapter.previewText}
            </p>

            <p>
              In academic study across universities and educational institutions in Bangladesh, mastering core foundational definitions is essential. Whether analyzing computational graphs, balancing chemical reactions, or solving multivariable equations, consistent textbook referencing builds problem-solving intuition.
            </p>

            <blockquote className="border-l-4 border-fresh pl-4 italic text-sm my-4">
              &ldquo;Knowledge multiplies when shared. Digitize, exchange, and empower every student with equal access to education.&rdquo;
            </blockquote>

            <p>
              This digital version has been verified under the authorized curriculum guidelines for educational non-commercial use on Swap Boi. Bookmark key formulas, review chapter summaries, and consult with campus peers to test your comprehension.
            </p>
          </div>
        </article>

        {/* Bottom Page Navigation */}
        <div className="flex items-center justify-between pt-6 not-italic font-sans">
          <button
            disabled={currentChapterIndex <= 0}
            onClick={() => setCurrentChapterIndex(currentChapterIndex - 1)}
            className="px-4 py-2 rounded-xl bg-white border border-surface-border disabled:opacity-40 text-charcoal font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-surface"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-xs text-charcoal-muted font-medium">
            Chapter {currentChapterIndex + 1} of {ebook.chapters.length}
          </span>

          <button
            disabled={currentChapterIndex >= ebook.chapters.length - 1}
            onClick={() => setCurrentChapterIndex(currentChapterIndex + 1)}
            className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-light disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
