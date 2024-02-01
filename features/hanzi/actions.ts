'use server';

import { revalidatePath } from 'next/cache';
import { Hanzi } from '.';

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  // count は restapi ではなく、　admin sdk を使っているので、 tag の設定がない
  revalidatePath('/');
};

// todo batchAddHanzis
const batchAddHanzis = async (hanzis: Hanzi[]) => {
  // const batch = dbAdmin.batch();
  // for (const hanzi of hanzis) {
  //   batch.set(
  //     dbAdmin
  //       .collection(COLLECTIONS.hanzis)
  //       .withConverter(hanziConverter)
  //       .doc(hanzi.id),
  //     hanzi
  //   );
  // }
  // await batch.commit();
};
