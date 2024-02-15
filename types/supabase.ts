export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          created_at: string
          date: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      hanzis: {
        Row: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }
        Insert: {
          consonant?: string
          created_at?: string
          form: string
          id?: number
          tone?: string
          vowel?: string
        }
        Update: {
          consonant?: string
          created_at?: string
          form?: string
          id?: number
          tone?: string
          vowel?: string
        }
        Relationships: []
      }
      sentence_hanzis: {
        Row: {
          created_at: string
          hanzi_id: number
          id: number
          offset: number
          sentence_id: number
        }
        Insert: {
          created_at?: string
          hanzi_id: number
          id?: number
          offset: number
          sentence_id: number
        }
        Update: {
          created_at?: string
          hanzi_id?: number
          id?: number
          offset?: number
          sentence_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sentence_hanzis_hanzi_id_fkey"
            columns: ["hanzi_id"]
            isOneToOne: false
            referencedRelation: "hanzi_counts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_hanzi_id_fkey"
            columns: ["hanzi_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentence_counts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_hanzi_id_fkey"
            columns: ["hanzi_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_hanzi_id_fkey"
            columns: ["hanzi_id"]
            isOneToOne: false
            referencedRelation: "hanzis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins_latest"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentence_counts"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentences"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentence_text_pinyins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentences"
            referencedColumns: ["id"]
          }
        ]
      }
      sentences: {
        Row: {
          article_id: number
          created_at: string
          id: number
          index: number
        }
        Insert: {
          article_id: number
          created_at?: string
          id?: number
          index: number
        }
        Update: {
          article_id?: number
          created_at?: string
          id?: number
          index?: number
        }
        Relationships: [
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins_latest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      todos: {
        Row: {
          completed: boolean | null
          created_at: string
          created_by: string | null
          id: number
          title: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      article_sentence_text_pinyins: {
        Row: {
          created_at: string | null
          date: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          title: string | null
        }
        Relationships: []
      }
      article_sentence_text_pinyins_latest: {
        Row: {
          created_at: string | null
          date: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          title: string | null
        }
        Relationships: []
      }
      hanzi_counts: {
        Row: {
          consonant: string | null
          count: number | null
          created_at: string | null
          form: string | null
          id: number | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      hanzi_latest_sentence_counts: {
        Row: {
          consonant: string | null
          count: number | null
          created_at: string | null
          form: string | null
          id: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      hanzi_latest_sentences: {
        Row: {
          article_id: number | null
          consonant: string | null
          created_at: string | null
          form: string | null
          id: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      sentence_text_pinyins: {
        Row: {
          article_id: number | null
          created_at: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          text: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_hanzis_by_consonants: {
        Args: {
          _consonants: string[]
          _limit: number
        }
        Returns: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }[]
      }
      get_hanzis_by_consonants_vowel_tone: {
        Args: {
          _consonants: string[]
          _vowel: string
          _tone: string
          _limit: number
        }
        Returns: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }[]
      }
      get_hanzis_by_consonants_vowels: {
        Args: {
          _consonants: string[]
          _vowels: string[]
          _limit: number
        }
        Returns: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }[]
      }
      get_hanzis_by_vowel_tone: {
        Args: {
          _vowel: string
          _tone: string
          _limit: number
        }
        Returns: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }[]
      }
      get_hanzis_by_vowels: {
        Args: {
          _vowels: string[]
          _limit: number
        }
        Returns: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }[]
      }
      insert_hanzi: {
        Args: {
          _form: string
          _consonant: string
          _vowel: string
          _tone: string
        }
        Returns: number
      }
      insert_sentence: {
        Args: {
          _article_id: number
          _hanzi_ids: number[]
          _offsets: number[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
