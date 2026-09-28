import {
  pgTable, uuid, text, varchar, timestamp, date, integer, boolean, jsonb, pgEnum,
} from 'drizzle-orm/pg-core';

export const projectStatus = pgEnum('project_status', ['draft', 'published', 'closing_soon', 'closed', 'archived']);
export const adminRole = pgEnum('admin_role', ['owner', 'admin', 'editor']);

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  sdgNumbers: integer('sdg_numbers').array().notNull(),
  impactText: text('impact_text'),
  localCommittee: text('local_committee').notNull(),
  hostOrganization: text('host_organization').notNull(),
  location: text('location').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  registrationDeadline: date('registration_deadline').notNull(),
  applicationUrl: text('application_url').notNull(),
  imageUrl: text('image_url'),
  imageAltText: text('image_alt_text'),
  status: projectStatus('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  volunteerName: text('volunteer_name').notNull(),
  countryOfOrigin: text('country_of_origin'),
  quote: text('quote').notNull(),
  photoUrl: text('photo_url'),
  projectId: uuid('project_id').references(() => projects.id),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const siteContent = pgTable('site_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const adminProfiles = pgTable('admin_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: adminRole('role').notNull().default('editor'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const mediaAssets = pgTable('media_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  url: text('url').notNull(),
  altText: text('alt_text'),
  uploadedBy: uuid('uploaded_by').references(() => adminProfiles.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  adminId: uuid('admin_id').references(() => adminProfiles.id),
  action: text('action').notNull(),
  targetTable: text('target_table'),
  targetId: uuid('target_id'),
  details: jsonb('details'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});