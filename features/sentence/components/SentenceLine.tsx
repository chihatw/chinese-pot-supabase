import PinyinHanzi from '@/features/hanzi/components/PinyinHanzi';
import { Sentence } from '../schema';

const SentenceLine = ({ sentence }: { sentence: Sentence }) => {
  const forms = sentence.text ? sentence.text.split('') : [];
  const pinyins = sentence.pinyin ? sentence.pinyin.split(' ') : [];
  return (
    <div className='grid'>
      <div className='flex flex-wrap gap-1 '>
        {forms.map((form, offset) => (
          <PinyinHanzi key={offset} form={form} pinyinStr={pinyins[offset]} />
        ))}
      </div>
    </div>
  );
};

export default SentenceLine;
