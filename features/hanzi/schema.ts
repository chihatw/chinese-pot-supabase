export interface Hanzi {
  id: number;
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
  createdAt: Date;
}

export interface Hanzi_insert {
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
}

export interface Hanzi_db_raw {
  id: number;
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
  created_at: string;
}

export interface Hanzi_with_sentence {
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
