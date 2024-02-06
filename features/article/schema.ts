export interface Article_org {
  id: string;
  title: string;
  createdAt: number;
  sentenceIds: string[];
}

export interface Article {
  id: number;
  title: string;
  date: Date;
  created_at: Date;
}

export interface ArticleSentence {
  sentence_id: number;
  text: string;
  pinyin: string;
}

export interface Article_db {
  title: string;
  date: string;
}
