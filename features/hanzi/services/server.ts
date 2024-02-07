import { Hanzi_with_sentence } from '@/features/hanzi/schema';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

export const getHanzisWithSentence = async (
  array: string[]
): Promise<{ data: Hanzi_with_sentence[]; error?: string }> => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.rpc('get_hanzis_by_forms', {
    _forms: [...new Set(array)],
  });
  if (error) {
    return { data: [], error: error.message };
  }
  return { data: data || [] };
};
