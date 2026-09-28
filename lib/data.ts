import { db } from '@/db';
import { projects, testimonials } from '@/db/schema';
import { eq, inArray, asc } from 'drizzle-orm';
import { Project } from '@/types/project';
import { Testimonial } from '@/types/testimonial';
import { MOCK_PROJECTS, MOCK_TESTIMONIALS } from '@/lib/mock-data';
import { getDerivedProjectStatus } from '@/lib/utils';

const isDbConfigured = Boolean(process.env.DATABASE_URL);

/**
 * Fetches all published public projects.
 * Excludes draft/archived, and calculates derived status for deadlines.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  if (isDbConfigured) {
    try {
      const rows = await db
        .select()
        .from(projects)
        .where(inArray(projects.status, ['published', 'closing_soon']))
        .orderBy(asc(projects.registrationDeadline));

      if (rows.length > 0) {
        return rows.map((p) => mapDbProjectToProject(p));
      }
    } catch (e) {
      console.warn('Neon query failed, falling back to mock dataset', e);
    }
  }

  return MOCK_PROJECTS.map((p) => ({
    ...p,
    status: getDerivedProjectStatus(p.status, p.registration_deadline),
  })).filter((p) => p.status === 'published' || p.status === 'closing_soon');
}

/**
 * Fetches a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isDbConfigured) {
    try {
      const [row] = await db.select().from(projects).where(eq(projects.slug, slug));
      if (row) return mapDbProjectToProject(row);
    } catch (e) {
      console.warn('Neon slug query failed, falling back to mock dataset', e);
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
 * Fetches ALL projects regardless of status — for admin use only.
 * Do not call this from public-facing pages.
 */
export async function getAllProjectsForAdmin(): Promise<Project[]> {
  if (isDbConfigured) {
    try {
      const rows = await db.select().from(projects).orderBy(asc(projects.registrationDeadline));
      return rows.map((p) => mapDbProjectToProject(p));
    } catch (e) {
      console.warn('Neon admin query failed, falling back to mock dataset', e);
    }
  }
  return MOCK_PROJECTS;
}

/**
 * Fetches published testimonials.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (isDbConfigured) {
    try {
      const rows = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isPublished, true));
      if (rows.length > 0) {
        return rows.map((t) => ({
          id: t.id,
          volunteer_name: t.volunteerName,
          country: t.countryOfOrigin ?? '',
          quote: t.quote,
          project_id: t.projectId ?? null,
          image_url: t.photoUrl ?? undefined,
          is_published: t.isPublished,
          sort_order: t.sortOrder ?? 0,
          created_at: t.createdAt?.toISOString(),
        }));
      }
    } catch (e) {
      console.warn('Neon testimonials query failed, falling back to mock dataset', e);
    }
  }

  return MOCK_TESTIMONIALS.filter((t) => t.is_published);
}

// Maps Drizzle's camelCase row shape back to the app's existing snake_case Project type,
// so every component that already expects `project.start_date` etc. keeps working unchanged.
function mapDbProjectToProject(p: typeof projects.$inferSelect): Project {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    sdg_numbers: p.sdgNumbers,
    impact_text: p.impactText ?? '',
    local_committee: p.localCommittee,
    host_organization: p.hostOrganization,
    location: p.location,
    start_date: p.startDate,
    end_date: p.endDate,
    registration_deadline: p.registrationDeadline,
    application_url: p.applicationUrl,
    image_url: p.imageUrl ?? undefined,
    image_alt_text: p.imageAltText ?? undefined,
    status: getDerivedProjectStatus(p.status, p.registrationDeadline),
    published_at: p.publishedAt?.toISOString() ?? null,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}