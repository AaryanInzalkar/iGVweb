export interface Testimonial {
  id: string;
  volunteer_name: string;
  country: string;
  quote: string;
  project_id?: string | null;
  project_name?: string; // Optional joined field
  image_url?: string;
  image_alt_text?: string;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
}
