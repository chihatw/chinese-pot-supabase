import { PinyinHanzi } from '@/features/hanzi';
import { HanziWithSentence } from '@/features/hanzi/schema';

const SelectedHanzisMonitor = ({
  hanzis,
  selectedHanzis,
}: {
  hanzis: HanziWithSentence[];
  selectedHanzis: string[];
}) => {
  return (
    <div className='flex flex-wrap items-end gap-2 px-2'>
      {selectedHanzis.map((hanziId, index) => {
        const hanzi = hanzis.find((h) => h.hanzi_id.toString() === hanziId);
        if (!hanzi)
          return (
            <div
              key={index}
              className='text-4xl font-extralight text-gray-500 '
            >
              _
            </div>
          );
        return (
          <PinyinHanzi
            key={index}
            form={hanzi.form}
            pinyinStr={hanzi.consonant + hanzi.vowel + hanzi.tone}
          />
        );
      })}
    </div>
  );
};

export default SelectedHanzisMonitor;
