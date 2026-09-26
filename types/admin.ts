export type AdminRole = 'owner' | 'admin' | 'editor';

export interface AdminProfile {
  user_id: string;
  display_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  profile?: AdminProfile;
}
