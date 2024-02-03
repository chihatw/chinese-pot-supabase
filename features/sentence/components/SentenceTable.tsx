'use client';

import { Button } from '@/components/ui/button';
import { ArticleSentence } from '@/features/article/schema';
import { buildToneMark } from '@/features/hanzi/services/util';
import { buildPinyin } from '@/features/pinyin';
import { fontPinyin } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { Delete, Pencil } from 'lucide-react';

const SentenceTable = ({
  articleId,
  sentences,
}: {
  articleId: number;
  sentences: ArticleSentence[];
}) => {
  // debug handleSubmit article.id と index で sentence を特定
  const handleSubmit = async (index: number) => {
    // const sentence = sentences.find((s) => s.id === sentenceId)!;
    // await deleteSentenceAction(sentence, articleId);
  };
  return (
    <div>
      <div className='space-y-4 '>
        {sentences.map((sentence, index) => {
          if (!sentence) return null;
          return (
            <div
              key={index}
              className='grid grid-cols-[24px,1fr,auto,auto] items-center gap-2'
            >
              <div className='text-xs'>{index + 1}</div>
              <SentenceLine sentence={sentence} />
              <form>
                <Button size={'icon'} variant={'ghost'}>
                  <Pencil />
                </Button>
              </form>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleSubmit(index)}
              >
                <Delete />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceTable;

const SentenceLine = ({ sentence }: { sentence: ArticleSentence }) => {
  const forms = sentence.text.split('');
  const pinyins = sentence.pinyin.split(' ');
  return (
    <div className='grid'>
      <div className='flex flex-wrap gap-1 '>
        {forms.map((form, index) => (
          <PinyinHanzi key={index} form={form} pinyinStr={pinyins[index]} />
        ))}
      </div>
    </div>
  );
};

const PinyinHanzi = ({
  form,
  pinyinStr,
}: {
  form: string;
  pinyinStr: string;
}) => {
  const pinyin = buildPinyin(pinyinStr);
  const mark = buildToneMark(pinyin.tone);

  return (
    <div className='flex items-center gap-2'>
      <div className='relative flex flex-col items-center gap-y-0'>
        <div
          className={cn(
            fontPinyin.className,
            'absolute text-destructive',
            mark === '•' ? '-top-3' : '-top-2'
          )}
        >
          {mark}
        </div>
        <div className='-mb-1.5 origin-center scale-75 text-xs text-gray-500'>
          {(pinyin?.consonant || '') + (pinyin?.vowel || '')}
        </div>
        <div className='text-inherit text-lg'>{form}</div>
      </div>
    </div>
  );
};
