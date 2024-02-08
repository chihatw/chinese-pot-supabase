import { buttonVariants } from '@/components/ui/button';
import ArticleList from '@/features/article/components/ArticleList';

import { Article } from '@/features/article/schema';
import { fetchSupabase } from '@/lib/supabase/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const ArticleListPage = async () => {
  const res = await fetchSupabase({
    query: 'articles?select=*&order=date.desc&limit=3',
  });
  const articles: Article[] = await res.json();

  return (
    <div className='mx-auto w-full max-w-lg  space-y-10 pt-10'>
      <div className='text-4xl font-extrabold'>Article List</div>
      <Link
        href={'/article/form'}
        className={buttonVariants({ variant: 'default' })}
      >
        <span>Create New Article</span>
        <Plus size={22} />
      </Link>
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;
