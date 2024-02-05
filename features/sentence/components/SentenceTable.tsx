'use client';

import { Button } from '@/components/ui/button';
import { ArticleSentence } from '@/features/article/schema';

import { Delete } from 'lucide-react';
import SentenceLine_n from './SentenceLine_n';

const SentenceTable = ({
  articleId,
  sentences,
}: {
  articleId: number;
  sentences: ArticleSentence[];
}) => {
  // debug handleDelete article.id と index で sentence を特定
  const handleDelete = async (index: number) => {
    // const sentence = sentences.find((s) => s.id === sentenceId)!;
    // await deleteSentenceAction(sentence, articleId);
  };
  return (
    <div>
      <div className='space-y-4 '>
        {sentences.map((sentence, index) => (
          <div
            key={index}
            className='grid grid-cols-[24px,1fr,auto,auto] items-center gap-2'
          >
            <div className='text-xs'>{index + 1}</div>
            <SentenceLine_n sentence={sentence} />
            <Button
              size='icon'
              variant='ghost'
              onClick={() => handleDelete(index)}
            >
              <Delete />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentenceTable;
