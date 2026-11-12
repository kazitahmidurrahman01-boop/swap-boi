-- =========================================================================
-- SWAP BOI - DATABASE SCHEMA & POLICIES (SUPABASE / POSTGRESQL)
-- =========================================================================

-- Enable PostGIS extension for spatial queries (location discovery)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS & TYPES
CREATE TYPE listing_type AS ENUM ('sell', 'exchange', 'rent', 'donate');
CREATE TYPE book_condition AS ENUM ('new', 'like_new', 'good', 'acceptable');
CREATE TYPE academic_level AS ENUM ('school_primary', 'school_secondary', 'ssc', 'hsc', 'university_undergrad', 'university_postgrad', 'o_levels', 'a_levels', 'madrasah', 'other');
CREATE TYPE deal_status AS ENUM ('pending', 'accepted', 'counter_offered', 'rejected', 'meet_scheduled', 'completed', 'cancelled');
CREATE TYPE user_role AS ENUM ('student', 'moderator', 'admin');
CREATE TYPE rental_status AS ENUM ('requested', 'approved', 'active', 'return_pending', 'returned', 'overdue');

-- 2. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    institution TEXT NOT NULL DEFAULT 'AIUB',
    institution_type TEXT DEFAULT 'university',
    department TEXT,
    academic_level academic_level DEFAULT 'university_undergrad',
    student_id_number TEXT,
    is_verified BOOLEAN DEFAULT false,
    verification_document_url TEXT,
    bio TEXT DEFAULT 'Student eager to read, learn, and swap books.',
    location_city TEXT DEFAULT 'Dhaka',
    location_area TEXT DEFAULT 'Kuratoli / Kuril',
    location_coords GEOMETRY(Point, 4326),
    rating_score NUMERIC(3, 2) DEFAULT 5.0,
    rating_count INT DEFAULT 0,
    deals_completed INT DEFAULT 0,
    books_listed INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    icon_name TEXT DEFAULT 'BookOpen',
    item_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKS TABLE
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    edition TEXT,
    publisher TEXT,
    subject TEXT NOT NULL,
    isbn TEXT,
    description TEXT,
    listing_type listing_type NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    academic_level academic_level NOT NULL,
    condition book_condition NOT NULL,
    
    -- Pricing & Exchange details
    original_price NUMERIC(10, 2),
    sell_price NUMERIC(10, 2), -- for SELL
    exchange_preferences TEXT, -- for EXCHANGE (what books they want)
    rental_daily_price NUMERIC(10, 2), -- for RENT
    rental_min_duration_days INT DEFAULT 7,
    rental_max_duration_days INT DEFAULT 30,
    security_deposit NUMERIC(10, 2), -- for RENT
    
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    location_city TEXT NOT NULL DEFAULT 'Dhaka',
    location_area TEXT NOT NULL DEFAULT 'Dhanmondi',
    location_coords GEOMETRY(Point, 4326),
    
    is_available BOOLEAN DEFAULT true,
    is_moderated BOOLEAN DEFAULT true,
    views_count INT DEFAULT 0,
    wishlist_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. OFFERS TABLE (Buy, Exchange, Rent, Donate Requests)
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    offer_type listing_type NOT NULL,
    
    -- Details based on offer type
    offered_cash NUMERIC(10, 2) DEFAULT 0, -- Extra cash or purchase amount
    offered_book_id UUID REFERENCES public.books(id) ON DELETE SET NULL, -- for exchange
    rental_duration_days INT, -- for rent
    rental_start_date DATE,
    donation_reason TEXT, -- for donate request
    
    message TEXT,
    status deal_status DEFAULT 'pending',
    meeting_location TEXT,
    meeting_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CHAT CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES public.books(id) ON DELETE SET NULL,
    offer_id UUID REFERENCES public.offers(id) ON DELETE SET NULL,
    participant_one UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    participant_two UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    last_message_text TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    is_offer_update BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REVIEWS & RATINGS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID REFERENCES public.offers(id) ON DELETE SET NULL,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewed_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. WISHLIST
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    notify_on_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, book_id)
);

-- 9. E-BOOKS TABLE (Authorized curriculum and open-source materials)
CREATE TABLE IF NOT EXISTS public.ebooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    subject TEXT NOT NULL,
    academic_level academic_level NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    cover_image TEXT,
    file_url TEXT NOT NULL,
    file_size_mb NUMERIC(5, 2),
    page_count INT DEFAULT 120,
    is_authorized BOOLEAN DEFAULT true,
    license_type TEXT DEFAULT 'Open Educational Resource (NCTB / Creative Commons)',
    description TEXT,
    reads_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SYSTEM REPORTS / COMPLAINTS
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reported_book_id UUID REFERENCES public.books(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending', -- pending, investigated, resolved, dismissed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Public Profiles: readable by anyone, editable only by profile owner
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Books: readable by all if moderated, creators can insert/update/delete
CREATE POLICY "Available books readable by everyone" ON public.books FOR SELECT USING (true);
CREATE POLICY "Users can insert their own books" ON public.books FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own books" ON public.books FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own books" ON public.books FOR DELETE USING (auth.uid() = user_id);

-- Spatial Indexing for PostGIS Nearby Book Queries
CREATE INDEX IF NOT EXISTS idx_books_location ON public.books USING GIST(location_coords);
