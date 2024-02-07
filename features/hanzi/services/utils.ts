import { CONSONANTS } from '@/features/pinyin/constants/consonants';
import { VOWEL_PAIRS } from '@/features/pinyin/constants/vowels';
import { Hanzi } from '../schema';

export function buildToneMark(tone?: string) {
  switch (tone) {
    case '1':
      return '‾';
    case '2':
      return 'ˊ';
    case '3':
      return 'ˇ';
    case '4':
      return 'ˋ';
    case '0':
      return '•';
    default:
      return '';
  }
}

export function buildHanziGroups(hanzis: Hanzi[]) {
  const items: { vowel: string; consonant: string; hanzis: Hanzi[] }[] = [];

  // hanzis を母音ごとに集計（語頭形は語中形に含める）
  const vowelCounts = getVowelCounts(hanzis);
  for (const vowel of Object.keys(vowelCounts)) {
    // 語頭形は語中形に含めて抽出
    const vowelHanzis = getHanzisByVowel(hanzis, vowel);

    // 子音がない場合、無子音のグループとして分類
    const filtered = vowelHanzis.filter((h) => !h.consonant);
    if (!!filtered.length) {
      items.push({ vowel, consonant: '', hanzis: filtered });
    }

    // 子音がある場合、子音によって分類
    for (const consonant of CONSONANTS) {
      const filtered = vowelHanzis.filter((h) => h.consonant === consonant);

      if (!!filtered.length) {
        items.push({ vowel, consonant, hanzis: filtered });
      }
    }
  }
  return items;
}

function getVowelCounts(hanzis: Hanzi[]) {
  return hanzis.reduce((acc, cur) => {
    let vowel = cur.vowel;

    // 弱母音の場合、子音ありの形に統一して計上する
    const pair = Object.entries(VOWEL_PAIRS)
      .filter(([, value]) => value === vowel)
      ?.at(0);
    if (pair) {
      vowel = pair.at(0)!;
    }
    return {
      ...acc,
      [vowel]: (acc[vowel] || 0) + 1,
    };
  }, {} as { [key: string]: number });
}

function getHanzisByVowel(hanzis: Hanzi[], vowel: string) {
  return hanzis.filter((hanzi) => {
    const target: string[] = [vowel];
    const pair = VOWEL_PAIRS[vowel];
    !!pair && target.push(pair);
    return target.includes(hanzi.vowel);
  });
}
