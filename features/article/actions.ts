'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { Article_org } from '.';
import { Article, Article_db } from './schema';

export const addArticle = async (
  article: Article_db
): Promise<{ data?: number; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('insert_article', {
    _title: article.title,
    _date: article.date,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  return { data };
};

export const updateArticle = async (
  article: Article
): Promise<{ data?: number; error?: string }> => {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase.rpc('update_article', {
    _id: article.id,
    _title: article.title,
    _date: format(article.date, 'yyyy-MM-dd'),
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/article/list');
  revalidatePath(`/article/${article.id}`);
  return { data };
};

export const deleteArticleAction = async (id: number) => {
  await deleteArticle(id);
  // note revalidatePath では、現在のページは更新されるが、top page が更新されない。
  // これは delete の操作が、fetch と違って　、 admin で行われるので tag が使われないから？
  // pnpm dev では 更新時に画面が崩れるが、本番環境では問題なし
  // revalidateTag(REVALIDATE_TAGS.articles);
};

// todo deleteArticle
export const deleteArticle = async (id: number) => {
  // await dbAdmin.collection(COLLECTIONS.articles).doc(id).delete();
};

export const batchAddArticlesAction = async (articles: Article_org[]) => {
  await batchAddArticles(articles);
  // count は restapi ではなく、　admin sdk を使っているので、 tag の設定がない
  revalidatePath('/');
};

// todo batchAddArticles
const batchAddArticles = async (articles: Article_org[]) => {
  // const batch = dbAdmin.batch();
  // for (const article of articles) {
  //   batch.set(
  //     dbAdmin
  //       .collection(COLLECTIONS.articles)
  //       .withConverter(articleConverter)
  //       .doc(article.id),
  //     article,
  //   );
  // }
  // await batch.commit();
};
