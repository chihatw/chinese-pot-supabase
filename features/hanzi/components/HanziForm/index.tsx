'use client';

import { Input } from '@/components/ui/input';
import { PinyinHanzi } from '@/features/hanzi';

import {
  Pinyin,
  PinyinBadge,
  PinyinFilter,
  buildPinyin,
  buildPinyinFilter,
  getPinyinStr,
} from '@/features/pinyin';

import useDebouce from '@/hooks/useDebounce';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import HanziList from './HanziList';

type Props = {
  pinyin: Pinyin;
  filter: PinyinFilter;
  disabled: boolean;
};

const INITIAL_STATE: Props = {
  pinyin: {
    vowel: '',
    consonant: '',
    tone: '',
  },
  filter: {
    vowels: [],
    consonants: [],
    tone: '',
  },
  disabled: false,
};

const HanziForm = ({
  form,
  articleId,
  closeDialog,
}: {
  form: string;
  articleId: number;
  closeDialog: () => void;
}) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebouce(input, 300);
  const [value, setValue] = useState<Props>(INITIAL_STATE);

  useEffect(() => {
    if (!debouncedInput) {
      setValue(INITIAL_STATE);
      return;
    }
    const pinyin = buildPinyin(debouncedInput);
    const filter = buildPinyinFilter(debouncedInput);
    const disabled = !getPinyinStr(pinyin)
      ? false // pinyin が空文字の場合、登録可能
      : !pinyin.tone || !pinyin.vowel; // pinyin に文字が入っている場合、tone と vowel は必須

    setValue({ pinyin, filter, disabled });
  }, [debouncedInput]);

  const handleSubmit = async () => {
    // todo
    // const hanzi: Hanzi_org = {
    //   id: buildHanziId(form, value.pinyin),
    //   form,
    //   pinyin: value.pinyin,
    //   count: 0,
    //   latestSentenceId: '',
    // };
    // await addHanziAction(hanzi, articleId);
    closeDialog();
  };
  return (
    <div className='grid h-[calc(100vh-200px)] grid-rows-[auto,auto,auto,auto,1fr] space-y-4'>
      <div className='grid grid-cols-[120px,150px,1fr,auto] items-center gap-2'>
        <Input
          className=' bg-white'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='拼音'
        />
        <div className='flex flex-col items-center gap-2'>
          <PinyinBadge pinyin={value.pinyin} />
          <PinyinHanzi pinyinStr={getPinyinStr(value.pinyin)} form={form} />
        </div>
        <Button disabled={value.disabled} onClick={handleSubmit}>
          {getPinyinStr(value.pinyin) ? '登錄' : '記号'}
        </Button>
      </div>
      <HanziList pinyinFilter={value.filter} />
    </div>
  );
};

export default HanziForm;
