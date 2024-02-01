'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Sentence } from '@/features/sentence';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { batchAddSentencesAction } from '../actions';
import SENTENCES_JSON from '../json/SENTENCES.json';

const SENTENCES = SENTENCES_JSON as Sentence[];

const BatchAddSentencesButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddSentencesAction(SENTENCES);
    toast({
      description: `added ${SENTENCES.length} sentences`,
    });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton
        label={`Add Sentences (${SENTENCES.length})`}
      />
    </form>
  );
};

export default BatchAddSentencesButton;

const ServerActionPendingButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={disabled || pending}>
      <div className='flex items-center gap-2'>
        <span className='whitespace-nowrap'>{label}</span>
        {pending ? <Loader2 className='animate-spin' /> : null}
      </div>
    </Button>
  );
};
