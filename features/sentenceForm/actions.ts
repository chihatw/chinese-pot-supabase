'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Hanzi } from '../hanzi';
import { Sentence } from '../sentence';

export const addHanziAction = async (hanzi: Hanzi, articleId?: string) => {
  await addHanzi(hanzi);
  // note sentence form でキャッシュが利用されているので、 revalidate が必要
  // revalidateTag(REVALIDATE_TAGS.sentenceForm);
  if (articleId) {
    revalidatePath(`/article/${articleId}/form`);
  }
};

// todo addHanzi
const addHanzi = async (hanzi: Hanzi) => {
  // await dbAdmin
  //   .collection(COLLECTIONS.hanzis)
  //   .withConverter(hanziConverter)
  //   .doc(hanzi.id)
  //   .set(hanzi);
};

export const addSentenceAction = async (
  sentence: Sentence,
  selectedHanzis: Hanzi[],
  articleId?: string
) => {
  const updatedHanzis = updateCountAndLastestSentenceId_in_Hanzis(
    selectedHanzis,
    sentence.id
  );
  try {
    await addSentence(sentence, updatedHanzis, articleId);
    // note revalidatePath にすると、現在表示されていないページは更新されない
    // revalidateTag(REVALIDATE_TAGS.senences);
    // revalidateTag(REVALIDATE_TAGS.articles);
    // revalidateTag(REVALIDATE_TAGS.invertedIndexByForm); // sentence search を更新
  } catch (e) {
    console.error(e);
  } finally {
    // 成功しても、失敗しても optimistic を上書きする
    if (articleId) {
      revalidatePath(`/article/${articleId}`);
    }
  }

  if (articleId) {
    redirect(`/article/${articleId}`);
  }
};

const updateCountAndLastestSentenceId_in_Hanzis = (
  hanzis: Hanzi[],
  sentenceId: string
): Hanzi[] => {
  return hanzis.map((h) => ({
    ...h,
    count: h.count + 1,
    latestSentenceId: sentenceId,
  }));
};

// todo addSentence
const addSentence = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string
) => {
  // const forms = [...new Set(sentence.text.split(''))];
  // const invertedIndexes = await _getInvertedIndexesByForms(forms);
  // const batch = dbAdmin.batch();
  // for (const form of forms) {
  //   const invertedIndex = invertedIndexes.find((i) => i.form === form);
  //   if (!invertedIndex) {
  //     const newInvertedIndex: InvertedIndex = {
  //       id: nanoid(8),
  //       form,
  //       count: 1,
  //       sentenceIds: [sentence.id],
  //     };
  //     createInvertedIndex_in_batch(batch, newInvertedIndex);
  //   } else {
  //     incrementInvertedIndexCount_in_batch(
  //       batch,
  //       invertedIndex.id,
  //       sentence.id
  //     );
  //   }
  // }
  // for (const hanzi of hanzis) {
  //   updateHanzi_in_batch(batch, hanzi);
  // }
  // createSentence_in_batch(batch, sentence);
  // if (!!articleId) {
  //   addSentenceIdToArticle_in_batch(batch, articleId, sentence.id);
  // }
  // batch.commit();
};
