import { buttonVariants } from '@/components/ui/button';
import ArticleList from '@/features/article/components/ArticleList';
import { Article } from '@/features/article/schema';

import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const ArticleListPage = async () => {
  // const res = await fetchSupabase({
  //   query: 'articles?select=*&order=date.desc&limit=3',
  //   // cache: 'no-store',
  // });
  // const articles: Article[] = await res.json();
  const supabase = createSupabaseServerComponentClient();

  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })
    .limit(3);

  const articles = data as unknown as Article[];

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
