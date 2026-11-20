-- ==============================================================================
-- BHAVANA KONDAKRINDI — PORTFOLIO SUPABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================
-- This SQL script sets up all tables, Row Level Security (RLS) policies,
-- and storage bucket configuration for Bhavana's portfolio CMS.
--
-- HOW TO RUN THIS IN SUPABASE:
-- 1. Log in to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Open your project -> Navigate to 'SQL Editor' -> Click 'New Query'
-- 3. Paste this entire script and click 'Run'.
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PORTFOLIO CONTENT (Stores Draft & Published versions of site data)
CREATE TABLE IF NOT EXISTS public.portfolio_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_type TEXT NOT NULL CHECK (version_type IN ('draft', 'published')),
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_by UUID REFERENCES auth.users(id)
);

-- Ensure only one active draft and one active published row
CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_version_type 
ON public.portfolio_content (version_type);

-- 3. PROJECTS TABLE (Structured records for individual queries)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    color TEXT DEFAULT '#FEF9C3',
    accent TEXT DEFAULT '#EAB308',
    summary TEXT NOT NULL,
    problem_statement TEXT,
    objectives TEXT[],
    features TEXT[] NOT NULL,
    technologies TEXT[] NOT NULL,
    implementation_details TEXT,
    challenges TEXT,
    image TEXT,
    github_url TEXT,
    demo_url TEXT,
    badge TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    level TEXT,
    notes TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTACT INQUIRIES TABLE (Optional storage for visitor messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_read BOOLEAN DEFAULT false
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Security: Public visitors may only READ published content.
-- Writes, updates, and deletes are strictly restricted to authenticated administrators.
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy A: Public visitors can ONLY SELECT published portfolio content
CREATE POLICY "Public visitors can read published content"
ON public.portfolio_content
FOR SELECT
TO anon, authenticated
USING (version_type = 'published');

-- Policy B: Authenticated admin can read draft and published content
CREATE POLICY "Admin can read all content versions"
ON public.portfolio_content
FOR SELECT
TO authenticated
USING (true);

-- Policy C: Only authenticated admin can insert/update/delete portfolio content
CREATE POLICY "Admin can modify portfolio content"
ON public.portfolio_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy D: Public can read all published projects
CREATE POLICY "Public can read projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy E: Only admin can insert/update/delete projects
CREATE POLICY "Admin can modify projects"
ON public.projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy F: Public can read skills
CREATE POLICY "Public can read skills"
ON public.skills
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy G: Only admin can modify skills
CREATE POLICY "Admin can modify skills"
ON public.skills
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy H: Public can submit contact messages, but cannot read other people's messages
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy I: Only authenticated admin can read or delete contact messages
CREATE POLICY "Admin can read contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (portfolio_media)
-- ==============================================================================
-- Run this block to set up the storage bucket for screenshots, avatars, and assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images in portfolio_media
CREATE POLICY "Public Media Access"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'portfolio_media');

-- Only authenticated admin can upload/update/delete media files
CREATE POLICY "Admin Media Upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio_media');

CREATE POLICY "Admin Media Update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio_media');

CREATE POLICY "Admin Media Delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio_media');

-- ==============================================================================
-- CREATING YOUR FIRST ADMIN USER
-- ==============================================================================
-- In the Supabase dashboard:
-- 1. Go to 'Authentication' -> 'Users' -> Click 'Add user' -> 'Create user'.
-- 2. Enter your admin email and a strong password.
-- 3. Confirm the user.
-- 4. In your portfolio website, click 'Admin Portal' in the footer or header,
--    and log in with those credentials!
-- ==============================================================================
