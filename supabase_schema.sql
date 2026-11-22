-- ==============================================================================
-- BHAVANA KONDAKRINDI PORTFOLIO — PRODUCTION SUPABASE SECURITY & RLS SCHEMA
-- ==============================================================================
-- This script configures:
-- 1. UUID extensions
-- 2. Administrator Allowlist table (portfolio_admin_users)
-- 3. Hardened security-definer authorization function (is_portfolio_admin)
-- 4. Content storage table (portfolio_content) with strict RLS policies
-- 5. Storage bucket (portfolio-assets) with anti-XSS upload policies
-- 6. Automated trigger to register bhavanakondakrindi26@gmail.com on sign-up
--
-- HOW TO EXECUTE:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Navigate to SQL Editor -> New Query
-- 3. Paste this entire script and click "Run".
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ADMINISTRATOR ALLOWLIST TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security on the admin allowlist table
ALTER TABLE public.portfolio_admin_users ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. HARDENED AUTHORIZATION FUNCTION (Zero-Trust Security Definer)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.portfolio_admin_users
    WHERE user_id = auth.uid()
  );
$$;

-- Revoke public execution; grant only to authenticated sessions
REVOKE ALL ON FUNCTION public.is_portfolio_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_portfolio_admin() TO authenticated;

-- Allow authenticated admins to view the allowlist (blocks public/anon from viewing admin identities)
DROP POLICY IF EXISTS "Admins can view admin allowlist" ON public.portfolio_admin_users;
CREATE POLICY "Admins can view admin allowlist"
ON public.portfolio_admin_users FOR SELECT TO authenticated
USING (public.is_portfolio_admin());

-- ==============================================================================
-- 4. AUTOMATIC ENROLLMENT TRIGGER FOR BHAVANA'S ADMIN ACCOUNT
-- Automatically records bhavanakondakrindi26@gmail.com into the allowlist
-- upon user registration or invitation in Supabase Auth.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_admin_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF LOWER(NEW.email) = 'bhavanakondakrindi26@gmail.com' THEN
    INSERT INTO public.portfolio_admin_users (user_id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_admin_user_created ON auth.users;
CREATE TRIGGER on_admin_user_created
AFTER INSERT OR UPDATE OF email ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_admin_auth_user();

-- Also auto-enroll if the user already exists in auth.users
INSERT INTO public.portfolio_admin_users (user_id, email)
SELECT id, email FROM auth.users 
WHERE LOWER(email) = 'bhavanakondakrindi26@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- ==============================================================================
-- 5. PORTFOLIO CONTENT TABLE & RLS POLICIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_type TEXT NOT NULL CHECK (version_type IN ('draft', 'published')),
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_by UUID REFERENCES auth.users(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_version_type 
ON public.portfolio_content (version_type);

ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public visitors (anon) and authenticated users can ONLY read published content
DROP POLICY IF EXISTS "Public visitors can read published content" ON public.portfolio_content;
CREATE POLICY "Public visitors can read published content"
ON public.portfolio_content FOR SELECT TO anon, authenticated
USING (version_type = 'published');

-- Policy 2: Authenticated administrator can also read drafts
DROP POLICY IF EXISTS "Admin can read all content versions" ON public.portfolio_content;
CREATE POLICY "Admin can read all content versions"
ON public.portfolio_content FOR SELECT TO authenticated
USING (public.is_portfolio_admin());

-- Policy 3: ONLY verified administrators can INSERT content
DROP POLICY IF EXISTS "Admin can insert portfolio content" ON public.portfolio_content;
CREATE POLICY "Admin can insert portfolio content"
ON public.portfolio_content FOR INSERT TO authenticated
WITH CHECK (public.is_portfolio_admin());

-- Policy 4: ONLY verified administrators can UPDATE content
DROP POLICY IF EXISTS "Admin can update portfolio content" ON public.portfolio_content;
CREATE POLICY "Admin can update portfolio content"
ON public.portfolio_content FOR UPDATE TO authenticated
USING (public.is_portfolio_admin())
WITH CHECK (public.is_portfolio_admin());

-- Policy 5: ONLY verified administrators can DELETE content
DROP POLICY IF EXISTS "Admin can delete portfolio content" ON public.portfolio_content;
CREATE POLICY "Admin can delete portfolio content"
ON public.portfolio_content FOR DELETE TO authenticated
USING (public.is_portfolio_admin());

-- ==============================================================================
-- 6. STORAGE BUCKET CONFIGURATION & POLICIES (portfolio-assets)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Read Policy: Public can view assets
DROP POLICY IF EXISTS "Public read portfolio assets" ON storage.objects;
CREATE POLICY "Public read portfolio assets"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'portfolio-assets');

-- Storage Upload Policy: Admin only, restricted strictly to safe raster images (blocks SVG/HTML Stored XSS)
DROP POLICY IF EXISTS "Admin upload portfolio assets" ON storage.objects;
CREATE POLICY "Admin upload portfolio assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'portfolio-assets'
    AND public.is_portfolio_admin()
    AND (storage.extension(name) IN ('png', 'jpg', 'jpeg', 'webp', 'gif'))
);

DROP POLICY IF EXISTS "Admin update portfolio assets" ON storage.objects;
CREATE POLICY "Admin update portfolio assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio-assets' AND public.is_portfolio_admin());

DROP POLICY IF EXISTS "Admin delete portfolio assets" ON storage.objects;
CREATE POLICY "Admin delete portfolio assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio-assets' AND public.is_portfolio_admin());
