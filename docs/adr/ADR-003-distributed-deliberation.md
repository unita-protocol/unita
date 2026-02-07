# ADR-003: Distributed AI Deliberation & Resource Allocation

**Status**: Proposed
**Date**: 2026-02-07
**Deciders**: UNITA Core
**Supersedes**: None
**Related**: ADR-001 (protocol selection), ADR-002 (messaging layer)

---

## Context

The current AI agent architecture (AI_AGENT_FRAMEWORK.md) centralizes deliberation: 3 agents (Ijtihad, Economist, Guardian) run on protocol infrastructure, analyzing proposals on behalf of all voters. This creates three problems:

1. **Compute cost scales with proposals, not voters** — but the cost is borne entirely by the protocol
2. **Single framing** — even with multi-model consensus, the protocol chooses what questions to ask
3. **No resource allocation mechanism** — voters express preference (YES/NO) but not intensity or willingness to contribute

Community feedback (Moltbook m/aisafety, m/agents, m/general — Feb 2026) independently raised all three:
- BortDev: "How does latency scale with voter count?"
- ZorGr0k: "What if neither answer is right?" (framing problem)
- AleXsoAI: "AI amplifies existing biases"
- WinnieTheGeek: "Adversarial by incentive, not just by prompt"
- Aoi_Hibiki: "Is there room for the unexplainable?"

Research found no existing project combining all three solutions proposed here.

---

## Decision

### 1. Proposal Synapse (Structured Knowledge Base)

Every proposal entering the deliberation phase gets a **synapse** — a structured, queryable knowledge base containing:

```
Proposal Synapse
├── Core Documents
│   ├── Proposal text (original + translations)
│   ├── Constitutional compliance report (Guardian Agent)
│   ├── Economic impact analysis (Economist Agent)
│   └── Balanced deliberation brief (Ijtihad Agent)
├── Supporting Evidence
│   ├── Referenced datasets, reports, precedents
│   ├── Fact-check results with source links
│   └── Community-submitted evidence (moderated)
├── Structured Data
│   ├── Budget breakdown (ResourceBreakdown schema)
│   ├── Stakeholder impact map
│   ├── Timeline and milestones
│   └── Risk assessment matrix
├── Deliberation Thread
│   ├── Matrix room link (federated discussion)
│   ├── Key arguments FOR (strongest steel-man)
│   ├── Key arguments AGAINST (strongest steel-man)
│   └── Unresolved questions
└── FAQ
    ├── Auto-generated from deliberation patterns
    └── Community-curated Q&A pairs
```

The synapse is:
- **Read-only for AI agents** — agents can query it but not modify evidence directly
- **Append-only for humans** — community members can submit evidence (moderated)
- **Versioned** — every change is tracked, no silent edits
- **Stored on IPFS** — content-addressed, immutable snapshots at key milestones

### 2. Voter-Side AI Agents (Distributed Compute)

Instead of running all AI analysis centrally, voters can query the synapse using their own AI agents:

```
┌────────────────────────────────────────────────────┐
│                 Protocol Layer                       │
│  Runs once per proposal:                            │
│  • Guardian Agent (constitutional check)            │
│  • Economist Agent (impact analysis)                │
│  • Ijtihad Agent (balanced brief)                   │
│  → Results stored in Proposal Synapse               │
├────────────────────────────────────────────────────┤
│                 Synapse Layer                        │
│  Structured knowledge base per proposal             │
│  • MCP-compatible API for AI agent queries          │
│  • RAG-ready document store                         │
│  • Matrix room for deliberation                     │
├────────────────────────────────────────────────────┤
│                 Voter Layer                          │
│  Each voter chooses their own analysis:             │
│  • Read synapse directly (no AI needed)             │
│  • Use UNITA's default AI summary                   │
│  • Query synapse with personal AI agent             │
│  • Use third-party AI analysis service              │
│  → AI compute cost borne by voter, not protocol     │
└────────────────────────────────────────────────────┘
```

**Key design choice**: The synapse exposes an **MCP-compatible API** so any AI agent — Claude, Gemini, local Llama, custom fine-tuned models — can query proposal data in a standardized way. This:
- Distributes compute cost across voters (protocol only pays for base analysis)
- Enables genuine epistemic diversity (voters choose models with different biases)
- Removes the "AI Penalty" (Jungherr 2025: people less willing to engage with AI-facilitated deliberation) by making AI optional
- Aligns with Article 31: "AI exists to inform, never to decide"

### 3. Simultaneous Voting + Resource Allocation

During the vote, citizens can optionally allocate resources alongside their YES/NO decision:

```
Vote Interface
├── Decision: YES / NO / ABSTAIN
├── Resource Allocation (optional)
│   ├── AI Compute Credits: Delegate X credits to this proposal's ongoing analysis
│   ├── Financial Commitment: Pledge X from personal tax delegation budget
│   └── Expertise Offer: Volunteer time/skills for implementation
└── Conviction Weight (optional)
    └── Stake reputation on this vote (quadratic decay)
```

**Mechanism**: Adapted from Conviction Voting (1Hive/Commons Stack) + Allo Protocol (Gitcoin):
- Resources flow proportionally to expressed preference intensity
- Quadratic scaling prevents whale capture (Article 20)
- Commitments are revocable until voting closes, binding after
- Anonymous voting preserved — resource allocation is separate from vote direction

**Economic model**: Resources go where people actually care:
- Health, education, shelter, security get funded because people vote AND allocate
- Low-priority proposals get votes but no resources — signal without cost
- Creates a natural prioritization mechanism beyond simple majority

---

## Alternatives Considered

### A. Centralized AI Only (Current Design)
- **Pros**: Simpler, consistent analysis quality, protocol controls framing
- **Cons**: Doesn't scale economically, single point of framing bias, no resource allocation
- **Why rejected**: Feedback consistently identified framing as the hardest problem

### B. No Protocol AI (Pure Voter-Side)
- **Pros**: Maximum decentralization, zero protocol compute cost
- **Cons**: Unequal access (rich voters get better AI), no baseline analysis, Guardian can't veto
- **Why rejected**: Guardian Agent constitutional check must remain protocol-level

### C. Token-Weighted Resource Allocation
- **Pros**: Simple, familiar to Web3 users
- **Cons**: Plutocratic (Article 20 violation), rich voters dominate allocation
- **Why rejected**: Fundamentally incompatible with one-person-one-vote

---

## Comparable Projects

| Project | What they do | How UNITA differs |
|---------|-------------|-------------------|
| **Habermas Machine** (Science 2025) | AI mediates human deliberation, 22.8%→38.6% agreement | UNITA: AI informs, doesn't mediate; voter-side choice |
| **NEAR AI Delegates** | AI agents vote on behalf of delegators | UNITA: AI analyzes, humans vote; delegation is to humans not AI |
| **Allo Protocol** (Gitcoin) | Composable on-chain allocation strategies | UNITA: Adapts allocation strategies to Substrate, adds ZK privacy |
| **Conviction Voting** (1Hive) | Continuous resource allocation via staking | UNITA: Combines with anonymous voting + constitutional constraints |
| **Deliberation.io** (UMass) | Citizen panel deliberation with AI support | UNITA: Open participation, not selected panels |
| **Optimism RetroPGF** | Retroactive public goods funding | UNITA: Proactive allocation during voting, not retroactive |
| **Metagov Interop** ($1.4M funded) | JSON-LD deliberation data interchange | UNITA: Should adopt Metagov standards for synapse format |

No existing project combines: structured knowledge base per proposal + voter-side AI agents + distributed compute + simultaneous voting and resource allocation.

---

## Implementation Plan

### Phase 1 (MVP+1): Basic Synapse
- Store Guardian/Economist/Ijtihad outputs as structured JSON per proposal
- Expose read-only API endpoint for synapse queries
- Add FAQ auto-generation from AI analysis

### Phase 2: MCP Integration
- Implement MCP-compatible tool interface for synapse queries
- Enable voter-side AI agents to query proposal data
- Adopt Metagov JSON-LD standards for interoperability

### Phase 3: Resource Allocation
- Add optional resource allocation to vote interface
- Implement quadratic scaling for allocation amounts
- Build conviction-style continuous allocation for long-running proposals

### Phase 4: Speculative Analysis Layer
- Add optional "exploratory analysis" agent alongside reliable agents
- Clearly labeled as speculative, not authoritative
- Community can enable/disable per proposal type

---

## Open Questions

1. **Synapse storage costs**: Who pays for IPFS pinning of proposal data at scale?
2. **MCP versioning**: How do we handle breaking changes in the MCP spec?
3. **Resource allocation privacy**: Can we make allocation amounts anonymous (ZK) while keeping aggregate totals public?
4. **Speculation vs reliability**: Where is the line between "creative exploration" and "misinformation"?
5. **Red Team incentives**: Should Red Team testers earn reputation/tokens for finding real vulnerabilities? (WinnieTheGeek proposal)

---

## References

- Habermas Machine: Bakker et al., Science (2025) — AI-mediated deliberation
- Jungherr (2025): "AI Penalty" — reduced engagement with AI-facilitated deliberation
- 1Hive Commons Stack: Conviction Voting specification
- Gitcoin Allo Protocol: Composable allocation strategies
- Metagov: JSON-LD deliberation data interchange standard
- UNITA Constitution Articles 17 (zero-sum budgeting), 20 (anti-plutocracy), 31 (AI as servant), 32 (multi-model diversity), 33 (AI compute delegation)
