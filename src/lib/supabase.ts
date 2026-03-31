import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
}

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'twitter' | 'linkedin' | 'instagram';
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface ScheduledPost {
  id: string;
  user_id: string;
  content: string;
  platform: string;
  scheduled_at: string;
  status: 'pending' | 'published' | 'failed';
}
