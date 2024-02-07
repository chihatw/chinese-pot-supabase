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
