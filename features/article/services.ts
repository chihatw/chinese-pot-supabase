import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Article, ArticleSentence } from './schema';

export const getRecentArticles = async (
  _limit: number
): Promise<{ data?: Article[]; error?: string }> => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.rpc('get_recent_articles', { _limit });
  if (error) {
    return { error: error.message };
  }

  if (!data || !data[0].id) {
    return { error: 'not found' };
  }

  const articles = data.map((raw) => ({
    ...raw,
    date: new Date(raw.date!),
    created_at: new Date(raw.created_at!),
  }));

  return { data: articles };
};

export const getArticleSentences = async (
  _article_id: number
): Promise<{ data?: ArticleSentence[]; error?: string }> => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.rpc('get_sentences_of_atricle', {
    _article_id,
  });
  if (error) {
    return { error: error.message };
  }
  if (!data || !data.length) return { error: 'not found' };
  return { data };
};

export const getArticlesByIds = async (
  _ids: number[]
): Promise<{ data?: Article[]; error?: string }> => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.rpc('get_articles_by_ids', {
    _ids,
  });
  if (error) {
    return { error: error.message };
  }
  if (!data || !data.length) {
    return { error: 'not found' };
  }
  const articles = data.map((raw) => ({
    ...raw,
    created_at: new Date(raw.created_at),
    date: new Date(raw.date),
  }));
  return { data: articles };
};
