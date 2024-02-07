import { buttonVariants } from '@/components/ui/button';
import {
  getArticleSentences,
  getArticlesByIds,
} from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticlePage = async ({ params: { id } }: { params: { id: number } }) => {
  if (!id) redirect('/article/list');
  const { data, error } = await getArticlesByIds([id]);
  if (error || !data || !data.length) {
    error && console.error(error);
    redirect('/article/list');
  }
  const article = data[0];
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
