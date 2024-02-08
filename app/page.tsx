import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { getArticleSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';
import { fetchSupabase } from '@/lib/supabase/utils';

import Link from 'next/link';

export default async function Home() {
  let article: null | Article = null;
  const res = await fetchSupabase({
    query: 'articles?select=*&order=date.desc&limit=1',
  });
  const articles: Article[] = await res.json();

  if (articles && articles.length) {
    article = articles[0];
  }
  if (!article) return <></>;

  let sentences: Sentence[] = [];
  article = articles[0];
  const { data } = await getArticleSentences(article.id);
  if (data) {
    sentences = data;
  }

  return (
    <main className='mx-auto w-full max-w-md space-y-4 pb-40 pt-10 '>
      <div className='text-2xl font-bold'>{article?.title}</div>
      <div>{new Date(article.date).toLocaleDateString('ja-JP')}</div>
      <Link href={`/article/${article.id}/form`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </main>
  );
}
