'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { Hanzi_org } from '../hanzi';

export const addHanziAction = async (hanzi: Hanzi_org, articleId?: number) => {
  await addHanzi(hanzi);
  // note sentence form でキャッシュが利用されているので、 revalidate が必要
  // revalidateTag(REVALIDATE_TAGS.sentenceForm);
  if (articleId) {
    revalidatePath(`/article/${articleId}/form`);
  }
};

// todo addHanzi
const addHanzi = async (hanzi: Hanzi_org) => {
  // await dbAdmin
  //   .collection(COLLECTIONS.hanzis)
  //   .withConverter(hanziConverter)
  //   .doc(hanzi.id)
  //   .set(hanzi);
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
