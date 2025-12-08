# CLAUDE.md - AI Receptionist SaaS Project Reference

This file is my reference throughout development. It contains key decisions, current status, and things to remember.

## Project Overview

**Product**: AI Receptionist & AI Follow-Up SaaS
**Goal**: Ultra-simple AI employee that handles calls, texts, follow-ups, and booking
**Philosophy**: Setup in < 3 minutes, no CRM complexity, Apple-like UX

## Current Status

### Milestone 1: Foundation (COMPLETED)
- [x] Initialize Next.js 14 + TypeScript
- [x] Setup Tailwind + shadcn/ui
- [x] Configure Supabase + create database schema
- [x] Setup Clerk with Google OAuth
- [x] Create 4-tab dashboard layout shell
- [x] Build landing page with pricing
- [x] Add terms + privacy pages
- [x] Initialize git repo

### Milestone 2: Billing System (NEXT)
- [ ] Create Stripe products (3 tiers)
- [ ] Implement checkout with 7-day trial
- [ ] Build subscription management (change, cancel)
- [ ] Implement prepaid balance system
- [ ] Add auto-reload functionality
- [ ] Build usage tracking
- [ ] Setup Stripe webhooks
- [ ] Build Account page UI

### Upcoming Milestones
- Milestone 3: Telecom Integration
- Milestone 4: AI & Knowledge
- Milestone 5: Automations
- Milestone 6: Onboarding
- Milestone 7: Dashboard
- Milestone 8: Polish & Launch

## Key Technical Decisions

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase PostgreSQL
- **Auth**: Clerk with Google OAuth
- **UI**: shadcn/ui + Tailwind + Framer Motion
- **Payments**: Stripe
- **Telecom**: Telnyx (NOT Twilio - 50% cheaper)
- **Voice AI**: Vapi (NOT Retell - cheaper at $0.05/min)
- **Jobs**: BullMQ + Upstash Redis
- **AI**: OpenAI GPT-4o-mini for chat editing
- **Email**: Resend
- **Calendar**: Google Calendar API
- **Deploy**: Vercel

### Pricing Tiers
- Text AI: $50/mo
- Voice AI: $75/mo
- Full AI Employee: $100/mo

### Billing Architecture (3 Streams)
1. Platform subscription (Stripe) - $50/$75/$100
2. Telecom usage (prepaid balance) - pay as you go
3. AI usage (after free tier) - 50 edits + 10 regens free

### Dashboard Structure (4 Tabs Only)
1. Home - Stats + activity feed
2. Inbox - Conversations (calls + texts)
3. Edit AI - Scripts, knowledge, contacts, voice
4. Account - Plan, balance, settings

### Onboarding (Required vs Skippable)
Required: Sign up, business info, plan, phone, payment, go live
Skippable: Teach AI, pick voice, import contacts

## Important Patterns

### Feature Gating
- Text AI users: See text features only, voice shows "Upgrade"
- Voice AI users: See voice features only, text shows "Upgrade"
- Full users: See everything

### SMS Compliance
- MUST handle "STOP" → immediately opt out contact
- Required by TCPA law

### Balance at $0
- Pause automations (don't send texts/calls)
- But still allow inbound calls
- Show banner + send email

### Free Tier Tracking
```
organizations.free_edits_remaining (default 50)
organizations.free_regens_remaining (default 10)
```

## Files Created

### Milestone 1
- `/CLAUDE.md` - This file
- `/PLAN.md` - Complete implementation plan

## Git Commits

After each milestone, commit with format:
`feat: [milestone] - [brief description]`

Example: `feat: foundation - auth, database, dashboard shell, landing page`

## Environment Variables Needed

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Telnyx
TELNYX_API_KEY=
TELNYX_PUBLIC_KEY=
TELNYX_WEBHOOK_SECRET=

# Vapi
VAPI_API_KEY=
VAPI_WEBHOOK_SECRET=

# OpenAI
OPENAI_API_KEY=

# Resend
RESEND_API_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Notes & Reminders

- Costs are $0/month until ~100 customers (all free tiers)
- 7-day free trial with card required
- Always filter queries by organization_id (multi-tenant)
- Verify all webhook signatures
- Use Zod for input validation
- Stream AI responses for better UX
