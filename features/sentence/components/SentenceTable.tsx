'use client';

import { Button } from '@/components/ui/button';
import { Sentence, SentenceLine } from '@/features/sentence';
import { Delete, Loader2 } from 'lucide-react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteSentenceAction } from '../actions';

const SentenceTable = ({
  sentences,
  articleId,
}: {
  sentences: Sentence[];
  articleId?: string;
}) => {
  const handleSubmit = async (sentenceId: string) => {
    const sentence = sentences.find((s) => s.id === sentenceId)!;
    await deleteSentenceAction(sentence, articleId);
  };
  return (
    <div>
      {articleId ? (
        <div className='-mt-12 pb-8'>
          <div className='text-right text-xs text-gray-500'>articleId:</div>
          <div className='text-right text-xs font-bold text-gray-500'>
            {articleId}
          </div>
        </div>
      ) : null}
      <div className='space-y-4 '>
        {sentences.map((sentence, index) => {
          if (!sentence) return null;
          return (
            <div
              key={sentence.id}
              className='grid grid-cols-[24px,1fr,auto] items-center gap-2'
            >
              <div className='text-xs'>{index + 1}</div>
              <SentenceLine sentence={sentence} />
              <form action={() => handleSubmit(sentence.id)}>
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
