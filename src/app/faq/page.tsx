'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does book exchange work on Swap Boi?',
      a: 'When posting a book, select the "Exchange" listing type and mention what books or syllabus you are looking for. When another student finds your book, they can propose one of their own books in exchange, plus or minus any agreed cash difference (৳ BDT). You can negotiate the terms in the chat and meet at your campus to exchange.'
    },
    {
      q: 'Are transactions on Swap Boi subject to commissions or service fees?',
      a: 'No! Swap Boi is 100% free for students. There are zero platform cuts or middleman markups. 100% of the price or book value goes directly between the two students.'
    },
    {
      q: 'Where should we meet to handover books?',
      a: 'We strongly encourage all students to meet in broad daylight at public, secure areas on their institution’s campus — such as your university cafeteria, campus library, student hub, or main gate.'
    },
    {
      q: 'How do Textbook Rentals and security deposits work?',
      a: 'When renting a book, the borrower pays the agreed rental fee for the duration (e.g. ৳50 for 7 days) plus a refundable security deposit (e.g. ৳300). Once the book is returned in good condition, the owner marks the rental as returned and refunds the deposit.'
    },
    {
      q: 'How do I get the Green Verified Student Badge?',
      a: 'Register with your active institution email (e.g. @student.aiub.edu, @du.ac.bd, @buet.ac.bd) or submit a photo of your student ID card in your dashboard settings. Our moderation team verifies and activates your badge within 24 hours.'
    },
    {
      q: 'Are the E-Books legally authorized?',
      a: 'Yes. Swap Boi exclusively provides legally authorized digital content, including open educational resources (OER), NCTB open curriculum textbooks, and publications distributed under Creative Commons licenses.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-mint text-forest flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto">
          Everything you need to know about buying, selling, swapping, renting, and donating books on Swap Boi.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-surface-border divide-y divide-surface-border shadow-card overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="p-5 sm:p-6 transition">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="font-bold text-sm text-charcoal">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-forest shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-charcoal-light shrink-0" />
                )}
              </button>
              {isOpen && (
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mt-3 pt-3 border-t border-surface-border/60">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
