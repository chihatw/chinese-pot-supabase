'use client';

import { Button } from '@/components/ui/button';

import { Delete } from 'lucide-react';
import { useOptimistic } from 'react';
import { deleteSentence } from '../actions';
import { Sentence } from '../schema';
import SentenceLine from './SentenceLine';

const SentenceList = ({
  articleId,
  sentences,
}: {
  articleId: number;
  sentences: Sentence[];
}) => {
  const [optimisticSentences, deleteOptimisticSentences] = useOptimistic<
    Sentence[],
    number
  >(sentences, (state, sentenceId) => {
    return state.filter((sentence) => sentence.sentence_id !== sentenceId);
  });

  const handleDelete = async (sentenceId: number) => {
    deleteOptimisticSentences(sentenceId);
    await deleteSentence(sentenceId, articleId);
  };
  return (
    <div>
      <div className='space-y-4 '>
        {optimisticSentences.map((sentence, index) => {
          if (sentence.text) {
            return (
              <div
                key={index}
                className='grid grid-cols-[24px,1fr,auto,auto] items-center gap-2'
              >
                <div className='text-xs'>{index + 1}</div>
                <SentenceLine sentence={sentence} />
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => handleDelete(sentence.sentence_id)}
                >
                  <Delete />
                </Button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SentenceList;
