import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Sentence } from '../../sentence/schema';

export const getArticleSentences = async (
  _article_id: number
): Promise<{ data?: Sentence[]; error?: string }> => {
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
