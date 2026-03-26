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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          availability: string | null
          avatar: string | null
          avatar_color: string | null
          avatar_img: string | null
          bio: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          role: string | null
          status: string | null
          whatsapp: string | null
          zoom: string | null
        }
        Insert: {
          availability?: string | null
          avatar?: string | null
          avatar_color?: string | null
          avatar_img?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          status?: string | null
          whatsapp?: string | null
          zoom?: string | null
        }
        Update: {
          availability?: string | null
          avatar?: string | null
          avatar_color?: string | null
          avatar_img?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          status?: string | null
          whatsapp?: string | null
          zoom?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string | null
          city: string | null
          color: string | null
          created_at: string
          customer: string
          email: string | null
          id: string
          notes: string | null
          order_number: number
          payment_method: string | null
          phone: string | null
          product_id: string | null
          products_text: string | null
          qty: number | null
          size: string | null
          status: string | null
          total: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          color?: string | null
          created_at?: string
          customer?: string
          email?: string | null
          id?: string
          notes?: string | null
          order_number?: number
          payment_method?: string | null
          phone?: string | null
          product_id?: string | null
          products_text?: string | null
          qty?: number | null
          size?: string | null
          status?: string | null
          total?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          color?: string | null
          created_at?: string
          customer?: string
          email?: string | null
          id?: string
          notes?: string | null
          order_number?: number
          payment_method?: string | null
          phone?: string | null
          product_id?: string | null
          products_text?: string | null
          qty?: number | null
          size?: string | null
          status?: string | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          agent_id: number | null
          brand: string | null
          category: string | null
          checkout_method: string | null
          colors: string | null
          content_sections: Json | null
          created_at: string
          delivery_info: string | null
          description: string | null
          featured: boolean | null
          form_config: Json | null
          gateway_config: Json | null
          icon: string | null
          id: string
          images: Json | null
          installment: string | null
          media_fit: string | null
          media_height_desktop: number | null
          media_height_mobile: number | null
          name: string
          page_color: string | null
          payment_route: string | null
          price: number
          return_days: string | null
          return_policy: string | null
          shipping_notes: string | null
          sizes: string | null
          status: string | null
          stock: number | null
          ty_config: Json | null
          updated_at: string
          video_data: Json | null
          video_url: string | null
          warranty: string | null
          was_price: number | null
        }
        Insert: {
          agent_id?: number | null
          brand?: string | null
          category?: string | null
          checkout_method?: string | null
          colors?: string | null
          content_sections?: Json | null
          created_at?: string
          delivery_info?: string | null
          description?: string | null
          featured?: boolean | null
          form_config?: Json | null
          gateway_config?: Json | null
          icon?: string | null
          id?: string
          images?: Json | null
          installment?: string | null
          media_fit?: string | null
          media_height_desktop?: number | null
          media_height_mobile?: number | null
          name: string
          page_color?: string | null
          payment_route?: string | null
          price?: number
          return_days?: string | null
          return_policy?: string | null
          shipping_notes?: string | null
          sizes?: string | null
          status?: string | null
          stock?: number | null
          ty_config?: Json | null
          updated_at?: string
          video_data?: Json | null
          video_url?: string | null
          warranty?: string | null
          was_price?: number | null
        }
        Update: {
          agent_id?: number | null
          brand?: string | null
          category?: string | null
          checkout_method?: string | null
          colors?: string | null
          content_sections?: Json | null
          created_at?: string
          delivery_info?: string | null
          description?: string | null
          featured?: boolean | null
          form_config?: Json | null
          gateway_config?: Json | null
          icon?: string | null
          id?: string
          images?: Json | null
          installment?: string | null
          media_fit?: string | null
          media_height_desktop?: number | null
          media_height_mobile?: number | null
          name?: string
          page_color?: string | null
          payment_route?: string | null
          price?: number
          return_days?: string | null
          return_policy?: string | null
          shipping_notes?: string | null
          sizes?: string | null
          status?: string | null
          stock?: number | null
          ty_config?: Json | null
          updated_at?: string
          video_data?: Json | null
          video_url?: string | null
          warranty?: string | null
          was_price?: number | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          product_id: string | null
          rating: number
          review_text: string
          reviewer_name: string
          verified: boolean | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          product_id?: string | null
          rating?: number
          review_text?: string
          reviewer_name?: string
          verified?: boolean | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          product_id?: string | null
          rating?: number
          review_text?: string
          reviewer_name?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
