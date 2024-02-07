'use client';

import { Hanzi } from '@/features/hanzi/schema';
import { getHanzisByPinyinFilter } from '@/features/hanzi/services/client';
import { buildHanziGroups } from '@/features/hanzi/services/utils';

import PinyinBadge from '@/features/pinyin/components/PinyinBadge';
import { PinyinFilter } from '@/features/pinyin/schema';
import { buildPinyin } from '@/features/pinyin/services/utils';
import { useEffect, useState } from 'react';
import PinyinHanzi from '../PinyinHanzi';

type Props = {
  hanzis: Hanzi[];
  limit?: number;
  group?: string;
  error?: string;
};

const HanziList = ({ pinyinFilter }: { pinyinFilter: PinyinFilter }) => {
  const [value, setValue] = useState<Props>({ hanzis: [] });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getHanzisByPinyinFilter(pinyinFilter);
      setValue({
        hanzis: data?.hanzis || [],
        limit: data?.limit,
        group: data?.group,
        error,
      });
    };
    fetchData();
  }, [pinyinFilter]);

  const items = buildHanziGroups(value.hanzis);
  // グループに含まれる hanzi が多い順に並べる
  const orderdItems = items.sort((a, b) => b.hanzis.length - a.hanzis.length);
  return (
    <div className='space-y-4 overflow-y-scroll'>
      {value.limit && value.group ? (
        <div className='text-xs text-red-500'>{`${value.group}毎 直近 ${value.limit} 件`}</div>
      ) : null}
      {orderdItems.map((item, index) => {
        // 四声順に並べる
        const orderedHanzis = item.hanzis.sort(
          (a, b) => parseInt(a.tone) - parseInt(b.tone)
        );
        return (
          <div
            key={index}
            className='grid grid-cols-[60px,1fr] items-center gap-2'
          >
            <div className='flex'>
              <PinyinBadge pinyin={buildPinyin(item.consonant + item.vowel)} />
            </div>
            <div className='flex flex-wrap gap-2'>
              {orderedHanzis.map((hanzi) => (
                <PinyinHanzi
                  key={hanzi.id}
                  form={hanzi.form}
                  pinyinStr={hanzi.consonant + hanzi.vowel + hanzi.tone}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HanziList;
