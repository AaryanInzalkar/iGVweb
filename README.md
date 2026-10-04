# AIESEC in Bhopal — Incoming Global Volunteer (iGV)

A responsive marketing and project-discovery website for AIESEC in Bhopal's Incoming Global Volunteer (iGV) program. The site explains the program, promotes Bhopal as a volunteer destination, showcases SDG-aligned projects, builds trust through testimonials, and directs applicants to the official external AIESEC application platform.

> ⚠️ **This project currently contains placeholder/mock content.** Anything marked `[TEMP_PLACEHOLDER]` or `[TEMP_MOCK]` in the code (see `lib/constants.ts` and `lib/mock-data.ts`) — including project names, contact info, social links, and application URLs — must be replaced with real AIESEC in Bhopal content before production launch. The Hero section's showcase cards also still contain hardcoded sample project data (`components/sections/HeroSection.tsx`) rather than pulling from the database — this needs to be connected before launch.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Neon](https://neon.tech/) (serverless Postgres)
- **ORM:** [Drizzle](https://orm.drizzle.team/)
- **Auth:** [NextAuth.js](https://next-auth.js.org/) (credentials provider, admin-only)
- **Media storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) *(planned — not yet wired into the admin form)*
- **Deployment:** [Vercel](https://vercel.com/)

The site does **not** process volunteer applications internally — clicking "Apply Now" sends users to the official AIESEC Opportunity Portal / application form in a new tab. There are no public user accounts, payments, or chat features.

> **Note:** this project originally used Supabase (Auth + Postgres + Storage). It has since been migrated to Neon + Drizzle + NextAuth. If you see any lingering references to Supabase in older commits or docs, they're stale.

---

## Project Structure

```
app/
├── page.tsx                        # Homepage (all public sections)
├── projects/[slug]/                 # Individual project detail pages
├── admin/                          # Admin CMS
│   ├── login/                      # Admin login (NextAuth credentials sign-in)
│   ├── page.tsx                    # Dashboard: project CRUD, publish/archive
│   ├── testimonials/                # (not yet wired to real data)
│   └── content/                    # (not yet wired to real data)
├── api/
│   ├── auth/[...nextauth]/          # NextAuth handler (all /api/auth/* routes)
│   └── admin/projects/              # Admin project CRUD API (GET/POST/PATCH)
├── sitemap.ts / robots.ts           # SEO config

components/
├── layout/                         # Header, Footer
├── sections/                       # Hero (auto-rotating showcase), Why Bhopal,
│                                    # Experience Pillars, SDG/Impact, FAQ,
│                                    # TestimonialsSection + TestimonialModal
├── projects/                       # ProjectCard, ProjectGrid
└── ui/                             # Reusable primitives (Button, Badge, ...) plus two
                                    # gallery components with their own CSS:
                                    # InfiniteSpiral (3D rotating card spiral) and
                                    # ScrollExpand (expanding media frame, React Bits)

lib/
├── constants.ts                    # Site metadata, brand colors, governance flags
├── data.ts                         # Public read layer (Neon via Drizzle, falls back to mock data)
├── admin-data.ts                   # Admin write layer (create/update/publish/archive + audit log)
├── auth.ts                         # NextAuth config (credentials provider, bcrypt check)
├── blob.ts                         # Vercel Blob upload helper (not yet wired into UI)
├── hooks/useParallax.ts            # Scroll-linked background parallax hook
├── mock-data.ts                    # Development/placeholder dataset (fallback only)
└── utils.ts                        # Status/deadline calculation helpers

public/images/bhopal/               # Local photography used for hero/parallax/opener

db/
├── schema.ts                       # Drizzle schema — projects, testimonials, site_content,
│                                    # admin_profiles, media_assets, audit_logs
└── index.ts                        # Neon connection (drizzle-orm/neon-http)

scripts/
└── create-admin.ts                 # One-off CLI script to seed an admin login

types/                              # TypeScript interfaces (Project, Testimonial, Admin, Content)

middleware.ts                       # Protects /admin/* routes via NextAuth session check
drizzle.config.ts                   # Drizzle Kit config (schema push/migrations)

tests/unit/                          # Unit tests (currently a hand-rolled script, no test runner installed yet)
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env.local` file at the project root (it's gitignored — never commit it):
```
DATABASE_URL=postgresql://user:password@your-neon-host/dbname?sslmode=require
NEXTAUTH_SECRET=generate-with-the-command-below
NEXTAUTH_URL=http://localhost:3000
```

Generate `NEXTAUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Without `DATABASE_URL` configured, the site automatically falls back to mock data (`lib/mock-data.ts`) for public pages — but the admin dashboard requires a real database connection to function.

### 3. Push the schema to your Neon database
```bash
npx drizzle-kit push
```
This creates all tables (`projects`, `testimonials`, `admin_profiles`, etc.) directly from `db/schema.ts`.

### 4. Create your first admin login
```bash
npx tsx scripts/create-admin.ts you@example.com YourStrongPassword owner
```
(Role defaults to `owner` if omitted. Roles available: `owner`, `admin`, `editor`.)

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 6. Log in to the admin dashboard
Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with the credentials you created in step 4.

### Other scripts
```bash
npm run build   # Production build
npm run start   # Run the production build locally
npm run lint     # Run ESLint
```

---

## Database (Neon + Drizzle)

- Schema lives in `db/schema.ts`. After any schema change, run `npx drizzle-kit push` to sync it to your Neon database.
- `db/index.ts` opens the connection using `@neondatabase/serverless` + `drizzle-orm/neon-http`.
- There is currently **no Row Level Security** (Neon doesn't set a Postgres role per request the way Supabase did) — authorization is instead enforced at the **application layer**: every admin API route (`app/api/admin/**`) checks the NextAuth session server-side via `getServerSession` before allowing any read/write. Public pages only ever call the read-only functions in `lib/data.ts`.

---

## Authentication (NextAuth)

- Config: `lib/auth.ts` — a Credentials provider that checks the submitted email against `admin_profiles`, verifies the password with `bcrypt`, and rejects inactive accounts.
- Session strategy: JWT.
- `middleware.ts` protects every `/admin/*` route — unauthenticated visitors are redirected to `/admin/login`.
- To add another admin, use the seed script:
  ```bash
  npx tsx scripts/create-admin.ts newperson@example.com TheirPassword editor
  ```

---

## Admin CMS

The admin area lives at `/admin` (login at `/admin/login`).

**Currently working:**
- Real login via NextAuth (no more fake session-storage bypass)
- Project dashboard reads real data from Neon (`GET /api/admin/projects`)
- Create, edit, publish/unpublish, and archive projects — all persisted to the database (`POST` / `PATCH /api/admin/projects/[id]`)
- Every mutation is recorded in `audit_logs`

**Not yet wired to real data (still local-state placeholders):**
- `/admin/testimonials`
- `/admin/content`

**Not yet implemented:**
- Image upload via Vercel Blob (`lib/blob.ts` exists but isn't called from the project form yet — images are currently pasted as URLs only)

---

## Hero Showcase Cards

The homepage hero (`components/sections/HeroSection.tsx`) displays an auto-rotating set of project showcase cards (currently 4 sample cards, 3 visible at a time — center card prominent, side cards smaller and faded) that slide continuously every 6 seconds. The carousel also tracks drag/swipe live (pointer events), with continuous scale and fade interpolation while dragging.

⚠️ These cards are currently **hardcoded sample data**, not pulled from the real `projects` table. Before launch, this should be connected to `getPublishedProjects()` from `lib/data.ts` so the homepage always reflects real, current projects — and so the `[TEMP_MOCK]` governance tagging (see below) actually applies here too.

---

## Homepage Motion Design

The public homepage leans on three custom motion pieces (all client components, all reduced-motion aware):

- **Parallax section backgrounds** — `lib/hooks/useParallax.ts` drifts full-bleed Bhopal photography (`public/images/bhopal/`) against the scroll behind several sections. Translation is driven by the section's progress through the viewport and clamped inside the `scale(1.25)` bleed, so backgrounds always cover edge-to-edge — no seams between sections.
- **Testimonials opener** — `components/ui/ScrollExpand.jsx` (adapted from [React Bits](https://reactbits.dev/), JS + CSS variant): the Testimonials section is a single full-screen frame. When it scrolls into view, a framed lake photo drops in with a soft bounce and expands to fill the frame on a timer (`autoPlay` mode — no scroll hijacking); when the animation completes, the testimonials panel (spiral + copy) rises from the bottom of the same frame to take over — no page scrolling required.
- **Volunteer spiral** — `components/ui/InfiniteSpiral.jsx`: a 3D rotating spiral of volunteer cards (auto-rotate + scroll + drag, pause on hover). Clicking a card opens `components/sections/TestimonialModal.tsx` — a side-by-side photo/quote dialog (portalled to `<body>`, Escape/backdrop close, photos shown uncropped over a blurred fill).

Both gallery components are plain `.jsx` + `.css` with JSDoc-typed props so they type-check under strict TypeScript when imported from `.tsx` files.

---

## Content Governance

To prevent placeholder content from silently shipping to production, every provisional value is explicitly tagged in code:
- `lib/constants.ts` → `GOVERNANCE_CONFIG.IS_TEMP_MOCK_DATA`
- Placeholder URLs/emails/socials are commented `// [TEMP_PLACEHOLDER]`
- Mock project names are prefixed `[TEMP_MOCK]`

**Before launch:** search the codebase for `TEMP_PLACEHOLDER` and `TEMP_MOCK` and replace every instance with real AIESEC in Bhopal content (logo, imagery, project data, application URLs, social links, contact email) — and make sure the Hero section (see above) is pulling from real data so it's covered by this tagging too.

---

## Deployment

The project is set up for deployment on [Vercel](https://vercel.com/):

1. Connect the GitHub repository to a Vercel project.
2. Add environment variables in Vercel's project settings:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` — **must be your real production domain**, not `localhost`
   - `BLOB_READ_WRITE_TOKEN` (once image upload is wired up)
3. Push to `main` to trigger a production deployment (or open a PR for a preview deployment).

---

## Known Gaps / Next Steps

- [ ] Wire `/admin/testimonials` to real database CRUD (same pattern as projects)
- [ ] Wire `/admin/content` to real database CRUD
- [ ] Connect Vercel Blob upload to the project form (replace paste-a-URL with an actual upload button)
- [ ] Connect Hero showcase cards to real project data instead of hardcoded samples
- [ ] Replace all `TEMP_PLACEHOLDER` / `TEMP_MOCK` content with real AIESEC in Bhopal assets
- [ ] Install a real test runner (Jest/Vitest) — `tests/unit/` currently has no framework wired up
- [ ] Deploy to Vercel and verify the full flow (login, project CRUD, public pages) on the live domain

---

## License

Internal project for AIESEC in Bhopal. Not licensed for public reuse.