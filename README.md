# Swap Boi (সোয়াপ বই) - Student Book Marketplace & Exchange Platform

> **"Give Your Books a Second Life."**  
> Bangladesh's premier student-to-student textbook marketplace, exchange, rental, and donation platform.

---

## 🎨 Visual Identity & Brand System

Built strictly following the design direction and color palette of Swap Boi:
- **Forest Green**: `#146B3A`
- **Fresh Green**: `#22A55D`
- **Light Green / Mint**: `#E8F5EC`
- **Background**: `#F7FAF7`
- **White Surface Cards**: `#FFFFFF`
- **Dark Charcoal Typography**: `#1F2937`
- **Currency**: Bangladeshi Taka (`৳` BDT)
- **Zero Human Photos Compliant**: 100% human-free visual assets. Uses rich 3D stylized floating book compositions, open textbooks with golden formulas, educational geometry, and neutral initials-based student profile avatars (`TR`, `TH`, `FA`, `SK`).

---

## 🚀 All 14 Core Modules & Routes Implemented

1. **Landing Page (Screen 1)** (`/`)
   - 3D floating book visual composition with interactive badges (`Sell`, `Exchange`, `Rent`, `Donate`)
   - Search bar with live campus location selector (Kuril/AIUB, Nilkhet/DU, Palashi/BUET, Dhanmondi, Chittagong, Sylhet, etc.)
   - Category pills: Textbook, Academic, E-Book, Rental, Donate, Popular
   - Recently Added Books showcase
   - Community statistics (12,430+ students, 8,750+ books, 2,340+ deals completed)

2. **Explore Books (Screen 2)** (`/explore`)
   - Multi-facet filter sidebar: Categories, Academic Level (SSC, HSC, University, O/A Levels), Condition (New, Like New, Good, Acceptable), Listing Type, Distance Radius slider
   - Real-time search query matching
   - Sort by Nearest First, Price: Low to High, Price: High to Low, Most Popular

3. **Book Details (Screen 3)** (`/book/[id]`)
   - Multi-angle cover presentation
   - Subject, academic level, condition, and pricing/type badges
   - Seller summary card with verified student badge, star rating, distance, and instant chat CTA
   - Action buttons: `Buy Now`, `Make Exchange Offer`, `Rent This Book`, `Request Donation`
   - Wishlist toggle & Community Report modal

4. **User Registration & Login (Screen 4)** (`/register`, `/login`, `/forgot-password`)
   - Split layout with green brand showcase and floating textbook graphic
   - Google OAuth integration & Email/Password authentication
   - Educational institution selector & academic level onboarding

5. **Student Profile (Screen 5)** (`/profile`)
   - Initials-based avatar with green verified student badge
   - Stats row: 24 Listings, 18 Deals, 4.9★ Rating
   - Dynamic tabs: My Listings, Reviews, Rentals, Donations
   - Profile editor for bio, department, and campus location

6. **Post a Book Wizard (Screen 6)** (`/post-book`)
   - 3-step listing flow
   - 4 distinct listing workflows: **SELL**, **EXCHANGE**, **RENT**, **DONATE**
   - Cover theme palette picker & condition selection
   - Automatic live publishing to marketplace store

7. **Make an Offer (Screen 7)** (`/offer/new`)
   - Target book preview
   - Custom cash offer or textbook exchange selection from student's inventory
   - Additional cash adjustment field (+/- ৳)
   - Custom proposal note

8. **Chat & Deal Confirmation (Screen 8)** (`/chat`)
   - Real-time conversation thread
   - Pinned book and offer negotiation summary card
   - Deal Confirmation Card (`Offer Accepted` -> `Meet & Exchange` -> `Confirm Deal`)
   - Safe campus meetup recommendations

9. **Nearby Discovery (Screen 9)** (`/nearby`)
   - Interactive OpenStreetMap radar map with dynamic concentric radius circles (1km, 3km, 5km, 10km)
   - Campus hub presets (AIUB, DU, BUET, Dhanmondi, Chittagong, Sylhet)
   - Approximate distance indicators with student privacy protection

10. **E-Books Library (Screen 10 & 10b)** (`/ebooks`, `/ebooks/[id]`)
    - Categorized catalog of authorized digital curriculum (NCTB, Open Educational Resources)
    - Interactive reader with Font Size adjuster (A- / A+), Theme toggle (Light / Sepia paper / Dark night), Chapter table of contents, and bookmarking

11. **Book Rentals (Screen 11)** (`/rentals`)
    - Weekly fee calculation & refundable security deposit breakdown
    - Direct rental request flow

12. **Book Donations (Screen 12)** (`/donate`)
    - Free book listings for students in need
    - 1-click donation post CTA

13. **Wishlist (Screen 13)** (`/dashboard/wishlist`, `/wishlist`)
    - Saved books with "Get Notified" alerts toggle and instant checkout

14. **Admin Dashboard (Screen 14)** (`/admin`)
    - KPI metric cards (12,430 Users, 8,750 Books, 2,340 Deals, 420 Rentals)
    - 30-day activity trend chart
    - Student ID Verification queue (Approve/Reject green verified badge)
    - Book Moderation queue (Unpublish/Approve)
    - Deals audit log & User complaints resolution

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Database**: PostgreSQL with PostGIS via Supabase (`supabase/schema.sql`)
- **Persistence**: Hybrid Supabase client + reactive in-browser state store with full persistence and realistic Bangladesh seed data
- **Maps**: OpenStreetMap / Leaflet compatible coordinate projection with privacy jittering

---

## 🏃 Quick Start

```bash
# 1. Install dependencies (already completed)
npm install

# 2. Run local development server
npm run dev

# 3. Open browser
http://localhost:3000
```

### Supabase Connection (Optional)
Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
Run `supabase/schema.sql` in your Supabase SQL editor to create all tables, spatial indexes, and Row Level Security policies.
