'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Have questions, campus partnership requests, or feedback for the Swap Boi student support team? We&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Contact Information */}
        <div className="lg:col-span-5 bg-forest text-white rounded-3xl p-8 shadow-elevated space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Student Support Hub</h2>
            <p className="text-xs text-mint leading-relaxed">
              Our student moderation team actively responds within 2-4 hours.
            </p>
          </div>

          <div className="space-y-4 text-xs text-mint/90 pt-4 border-t border-forest-light/40">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-fresh-light shrink-0" />
              <div>
                <strong className="block text-white font-semibold">Campus Operations:</strong>
                <span>AIUB Campus / Kuratoli, Kuril & Dhaka University Curzon Hall Hub, Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-fresh-light shrink-0" />
              <div>
                <strong className="block text-white font-semibold">Email:</strong>
                <span>support@swapboi.com.bd</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-fresh-light shrink-0" />
              <div>
                <strong className="block text-white font-semibold">Hotline:</strong>
                <span>+880 1711-234567 (9 AM - 8 PM)</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-xs text-mint space-y-1">
            <p className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-fresh-light" /> University Campus Ambassadors
            </p>
            <p className="text-[11px] text-mint/80">
              Want to launch Swap Boi at your university or college? Message us with &ldquo;Campus Ambassador&rdquo; in the subject.
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-fresh mx-auto" />
              <h3 className="text-xl font-bold text-charcoal">Message Sent Successfully!</h3>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                Thank you for contacting Swap Boi. One of our student support leads will email you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-forest text-white text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-charcoal">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kazi Tahmidur Rahman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-surface-border text-charcoal focus:outline-hidden focus:border-fresh"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@aiub.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-surface-border text-charcoal focus:outline-hidden focus:border-fresh"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal block mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Campus Ambassador application or Feature suggestion"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-surface-border text-charcoal focus:outline-hidden focus:border-fresh"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help your student textbook journey?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-surface-border text-charcoal focus:outline-hidden focus:border-fresh"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-card flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
