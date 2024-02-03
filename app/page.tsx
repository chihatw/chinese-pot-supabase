import {
  getArticleSentences,
  getRecentArticles,
} from '@/features/article/services';
import { SentenceTable } from '@/features/sentence';
import Link from 'next/link';

export default async function Home() {
  const articles = await getRecentArticles(1);
  const article = articles[0];
  const sentences = article ? await getArticleSentences(article.id) : [];

  return (
    <main className='mx-auto w-full max-w-md space-y-4 pb-40 pt-10 '>
      <div className='text-2xl font-bold'>{article?.title}</div>
      {article ? (
        <div>{new Date(article.date).toLocaleDateString('ja-JP')}</div>
      ) : null}

      {article ? (
        <div className='flex'>
          <Link href={`/article/${article.id}/form`}>
            <div className='rounded-lg bg-primary px-4 py-1.5 text-white'>
              Create New Sentence
            </div>
          </Link>
        </div>
      ) : null}
      {article ? (
        <SentenceTable sentences={sentences} article={article} />
      ) : null}
    </main>
  );
}
