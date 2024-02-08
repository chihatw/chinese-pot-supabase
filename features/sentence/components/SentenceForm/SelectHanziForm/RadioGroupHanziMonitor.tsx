import { RadioGroupItem } from '@/components/ui/radio-group';
import PinyinHanzi from '@/features/hanzi/components/PinyinHanzi';

import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import SentenceLine from '@/features/sentence/components/SentenceLine';

const RadioGroupHanziMonitor = ({
  hanzi,
}: {
  hanzi: Hanzi_latest_sentence_count;
}) => {
  return (
    <div className='flex items-center gap-2 '>
      <div className='grid grid-cols-[auto,36px] items-center gap-2 rounded bg-white px-4 py-2 h-[54px]'>
        <RadioGroupItem value={String(hanzi.id)} />
        <div className='grid place-items-center '>
          <PinyinHanzi
            form={hanzi.form}
            pinyinStr={hanzi.consonant + hanzi.vowel + hanzi.tone}
            count={hanzi.count}
          />
        </div>
      </div>

      {hanzi.sentence_id ? (
        <SentenceLine
          sentence={{
            text: hanzi.text || '',
            pinyin: hanzi.pinyin || '',
            sentence_id: hanzi.sentence_id,
          }}
        />
      ) : null}
    </div>
  );
};

export default RadioGroupHanziMonitor;
