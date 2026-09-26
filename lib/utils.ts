import { ProjectStatus } from '@/types/project';

/**
 * Merges class names cleanly.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Calculates derived status based on project deadline and current date.
 * If deadline has passed, status becomes 'closed'.
 * If deadline is within 7 days and project is 'published', status becomes 'closing_soon'.
 */
export function getDerivedProjectStatus(
  status: ProjectStatus,
  registrationDeadline: string
): ProjectStatus {
  if (status === 'draft' || status === 'archived' || status === 'closed') {
    return status;
  }

  const now = new Date();
  const deadline = new Date(registrationDeadline);

  // Reset time portions for pure date comparison
  now.setHours(0, 0, 0, 0);
  deadline.setHours(23, 59, 59, 999);

  if (deadline < now) {
    return 'closed';
  }

  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return 'closing_soon';
  }

  return 'published';
}

/**
 * Formats ISO date string to human readable format (e.g., Oct 15, 2026).
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Slugifies a project title into lowercase URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Checks if a string is a valid HTTPS URL.
 */
export function isValidHttpsUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
