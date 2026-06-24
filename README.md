# 🎓 College Discovery

A modern full-stack college discovery platform built with Next.js, Prisma, PostgreSQL, and Tailwind CSS. Students can search colleges, compare institutions, explore courses, read reviews, and save their favorite colleges for future reference.

---

## 🚀 Features

### 🔍 College Search & Discovery
- Search colleges by:
  - College Name
  - Location
  - Course
  - Student Rank
- Filter colleges by:
  - Rating
  - Fees
  - Course
  - Location

### 📊 College Comparison
- Compare multiple colleges side-by-side
- View key differences in:
  - Fees
  - Ratings
  - Courses
  - Institute Type
  - NAAC Grade

### ❤️ Saved Colleges
- Save favorite colleges
- View all bookmarked colleges
- Remove colleges from saved list
- Authentication required

### 📝 Reviews System
- Public reviews (no login required)
- View ratings and feedback from students
- Explore college experiences

### 🏫 Detailed College Information
Each college includes:
- Overview
- Courses Offered
- Fees
- Rating
- Placement Information
- Institute Type
- NAAC Grade
- Establishment Year
- Official Website
- Cutoff Rank
- Related Colleges

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Cookie-based Sessions
- Protected Bookmark Features

### 📱 Responsive Design
- Desktop Friendly
- Tablet Friendly
- Mobile Responsive

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js Route Handlers
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- JWT
- HTTP Only Cookies

### UI Libraries
- Lucide React Icons

---

## 📂 Project Structure

```txt
src/
│
├── app/
│   ├── colleges/
│   ├── compare/
│   ├── login/
│   ├── register/
│   ├── saved/
│   └── api/
│
├── components/
│   ├── colleges/
│   ├── compare/
│   ├── collegeDetail/
│   ├── SaveCollege/
│   └── ui/
│
├── context/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── types/
│
└── prisma/
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/OmkarProjects-alt/college-discovery-platform.git
cd college-discovery-platform
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create:

```bash
.env
```

Add:

```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migrations

```bash
npx prisma migrate dev
```

### Seed Database

```bash
npx prisma db seed
```

### Start Development Server

```bash
npm run dev
```

Application runs at:

```txt
http://localhost:3000
```

---

## 🗄️ Database Models

### User
- Name
- Email
- Password

### College
- Name
- Location
- Fees
- Rating
- Placement Data
- Overview
- Image
- Institute Type
- NAAC Grade
- Established Year
- Official Website
- Cutoff Rank

### Course
- Course Name
- Duration

### Review
- User Name
- Comment
- Rating

### Saved Colleges
- User
- College

---

## 🎯 Future Improvements

- College Recommendation System
- AI Based College Suggestions
- Advanced Rank Predictor
- College Admission Chances
- User Profile Dashboard
- Review Verification
- College Ranking System
- Pagination & Infinite Scroll
- Email Verification
- Forgot Password Feature

---

## 📸 Screenshots

### Home Page

_Add screenshot here_

### College Listing

_Add screenshot here_

### College Detail Page

_Add screenshot here_

### Compare Colleges

_Add screenshot here_

### Saved Colleges

_Add screenshot here_

---

## 👨‍💻 Author

**Omkar Gudappe**

Aspiring Full Stack Developer passionate about building modern web applications using React, Next.js, TypeScript, and PostgreSQL.

GitHub:
https://github.com/OmkarProjects-alt

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub.