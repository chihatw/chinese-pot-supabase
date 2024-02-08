import PinyinHanzi from '@/features/hanzi/components/PinyinHanzi';
import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';

const SelectedHanzisMonitor = ({
  hanzis,
  selectedHanzis,
}: {
  hanzis: Hanzi_latest_sentence_count[];
  selectedHanzis: string[];
}) => {
  return (
    <div className='flex flex-wrap items-end gap-2 px-2'>
      {selectedHanzis.map((hanziId, index) => {
        const hanzi = hanzis.find((h) => h.id.toString() === hanziId);
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
