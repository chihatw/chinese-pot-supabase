import { Hanzi, Hanzi_db_raw } from '@/features/hanzi/schema';
import { PinyinFilter } from '@/features/pinyin/schema';

import { createSupabaseClientComponentClient } from '@/lib/supabase';

export const getHanzisByPinyinFilter = async (
  filter: PinyinFilter
): Promise<{
  data?: { hanzis: Hanzi[]; limit?: number; group?: string };
  error?: string;
}> => {
  // フィルターの組み合わせによって、limit と group を変える
  let limit: undefined | number = undefined;
  let group: undefined | string = undefined;

  let hanzis_raw: Hanzi_db_raw[] = [];
  const supabase = createSupabaseClientComponentClient();

  const hasVowels = !!filter.vowels.length;
  const hasConsonants = !!filter.consonants.length;
  const hasTone = !!filter.tone;
  // 母音のみ
  if (hasVowels && !hasConsonants && !hasTone) {
    group = '子音+母音'; // 母音は複数指定されている。子音は有無が不明。 i -> i, yi
    limit = 5;
    const { data, error } = await supabase.rpc('get_hanzis_by_vowels', {
      _limit: limit,
      _vowels: filter.vowels,
    });
    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data;

    // 子音のみ
  } else if (!hasVowels && hasConsonants && !hasTone) {
    group = '子音+母音';
    limit = 5;
    const { data, error } = await supabase.rpc('get_hanzis_by_consonants', {
      _limit: limit,
      _consonants: filter.consonants,
    });
    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data;
    // 子音と母音
  } else if (hasConsonants && hasVowels && !hasTone) {
    group = '母音';
    limit = 20;
    const { data, error } = await supabase.rpc(
      'get_hanzis_by_consonants_vowels',
      {
        _limit: limit,
        _vowels: filter.vowels,
        _consonants: filter.consonants,
      }
    );
    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data;
    // 母音と声調
  } else if (!hasConsonants && hasVowels && hasTone) {
    group = '子音';
    limit = 10;
    if (filter.vowels.length !== 1) {
      throw new Error(`pinyin filter has ${filter.vowels.length} vowels.`);
    }
    const { data, error } = await supabase.rpc('get_hanzis_by_vowel_tone', {
      _limit: 10,
      _vowel: filter.vowels[0],
      _tone: filter.tone,
    });
    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data;
    // 子音と母音と声調
  } else if (hasConsonants && hasVowels && hasTone) {
    group = '子音';
    limit = 20;
    if (filter.vowels.length !== 1) {
      throw new Error(`pinyin filter has ${filter.vowels.length} vowels.`);
    }
    const { data, error } = await supabase.rpc(
      'get_hanzis_by_consonants_vowel_tone',
      {
        _limit: limit,
        _consonants: filter.consonants,
        _vowel: filter.vowels[0],
        _tone: filter.tone,
      }
    );
    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data;
  }

  return {
    data: {
      hanzis: hanzis_raw.map((h) => ({
        ...h,
        createdAt: new Date(h.created_at),
      })),
      limit,
      group,
    },
  };
};
