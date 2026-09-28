import { db } from '@/db';
import { projects, auditLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ProjectFormData } from '@/types/project';

export async function createProject(data: ProjectFormData, adminId: string) {
  const [row] = await db
    .insert(projects)
    .values({
      name: data.name,
      slug: data.slug,
      description: data.description,
      sdgNumbers: data.sdg_numbers,
      impactText: data.impact_text,
      localCommittee: data.local_committee,
      hostOrganization: data.host_organization,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      registrationDeadline: data.registration_deadline,
      applicationUrl: data.application_url,
      imageUrl: data.image_url,
      imageAltText: data.image_alt_text,
      status: data.status,
      publishedAt: data.status === 'published' ? new Date() : null,
    })
    .returning();

  await logAdminAction(adminId, 'create_project', row.id, { name: row.name });
  return row;
}

export async function updateProject(id: string, data: ProjectFormData, adminId: string) {
  const [row] = await db
    .update(projects)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description,
      sdgNumbers: data.sdg_numbers,
      impactText: data.impact_text,
      localCommittee: data.local_committee,
      hostOrganization: data.host_organization,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      registrationDeadline: data.registration_deadline,
      applicationUrl: data.application_url,
      imageUrl: data.image_url,
      imageAltText: data.image_alt_text,
      status: data.status,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  await logAdminAction(adminId, 'update_project', id, { name: row?.name });
  return row;
}

export async function toggleProjectPublish(id: string, currentStatus: string, adminId: string) {
  const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
  const [row] = await db
    .update(projects)
    .set({
      status: nextStatus,
      publishedAt: nextStatus === 'published' ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  await logAdminAction(adminId, 'toggle_publish', id, { newStatus: nextStatus });
  return row;
}

export async function archiveProject(id: string, adminId: string) {
  const [row] = await db
    .update(projects)
    .set({ status: 'archived', updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();

  await logAdminAction(adminId, 'archive_project', id, {});
  return row;
}

async function logAdminAction(adminId: string, action: string, targetId: string, details: object) {
  try {
    await db.insert(auditLogs).values({
      adminId,
      action,
      targetTable: 'projects',
      targetId,
      details,
    });
  } catch (e) {
    console.warn('Audit log write failed (non-fatal)', e);
  }
}