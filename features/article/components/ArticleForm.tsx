'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PopoverTrigger } from '@radix-ui/react-popover'; // @/components/ui/popover？
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { Article } from '../schema';

interface FormValue {
  title: string;
  date: Date;
  isValid: boolean;
}

const ArticleForm = ({ article }: { article: Article | null }) => {
  const [value, setValue] = useState<FormValue>({
    title: article?.title || '',
    date: article ? new Date(article.date) : new Date(),
    isValid: !!article?.title,
  });

  const handleSubmit = async () => {
    // todo
    // if (!value.date) return;
    // if (article) {
    //   await updateArticleAction(article.id, value.title, value.date!.getTime());
    // } else {
    //   const article: Article_org = {
    //     id: nanoid(),
    //     title: value.title,
    //     createdAt: value.date.getTime(),
    //     sentenceIds: [],
    //   };
    //   await addArticleAction(article);
    // }
  };

  return (
    <form className='grid gap-10' action={handleSubmit}>
      <Input
        className='bg-white'
        placeholder='title'
        value={value.title}
        onChange={(e) => {
          const title = e.target.value;
          setValue((prev) => ({
            ...prev,
            title,
            isValid: !!title,
          }));
        }}
      />
      <DatePicker value={value} setValue={setValue} />
      <Button type='submit' className='w-full' disabled={!value.isValid}>
        Submit
      </Button>
    </form>
  );
};

export default ArticleForm;

const DatePicker = ({
  value,
  setValue,
}: {
  value: FormValue;
  setValue: (value: SetStateAction<FormValue>) => void;
}) => {
  return (
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
          onSelect={(date) => {
            if (!date) return;
            setValue((prev) => ({ ...prev, date }));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
