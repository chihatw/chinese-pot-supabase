export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
            referencedRelation: "hanzis"
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
      [_ in never]: never
    }
    Functions: {
      delete_articles_by_ids: {
        Args: {
          _ids: number[]
        }
        Returns: boolean
      }
      delete_sentences_by_ids: {
        Args: {
          _ids: number[]
        }
        Returns: boolean
      }
      get_articles_by_ids: {
        Args: {
          _ids: number[]
        }
        Returns: {
          created_at: string
          date: string
          id: number
          title: string
        }[]
      }
      get_hanzis_by_forms: {
        Args: {
          _forms: string[]
        }
        Returns: {
          hanzi_id: number
          count: number
          form: string
          consonant: string
          vowel: string
          tone: string
          sentence_id: number
          text: string
          pinyin: string
        }[]
      }
      get_recent_articles: {
        Args: {
          _limit: number
        }
        Returns: {
          created_at: string
          date: string
          id: number
          title: string
        }[]
      }
      get_sentences_of_atricle: {
        Args: {
          _article_id: number
        }
        Returns: {
          sentence_id: number
          text: string
          pinyin: string
        }[]
      }
      insert_article: {
        Args: {
          _title: string
          _date: string
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
      update_article: {
        Args: {
          _id: number
          _title: string
          _date: string
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
