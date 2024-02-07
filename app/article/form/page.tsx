import ArticleForm from '@/features/article/components/ArticleForm';
import { Article } from '@/features/article/schema';
import { getArticlesByIds } from '@/features/article/services/server';
import { redirect } from 'next/navigation';

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: number };
}) => {
  // create の時 null, update の時 Article
  let article: null | Article = null;
  if (id) {
    const { data, error } = await getArticlesByIds([id]);
    if (error || !data) {
      error && console.error(error);
      redirect('/article/list');
    }
    article = data[0];
  }
  return (
    <div className='mx-auto w-full max-w-lg space-y-10 pt-10'>
      <div className='text-4xl font-extrabold'>Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
