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
