import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';
import { fetchSupabase } from '@/lib/supabase/utils';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticlePage = async ({ params: { id } }: { params: { id: number } }) => {
  if (!id) redirect('/article/list');

  const res = await fetchSupabase({
    query: `article_sentence_text_pinyins?select=*&id=eq.${id}&order=index.asc`,
    cache: 'no-store',
  });

  const data = await res.json();
  if (!data || !data.length) {
    redirect('/article/list');
  }

  const article: Article = data[0];
  if (!article || !article.id) {
    redirect('/article/list');
  }

  const sentences: Sentence[] = data.filter(
    (s: { index?: number }) => !!s.index
  );

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
