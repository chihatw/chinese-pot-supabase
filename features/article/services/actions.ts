'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { Article, Article_db } from '../schema';

export const addArticle = async (
  article: Article_db
): Promise<{ error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('articles')
    .insert({ date: article.date, title: article.title });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  return {};
};

export const updateArticle = async (
  article: Article
): Promise<{ error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('articles')
    .update({
      title: article.title,
      date: format(
        article.date.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo' }),
        'yyyy-MM-dd'
      ),
    })
    .eq('id', article.id);

  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  revalidatePath(`/article/${article.id}`);
  revalidatePath(`/article/${article.id}/form`);
  return {};
};

export const deleteArticle = async (
  _id: number
): Promise<{ error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('articles').delete().eq('id', _id);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  return {};
};
