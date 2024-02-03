import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

export const getLatestArticle = async () => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.rpc('get_latest_article');
  if (error) {
    console.error(error);
    return null;
  }

  if (!data || !data[0].id) return null;

  const article = {
    ...data[0],
    date: new Date(data[0].date!),
    created_at: new Date(data[0].created_at!),
  };

  return article;
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
