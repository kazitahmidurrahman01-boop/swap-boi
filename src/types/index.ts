export type ListingType = 'sell' | 'exchange' | 'rent' | 'donate';

export type BookCondition = 'new' | 'like_new' | 'good' | 'acceptable';

export type AcademicLevel = 
  | 'school_primary' 
  | 'school_secondary' 
  | 'ssc' 
  | 'hsc' 
  | 'university_undergrad' 
  | 'university_postgrad' 
  | 'o_levels' 
  | 'a_levels' 
  | 'other';

export type DealStatus = 
  | 'pending' 
  | 'accepted' 
  | 'counter_offered' 
  | 'rejected' 
  | 'meet_scheduled' 
  | 'completed' 
  | 'cancelled';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  avatarInitials: string;
  avatarBg: string; // Tailwind gradient/color class
  role: 'student' | 'moderator' | 'admin';
  institution: string;
  institutionType: 'school' | 'college' | 'university';
  department?: string;
  academicLevel: AcademicLevel;
  studentIdNumber?: string;
  isVerified: boolean;
  bio: string;
  locationCity: string;
  locationArea: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ratingScore: number;
  ratingCount: number;
  dealsCompleted: number;
  booksListed: number;
  joinedDate: string;
}

export interface Book {
  id: string;
  userId: string;
  user: UserProfile;
  title: string;
  author: string;
  edition?: string;
  publisher?: string;
  subject: string;
  isbn?: string;
  description: string;
  listingType: ListingType;
  category: string;
  academicLevel: AcademicLevel;
  condition: BookCondition;
  
  // Pricing & Exchange
  originalPrice?: number;
  sellPrice?: number; // for SELL in BDT (৳)
  exchangePreferences?: string; // for EXCHANGE
  rentalDailyPrice?: number; // for RENT in BDT (৳)
  rentalWeeklyPrice?: number;
  securityDeposit?: number; // for RENT in BDT (৳)
  
  coverColor: string; // Decorative cover gradient
  coverImage?: string; // Book artwork or illustration
  locationCity: string;
  locationArea: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number; // Calculated dynamically from user coordinate
  
  isAvailable: boolean;
  isModerated: boolean;
  viewsCount: number;
  wishlistCount: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  bookId: string;
  book: Book;
  senderId: string;
  sender: UserProfile;
  receiverId: string;
  receiver: UserProfile;
  offerType: ListingType;
  
  offeredCash: number; // Extra cash or purchase amount in BDT
  offeredBookId?: string; // for exchange
  offeredBook?: Book;
  rentalDurationDays?: number; // for rent
  rentalStartDate?: string;
  donationReason?: string; // for donation
  
  message: string;
  status: DealStatus;
  meetingLocation?: string;
  meetingTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  isOfferUpdate?: boolean;
  offerData?: Partial<Offer>;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  bookId?: string;
  book?: Book;
  offerId?: string;
  offer?: Offer;
  participants: UserProfile[];
  otherUser: UserProfile;
  lastMessageText: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  academicLevel: AcademicLevel;
  category: string;
  coverColor: string;
  fileSizeMb: number;
  pageCount: number;
  isAuthorized: boolean;
  licenseType: string;
  description: string;
  readsCount: number;
  chapters: {
    title: string;
    page: number;
    previewText: string;
  }[];
}

export interface Review {
  id: string;
  dealId?: string;
  reviewerId: string;
  reviewer: UserProfile;
  reviewedUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId?: string;
  reportedUserName?: string;
  reportedBookId?: string;
  reportedBookTitle?: string;
  reason: string;
  details: string;
  status: 'pending' | 'investigated' | 'resolved' | 'dismissed';
  createdAt: string;
}
