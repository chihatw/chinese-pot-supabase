'use client';

import { Input } from '@/components/ui/input';

import useDebouce from '@/hooks/useDebounce';

import { Button } from '@/components/ui/button';
import PinyinBadge from '@/features/pinyin/components/PinyinBadge';
import { Pinyin, PinyinFilter } from '@/features/pinyin/schema';
import {
  buildPinyin,
  buildPinyinFilter,
} from '@/features/pinyin/services/utils';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { addHanzi } from '../../actions';
import PinyinHanzi from '../PinyinHanzi';
import HanziList from './HanziList';

type Props = {
  pinyin: Pinyin;
  filter: PinyinFilter;
  disabled: boolean;
  error: string;
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
  error: '',
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
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!debouncedInput) {
      setValue(INITIAL_STATE);
      return;
    }
    const pinyin = buildPinyin(debouncedInput);
    const filter = buildPinyinFilter(debouncedInput);
    const disabled = !(pinyin.consonant + pinyin.vowel + pinyin.tone)
      ? false // pinyin が空文字の場合、登録可能
      : !pinyin.tone || !pinyin.vowel; // pinyin に文字が入っている場合、tone と vowel は必須

    setValue({ pinyin, filter, disabled, error: '' });
  }, [debouncedInput]);

  const handleSubmit = async () => {
    startTransition(async () => {
      const { data, error } = await addHanzi(
        { ...value.pinyin, form },
        articleId
      );
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、Dialog を閉じる
      closeDialog();
    });
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
          <PinyinHanzi
            pinyinStr={
              value.pinyin.consonant + value.pinyin.vowel + value.pinyin.tone
            }
            form={form}
          />
        </div>
        <Button disabled={value.disabled || isPending} onClick={handleSubmit}>
          {!!(value.pinyin.consonant + value.pinyin.vowel + value.pinyin.tone)
            ? '登錄'
            : '記号'}
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </div>
      {value.error ? <span className='text-red-500'>{value.error}</span> : null}
      <HanziList pinyinFilter={value.filter} />
    </div>
  );
};

export default HanziForm;
