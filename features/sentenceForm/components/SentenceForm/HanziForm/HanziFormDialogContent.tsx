'use client';

import { Input } from '@/components/ui/input';
import { Hanzi, PinyinHanzi, buildHanziId } from '@/features/hanzi';

import {
  Pinyin,
  PinyinBadge,
  PinyinFilter,
  buildPinyin,
  buildPinyinFilter,
  getPinyinStr,
} from '@/features/pinyin';

import useDebouce from '@/hooks/useDebounce';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import {
  INITIAL_PINYIN,
  INITIAL_PINYIN_FILTERL,
} from '@/features/pinyin/schema';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addHanziAction } from '../../../actions';
import HanziList from './HanziList';

const HanziFormDialogContent = ({
  form,
  setOpen,
  articleId,
}: {
  form: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  articleId?: number;
}) => {
  // if (typeof global.readCount !== "number") {
  //   global.readCount = 0;
  // }

  const [input, setInput] = useState('');
  const [hanzis, setHanzis] = useState<Hanzi[]>([]);
  const [value, setValue] = useState<{ filter: PinyinFilter; pinyin: Pinyin }>({
    filter: INITIAL_PINYIN_FILTERL,
    pinyin: INITIAL_PINYIN,
  });

  const debouncedInput = useDebouce(input, 300);

  const disabled = useMemo(() => {
    const { pinyin } = value;
    // pinyin が空の場合は、 ok
    if (!getPinyinStr(pinyin)) return false;

    // pinyin に何か入っていれば、トーンと母音は必須
    return !pinyin.tone || !pinyin.vowel;
  }, [value]);

  useEffect(() => {
    if (!debouncedInput) {
      setValue({ filter: INITIAL_PINYIN_FILTERL, pinyin: INITIAL_PINYIN });
      return;
    }
    const pinyin = buildPinyin(debouncedInput);
    const filter = buildPinyinFilter(debouncedInput);
    setValue({ pinyin, filter });
  }, [debouncedInput]);

  useEffect(() => {
    if (!input) {
      setHanzis([]);
      return;
    }

    const isValidFilter = validateFilter(value.filter);
    if (!isValidFilter) return;

    const fetchData = async () => {
      const { hanzis } = await getHanzisByPinyinFilter(value.filter);
      setHanzis(hanzis);
    };
    fetchData();
  }, [value.filter, input]);

  const handleSubmit = async () => {
    const hanzi: Hanzi = {
      id: buildHanziId(form, value.pinyin),
      form,
      pinyin: value.pinyin,
      count: 0,
      latestSentenceId: '',
    };
    await addHanziAction(hanzi, articleId);
    setOpen(false);
  };
  return (
    <div className='grid h-[calc(100vh-200px)] grid-rows-[auto,auto,auto,auto,1fr] space-y-4'>
      <div className='grid grid-cols-[120px,150px,1fr,auto] items-center gap-2'>
        <Input
          className=' bg-white'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='拼音'
        />
        <JSONMonitor form={form} pinyin={value.pinyin} />
        <div className='flex flex-col items-center gap-2'>
          <PinyinBadge pinyin={value.pinyin} />
          <PinyinHanzi pinyinStr={getPinyinStr(value.pinyin)} form={form} />
        </div>
        <form action={handleSubmit}>
          <ServerActionPendingButton
            label={getPinyinStr(value.pinyin) ? '登錄' : '記号'}
            disabled={disabled}
          />
        </form>
      </div>
      <div className='text-sm font-extralight text-gray-700'>{`Result: ${hanzis.length} hits`}</div>
      {hanzis.length < 200 ? (
        <HanziList hanzis={hanzis} />
      ) : (
        <div>More than 200 hanzis</div>
      )}
    </div>
  );
};

export default HanziFormDialogContent;

const JSONMonitor = ({ form, pinyin }: { form: string; pinyin: Pinyin }) => {
  return (
    <pre className={cn(fontSans.className, 'text-xs ')}>
      {JSON.stringify(
        {
          form,
          pinyin,
        } as Hanzi,
        null,
        8
      )}
    </pre>
  );
};

/**
 * fetch 件数削減のために
 *
 * 子音、母音、四声のうち、２つ以上入力されている場合のみ、fetchする
 */
const validateFilter = (filter: PinyinFilter): boolean => {
  let point = 0;
  if (filter.consonants.length) {
    point++;
  }
  if (filter.vowels.length) {
    point++;
  }
  if (filter.tone.length) {
    point++;
  }

  return point > 1;
};

const ServerActionPendingButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={disabled || pending}>
      <div className='flex items-center gap-2'>
        <span className='whitespace-nowrap'>{label}</span>
        {pending ? <Loader2 className='animate-spin' /> : null}
      </div>
    </Button>
  );
};

// note おそらく、1回当たりの読み込み件数はこれが一番多い
// 読み込み件数を減らす方法は、filter を key, hanzis を value にもつ collection　を作ること
// 例) key: 'ji', value: [{ id: '..', form: '..', pinyin: {...} }, {...}, ...]
type WhereValue = string | number | boolean | string[];
type WhereOptions =
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL'
  | 'GREATER_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'EQUAL'
  | 'NOT_EQUAL'
  | 'ARRAY_CONTAINS'
  | 'IN'
  | 'ARRAY_CONTAINS_ANY'
  | 'NOT_IN';
type WhereProps = [string, WhereOptions, WhereValue];
interface BuildStructuredQueryProps {
  collectionId: string;
  orderBy?: [string, 'asc' | 'desc'];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
}
const COLLECTIONS = {
  hanzis: 'hanzis',
  articles: 'articles',
  sentences: 'sentences',
  invertedIndexes: 'inverted_indexes', // note invertedIndexes は　エラー
};
const getHanzisByPinyinFilter = async (
  filter: PinyinFilter
): Promise<{ hanzis: Hanzi[] }> => {
  const q: BuildStructuredQueryProps = { collectionId: COLLECTIONS.hanzis };
  const where: WhereProps[] = [];
  if (filter.consonants.length) {
    where.push(['consonant', 'IN', filter.consonants]);
  }

  if (filter.vowels.length) {
    where.push(['vowel', 'IN', filter.vowels]);
  }

  if (filter.tone) {
    where.push(['tone', 'EQUAL', filter.tone]);
  }

  q.where = where;

  // const res = await fetch(fetchRequestURL, buildFetchRequestOption(q));
  // const { docs, readCount } = await getDocs(res);
  // global.readCount += readCount;
  // console.log(
  //   "getHanzisByPinyinFilter",
  //   docs.length,
  //   `readCount:`,
  //   global.readCount,
  // );
  const docs: any[] = [];
  const hanzis = docs.map((doc) => buildHanzi(doc));
  return { hanzis };
};

const buildHanzi = (document: any): Hanzi => {
  const fields = document.fields;
  const pinyinStr =
    fields.consonant.stringValue +
    fields.vowel.stringValue +
    fields.tone.stringValue;
  return {
    id: document.name.split('/').at(-1) || '',
    form: fields.form.stringValue || '',
    pinyin: buildPinyin(pinyinStr || ''),
    count: Number(fields.count.integerValue),
    latestSentenceId: fields.latestSentenceId.stringValue,
  };
};
