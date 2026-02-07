# UNITA Project TODO

## Phase 0 — Documentation & Research (Complete)

### Infrastructure
- [x] Create project email (`unita.protocol@gmail.com`)
- [x] Set up KeePass database
- [x] Create GitHub organization ([unita-protocol](https://github.com/unita-protocol))
- [x] Create GitHub repo ([unita-protocol/unita](https://github.com/unita-protocol/unita))
- [x] Initialize git, configure remote, push initial commit
- [x] LICENSE — AGPL-3.0 (code) + CC-BY-SA 4.0 (docs)
- [x] CONTRIBUTING.md — contribution guidelines
- [x] CODE_OF_CONDUCT.md — Contributor Covenant v2.1

### Documentation
- [x] Constitution (40 articles, 3 parts)
- [x] System Architecture (C4 model, hexagonal design)
- [x] Protocol Stack (Matrix, Semaphore, MACI, Substrate)
- [x] AI Agent Framework (6 agents + tech stack + guardrails)
- [x] Security Framework (threat model + EU AI Act)
- [x] Landscape Analysis (30+ projects)
- [x] Technology Landscape 2026 deep-dive
- [x] AI Governance & Security research
- [x] ADR-001 Protocol Selection + ADR-002 Messaging Layer
- [x] Infrastructure Bootstrap Guide

### Moltbook Community
- [x] Claim agent (UnitaProtocol, verified via Twitter/X)
- [x] Intro post in m/introductions (5 upvotes, 18 comments)
- [x] Feedback request in m/builds (5 upvotes, 19 comments)
- [x] 6 AI agents deep-dive in m/agents (5 upvotes, 14 comments)
- [x] OWASP vs 7-layer defense in m/aisafety (26 comments)
- [x] 5 open problems RFC in m/general (11 comments)
- [x] 16 outbound comments across governance/ZK/AI/security topics
- [x] Follow key contacts: HoverBot, ZorGr0k, Sentinel, ErgoBuilder

---

## Phase 1 — MVP: "Propose → Analyze → Vote → Results" (Active)

### Accounts & Infrastructure
- [x] **Create Vercel account** — signed in with GitHub
- [x] **Create Supabase project** — `unita-mvp`, eu-west-1, PostgreSQL 17.6
- [x] **Database schema deployed** — 5 tables: proposals, ai_analyses, votes, groups, group_members
- [x] **Get Google AI API key** — Gemini 3 Flash free tier (5 RPM, 250 RPD, $0)
  - `GOOGLE_GENERATIVE_AI_API_KEY` in `.env`
  - All 3 agents use `gemini-3-flash-preview` (upgrade to multi-model when budget allows)

### Scaffolding (Done)
- [x] Initialize Turborepo + pnpm monorepo
- [x] Create `apps/web` — Next.js 15 with App Router, Tailwind v4, TypeScript
- [x] Create `packages/db` — Drizzle ORM schema (proposals, votes, groups, ai_analyses)
- [x] Create `packages/zk` — Semaphore v4 identity + group + proof helpers
- [x] Create `packages/ai` — 3 AI agents (Ijtihad, Economist, Guardian) with Vercel AI SDK 6
- [x] Configure `turbo.json` with build/dev/lint pipelines
- [x] Set up `.env.example` with all required keys
- [x] Build passes, dev server runs, proposal creation tested end-to-end

### Core Features (E2E Working)
- [x] **Proposal creation** — form submits title + description, saved to Supabase via API
- [x] **AI deliberation** — 3-agent analysis (Ijtihad, Economist, Guardian) via Gemini 3 Flash
  - Zod schemas for structured output (`generateObject`) — no manual JSON parsing
  - Gemini thinking mode enabled (`thinkingLevel: 'low'`)
  - Structured analysis rendered as readable HTML on proposal detail page
  - Graceful fallback to raw text if schema validation fails
- [x] **Anonymous voting** — vote YES/NO with placeholder ZK proofs, double-vote prevention
  - Unique constraint on `nullifierHash` prevents double-voting
  - YES/NO counts displayed on proposal page
- [x] **Client components** — extracted interactive buttons (`RequestAnalysisButton`, `VoteButtons`)

### Remaining MVP Features (Done)
- [x] **ZK identity** — Semaphore identity generation in browser, group membership
- [x] **Real ZK proofs** — replace placeholder proofs with Semaphore proof generation + verification
  - VotingPanel: 3-step flow (identity check → register → vote with real Semaphore proof)
  - Auto-create voting group when proposal is created (groupId FK)
  - Group join API + members API for Merkle tree construction
  - Dynamic import of ZK library (~15MB WASM on first use)
- [x] **Results dashboard** — visual vote bar, participation stats, Guardian verdict banner
  - Collapsible color-coded AI analysis cards (green/blue/amber per agent)

### Deployment
- [x] Vercel config: outputFileTracingRoot for monorepo, 60s function timeout
- [ ] **Deploy to Vercel** — step-by-step:
  1. Go to https://vercel.com/new
  2. Import `unita-protocol/unita` from GitHub
  3. Set **Root Directory** to `apps/web` (click Edit)
  4. Set **Framework Preset** to `Next.js` (auto-detected)
  5. Set **Build Command** to `cd ../.. && pnpm turbo build --filter=@unita/web`
  6. Set **Node.js Version** to `22.x`
  7. Add env vars (copy from `.env`):
     - `DATABASE_URL` — Supabase pooler connection string
     - `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini API key
     - `SUPABASE_URL` — Supabase project URL
  8. Click **Deploy**
  - Full guide: `docs/infrastructure/BOOTSTRAP_GUIDE.md` Section 3
- [ ] Test E2E on production: create proposal → AI analyzes → generate identity → register → vote with ZK → see results

---

## Deferred — Infrastructure (After MVP Works)

### GCP & Matrix Homeserver
> Details in [`docs/infrastructure/BOOTSTRAP_GUIDE.md`](docs/infrastructure/BOOTSTRAP_GUIDE.md)
- [ ] Create GCP project + e2-micro VM
- [ ] DuckDNS subdomain → `unita-matrix.duckdns.org`
- [ ] Continuwuity Matrix homeserver + Caddy HTTPS
- [ ] Matrix admin account + rooms (#general, #dev, #governance)

### Nostr Identity
- [ ] Generate keypair, set up profile, post announcement

### GitHub & Web
- [ ] Enable GitHub Pages
- [ ] Register domain (when budget allows)

---

## Deferred — Moltbook Engagement (Lower Priority)
- [x] Post in m/aisafety — OWASP Top 10 vs 7-layer defense (26 comments, 4 substantive replied)
- [x] Post in m/general — 5 open problems RFC (11 comments, 3 substantive replied)
- [ ] Post in m/philosophy — liquid democracy vs representative democracy
- [ ] Monitor 5 posts for new comments (diminishing returns — ~12% signal-to-noise)

---

## Research (Ongoing)
- [x] ADR-003 — Distributed AI Deliberation & Resource Allocation (proposed)
- [x] OWASP Agentic AI Top 10 mapping added to Security Framework
- [x] Landscape Analysis updated: Habermas Machine, Deliberation.io, NEAR AI Delegates, Metagov Interop, Allo Protocol, Conviction Voting, Optimism RetroPGF
- [ ] Legal wrappers — "Lex Cryptographia" in Switzerland/EU for binding votes
- [ ] Post-quantum ZK migration path
- [ ] Tokenized time credits design
- [ ] Coercion resistance — MACI + DAVINCI combined analysis
- [ ] eIDAS 2.0 EUDI Wallet integration prototype (deadline: Nov 2026)
- [ ] Token economics specification (credit pricing, treasury funding, AI compute sustainability)
- [ ] ResourceBreakdown schema for proposal synapse (ADR-003)
- [ ] Metagov JSON-LD compatibility assessment

---

---

## Community Feedback Incorporated (Feb 2026 Moltbook Engagement)

Substantive feedback from ~10 unique engagers across 5 posts, incorporated into docs:

| Feedback | From | Incorporated Into |
|----------|------|-------------------|
| Framing Problem / Godel's incompleteness in governance | ZorGr0k | Security Framework §8 (OWASP), ADR-003 |
| Substrate vs Cosmos SDK governance | FiverrClawOfficial | ADR-003 alternatives section |
| Guardian false positive mitigation | FiverrClawOfficial | AI Agent Framework §3.3 (already covered) |
| Red Team incentives: adversarial by reward | WinnieTheGeek | AI Agent Framework §3.6 incentive model |
| Room for "unexplainable" / speculative analysis | Aoi_Hibiki | AI Agent Framework §3.7 (new agent proposed) |
| Rational actor assumption / bias amplification | AleXsoAI | ADR-003 voter-side AI rationale |
| Adversarial framing + latency at scale | BortDev | ADR-003 distributed compute architecture |
| Detect/prevent/recover categorization | BobRenze | Security Framework §8 (OWASP mapping) |
| Conflict resolution protocol suggestion | Longxia_Lobster | Future consideration |
| Ergo eUTXO alternative | ErgoBuilder | Noted; Substrate decision stands (ADR-001) |

*Last updated: 2026-02-07*
