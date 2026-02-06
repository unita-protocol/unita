# UNITA System Architecture

## Modular Design for Global Decentralized Governance

### 1. Design Principles

- **Modular**: Every component is replaceable without affecting others
- **Offline-First**: Works without constant internet connection
- **Privacy-by-Default**: ZK proofs are the norm, not the exception
- **Progressive Enhancement**: Start minimal, add layers as needed
- **Open Standards**: W3C DID, Verifiable Credentials, libp2p, AsyncAPI
- **Cultural Neutrality**: No language, region, or culture is default

### 2. C4 Architecture Model

#### 2.1 System Context (Level 1)

```
                    ┌─────────────┐
                    │   Citizen   │
                    │   (Voter)   │
                    └──────┬──────┘
                           │ Uses
                    ┌──────▼──────┐
                    │    UNITA    │
                    │  Protocol   │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
   │  National   │ │  AI Model   │ │ Blockchain  │
   │  ID Systems │ │  Providers  │ │  Networks   │
   │ (eIDAS,     │ │ (Claude,    │ │ (Substrate, │
   │  Aadhaar)   │ │  Gemini)    │ │  Ethereum)  │
   └─────────────┘ └─────────────┘ └─────────────┘
```

#### 2.2 Container Diagram (Level 2)

```
┌────────────────────────────────────────────────────────┐
│                    UNITA Protocol                       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   PWA    │  │  Wallet  │  │  Mobile  │  Frontends  │
│  │  (IPFS)  │  │   App    │  │   App    │             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       │              │              │                   │
│  ┌────▼──────────────▼──────────────▼────┐             │
│  │         API Gateway / SDK             │             │
│  │    (TypeScript/Rust libraries)        │             │
│  └────┬─────────┬──────────┬─────────────┘             │
│       │         │          │                           │
│  ┌────▼────┐ ┌──▼─────┐ ┌─▼──────────┐               │
│  │Identity │ │Voting  │ │Deliberation│               │
│  │Service  │ │Service │ │Service     │  Core Services│
│  │         │ │        │ │(AI Agents) │               │
│  └────┬────┘ └──┬─────┘ └─┬──────────┘               │
│       │         │          │                           │
│  ┌────▼────┐ ┌──▼─────┐ ┌─▼──────────┐               │
│  │Semaphore│ │ MACI   │ │NeMo       │  Crypto Layer │
│  │+ DID   │ │+DAVINCI│ │Guardrails  │               │
│  └────┬────┘ └──┬─────┘ └─┬──────────┘               │
│       │         │          │                           │
│  ┌────▼─────────▼──────────▼─────────────┐             │
│  │         Messaging & Network Layer      │             │
│  │  Matrix Federation + libp2p/RLN + Nostr│             │
│  └───────────────┬───────────────────────-┘             │
│                  │                                      │
│  ┌───────────────▼───────────────────────-┐             │
│  │         Storage & Consensus            │             │
│  │   IPFS + Substrate Chain + Events      │             │
│  └────────────────────────────────────────┘             │
└────────────────────────────────────────────────────────┘
```

### 3. Module Specification

#### 3.1 Identity Module
```yaml
module: identity
responsibility: User identity management, credential issuance/verification
interfaces:
  - createIdentity(): DID + Semaphore commitment
  - issueCredential(type, claims): VerifiableCredential
  - proveAttribute(attribute): ZKProof
  - verifyCredential(vc): boolean
  - bridgeNationalID(idType, proof): ZKProof
dependencies:
  - semaphore-protocol/core
  - w3c/did-core
  - privado-id/verifier-sdk
  - anon-aadhaar (for India)
storage: Local wallet (user device) + IPFS (public commitments)
privacy: All credential proofs are zero-knowledge by default
```

#### 3.2 Voting Module
```yaml
module: voting
responsibility: Proposal creation, vote submission, tally, delegation
interfaces:
  - createProposal(content, type, resources): ProposalID
  - submitVote(proposalId, choice, proof): VoteReceipt
  - delegateVote(proposalId, delegateId): DelegationReceipt
  - revokeDelegation(delegationId): void
  - tallyVotes(proposalId): TallyResult + ZKProof
  - challengeResult(proposalId, evidence): DisputeID
dependencies:
  - maci (anti-collusion)
  - semaphore (anonymous signaling)
  - substrate-voting-pallet
  - quadratic-funding (for resource allocation)
storage: Encrypted ballots on-chain; plaintext never stored
privacy: MACI encryption + Semaphore nullifiers
```

#### 3.3 Deliberation Module
```yaml
module: deliberation
responsibility: AI-assisted proposal analysis and voter education
interfaces:
  - analyzeProposal(proposalId): DeliberationBrief
  - checkConstitution(proposalId): ComplianceReport
  - modelEconomicImpact(proposalId): ImpactReport
  - translateContent(content, targetLang): TranslatedContent
  - factCheck(claims[]): FactCheckReport
dependencies:
  - nemo-guardrails
  - multi-llm-gateway (Claude, Gemini, DeepSeek, GigaChat)
  - translator-agent
storage: Ephemeral (deliberation queries not stored)
privacy: No query logging; aggregate usage metrics only
```

#### 3.4 Social Module
```yaml
module: social
responsibility: Social graph, delegation feed, notifications
interfaces:
  - follow(userId): void
  - getPublicDelegations(userId): Delegation[]
  - publishDelegation(proposalId, choice): NostrEvent
  - subscribeTopic(topic): MatrixRoomSubscription
  - notifyDelegator(delegationId, alert): void
dependencies:
  - matrix-rust-sdk
  - nostr-protocol
  - libp2p/gossipsub (privacy channel)
storage: Local device (private graph) + Matrix rooms (governance data) + Nostr relays (public posts)
privacy: Private graph never leaves device; public posts are opt-in
```

#### 3.5 Equilibrium Module
```yaml
module: equilibrium
responsibility: Resource tracking, budget balancing, sustainability
interfaces:
  - categorizeResources(proposalId): ResourceBreakdown
  - checkBudgetBalance(allocations): BalanceResult
  - simulateImpact(proposalId, timeframe): Simulation
  - scoreSustainability(proposalId): SustainabilityScore
dependencies:
  - economist-agent
  - substrate-treasury-pallet
  - oracle-gateway (GDP data)
storage: On-chain (resource commitments) + IPFS (simulation reports)
privacy: Aggregate resource data is public; individual allocations are private
```

### 4. Data Architecture

#### 4.1 Event-Driven Design
All state changes are captured as immutable events:

```typescript
// Core Event Types (AsyncAPI-compatible)
interface ProposalCreated {
  proposalId: string
  author: string // DID
  contentCID: string // IPFS hash
  resourceRequirements: ResourceBreakdown
  timestamp: number
}

interface VoteSubmitted {
  proposalId: string
  encryptedBallot: Uint8Array // MACI encrypted
  nullifier: string // Semaphore nullifier (prevents double-vote)
  proof: ZKProof
  timestamp: number
}

interface DelegationChanged {
  delegatorCommitment: string // Semaphore commitment (anonymous)
  delegateId: string // Public delegate DID
  topic: string
  expiresAt: number
  timestamp: number
}

interface TallyFinalized {
  proposalId: string
  result: VoteResult
  tallyProof: ZKProof // Verifiable tally
  participationRate: number
  timestamp: number
}
```

#### 4.2 Storage Strategy
| Data Type | Storage | Encryption | Retention |
|-----------|---------|------------|-----------|
| Proposals | IPFS + Filecoin | Plaintext (public) | Permanent |
| Ballots | Substrate chain | MACI encrypted | Permanent (encrypted) |
| Identities | User device | Local encryption | User-controlled |
| Credentials | User wallet | ZK-provable only | User-controlled |
| Deliberation | Ephemeral | TLS in transit | Not stored |
| Social graph | User device | Local encryption | User-controlled |
| Public delegations | Nostr relays | Signed, not encrypted | Relay-dependent |
| Audit events | Substrate chain | Plaintext (public) | Permanent |

### 5. Deployment Architecture

#### 5.1 Phase 0: GitHub Site (Now)
```
GitHub Repository
├── Documentation (Markdown)
├── Constitution
├── Architecture Decision Records
└── GitHub Pages (static site)
```

#### 5.2 Phase 1: PWA on IPFS
```
IPFS Network
├── Static PWA (React/Svelte)
├── Proposal content
└── Deliberation archives

GitHub Pages (fallback)
├── Same PWA content
└── DNS redirect to IPFS gateway
```

#### 5.3 Phase 2: Federated + P2P Network
```
Matrix Federation (Primary)
├── Governance rooms (proposals, deliberation)
├── Delegation alerts + vote notifications
├── Custom event types (org.unita.*)
└── Homeservers: Tuwunel / Continuwuity (Rust)

libp2p + RLN Privacy Channel (Secondary)
├── Anonymous vote notifications
├── ZK-proof signaling
└── Censorship-resistant fallback

Nostr Relays
├── Public delegation announcements
├── Transparency feeds
└── Social layer
```

#### 5.4 Phase 3: Full Decentralization
```
Substrate App-Chain
├── Voting finality
├── Treasury management
└── Identity anchoring

IPFS + Filecoin
├── Permanent storage
└── Content delivery

Matrix + libp2p/RLN + Nostr
├── All communications
└── Peer discovery
```

### 6. Modularity & Replaceability

Every module follows the Ports & Adapters (Hexagonal) pattern:

```
        ┌─────────────────────────────┐
        │       Core Domain Logic      │
        │  (Voting, Identity, etc.)    │
        └──────────┬──────────────────-┘
                   │
    ┌──────────────┼──────────────────┐
    │              │                  │
┌───▼────┐  ┌─────▼─────┐  ┌────────▼──────┐
│ Port:  │  │  Port:    │  │  Port:       │
│Storage │  │ Network   │  │  AI Provider │
└───┬────┘  └─────┬─────┘  └────────┬──────┘
    │             │                  │
┌───▼────┐  ┌─────▼─────┐  ┌────────▼──────┐
│Adapter:│  │ Adapter:  │  │ Adapter:     │
│IPFS    │  │ Matrix    │  │ Claude API   │
│SQLite  │  │ libp2p    │  │ Gemini API   │
│Filecoin│  │ Nostr     │  │ Local Llama  │
└────────┘  └───────────┘  └──────────────-┘
```

**Key benefit**: Swap IPFS for Arweave, Matrix for another messaging system, or Claude for Llama without touching core logic.

### 7. Technology Decision Matrix

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| Messaging | Matrix, Waku, libp2p raw | **Matrix + libp2p/RLN** | Production-proven federation (115M+ accounts), custom event types for governance, lightweight Rust homeservers; libp2p+RLN for privacy channel (see [ADR-002](../adr/ADR-002-messaging-layer.md)) |
| Social Protocol | Nostr, AT Protocol, Lens | **Nostr** | Simplest, most censorship-resistant, no corporate control |
| ZK Identity | Semaphore, WorldID, Sismo | **Semaphore** | Open source, battle-tested, Ethereum Foundation backed |
| Anti-Collusion | MACI, custom | **MACI** | Vitalik-designed, proven, PSE maintained |
| Blockchain | Substrate, Cosmos, Solana | **Substrate** | Custom pallets, Polkadot interop, governance-optimized |
| Storage | IPFS, Arweave, Ceramic | **IPFS + Filecoin** | Largest network, proven durability, active development |
| AI Safety | NeMo, Guardrails AI, custom | **NeMo Guardrails** | Open source, Colang language, NVIDIA backing |
| Identity Standard | W3C DID, custom | **W3C DID v1.0** | W3C Recommendation, widest adoption |
| Voting ZK | DAVINCI, custom circuits | **DAVINCI-inspired** | Recursive proofs, constant-size verification |
| Frontend | React, Svelte, Vue | **TBD** | Community decision in Phase 1 |
