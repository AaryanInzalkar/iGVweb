import { put } from '@vercel/blob';

export async function uploadImage(file: File, folder: string = 'projects') {
  const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });
  return blob.url;
}