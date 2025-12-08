export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PlanTier = 'text' | 'voice' | 'full'
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled'
export type Channel = 'sms' | 'voice'
export type Direction = 'inbound' | 'outbound'
export type ContactSource = 'manual' | 'import' | 'inbound_call' | 'inbound_text'
export type ContactStatus = 'lead' | 'customer' | 'inactive'
export type CallOutcome = 'answered' | 'voicemail' | 'missed' | 'transferred' | 'booked'
export type ScriptType = 'voice_greeting' | 'voice_booking' | 'voice_transfer' | 'missed_call_text' | 'drip_day_1' | 'drip_day_7' | 'drip_day_21' | 'drip_day_30'
export type KnowledgeSourceType = 'pdf' | 'url' | 'text'
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'canceled'
export type UsageType = 'sms_outbound' | 'sms_inbound' | 'voice_minute' | 'phone_number' | 'ai_edit' | 'ai_regen'
export type BalanceTransactionType = 'credit' | 'debit'
export type JobType = 'missed_call_text' | 'drip_campaign' | 'low_balance_alert'
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          industry: string | null
          timezone: string
          plan_tier: PlanTier
          text_enabled: boolean
          voice_enabled: boolean
          free_edits_remaining: number
          free_regens_remaining: number
          business_hours: Json | null
          after_hours_action: string
          transfer_phone: string | null
          missed_call_text_enabled: boolean
          missed_call_text_delay_sec: number
          drip_enabled: boolean
          onboarding_step: number
          onboarding_completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          timezone?: string
          plan_tier: PlanTier
          text_enabled?: boolean
          voice_enabled?: boolean
          free_edits_remaining?: number
          free_regens_remaining?: number
          business_hours?: Json | null
          after_hours_action?: string
          transfer_phone?: string | null
          missed_call_text_enabled?: boolean
          missed_call_text_delay_sec?: number
          drip_enabled?: boolean
          onboarding_step?: number
          onboarding_completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          timezone?: string
          plan_tier?: PlanTier
          text_enabled?: boolean
          voice_enabled?: boolean
          free_edits_remaining?: number
          free_regens_remaining?: number
          business_hours?: Json | null
          after_hours_action?: string
          transfer_phone?: string | null
          missed_call_text_enabled?: boolean
          missed_call_text_delay_sec?: number
          drip_enabled?: boolean
          onboarding_step?: number
          onboarding_completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          organization_id: string | null
          clerk_user_id: string
          email: string
          name: string | null
          google_access_token: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          clerk_user_id: string
          email: string
          name?: string | null
          google_access_token?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          clerk_user_id?: string
          email?: string
          name?: string | null
          google_access_token?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          organization_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan_tier: PlanTier
          status: SubscriptionStatus
          trial_ends_at: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_tier: PlanTier
          status: SubscriptionStatus
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_tier?: PlanTier
          status?: SubscriptionStatus
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      telecom_accounts: {
        Row: {
          id: string
          organization_id: string
          telnyx_connection_id: string | null
          phone_number: string | null
          phone_number_id: string | null
          vapi_assistant_id: string | null
          selected_voice_id: string
          prepaid_balance: number
          auto_reload_enabled: boolean
          auto_reload_threshold: number
          auto_reload_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          telnyx_connection_id?: string | null
          phone_number?: string | null
          phone_number_id?: string | null
          vapi_assistant_id?: string | null
          selected_voice_id?: string
          prepaid_balance?: number
          auto_reload_enabled?: boolean
          auto_reload_threshold?: number
          auto_reload_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          telnyx_connection_id?: string | null
          phone_number?: string | null
          phone_number_id?: string | null
          vapi_assistant_id?: string | null
          selected_voice_id?: string
          prepaid_balance?: number
          auto_reload_enabled?: boolean
          auto_reload_threshold?: number
          auto_reload_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          organization_id: string
          phone: string
          email: string | null
          first_name: string | null
          last_name: string | null
          source: ContactSource
          status: ContactStatus
          opted_out: boolean
          opted_out_at: string | null
          last_contacted_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          phone: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          source?: ContactSource
          status?: ContactStatus
          opted_out?: boolean
          opted_out_at?: string | null
          last_contacted_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          phone?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          source?: ContactSource
          status?: ContactStatus
          opted_out?: boolean
          opted_out_at?: string | null
          last_contacted_at?: string | null
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          organization_id: string
          contact_id: string
          channel: Channel
          status: string
          last_activity_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          contact_id: string
          channel: Channel
          status?: string
          last_activity_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          contact_id?: string
          channel?: Channel
          status?: string
          last_activity_at?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          organization_id: string
          direction: Direction
          content: string
          telnyx_message_id: string | null
          status: string
          automation_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          organization_id: string
          direction: Direction
          content: string
          telnyx_message_id?: string | null
          status?: string
          automation_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          organization_id?: string
          direction?: Direction
          content?: string
          telnyx_message_id?: string | null
          status?: string
          automation_type?: string | null
          created_at?: string
        }
      }
      calls: {
        Row: {
          id: string
          conversation_id: string | null
          organization_id: string
          contact_id: string
          direction: Direction
          status: string
          vapi_call_id: string | null
          duration_seconds: number | null
          recording_url: string | null
          transcript: string | null
          summary: string | null
          outcome: CallOutcome | null
          transferred_to: string | null
          started_at: string | null
          ended_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id?: string | null
          organization_id: string
          contact_id: string
          direction: Direction
          status: string
          vapi_call_id?: string | null
          duration_seconds?: number | null
          recording_url?: string | null
          transcript?: string | null
          summary?: string | null
          outcome?: CallOutcome | null
          transferred_to?: string | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string | null
          organization_id?: string
          contact_id?: string
          direction?: Direction
          status?: string
          vapi_call_id?: string | null
          duration_seconds?: number | null
          recording_url?: string | null
          transcript?: string | null
          summary?: string | null
          outcome?: CallOutcome | null
          transferred_to?: string | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string
        }
      }
      scripts: {
        Row: {
          id: string
          organization_id: string
          type: ScriptType
          content: string
          ai_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          type: ScriptType
          content: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          type?: ScriptType
          content?: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      knowledge_sources: {
        Row: {
          id: string
          organization_id: string
          type: KnowledgeSourceType
          title: string
          original_filename: string | null
          original_url: string | null
          storage_path: string | null
          extracted_text: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          type: KnowledgeSourceType
          title: string
          original_filename?: string | null
          original_url?: string | null
          storage_path?: string | null
          extracted_text?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          type?: KnowledgeSourceType
          title?: string
          original_filename?: string | null
          original_url?: string | null
          storage_path?: string | null
          extracted_text?: string | null
          status?: string
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          organization_id: string
          contact_id: string
          title: string
          scheduled_at: string
          duration_minutes: number
          google_event_id: string | null
          status: AppointmentStatus
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          contact_id: string
          title: string
          scheduled_at: string
          duration_minutes?: number
          google_event_id?: string | null
          status?: AppointmentStatus
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          contact_id?: string
          title?: string
          scheduled_at?: string
          duration_minutes?: number
          google_event_id?: string | null
          status?: AppointmentStatus
          created_at?: string
        }
      }
      usage_records: {
        Row: {
          id: string
          organization_id: string
          type: UsageType
          quantity: number
          unit_cost: number
          total_cost: number
          reference_type: string | null
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          type: UsageType
          quantity: number
          unit_cost: number
          total_cost: number
          reference_type?: string | null
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          type?: UsageType
          quantity?: number
          unit_cost?: number
          total_cost?: number
          reference_type?: string | null
          reference_id?: string | null
          created_at?: string
        }
      }
      balance_transactions: {
        Row: {
          id: string
          organization_id: string
          type: BalanceTransactionType
          amount: number
          balance_after: number
          description: string | null
          stripe_payment_intent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          type: BalanceTransactionType
          amount: number
          balance_after: number
          description?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          type?: BalanceTransactionType
          amount?: number
          balance_after?: number
          description?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
      }
      scheduled_jobs: {
        Row: {
          id: string
          organization_id: string
          contact_id: string | null
          type: JobType
          scheduled_for: string
          status: JobStatus
          bullmq_job_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          contact_id?: string | null
          type: JobType
          scheduled_for: string
          status?: JobStatus
          bullmq_job_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          contact_id?: string | null
          type?: JobType
          scheduled_for?: string
          status?: JobStatus
          bullmq_job_id?: string | null
          created_at?: string
        }
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
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenient type aliases
export type Organization = Tables<'organizations'>
export type User = Tables<'users'>
export type Subscription = Tables<'subscriptions'>
export type TelecomAccount = Tables<'telecom_accounts'>
export type Contact = Tables<'contacts'>
export type Conversation = Tables<'conversations'>
export type Message = Tables<'messages'>
export type Call = Tables<'calls'>
export type Script = Tables<'scripts'>
export type KnowledgeSource = Tables<'knowledge_sources'>
export type Appointment = Tables<'appointments'>
export type UsageRecord = Tables<'usage_records'>
export type BalanceTransaction = Tables<'balance_transactions'>
export type ScheduledJob = Tables<'scheduled_jobs'>
