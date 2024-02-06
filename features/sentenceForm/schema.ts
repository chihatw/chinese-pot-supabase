import { Hanzi_org } from '@/features/hanzi';
import { Sentence } from '@/features/sentence';

export interface SentenceFormProps {
  forms: string; // max 200 input　で制限
  total: number;
  hanzis: Hanzi_org[];
  hanziSentences: Sentence[];
  articleId?: string;
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
