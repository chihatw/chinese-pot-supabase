import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import {
  getArticleSentences,
  getRecentArticles,
} from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';

import Link from 'next/link';

export default async function Home() {
  let article: null | Article = null;
  let sentences: Sentence[] = [];
  const { data, error } = await getRecentArticles(1);

  if (data && data.length) {
    article = data[0];
    const { data: _sentences, error } = await getArticleSentences(article.id);
    if (_sentences) {
      sentences = _sentences;
    }
  }

  if (!article) return <></>;

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
