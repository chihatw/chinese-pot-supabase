'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { batchAddArticlesAction } from '../actions';
import ARTICLES_JSON from '../json/ARTICLES.json';
import { Article } from '../schema';

const articles = ARTICLES_JSON as Article[];

const BatchAddArticlesButton = () => {
  const handleSubmit = async () => {
    await batchAddArticlesAction(articles);
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Articles (${articles.length})`} />
    </form>
  );
};

export default BatchAddArticlesButton;

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
