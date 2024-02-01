'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PopoverTrigger } from '@radix-ui/react-popover'; // @/components/ui/popover？
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addArticleAction, updateArticleAction } from '../actions';
import { Article } from '../schema';

const ArticleForm = ({ article }: { article?: Article }) => {
  const [value, setValue] = useState<{ title: string; date?: Date }>({
    title: article?.title || '',
    date: article ? new Date(article.createdAt) : new Date(),
  });

  const handleSubmit = async () => {
    if (!value.date) return;
    if (article) {
      await updateArticleAction(article.id, value.title, value.date!.getTime());
    } else {
      const article: Article = {
        id: nanoid(),
        title: value.title,
        createdAt: value.date.getTime(),
        sentenceIds: [],
      };
      await addArticleAction(article);
    }
  };

  return (
    <div className='grid gap-10'>
      <Input
        className='bg-white'
        placeholder='title'
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Popover>
        <PopoverTrigger>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start bg-white text-left font-normal',
              !value.date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value.date ? (
              format(value.date, 'yyyy/MM/dd')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={value.date}
            onSelect={(date) => setValue((prev) => ({ ...prev, date }))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <form action={handleSubmit}>
        <div className='grid'>
          <ServerActionPendingButton label='Submit' />
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;

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
