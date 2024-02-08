import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import SentenceForm from '@/features/sentence/components/SentenceForm';
import { fetchSupabase } from '@/lib/supabase/utils';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticleSentenceFormPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: number }; // url 内部の "/[id]/" の部分
  searchParams: { text?: string }; // url 後ろの "?text=..."の部分
}) => {
  if (!id) redirect('/article/list');

  // params から article 取得
  const res = await fetchSupabase({
    query: `articles?select=*&id=eq.${id}`,
  });
  const articles: Article[] = await res.json();
  const article = articles[0];
  if (!article || !article.id) {
    redirect('/article/list');
  }

  // input の値は searchParams で保持 '？text='
  const text = searchParams.text?.trim() || '';

  return (
    <div className='mx-auto w-full max-w-md space-y-8 pb-40 pt-10'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <Link href={`/article/${article.id}`} className={buttonVariants()}>
        Back to Article
      </Link>
      <SentenceFormWrapper text={text} articleId={article.id} />
    </div>
  );
};

export default ArticleSentenceFormPage;

const SentenceFormWrapper = async ({
  text,
  articleId,
}: {
  text: string;
  articleId: number;
}) => {
  const array = text.split('').filter(Boolean);
  const url = `hanzi_latest_sentence_counts?select=*&form=in.${encodeURIComponent(
    `(${array.join(',')})`
  )}`;
  const res = await fetchSupabase({ query: url });
  const data: any[] = await res.json();

  const hanzis: Hanzi_latest_sentence_count[] = data
    ? data.map((h) => ({
        ...h,
        id: h.id!,
        count: h.count!,
        form: h.form!,
        consonant: h.consonant!,
        vowel: h.vowel!,
        tone: h.tone!,
      }))
    : [];
  return <SentenceForm text={text} hanzis={hanzis} articleId={articleId} />;
};
