'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import { addSentence } from '../../actions';
import InputTextForm from './InputTextForm';
import SelectHanziForm from './SelectHanziForm';
import SelectedHanzisMonitor from './SelectedHanzisMonitor';

const SentenceForm = ({
  text,
  hanzis,
  articleId,
}: {
  text: string;
  articleId: number;
  hanzis: Hanzi_latest_sentence_count[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const forms = useMemo(() => text.split(''), [text]);
  const [value, setValue] = useState<{
    selectedHanzis: string[];
    error: string;
  }>({ selectedHanzis: [], error: '' });

  /** selectedHanzis の初期化 */
  useEffect(() => {
    const selectedHanzis = forms.map(
      (form) =>
        hanzis
          .filter((h) => h.form === form)
          ?.sort((a, b) => b.count - a.count)[0]
          ?.id.toString() || '' // Radio Group の値に合わせて string に変換
    );
    setValue({ selectedHanzis, error: '' });
  }, [forms, hanzis]);

  const handleChangeSelect = (value: string, offset: number) => {
    setValue((prev) => {
      const selectedHanzis = [...prev.selectedHanzis];
      selectedHanzis.splice(offset, 1, value);
      return { selectedHanzis, error: '' };
    });
  };

  const handleSubmit = async () => {
    const _hanzi_ids: number[] = [];
    const _offsets: number[] = [];
    for (let i = 0; i < value.selectedHanzis.length; i++) {
      _offsets.push(i);
      _hanzi_ids.push(Number(value.selectedHanzis[i]));
    }
    startTransition(async () => {
      const { error } = await addSentence(articleId, _hanzi_ids, _offsets);
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、リストに戻る
      router.push(`/article/${articleId}`);
    });
  };

  return (
    <div className='relative grid gap-4'>
      <InputTextForm text={text} />
      <div className='space-y-4'>
        {forms.map((form, offset) => (
          <SelectHanziForm
            key={offset}
            form={form}
            offset={offset}
            hanzis={hanzis.filter((h) => h.form === form)}
            articleId={articleId}
            selectedHanzi={value.selectedHanzis[offset]}
            handleChangeSelect={handleChangeSelect}
          />
        ))}
      </div>
      <SelectedHanzisMonitor
        hanzis={hanzis}
        selectedHanzis={value.selectedHanzis}
      />
      <Button
        className='w-full'
        onClick={handleSubmit}
        disabled={
          isPending ||
          value.selectedHanzis.some((value) => !value) ||
          !value.selectedHanzis.length
        }
      >
        Create New Article
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {value.error ? <span className='text-red-500'>{value.error}</span> : null}
    </div>
  );
};

export default SentenceForm;
