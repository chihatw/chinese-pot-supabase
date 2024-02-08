import ArticleForm from '@/features/article/components/ArticleForm';
import { Article } from '@/features/article/schema';
import { fetchSupabase } from '@/lib/supabase/utils';
import { redirect } from 'next/navigation';

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: number };
}) => {
  // article は null の時もある
  // create の時は null, update の時 Article
  let article: null | Article = null;

  if (id) {
    const res = await fetchSupabase({
      query: `articles?select=*&id=eq.${id}`,
    });
    const articles: Article[] = await res.json();
    article = articles[0];
    if (!article || !article.id) {
      redirect('/article/list');
    }
  }
  return (
    <div className='mx-auto w-full max-w-lg space-y-10 pt-10'>
      <div className='text-4xl font-extrabold'>Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
