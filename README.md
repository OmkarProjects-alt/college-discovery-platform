# 🎓 College Discovery Platform

🌐 Live Demo: https://college-discovery-platform-18nt.vercel.app  
💻 GitHub Repo: https://github.com/OmkarProjects-alt/college-discovery-platform  

A full-stack college discovery and decision-making platform built with Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS. The platform helps students search colleges, compare institutions, explore courses, read reviews, and save favorites with authentication-based features.

---

## 🚀 Features

### 🔍 College Discovery & Search
- Search colleges by name, location, courses, and cutoff rank
- Advanced filters: rating, fees, course type, location
- Paginated and optimized listing with database-driven queries

### 📊 College Comparison System
- Compare multiple colleges side-by-side (2–3 colleges)
- Compare key metrics:
  - Fees
  - Ratings
  - Courses
  - Institute Type
  - NAAC Grade
  - Location
  - Cutoff Rank

### ❤️ Saved Colleges (Bookmark System)
- Save favorite colleges (authentication required)
- View all saved colleges in one place
- Remove saved colleges anytime
- User-scoped data using relational database design

### 📝 Reviews System
- Add reviews with rating (1–5 stars)
- View all college reviews
- Public review visibility per college
- User-linked review system

### 🏫 College Detail Page
Each college includes:
- Overview
- Courses offered
- Fees structure
- Ratings & reviews
- Placement information
- Institute type
- NAAC grade
- Established year
- Official website link
- Cutoff rank
- Related colleges suggestions

### 🔐 Authentication System
- User registration & login
- JWT-based authentication
- HTTP-only cookie session storage
- Protected routes for saved colleges & actions

### 📱 Responsive UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Clean UI using TailwindCSS
- Component-based reusable architecture

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes (Route Handlers)
- Node.js

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT (JSON Web Token)
- HTTP-only cookies

### UI Libraries
- Lucide React Icons

---

## 📂 Project Structure

src/
│
├── app/                     # Next.js App Router (Pages & Routes)
│   ├── colleges/           # College listing & detail pages
│   ├── compare/            # College comparison feature
│   ├── login/              # Authentication - login page
│   ├── register/           # Authentication - register page
│   ├── saved/              # Saved (bookmarked) colleges
│   └── api/                # Backend API routes (Route Handlers)
│
├── components/             # Reusable UI Components
│   ├── collegeDetail/      # College detail page components
│   ├── colleges/           # College listing components
│   ├── compare/            # Compare feature components
│   ├── review/            # Review system components
│   ├── save/              # Save/Bookmark components
│   └── ui/                # Generic UI components (buttons, modals)
│
├── context/               # Global state management (Context API)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (Prisma, helpers, config)
├── services/              # API service layer (frontend → backend calls)
├── types/                 # TypeScript types/interfaces
└── prisma/                # Database schema & migrations

---

## ⚙️ Installation & Setup

### 1. Clone Repository
git clone https://github.com/OmkarProjects-alt/college-discovery-platform.git  
cd college-discovery-platform  

### 2. Install Dependencies
npm install  

### 3. Setup Environment Variables
Create a `.env` file and add:

DATABASE_URL="your_postgresql_database_url"  
JWT_SECRET="your_jwt_secret"  

### 4. Prisma Setup
npx prisma generate  
npx prisma migrate dev  
npx prisma db seed  

### 5. Run Development Server
npm run dev  

App runs at:
http://localhost:3000  

---

## 🗄️ Database Models

User:
- id
- name
- email
- password

College:
- name
- location
- fees
- rating
- overview
- institute type
- NAAC grade
- cutoff rank
- image
- established year

Course:
- name
- duration
- collegeId (relation)

Review:
- userId
- rating
- comment
- college relation

SavedCollege:
- userId
- collegeId (unique constraint)

---

## 🏗️ Architecture Overview

This project follows a modular full-stack architecture using Next.js App Router.

### 🔹 Frontend Architecture
- Server Components for data fetching (colleges, details)
- Client Components for interactive features (reviews, compare, save)
- Context API for global state (compare system, messages)

### 🔹 Backend Architecture
- Next.js Route Handlers (API layer)
- Prisma ORM for database operations
- Modular service layer (`services/`) for separation of logic

### 🔹 Database Design
- Relational schema using PostgreSQL
- Proper foreign key relationships:
  - User → Reviews, Saved Colleges
  - College → Courses, Reviews, Saved Colleges

### 🔹 Key Design Decisions
- Server-first data fetching for performance
- Client-side state only for UI interactions
- Protected APIs using JWT authentication


---

## 🔄 Core Application Workflows

### College Search Flow
User Input → API Filter → Prisma Query → Paginated Results → UI Rendering

### Review Flow
User → Auth Check → Submit Review → API Route → Database → UI Refresh

### Save College Flow
User Click Save → Auth Validation → SavedCollege Table → User-specific fetch

### Compare Flow
User selects colleges → Context State → Comparison UI → Side-by-side rendering

---

## 🔐 Security & Data Handling

- JWT stored in HTTP-only cookies
- Protected routes for saved colleges
- User-scoped data access (no cross-user leakage)
- Input validation on API routes
- Prisma ensures relational integrity

---

## 🎯 Key Highlights

- Full-stack production-ready application
- Real database integration using Prisma
- Authentication with protected routes
- Optimized Next.js App Router architecture
- Clean modular and scalable code structure
- Proper relational database design

---

## 📚 What I Learned

- Full-stack Next.js App Router architecture
- Prisma relational database design
- Authentication using JWT + cookies
- State management for multi-select compare system
- Building scalable backend service structure

---

## 🚀 Future Improvements

- AI-based college recommendation system
- Rank prediction system
- Pagination / infinite scroll optimization
- Email verification system
- User dashboard analytics
- Review moderation system
- College admission probability calculator

---

## 👨‍💻 Author

Omkar Gudappe  
GitHub: https://github.com/OmkarProjects-alt  

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this project useful, please consider giving it a ⭐ on GitHub.