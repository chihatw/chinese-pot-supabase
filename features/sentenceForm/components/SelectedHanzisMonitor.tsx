import { Hanzi, PinyinHanzi } from "@/features/hanzi";
import { getPinyinStr } from "@/features/pinyin";

const SelectedHanzisMonitor = ({
  selectedHanziIds,
  hanzis,
}: {
  selectedHanziIds: string[];
  hanzis: Hanzi[];
}) => {
  return (
    <div className="flex flex-wrap items-end gap-2 px-2">
      {selectedHanziIds.map((hanziId, index) => {
        const hanzi = hanzis.find((h) => h.id === hanziId);
        if (!hanzi)
          return (
            <div
              key={index}
              className="text-4xl font-extralight text-gray-500 "
            >
              _
            </div>
          );
        return (
          <div key={index}>
            <PinyinHanzi
              form={hanzi.form}
              pinyinStr={getPinyinStr(hanzi.pinyin)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectedHanzisMonitor;
