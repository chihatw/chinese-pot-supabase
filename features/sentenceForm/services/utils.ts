import { Hanzi } from '@/features/hanzi';
import { getPinyinStr } from '@/features/pinyin';
import { Sentence } from '@/features/sentence';
// import { SENTENCE_TEXT_MAX } from "@/firebase/constants";

import { SentenceFormProps } from '..';

const SENTENCE_TEXT_MAX = 200;
const IN_ARRAY_MAX = 30;

export const buildSentence_from_selectedHanzis = (
  selectedHanzis: Hanzi[],
  sentenceId: string
): Sentence => {
  return {
    id: sentenceId,
    text: selectedHanzis.map((h) => h.form).join(''),
    pinyinsStr: selectedHanzis.map((h) => getPinyinStr(h.pinyin)).join(' '),
    createdAt: Date.now(),
  };
};

export const getSelectedHanziIds = (forms: string, hanzis: Hanzi[]) => {
  return forms.split('').map((form) => {
    // hanzis から form で厳選
    const items = hanzis
      .filter((h) => h.form === form)
      .sort((a, b) => b.count - a.count);
    // １つ目の hanzi の id を代入
    return items.at(0)?.id || '';
  });
};

export const updateCountAndLastestSentenceId_in_Hanzis = (
  hanzis: Hanzi[],
  sentenceId: string
): Hanzi[] => {
  return hanzis.map((h) => ({
    ...h,
    count: h.count + 1,
    latestSentenceId: sentenceId,
  }));
};

/**
 *　文字列を受け取り 

   その文字列に含まれる漢字と同じ字形の漢字を取得

   また取得した漢字の latestSentence も取得する
 */
export const buildSentenceFormProps = async (
  forms: string
): Promise<SentenceFormProps> => {
  if (forms.length > SENTENCE_TEXT_MAX) {
    console.error(`sentence text more than ${SENTENCE_TEXT_MAX}`);
    return { hanzis: [], forms: '', hanziSentences: [], total: 0 };
  }
  const forms_uniq = [...new Set(forms.split('').filter(Boolean))];

  // forms に含まれる Hanzi を取得

  const { hanzis } = forms_uniq.length
    ? await getHanzisByForms(forms_uniq)
    : { hanzis: [] };

  const latestSentenceIds = [...new Set(hanzis.map((h) => h.latestSentenceId))];
  const { sentences, total } = await getSentencesByIds(latestSentenceIds);

  return { hanzis, forms, hanziSentences: sentences, total };
};

/**
 *
 * SentenceForm で searchParams から form（字形） を取得
 *
 * 取得した　form を持つ　Hanzi を抽出
 */
// todo getHanzisByForms
const getHanzisByForms = async (
  forms: string[]
): Promise<{ hanzis: Hanzi[] }> => {
  // 引数がない
  if (!forms.length) return { hanzis: [] };

  // 重複削除
  const uniq_forms = [...new Set(forms)];

  if (uniq_forms.length > SENTENCE_TEXT_MAX) {
    console.error(`more than ${SENTENCE_TEXT_MAX}`);
    return { hanzis: [] };
  }

  let result: Hanzi[] = [];

  for (let i = 0; i < uniq_forms.length; i += IN_ARRAY_MAX) {
    // IN_ARRAY_MAX 毎にクエリを実行
    const subSet = uniq_forms.slice(i, i + IN_ARRAY_MAX).filter(Boolean);
    if (!subSet.length) continue;

    // const res = await fetch(
    //   fetchRequestURL,
    //   buildFetchRequestOption({
    //     collectionId: COLLECTIONS.hanzis,
    //     where: ["form", "IN", subSet],
    //     tags: [REVALIDATE_TAGS.sentenceForm],
    //   }),
    // );

    // const { docs, readCount } = await getDocs(res);
    // global.readCount += readCount;
    // console.log(
    //   "getHanzisByForms",
    //   docs.length,
    //   `readCount: `,
    //   global.readCount,
    // );
    // const hanzis = docs.map((doc) => buildHanzi(doc));
    // result = [...result, ...hanzis];
  }

  return { hanzis: result };
};

// note fetch する sentences の上限を SEARCH_SENTENCES_MAX で指定

interface SearchResult {
  total: number;
  sentences: Sentence[];
}
const SEARCH_SENTENCES_MAX = 70;

// todo getSentencesByIds
const getSentencesByIds = async (
  sentenceIds: string[]
): Promise<SearchResult> => {
  // 引数がない
  if (!sentenceIds.length) return { total: 0, sentences: [] };

  // 重複削除
  sentenceIds = [...new Set(sentenceIds)];

  if (sentenceIds.length > SEARCH_SENTENCES_MAX) {
    return { total: sentenceIds.length, sentences: [] };
  }

  let result: Sentence[] = [];
  let totalCount = 0;

  for (let i = 0; i < sentenceIds.length; i += IN_ARRAY_MAX) {
    // IN_ARRAY_MAX 毎にクエリを実行
    const subSet = sentenceIds.slice(i, i + IN_ARRAY_MAX).filter(Boolean);
    if (!subSet.length) continue;

    // const res = await fetch(
    //   fetchRequestURL,
    //   buildFetchRequestOption({
    //     collectionId: COLLECTIONS.sentences,
    //     where: [
    //       "__name__",
    //       "IN",
    //       subSet.map(
    //         (sentenceId) =>
    //           `${PROJECT_PATH}/${COLLECTIONS.sentences}/${sentenceId}`,
    //       ),
    //     ],
    //     tags: [REVALIDATE_TAGS.senences],
    //   }),
    // );
    // const { docs, readCount } = await getDocs(res);
    // global.readCount += readCount;
    // console.log(
    //   "getSentencesByIds",
    //   docs.length,
    //   "readCount: ",
    //   global.readCount,
    // );
    // const sentences = docs.map((doc) => buildSentence(doc));
    // result = [...result, ...sentences];
    // totalCount += readCount;
  }

  return { total: result.length, sentences: result };
};
