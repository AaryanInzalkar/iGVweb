# AIESEC in Bhopal — Incoming Global Volunteer (iGV)

A responsive marketing and project-discovery website for AIESEC in Bhopal's Incoming Global Volunteer (iGV) program. The site explains the program, promotes Bhopal as a volunteer destination, showcases SDG-aligned projects, builds trust through testimonials, and directs applicants to the official external AIESEC application platform.

> ⚠️ **This project currently contains placeholder/mock content.** Anything marked `[TEMP_PLACEHOLDER]` or `[TEMP_MOCK]` in the code (see `lib/constants.ts` and `lib/mock-data.ts`) — including project names, contact info, social links, and application URLs — must be replaced with real AIESEC in Bhopal content before production launch.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Deployment:** [Vercel](https://vercel.com/)

The site does **not** process volunteer applications internally — clicking "Apply Now" sends users to the official AIESEC Opportunity Portal / application form in a new tab. There are no public user accounts, payments, or chat features.

---

## Project Structure

```
app/
├── page.tsx                  # Homepage (all public sections)
├── projects/[slug]/          # Individual project detail pages
├── admin/                    # Admin CMS (login, dashboard, project/testimonial/content management)
├── sitemap.ts / robots.ts    # SEO config

components/
├── layout/                   # Header, Footer
├── sections/                 # Hero, Why Bhopal, Experience Pillars, SDG/Impact, Testimonials, FAQ
├── projects/                 # ProjectCard, ProjectGrid
└── ui/                       # Reusable UI primitives (Button, Badge, Accordion, etc.)

lib/
├── constants.ts               # Site metadata, brand colors, governance flags
├── data.ts                    # Data layer (tries Supabase, falls back to mock data)
├── mock-data.ts                # Development/placeholder dataset
└── utils.ts                   # Status/deadline calculation helpers

types/                         # TypeScript interfaces (Project, Testimonial, Admin, Content)

supabase/
├── migrations/                # Database schema + Row Level Security (RLS) policies
└── seed.sql                   # Seed data

tests/unit/                    # Unit tests
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables (optional for local dev)
Copy the example file:
```bash
cp .env.example .env.local
```
Without Supabase credentials configured, the site automatically falls back to mock data (`lib/mock-data.ts`), so you can run it locally without any setup.

To connect a real Supabase project, add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Other scripts
```bash
npm run build   # Production build
npm run start   # Run the production build locally
npm run lint     # Run ESLint
```

---

## Database Setup (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. Run the migrations in order against your project's SQL editor or CLI:
   ```
   supabase/migrations/01_schema.sql
   supabase/migrations/02_rls.sql
   ```
3. Optionally load `supabase/seed.sql` for sample data.
4. Add your project's URL and anon key to `.env.local` as shown above.

Row Level Security (RLS) is enabled on all tables — public visitors can only read published projects/testimonials, while write access requires an authenticated admin.

---

## Admin CMS

The admin area lives at `/admin` (login at `/admin/login`).

> ⚠️ **Known limitation:** Admin login currently uses a local development fallback (not real Supabase Auth), and the admin dashboard is not yet wired to the database — changes made there do not persist. This needs to be completed before the CMS is usable in production. See `app/admin/login/page.tsx` and `app/admin/page.tsx`.

Once fully wired, roles (`owner`, `admin`, `editor`) will control access to:
- `/admin/projects` — create/edit/publish/archive volunteer projects
- `/admin/testimonials` — manage testimonials
- `/admin/content` — edit site-wide content (hero text, contact info, social links)

---

## Content Governance

To prevent placeholder content from silently shipping to production, every provisional value is explicitly tagged in code:
- `lib/constants.ts` → `GOVERNANCE_CONFIG.IS_TEMP_MOCK_DATA`
- Placeholder URLs/emails/socials are commented `// [TEMP_PLACEHOLDER]`
- Mock project names are prefixed `[TEMP_MOCK]`

**Before launch:** search the codebase for `TEMP_PLACEHOLDER` and `TEMP_MOCK` and replace every instance with real AIESEC in Bhopal content (logo, imagery, project data, application URLs, social links, contact email).

---

## Deployment

The project is set up for deployment on [Vercel](https://vercel.com/):

1. Connect the GitHub repository to a Vercel project.
2. Add the Supabase environment variables in Vercel's project settings.
3. Push to `main` to trigger a production deployment (or open a PR for a preview deployment).

---

## License

Internal project for AIESEC in Bhopal. Not licensed for public reuse.