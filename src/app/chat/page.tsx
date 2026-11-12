'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Send, 
  Image as ImageIcon, 
  Check, 
  CheckCheck, 
  ShieldCheck, 
  MapPin, 
  Repeat, 
  ShoppingBag, 
  Calendar, 
  Phone, 
  Info, 
  CheckCircle2, 
  BookOpen, 
  ArrowLeft 
} from 'lucide-react';
import { store } from '@/lib/store';
import { Conversation, ChatMessage, UserProfile, Offer } from '@/types';
import { formatBDT } from '@/lib/utils';

function ChatContent() {
  const searchParams = useSearchParams();
  const convIdParam = searchParams.get('convId');
  const bookIdParam = searchParams.get('bookId');
  const sellerIdParam = searchParams.get('sellerId');

  const [currentUser, setCurrentUser] = useState<UserProfile>(store.getCurrentUser());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [dealSuccessToast, setDealSuccessToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = store.getCurrentUser();
    setCurrentUser(user);

    let convs = store.getConversations();

    // If navigated from a book details or seller
    if (bookIdParam && sellerIdParam && convs.length === 0) {
      // Create initial conversation if needed
    }

    setConversations(convs);

    if (convIdParam) {
      const found = convs.find((c) => c.id === convIdParam);
      if (found) {
        setActiveConv(found);
        setMessages(store.getMessages(found.id));
      } else if (convs.length > 0) {
        setActiveConv(convs[0]);
        setMessages(store.getMessages(convs[0].id));
      }
    } else if (convs.length > 0) {
      setActiveConv(convs[0]);
      setMessages(store.getMessages(convs[0].id));
    }

    const unsubscribe = store.subscribe(() => {
      const updatedConvs = store.getConversations();
      setConversations(updatedConvs);
      if (activeConv) {
        setMessages(store.getMessages(activeConv.id));
        const updatedActive = updatedConvs.find((c) => c.id === activeConv.id);
        if (updatedActive) setActiveConv(updatedActive);
      }
    });

    return unsubscribe;
  }, [convIdParam, bookIdParam, sellerIdParam]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConv = (conv: Conversation) => {
    setActiveConv(conv);
    setMessages(store.getMessages(conv.id));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;

    store.sendMessage(activeConv.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleConfirmDeal = () => {
    if (!activeConv || !activeConv.offer) return;
    store.updateOfferStatus(activeConv.offer.id, 'completed');
    store.sendMessage(
      activeConv.id,
      '🎉 Deal confirmed & completed! Thank you for exchanging with me on Swap Boi.'
    );
    setDealSuccessToast(true);
    setTimeout(() => setDealSuccessToast(false), 3000);
  };

  const handleAcceptOffer = () => {
    if (!activeConv || !activeConv.offer) return;
    store.updateOfferStatus(activeConv.offer.id, 'accepted', {
      location: 'AIUB Campus D Building',
      time: 'Tomorrow 2:00 PM',
    });
    store.sendMessage(
      activeConv.id,
      'I accepted your offer! Let\'s meet tomorrow at AIUB Campus D Building.'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-surface-border shadow-elevated overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        
        {/* Left Conversations Sidebar */}
        <div className="md:col-span-4 border-r border-surface-border flex flex-col">
          
          <div className="p-4 border-b border-surface-border bg-surface/50">
            <h2 className="text-base font-extrabold text-charcoal tracking-tight">Messages & Deals</h2>
            <p className="text-[11px] text-charcoal-muted">Chat with book owners and negotiate exchanges</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-border">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-charcoal-muted">
                No active conversations yet. Explore books and send an offer!
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = activeConv?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                      isSelected ? 'bg-mint/60' : 'hover:bg-surface'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${conv.otherUser.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {conv.otherUser.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-charcoal truncate">{conv.otherUser.fullName}</p>
                        <span className="text-[10px] text-charcoal-light">{conv.lastMessageAt}</span>
                      </div>
                      <p className="text-[11px] text-forest font-semibold truncate mt-0.5">
                        {conv.book?.title || 'Book Deal'}
                      </p>
                      <p className="text-xs text-charcoal-muted truncate mt-0.5">
                        {conv.lastMessageText}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Panel matching Screen 8 */}
        <div className="md:col-span-8 flex flex-col justify-between bg-surface/30">
          
          {activeConv ? (
            <>
              {/* Header with User Info matching Screen 8 */}
              <div className="p-4 bg-white border-b border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl ${activeConv.otherUser.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                      {activeConv.otherUser.avatarInitials}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-fresh rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-charcoal">{activeConv.otherUser.fullName}</h3>
                      {activeConv.otherUser.isVerified && <ShieldCheck className="w-4 h-4 text-fresh" />}
                    </div>
                    <p className="text-[11px] text-fresh font-semibold flex items-center gap-1">
                      Online • {activeConv.otherUser.institution}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-charcoal-muted hidden sm:inline flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-fresh" />
                    {activeConv.otherUser.locationArea}
                  </span>
                </div>
              </div>

              {/* Pinned Book & Offer Summary Card matching Screen 8 */}
              {activeConv.book && (
                <div className="bg-white p-3.5 border-b border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-12 rounded-lg bg-linear-to-b ${activeConv.book.coverColor} flex items-center justify-center text-white shrink-0`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-charcoal">{activeConv.book.title}</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-mint text-forest">
                          {activeConv.book.listingType}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal-muted">
                        {activeConv.offer?.offeredBook ? `Exchanging with: ${activeConv.offer.offeredBook.title}` : `Price: ${formatBDT(activeConv.book.sellPrice)}`}
                      </p>
                    </div>
                  </div>

                  {activeConv.offer && (
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${
                        activeConv.offer.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : activeConv.offer.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {activeConv.offer.status === 'completed' ? 'Deal Completed' : activeConv.offer.status === 'accepted' ? 'Offer Accepted' : 'Deal Pending'}
                      </span>
                    </div>
                  )}

                </div>
              )}

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                
                {/* Safe Meetup Recommendation Notice */}
                <div className="bg-mint-subtle border border-mint-border rounded-2xl p-3 text-xs text-forest flex items-center gap-2.5 max-w-xl mx-auto">
                  <ShieldCheck className="w-5 h-5 text-fresh shrink-0" />
                  <span>
                    <strong>Student Safety Tip:</strong> Always arrange exchanges in open daylight on your university campus (library, cafeteria, or gate).
                  </span>
                </div>

                {messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-forest text-white rounded-br-xs shadow-soft'
                            : 'bg-white text-charcoal border border-surface-border rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-charcoal-light mt-1 px-1">
                        {msg.createdAt}
                      </span>
                    </div>
                  );
                })}

                {/* Deal Confirmation Box matching Screen 8 */}
                {activeConv.offer && (
                  <div className="max-w-md mx-auto my-6 bg-white rounded-2xl border border-mint-border p-4 shadow-card space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                      <h4 className="text-xs font-extrabold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                        <Repeat className="w-4 h-4 text-fresh" /> Deal Confirmation
                      </h4>
                      <span className="text-[10px] text-charcoal-muted">AIUB Campus Meetup</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-forest font-medium">
                        <CheckCircle2 className="w-4 h-4 text-fresh" />
                        <span>Offer Accepted by Student</span>
                      </div>
                      <div className="flex items-center gap-2 text-forest font-medium">
                        <CheckCircle2 className="w-4 h-4 text-fresh" />
                        <span>Meet & Exchange Location: Building D Cafeteria</span>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal font-medium">
                        <div className="w-4 h-4 rounded-full border border-charcoal-light flex items-center justify-center text-[10px]">
                          3
                        </div>
                        <span>Mark as Completed after physical book handover</span>
                      </div>
                    </div>

                    {activeConv.offer.status !== 'completed' ? (
                      <button
                        onClick={handleConfirmDeal}
                        className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Confirm Deal</span>
                      </button>
                    ) : (
                      <div className="p-2.5 bg-mint text-forest rounded-xl text-center text-xs font-bold">
                        ✓ Deal Completed & Logged
                      </div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input matching Screen 8 */}
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-surface-border flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-surface-border bg-surface text-sm focus:outline-hidden focus:bg-white text-charcoal"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light disabled:opacity-40 text-white font-bold text-sm shadow-sm transition flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-charcoal-light" />
              <p className="text-sm font-bold text-charcoal">Select a conversation to start chatting</p>
              <p className="text-xs text-charcoal-muted max-w-xs">
                Negotiate prices, agree on campus meetup locations, and confirm textbook swaps in real time.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-forest">Loading chat system...</div>}>
      <ChatContent />
    </Suspense>
  );
}
