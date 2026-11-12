import { Book, UserProfile, Offer, Conversation, ChatMessage, EBook, UserReport, Review } from '@/types';
import { MOCK_USERS, MOCK_BOOKS, MOCK_EBOOKS, MOCK_OFFERS, MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_REPORTS, MOCK_REVIEWS } from './mock-data';

// Persistent Local / Browser State Store
class SwapBoiStore {
  private users: UserProfile[] = [];
  private books: Book[] = [];
  private ebooks: EBook[] = [];
  private offers: Offer[] = [];
  private conversations: Conversation[] = [];
  private messages: Record<string, ChatMessage[]> = {};
  private wishlistBookIds: string[] = ['book-hsc-physics-2', 'book-c-programming', 'book-dsa-karumanchi'];
  private reports: UserReport[] = [];
  private reviews: Review[] = [];
  private currentUserId: string = 'user-tahmidur';
  private listeners: Set<() => void> = new Set();
  private initialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.users = [...MOCK_USERS];
      this.books = [...MOCK_BOOKS];
      this.ebooks = [...MOCK_EBOOKS];
      this.offers = [...MOCK_OFFERS];
      this.conversations = [...MOCK_CONVERSATIONS];
      this.messages = { ...MOCK_MESSAGES };
      this.reports = [...MOCK_REPORTS];
      this.reviews = [...MOCK_REVIEWS];
      this.initialized = true;
      return;
    }

    try {
      const storedBooks = localStorage.getItem('swapboi_books');
      this.books = storedBooks ? JSON.parse(storedBooks) : [...MOCK_BOOKS];

      const storedUsers = localStorage.getItem('swapboi_users');
      this.users = storedUsers ? JSON.parse(storedUsers) : [...MOCK_USERS];

      const storedOffers = localStorage.getItem('swapboi_offers');
      this.offers = storedOffers ? JSON.parse(storedOffers) : [...MOCK_OFFERS];

      const storedConvs = localStorage.getItem('swapboi_conversations');
      this.conversations = storedConvs ? JSON.parse(storedConvs) : [...MOCK_CONVERSATIONS];

      const storedMsgs = localStorage.getItem('swapboi_messages');
      this.messages = storedMsgs ? JSON.parse(storedMsgs) : { ...MOCK_MESSAGES };

      const storedWishlist = localStorage.getItem('swapboi_wishlist');
      if (storedWishlist) {
        this.wishlistBookIds = JSON.parse(storedWishlist);
      }

      const storedUser = localStorage.getItem('swapboi_current_user');
      if (storedUser) {
        this.currentUserId = storedUser;
      }

      this.ebooks = [...MOCK_EBOOKS];
      this.reports = [...MOCK_REPORTS];
      this.reviews = [...MOCK_REVIEWS];
      this.initialized = true;
    } catch (e) {
      this.books = [...MOCK_BOOKS];
      this.users = [...MOCK_USERS];
      this.offers = [...MOCK_OFFERS];
      this.conversations = [...MOCK_CONVERSATIONS];
      this.messages = { ...MOCK_MESSAGES };
      this.ebooks = [...MOCK_EBOOKS];
      this.reports = [...MOCK_REPORTS];
      this.reviews = [...MOCK_REVIEWS];
      this.initialized = true;
    }
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('swapboi_books', JSON.stringify(this.books));
        localStorage.setItem('swapboi_users', JSON.stringify(this.users));
        localStorage.setItem('swapboi_offers', JSON.stringify(this.offers));
        localStorage.setItem('swapboi_conversations', JSON.stringify(this.conversations));
        localStorage.setItem('swapboi_messages', JSON.stringify(this.messages));
        localStorage.setItem('swapboi_wishlist', JSON.stringify(this.wishlistBookIds));
        localStorage.setItem('swapboi_current_user', this.currentUserId);
      } catch (err) {
        console.error('Storage sync error', err);
      }
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- USER PROFILE & AUTH ---
  public getCurrentUser(): UserProfile {
    return this.users.find((u) => u.id === this.currentUserId) || this.users[0] || MOCK_USERS[0];
  }

  public setCurrentUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.currentUserId = userId;
      this.persist();
    }
  }

  public getUserById(id: string): UserProfile | undefined {
    return this.users.find((u) => u.id === id);
  }

  public updateUserProfile(updated: Partial<UserProfile>) {
    const currentUser = this.getCurrentUser();
    this.users = this.users.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u));
    this.persist();
  }

  public verifyStudent(userId: string, isVerified: boolean) {
    this.users = this.users.map((u) => (u.id === userId ? { ...u, isVerified } : u));
    this.persist();
  }

  // --- BOOKS CRUD ---
  public getBooks(): Book[] {
    return this.books;
  }

  public getBookById(id: string): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  public addBook(bookData: Omit<Book, 'id' | 'createdAt' | 'viewsCount' | 'wishlistCount' | 'user' | 'userId'>): Book {
    const currentUser = this.getCurrentUser();
    const newBook: Book = {
      ...bookData,
      id: `book-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      viewsCount: 1,
      wishlistCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.books.unshift(newBook);
    // increment booksListed counter
    this.updateUserProfile({ booksListed: (currentUser.booksListed || 0) + 1 });
    this.persist();
    return newBook;
  }

  public updateBook(id: string, updates: Partial<Book>) {
    this.books = this.books.map((b) => (b.id === id ? { ...b, ...updates } : b));
    this.persist();
  }

  public deleteBook(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
    this.persist();
  }

  // --- WISHLIST ---
  public getWishlist(): Book[] {
    return this.books.filter((b) => this.wishlistBookIds.includes(b.id));
  }

  public isInWishlist(bookId: string): boolean {
    return this.wishlistBookIds.includes(bookId);
  }

  public toggleWishlist(bookId: string): boolean {
    if (this.wishlistBookIds.includes(bookId)) {
      this.wishlistBookIds = this.wishlistBookIds.filter((id) => id !== bookId);
    } else {
      this.wishlistBookIds.push(bookId);
      const book = this.getBookById(bookId);
      if (book) {
        book.wishlistCount = (book.wishlistCount || 0) + 1;
      }
    }
    this.persist();
    return this.wishlistBookIds.includes(bookId);
  }

  // --- OFFERS & DEALS ---
  public getOffers(): Offer[] {
    return this.offers;
  }

  public getOffersForUser(userId: string): Offer[] {
    return this.offers.filter((o) => o.senderId === userId || o.receiverId === userId);
  }

  public createOffer(payload: {
    bookId: string;
    offerType: 'sell' | 'exchange' | 'rent' | 'donate';
    offeredCash: number;
    offeredBookId?: string;
    rentalDurationDays?: number;
    donationReason?: string;
    message: string;
  }): Offer {
    const targetBook = this.getBookById(payload.bookId);
    if (!targetBook) throw new Error('Book not found');
    const sender = this.getCurrentUser();
    const receiver = targetBook.user;

    const offeredBook = payload.offeredBookId ? this.getBookById(payload.offeredBookId) : undefined;

    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      bookId: targetBook.id,
      book: targetBook,
      senderId: sender.id,
      sender: sender,
      receiverId: receiver.id,
      receiver: receiver,
      offerType: payload.offerType,
      offeredCash: payload.offeredCash,
      offeredBookId: payload.offeredBookId,
      offeredBook: offeredBook,
      rentalDurationDays: payload.rentalDurationDays,
      donationReason: payload.donationReason,
      message: payload.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.offers.unshift(newOffer);

    // Also start or update conversation
    let conv = this.conversations.find(
      (c) => (c.bookId === targetBook.id && (c.participants.some(p => p.id === sender.id) && c.participants.some(p => p.id === receiver.id)))
    );

    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        bookId: targetBook.id,
        book: targetBook,
        offerId: newOffer.id,
        offer: newOffer,
        participants: [sender, receiver],
        otherUser: receiver,
        lastMessageText: payload.message || `Sent ${payload.offerType} offer`,
        lastMessageAt: 'Just now',
        unreadCount: 1,
      };
      this.conversations.unshift(conv);
    } else {
      conv.offerId = newOffer.id;
      conv.offer = newOffer;
      conv.lastMessageText = payload.message || `Sent ${payload.offerType} offer`;
      conv.lastMessageAt = 'Just now';
    }

    if (!this.messages[conv.id]) {
      this.messages[conv.id] = [];
    }
    this.messages[conv.id].push({
      id: `m-${Date.now()}`,
      conversationId: conv.id,
      senderId: sender.id,
      content: payload.message || `I submitted a ${payload.offerType.toUpperCase()} offer for "${targetBook.title}".`,
      isOfferUpdate: true,
      offerData: newOffer,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    this.persist();
    return newOffer;
  }

  public updateOfferStatus(offerId: string, status: Offer['status'], meetingDetails?: { location: string; time: string }) {
    this.offers = this.offers.map((o) => {
      if (o.id === offerId) {
        const updated = {
          ...o,
          status,
          ...(meetingDetails ? { meetingLocation: meetingDetails.location, meetingTime: meetingDetails.time } : {}),
          updatedAt: new Date().toISOString(),
        };

        // If completed, increment deals completed
        if (status === 'completed') {
          const s = this.getUserById(o.senderId);
          const r = this.getUserById(o.receiverId);
          if (s) s.dealsCompleted = (s.dealsCompleted || 0) + 1;
          if (r) r.dealsCompleted = (r.dealsCompleted || 0) + 1;
          // Mark book unavailable
          this.updateBook(o.bookId, { isAvailable: false });
        }
        return updated;
      }
      return o;
    });

    this.persist();
  }

  // --- CHAT & CONVERSATIONS ---
  public getConversations(): Conversation[] {
    const user = this.getCurrentUser();
    return this.conversations.map((c) => {
      const other = c.participants.find((p) => p.id !== user.id) || c.participants[0];
      return {
        ...c,
        otherUser: other,
      };
    });
  }

  public getConversationById(id: string): Conversation | undefined {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return undefined;
    const user = this.getCurrentUser();
    const other = conv.participants.find((p) => p.id !== user.id) || conv.participants[0];
    return {
      ...conv,
      otherUser: other,
    };
  }

  public getMessages(conversationId: string): ChatMessage[] {
    return this.messages[conversationId] || [];
  }

  public sendMessage(conversationId: string, content: string, imageUrl?: string): ChatMessage {
    const user = this.getCurrentUser();
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: user.id,
      content,
      imageUrl,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!this.messages[conversationId]) {
      this.messages[conversationId] = [];
    }
    this.messages[conversationId].push(msg);

    const conv = this.conversations.find((c) => c.id === conversationId);
    if (conv) {
      conv.lastMessageText = content;
      conv.lastMessageAt = 'Just now';
    }

    this.persist();
    return msg;
  }

  // --- EBOOKS ---
  public getEBooks(): EBook[] {
    return this.ebooks;
  }

  public getEBookById(id: string): EBook | undefined {
    return this.ebooks.find((e) => e.id === id);
  }

  // --- REVIEWS & REPORTS ---
  public getReviews(): Review[] {
    return this.reviews;
  }

  public addReview(review: Omit<Review, 'id' | 'createdAt'>) {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: 'Just now',
    };
    this.reviews.unshift(newRev);
    this.persist();
  }

  public getReports(): UserReport[] {
    return this.reports;
  }

  public addReport(report: Omit<UserReport, 'id' | 'createdAt' | 'status'>) {
    const newRep: UserReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.reports.unshift(newRep);
    this.persist();
  }

  public updateReportStatus(reportId: string, status: UserReport['status']) {
    this.reports = this.reports.map((r) => (r.id === reportId ? { ...r, status } : r));
    this.persist();
  }

  // --- STATS FOR ADMIN ---
  public getStats() {
    const totalUsers = this.users.length + 12426; // Realistic startup metrics
    const totalBooks = this.books.length + 8742;
    const dealsCompleted = this.offers.filter((o) => o.status === 'completed').length + 2339;
    const activeRentals = this.books.filter((b) => b.listingType === 'rent').length + 416;
    return {
      totalUsers,
      totalBooks,
      dealsCompleted,
      activeRentals,
    };
  }
}

export const store = new SwapBoiStore();
