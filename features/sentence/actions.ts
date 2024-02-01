'use server';

import { revalidatePath } from 'next/cache';
import { Sentence } from '.';

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  // count は restapi ではなく、　admin sdk を使っているので、 tag の設定がない
  revalidatePath('/');
};

// todo batchAddSentences
const batchAddSentences = async (sentences: Sentence[]) => {
  // const batch = dbAdmin.batch();
  // for (const sentence of sentences) {
  //   batch.set(
  //     dbAdmin
  //       .collection(COLLECTIONS.sentences)
  //       .withConverter(sentenceConverter)
  //       .doc(sentence.id),
  //     sentence
  //   );
  // }
  // await batch.commit();
};

export const deleteSentenceAction = async (
  sentence: Sentence,
  articleId?: string
) => {
  await deleteSentence(sentence, articleId);
  // revalidateTag(REVALIDATE_TAGS.senences);
  // revalidateTag(REVALIDATE_TAGS.articles);
  // revalidateTag(REVALIDATE_TAGS.invertedIndexByForm); // sentence search を更新
};

// todo deleteSentence
export const deleteSentence = async (
  sentence: Sentence,
  articleId?: string
) => {
  // /**
  //  * invertedIndex の更新
  //  */
  // const forms = [...new Set(sentence.text.split(''))];
  // const invertedIndexes = await _getInvertedIndexesByForms(forms);
  // const batch = dbAdmin.batch();
  // for (const form of forms) {
  //   const invertedIndex = invertedIndexes.find((i) => i.form === form);
  //   if (!invertedIndex) throw new Error('invertedIndex cannot find');
  //   // sentenceId の削除と、カウントを１つ減らす
  //   decrementInvertedIndexCount_in_batch(batch, invertedIndex.id, sentence.id);
  // }
  // /**
  //  * hanzi の更新
  //  */
  // const hanziIds = buildHanziIds_from_Sentence(sentence);
  // for (const hanziId of hanziIds) {
  //   // latestSentenceId の削除と、カウントを１つ減らす
  //   decrementHanziCount_in_batch(batch, hanziId);
  // }
  // /**
  //  * sentence の削除
  //  */
  // deleteSentence_in_batch(batch, sentence.id);
  // if (!!articleId) {
  //   /**
  //    * article の更新
  //    */
  //   // sentenceIds　からの削除
  //   removeSentenceIdFromArticle_in_batch(batch, articleId, sentence.id);
  // }
  // try {
  //   batch.commit();
  // } catch (e) {
  //   console.log(e);
  // }
};
