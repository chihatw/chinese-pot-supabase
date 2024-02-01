'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Hanzi, PinyinHanzi } from '@/features/hanzi';

import { PinyinBadge, buildPinyin, getPinyinStr } from '@/features/pinyin';
import {
  Sentence,
  SentenceLine,
  buildHanzisGroupedByConsonantVowel,
} from '@/features/sentence';

import { useEffect, useState } from 'react';

const HanziList = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const items = buildHanzisGroupedByConsonantVowel(hanzis);
  // グループに含まれる hanzi が多い順に並べる
  const orderdItems = items.sort((a, b) => b.hanzis.length - a.hanzis.length);
  return (
    <div className='space-y-4 overflow-y-scroll'>
      {orderdItems.map((item, index) => {
        // 四声順に並べる
        const orderedHanzis = item.hanzis.sort(
          (a, b) => parseInt(a.pinyin.tone) - parseInt(b.pinyin.tone)
        );
        return (
          <div key={index} className='flex items-center gap-2'>
            <PinyinBadge pinyin={buildPinyin(item.consonant + item.vowel)} />
            <div className='flex flex-wrap gap-2'>
              {orderedHanzis.map((hanzi) => (
                <PinyinHanziHoverCard hanzi={hanzi} key={hanzi.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HanziList;

const PinyinHanziHoverCard = ({ hanzi }: { hanzi: Hanzi }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <PinyinHanzi
            key={hanzi.id}
            form={hanzi.form}
            pinyinStr={getPinyinStr(hanzi.pinyin)}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <PinyinHanziHoverCardContent hanzi={hanzi} />
      </HoverCardContent>
    </HoverCard>
  );
};

const PinyinHanziHoverCardContent = ({ hanzi }: { hanzi: Hanzi }) => {
  const [sentence, setSentence] = useState<Sentence | undefined>(undefined);
  useEffect(() => {
    if (!hanzi.latestSentenceId) {
      setSentence(undefined);
      return;
    }
    const fetchData = async () => {
      const { sentences } = await getSentencesByIds([hanzi.latestSentenceId]);
      if (!sentences.at(0)) return;
      setSentence(sentences.at(0));
    };
    fetchData();
  }, [hanzi]);
  if (!sentence) return null;
  return <SentenceLine sentence={sentence} />;
};

// note fetch する sentences の上限を SEARCH_SENTENCES_MAX で指定
interface SearchResult {
  total: number;
  sentences: Sentence[];
}
const SEARCH_SENTENCES_MAX = 70;
const IN_ARRAY_MAX = 30;
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
    const docs: any[] = [];
    const sentences = docs.map((doc) => buildSentence(doc));
    result = [...result, ...sentences];
    // totalCount += readCount;
  }

  return { total: result.length, sentences: result };
};

const buildSentence = (document: any): Sentence => {
  const id = document.name.split('/').at(-1) || '';
  const fields = document.fields;
  return {
    id,
    text: fields.text.stringValue,
    pinyinsStr: fields.pinyinsStr.stringValue,
    createdAt: Number(fields.createdAt.integerValue),
  };
};
