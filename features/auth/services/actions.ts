'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { PROJECT_URL } from '../constants';

const isProduction = process.env.VERCEL_ENV === 'production';
const url = (isProduction ? PROJECT_URL : 'http://127.0.0.1:3000') + '/welcome';
// const url = (isProduction ? PROJECT_URL:'http://localhost:3000' ) + '/welcome';

export async function signInWithMagicLink(email: string) {
  const supabase = createSupabaseServerActionClient();
  const result = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: url },
  });
  return result;
}
