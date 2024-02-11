'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState, useTransition } from 'react';
import { Article, Article_db } from '../schema';
import { addArticle, updateArticle } from '../services/actions';

interface FormValue {
  title: string;
  date: Date;
  isValid: boolean;
  error: string;
}

const ArticleForm = ({ article }: { article: Article | null }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<FormValue>({
    title: article?.title || '',
    date: article ? new Date(article.date) : new Date(),
    isValid: !!article?.title,
    error: '',
  });

  const add = () => {
    const article: Article_db = {
      title: value.title,
      date: format(
        value.date.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo' }),
        'yyyy-MM-dd'
      ),
    };

    startTransition(async () => {
      const { error } = await addArticle(article);
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、リストに戻る
      router.push('/article/list');
    });
  };

  const update = (article: Article) => {
    startTransition(async () => {
      const { error } = await updateArticle({
        ...article,
        title: value.title,
        date: value.date,
      });
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、リストに戻る
      router.push('/article/list');
    });
  };

  const handleClick = async () => {
    !article ? add() : update(article);
  };

  return (
    <div className='grid gap-10'>
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
            error: '',
          }));
        }}
      />
      <DatePicker value={value} setValue={setValue} />
      <Button
        className='w-full'
        disabled={!value.isValid || isPending}
        onClick={handleClick}
      >
        Submit
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {value.error ? <span className='text-red-500'>{value.error}</span> : null}
    </div>
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
          className={'w-full justify-start bg-white text-left font-normal'}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {format(value.date, 'yyyy/MM/dd')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={value.date}
          onSelect={(date) => {
            if (!date) return;
            setValue((prev) => ({ ...prev, date, error: '' }));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
