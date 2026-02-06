
To ensure UNITA is truly universal, we can expand the acronym to include the remaining major cultural and linguistic blocks (Anglosphere, Slavic, and Hispanic/Latin American). This makes the name a literal bridge between East, West, North, and South.

| Letter | Concept | Culture | Meaning in the Project |
|--------|---------|---------|----------------------|
| U | Ubuntu | African | "I am because we are." Collective social responsibility. |
| N | Nyaya / Narod | Indian / Slavic | Nyaya (Logic/Justice) and Narod (The People/Nation). The power of the collective will. |
| I | Ijtihad / Integrity | Arabic / Western | Ijtihad (Reasoned struggle) and Integrity (Honesty). The duty to be truthful and educated. |
| T | Tao / Truth | Chinese / English | Tao (The Way) and Truth. Absolute transparency in the P2P flow of data. |
| A | Areté / Acción | Greek / Spanish | Areté (Virtue) and Acción (Direct Action/Agency). The power of the individual to act and vote. |

# UNITA: Global P2P Liquid Democracy & Resource Equilibrium

**UNITA** is a decentralized governance protocol that unites global wisdom (Ubuntu, Narod, Ijtihad, Tao, Areté) into a single tool for direct democracy. It is designed to scale from local neighborhood councils to global human-interest referendums.

> **Vision**: A world where every human can participate meaningfully in the decisions that affect their lives, backed by transparent information, cryptographic privacy, and AI-assisted deliberation.

## Why UNITA?

Existing governance systems fail at scale. Representative democracy creates principal-agent problems. Direct democracy suffers from voter fatigue and uninformed decisions. DAO governance concentrates power in token holders. UNITA combines the best insights from all of these:

- **Liquid Democracy** from [Cardano Voltaire](https://docs.cardano.org/about-cardano/governance-overview) and [Internet Computer NNS](https://internetcomputer.org/how-it-works/network-nervous-system-nns) — delegate or vote directly
- **ZK-Privacy** from [Semaphore](https://semaphore.pse.dev/) and [MACI](https://maci.pse.dev/) — vote without revealing identity
- **Quadratic Funding** from [Gitcoin](https://grants.gitcoin.co/) and [RadicalxChange](https://www.radicalxchange.org/concepts/plural-voting/) — voice credits prevent plutocracy
- **AI Deliberation** from [Polis](https://pol.is/) and [Collective Intelligence Project](https://www.cip.org/) — informed voting at scale
- **Decentralized Identity** from [W3C DID](https://www.w3.org/TR/did-1.1/), [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3), and [EU eIDAS 2.0](https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/) — one person, one vote
- **Federated Messaging** from [Matrix](https://matrix.org/) + [libp2p](https://libp2p.io/) + [Nostr](https://nostr.com/) — structured governance data replication + privacy channels

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     UNITA Protocol Stack                        │
├─────────────────────────────────────────────────────────────────┤
│  UI Layer        │ PWA + IPFS-hosted static site               │
│                  │ Budget Balancer, Voting UI, Social Feed      │
├──────────────────┼─────────────────────────────────────────────-┤
│  AI Layer        │ Multi-LLM Deliberation Engine               │
│  (Ijtihad)       │ Constitutional AI Guardrails                │
│                  │ Economic Impact Oracle                       │
├──────────────────┼─────────────────────────────────────────────-┤
│  Governance      │ Liquid Delegation + Quadratic Voting         │
│  Layer           │ MACI Anti-Collusion + Commit-Reveal         │
│                  │ Optimistic Execution + Dispute Resolution    │
├──────────────────┼─────────────────────────────────────────────-┤
│  Identity        │ W3C DID + Verifiable Credentials            │
│  Layer           │ Semaphore ZK Groups + National ID Bridge    │
│                  │ Soulbound Reputation Tokens (Areté)         │
├──────────────────┼─────────────────────────────────────────────-┤
│  Data Layer      │ IPFS/Filecoin (proposals, media)            │
│                  │ Event Sourcing (immutable audit trail)       │
├──────────────────┼─────────────────────────────────────────────-┤
│  Network         │ Matrix Federation (governance data + alerts) │
│  Layer           │ libp2p + RLN (privacy channel, fallback)    │
│                  │ Nostr (public social layer)                  │
├──────────────────┼─────────────────────────────────────────────-┤
│  Consensus       │ Substrate App-chain (voting finality)       │
│  Layer           │ DAVINCI-style ZK proof aggregation          │
│                  │ Cross-chain bridges (Wormhole/IBC)           │
└─────────────────────────────────────────────────────────────────┘
```

> See [docs/architecture/SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md) for full technical details.

---

## The Core Pillars

UNITA is not just a voting app; it is a **culture of responsibility**.

### 1. The 'Criterio' Instruction Layer (Ijtihad & Integrity)
- **Epistemic Responsibility:** Before voting, users interact with the **Ijtihad AI** — a multi-model deliberation system.
- **Pragmatic Analysis:** Integrated AIs (Claude, Gemini, DeepSeek, GigaChat) provide "Brutally Honest" briefs. No fluff, no political bias — just risks, logic gaps, and "Who wins/Who loses."
- **Adversarial Debating:** The AI "Steel-mans" the opposition. If you are 'Pro', it argues 'Con' with the strongest possible facts to ensure you are truly "vote-ready."
- **AI Delegation:** Users can optionally delegate a portion of their AI compute credits to improve the collective deliberation engine (with cryptographic controls and revocability).

### 2. Social P2P Architecture (Ubuntu & Narod)
- **Distributed Social Graph:** Built on **Matrix** (federated governance rooms) with **Nostr** as the public layer and **libp2p+RLN** as the privacy channel. Your "Follows" and "Feed" are stored on your community's lightweight homeserver.
- **Liquid Delegation:**
    - **Follow the Expert:** See how scientists, philosophers, or family members voted (if they chose to be public).
    - **Trust-but-Verify:** Set an auto-delegate, but receive a push alert to "Override" or "Reject" their vote before the block is finalized.
    - **Delegation Chains:** Inspired by [Cardano DReps](https://cardano.org/news/2024-03-16-drep-pioneer-workshop-program/) — revocable, transparent, and auditable.
- **Privacy Toggles:** Switch between **Anon** (ZK-proof), **Private** (Followers only), or **Public** (Global visibility).

### 3. Sovereign Identity (Acción & Truth)
- **National ID Bridge:** Uses **zk-SNARKs** to verify signatures from national IDs (DNIe, eIDAS 2.0 EUDI Wallet, MyNumber, Aadhaar).
- **One-Person-One-Vote:** Ensures 100% integrity using [Semaphore](https://semaphore.pse.dev/) group membership proofs and [MACI](https://maci.pse.dev/) anti-collusion.
- **Global/Local Context:** Vote on your local street lighting using the same identity you use for a global climate treaty.
- **Multi-Layer Identity:** Combines [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3) (ZK credentials), [World ID](https://world.org/) (proof of personhood), and [Zupass](https://github.com/proofcarryingdata/zupass) (proof-carrying data).

### 4. The Equilibrium Pillar (Sustainable Governance)
To prevent "Unfunded Mandates" and "Infinite-Wishlist" voting, UNITA introduces the **Equilibrium** module. Every 'Yes' must be backed by a 'How'.

#### Zero-Sum Budgeting
- **The Balancer UI:** Users cannot simply vote "Yes" on high-resource proposals. They must perform a "Trade-off" (e.g., "Reduce Education Admin by 2% to fund Local Solar").
- **Resource Constraints:** Proposals are categorized by:
    - **Capital:** Financial cost (GDP % or local tax).
    - **Energy/Raw Materials:** Physical resource footprint.
    - **Man-Power:** Human hours required (linked to the 'Hacendera' module).

#### AI Economic Modeling (The 'Oracle of Impact')
- **Pragmatic Simulation:** Using LLMs and Economic Agents, UNITA simulates the 5-year impact of a proposal.
- **Sustainability Score:** Every vote displays a "Sustainability Rating." If a proposal is "Infinite-Wishlist" (unsustainable), it is marked as 'Speculative' and requires a higher consensus threshold to pass.

#### GDP Funding Oracles
- **Sovereign Agreements:** Integration with government transparency portals to track the 0.1% - 2% GDP "Global Initiative Fund."
- **Proof of Stake-in-Community:** For local votes, users can back their "Yes" with a ZK-proof of committed time or local currency.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Networking** | [Matrix](https://matrix.org/) + [libp2p](https://libp2p.io/) | Federated governance rooms + P2P privacy channel |
| **Social** | [Nostr Protocol](https://nostr.com/) | Public social layer, delegation announcements |
| **Privacy** | [Semaphore v4](https://semaphore.pse.dev/) | ZK-Identity groups, anonymous signaling |
| **Anti-Collusion** | [MACI](https://maci.pse.dev/) | Encrypted ballots, bribery resistance |
| **Voting** | [DAVINCI Protocol](https://blog.vocdoni.io/davinci-universal-voting-protocol) | ZK-SNARK recursive proof aggregation |
| **Identity** | [W3C DID](https://www.w3.org/TR/did-1.1/) + [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3) | Decentralized identity + ZK credentials |
| **National ID** | [eIDAS 2.0 EUDI](https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/) + [AnonAadhaar](https://github.com/anon-aadhaar) | Government ID ZK bridge |
| **Ledger** | [Substrate](https://docs.substrate.io/) App-chain | Optimized for high-frequency voting |
| **Storage** | [IPFS](https://ipfs.tech/) + [Filecoin](https://filecoin.io/) | Decentralized proposal/media storage |
| **AI Oracles** | Multi-LLM (Claude, Gemini, DeepSeek, GigaChat) | "Brutal Honesty" deliberation engine |
| **Guardrails** | [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) + Constitutional AI | AI safety and alignment |
| **Funding** | [Quadratic Funding](https://github.com/gitcoinco/quadratic-funding) | Fair resource allocation |
| **Disputes** | [UMA Optimistic Oracle](https://uma.xyz/) pattern | Dispute resolution for contested votes |
| **Frontend** | PWA (offline-first) + [IPFS hosting](https://docs.ipfs.tech/how-to) | Censorship-resistant UI |

---

## AI Agent Development Tasks

### Phase 1: The Multicultural "Ijtihad" AI
- [ ] **Task 1:** Create the **Pragmatic Analyst Prompt**. It must force the AI to identify: 1. Unintended Consequences, 2. Financial Beneficiaries, 3. Logical Fallacies.
- [ ] **Task 2:** Research **GigaChat (Russia)** and **DeepSeek (China)** API integrations to ensure the AI instruction layer is truly global and not Western-centric.

### Phase 2: National ID & ZK-Circuits
- [ ] **Task 3:** Research **Vocdoni DAVINCI** protocol for their ZK-voting implementation with recursive proof aggregation.
- [ ] **Task 4:** Build a "Proof of Instruction" circuit: A user proves they engaged with the AI debate for at least 5 minutes before the "Vote" button unlocks (Optional/Configurable).

### Phase 3: The Ubuntu Social Feed
- [ ] **Task 5:** Implement the **Matrix-based notification** system for delegation alerts (custom event types in governance rooms), with **libp2p+RLN privacy channel** for anonymous signaling.
- [ ] **Task 6:** Design the "Reputation of Decency" (Areté) system using Soulbound Tokens where users gain points for "Responsible Abstention" on topics they aren't trained in.

### Phase 4: The Resource & Equilibrium Layer
- [ ] **Task 7:** Design the **"Budget Balancer" UI component**: A reactive slider system that prevents users from submitting a vote if the resource total exceeds 100%.
- [ ] **Task 8:** Research **Tokenized Time Credits**: How can users trade "Man-Power" hours in a P2P way to fund local projects without central banks?
- [ ] **Task 9:** Develop the **"Impact Summary" AI Prompt**: An agent that reads a budget proposal and outputs a JSON of "Winners, Losers, and Inflationary Risks."

### Phase 5: AI Agent Integration & Delegation
- [ ] **Task 10:** Design the **AI Compute Delegation** system — users opt-in to share AI tokens/credits for collective deliberation improvement, with cryptographic revocation controls.
- [ ] **Task 11:** Implement **Multi-Agent Deliberation** — orchestrate Claude, Gemini, DeepSeek agents to provide adversarial analysis from different cultural/economic perspectives.
- [ ] **Task 12:** Build **NeMo Guardrails** integration — prevent AI manipulation, enforce constitutional principles, detect adversarial prompts.

### Phase 6: Security & Anti-Hijacking
- [ ] **Task 13:** Implement **MACI** (Minimum Anti-Collusion Infrastructure) for encrypted ballot submission with ZK tally verification.
- [ ] **Task 14:** Design **Sybil Resistance** layer combining Semaphore groups + World ID + national ID ZK bridges.
- [ ] **Task 15:** Create **Constitutional Enforcement Engine** — AI agent that validates all proposals against the UNITA Constitution before they enter the voting queue.

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
> "You are the UNITA Constitutional Guardian. Review the attached proposal against the UNITA Constitution (docs/constitution/CONSTITUTION.md).
> 1. Does this proposal violate any Fundamental Rights (Articles 1-30)?
> 2. Does it conflict with any Governance Principles (Articles 31-50)?
> 3. If violations are found, suggest amendments that would make it constitutional.
> 4. Rate constitutional compliance: PASS / CONDITIONAL / REJECT."

---

## Investigation Gaps
1. **Coercion Resistance:** Investigate **MACI** + **Vocdoni DAVINCI** for combined anti-collusion and proof-aggregation.
2. **Global Translation:** Leverage P2P nodes + LLMs for real-time translation of local proposals into the 20 most spoken languages.
3. **Legal Wrappers:** Research "Lex Cryptographia" in Switzerland/EU for legally binding UNITA votes. Study [Aragon Court](https://aragon.org/) for on-chain dispute resolution.
4. **AI Safety:** Investigate adversarial attacks on AI deliberation agents — prompt injection, model manipulation, coordinated information campaigns.
5. **Quantum Resistance:** Plan migration path to post-quantum ZK proofs as quantum computing advances.

---

## Other Useful Topics

### Hacendera (Communal Labor)
In Spanish tradition, voting often led to a Hacendera — a day where the village worked together on the project they voted for. We could add a "Crowd-Action" module where users commit time or resources if a proposal passes.

### Quadratic Funding & Plural Voting
For global topics, use [Quadratic Voting](https://www.radicalxchange.org/concepts/plural-voting/) to ensure that a small, passionate group has as much "voice" as a large, indifferent one. Voice credits prevent plutocracy while rewarding conviction.

### Decency Reputation (Areté)
Instead of "Karma" or "Likes," users earn Areté as Soulbound Tokens. You earn it by:
- Providing high-quality sources.
- Admitting you were wrong in a debate.
- Choosing to delegate a vote to an expert because you weren't informed.
- Participating in Hacendera community work.

### The Global Wallet
- **Quadratic Funding for Global Tasks:** If a project helps the whole world (e.g., carbon capture), the "Global GDP Fund" matches individual votes exponentially.
- **The "Work-Vote" Link:** Your "Man-power" hours are verified on-chain via ZK proofs. If you help build a local school, your "Criterio" reputation increases, giving your "Education" votes more weight.

---

## Project Structure

```
unita/
├── README.md                           # This file
├── TODO.md                             # Project task tracker
├── .env.example                        # Environment variable template (NEVER commit .env)
├── .gitignore                          # Git ignore rules
├── docs/
│   ├── architecture/
│   │   └── SYSTEM_ARCHITECTURE.md      # Full system design
│   ├── security/
│   │   └── SECURITY_FRAMEWORK.md       # Threat model & guardrails
│   ├── protocols/
│   │   └── PROTOCOL_STACK.md           # P2P, ZK, consensus protocols
│   ├── ai-agents/
│   │   └── AI_AGENT_FRAMEWORK.md       # AI deliberation system
│   ├── constitution/
│   │   └── CONSTITUTION.md             # UNITA Constitutional Document
│   ├── infrastructure/
│   │   └── BOOTSTRAP_GUIDE.md          # Setup guide: email, GCP, Matrix, Nostr
│   ├── research/
│   │   ├── LANDSCAPE_ANALYSIS.md       # Similar projects & SOTA
│   │   ├── TECHNOLOGY_LANDSCAPE_2026.md # Detailed P2P/blockchain research
│   │   └── AI_GOVERNANCE_SECURITY_RESEARCH.md  # AI agents, security, compliance
│   └── adr/
│       ├── ADR-001-protocol-selection.md
│       └── ADR-002-messaging-layer.md
└── src/                                # (Future) Implementation
```

---

## Getting Started (Minimal Infrastructure)

UNITA starts as a **GitHub-hosted open-source project** with documentation-first approach:

1. **Phase 0 (Now):** Research, architecture, constitution — all in markdown on GitHub
2. **Phase 1:** PWA prototype hosted on IPFS via [Fleek](https://fleek.co/) or GitHub Pages
3. **Phase 2:** Semaphore + MACI integration for ZK-voting prototype
4. **Phase 3:** Matrix federation + libp2p/RLN privacy channel
5. **Phase 4:** AI deliberation engine (multi-model)
6. **Phase 5:** Substrate app-chain for production voting

---

## Related Projects & Inspiration

| Project | What UNITA Learns |
|---------|------------------|
| [Vocdoni DAVINCI](https://blog.vocdoni.io/davinci-universal-voting-protocol) | ZK recursive proof aggregation for scalable voting |
| [Cardano Voltaire](https://docs.cardano.org/about-cardano/governance-overview) | Liquid democracy DRep model (99.5% turnout achieved) |
| [MACI](https://maci.pse.dev/) | Anti-collusion encrypted ballots (Vitalik Buterin) |
| [Decidim](https://decidim.org/) | Open-source participatory democracy (Barcelona) |
| [Polis](https://pol.is/) | AI-assisted opinion gathering and consensus finding |
| [Gitcoin](https://grants.gitcoin.co/) | Quadratic funding for public goods |
| [Nostr](https://nostr.com/) | Censorship-resistant social protocol |
| [Matrix](https://matrix.org/) | Primary messaging: federated governance rooms, custom event types, 115M+ accounts |
| [Waku/Logos](https://waku.org/) | Historical reference — underlying primitives (libp2p, RLN) used directly instead |
| [Semaphore](https://semaphore.pse.dev/) | ZK group membership proofs |
| [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3) | ZK verifiable credentials |
| [World ID](https://world.org/) | Proof of personhood |
| [Namada](https://namada.net/) | Privacy-preserving governance with MASP |
| [Tally](https://tally.xyz/) | On-chain governance infrastructure |
| [Aragon](https://aragon.org/) | DAO framework and dispute resolution |
| [UMA Oracle](https://uma.xyz/) | Optimistic dispute resolution |
| [RadicalxChange](https://www.radicalxchange.org/) | Plural voting mechanism design |
| [Holonym/Human Passport](https://human.tech/) | Multi-signal Sybil resistance (2.2M users, acquired Gitcoin Passport) |
| [Farcaster](https://www.farcaster.xyz/) | Self-certifying social data, frame-based governance widgets |
| [MCP](https://modelcontextprotocol.io/) | Vendor-neutral AI tool protocol (Linux Foundation) |
| [LangGraph](https://www.langchain.com/langgraph) | Stateful governance workflow orchestration |
| [CrewAI](https://www.crewai.com/) | Multi-perspective AI agent crews |
| [Guardrails AI](https://www.guardrailsai.com/) | Structured LLM output validation across providers |

---

## Contributing

UNITA is a project for all of humanity. Contributions are welcome in any language. See the [Constitution](docs/constitution/CONSTITUTION.md) for the values that guide this project.

## License

- **Code**: [AGPL-3.0](LICENSE) — if you run a modified UNITA, you must share your changes
- **Documentation**: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share, adapt, but keep it open

The protocols of democracy should belong to everyone.
