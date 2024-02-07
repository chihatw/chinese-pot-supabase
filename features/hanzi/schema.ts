import { Pinyin } from '../pinyin';

export interface Hanzi_org {
  id: string;
  form: string;
  pinyin: Pinyin;
  count: number;
  latestSentenceId: string;
}

export interface Hanzi {
  id: number;
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
  createdAt: Date;
}

export interface HanziWithSentence {
  hanzi_id: number;
  count: number;
  form: string;
  consonant: string;
  vowel: string;
  tone: string;
  sentence_id: number;
  text: string;
  pinyin: string;
}
