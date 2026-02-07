# UNITA Landscape Analysis

## Similar Projects, State-of-the-Art, and Competitive Positioning

*Research conducted: February 2026*

---

### 1. Decentralized Governance Platforms

#### 1.1 Vocdoni / DAVINCI Protocol
- **URL**: [vocdoni.io](https://docs.vocdoni.io/) | [DAVINCI Whitepaper](https://hackmd.io/@vocdoni/BJY8EXQy1x)
- **What**: Universal voting protocol using recursive ZK-SNARKs
- **Architecture**: Execution on-chain (Ethereum), votes off-chain via sequencers, ZK proofs committed on-chain
- **Status**: Public testnet June 2025; active development
- **UNITA learns**: DAVINCI's 4-circuit recursive proof design (Ballot → Eligibility → Aggregation → Tally) is the gold standard for scalable ZK voting

#### 1.2 Cardano Voltaire / DReps
- **URL**: [cardano.org/governance](https://docs.cardano.org/about-cardano/governance-overview)
- **What**: Liquid democracy implemented at blockchain protocol level
- **Architecture**: CIP-1694 tripartite governance (DReps + Constitutional Committee + SPOs)
- **Achievement**: 99.5% voter turnout via delegation; 4.6 billion ADA cast via delegates
- **Status**: Production since Chang hard fork (2024), fully operational
- **UNITA learns**: DRep delegation model works at scale; need to separate from token-weighted voting

#### 1.3 Internet Computer NNS
- **URL**: [internetcomputer.org/governance](https://internetcomputer.org/network/governance/)
- **What**: Network Nervous System — liquid democracy via neuron staking
- **Architecture**: Neurons stake ICP, vote or delegate, earn rewards
- **Status**: Production, governing entire ICP network
- **UNITA learns**: Economic incentives for participation work, but token-weighting creates plutocracy

#### 1.4 Aragon
- **URL**: [aragon.org](https://aragon.org/)
- **What**: DAO framework with governance, treasury, and dispute resolution
- **Status**: Production, used by major DAOs
- **UNITA learns**: Governance toolkit design; dispute resolution patterns

#### 1.5 Tally
- **URL**: [tally.xyz](https://tally.xyz/) | [docs.tally.xyz](https://docs.tally.xyz/)
- **What**: On-chain governance platform built on OpenZeppelin Governor
- **Features**: Multi-chain support, liquid delegation, gas sponsorship, MCP server for AI
- **Status**: Production; $8M Series A (2025); supports Ethereum, Polygon, Arbitrum, etc.
- **UNITA learns**: MultiGov cross-chain voting via Wormhole; gas sponsorship for participation

#### 1.6 Snapshot
- **URL**: [snapshot.org](https://snapshot.org/)
- **What**: Off-chain voting for gasless governance
- **Status**: Most widely used governance tool in Web3
- **UNITA learns**: Off-chain voting reduces barriers; on-chain execution still needed for binding decisions

#### 1.7 Decidim
- **URL**: [decidim.org](https://decidim.org/)
- **What**: Open-source participatory democracy platform (Barcelona)
- **Status**: Production; used by 400+ organizations globally
- **UNITA learns**: Real-world participatory budgeting UI/UX; non-blockchain approach to democratic participation

---

### 2. ZK Voting & Anti-Collusion

#### 2.1 MACI (Minimum Anti-Collusion Infrastructure)
- **URL**: [maci.pse.dev](https://maci.pse.dev/) | [GitHub](https://github.com/privacy-scaling-explorations/maci)
- **What**: Ethereum Foundation project for collusion-resistant voting
- **Mechanism**: Encrypted ballots + key rotation + ZK tally
- **2025 Milestone**: Taiko + DoraHacks launched largest anonymous community vote using MACI
- **Status**: Production; actively maintained by PSE

#### 2.2 CLR.fund
- **URL**: [clr.fund](https://blog.clr.fund/)
- **What**: Permissionless quadratic funding using MACI
- **Status**: Production on Ethereum; multiple rounds completed
- **UNITA learns**: MACI + quadratic funding integration patterns

#### 2.3 Semaphore
- **URL**: [semaphore.pse.dev](https://semaphore.pse.dev/)
- **What**: ZK group membership and anonymous signaling
- **Status**: v4 production; used by multiple projects
- **UNITA learns**: Core identity primitive for anonymous voting

---

### 3. Decentralized Identity

#### 3.1 W3C DID / Verifiable Credentials
- **URL**: [w3.org/TR/did-1.1](https://www.w3.org/TR/did-1.1/)
- **Status**: v1.0 W3C Recommendation (2022); v1.1 in development
- **UNITA learns**: Foundation standard for self-sovereign identity

#### 3.2 Privado ID (formerly Polygon ID)
- **URL**: [Privado ID / Billions Network](https://github.com/0xPolygonID)
- **What**: ZK verifiable credentials on any EVM chain, built on Iden3
- **Status**: Active development continuing into 2026
- **UNITA learns**: ZK credential issuance and verification toolchain

#### 3.3 World ID (Worldcoin)
- **URL**: [world.org](https://world.org/)
- **What**: Proof of personhood via iris scanning + ZK proofs
- **Status**: Expanding globally; Orb Mini planned for 2026; target 100M+ users
- **UNITA learns**: Proof of personhood as Sybil resistance; privacy concerns with biometrics

#### 3.4 EU eIDAS 2.0 / EUDI Wallet
- **URL**: [EUDI Wallet](https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/)
- **What**: EU-mandated digital identity wallet for all 450M EU citizens
- **Timeline**: Wallet available by November 2026; business acceptance by November 2027
- **Status**: Implementing regulations adopted July 2025; countries at different stages
- **UNITA learns**: Largest government digital identity deployment; ZK bridge opportunity

#### 3.5 AnonAadhaar
- **URL**: [GitHub](https://github.com/anon-aadhaar)
- **What**: ZK circuit for proving Aadhaar identity without revealing personal data
- **Status**: Development; PSE-affiliated
- **UNITA learns**: Template for national ID ZK bridges

#### 3.6 Zupass / Proof-Carrying Data
- **URL**: [GitHub](https://github.com/proofcarryingdata/zupass)
- **What**: Secret-manager for user-controlled proof-carrying data
- **Status**: Used at Zuzalu, Devconnect events
- **UNITA learns**: User-controlled credential management pattern

#### 3.7 Holonym / Human Passport (formerly Gitcoin Passport)
- **URL**: [human.tech](https://human.tech/)
- **What**: Largest proof-of-humanity solution; acquired Gitcoin Passport (Feb 2025). Combines ZK proofs, reputation "stamps", and ML-based Sybil detection
- **Scale**: 2.2M users, 35.4M credentials issued, $380M in token distributions secured
- **Tech**: Human Network (decentralized threshold AVS with $1.4B restaked ETH), vOPRF, BBS+/Groth16 ZK proofs
- **Status**: Market leader for Sybil resistance; expanding rapidly across chains
- **UNITA learns**: Multi-signal credential aggregation (not single identity source); "cost of forgery" model for measuring identity strength

#### 3.8 Civic
- **URL**: [civic.com](https://www.civic.com/)
- **What**: Digital identity verification for Web3 on Solana; Civic Pass for on-chain access control
- **Status**: Active; established player in Solana ecosystem
- **UNITA learns**: Off-chain data with on-chain attestations pattern; sub-3-second verification UX standard

---

### 4. P2P & Network Protocols

#### 4.1 Matrix Protocol
- **URL**: [matrix.org](https://matrix.org/) | [spec.matrix.org](https://spec.matrix.org/latest/)
- **What**: Open federated messaging with custom event types, E2E encryption, 28+ bridges
- **Scale**: 115M+ accounts, 10K+ federated servers, 25+ government deployments (Bundeswehr 100K+ users, NATO, EU Commission, France)
- **Key Feature**: Rooms are typed JSON event DAGs — custom event types (`org.unita.proposal`, etc.) are first-class
- **SDK**: [Matrix Rust SDK](https://github.com/matrix-org/matrix-rust-sdk) (production-ready, UniFFI bindings for all platforms)
- **Lightweight homeservers**: [Tuwunel](https://github.com/matrix-construct/tuwunel) (Swiss government-backed Rust), [Continuwuity](https://github.com/continuwuity/continuwuity) (community Rust)
- **Status**: Production; Sliding Sync improving; P2P Matrix experimental (2-3 years away)
- **UNITA role**: **Primary messaging layer** — deliberation, proposals, delegation management, notifications (see [ADR-002](../adr/ADR-002-messaging-layer.md))

#### 4.1b Waku / Logos Messaging (Historical reference)
- **URL**: [waku.org](https://waku.org/) (now redirects to logos.co)
- **What**: Privacy-preserving P2P messaging for Web3; IS libp2p + GossipSub + custom protocols + RLN
- **Key Feature**: RLN (Rate Limiting Nullifier) — ZK-based DoS protection
- **Status**: RLNv2 live in nwaku v0.36 (July 2025); rebranding to Logos Messaging; core team of 3-5 engineers
- **License**: Apache-2.0 OR MIT (dual, fully permissive)
- **UNITA decision**: **Not used as direct dependency** — we use the underlying primitives (libp2p, standalone RLN) instead, eliminating project health risk while preserving technical benefits (see [ADR-002](../adr/ADR-002-messaging-layer.md))

#### 4.2 Nostr
- **URL**: [nostr.com](https://nostr.com/)
- **What**: Censorship-resistant social protocol (Notes and Other Stuff Transmitted by Relays)
- **Architecture**: Client-relay model; cryptographic identities; WebSocket-based
- **Status**: 21K+ total users; growing ecosystem; Lightning/Zaps integration
- **UNITA learns**: Public social layer; delegation announcements; simplest censorship-resistant design

#### 4.3 libp2p
- **URL**: [libp2p.io](https://libp2p.io/)
- **What**: Modular P2P networking stack (transport, discovery, security)
- **Status**: Production; used by IPFS, Ethereum, Polkadot, Filecoin
- **UNITA learns**: Foundation layer for peer discovery and transport

#### 4.4 IPFS / Helia
- **URL**: [ipfs.tech](https://ipfs.tech/)
- **What**: Content-addressed decentralized storage
- **Status**: Production; millions of daily retrievals; 2700+ autonomous systems
- **UNITA learns**: Proposal storage, frontend hosting, content persistence

#### 4.5 Farcaster / Snapchain
- **URL**: [farcaster.xyz](https://www.farcaster.xyz/)
- **What**: Decentralized social protocol with 100K+ DAU; Snapchain innovation for self-certifying data
- **Architecture**: Hubs (off-chain data), Ethereum L2 (identity), frame-based mini-apps
- **Status**: Production; fastest growing decentralized social network
- **UNITA learns**: Self-certifying data repositories pattern; frame-based governance widgets; practical social protocol UX

---

### 5. AI & Collective Intelligence

#### 5.1 Polis
- **URL**: [pol.is](https://pol.is/)
- **What**: AI-powered opinion gathering and consensus mapping
- **Used by**: Taiwan (vTaiwan), Singapore, multiple governments
- **UNITA learns**: Pre-vote consensus discovery; opinion clustering

#### 5.2 Collective Intelligence Project (CIP)
- **URL**: [cip.org](https://www.cip.org/)
- **What**: Roadmap for democratic AI governance
- **Status**: Active research; influential in AI policy
- **UNITA learns**: Framework for AI-human collaboration in governance

#### 5.3 Make.org Dialogue
- **URL**: [make.org](https://about.make.org/)
- **What**: Multilingual citizen co-construction platform
- **Status**: Production; used at Youth Assembly Forums 2025
- **UNITA learns**: Multilingual deliberation UI patterns

#### 5.4 NeMo Guardrails
- **URL**: [GitHub](https://github.com/NVIDIA-NeMo/Guardrails)
- **What**: Open-source toolkit for programmable LLM guardrails
- **Features**: Colang modeling language, PII detection, content safety, jailbreak prevention
- **Status**: v0.20.0 with reasoning-capable safety models
- **UNITA learns**: Production-grade AI safety framework

#### 5.5 All Our Ideas (Princeton)
- **URL**: [allourideas.org](http://www.allourideas.org/)
- **What**: Pairwise comparison system for group prioritization
- **Status**: Production; used by universities and organizations
- **UNITA learns**: Natural fit for UNITA's budget trade-off mechanism and proposal prioritization

#### 5.6 Habermas Machine (Google DeepMind)
- **URL**: [Science (2025)](https://www.science.org/doi/10.1126/science.adq2852)
- **What**: AI system that mediates human deliberation; generated statements that groups preferred over human-written ones
- **Key Finding**: Groups reaching unanimous agreement increased from 22.8% to 38.6% with AI mediation
- **Status**: Research; published in Science; follow-up studies in progress
- **UNITA learns**: AI mediation works, but UNITA intentionally avoids mediation (Article 31: AI informs, never decides). The Habermas Machine validates the benefit; UNITA's approach preserves human agency by making AI advisory, not mediating.

#### 5.7 Deliberation.io (UMass Amherst)
- **What**: Platform for citizen panel deliberation with AI support; structured small-group discussions
- **Status**: Academic research
- **UNITA learns**: Panel-based deliberation doesn't scale to global participation. UNITA uses open participation with AI analysis, not curated panels.

#### 5.8 NEAR AI Delegates
- **What**: AI agents that vote on behalf of human delegators in NEAR governance
- **Status**: Pilot stage on NEAR Protocol
- **UNITA learns**: Closest to voter-side AI concept, but centrally managed. UNITA distributes AI to voter's choice of provider, and AI never votes — only informs.

#### 5.9 Metagov Interop ($1.4M funded)
- **URL**: [metagov.org](https://metagov.org/)
- **What**: JSON-LD deliberation data interchange standard for cross-platform governance
- **Status**: Funded, active development
- **UNITA learns**: Critical for interoperability. UNITA's Proposal Synapse (ADR-003) should adopt Metagov standards for structured governance data.

#### 5.10 Guardrails AI
- **URL**: [guardrailsai.com](https://www.guardrailsai.com/)
- **What**: Python framework for input/output validation of LLM responses with Validators Hub
- **Features**: Structured output enforcement, cross-LLM validation via LiteLLM, custom validators
- **Status**: Production-ready
- **UNITA learns**: Enforce structured JSON governance outputs across Claude, Gemini, DeepSeek, GigaChat

---

### 6. Funding & Economic Mechanisms

#### 6.1 Gitcoin / Quadratic Funding
- **URL**: [grants.gitcoin.co](https://grants.gitcoin.co/)
- **What**: Quadratic funding for public goods ($67M+ distributed)
- **Status**: Transitioning to Gitcoin 3.0 (plurality of allocation mechanisms)
- **UNITA learns**: QF works at scale; need multiple allocation mechanisms

#### 6.2 Allo Protocol (Gitcoin)
- **URL**: [allo.gitcoin.co](https://allo.gitcoin.co/)
- **What**: Composable on-chain allocation strategies — modular framework for distributing funds
- **Status**: Production on Ethereum; powers Gitcoin Grants
- **UNITA learns**: Allocation strategy abstraction pattern. Adaptable for Substrate. ADR-003 proposes similar composable allocation alongside voting.

#### 6.3 Conviction Voting (1Hive / Commons Stack)
- **URL**: [1hive.org](https://1hive.gitbook.io/1hive/)
- **What**: Continuous resource allocation via token staking; conviction accumulates over time
- **Mechanism**: Staking tokens on proposals; conviction grows with time staked; proposals pass when conviction exceeds dynamic threshold
- **Status**: Production on Gnosis Chain (1Hive Gardens)
- **UNITA learns**: Closest existing mechanism to UNITA's vision of simultaneous voting + resource allocation. ADR-003 adapts this for anonymous voting with quadratic scaling.

#### 6.4 Optimism RetroPGF (Retroactive Public Goods Funding)
- **URL**: [optimism.io/retropgf](https://community.optimism.io/docs/governance/retropgf-3/)
- **What**: Retroactive funding of public goods based on demonstrated impact
- **Status**: Production; Round 3 distributed $30M
- **UNITA learns**: Retroactive validation of impact. UNITA could combine proactive allocation (during vote) with retroactive assessment (post-implementation).

#### 6.5 RadicalxChange / Plural Voting
- **URL**: [radicalxchange.org](https://www.radicalxchange.org/)
- **What**: Mechanism design for democratic innovation (founded by Glen Weyl)
- **Real-world use**: NYC District 9 ($1M budgeting), Nashville Metro Council
- **UNITA learns**: Voice credits and quadratic voting for intensity expression

---

### 7. Privacy-Preserving Governance

#### 7.1 Namada
- **URL**: [namada.net](https://namada.net/)
- **What**: L1 blockchain with Multi-Asset Shielded Pool (MASP)
- **Status**: Mainnet launched December 2024; shielding rewards active 2025
- **UNITA learns**: Privacy-preserving governance with Zcash-like guarantees for any asset

#### 7.2 Anoma
- **URL**: [anoma.net](https://anoma.net/)
- **What**: Intent-centric architecture for privacy-preserving applications
- **Status**: Development; Namada is first implementation
- **UNITA learns**: Intent-based voting and governance patterns

---

### 8. UNITA's Unique Position

What UNITA offers that no existing project combines:

| Feature | Cardano | ICP | Aragon | Vocdoni | 1Hive | UNITA |
|---------|---------|-----|--------|---------|-------|-------|
| Liquid Democracy | Yes | Yes | No | No | No | **Yes** |
| ZK Anonymous Voting | No | No | No | Yes | No | **Yes** |
| Anti-Collusion (MACI) | No | No | No | Partial | No | **Yes** |
| AI Deliberation | No | No | No | No | No | **Yes** |
| Voter-Side AI Agents | No | No | No | No | No | **Yes** |
| Proposal Knowledge Base | No | No | No | No | No | **Yes** |
| National ID Bridge | No | No | No | Partial | No | **Yes** |
| Quadratic Voting | No | No | No | No | No | **Yes** |
| Vote + Resource Allocation | No | No | No | No | Yes | **Yes** |
| Constitutional AI | No | No | No | No | No | **Yes** |
| Multi-Cultural AI | No | No | No | No | No | **Yes** |
| Offline-First | No | No | No | Yes | No | **Yes** |

**UNITA's thesis**: Democracy needs all of these simultaneously. Piecemeal solutions create gaps that bad actors exploit. ADR-003 adds three new differentiators: structured proposal knowledge bases ("synapses"), voter-side AI agents via MCP, and simultaneous voting + resource allocation.

---

### 9. Cautionary Tales & Failed Projects

#### 9.1 Democracy Earth
- **What**: "Sovereign" liquid democracy with crypto tokens
- **Status**: **Stalled** — minimal development since 2022
- **Lesson**: Global civic governance is the hardest unsolved problem; visionary ambition without sustainable funding fails

#### 9.2 DAOstack
- **What**: "Holographic consensus" for DAOs
- **Status**: **Declined** — ecosystem activity dropped significantly
- **Lesson**: Complex mechanism design without adoption-focused UX leads to abandonment

#### 9.3 LiquidFeedback (German Pirate Party)
- **What**: Liquid democracy software used in actual political party governance
- **Status**: Deployed, but delegation concentrated into "super-delegates"
- **Lesson**: **Power concentration is the #1 risk in liquid democracy.** UNITA needs hard caps on delegation depth and concentration

#### 9.4 Ceramic Network
- **What**: Composable data network with ComposeDB
- **Status**: **Transitioning** — merging with Textile, ComposeDB deprecated
- **Lesson**: Dependency on external infrastructure projects carries pivot risk

---

### 10. Strategic Lessons from the Landscape

1. **Power concentration is existential** — LiquidFeedback, ICP neuron whales, and Cardano all show delegation concentrating. UNITA needs hard caps on delegation depth and concentration.

2. **Identity is the hardest unsolved problem** — every governance project eventually hits Sybil resistance. eIDAS 2.0 (Nov 2026) is a potential game-changer. Multi-source identity (Holonym model) is pragmatic.

3. **Off-chain first, on-chain for verification** — Vocdoni DAVINCI, Snapshot, and Farcaster converge: define rules on-chain, execute off-chain, verify proofs on-chain. This is the pattern UNITA should follow.

4. **UX determines adoption, not cryptography** — Decidim (400+ deployments) and Snapshot (dominant) won through UX simplicity. UNITA must be as easy to use as a social media app.

5. **No project has achieved global civic governance** — Democracy Earth tried and stalled. Every success is either crypto-native (Aragon, Cardano) or location-specific (Decidim). UNITA's ambition is unprecedented and unproven.

6. **AI mediators outperform humans** — Science journal (2026) found groups reaching unanimous agreement increased from 22.8% to 38.6% with AI mediation. Validates UNITA's Ijtihad AI approach.

7. **AI fact-checking has limits** — 60% of AI search engine responses were found inaccurate (Tow Center). UNITA must use multi-model consensus + community verification, never autonomous fact-checking alone.

8. **The "AI Penalty"** — Jungherr (2025) found people are less willing to engage in AI-facilitated deliberation compared to human-only processes. This validates UNITA's design choice to make AI optional: voters can read the synapse directly, use their own AI, or skip AI entirely (ADR-003).

9. **Resource allocation during voting is unexplored** — Conviction Voting (1Hive), Allo Protocol (Gitcoin), and Optimism RetroPGF each tackle allocation separately from decision-making. No project combines anonymous voting + simultaneous resource allocation + AI deliberation. This is UNITA's proposed innovation (ADR-003).

10. **Distributed AI deliberation is first-of-kind** — NEAR AI Delegates are closest (AI votes on behalf of delegators) but centrally managed. UNITA's Proposal Synapse + voter-side AI agent model (ADR-003) would be the first to combine: structured knowledge base per proposal, voter-chosen AI agents, distributed compute cost, and MCP-compatible interoperability.
