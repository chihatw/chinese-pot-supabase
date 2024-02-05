import { RadioGroupItem } from '@/components/ui/radio-group';
import { PinyinHanzi } from '@/features/hanzi';
import SentenceLine_n from '@/features/sentence/components/SentenceLine_n';
import { HanziWithSentence } from '../../schema';

const RadioGroupHanziMonitor = ({ hanzi }: { hanzi: HanziWithSentence }) => {
  return (
    <div className='flex items-center gap-2 '>
      <div className='grid grid-cols-[auto,36px] items-center gap-2 rounded bg-white px-4 py-2 h-[54px]'>
        <RadioGroupItem value={String(hanzi.hanzi_id)} />
        <div className='grid place-items-center '>
          <PinyinHanzi
            form={hanzi.form}
            pinyinStr={hanzi.consonant + hanzi.vowel + hanzi.tone}
            count={hanzi.count}
          />
        </div>
      </div>

      {hanzi.sentence_id ? (
        <SentenceLine_n
          sentence={{
            text: hanzi.text,
            pinyin: hanzi.pinyin,
          }}
        />
      ) : null}
    </div>
  );
};

export default RadioGroupHanziMonitor;
