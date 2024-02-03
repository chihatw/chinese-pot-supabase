'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Article_org } from '.';

export const addArticleAction = async (article: Article_org) => {
  await addArticle(article);

  // note revalidateTagをつけると、 article list も、 top page も更新される
  // note revalidatePath の場合、 dev では、 top page も更新されるが、本番環境では更新されない
  // revalidateTag(REVALIDATE_TAGS.articles);
  redirect('/article/list');
};

// todo addArticle
const addArticle = async (article: Article_org) => {
  // await dbAdmin
  //   .collection(COLLECTIONS.sarticles)
  //   .withConverter(articleConverter)
  //   .doc(article.id)
  //   .set(article);
};

export const updateArticleAction = async (
  id: string,
  title: string,
  createdAt: number
) => {
  await updateArticle(id, title, createdAt);
  // revalidateTag(REVALIDATE_TAGS.articles);
  // revalidateTag(REVALIDATE_TAGS.article);
  redirect('/article/list');
};
// todo updateArticle
const updateArticle = async (id: string, title: string, createdAt: number) => {
  // await dbAdmin
  //   .collection(COLLECTIONS.articles)
  //   .withConverter(articleConverter)
  //   .doc(id)
  //   .update({ title, createdAt });
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
