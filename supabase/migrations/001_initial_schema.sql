-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  industry VARCHAR,
  timezone VARCHAR DEFAULT 'America/New_York',

  plan_tier VARCHAR NOT NULL CHECK (plan_tier IN ('text', 'voice', 'full')),
  text_enabled BOOLEAN DEFAULT true,
  voice_enabled BOOLEAN DEFAULT true,

  free_edits_remaining INT DEFAULT 50,
  free_regens_remaining INT DEFAULT 10,

  business_hours JSONB,
  after_hours_action VARCHAR DEFAULT 'voicemail',
  transfer_phone VARCHAR,

  missed_call_text_enabled BOOLEAN DEFAULT true,
  missed_call_text_delay_sec INT DEFAULT 120,
  drip_enabled BOOLEAN DEFAULT true,

  onboarding_step INT DEFAULT 1,
  onboarding_completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  clerk_user_id VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  name VARCHAR,

  google_access_token TEXT,
  google_refresh_token TEXT,
  google_token_expires_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,

  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,

  plan_tier VARCHAR NOT NULL CHECK (plan_tier IN ('text', 'voice', 'full')),
  status VARCHAR NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'canceled')),

  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telecom accounts table
CREATE TABLE telecom_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,

  telnyx_connection_id VARCHAR,
  phone_number VARCHAR,
  phone_number_id VARCHAR,

  vapi_assistant_id VARCHAR,
  selected_voice_id VARCHAR DEFAULT 'rachel',

  prepaid_balance DECIMAL(10,2) DEFAULT 0,
  auto_reload_enabled BOOLEAN DEFAULT true,
  auto_reload_threshold DECIMAL(10,2) DEFAULT 5,
  auto_reload_amount DECIMAL(10,2) DEFAULT 25,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  phone VARCHAR NOT NULL,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,

  source VARCHAR DEFAULT 'manual' CHECK (source IN ('manual', 'import', 'inbound_call', 'inbound_text')),
  status VARCHAR DEFAULT 'lead' CHECK (status IN ('lead', 'customer', 'inactive')),

  opted_out BOOLEAN DEFAULT false,
  opted_out_at TIMESTAMPTZ,

  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, phone)
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  channel VARCHAR NOT NULL CHECK (channel IN ('sms', 'voice')),
  status VARCHAR DEFAULT 'active',

  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  direction VARCHAR NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  content TEXT NOT NULL,

  telnyx_message_id VARCHAR,
  status VARCHAR DEFAULT 'sent',
  automation_type VARCHAR,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calls table
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  direction VARCHAR NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status VARCHAR NOT NULL,

  vapi_call_id VARCHAR,

  duration_seconds INT,
  recording_url TEXT,
  transcript TEXT,
  summary TEXT,

  outcome VARCHAR CHECK (outcome IN ('answered', 'voicemail', 'missed', 'transferred', 'booked')),
  transferred_to VARCHAR,

  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scripts table
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  type VARCHAR NOT NULL CHECK (type IN (
    'voice_greeting', 'voice_booking', 'voice_transfer',
    'missed_call_text', 'drip_day_1', 'drip_day_7', 'drip_day_21', 'drip_day_30'
  )),
  content TEXT NOT NULL,
  ai_generated BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, type)
);

-- Knowledge sources table
CREATE TABLE knowledge_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  type VARCHAR NOT NULL CHECK (type IN ('pdf', 'url', 'text')),
  title VARCHAR NOT NULL,

  original_filename VARCHAR,
  original_url VARCHAR,
  storage_path VARCHAR,

  extracted_text TEXT,

  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'failed')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  title VARCHAR NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 30,

  google_event_id VARCHAR,
  status VARCHAR DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'canceled')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage records table
CREATE TABLE usage_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  type VARCHAR NOT NULL CHECK (type IN ('sms_outbound', 'sms_inbound', 'voice_minute', 'phone_number', 'ai_edit', 'ai_regen')),
  quantity INT NOT NULL,
  unit_cost DECIMAL(10,4) NOT NULL,
  total_cost DECIMAL(10,4) NOT NULL,

  reference_type VARCHAR,
  reference_id UUID,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Balance transactions table
CREATE TABLE balance_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  type VARCHAR NOT NULL CHECK (type IN ('credit', 'debit')),
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  description VARCHAR,

  stripe_payment_intent_id VARCHAR,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scheduled jobs table
CREATE TABLE scheduled_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  type VARCHAR NOT NULL CHECK (type IN ('missed_call_text', 'drip_campaign', 'low_balance_alert')),
  scheduled_for TIMESTAMPTZ NOT NULL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),

  bullmq_job_id VARCHAR,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_users_clerk_user_id ON users(clerk_user_id);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_contacts_organization_phone ON contacts(organization_id, phone);
CREATE INDEX idx_contacts_organization_id ON contacts(organization_id);
CREATE INDEX idx_conversations_organization_id ON conversations(organization_id);
CREATE INDEX idx_conversations_contact_id ON conversations(contact_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_organization_id ON messages(organization_id);
CREATE INDEX idx_calls_organization_id ON calls(organization_id);
CREATE INDEX idx_calls_contact_id ON calls(contact_id);
CREATE INDEX idx_scripts_organization_type ON scripts(organization_id, type);
CREATE INDEX idx_knowledge_sources_organization_id ON knowledge_sources(organization_id);
CREATE INDEX idx_appointments_organization_id ON appointments(organization_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_usage_records_organization_id ON usage_records(organization_id);
CREATE INDEX idx_usage_records_created_at ON usage_records(created_at);
CREATE INDEX idx_balance_transactions_organization_id ON balance_transactions(organization_id);
CREATE INDEX idx_scheduled_jobs_organization_id ON scheduled_jobs(organization_id);
CREATE INDEX idx_scheduled_jobs_scheduled_for ON scheduled_jobs(scheduled_for);
CREATE INDEX idx_scheduled_jobs_status ON scheduled_jobs(status);
CREATE INDEX idx_telecom_accounts_phone_number ON telecom_accounts(phone_number);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE telecom_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE balance_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_jobs ENABLE ROW LEVEL SECURITY;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_telecom_accounts_updated_at BEFORE UPDATE ON telecom_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON scripts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
