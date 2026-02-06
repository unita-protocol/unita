# UNITA Protocol Stack

## Detailed Protocol Specifications & Integration Guide

### 1. Network Layer

#### 1.1 Matrix Protocol (Primary Messaging)
- **Protocol**: Matrix client-server and server-server (federation) APIs
- **Purpose**: Structured governance data replication, deliberation, delegation management, notifications
- **Key Features**:
  - Custom event types (`org.unita.proposal`, `org.unita.vote.notification`, `org.unita.delegation`, etc.) as typed JSON in room DAGs
  - Federation provides decentralized state replication without blockchain
  - E2E encryption (Megolm/Vodozemac) with MLS and post-quantum on roadmap
  - Sliding Sync for mobile-first UX
  - Power levels map to governance roles (voters, proposers, admins)
  - 28+ bridges (Discord, Telegram, Signal, Slack, IRC, webhooks via Hookshot)
- **SDK**: [Matrix Rust SDK](https://github.com/matrix-org/matrix-rust-sdk) — production-ready with UniFFI bindings (iOS/Android/desktop/web)
- **Homeservers**: [Tuwunel](https://github.com/matrix-construct/tuwunel) (Swiss government-backed Rust) and [Continuwuity](https://github.com/continuwuity/continuwuity) for lightweight community governance nodes
- **Scale**: 115M+ accounts, 10K+ federated servers, 25+ government deployments (Bundeswehr, NATO, EU Commission, France)
- **Reference**: [spec.matrix.org](https://spec.matrix.org/latest/) | [matrix.org](https://matrix.org/)
- **ADR**: See [ADR-002](../adr/ADR-002-messaging-layer.md) for decision rationale

#### 1.2 libp2p + Standalone RLN (Privacy Channel)
- **Protocol**: libp2p modular networking stack + Rate-Limiting-Nullifier ZK circuits
- **Purpose**: Anonymous metadata-private signaling, censorship-resistant fallback, ZK-based rate limiting
- **Key Components**:
  - **GossipSub v1.1**: Pub/sub message propagation with peer scoring
  - **Standalone RLN**: ZK-proof-based rate limiting independent of any messaging protocol ([Rate-Limiting-Nullifier](https://github.com/Rate-Limiting-Nullifier) organization)
  - **discv5 / DHT**: Peer discovery
  - **DCUtR**: Direct Connection Upgrade through Relay (NAT traversal)
  - **Noise/TLS**: Transport security
- **Usage**: Only for channels requiring metadata privacy (anonymous vote notifications, ZK-proof signaling, censorship-resistant fallback)
- **Same transport**: Used by Substrate (our chain), IPFS (our storage), and Ethereum
- **Language Support**: Go, Rust, JavaScript, Python
- **Reference**: [libp2p/specs](https://github.com/libp2p/specs) | [GossipSub v1.1](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md)

> **Note on Waku**: ADR-001 originally selected Waku Relay as primary messaging. ADR-002 supersedes this — Waku IS libp2p + custom protocols + RLN. We use the underlying primitives (libp2p, standalone RLN) directly, eliminating dependency on the Waku/Logos project while preserving all technical benefits. See [ADR-002](../adr/ADR-002-messaging-layer.md).

#### 1.3 Nostr (Public Social Layer)
- **Protocol**: Nostr (Notes and Other Stuff Transmitted by Relays)
- **Purpose**: Public delegation announcements, social feed, public deliberation
- **Architecture**: Client-relay model; WebSocket-based
- **Key NIPs**:
  - NIP-01: Basic protocol flow
  - NIP-0A: Conflict-Free Contact Lists (CRDT-based)
  - Lightning/Zaps integration for micro-incentives
- **Why Nostr**: Truly censorship-resistant; no corporate control; simple architecture
- **Reference**: [nostr.com](https://nostr.com/) | [github.com/nostr-protocol/nostr](https://github.com/nostr-protocol/nostr)

### 2. Identity Layer

#### 2.1 W3C Decentralized Identifiers (DID)
- **Standard**: W3C DID Core v1.0 (Recommendation, July 2022); v1.1 in development
- **Purpose**: Self-sovereign identity anchoring
- **UNITA DID Method**: `did:unita:<unique-identifier>`
- **Integration**: Compatible with eIDAS 2.0, Privado ID, and Semaphore
- **Reference**: [w3.org/TR/did-1.1](https://www.w3.org/TR/did-1.1/)

#### 2.2 Verifiable Credentials
- **Standard**: W3C Verifiable Credentials Data Model v2.0
- **Purpose**: Prove attributes (nationality, age, expertise) without revealing identity
- **Credential Types**:
  - `UNITAVoterCredential`: Proves right to vote (one-person-one-vote)
  - `UNITAExpertiseCredential`: Domain knowledge for weighted delegation
  - `UNITAAreteCredential`: Reputation score (Soulbound)
  - `UNITAHacenderaCredential`: Community work participation

#### 2.3 Semaphore v4 (ZK Group Membership)
- **Protocol**: Semaphore by Privacy & Scaling Explorations (PSE)
- **Purpose**: Prove group membership and signal without revealing identity
- **How it works**:
  ```typescript
  // Create identity (private)
  const identity = new Identity()
  // Add to group (commitment only)
  const group = new Group([identity.commitment, ...others])
  // Generate anonymous proof
  const proof = await generateProof(identity, group, message, scope)
  // Verify (anyone can verify, nobody knows who)
  await verifyProof(proof)
  ```
- **UNITA Usage**: Anonymous voting, delegation verification, group-based access control
- **Reference**: [semaphore.pse.dev](https://semaphore.pse.dev/)

#### 2.4 National ID Bridges (ZK)
| Country/Region | System | ZK Bridge |
|---------------|--------|-----------|
| EU (27 countries) | eIDAS 2.0 EUDI Wallet | ZK-SNARK signature verification (deadline: Nov 2026) |
| India | Aadhaar | [AnonAadhaar](https://github.com/anon-aadhaar) ZK circuit |
| Japan | MyNumber | Custom ZK bridge (to be developed) |
| Spain | DNIe | eIDAS 2.0 compliant |
| Global | World ID | [Orb](https://world.org/) biometric proof-of-personhood |

#### 2.5 Privado ID (ZK Verifiable Credentials)
- **Protocol**: Privado ID (formerly Polygon ID) built on Iden3 + Circom
- **Purpose**: Issue and verify credentials with ZK proofs on any EVM chain
- **Tools**: Verifier SDK, Issuer Node, Wallet SDK, Wallet App
- **Reference**: [Privado ID](https://polygon.technology/blog/introducing-polygon-id-zero-knowledge-own-your-identity-for-web3)

### 3. Voting Layer

#### 3.1 MACI (Anti-Collusion)
- **Protocol**: Minimum Anti-Collusion Infrastructure (by PSE/Ethereum Foundation)
- **Purpose**: Prevent vote buying and coercion
- **Mechanism**:
  1. Voters register with a public key
  2. Votes are encrypted with coordinator's key
  3. Voters can change their key (invalidating coerced votes)
  4. ZK-SNARK proves correct tally without revealing individual votes
- **Key Property**: Voters cannot prove how they voted → vote buying is impossible
- **Latest**: MACI 2025 adds customizable polls, voice credit flexibility
- **Reference**: [maci.pse.dev](https://maci.pse.dev/)

#### 3.2 DAVINCI-Style Proof Aggregation
- **Inspired by**: [Vocdoni DAVINCI Protocol](https://blog.vocdoni.io/davinci-universal-voting-protocol)
- **Architecture**: Four chained ZK circuits
  1. **Ballot Circuit**: Rule-compliant encryption (El Gamal + ZK)
  2. **Eligibility Circuit**: ECDSA signature + Merkle proof
  3. **Aggregation Circuit**: N ballots → 1 proof (constant size)
  4. **Tally Circuit**: Homomorphic addition + state update
- **Key Benefit**: Millions of votes produce one small proof verifiable in milliseconds

#### 3.3 Quadratic Voting / Plural Voting
- **Mechanism**: Voice credits allocated quadratically
  - 1 vote = 1 credit, 2 votes = 4 credits, 3 votes = 9 credits
- **Purpose**: Express preference intensity while preventing plutocracy
- **Based on**: [RadicalxChange](https://www.radicalxchange.org/concepts/plural-voting/) research
- **Real-world**: Used in NYC District 9 ($1M budgeting), Nashville Metro Council

#### 3.4 Liquid Delegation
- **Model**: Cardano Voltaire DRep-inspired
- **Properties**:
  - Revocable at any time (override before block finalization)
  - Transitive (delegates can re-delegate, with visibility)
  - Topic-specific (delegate for "Education" but vote directly on "Healthcare")
  - Transparent (delegation graph is public; individual votes are private)

### 4. Data Layer

#### 4.1 IPFS / Filecoin (Decentralized Storage)
- **Purpose**: Store proposals, media, deliberation transcripts
- **Architecture**:
  - Proposals pinned to IPFS with content-addressed hashes
  - Critical data backed by Filecoin deals for persistence
  - Frontend hosted on IPFS via Fleek/4EVERLAND
- **Reference**: [ipfs.tech](https://ipfs.tech/) | [Helia](https://github.com/ipfs/helia) (JS implementation)

#### 4.2 Event Sourcing (Audit Trail)
- **Pattern**: Append-only event log for all governance actions
- **Events**: ProposalCreated, VoteSubmitted, DelegationChanged, TallyFinalized
- **Benefits**: Complete audit trail, replay capability, temporal queries
- **Integration**: AsyncAPI specification for event schemas

### 5. Consensus Layer

#### 5.1 Substrate App-Chain
- **Framework**: [Polkadot SDK / Substrate](https://docs.substrate.io/)
- **Purpose**: Custom blockchain optimized for voting finality
- **Key Pallets**:
  - `pallet-voting`: Core voting logic
  - `pallet-identity`: DID anchoring
  - `pallet-delegation`: Liquid delegation chains
  - `pallet-treasury`: Equilibrium budget management
- **Consensus**: Nominated Proof-of-Stake (NPoS)
- **Interoperability**: Polkadot parachain or standalone with IBC

#### 5.2 Dispute Resolution
- **Pattern**: Optimistic execution (inspired by [UMA Oracle](https://uma.xyz/))
- **Flow**:
  1. Proposal passes → execution assumed correct
  2. Challenge period (48-96h) for disputes
  3. If disputed → community arbitration
  4. If unresolved → Constitutional Guardian review

### 6. AI Layer

#### 6.1 Multi-LLM Deliberation
- **Providers**: Claude (Anthropic), Gemini (Google), DeepSeek (China), GigaChat (Russia)
- **Architecture**: Decentralized gateways; no single provider dependency
- **Prompts**: Open-source, version-controlled, community-governed

#### 6.2 Guardrails
- **Framework**: [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) + custom Colang rules
- **Capabilities**: Topic control, PII detection, jailbreak prevention, content safety
- **Constitutional Enforcement**: Custom rails that check AI output against UNITA Constitution

### 7. Frontend Layer

#### 7.1 Progressive Web App (PWA)
- **Architecture**: Offline-first, installable, responsive
- **Hosting**: IPFS (primary) + GitHub Pages (fallback)
- **Key Components**:
  - Budget Balancer (resource trade-off sliders)
  - Voting Interface (anonymous + quadratic modes)
  - Deliberation Feed (AI-assisted discussion)
  - Delegation Manager (visual delegation graph)
  - Privacy Dashboard (credential management)

### 8. Protocol Versioning

All protocol changes follow semantic versioning and the UNITA Constitution amendment process:
- **Major** (breaking changes): Constitutional vote required
- **Minor** (new features): Community vote (simple majority)
- **Patch** (bug fixes): Guardian Council approval
