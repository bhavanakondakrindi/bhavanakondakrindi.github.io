# Bhavana Kondakrindi — Creative Developer Portfolio & Digital Scrapbook CMS

A bespoke, editorial magazine and digital scrapbook developer portfolio engineered for **Bhavana Kondakrindi** (B.Tech Computer Science & Engineering student at KLH Deemed to be University).

Underneath the tactile scrapbook aesthetic (graph paper textures, washi tape, binder clips, polaroids, collectible skill labels, and expanding project dossiers) lies a **full-page, private administrator Content Management System (CMS)** powered by Supabase with Row Level Security (RLS) and offline-ready local persistence.

---

## 🎨 Visual Identity & Creative Direction

Inspired by physical journals, editorial magazines, and playful tactile stationery:

- **Graph Paper & Notebook Patterns**: Custom SVG/CSS grid paper textures (`bg-graph-paper`, `bg-lined-paper`, `bg-dot-grid`).
- **Washi Tape & Binder Clips**: Realistic semi-transparent washi tape with torn serrated edges and SVG binder clips (bulldog clips, pastel clips, wire heart paperclips).
- **Polaroid Framing**: Custom polaroid photo frames with subtle rotation, shadows, washi tape pins, and handwritten captions (Caveat font).
- **Curated Flexible Palettes**: 5 switchable editorial palettes (*Warm Editorial Paper*, *Rose & Sage Scrapbook*, *Denim & Daisy*, *Matcha & Buttercream*, *Classic Mono & Amber*), plus custom hex color controls in Admin mode.
- **Subtle Custom Cursor**: Small circular pointer with delicate trailing ring on desktop, touch-aware, non-blocking, respecting reduced-motion accessibility.

---

## 🚀 Two Distinct Experiences

### 1. Visitor Mode (Public Experience)
- **Hero Cover**: Expressive oversized typography, fact-based professional introduction, verified KLH CSE sophomore status, CGPA ~9.5, personal photograph placeholder, and ribbon ticker.
- **Field Notes (About Me)**: Journal layout highlighting academic foundations, engineering philosophy, and focus on practical applications.
- **Technical Skills**: Collectible categorized labels across *Programming Languages* (Java, Python, JavaScript), *Web Development* (HTML, CSS, React.js), and *Computer Science* (Data Structures & Algorithms, Object-Oriented Programming). Zero fake percentage bars.
- **Selected Projects Collection**: Horizontally scrollable draggable carousel (Framer Motion) showcasing all 5 actual projects:
  1. **Airline Disruption Management System** (React.js, operational delays, passenger re-accommodation simulation, voucher generation)
  2. **SkyRoute: AI-Based Smart Drone Delivery Optimization System** (Python, Pygame, A* pathfinding, weather vectors, battery management)
  3. **StudyForge** (Collaborative study platform)
  4. **EcoQuest** (Waste-management & community recycling platform)
  5. **Personal Finance Manager** (Java-based OOP financial ledger)
- **Expanding Project Dossier Modal**: Cards smoothly expand into an immersive full-screen dossier featuring problem statements, engineering objectives, architecture, challenges, and repository links. Keyboard accessible with `Esc` and arrow key navigation.
- **Education & Milestones**: Academic timeline at KLH Deemed to be University, core coursework, and editable accomplishment slots.
- **Contact Postcard**: Direct profile links (GitHub: `bhavanakondakrindi`, LinkedIn: `bhavana-kondakrindi-26bb57379`), email placeholder, and validated form with transparent delivery feedback.

### 2. Admin Mode (Private Full-Page CMS at `/#/admin`)
- Accessible via the discreet **Admin Portal** link in the header/footer.
- **Secure Authentication Screen**: Log in via Supabase Auth or offline Local Admin Mode (`admin@portfolio.local` / `admin123`).
- **Takes Over Full Screen**: Completely replaces the public layout with a professional multi-column studio.
- **Multi-Column Layout**:
  - **Left Sidebar**: 13 management tabs (Overview, Hero, About, Skills, Projects, Education, Achievements, Contact, Appearance, Scrapbook, Animations, Media Library, Supabase Settings).
  - **Main Workspace**: Full CRUD editors for copy, categories, skills, project dossiers, and credentials.
  - **Right Panel (Live Preview)**: Interactive hot-reloading preview toggle with Desktop (100%), Tablet (768px), and Mobile (375px) responsive frames.
- **Draft vs. Published Workflow**:
  - **Save Draft**: Saves work-in-progress locally or to the Supabase draft record. Public visitors only see the published version!
  - **Publish Changes**: Copies draft state to live publication with celebratory confetti.
  - **Revert / Reset**: Easily discard unpublished edits or restore default initial data.
  - **Export / Import JSON**: Complete offline snapshot backup and restore.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, JavaScript (ES Modules)
- **Styling**: Tailwind CSS 3.4, PostCSS, Autoprefixer, Google Fonts (*Fraunces*, *Playfair Display*, *Plus Jakarta Sans*, *Caveat*, *JetBrains Mono*)
- **Animations & Interactions**: Framer Motion 14, Canvas Confetti
- **Icons**: Lucide React + custom inline SVG brand glyphs
- **Backend**: Supabase (PostgreSQL, Row Level Security, Auth, Storage) with seamless local storage fallback
- **Routing & Deployment**: GitHub Pages-compatible hash routing (`#/`, `#/admin`), relative asset base (`./`)

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

Open `http://localhost:5173/` in your browser.  
To access the Admin CMS, visit `http://localhost:5173/#/admin` or click **Admin** in the header.

---

## 🔒 Supabase Configuration Guide

The portfolio works 100% out of the box in **Local Admin Mode** even before configuring Supabase. To connect your live Supabase backend:

1. **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a free project.
2. **Execute Database Schema**:
   - In your Supabase Dashboard, open the **SQL Editor**.
   - Copy the contents of [`supabase_schema.sql`](file:///c:/Users/Bhavana/OneDrive/Desktop/BHAVANA%20PORTFOLIO/supabase_schema.sql).
   - Paste into the SQL editor and click **Run**.
   - This creates `portfolio_content`, `projects`, `skills`, `contact_messages`, configures the `portfolio_media` storage bucket, and enables strict Row Level Security (RLS).
3. **Create Your First Admin User**:
   - In Supabase Dashboard, go to **Authentication** -> **Users** -> **Add User**.
   - Enter your administrator email and a strong password.
4. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`:
     ```env
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-public-key
     ```
   - Restart your Vite dev server (`npm run dev`).
   - Log into `/#/admin` using the email and password you created!

---

## 🌐 GitHub Pages Deployment Guide

The repository includes a ready-to-use GitHub Actions workflow at [`.github/workflows/deploy.yml`](file:///c:/Users/Bhavana/OneDrive/Desktop/BHAVANA%20PORTFOLIO/.github/workflows/deploy.yml).

### Steps to Deploy:
1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Creative Developer Portfolio & Scrapbook CMS"
   git branch -M main
   git remote add origin https://github.com/bhavanakondakrindi/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. If using Supabase in production, add your secrets in **Settings** -> **Secrets and variables** -> **Actions**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. The workflow will automatically build and deploy your site to `https://bhavanakondakrindi.github.io/YOUR_REPO_NAME/`.
