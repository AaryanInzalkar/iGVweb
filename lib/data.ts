import { Project } from '@/types/project';
import { Testimonial } from '@/types/testimonial';
import { MOCK_PROJECTS, MOCK_TESTIMONIALS } from '@/lib/mock-data';
import { getDerivedProjectStatus } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetches all published public projects.
 * Excludes draft or archived projects, and automatically calculates derived status for deadlines.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .in('status', ['published', 'closing_soon'])
        .order('registration_deadline', { ascending: true });

      if (!error && data) {
        return data.map((p) => ({
          ...p,
          status: getDerivedProjectStatus(p.status, p.registration_deadline),
        }));
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to mock dataset', e);
    }
  }

  // Fallback to local development mock data
  return MOCK_PROJECTS.map((p) => ({
    ...p,
    status: getDerivedProjectStatus(p.status, p.registration_deadline),
  })).filter((p) => p.status === 'published' || p.status === 'closing_soon');
}

/**
 * Fetches a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return {
          ...data,
          status: getDerivedProjectStatus(data.status, data.registration_deadline),
        };
      }
    } catch (e) {
      console.warn('Supabase slug query failed, falling back to mock dataset', e);
    }
  }

  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;

  return {
    ...project,
    status: getDerivedProjectStatus(project.status, project.registration_deadline),
  };
}

/**
 * Fetches published testimonials.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase testimonials query failed, falling back to mock dataset', e);
    }
  }

  return MOCK_TESTIMONIALS.filter((t) => t.is_published);
}
