import { VOWELS, VOWEL_PAIRS } from "./vowels";

export const VOWEL_FILTER = {
  a: ["a", "ai", "ao", "an", "ang"],
  o: ["o", "ou", "ong"],
  e: ["e", "ei", "er", "en", "eng"],
  ai: ["ai"],
  ei: ["ei"],
  ao: ["ao"],
  ou: ["ou"],
  er: ["er"],
  an: ["an", "ang"],
  en: ["en", "eng"],
  ang: ["ang"],
  on: ["ong"],
  ong: ["ong"],
  eng: ["eng"],
  u: [
    "u",
    "un",
    "ui",
    "uo",
    "ue",
    "ua",
    "uan",
    "uai",
    "uang",
    "wu",
    "wo",
    "wa",
    "wai",
    "wan",
    "wang",
  ],
  v: ["v", "ve", "yu", "yue"],
  i: [
    "i",
    "in",
    "iu",
    "ie",
    "ia",
    "ing",
    "ian",
    "iao",
    "iang",
    "iong",
    "yi",
    "ye",
    "ya",
    "yao",
    "yin",
    "yan",
    "ying",
    "yang",
    "yong",
  ],
  un: ["un"],
  in: ["in", "ing", "yin", "ying"],
  ui: ["ui"],
  uo: ["uo", "wo"],
  iu: ["iu"],
  ve: ["ve", "yue"],
  ie: ["ie", "ye"],
  ue: ["ue"],
  ua: ["ua", "uan", "uai", "uang", "wa", "wai", "wan", "wang"],
  ia: ["ia", "ian", "iao", "iang", "ya", "yao", "yan", "yang"],
  ing: ["ing", "ying"],
  uan: ["uan", "uang", "wan", "wang"],
  ian: ["ian", "iang", "yan", "yang"],
  iao: ["iao", "yao"],
  uai: ["uai", "wai"],
  uang: ["uang", "wang"],
  iang: ["iang", "yang"],
  io: ["iong", "yong"],
  ion: ["iong", "yong"],
  iong: ["iong", "yong"],
  y: [
    "yi",
    "yu",
    "ye",
    "ya",
    "yue",
    "you",
    "yao",
    "yai",
    "yin",
    "yun",
    "yan",
    "yuan",
    "ying",
    "yang",
    "yong",
  ],
  yi: ["yi", "yin", "ying"],
  w: ["wu", "wo", "wa", "wei", "wai", "wen", "wan", "wang", "weng"],
  wu: ["wu"],
  yu: ["yu", "yue", "yun", "yuan"],
  wo: ["wo"],
  ye: ["ye"],
  ya: ["ya", "yao", "yai", "yan", "yang"],
  wa: ["wa", "wai", "wan", "wang"],
  we: ["wei", "wen", "weng"],
  wei: ["wei"],
  yue: ["yue"],
  yo: ["you", "yong"],
  you: ["you"],
  yao: ["yao"],
  wai: ["wai"],
  yai: ["yai"],
  yin: ["yin", "ying"],
  wen: ["wen", "weng"],
  yun: ["yun"],
  wan: ["wan", "wang"],
  yan: ["yan", "yang"],
  yua: ["yuan"],
  yuan: ["yuan"],
  ying: ["ying"],
  wang: ["wang"],
  yang: ["yang"],
  yon: ["yong"],
  yong: ["yong"],
  weng: ["weng"],
};

export const buildVowelFilter = () => {
  return VOWELS.reduce(
    (acc, cur) => {
      let cloned = { ...acc };
      // 母音から、先頭から1文字、2文字...のように部分文字列を作る
      for (let i = 1; i <= cur.length; i++) {
        const key = cur.slice(0, i);
        cloned = {
          ...cloned,
          // 部分文字列と自身の対応を記録する
          [key]: cloned[key] ? [...cloned[key], cur] : [cur],
        };
      }

      // 弱母音
      const pair_key = Object.keys(VOWEL_PAIRS).find(
        (key) => VOWEL_PAIRS[key] === cur,
      );
      if (pair_key) {
        // 母音から、先頭から1文字、2文字...のように部分文字列を作る
        for (let i = 1; i <= pair_key.length; i++) {
          const key = pair_key.slice(0, i);
          cloned = {
            ...cloned,
            // 部分文字列と自身の対応を記録する
            [key]: cloned[key] ? [...cloned[key], cur] : [cur],
          };
        }
      }

      return cloned;
    },
    {} as { [key: string]: string[] },
  );
};
