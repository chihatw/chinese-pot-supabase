import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import SentenceList from '@/features/sentence/components/SentenceList';
import { Sentence } from '@/features/sentence/schema';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

import Link from 'next/link';

export default async function Home() {
  // const res = await fetchSupabase({
  //   query: 'article_sentence_text_pinyins_latest?select=*',
  //   // cache: 'no-store',
  // });

  // const data = await res.json();

  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_sentence_text_pinyins_latest')
    .select('*');

  if (!data || !data.length) {
    return <></>;
  }
  const article = data[0] as unknown as Article;

  const sentences = data as unknown as Sentence[];

  return (
    <main className='mx-auto w-full max-w-md space-y-4 pb-40 pt-10 '>
      <div className='text-2xl font-bold'>{article?.title}</div>
      <div>
        {new Date(article.date).toLocaleDateString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </div>
      <Link href={`/article/${article.id}/form`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </main>
  );
}
