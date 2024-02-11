'use client';

import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useOptimistic } from 'react';

import { Article } from '../schema';
import { deleteArticle } from '../services/actions';

const ArticleList = ({ articles }: { articles: Article[] }) => {
  const [optimisticArticles, deleteOptimisticArticles] = useOptimistic<
    Article[],
    number
  >(articles, (state, id) => {
    return state.filter((article) => article.id !== id);
  });
  const handleSubmit = async (id: number) => {
    deleteOptimisticArticles(id);
    await deleteArticle(id);
  };
  return (
    <div className='grid gap-y-10 pb-40'>
      {optimisticArticles.map((article) => (
        <div
          key={article.id}
          className='space-y-2 rounded bg-white p-5 pt-3 shadow'
        >
          <div className='space-x-1 text-sm font-extralight text-gray-500'>
            <span>
              {new Date(article.date).toLocaleDateString('ja-JP', {
                timeZone: 'Asia/Tokyo',
              })}
            </span>
          </div>
          <div className='grid grid-cols-[1fr,auto,auto] items-center gap-2'>
            <Link href={`/article/${article.id}`}>
              <div className='space-y-2 '>
                <div>{article.title}</div>
              </div>
            </Link>
            <Link href={`/article/form?id=${article.id}`}>
              <Edit2 />
            </Link>

            <Button
              variant={'ghost'}
              size='icon'
              onClick={() => handleSubmit(article.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
