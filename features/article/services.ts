import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Article } from './schema';

export const getRecentArticles = async (_limit: number) => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.rpc('get_recent_articles', { _limit });
  if (error) {
    console.error(error);
    return [];
  }

  if (!data || !data[0].id) return [];

  const articles = data.map((raw) => ({
    ...raw,
    date: new Date(raw.date!),
    created_at: new Date(raw.created_at!),
  }));

  return articles;
};

export const getArticleSentences = async (_article_id: number) => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.rpc('get_sentences_of_atricle', {
    _article_id,
  });
  if (error) {
    console.error(error);
    return [];
  }
  if (!data) return [];
  return data;
};

export const getArticlesByIds = async (
  _ids: number[]
): Promise<{ articles: Article[]; error: string }> => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.rpc('get_articles_by_ids', {
    _ids,
  });
  if (error) {
    return { articles: [], error: error.message };
  }
  if (!data || !data.length) {
    return { articles: [], error: 'not found' };
  }
  const articles = data.map((raw) => ({
    ...raw,
    created_at: new Date(raw.created_at),
    date: new Date(raw.date),
  }));
  return { articles, error: '' };
};
