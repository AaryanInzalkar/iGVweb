-- ==========================================
-- AIESEC IN BHOPAL - iGV DATABASE SCHEMA
-- Migration 02: Row Level Security & Functions
-- ==========================================

-- Authorization Helper Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles 
    WHERE user_id = auth.uid() 
      AND is_active = true 
      AND role IN ('owner', 'admin', 'editor')
  );
$$;

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PROJECTS POLICIES
-- Public read: only published or closing_soon projects
CREATE POLICY "Public users can view published projects"
  ON public.projects FOR SELECT
  USING (status IN ('published', 'closing_soon'));

-- Admin full access
CREATE POLICY "Admins have full access to projects"
  ON public.projects FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 2. TESTIMONIALS POLICIES
CREATE POLICY "Public users can view published testimonials"
  ON public.testimonials FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins have full access to testimonials"
  ON public.testimonials FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 3. SITE CONTENT POLICIES
CREATE POLICY "Public users can view site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Admins have full access to site content"
  ON public.site_content FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. ADMIN PROFILES POLICIES
CREATE POLICY "Admins can view profiles"
  ON public.admin_profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Owners can manage profiles"
  ON public.admin_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE user_id = auth.uid() AND is_active = true AND role = 'owner'
    )
  );

-- 5. MEDIA ASSETS POLICIES
CREATE POLICY "Public users can view media assets"
  ON public.media_assets FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage media assets"
  ON public.media_assets FOR ALL
  USING (public.is_admin());

-- 6. AUDIT LOGS POLICIES
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());
