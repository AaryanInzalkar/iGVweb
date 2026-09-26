export type ProjectStatus = 'draft' | 'published' | 'closing_soon' | 'closed' | 'archived';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  sdg_numbers: number[];
  impact_text: string;
  local_committee: string;
  host_organization: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  application_url: string;
  image_url?: string;
  image_alt_text?: string;
  status: ProjectStatus;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface ProjectFormData {
  name: string;
  slug: string;
  description: string;
  sdg_numbers: number[];
  impact_text: string;
  local_committee: string;
  host_organization: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  application_url: string;
  image_url?: string;
  image_alt_text?: string;
  status: ProjectStatus;
}
