import {
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
  consonants_grouped_by_head_char,
} from '../constants/consonants';
import { TONES } from '../constants/tones';
import { vowels_grouped_by_chars } from '../constants/vowelfilter';
import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from '../constants/vowels';
import { Pinyin, PinyinFilter } from '../schema';

export const buildPinyin = (value: string): Pinyin => {
  // 最後尾が TONE かどうかチェック
  const tail = value.at(-1) || '';
  let tone = '';
  if (TONES.includes(tail)) {
    tone = tail;
  }

  const valueOmitTone = !!tone ? value.slice(0, value.length - 1) : value;
  const consonant = getConsonant(valueOmitTone);
  const valueOmitToneConsonant = valueOmitTone.slice(consonant.length);

  const vowel = getVowel(valueOmitToneConsonant);

  let pinyin: Pinyin | undefined = undefined;

  pinyin = {
    tone,
    consonant,
    vowel,
  };

  return pinyin;
};

export const buildPinyinFilter = (value: string): PinyinFilter => {
  const tone = getTone(value);

  const value_omitted_tone = !!tone ? value.slice(0, value.length - 1) : value;

  const consonants = value_omitted_tone
    ? getConsonants(value_omitted_tone, !!tone)
    : [];

  const vowels = getVowelsByConsonants(value_omitted_tone, consonants, !!tone);

  return {
    vowels,
    consonants,
    tone,
  };
};

/**
 * value 文字列の最後尾が '0,1,2,3,4' ならば、それを返し
 *
 * それ以外なら空文字列を返す
 */
const getTone = (value: string) => {
  const tail = value.at(-1);
  if (!tail) return '';
  return TONES.includes(tail) ? tail : '';
};

const remove_Y_W_vowels = (vowels: string[]) => {
  return vowels.filter((v) => {
    const head = v.split('')[0];
    return !['y', 'w'].includes(head);
  });
};

const getShortestVowel = (vowels: string[]) => {
  let shortest = 'xxxxx'; // 母音の最長は4字なので、初期値は５字に設定
  for (const vowel of vowels) {
    if (shortest.length > vowel.length) {
      shortest = vowel;
    }
  }
  return shortest;
};
/**
 * 子音候補が0個の場合、文字列を母音対応表に当てはめて、母音候補を返す
 *
 * 子音候補が1個の場合、文字列を母音対応表に当てはめて、y, w がつかない母音候補を返す
 *
 * 子音候補が2個の場合、それぞれの文字列を母音対応表に当てはめて、y, w がつかない母音候補を返す
 *
 * 声調が入力済の場合、母音候補の中で一番短い文字列のものを返す
 */
const getVowelsByConsonants = (
  value_omitted_tone: string,
  consonants: string[],
  hasTone: boolean
) => {
  let target = '';
  let vowels: string[] = [];
  switch (consonants.length) {
    case 0:
      target = value_omitted_tone;
      vowels = vowels_grouped_by_chars[target] || [];
      break;
    case 1:
      target = value_omitted_tone.slice(consonants[0].length);
      vowels = vowels_grouped_by_chars[target] || [];
      vowels = remove_Y_W_vowels(vowels);
      break;
    case 2:
      for (let length = 1; length <= 2; length++) {
        target = value_omitted_tone.slice(length);
        const _vowels = vowels_grouped_by_chars[target] || [];
        vowels = [...new Set([...vowels, ..._vowels])];
      }
      vowels = remove_Y_W_vowels(vowels);
      break;
    default:
      throw new Error(`wrong consonants.length: ${consonants.length}`);
  }
  return vowels.length && hasTone ? [getShortestVowel(vowels)] : vowels;
};

const getConsonant = (value: string) => {
  const headTwo = value.slice(0, 2);
  if (TWO_CHAR_CONSONANTS.includes(headTwo)) {
    return headTwo;
  }

  const headOne = value.at(0) || '';
  if (ONE_CHAR_CONSONANTS.includes(headOne)) {
    return headOne;
  }

  return '';
};

/**
 * 声調が含まれない文字列から子音の候補を返す
 */
const getConsonants = (value_omitted_tone: string, hasTone: boolean) => {
  /**
   * 頭 2文字が子音の場合
   */
  const headTwo = value_omitted_tone.slice(0, 2);
  if (['zh', 'ch', 'sh'].includes(headTwo)) {
    return [headTwo];
  }

  /**
   * 頭 2文字が子音ではない場合
   */
  // 頭 1文字から、子音候補を抽出　s -> s, sh, k -> k
  const headChar = value_omitted_tone.at(0)!;
  const consonants = consonants_grouped_by_head_char[headChar] || [];

  return consonants.filter((c) => {
    const hasVowel = value_omitted_tone.length > 1;
    // 母音か声調がすでに入力されている場合、2文字子音の可能性はない
    if (hasVowel || hasTone) {
      return c.length === 1;
    }
    return true;
  });
};

const getVowel = (value: string): string => {
  return VOWELS.includes(value) ? value : '';
};

export const isValidPinyin = ({ consonant, vowel, tone }: Pinyin) => {
  // tone, 母音がないのはダメ
  if (!tone || !vowel) return false;

  // 子音がつかなくてはいけない母音
  if (
    [...Object.keys(VOWEL_PAIRS), ...EXTROVERTED_VOWELS].includes(vowel) &&
    !consonant
  )
    return false;

  // 子音がついてはいけない母音
  if (
    [...Object.values(VOWEL_PAIRS), ...INTROVERTED_VOWELS].includes(vowel) &&
    !!consonant
  )
    return false;

  return true;
};

export const buildPinyins = (value: string) => {
  const pinyins: Pinyin[] = [];
  const units = value.split('\u0020').filter(Boolean);
  for (const unit of units) {
    const pinyin = buildPinyin(unit);
    pinyins.push(pinyin);
  }
  return pinyins;
};

export const pinyinColor = (pinyin: string) => {
  if (ONE_CHAR_CONSONANTS.includes(pinyin)) {
    return 'bg-amber-100';
  }
  if (TWO_CHAR_CONSONANTS.includes(pinyin)) {
    return 'bg-rose-100';
  }
  if (INTROVERTED_VOWELS.includes(pinyin)) {
    return 'bg-purple-200';
  }
  if (EXTROVERTED_VOWELS.includes(pinyin)) {
    return 'bg-pink-200';
  }
  if (MAJOR_VOWELS.includes(pinyin)) {
    return 'bg-lime-100';
  }
  if (Object.keys(VOWEL_PAIRS).includes(pinyin)) {
    return 'bg-emerald-100';
  }

  if (Object.values(VOWEL_PAIRS).includes(pinyin)) {
    return 'bg-sky-100';
  }
  return '';
};
