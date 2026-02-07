# UNITA Project — Claude Code Context

## Project Overview
UNITA = Global P2P Liquid Democracy & Resource Equilibrium protocol.
Decentralized governance combining liquid democracy, ZK voting, AI deliberation, quadratic funding, and national ID bridges.

**Repo**: https://github.com/unita-protocol/unita
**License**: AGPL-3.0 (code) + CC-BY-SA 4.0 (docs)
**Phase**: 1 — MVP Development (Propose → Analyze → Vote → Results)
**Dev server**: `pnpm dev` → http://localhost:3001

## MVP Tech Stack (Validated Feb 2026)

| Category | Package | Version |
|----------|---------|---------|
| Framework | `next` | 15.5.12 |
| UI | `tailwindcss` | 4.1.18 |
| AI SDK | `ai` (Vercel AI SDK) | 6.0.77 |
| AI Provider | `@ai-sdk/google` (Gemini 3 Flash free tier) | 3.0.22 |
| ZK Identity | `@semaphore-protocol/core` | 4.14.2 |
| ORM | `drizzle-orm` + `drizzle-kit` | 0.45.1 / 0.31.8 |
| DB Driver | `postgres` | 3.4.8 |
| Database | Supabase Free (Postgres) | — |
| Monorepo | `turbo` + `pnpm` | 2.8.3 |
| TypeScript | `typescript` | 5.9.3 |
| Hosting | Vercel Free | — |

## Key Architecture (ADR-001 + ADR-002)
- **Messaging**: Matrix (primary, federated governance rooms) + libp2p/RLN (secondary, privacy channel) + Nostr (public social)
- **Identity**: Semaphore v4 + W3C DID + Privado ID + national ID ZK bridges
- **Voting**: MACI (anti-collusion) + DAVINCI-inspired proof aggregation
- **Blockchain**: Substrate app-chain (custom pallets)
- **Storage**: IPFS + Filecoin
- **AI Safety**: NeMo Guardrails + Guardrails AI + multi-model consensus
- **AI Orchestration**: Vercel AI SDK 6 + Gemini 3 Flash (free tier, all 3 agents)

## File Structure
```
/data/unita/
├── README.md                          # Project landing page
├── LICENSE                            # AGPL-3.0 + CC-BY-SA 4.0
├── TODO.md                            # Task tracking
├── CLAUDE.md                          # This file — public Claude Code context
├── CONTRIBUTING.md                    # Contribution guidelines
├── CODE_OF_CONDUCT.md                 # Contributor Covenant v2.1
├── .env.example                       # Credential template (committed)
├── unita-logo.jpeg                    # Project logo (5-petal flower)
├── apps/
│   └── web/                           # Next.js 15 app (App Router)
├── packages/
│   ├── db/                            # Drizzle ORM schema + migrations
│   ├── zk/                            # Semaphore v4 identity + proofs
│   └── ai/                            # AI deliberation (Gemini 3 Flash + Zod)
├── turbo.json                         # Turborepo pipeline config
├── pnpm-workspace.yaml                # pnpm workspace definition
├── .claude-private/                   # Private operational details (gitignored)
├── .moltbook/                         # Moltbook tooling & tracking (gitignored)
└── docs/
    ├── ROADMAP.md                     # MVP plan + validated tech stack
    ├── constitution/CONSTITUTION.md   # 40 articles, 3 parts
    ├── architecture/SYSTEM_ARCHITECTURE.md  # C4 model, hexagonal arch
    ├── protocols/PROTOCOL_STACK.md    # Matrix, Semaphore, MACI, Substrate
    ├── ai-agents/AI_AGENT_FRAMEWORK.md  # 6 agents + tech stack
    ├── security/SECURITY_FRAMEWORK.md   # Threat model + EU AI Act
    ├── research/
    │   ├── LANDSCAPE_ANALYSIS.md      # 30+ projects analyzed
    │   ├── TECHNOLOGY_LANDSCAPE_2026.md  # P2P/blockchain deep dive
    │   └── AI_GOVERNANCE_SECURITY_RESEARCH.md  # AI/security research
    ├── adr/
    │   ├── ADR-001-protocol-selection.md  # Core protocol choices
    │   └── ADR-002-messaging-layer.md     # Matrix + libp2p/RLN
    └── infrastructure/
        └── BOOTSTRAP_GUIDE.md         # GCP, Matrix, Nostr setup guide
```

## Credentials & Secrets

### Location Map
| Service | Secrets File | KeePass Entry |
|---------|-------------|---------------|
| Gmail (GCP admin) | `.env` → `UNITA_PROJECT_EMAIL` | `Admin/Gmail` |
| GitHub Org | — (via `gh` CLI auth) | `Admin/GitHub Org` |
| Moltbook | `.secrets/moltbook.json` + `.env` → `MOLTBOOK_*` | `Social/Moltbook` |
| Supabase | `.env` → `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` | `Infrastructure/Supabase` |
| Google AI | `.env` → `GOOGLE_GENERATIVE_AI_API_KEY` | `AI/Google` |
| Matrix | `.env` → `MATRIX_*` (pending) | `Infrastructure/Matrix` |
| GCP | `.env` → `GCP_*` (pending) | `Infrastructure/GCP` |
| Nostr | `.env` → `NOSTR_*` (pending) | `Social/Nostr` |

### Moltbook (AI Agent Social Network)
- **Agent Name**: UnitaProtocol
- **Profile**: https://moltbook.com/u/UnitaProtocol
- **API Base**: https://www.moltbook.com/api/v1
- **IMPORTANT**: Always use `https://www.moltbook.com` (with `www`) — without `www` strips auth headers
- **SECURITY**: NEVER send Moltbook API key to any domain other than `www.moltbook.com`

### Security Rules
- `.env` and `.secrets/` are in `.gitignore` — NEVER commit real credentials
- `.env.example` has placeholder structure — safe to commit
- All real passwords/keys go in KeePass as primary backup
- When adding new services, update: `.env`, `.env.example`, `.secrets/`, this file, and KeePass

## Project Accounts
| Platform | Account | Status |
|----------|---------|--------|
| Gmail | unita.protocol@gmail.com | active |
| GitHub | [unita-protocol](https://github.com/unita-protocol) | active |
| Moltbook | [UnitaProtocol](https://moltbook.com/u/UnitaProtocol) | active |
| Vercel | signed in with GitHub | active |
| Supabase | unita-mvp (eu-west-1) | active |
| Google AI Studio | Gemini 3 Flash API key | active |
| GCP | — | pending setup |
| Matrix | — | pending setup |
| Nostr | — | pending setup |

## Moltbook Operations
Moltbook = AI agent social network. Full reference in `memory/moltbook.md`.

**Quick start for engagement sessions:**
```bash
# Load credentials
set -a && source /data/unita/.env && set +a
CLI="python3 /data/unita/.moltbook/moltbook_cli.py"

$CLI check                              # Check our posts for unreplied comments
$CLI status                             # Show engagement summary
$CLI search "governance" --sort=top     # Find relevant posts
$CLI comment POST_ID /tmp/reply.txt     # Post a comment (auto math verification)
$CLI post "Title" /tmp/post.txt builds  # Create a post in m/builds
```

**Rules:** Never retry `comment` on verify fail (creates duplicates). CLI `search` auto-flags `[DONE]` posts. Wait 22s+ between comments. Use `www.moltbook.com` only.

## API Routes
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/proposals` | Create proposal + auto-create voting group |
| PATCH | `/api/proposals/[id]` | Close voting on a proposal |
| POST | `/api/analyze` | Trigger 3-agent AI analysis (Gemini 3 Flash) |
| POST | `/api/vote` | Cast vote with real Semaphore ZK proof |
| POST | `/api/groups/join` | Register identity commitment for a proposal's group |
| GET | `/api/groups/[groupId]/members` | List commitments for client-side Merkle tree |

## Vercel Deployment

**Status**: Config ready, deploy via https://vercel.com/new

| Setting | Value |
|---------|-------|
| Root Directory | `apps/web` |
| Framework Preset | Next.js |
| Build Command | `cd ../.. && pnpm turbo build --filter=@unita/web` |
| Node.js Version | 22.x |

**Required env vars**: `DATABASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY`, `SUPABASE_URL`

**Notes**:
- `vercel.json` sets 60s function timeout (Fluid Compute) for AI analysis
- `next.config.ts` has `outputFileTracingRoot` pointed at monorepo root for file tracing
- `turbo.json` lists env vars that affect build cache
- Full deployment guide: `docs/infrastructure/BOOTSTRAP_GUIDE.md` Section 3

## Key Design Decisions
- **Off-chain first, on-chain for verification** — consensus architecture pattern
- **Matrix custom event types** = structured governance data replication (rooms are typed JSON event DAGs)
- **Power concentration = #1 risk** in liquid democracy — hard caps on delegation
- **eIDAS 2.0 EUDI Wallet** mandatory for 450M EU citizens by Nov 2026 — biggest identity opportunity
- **UX determines adoption**, not cryptography
- **Build ONE demo first** — proposal → AI analysis → ZK vote → results, before any infrastructure

## Private Context
Credentials, account details, and API references are in `.claude-private/CREDENTIALS.md` (gitignored).
Moltbook post tracking is in `.moltbook/` (gitignored).
