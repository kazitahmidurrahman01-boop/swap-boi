'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Repeat, ArrowRight, MessageSquare, Check, X, ShieldCheck } from 'lucide-react';
import { store } from '@/lib/store';
import { Offer, UserProfile } from '@/types';
import { formatBDT } from '@/lib/utils';

export default function MyOffersPage() {
  const [user, setUser] = useState<UserProfile>(store.getActiveUser());
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const u = store.getActiveUser();
    setUser(u);
    setOffers(store.getOffersForUser(u.id));
    const unsubscribe = store.subscribe(() => {
      setOffers(store.getOffersForUser(store.getActiveUser().id));
    });
    return unsubscribe;
  }, []);

  const handleUpdateStatus = (offerId: string, status: Offer['status']) => {
    store.updateOfferStatus(offerId, status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight flex items-center gap-2">
            <Repeat className="w-6 h-6 text-forest" />
            My Offers & Deals
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage your outgoing and incoming textbook negotiations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-surface-border text-center space-y-3 shadow-soft">
            <Repeat className="w-10 h-10 text-charcoal-light mx-auto" />
            <h3 className="font-bold text-base text-charcoal">No offers yet</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              Find textbooks on the explore page and submit an offer to swap or buy.
            </p>
            <Link href="/explore" className="inline-block px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold">
              Explore Marketplace
            </Link>
          </div>
        ) : (
          offers.map((offer) => {
            const isIncoming = offer.receiverId === user.id;
            return (
              <div key={offer.id} className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest uppercase bg-mint px-2.5 py-0.5 rounded-md">
                      {isIncoming ? 'Incoming Offer' : 'Outgoing Offer'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      offer.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {offer.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal-light">{offer.createdAt.split('T')[0]}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-surface p-4 rounded-xl">
                  <div>
                    <span className="text-charcoal-muted block">Target Book:</span>
                    <strong className="text-charcoal font-bold text-sm">{offer.book.title}</strong>
                    <p className="text-[11px] text-charcoal-muted mt-0.5">Listed Price: {formatBDT(offer.book.sellPrice)}</p>
                  </div>
                  <div>
                    <span className="text-charcoal-muted block">Offer Details:</span>
                    <strong className="text-forest font-bold text-sm">
                      {offer.offeredBook ? `Swap for ${offer.offeredBook.title} (+৳${offer.offeredCash})` : `Cash: ৳${offer.offeredCash}`}
                    </strong>
                    <p className="text-[11px] text-charcoal-muted mt-0.5">
                      {isIncoming ? `From: ${offer.sender.fullName}` : `To: ${offer.receiver.fullName}`}
                    </p>
                  </div>
                </div>

                {offer.message && (
                  <p className="text-xs text-charcoal-muted italic pl-1">
                    &ldquo;{offer.message}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-surface-border">
                  <Link
                    href={`/chat`}
                    className="text-xs font-bold text-forest hover:text-fresh flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in Chat</span>
                  </Link>

                  {isIncoming && offer.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(offer.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl border border-surface-border text-xs font-semibold text-charcoal hover:bg-surface"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(offer.id, 'accepted')}
                        className="px-4 py-1.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-xs"
                      >
                        Accept Offer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
