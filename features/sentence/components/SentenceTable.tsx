'use client';

import { Button } from '@/components/ui/button';
import { Article, ArticleSentence } from '@/features/article/schema';
import { buildToneMark } from '@/features/hanzi/services/util';
import { buildPinyin } from '@/features/pinyin';
import { fontPinyin } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { Delete, Loader2, Pencil } from 'lucide-react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

const SentenceTable = ({
  article,
  sentences,
}: {
  article: Article;
  sentences: ArticleSentence[];
}) => {
  // debug handleSubmit article.id と index で sentence を特定
  const handleSubmit = async (index: number) => {
    // const sentence = sentences.find((s) => s.id === sentenceId)!;
    // await deleteSentenceAction(sentence, articleId);
  };
  return (
    <div>
      <div className='-mt-12 pb-8'>
        <div className='text-right text-xs text-gray-500'>articleId:</div>
        <div className='text-right text-xs font-bold text-gray-500'>
          {article.id}
        </div>
      </div>

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
              <form action={() => handleSubmit(index)}>
                <ServerActionPendingIconButton variant='ghost'>
                  <Delete />
                </ServerActionPendingIconButton>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceTable;

const ServerActionPendingIconButton = ({
  children,
  variant,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
  variant?:
    | 'ghost'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'link';
}) => {
  // note useFormStatus は form の子要素の中で使う。form と同じ要素内では pending が false のまま
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={disabled || pending}
      variant={variant}
      size='icon'
    >
      {pending ? <Loader2 className='animate-spin' /> : children}
    </Button>
  );
};

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
