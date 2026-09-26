-- ====================================================
-- AIESEC IN BHOPAL - iGV MOCK SEED DATA
-- 
-- IMPORTANT GOVERNANCE NOTICE:
-- This file contains DEVELOPMENT PLACEHOLDER DATA.
-- Replace with real AIESEC in Bhopal content before release!
-- ====================================================

-- 1. SEED PROJECTS [TEMP_PLACEHOLDER]
INSERT INTO public.projects (
  id, name, slug, description, sdg_numbers, impact_text, local_committee, host_organization, location, start_date, end_date, registration_deadline, application_url, image_url, image_alt_text, status
) VALUES 
(
  'e2b47596-3c06-4b21-a3f2-111111111111',
  '[TEMP_MOCK] Global Classroom 2026',
  'global-classroom-2026',
  'Empower young learners in local community schools across Bhopal by conducting interactive English language, computer literacy, and leadership workshops.',
  ARRAY[4],
  'Impacted 450+ students in 2025 across 6 primary schools in Bhopal.',
  'AIESEC in Bhopal',
  'Bhopal Community Trust',
  'Bhopal, MP, India',
  '2026-11-01',
  '2026-12-15',
  '2026-10-25',
  'https://aiesec.org/opportunity/1345678',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
  'Volunteers conducting classroom sessions with children in Bhopal',
  'published'
),
(
  'e2b47596-3c06-4b21-a3f2-222222222222',
  '[TEMP_MOCK] Green Bhopal Initiative',
  'green-bhopal-initiative',
  'Partner with environmental NGOs to lead urban lake conservation, waste awareness drives, and sustainable climate action campaigns around Upper Lake Bhopal.',
  ARRAY[13, 15],
  'Planted 1,200+ native saplings and conducted lake cleanups involving 300+ youth.',
  'AIESEC in Bhopal',
  'EcoBhopal Action Network',
  'Bhopal, MP, India',
  '2026-11-15',
  '2026-12-28',
  '2026-11-05',
  'https://aiesec.org/opportunity/1345679',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
  'Volunteers planting trees in green park space',
  'published'
),
(
  'e2b47596-3c06-4b21-a3f2-333333333333',
  '[TEMP_MOCK] Health & Hygiene Awareness',
  'health-hygiene-awareness',
  'Organize preventive health workshops, sanitation drives, and nutrition education for underserved communities with healthcare professionals in Bhopal.',
  ARRAY[3, 6],
  'Distributed 800+ health kits and conducted hygiene sessions in 4 local wards.',
  'AIESEC in Bhopal',
  'Swasthya Foundation Bhopal',
  'Bhopal, MP, India',
  '2026-12-01',
  '2027-01-12',
  '2026-11-20',
  'https://aiesec.org/opportunity/1345680',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
  'Health awareness workshop with community members',
  'published'
);

-- 2. SEED TESTIMONIALS [TEMP_PLACEHOLDER]
INSERT INTO public.testimonials (
  volunteer_name, country, quote, is_published, sort_order, image_url, image_alt_text
) VALUES
(
  'Sophia Chen',
  'Taiwan',
  'Volunteering in Bhopal with AIESEC was a life-changing experience! The warmth of the people, the rich heritage of the City of Lakes, and making a real impact in local schools left an indelible mark on my heart.',
  true,
  1,
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  'Sophia Chen, Global Volunteer alumnus'
),
(
  'Lukas Weber',
  'Germany',
  'The local committee in Bhopal supported us every step of the way — from cultural orientation to host accommodation. I grew as a leader and gained lifelong international friendships.',
  true,
  2,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
  'Lukas Weber, Global Volunteer alumnus'
);
