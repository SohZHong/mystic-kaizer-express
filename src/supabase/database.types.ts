export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      battleLogs: {
        Row: {
          attacker: string | null;
          battle_id: number | null;
          code: string | null;
          created_at: string;
          damage: number | null;
          id: number;
        };
        Insert: {
          attacker?: string | null;
          battle_id?: number | null;
          code?: string | null;
          created_at?: string;
          damage?: number | null;
          id?: number;
        };
        Update: {
          attacker?: string | null;
          battle_id?: number | null;
          code?: string | null;
          created_at?: string;
          damage?: number | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'battleLogs_code_fkey';
            columns: ['code'];
            isOneToOne: false;
            referencedRelation: 'gameLobbies';
            referencedColumns: ['code'];
          },
        ];
      };
      events: {
        Row: {
          address: string;
          created_at: string;
          description: string | null;
          event_id: number | null;
          id: number;
          is_started: boolean;
          location: string | null;
          name: string | null;
          organizer: string | null;
          participant_limit: number | null;
          registered_participants: number | null;
          reward_count: number | null;
          start_date: string | null;
        };
        Insert: {
          address: string;
          created_at?: string;
          description?: string | null;
          event_id?: number | null;
          id?: number;
          is_started?: boolean;
          location?: string | null;
          name?: string | null;
          organizer?: string | null;
          participant_limit?: number | null;
          registered_participants?: number | null;
          reward_count?: number | null;
          start_date?: string | null;
        };
        Update: {
          address?: string;
          created_at?: string;
          description?: string | null;
          event_id?: number | null;
          id?: number;
          is_started?: boolean;
          location?: string | null;
          name?: string | null;
          organizer?: string | null;
          participant_limit?: number | null;
          registered_participants?: number | null;
          reward_count?: number | null;
          start_date?: string | null;
        };
        Relationships: [];
      };
      gameLobbies: {
        Row: {
          battle_id: number | null;
          code: string;
          created_at: string;
          id: number;
          player1_address: string;
          player1_atk_max: number;
          player1_atk_min: number;
          player1_health: number;
          player2_address: string | null;
          player2_atk_max: number | null;
          player2_atk_min: number | null;
          player2_health: number | null;
          status: string;
        };
        Insert: {
          battle_id?: number | null;
          code: string;
          created_at?: string;
          id?: number;
          player1_address: string;
          player1_atk_max: number;
          player1_atk_min: number;
          player1_health: number;
          player2_address?: string | null;
          player2_atk_max?: number | null;
          player2_atk_min?: number | null;
          player2_health?: number | null;
          status?: string;
        };
        Update: {
          battle_id?: number | null;
          code?: string;
          created_at?: string;
          id?: number;
          player1_address?: string;
          player1_atk_max?: number;
          player1_atk_min?: number;
          player1_health?: number;
          player2_address?: string | null;
          player2_atk_max?: number | null;
          player2_atk_min?: number | null;
          player2_health?: number | null;
          status?: string;
        };
        Relationships: [];
      };
      registration_logs: {
        Row: {
          address: string | null;
          created_at: string;
          id: number;
          wallet_address: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          id?: number;
          wallet_address?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          id?: number;
          wallet_address?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_registered_participants: {
        Args: { contract_address: string };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
