import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { HanziWithSentence } from '../schema';

export const getHanzisWithSentence = async (
  array: string[]
): Promise<{ data: HanziWithSentence[]; error?: string }> => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.rpc('get_hanzis_by_forms', {
    _forms: [...new Set(array)],
  });
  if (error) {
    return { data: [], error: error.message };
  }
  return { data: data || [] };
};
