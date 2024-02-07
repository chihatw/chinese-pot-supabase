export interface Article {
  id: number;
  title: string;
  date: Date;
  created_at: Date;
}

export interface Article_db {
  title: string;
  date: string;
}
