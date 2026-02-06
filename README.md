# UNITA

### Global P2P Liquid Democracy & Resource Equilibrium

**UNITA** is a decentralized governance protocol designed to scale from local neighborhood councils to global referendums. It combines liquid democracy, zero-knowledge privacy, AI-assisted deliberation, and resource equilibrium into a single open platform.

> *A world where every human can participate meaningfully in the decisions that affect their lives — backed by transparent information, cryptographic privacy, and cultural neutrality.*

---

## The Name

To ensure UNITA is truly universal, each letter bridges major cultural and linguistic blocks — Anglosphere, Slavic, Hispanic/Latin American, African, Asian, and Arabic. The name is a literal bridge between East, West, North, and South:

| Letter | Concept | Culture | Meaning in the Project |
|--------|---------|---------|----------------------|
| **U** | Ubuntu | African | "I am because we are." Collective social responsibility. |
| **N** | Nyaya / Narod | Indian / Slavic | Nyaya (Logic/Justice) and Narod (The People/Nation). The power of the collective will. |
| **I** | Ijtihad / Integrity | Arabic / Western | Ijtihad (Reasoned struggle) and Integrity (Honesty). The duty to be truthful and educated. |
| **T** | Tao / Truth | Chinese / English | Tao (The Way) and Truth. Absolute transparency in the P2P flow of data. |
| **A** | Areté / Acción | Greek / Spanish | Areté (Virtue) and Acción (Direct Action/Agency). The power of the individual to act and vote. |

---

## Why This Exists

Existing governance fails at scale:
- **Representative democracy** creates principal-agent problems
- **Direct democracy** suffers from voter fatigue and uninformed decisions
- **DAO governance** concentrates power in token holders

UNITA solves this by combining five pillars:

### 1. Informed Voting (Ijtihad)
Before voting, AI agents present balanced analysis — steel-manning both sides, exposing hidden costs, rating logical consistency. Multi-model (Claude, Gemini, DeepSeek, GigaChat) to avoid cultural bias. [Learn more](docs/ai-agents/AI_AGENT_FRAMEWORK.md)

### 2. Liquid Delegation (Ubuntu & Narod)
Delegate your vote to experts — or vote directly. Delegations are revocable, topic-specific, transparent, and auditable. Inspired by [Cardano DReps](https://docs.cardano.org/about-cardano/governance-overview) with hard caps to prevent power concentration. [Learn more](docs/architecture/SYSTEM_ARCHITECTURE.md)

### 3. Sovereign Identity (Acción & Truth)
One-person-one-vote enforced by ZK proofs. National ID bridges (eIDAS 2.0, Aadhaar) prove citizenship without revealing identity. Switch between anonymous, private, or public voting modes. [Learn more](docs/protocols/PROTOCOL_STACK.md)

### 4. Resource Equilibrium
Every "Yes" must be backed by a "How." The Budget Balancer forces trade-offs — you can't vote for everything without saying what you'd cut. AI models simulate 5-year economic impact. [Learn more](docs/ROADMAP.md)

### 5. Constitutional Protection
A 40-article [Constitution](docs/constitution/CONSTITUTION.md) protects fundamental rights. An AI Guardian agent validates every proposal before it enters the voting queue. Core rights require 75% supermajority + 90-day deliberation to change.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  UI            PWA + IPFS-hosted static site            │
├─────────────────────────────────────────────────────────┤
│  AI            Multi-LLM Deliberation + Guardrails      │
├─────────────────────────────────────────────────────────┤
│  Governance    Liquid Delegation + Quadratic Voting      │
│                MACI Anti-Collusion + Dispute Resolution  │
├─────────────────────────────────────────────────────────┤
│  Identity      W3C DID + Semaphore ZK + National ID     │
├─────────────────────────────────────────────────────────┤
│  Data          IPFS/Filecoin + Event Sourcing            │
├─────────────────────────────────────────────────────────┤
│  Network       Matrix Federation + libp2p/RLN + Nostr   │
├─────────────────────────────────────────────────────────┤
│  Consensus     Substrate App-chain + ZK Proof Aggregation│
└─────────────────────────────────────────────────────────┘
```

See [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md) for the full C4 model and module specifications.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Messaging | [Matrix](https://matrix.org/) + [libp2p](https://libp2p.io/) | Federated governance rooms + P2P privacy channel |
| Social | [Nostr](https://nostr.com/) | Public delegation announcements |
| Privacy | [Semaphore v4](https://semaphore.pse.dev/) | ZK group membership, anonymous signaling |
| Anti-Collusion | [MACI](https://maci.pse.dev/) | Encrypted ballots, bribery resistance |
| Voting | [DAVINCI](https://blog.vocdoni.io/davinci-universal-voting-protocol) | ZK recursive proof aggregation |
| Identity | [W3C DID](https://www.w3.org/TR/did-1.1/) + [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3) | Decentralized identity + ZK credentials |
| National ID | [eIDAS 2.0](https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/) + [AnonAadhaar](https://github.com/anon-aadhaar) | Government ID ZK bridge |
| Blockchain | [Substrate](https://docs.substrate.io/) | Voting finality, treasury, identity anchoring |
| Storage | [IPFS](https://ipfs.tech/) + [Filecoin](https://filecoin.io/) | Decentralized proposal storage |
| AI | Multi-LLM (Claude, Gemini, DeepSeek, GigaChat) | Deliberation engine |
| AI Safety | [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) | Constitutional AI enforcement |
| Funding | [Quadratic Funding](https://www.radicalxchange.org/concepts/plural-voting/) | Fair resource allocation |

---

## Documentation

| Document | Description |
|----------|-------------|
| [Constitution](docs/constitution/CONSTITUTION.md) | 40 articles defining fundamental rights and governance principles |
| [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md) | C4 model, hexagonal design, module specifications |
| [Protocol Stack](docs/protocols/PROTOCOL_STACK.md) | Matrix, Semaphore, MACI, Substrate protocol details |
| [AI Agent Framework](docs/ai-agents/AI_AGENT_FRAMEWORK.md) | 6 AI agents, multi-model orchestration, guardrails |
| [Security Framework](docs/security/SECURITY_FRAMEWORK.md) | Threat model, defense-in-depth, EU AI Act compliance |
| [Landscape Analysis](docs/research/LANDSCAPE_ANALYSIS.md) | 30+ similar projects analyzed |
| [Development Roadmap](docs/ROADMAP.md) | Phased development plan with task breakdown |
| [ADR-001: Protocol Selection](docs/adr/ADR-001-protocol-selection.md) | Core technology choices with rationale |
| [ADR-002: Messaging Layer](docs/adr/ADR-002-messaging-layer.md) | Matrix primary + libp2p/RLN secondary |
| [Infrastructure Guide](docs/infrastructure/BOOTSTRAP_GUIDE.md) | GCP, Matrix homeserver, Nostr setup |

Research deep dives: [Technology Landscape 2026](docs/research/TECHNOLOGY_LANDSCAPE_2026.md) | [AI Governance & Security](docs/research/AI_GOVERNANCE_SECURITY_RESEARCH.md)

---

## Current Status

**Phase 0 — Documentation & Research** (active)

The project is in its documentation-first phase. All architecture, protocols, and constitutional framework are being designed before any code is written.

See [TODO.md](TODO.md) for current task tracking.

**Roadmap:**
1. **Phase 0** (now): Research, architecture, constitution
2. **Phase 1**: PWA prototype on IPFS / GitHub Pages
3. **Phase 2**: Semaphore + MACI ZK-voting prototype
4. **Phase 3**: Matrix federation + libp2p/RLN privacy channel
5. **Phase 4**: AI deliberation engine (multi-model)
6. **Phase 5**: Substrate app-chain for production voting

---

## Inspiration

UNITA builds on the work of many projects:

[Vocdoni DAVINCI](https://blog.vocdoni.io/davinci-universal-voting-protocol) (ZK voting) | [Cardano Voltaire](https://docs.cardano.org/about-cardano/governance-overview) (liquid democracy) | [MACI](https://maci.pse.dev/) (anti-collusion) | [Decidim](https://decidim.org/) (participatory democracy) | [Polis](https://pol.is/) (AI consensus) | [Gitcoin](https://grants.gitcoin.co/) (quadratic funding) | [Matrix](https://matrix.org/) (federated messaging) | [Nostr](https://nostr.com/) (censorship resistance) | [Semaphore](https://semaphore.pse.dev/) (ZK identity) | [RadicalxChange](https://www.radicalxchange.org/) (plural voting) | [Holonym](https://human.tech/) (Sybil resistance)

See [Landscape Analysis](docs/research/LANDSCAPE_ANALYSIS.md) for the full comparison of 30+ projects.

---

## Contributing

UNITA is a project for all of humanity. Contributions are welcome in any language.

Read the [Constitution](docs/constitution/CONSTITUTION.md) for the values that guide this project.

<!-- TODO: Add Matrix room links and Nostr npub once created -->
<!-- TODO: Add CONTRIBUTING.md -->

---

## License

- **Code**: [AGPL-3.0](LICENSE) — if you run a modified UNITA, you must share your changes
- **Documentation**: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share, adapt, but keep it open

*The protocols of democracy should belong to everyone.*
