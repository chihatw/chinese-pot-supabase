import { buttonVariants } from '@/components/ui/button';
import { ArticleList } from '@/features/article';
import { getRecentArticles } from '@/features/article/services';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const ArticleListPage = async () => {
  const articles = await getRecentArticles(3);
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
