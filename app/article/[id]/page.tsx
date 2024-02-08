import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { getArticleSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';
import { fetchSupabase } from '@/lib/supabase/utils';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticlePage = async ({ params: { id } }: { params: { id: number } }) => {
  if (!id) redirect('/article/list');
  const res = await fetchSupabase({
    query: `articles?select=*&id=eq.${id}`,
  });
  const articles: Article[] = await res.json();
  const article = articles[0];
  if (!article || !article.id) {
    redirect('/article/list');
  }

  let sentences: Sentence[] = [];
  const { data: _sentences } = await getArticleSentences(article.id);
  if (_sentences) {
    sentences = _sentences;
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-4 pb-40 pt-10'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <div>{new Date(article.date).toLocaleDateString('ja-JP')}</div>
      <Link href={`/article/${article.id}/form`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </div>
  );
};

export default ArticlePage;
