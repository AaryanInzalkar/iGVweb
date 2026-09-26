-- ==========================================
-- AIESEC IN BHOPAL - iGV DATABASE SCHEMA
-- Migration 01: Core ENUMs, Tables & Indexes
-- ==========================================

-- ENUMs
CREATE TYPE public.project_status AS ENUM ('draft', 'published', 'closing_soon', 'closed', 'archived');
CREATE TYPE public.site_content_type AS ENUM ('text', 'rich_text', 'url', 'image', 'json', 'boolean', 'number');
CREATE TYPE public.admin_role AS ENUM ('owner', 'admin', 'editor');
CREATE TYPE public.audit_action AS ENUM ('create', 'update', 'publish', 'unpublish', 'archive', 'restore', 'delete', 'login', 'logout', 'permission_change');

-- 1. PROJECTS TABLE
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  sdg_numbers INTEGER[] NOT NULL DEFAULT '{}',
  impact_text TEXT NOT NULL,
  local_committee TEXT NOT NULL DEFAULT 'AIESEC in Bhopal',
  host_organization TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Bhopal, India',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_deadline DATE NOT NULL,
  application_url TEXT NOT NULL,
  image_url TEXT,
  image_alt_text TEXT,
  status project_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT projects_valid_dates CHECK (end_date >= start_date),
  CONSTRAINT projects_valid_application_url CHECK (application_url ~ '^https://')
);

-- Indexes for projects query performance
CREATE INDEX projects_status_idx ON public.projects(status);
CREATE INDEX projects_deadline_idx ON public.projects(registration_deadline);
CREATE INDEX projects_start_date_idx ON public.projects(start_date);
CREATE INDEX projects_status_deadline_idx ON public.projects(status, registration_deadline);
CREATE INDEX projects_published_idx ON public.projects(published_at) WHERE status = 'published';
CREATE INDEX projects_updated_at_idx ON public.projects(updated_at DESC);

-- 2. TESTIMONIALS TABLE
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  quote TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  image_url TEXT,
  image_alt_text TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX testimonials_published_idx ON public.testimonials(is_published, sort_order);
CREATE INDEX testimonials_project_id_idx ON public.testimonials(project_id);

-- 3. SITE CONTENT TABLE
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  content_type site_content_type NOT NULL DEFAULT 'text',
  description TEXT,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX site_content_key_idx ON public.site_content(key);

-- 4. ADMIN PROFILES TABLE
CREATE TABLE public.admin_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role admin_role NOT NULL DEFAULT 'editor',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. MEDIA ASSETS TABLE
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. CONTENT REVISONS TABLE
CREATE TABLE public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  snapshot JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. AUDIT LOGS TABLE
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
