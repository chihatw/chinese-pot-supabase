import { ArticleForm } from '@/features/article';
import { Article } from '@/features/article/schema';

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: number };
}) => {
  let article: null | Article = null;
  if (id) {
    // todo get article by ids
  }
  return (
    <div className='mx-auto w-full max-w-lg space-y-10 pt-10'>
      <div className='text-4xl font-extrabold'>Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
