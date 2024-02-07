'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { Article, Article_db } from '../schema';

export const addArticle = async (
  article: Article_db
): Promise<{ data?: number; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('insert_article', {
    _title: article.title,
    _date: article.date,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  return { data };
};

export const updateArticle = async (
  article: Article
): Promise<{ data?: number; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('update_article', {
    _id: article.id,
    _title: article.title,
    _date: format(article.date, 'yyyy-MM-dd'),
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  revalidatePath(`/article/${article.id}`);
  return { data };
};

export const deleteArticles = async (
  _ids: number[]
): Promise<{ data?: boolean; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('delete_articles_by_ids', {
    _ids,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  return { data };
};
