import { buttonVariants } from '@/components/ui/button';
import { getArticlesByIds } from '@/features/article/services/server';
import { getHanzisWithSentence } from '@/features/hanzi/services/server';
import SentenceForm from '@/features/sentence/components/SentenceForm';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticleSentenceFormPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: number }; // url 内部の "/[id]/" の部分
  searchParams: { text?: string }; // url 後ろの "?text=..."の部分
}) => {
  !id && redirect('/article/list');

  // params から article 取得
  const { data, error } = await getArticlesByIds([id]);
  if (error) {
    console.error(error);
    redirect('/article/list');
  }
  const article = data![0];

  // input の値は searchParams で保持 '？text='
  const text = searchParams.text?.trim() || '';

  const { data: hanzis, error: error_h } = await getHanzisWithSentence(
    text.split('').filter(Boolean)
  );
  error_h && console.error(error_h);

  return (
    <div className='mx-auto w-full max-w-md space-y-8 pb-40 pt-10'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <Link href={`/article/${article.id}`} className={buttonVariants()}>
        Back to Article
      </Link>
      <SentenceForm text={text} hanzis={hanzis} articleId={article.id} />
    </div>
  );
};

export default ArticleSentenceFormPage;
