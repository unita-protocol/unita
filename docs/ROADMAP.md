# UNITA Development Roadmap

## Approach: Build ONE Thing That Works

No more phases-before-code. The MVP proves the core loop:

**Create proposal → AI agents analyze → Vote anonymously with ZK → See results**

If this doesn't work, nothing else matters. If it does, everything else builds on top.

---

## Validated Tech Stack (Feb 2026)

| Category | Package | Version | Why |
|----------|---------|---------|-----|
| Framework | `next` | 15.5.12 | App Router, React 19, SSR (v16 has Turbopack monorepo bug) |
| UI | `tailwindcss` | 4.1.18 | Oxide engine (Rust), 5x faster builds |
| AI SDK | `ai` (Vercel AI SDK) | 6.0.77 | Agent abstraction, streaming, MCP client |
| AI - Gemini | `@ai-sdk/google` | 3.0.22 | Gemini 3 Flash — free tier (5 RPM, 250 RPD) |
| ZK Identity | `@semaphore-protocol/core` | 4.14.2 | Anonymous proofs, browser-native |
| ORM | `drizzle-orm` | 0.45.1 | ~7.4kb, SQL-close, serverless |
| DB Toolkit | `drizzle-kit` | 0.31.8 | Migrations, schema push |
| DB Driver | `postgres` | 3.4.8 | Zero-dep Postgres client |
| Database | Supabase Free | — | 500MB Postgres, auth, real-time |
| Monorepo | `turbo` | 2.8.3 | Intelligent caching, pnpm workspaces |
| TypeScript | `typescript` | 5.9.3 | Strict mode |
| Hosting | Vercel Free | — | Serverless, edge functions |

**Total cost: $0/month** (Gemini 3 Flash free tier: 5 RPM, 250 RPD)

---

## Monorepo Structure

```
unita/
├── apps/
│   └── web/                    # Next.js 15 app (App Router)
│       ├── app/
│       │   ├── page.tsx        # Landing page
│       │   ├── proposals/      # Create and view proposals
│       │   ├── vote/           # ZK anonymous voting
│       │   ├── results/        # Vote results + AI analysis
│       │   └── api/            # Route handlers (AI agents, voting)
│       └── components/         # React UI components
├── packages/
│   ├── db/                     # Drizzle schema + migrations
│   │   ├── schema.ts           # proposals, votes, users tables
│   │   └── drizzle.config.ts
│   ├── zk/                     # Semaphore v4 helpers
│   │   ├── identity.ts         # Create/store ZK identity
│   │   ├── group.ts            # Group membership management
│   │   └── proof.ts            # Generate/verify proofs
│   └── ai/                     # AI deliberation (Gemini 3 Flash)
│       ├── agents.ts           # 3 agents with Zod structured output
│       ├── prompts.ts          # System prompts for each agent
│       └── index.ts            # Package exports
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## The MVP Flow (Implemented)

### 1. Create Proposal
User submits title + description via `/proposals/new`. Saved to Supabase via Drizzle. A Semaphore voting group is auto-created. AI analysis (3 agents) starts automatically in the background.

### 2. AI Deliberation (3 Agents)
Each proposal is analyzed by three AI agents running in parallel (~12.5s total):

**Ijtihad Agent** (Deliberation) — green card:
> Steel-man FOR and AGAINST. Identify 3 unintended consequences. List who benefits and who pays. Rate logical consistency 1-10.

**Economist Agent** (Sustainability) — blue card:
> Calculate resource intensity. Suggest 3 budget trade-offs. Expose hidden costs of "free" promises.

**Guardian Agent** (Constitutional) — amber card:
> Check against UNITA Constitution Articles 1-40. Rate: PASS / CONDITIONAL / REJECT. Suggest amendments if needed.

All three agents run independently on Gemini 3 Flash (free tier). Results are shown as collapsible, color-coded cards. The Guardian verdict (PASS/CONDITIONAL/REJECT) is highlighted as a banner at the top.

### 3. Anonymous Voting (Real ZK Proofs)
Three-step flow on the proposal detail page:
1. **Generate identity** — User creates Semaphore identity at `/identity` (EdDSA keypair, stored in browser localStorage)
2. **Register to vote** — Registers identity commitment with the proposal's voting group via `/api/groups/join`
3. **Cast vote** — Generates real Semaphore ZK proof (~10-30s, ~15MB SNARK artifacts on first use), sends proof to `/api/vote` for server-side verification

The ZK proof guarantees: "I am a registered member AND I vote YES/NO" — without revealing which member. The nullifier prevents double-voting on the same proposal.

### 4. Results Dashboard
- Visual green/red vote bar with YES/NO percentages
- Participation stats: "X of Y registered voters have voted (Z%)"
- Guardian verdict banner (PASS/CONDITIONAL/REJECT)
- Vote counts + mini vote bars on the proposals list page
- Home page shows live stats (open proposals, votes cast, registered voters)

### 5. Proposal Lifecycle
- **Open** → accepting registrations and votes
- **Closed** → no more votes (via "Close Voting" button)
- Filter proposals by status: All / Open / Closed

---

## AI System Prompts

### The "Ijtihad" Deliberation Prompt
> "You are a UNITA Deliberation Agent. Your role is to ensure voters make informed decisions. For the attached proposal:
> 1. **Steel-Man** the strongest argument FOR this proposal.
> 2. **Steel-Man** the strongest argument AGAINST this proposal.
> 3. Identify **3 unintended consequences** that neither side has considered.
> 4. List **who benefits financially** and **who bears the cost**.
> 5. Rate the **logical consistency** of the proposal (1-10) and explain any fallacies.
> You must be culturally neutral. Do not favor Western, Eastern, or any regional perspective."

### The "Sustainability" Prompt (Equilibrium Module)
> "You are the UNITA Chief Economist. Analyze the attached proposal.
> 1. Calculate the Resource Intensity (High/Med/Low) for Capital and Labor.
> 2. Suggest three specific areas where the budget could be cut to fund this.
> 3. If the proposal claims to provide 'free' services, explain the hidden cost (e.g., debt, inflation, or resource depletion) in 2 sentences."

### The "Constitutional Guardian" Prompt
> "You are the UNITA Constitutional Guardian. Review the attached proposal against the UNITA Constitution.
> 1. Does this proposal violate any Fundamental Rights (Articles 1-30)?
> 2. Does it conflict with any Governance Principles (Articles 31-50)?
> 3. If violations are found, suggest amendments that would make it constitutional.
> 4. Rate constitutional compliance: PASS / CONDITIONAL / REJECT."

---

## Deployment

**Hosting**: Vercel Free tier (auto-deploys from GitHub `main` branch)
**Database**: Supabase Free tier (500MB Postgres, eu-west-1)
**AI**: Gemini 3 Flash free tier (5 RPM, 250 RPD, $0/month)

Deploy instructions: See `docs/infrastructure/BOOTSTRAP_GUIDE.md` Section 3.

Quick summary:
1. Go to https://vercel.com/new
2. Import `unita-protocol/unita` from GitHub
3. Set Root Directory to `apps/web`
4. Set Build Command to `cd ../.. && pnpm turbo build --filter=@unita/web`
5. Add env vars: `DATABASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY`, `SUPABASE_URL`
6. Deploy

---

## After MVP: What Comes Next

Once the core loop works, we layer on:

1. **Matrix integration** — federated governance rooms, real-time deliberation
2. **MACI anti-collusion** — encrypted ballots, bribery resistance (wait for MACI v3)
3. **National ID bridges** — eIDAS 2.0 EUDI Wallet, AnonAadhaar
4. **Liquid delegation** — delegate your vote to experts per topic
5. **Budget Balancer** — resource equilibrium UI
6. **Substrate chain** — on-chain voting finality for production
7. **NeMo Guardrails** — AI safety enforcement layer

---

## Design Concepts (Preserved from Research)

### Hacendera (Communal Labor)
In Spanish tradition, voting often led to a *Hacendera* — a day where the village worked together on the project they voted for. UNITA's "Crowd-Action" module lets users commit time or resources if a proposal passes.

### Quadratic Funding & Plural Voting
For global topics, [Quadratic Voting](https://www.radicalxchange.org/concepts/plural-voting/) ensures a small passionate group has as much "voice" as a large indifferent one. Voice credits prevent plutocracy while rewarding conviction.

### Decency Reputation (Areté)
Instead of "Karma" or "Likes," users earn Areté as Soulbound Tokens by:
- Providing high-quality sources
- Admitting you were wrong in a debate
- Delegating to an expert because you weren't informed
- Participating in Hacendera community work

### The Global Wallet
- **Quadratic Funding for Global Tasks** — "Global GDP Fund" matches individual votes exponentially
- **The "Work-Vote" Link** — "Man-power" hours verified on-chain via ZK proofs

---

## Research Gaps (Ongoing)

1. **Coercion Resistance** — MACI + Vocdoni DAVINCI combined anti-collusion and proof-aggregation
2. **Global Translation** — P2P nodes + LLMs for real-time translation into 20 most spoken languages
3. **Legal Wrappers** — "Lex Cryptographia" in Switzerland/EU for legally binding UNITA votes
4. **AI Safety** — Adversarial attacks on deliberation agents: prompt injection, model manipulation
5. **Quantum Resistance** — Migration path to post-quantum ZK proofs
