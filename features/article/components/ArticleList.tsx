'use client';

import { Button } from '@/components/ui/button';
import { Edit2, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteArticleAction } from '../actions';
import { Article_org } from '../schema';

const ArticleList = ({ articles }: { articles: Article_org[] }) => {
  const handleSubmit = async (id: string) => {
    await deleteArticleAction(id);
  };
  return (
    <div className='grid gap-y-10 pb-40'>
      {articles.map((article) => (
        <div
          key={article.id}
          className='space-y-2 rounded bg-white p-5 pt-3 shadow'
        >
          <div className='space-x-1 text-sm font-extralight text-gray-500'>
            <span>
              {new Date(article.createdAt).toLocaleDateString('ja-JP')}
            </span>
            <span>-</span>
            <span>{article.sentenceIds.length}</span>
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
            <form action={() => handleSubmit(article.id)}>
              <ServerActionPendingIconButton
                variant='ghost'
                disabled={!!article.sentenceIds.length}
              >
                <Trash2 />
              </ServerActionPendingIconButton>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;

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
