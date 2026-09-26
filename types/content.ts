export type ContentType = 'text' | 'rich_text' | 'url' | 'image' | 'json' | 'boolean' | 'number';

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  content_type: ContentType;
  description?: string;
  updated_at?: string;
}
