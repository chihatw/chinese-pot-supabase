'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';

export const deleteSentence = async (
  _id: number,
  articleId: number
): Promise<void> => {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('sentences').delete().eq('id', _id);
  if (error) {
    console.error(error.message);
    return;
  }
  revalidatePath('/');
  revalidatePath(`/article/${articleId}`);
  revalidatePath(`/article/${articleId}/form`);
  return;
};

export const addSentence = async (
  _article_id: number,
  _hanzi_ids: number[],
  _offsets: number[]
): Promise<{ data?: number; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('insert_sentence', {
    _article_id,
    _hanzi_ids,
    _offsets,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath(`/article/${_article_id}`);
  return { data };
};
