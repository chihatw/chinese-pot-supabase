'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';

export const deleteSentences = async (
  _ids: number[],
  articleId: number
): Promise<{ data?: boolean; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('delete_sentences_by_ids', {
    _ids,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath(`/article/${articleId}`);
  return { data };
};
