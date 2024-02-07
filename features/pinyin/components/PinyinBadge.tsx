import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { Pinyin } from '../schema';

import { isValidPinyin, pinyinColor } from '../services/utils';

const PinyinBadge = ({ pinyin }: { pinyin: Pinyin }) => {
  if (!(pinyin.consonant + pinyin.vowel + pinyin.vowel)) return null;

  return (
    <div
      className={cn(
        isValidPinyin(pinyin) ? 'border-solid' : 'border-dashed',
        'flex items-center overflow-hidden rounded border-2 border-stone-400 '
      )}
    >
      {pinyin.consonant ? (
        <Badge
          variant='outline'
          className={cn(pinyinColor(pinyin.consonant), 'm-0 rounded-none px-1')}
        >
          {pinyin.consonant}
        </Badge>
      ) : null}
      {pinyin.vowel ? (
        <Badge
          variant='outline'
          className={cn(pinyinColor(pinyin.vowel), 'm-0 rounded-none px-1')}
        >
          {pinyin.vowel}
        </Badge>
      ) : null}
      {pinyin.tone ? (
        <Badge variant='outline' className='m-0 rounded-none bg-white px-1'>
          {pinyin.tone}
        </Badge>
      ) : null}
    </div>
  );
};

export default PinyinBadge;
