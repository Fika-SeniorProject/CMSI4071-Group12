export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      coffee_shops: {
        Row: {
          busyness: Database["public"]["Enums"]["Busyness"] | null
          city: Database["public"]["Enums"]["Cities"] | null
          has_outlets: boolean | null
          has_wifi: boolean | null
          id: number
          is_featured: boolean | null
          is_laptop_friendly: boolean | null
          name: string | null
          parking: Database["public"]["Enums"]["Parking Difficulty"] | null
          pricing: Database["public"]["Enums"]["Pricing"] | null
          seating: Database["public"]["Enums"]["Seating Availability"] | null
          summary: string | null
          vibe: Database["public"]["Enums"]["Vibe"] | null
          wine_bar: boolean | null
        }
        Insert: {
          busyness?: Database["public"]["Enums"]["Busyness"] | null
          city?: Database["public"]["Enums"]["Cities"] | null
          has_outlets?: boolean | null
          has_wifi?: boolean | null
          id?: number
          is_featured?: boolean | null
          is_laptop_friendly?: boolean | null
          name?: string | null
          parking?: Database["public"]["Enums"]["Parking Difficulty"] | null
          pricing?: Database["public"]["Enums"]["Pricing"] | null
          seating?: Database["public"]["Enums"]["Seating Availability"] | null
          summary?: string | null
          vibe?: Database["public"]["Enums"]["Vibe"] | null
          wine_bar?: boolean | null
        }
        Update: {
          busyness?: Database["public"]["Enums"]["Busyness"] | null
          city?: Database["public"]["Enums"]["Cities"] | null
          has_outlets?: boolean | null
          has_wifi?: boolean | null
          id?: number
          is_featured?: boolean | null
          is_laptop_friendly?: boolean | null
          name?: string | null
          parking?: Database["public"]["Enums"]["Parking Difficulty"] | null
          pricing?: Database["public"]["Enums"]["Pricing"] | null
          seating?: Database["public"]["Enums"]["Seating Availability"] | null
          summary?: string | null
          vibe?: Database["public"]["Enums"]["Vibe"] | null
          wine_bar?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string | null
          drinks_quality: number | null
          id: number
          shop_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          drinks_quality?: number | null
          id?: number
          shop_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          drinks_quality?: number | null
          id?: number
          shop_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "coffee_shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_photos: {
        Row: {
          id: number
          photo_url: string
          shop_id: number
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          id?: number
          photo_url: string
          shop_id: number
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          id?: number
          photo_url?: string
          shop_id?: number
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_photos_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "coffee_shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_photos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Busyness: "Quiet" | "Medium" | "Very"
      Cities:
        | "Los Angeles"
        | "Newport Beach"
        | "Costa Mesa"
        | "London"
        | "San Francisco"
      "Parking Difficulty": "Easy" | "Medium" | "Hard"
      Pricing: "$" | "$$" | "$$$"
      "Seating Availability": "None" | "Some" | "Plenty"
      Vibe: "Minimalistic" | "Cool" | "Corporate" | "Cozy" | "Beachy" | "Trendy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Busyness: ["Quiet", "Medium", "Very"],
      Cities: [
        "Los Angeles",
        "Newport Beach",
        "Costa Mesa",
        "London",
        "San Francisco",
      ],
      "Parking Difficulty": ["Easy", "Medium", "Hard"],
      Pricing: ["$", "$$", "$$$"],
      "Seating Availability": ["None", "Some", "Plenty"],
      Vibe: ["Minimalistic", "Cool", "Corporate", "Cozy", "Beachy", "Trendy"],
    },
  },
} as const
