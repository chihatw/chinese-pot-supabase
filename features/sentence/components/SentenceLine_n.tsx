import { ArticleSentence } from '@/features/article/schema';
import { PinyinHanzi } from '@/features/hanzi';

const SentenceLine_n = ({ sentence }: { sentence: ArticleSentence }) => {
  const forms = sentence.text.split('');
  const pinyins = sentence.pinyin.split(' ');
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

export default SentenceLine_n;
