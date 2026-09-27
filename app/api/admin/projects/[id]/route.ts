import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateProject, toggleProjectPublish, archiveProject } from '@/lib/admin-data';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const adminId = (session.user as any).id;

  if (body.action === 'toggle_publish') {
    const updated = await toggleProjectPublish(params.id, body.currentStatus, adminId);
    return NextResponse.json(updated);
  }

  if (body.action === 'archive') {
    const updated = await archiveProject(params.id, adminId);
    return NextResponse.json(updated);
  }

  const updated = await updateProject(params.id, body, adminId);
  return NextResponse.json(updated);
}