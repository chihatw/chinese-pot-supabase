import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';

import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import HanziFormDialog from './HanziFormDialog';
import RadioGroupHanziMonitor from './RadioGroupHanziMonitor';

const SelectHanziForm = ({
  form,
  offset,
  hanzis,
  articleId,
  selectedHanzi,
  handleChangeSelect,
}: {
  form: string;
  offset: number;
  hanzis: Hanzi_latest_sentence_count[];
  articleId: number;
  selectedHanzi: string;
  handleChangeSelect: (value: string, offset: number) => void;
}) => {
  return (
    <Card className='bg-white/30 pt-4'>
      <CardContent className='-mb-4 -ml-2 '>
        <div className='grid grid-cols-[auto,1fr] items-center gap-4'>
          <div className='relative -top-1'>{form}</div>
          <div className='space-y-2'>
            <RadioGroup
              value={selectedHanzi}
              onValueChange={(value) => handleChangeSelect(value, offset)}
            >
              <div className='grid gap-2'>
                {hanzis
                  .sort((a, b) => b.count - a.count)
                  .map((hanzi, index) => (
                    <RadioGroupHanziMonitor hanzi={hanzi} key={index} />
                  ))}
              </div>
            </RadioGroup>
            <HanziFormDialog form={form} articleId={articleId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectHanziForm;
