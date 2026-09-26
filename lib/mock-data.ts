import { Project } from '@/types/project';
import { Testimonial } from '@/types/testimonial';
import { SiteContent } from '@/types/content';

/**
 * DEVELOPMENT MOCK DATASET
 * Clearly tagged with [TEMP_MOCK_DATA]
 */

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1-global-classroom',
    name: '[TEMP_MOCK] Global Classroom 2026',
    slug: 'global-classroom-2026',
    description:
      'Empower young learners in local community schools across Bhopal by conducting interactive English language, computer literacy, and global leadership workshops. Volunteers work directly with teachers to build interactive learning modules.',
    sdg_numbers: [4],
    impact_text: 'Impacted 450+ primary school students across 6 community schools in Bhopal.',
    local_committee: 'AIESEC in Bhopal',
    host_organization: 'Bhopal Community Learning Trust',
    location: 'Bhopal, MP, India',
    start_date: '2026-11-01',
    end_date: '2026-12-15',
    registration_deadline: '2026-10-25',
    application_url: 'https://aiesec.org/opportunity/1345678',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
    image_alt_text: 'Volunteers leading classroom activities in Bhopal',
    status: 'published',
    published_at: '2026-09-01T00:00:00Z',
    created_at: '2026-09-01T00:00:00Z',
    updated_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'p2-green-bhopal',
    name: '[TEMP_MOCK] Green Bhopal Initiative',
    slug: 'green-bhopal-initiative',
    description:
      'Partner with environmental NGOs to lead urban lake conservation, waste awareness drives, and sustainable climate action campaigns around the historic Upper Lake Bhopal.',
    sdg_numbers: [13, 15],
    impact_text: 'Planted 1,200+ native trees and conducted lake conservation drives with 300+ youth.',
    local_committee: 'AIESEC in Bhopal',
    host_organization: 'EcoBhopal Action Network',
    location: 'Bhopal, MP, India',
    start_date: '2026-11-15',
    end_date: '2026-12-28',
    registration_deadline: '2026-11-05',
    application_url: 'https://aiesec.org/opportunity/1345679',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    image_alt_text: 'Environmental conservation drive in Bhopal',
    status: 'published',
    published_at: '2026-09-02T00:00:00Z',
    created_at: '2026-09-02T00:00:00Z',
    updated_at: '2026-09-02T00:00:00Z',
  },
  {
    id: 'p3-health-hygiene',
    name: '[TEMP_MOCK] Health & Hygiene Awareness',
    slug: 'health-hygiene-awareness',
    description:
      'Organize preventive healthcare workshops, sanitation drives, and nutrition awareness sessions in collaboration with local healthcare professionals for underserved communities in Bhopal.',
    sdg_numbers: [3, 6],
    impact_text: 'Distributed 800+ health kits and conducted hygiene awareness sessions in 4 local wards.',
    local_committee: 'AIESEC in Bhopal',
    host_organization: 'Swasthya Foundation Bhopal',
    location: 'Bhopal, MP, India',
    start_date: '2026-12-01',
    end_date: '2027-01-12',
    registration_deadline: '2026-11-20',
    application_url: 'https://aiesec.org/opportunity/1345680',
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    image_alt_text: 'Healthcare and sanitation awareness session',
    status: 'published',
    published_at: '2026-09-03T00:00:00Z',
    created_at: '2026-09-03T00:00:00Z',
    updated_at: '2026-09-03T00:00:00Z',
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    volunteer_name: 'Sophia Chen',
    country: 'Taiwan',
    quote:
      'Volunteering in Bhopal with AIESEC was a life-changing experience! The warmth of the local community, the rich culture of the City of Lakes, and making a tangible impact in local schools left an indelible mark on my heart.',
    project_id: 'p1-global-classroom',
    project_name: 'Global Classroom',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    image_alt_text: 'Sophia Chen, Global Volunteer alumnus',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 't2',
    volunteer_name: 'Lukas Weber',
    country: 'Germany',
    quote:
      'The local committee in Bhopal supported us every step of the way — from cultural orientation to host accommodation. I grew as a leader and gained lifelong international friendships.',
    project_id: 'p2-green-bhopal',
    project_name: 'Green Bhopal Initiative',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    image_alt_text: 'Lukas Weber, Global Volunteer alumnus',
    is_published: true,
    sort_order: 2,
  },
  {
    id: 't3',
    volunteer_name: 'Amina Mansour',
    country: 'Egypt',
    quote:
      'Working on SDG alignment with passionate youth from around the world opened my eyes to global community leadership. Bhopal is a city full of heart, history, and inspiration.',
    project_id: 'p3-health-hygiene',
    project_name: 'Health & Hygiene Awareness',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    image_alt_text: 'Amina Mansour, Global Volunteer alumnus',
    is_published: true,
    sort_order: 3,
  },
];

export const MOCK_SITE_CONTENT: Record<string, string> = {
  'hero.tagline': 'Lead the Change. Experience Bhopal.',
  'hero.subtitle':
    'Develop your leadership potential by volunteering for high-impact social projects in Bhopal, India aligned with UN Sustainable Development Goals.',
  'why_bhopal.title': 'Why Volunteer in Bhopal?',
  'why_bhopal.subtitle':
    'Known as the City of Lakes, Bhopal combines rich historical heritage, vibrant student culture, lush green parks, and warm hospitality with impactful community initiatives.',
};
