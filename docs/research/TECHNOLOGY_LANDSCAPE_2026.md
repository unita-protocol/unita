# UNITA Technology Landscape Research Report

**Date:** 2026-02-06
**Scope:** P2P Networking, Blockchain/Consensus, Zero-Knowledge Technology, Decentralized Identity
**Purpose:** Evaluate state-of-the-art technologies for powering the UNITA decentralized democracy platform

---

## Table of Contents

1. [P2P Protocols](#1-p2p-protocols)
2. [Blockchain and Consensus](#2-blockchain-and-consensus)
3. [Zero-Knowledge Technology](#3-zero-knowledge-technology)
4. [Decentralized Identity](#4-decentralized-identity)
5. [UNITA Architecture Recommendations](#5-unita-architecture-recommendations)
6. [Sources](#6-sources)

---

## 1. P2P Protocols

### 1.1 Waku (Status Network Messaging)

**Status:** Active development, approaching mainnet readiness for RLN spam protection
**Organization:** Waku (part of the Logos collective, formerly Status network)

**Overview:**
Waku is a family of modular P2P protocols for secure, censorship-resistant, and anonymous communication. It is purpose-built for resource-constrained environments (browsers, smartphones) and operates as a privacy-first messaging layer.

**Key Capabilities:**
- End-to-end encrypted one-on-one and group messaging
- Store protocol (v3) for offline message retrieval -- critical for mostly-offline mobile devices
- Light protocol implementations for browsers and smartphones without full node requirements
- Rate Limiting Nullifiers (RLN) v2 for spam/DoS protection without revealing sender identity
- Content topics for pub/sub style message routing
- Relay, Filter, and Light Push protocols for different resource profiles

**Recent Developments (2025-2026):**
- RLN v2 mainnet preparation: all RLN tests passing with updated contract architecture (June 2025)
- Store v3 protocol improvements for better message synchronization
- Enhanced light protocol implementations within Status apps for improved throughput
- Anvil testing tool integration for RLN development

**Limitations:**
- RLN not yet fully on mainnet (still preparing as of mid-2025)
- Smaller network effect compared to libp2p; fewer nodes in the wild
- Still maturing for high-throughput use cases
- Documentation and developer experience lag behind libp2p

**UNITA Fit:** **PRIMARY CHOICE for messaging and notification layer.** Waku is purpose-built for exactly what UNITA needs: private, censorship-resistant P2P messaging with spam protection. The RLN mechanism aligns directly with UNITA's need to prevent Sybil attacks on the messaging layer. Delegation alerts, vote notifications, and social feed updates should flow through Waku Relay and Filter protocols. The light protocol support is critical for mobile-first UNITA users.

---

### 1.2 libp2p

**Status:** Mature, production-proven
**Version:** Go (most feature-complete), Rust (v0.54+), JavaScript (browser-compatible)
**Organization:** Protocol Labs / open community

**Overview:**
libp2p is a modular networking stack that serves as the foundation for IPFS, Ethereum (via Prysm/Lighthouse), Polkadot, Filecoin, and many other major protocols. It provides transport-agnostic peer discovery, multiplexing, NAT traversal, and pubsub.

**Key Capabilities:**
- Multi-transport: TCP, QUIC, WebSocket, WebTransport, WebRTC
- NAT traversal with hole punching (AutoNAT, Circuit Relay v2)
- Peer discovery: mDNS, Kademlia DHT, Rendezvous
- Multiplexed streams over single connections (yamux, mplex)
- GossipSub for pub/sub messaging (see 1.3)
- Noise/TLS for transport security
- Peer identity based on cryptographic key pairs

**Language Support:**
- **Go** (`go-libp2p`): Most mature, feature-complete implementation
- **Rust** (`rust-libp2p`): Strong recent momentum, v0.54+ with SwarmBuilder ergonomics, WebTransport support
- **JavaScript** (`js-libp2p`): Browser and Node.js support
- **Python** (`py-libp2p`): Improving, GossipSub v1.1 compliance achieved in 2025
- **Nim**, **C++**, **Java/Kotlin**: Community implementations at varying maturity

**Limitations:**
- Complexity: significant learning curve for new developers
- Not privacy-focused by default (peers can observe who talks to whom)
- Connection management at scale requires careful tuning
- Browser support via WebRTC/WebTransport still has rough edges

**UNITA Fit:** **FOUNDATIONAL NETWORKING LAYER.** libp2p should be the transport backbone underneath Waku or as the core networking layer for UNITA's node infrastructure. Its mature NAT traversal, peer discovery, and multi-transport support are essential. The Rust implementation is recommended for UNITA's core node software for performance and safety. JavaScript/WebTransport enables browser-based light clients.

---

### 1.3 GossipSub Protocol

**Status:** Stable at v1.1/v1.2, v2.0 in active development
**Specification:** libp2p specs repository

**Overview:**
GossipSub is libp2p's primary pub/sub protocol. It maintains a mesh of peers per topic and combines eager push (direct forwarding) with lazy pull (gossip about message IDs) to achieve efficient, reliable message propagation.

**Key Capabilities (v1.1+):**
- Peer scoring with P1-P4 topic-scoped metrics and P5 global behavior penalty
- Flood publishing for protocol messages ensuring delivery
- Opportunistic grafting based on median mesh scores
- Signed peer records for peer exchange
- Configurable mesh parameters (D, D_low, D_high, D_lazy)

**v2.0 Developments:**
- Probabilistic lazy/eager forwarding to reduce duplicate messages toward zero
- IANNOUNCE/INEED message pattern for bandwidth optimization
- Significant reduction in amplification factor

**Limitations:**
- Not encrypted by default (messages visible to mesh peers)
- Mesh management overhead for many topics
- Sybil resistance requires application-level solutions

**UNITA Fit:** **CRITICAL for topic-based vote propagation and proposal distribution.** GossipSub v1.1's peer scoring directly maps to UNITA's need to penalize malicious nodes. Topic channels can be used for: per-jurisdiction proposal feeds, delegation graphs, and real-time vote tally streaming. The v2.0 bandwidth optimizations will be important for mobile users.

---

### 1.4 IPFS / Filecoin (Decentralized Storage)

**Status:** Mature ecosystem; IPFS via Helia (TypeScript), Kubo (Go); Filecoin mainnet operational
**Key Development:** Filecoin Onchain Cloud (testnet Nov 2025, mainnet early 2026)

**Overview:**
IPFS provides content-addressed, peer-to-peer file storage and retrieval. Filecoin adds an economic incentive layer for persistent storage with cryptographic proofs of storage.

**Recent Developments:**
- **Helia**: Modern TypeScript IPFS implementation replacing the deprecated js-ipfs
- **Filecoin Pin**: Automatically backs up IPFS pins to Filecoin's decentralized storage with verifiable guarantees
- **Filecoin Onchain Cloud**: Decentralized cloud platform with verifiable storage, fast retrieval, and programmable payments
- Over 60% of Web3 dApps use IPFS/Filecoin for metadata and large assets

**Limitations:**
- IPFS content is not guaranteed to persist without pinning services or Filecoin deals
- Retrieval latency can be high compared to centralized CDNs
- Filecoin storage deals have minimum size and duration requirements
- Content moderation is challenging on content-addressed systems

**UNITA Fit:** **ESSENTIAL for proposal document storage, AI analysis reports, and media.** All proposal text, supporting documents, AI economic impact reports, and budget visualizations should be stored on IPFS with Filecoin persistence. Content addressing ensures tamper-evident document integrity. The Helia TypeScript implementation integrates well with browser-based UNITA clients.

---

### 1.5 Nostr Protocol

**Status:** Active, growing ecosystem; ~21,000+ users, 3,675 daily active (Oct 2025)
**Architecture:** Client-relay model with cryptographic identities

**Overview:**
Nostr is a minimalist protocol where users publish JSON "Events" signed with their private key to multiple WebSocket relays. There is no central infrastructure, governance body, or organizational backing.

**Key Architecture:**
- Identity: secp256k1 keypairs (same curve as Bitcoin)
- Data format: JSON Events with signature, pubkey, kind, content, tags
- Transport: WebSocket connections to relays
- No accounts, no registration -- just key pairs
- Relays are simple, stateless WebSocket servers that store and forward events
- NIP (Nostr Implementation Possibilities) extension system

**Strengths:**
- Extreme simplicity -- the core protocol fits on one page
- No central authority or governance overhead
- Lightning Network integration for micropayments
- Growing ecosystem of clients and relay software

**Limitations:**
- No built-in privacy (all events are public by default, though encrypted DMs exist)
- Relay centralization risk -- popular relays become de facto infrastructure
- No built-in content moderation or spam protection
- Limited data model (everything is an "Event")
- Small user base compared to mainstream social platforms

**UNITA Fit:** **INSPIRATION for simplicity, but not a primary building block.** Nostr's radical simplicity and censorship resistance are admirable, but its lack of built-in privacy, spam protection, and structured data models make it insufficient for UNITA's voting and governance needs. However, UNITA could adopt Nostr's NIP extension model for protocol evolution, and could bridge to Nostr for public transparency feeds. The "Events" model could inspire UNITA's proposal publication format.

---

### 1.6 AT Protocol (Bluesky)

**Status:** Active, IETF standardization in progress (Internet Draft published Sept 2025, working group chartered Jan 2026)
**Organization:** Bluesky PBC

**Overview:**
The AT Protocol implements a federated social network with user-controlled data through Personal Data Servers (PDS), network-wide indexing via Relays (Firehose), and application logic via App Views.

**Key Architecture:**
- **Personal Data Servers (PDS):** User-controlled data repositories
- **Relays (BGS):** Crawl PDS instances and aggregate into the "Firehose" stream
- **App Views:** Application-specific indexers that consume the Firehose
- **DID-based identity:** Users control their identity across servers
- **Signed data repositories:** Merkle-tree based, tamper-evident

**2025 Roadmap:**
- OAuth with granular permissions
- Group-private data support
- IETF standardization of core architecture, repository format, and data sync

**Limitations:**
- Relay infrastructure creates centralization pressure (Bluesky runs the primary relay)
- Complex architecture with many moving parts
- Not privacy-focused by design (public social data model)
- Heavy infrastructure requirements for self-hosting

**UNITA Fit:** **ARCHITECTURAL INSPIRATION for data portability.** AT Protocol's concept of user-owned data repositories (PDS) aligns with UNITA's sovereignty goals. The signed repository model could inform how UNITA stores user voting history and delegation preferences. However, the relay-centric architecture introduces centralization that conflicts with UNITA's goals. The IETF standardization track is encouraging -- UNITA should monitor and potentially adopt compatible standards for interoperability.

---

### 1.7 Gun.js

**Status:** Active, production-deployed (Internet Archive and 100+ apps)
**Architecture:** Decentralized, offline-first graph database with CRDT conflict resolution

**Overview:**
Gun is an open-source, real-time, decentralized, offline-first graph database engine. It uses peer-to-peer networking with multi-master replication via CRDTs (Commutative Replicated Data Types).

**Key Capabilities:**
- Offline-first: works without internet, syncs when connected
- CRDT-based conflict resolution (last-write-wins for atomic attributes)
- Graph data model with denormalized nested structures
- Browser and Node.js peers
- Built-in user authentication (SEA - Security, Encryption, Authorization)
- Real-time data synchronization

**Limitations:**
- Requires significant "build it yourself" effort
- Documentation quality is inconsistent
- CRDT model (last-write-wins) may not suit all use cases
- Performance concerns at very large scale
- Small core maintainer team

**UNITA Fit:** **USEFUL for local-first user data and delegation graphs.** Gun's offline-first, CRDT-based model is compelling for UNITA's delegation preferences, user settings, and local proposal drafts. Users in low-connectivity environments (rural areas, censored networks) benefit from offline-first design. However, Gun should not be used for vote tallying (where last-write-wins semantics are inappropriate) or high-integrity consensus data.

---

### 1.8 OrbitDB

**Status:** Transitioning; v0.29.0 stable, v1.0.0 in development, migrating from js-ipfs to Helia
**Architecture:** Peer-to-peer database on IPFS with Merkle-CRDTs

**Overview:**
OrbitDB is a serverless, distributed, peer-to-peer database built on IPFS and libp2p PubSub. It provides eventually consistent data with conflict-free writes via Merkle-CRDTs.

**Database Types:**
- Events (append-only log)
- Documents (JSON document store)
- KeyValue (key-value store)

**Limitations:**
- v1.0.0 not yet stable
- Migration from deprecated js-ipfs to Helia is ongoing
- Development pace has slowed (latest stable published 3+ years ago)
- Limited query capabilities compared to traditional databases

**UNITA Fit:** **SECONDARY consideration for structured P2P data.** OrbitDB's append-only event log is conceptually interesting for vote audit trails, and the document store for proposal metadata. However, the slow development pace and ongoing Helia migration create adoption risk. Monitor v1.0.0 progress; prefer Gun.js or custom IPFS-based solutions for now.

---

### 1.9 Holepunch / Hypercore Protocol (Pear Runtime)

**Status:** Active development, backed by Tether
**Architecture:** Distributed append-only logs with NAT hole-punching

**Overview:**
Holepunch provides the Pear Runtime -- a P2P application development and deployment platform requiring zero server infrastructure. Built on Hypercore (secure, distributed append-only log), Hyperbee (append-only B-tree), and Hyperdrive (distributed file system).

**Key Capabilities:**
- Zero infrastructure cost for application deployment
- Hypercore: cryptographically signed, append-only log with efficient replication
- Hyperbee: B-tree on top of Hypercore for key-value lookups
- Hyperdrive: distributed file system
- NAT hole-punching built into the stack
- Desktop, Mobile, and Terminal application support

**Limitations:**
- Smaller ecosystem compared to IPFS/libp2p
- Tether backing raises decentralization concerns for some
- Less proven at large scale than IPFS
- JavaScript-centric tooling

**UNITA Fit:** **INTERESTING for append-only vote logs.** Hypercore's append-only log model maps naturally to an immutable vote record. Hyperbee could store per-proposal vote tallies. However, the ecosystem is smaller and more JavaScript-centric than UNITA may want for core infrastructure. Consider Hypercore for specific data structures (vote audit trail) rather than as the primary networking layer.

---

## 2. Blockchain and Consensus

### 2.1 Substrate / Polkadot Parachain Model

**Status:** Production; Polkadot SDK v2509 (Oct 2025); Agile Coretime live; Elastic Scaling live
**Organization:** Parity Technologies / Web3 Foundation

**Overview:**
The Polkadot SDK (formerly Substrate + FRAME + Cumulus) is a modular blockchain framework. Polkadot provides shared security through its relay chain, with application-specific "parachains" connected via Cross-Consensus Messaging (XCM).

**Key 2025-2026 Developments:**
- **Agile Coretime:** Replaced parachain auctions with flexible, market-driven blockspace allocation. Builders can acquire on-demand or bulk coretime without massive upfront capital.
- **Elastic Scaling:** Parachains can dynamically access multiple relay chain cores. Early tests indicate hundreds of thousands of TPS on a single parachain.
- **Polkadot 2.0.5 (Jan 2026):** Capped token supply, Solidity smart contract support, reduced block times.
- **Ethereum Developer Stack Reuse:** Direct deployment of Ethereum tooling on Polkadot.

**Key Technical Components:**
- **FRAME:** Modular framework with "pallets" (reusable runtime modules) for governance, treasury, identity, democracy, etc.
- **Built-in Democracy Pallets:** Native on-chain governance with referenda, council voting, delegated voting
- **Forkless Upgrades:** Runtime upgradeable via governance without hard forks
- **XCM:** Cross-chain messaging for multi-chain interoperability

**Limitations:**
- Complexity: steep learning curve for Rust + FRAME development
- Polkadot relay chain adds dependency and cost (coretime purchase)
- Ecosystem smaller than Ethereum's
- Parachain slot/coretime economics can be unpredictable

**UNITA Fit:** **TOP CANDIDATE for the governance chain.** Substrate/Polkadot is the strongest fit for UNITA's on-chain governance layer for several reasons:
1. **Built-in democracy pallets** provide native referenda, delegation, and conviction voting
2. **FRAME modularity** allows custom pallets for quadratic voting, equilibrium budgeting, and Arete reputation
3. **Forkless upgrades** enable protocol evolution through governance
4. **Agile Coretime** means UNITA can start small and scale without million-dollar slot auctions
5. **Elastic Scaling** provides the throughput needed for high-frequency voting
6. **XCM** enables future cross-chain bridges to Ethereum L2s or Cosmos chains

---

### 2.2 Cosmos SDK / IBC Protocol

**Status:** Production; ibc-go v10 (IBC Classic + IBC v2/Eureka); Cosmos SDK v0.53+
**Organization:** Cosmos Labs (formerly Interchain Foundation)

**Overview:**
Cosmos SDK is a Go-based framework for building application-specific blockchains ("app-chains") connected via the Inter-Blockchain Communication (IBC) protocol. IBC enables trustless cross-chain token transfers and arbitrary message passing.

**Key 2025-2026 Developments:**
- **IBC Eureka (v2):** Launched end of March 2025. Eliminates the 4-step channel handshake, vastly simplifies implementation. Ethereum connectivity via ZK light client security.
- **2026 Roadmap:** Proof of Authority support, BLS signing, BlockSTM execution, IBC GMP (General Message Passing), Solana/L2 support, IAVLx storage rewrite.
- **120+ chains** connected via IBC with faster-than-finality transfers.

**Limitations:**
- Go-only SDK (less flexible than Rust-based alternatives)
- ATOM token economics have been contentious
- Cosmos Hub's role is less clear than Polkadot's relay chain
- Validator set management complexity for new chains

**UNITA Fit:** **STRONG ALTERNATIVE to Substrate for app-chain.** Cosmos SDK's app-chain model gives UNITA full sovereignty over its chain. IBC Eureka's Ethereum connectivity is valuable for bridging UNITA identity/voting to Ethereum L2 ecosystems. The Go-based development may be faster for teams more comfortable with Go than Rust. The Cosmos governance module provides built-in proposal/voting mechanisms. **Key advantage:** IBC gives UNITA interoperability with 120+ existing chains without Polkadot relay chain dependency.

---

### 2.3 Ethereum L2s (Optimism, Arbitrum, Base)

**Status:** Production; combined >90% of L2 transactions; Stage 1 decentralization (permissionless fraud proofs)

**Overview:**
Ethereum Layer 2 rollups inherit Ethereum's security while providing higher throughput and lower costs. The three dominant L2s are Base (Coinbase), Arbitrum, and Optimism.

**Key 2025-2026 State:**
- **Throughput:** Arbitrum and Base surpassed 1,000 TPS during volatility (vs Ethereum L1's ~40 TPS)
- **Market Share:** Base >60% of L2 transactions; top 3 combined ~90%
- **Decentralization:** All three have live permissionless fraud proof systems (Stage 1)
- **Superchain (Optimism):** OP Stack enables launching custom L2s with shared sequencing
- **Consolidation:** 21Shares reports most smaller L2s may not survive 2026

**Governance Models:**
- **Optimism:** Retroactive Public Goods Funding (RPGF), bicameral governance (Token House + Citizens' House), ETH for fees, OP for governance
- **Arbitrum:** ARB token governance, capped supply, DAO-driven
- **Base:** Coinbase-operated, contributing to OP Stack

**Limitations:**
- Centralized sequencers remain a concern (though fraud proofs add safety)
- Stage 2 decentralization (full trustlessness) not yet achieved
- Transaction costs, while lower than L1, still meaningful for high-frequency voting
- Dependent on Ethereum L1 for security finality

**UNITA Fit:** **DEPLOYMENT TARGET for Ethereum-native integration, not primary chain.** UNITA should deploy verification contracts on an L2 (likely Optimism for its governance ethos and RPGF alignment) to bridge into the Ethereum ecosystem. This enables: verification of UNITA votes by Ethereum smart contracts, integration with Ethereum-based identity protocols, and access to DeFi for the Equilibrium economic module. However, running UNITA's core governance on someone else's L2 sacrifices sovereignty -- use an L2 as a bridge, not as the primary chain.

---

### 2.4 Celestia (Modular Blockchain / Data Availability)

**Status:** Mainnet operational; Fibre Blockspace launched Jan 14, 2026 (1 Tb/s target)
**Version:** Celestia v4 (Lotus upgrade, May 2025)

**Overview:**
Celestia is a modular data availability (DA) layer that decouples data availability from execution and consensus. Rollups and app-chains publish transaction data to Celestia, which guarantees availability through Data Availability Sampling (DAS).

**Key 2025-2026 Developments:**
- **Fibre Blockspace (Jan 2026):** 1 Tb/s DA protocol across 500 nodes -- 1500x the original roadmap throughput
- **mamo-1 testnet (Apr 2025):** Achieved 21.33 MB/s throughput with 128 MB blocks
- **Lotus (Celestia v4):** Integrates Hyperlane for TIA interoperability across rollups and Ethereum
- **30+ rollups** using Celestia for data availability
- **2026 roadmap:** 1GB blocks, lazy bridging for cross-rollup transfers, Proof-of-Governance (0.25% inflation)

**Limitations:**
- DA layer only -- does not provide execution or consensus
- TIA token utility narrative still developing
- Smaller validator set compared to Ethereum
- DAS security model requires sufficient light client participation

**UNITA Fit:** **VALUABLE as DA layer if UNITA builds a sovereign rollup.** If UNITA builds its own execution environment (e.g., Substrate-based sovereign rollup), it could use Celestia for data availability instead of maintaining its own DA layer. This reduces infrastructure cost while providing cryptographic guarantees that vote data is available. The 1 Tb/s Fibre throughput easily handles global voting data. However, this adds architectural complexity -- only recommended if UNITA pursues a rollup-based architecture rather than a full parachain or app-chain.

---

### 2.5 Avail DA Layer

**Status:** Mainnet operational; 70+ partner chains; $33.12M Total Value Secured
**Architecture:** NPoS with BABE/GRANDPA consensus (Substrate-based)

**Overview:**
Avail is a blockchain focused on data availability ordering, recording, and proving. It uses KZG polynomial commitments and DAS to enable light clients to verify block data availability without downloading entire blocks.

**Key Capabilities:**
- 250ms preconfirmations with 20s DA finality
- Light client runs on laptops and phones
- Up to 1,000 external validators in active set
- KZG polynomial commitments for data integrity proofs

**Limitations:**
- Smaller ecosystem than Celestia
- Newer with less battle-testing
- Validator set smaller than Celestia's

**UNITA Fit:** **ALTERNATIVE DA layer to Celestia, with Substrate compatibility advantage.** Since Avail is Substrate-based, it has natural compatibility if UNITA builds on Substrate/Polkadot. The 250ms preconfirmations are attractive for responsive voting UX. Consider Avail if UNITA builds a Substrate-based sovereign chain that needs external DA.

---

### 2.6 Mina Protocol (Succinct Blockchain with ZK)

**Status:** Mainnet operational; Mesa upgrade coming 2026
**Key Technology:** Recursive ZK-SNARKs, 22KB constant-size blockchain proof

**Overview:**
Mina invented the "succinct blockchain" concept: the entire chain state can be verified with a single 22KB proof using recursive zero-knowledge proofs. This means any device can be a full verifier without downloading the chain history.

**Key Developments:**
- **o1js:** TypeScript library for zkApp development (API overhaul in progress)
- **Mesa Upgrade (2026):** Four protocol optimizations approved via on-chain vote
- **Zeko Boom Testnet:** Processed 500K transactions, 100x faster slot times than current Mina
- **o1VM:** Upcoming general-purpose zkVM for zkApp development

**Limitations:**
- Relatively small ecosystem and developer community
- zkApp development tooling still maturing
- Transaction throughput limited compared to optimistic rollups
- o1js API undergoing major overhaul (instability risk)

**UNITA Fit:** **COMPELLING for client-side vote verification.** Mina's 22KB proof means any UNITA user on any device can cryptographically verify the entire governance state without trusting anyone. This aligns perfectly with UNITA's "trust no one" philosophy. Consider Mina integration for: providing succinct proofs of vote tallies, enabling ultra-light mobile verification, or even building UNITA governance as a Mina zkApp. The TypeScript tooling (o1js) enables browser-native ZK.

---

### 2.7 Solana (High-Throughput Voting)

**Status:** Mainnet; Firedancer/Frankendancer deploying; Alpenglow upgrade Q1 2026
**Throughput:** 1M+ TPS target (Firedancer); currently ~1,000 TPS (L2-equivalent)

**Key Developments:**
- **Frankendancer (live):** Hybrid client with Firedancer networking + Agave runtime. 207 validators (20.9% of staked SOL) running it as of Oct 2025.
- **Alpenglow (Q1 2026):** Slashes finality from ~12s to ~150ms by moving validator voting off-chain. 99%+ validator approval.
- **Firedancer full client:** Targeting 1M+ TPS with tile-based process isolation

**Limitations:**
- Centralization concerns (high hardware requirements for validators)
- History of network outages
- Monolithic architecture vs. modular design
- SOL token economics and validator economics
- Firedancer still uses only one reference client safety rule (vs Ethereum's multi-client diversity)

**UNITA Fit:** **HIGH-THROUGHPUT OPTION but sovereignty concerns.** Solana's raw throughput and 150ms finality (Alpenglow) make it technically attractive for high-frequency voting. However, UNITA would be a tenant on Solana's chain rather than sovereign. Solana's centralization tendencies and outage history conflict with UNITA's resilience goals. **Best used as:** a deployment target for specific high-throughput use cases (e.g., real-time quadratic funding matching), not the primary governance chain.

---

## 3. Zero-Knowledge Technology

### 3.1 Semaphore Protocol

**Status:** Active development; v4 (Rust implementation); maintained by PSE (Ethereum Foundation)
**Repository:** semaphore-protocol/semaphore

**Overview:**
Semaphore is a zero-knowledge protocol for anonymous signaling on Ethereum. It allows users to prove group membership and send messages (votes, endorsements) without revealing identity, with built-in double-signaling prevention.

**Key Capabilities:**
- Anonymous group membership proofs
- Double-signaling prevention (nullifiers)
- Off-chain proof generation, on-chain or off-chain verification
- EVM-compatible (Solidity verifier contracts)
- SemaphoreVoting.sol: ready-to-use anonymous poll creation

**Recent Developments:**
- Semaphore v4 with Rust implementation
- Active boilerplate and tooling updates (Jan 2026)
- Used by World ID (Worldcoin) for proof-of-personhood

**Limitations:**
- Group management requires on-chain transactions (or trusted coordinator)
- Proof generation time increases with group size
- Limited to Merkle-tree-based group structures
- Not designed for complex voting logic (e.g., quadratic voting natively)

**UNITA Fit:** **CRITICAL COMPONENT for anonymous voting.** Semaphore is the most mature, battle-tested protocol for exactly what UNITA needs: proving "I am a verified citizen in jurisdiction X" without revealing which citizen. The double-signaling prevention maps directly to one-person-one-vote enforcement. SemaphoreVoting.sol provides a foundation for UNITA's anonymous poll contracts. UNITA should extend Semaphore for: jurisdiction-based groups, delegation-compatible anonymity, and quadratic vote weight proofs.

---

### 3.2 Proof System Comparison: PLONK vs Groth16 vs STARKs

| Characteristic | Groth16 | PLONK | STARKs |
|---|---|---|---|
| **Proof Size** | ~128 bytes (smallest) | ~KB range | ~100s of KB (largest) |
| **Prover Speed** | Fast for simple circuits | Varies; can be faster with expertise | Slower prover, faster for large circuits |
| **Verifier Speed** | Very fast | Fast | Fast (but larger proof to verify) |
| **Trusted Setup** | Circuit-specific (per-circuit ceremony) | Universal (one setup for all circuits up to size N) | **None** (transparent) |
| **Quantum Resistance** | No (elliptic curves) | No (elliptic curves, unless FRI-based) | **Yes** (hash-based) |
| **Maturity** | Very mature (Zcash, etc.) | Mature (Aztec, many zkEVMs) | Growing (StarkNet, SP1) |
| **Recursion** | Possible but complex | Good support | Excellent (natural for recursive proofs) |

**UNITA Recommendation:**
- **For on-chain vote verification:** PLONK (universal setup avoids per-election trusted ceremonies) or Groth16 (smallest proofs, cheapest on-chain verification)
- **For long-term security / quantum resistance:** STARKs, especially as post-quantum concerns grow
- **Pragmatic choice:** PLONK with FRI commitments (PLONK + STARK-like security without trusted setup) -- this is the direction SP1 Hypercube and modern zkVMs are taking

---

### 3.3 Circom / snarkjs Toolchain

**Status:** Mature, widely used; the "standard" ZK circuit development toolkit
**Languages:** Circom (circuit DSL) + snarkjs (JavaScript proof generation/verification)

**Overview:**
Circom is a domain-specific language for defining arithmetic circuits. snarkjs generates and verifies ZK proofs (supports Groth16, PLONK, FFLONK). This toolchain powers Semaphore, Tornado Cash, and many identity protocols.

**Strengths:**
- Most documentation and tutorials available
- TypeScript/JavaScript integration (browser-friendly)
- Supports both Groth16 and PLONK backends
- Powers the most widely-deployed ZK applications
- Proven security track record

**Limitations:**
- Circom is low-level: requires understanding arithmetic circuits
- Compilation can be slow for large circuits
- Limited expressiveness compared to higher-level languages
- Debugging is difficult

**UNITA Fit:** **RECOMMENDED for identity verification circuits.** Circom/snarkjs is the proven choice for building the ZK circuits that verify national ID signatures (DNIe, eIDAS, Aadhaar) and generate anonymous proofs. The JavaScript integration enables in-browser proof generation for UNITA's web client. Use Circom for: ID verification circuits, Semaphore group management, and "Proof of Instruction" (proving engagement with the Ijtihad AI).

---

### 3.4 Noir (Aztec)

**Status:** Approaching 1.0; Aztec Ignition Chain live (Nov 2025); 185+ operators, 3,400+ sequencers
**Language:** Rust-like syntax DSL for ZK circuits

**Overview:**
Noir is a Rust-based DSL for creating and verifying zero-knowledge proofs, designed to abstract away cryptographic complexity. It is backend-agnostic: defaults to Aztec's Barretenberg but supports PLONK-based and R1CS backends.

**Key Strengths:**
- Rust-like syntax dramatically lowers learning curve vs Circom
- Backend-agnostic (ACIR intermediate representation)
- NoirJS enables browser-based proof generation
- Codebase reduction: projects report 10x less code vs Halo2
- Growing ecosystem: Payy rewrote entire ZK architecture from Halo2 to Noir

**UNITA Fit:** **STRONG CANDIDATE for higher-level ZK development.** As UNITA's ZK circuits grow in complexity (quadratic voting proofs, delegation chain verification, equilibrium budget proofs), Noir's higher-level abstractions will accelerate development. Recommended for: complex voting logic circuits, economic modeling proofs, and any circuit where developer productivity matters more than micro-optimization.

---

### 3.5 ZoKrates

**Status:** Active, mature
**Language:** Python-like DSL for zkSNARKs

**Overview:**
ZoKrates provides a high-level programming language, compiler, and toolbox for zkSNARKs. It is more developer-friendly than Circom with fewer lines of code needed, though less performant.

**UNITA Fit:** **PROTOTYPING TOOL.** Use ZoKrates for rapid prototyping of ZK circuits during UNITA's design phase. Transition to Circom or Noir for production circuits.

---

### 3.6 SP1 (Succinct) and RISC Zero (zkVMs)

#### SP1 (Succinct)

**Status:** Production-ready; SP1 Hypercube released (2025)
**Architecture:** zkVM proving correct execution of RISC-V programs

**Key Achievements:**
- **SP1 Hypercube:** Proved Ethereum block (143 txns, 32M gas) in 10.8 seconds with 16 GPUs
- First hash-based zkVM to eliminate proximity gap conjectures
- 4-28x faster than RISC Zero on blockchain workloads
- Formally verified RISC-V constraints (with Nethermind + Ethereum Foundation)
- GPU acceleration (CUDA + Metal)
- Precompiles for keccak256, sha256, secp256k1, ed25519, bn254, bls12-381

**UNITA Fit:** **POWERFUL for general-purpose ZK proofs.** SP1 lets UNITA write ZK logic in Rust (compiled to RISC-V) without learning circuit-specific languages. Use cases: proving correct execution of economic impact simulations, verifying AI analysis integrity, generating proofs of complex delegation chain computations.

#### RISC Zero

**Status:** Production; R0VM 2.0 released; Bonsai proving service available
**Architecture:** RISC-V zkVM with STARK-based proofs

**Key Capabilities:**
- Write ZK programs in Rust, C, or C++
- Bonsai: cloud proving service for outsourced proof generation
- GPU acceleration (CUDA, Metal)
- Continuations for parallel proving of large programs

**UNITA Fit:** **ALTERNATIVE to SP1 with Bonsai advantage.** RISC Zero's Bonsai service could serve as UNITA's delegated proving infrastructure, allowing mobile users to outsource proof generation to a decentralized prover network. SP1 is faster per benchmark, but RISC Zero's Bonsai model may be more practical for UNITA's resource-constrained mobile users.

---

### 3.7 Polygon zkEVM

**Status:** Type 1 prover achieved; mainnet beta sunsetting in 2026; ZisK spun off
**Cost:** $0.002-$0.003 per transaction for Ethereum mainnet block proofs

**Overview:**
Polygon's zkEVM prover can generate ZK proofs for any EVM chain at Type 1 compatibility (full Ethereum equivalence). Open source under MIT/Apache 2.0.

**Key Development:**
- Type 1 prover: no modifications to Ethereum needed for proof generation
- 36x faster than any other Type 1 prover
- Expected 30-50x further cost reduction with Plonky3 improvements
- Polygon zkEVM Mainnet Beta being deprecated in 2026; transitioning to AggLayer

**UNITA Fit:** **RELEVANT if UNITA deploys EVM contracts.** The Type 1 prover could ZK-prove UNITA's Ethereum L2 verification contracts. The sunsetting of zkEVM beta and transition to AggLayer suggests architectural changes -- monitor before committing.

---

## 4. Decentralized Identity

### 4.1 W3C DID Core Specification

**Status:** W3C Recommendation (v1.0 since July 2022); v1.1 experimental
**Standard:** https://www.w3.org/TR/did-1.0/

**Overview:**
Decentralized Identifiers (DIDs) are a new type of globally unique identifier that can be used to identify any subject. DIDs are designed to enable the controller of a DID to prove control over it without requiring permission from any centralized registry.

**Key Properties:**
- Globally unique, resolvable identifiers
- Controlled by the identity subject (self-sovereign)
- No central registration authority required
- Multiple DID methods for different use cases (did:key, did:web, did:ethr, did:pkh, etc.)
- DID Documents contain public keys, service endpoints, and authentication methods

**UNITA Fit:** **FOUNDATIONAL STANDARD.** All UNITA identities should be DID-compliant. This ensures interoperability with the broader identity ecosystem, EU eIDAS wallets, and other governance platforms. Use `did:key` for lightweight peer identities, `did:ethr` or `did:pkh` for blockchain-anchored identities, and potentially a custom `did:unita` method for governance-specific features.

---

### 4.2 Verifiable Credentials Data Model v2.0

**Status:** W3C Recommendation (published May 15, 2025)
**Standard:** https://www.w3.org/TR/vc-data-model-2.0/

**Overview:**
Verifiable Credentials (VCs) provide a standard way to express credentials (claims about a subject) that are cryptographically verifiable. The three-party model involves Issuers, Holders, and Verifiers.

**Key Properties:**
- Tamper-evident credential format
- JSON-LD based with standard vocabulary
- Supports multiple proof mechanisms (JWS, Data Integrity, etc.)
- Selective disclosure capability
- BBS+ signatures for zero-knowledge presentations (VC-DI-BBS still Candidate Recommendation)

**UNITA Fit:** **ESSENTIAL for credential exchange.** UNITA should use VCs for:
1. **Citizenship credentials:** "This person is a verified citizen of jurisdiction X" (issued by UNITA identity bridges)
2. **Arete reputation:** "This person has earned X reputation points" (issued by UNITA governance)
3. **Delegation credentials:** "This person has delegated their vote to Y on topic Z"
4. **Proof-of-Instruction:** "This person engaged with the Ijtihad AI for N minutes"
The VC-DI-BBS specification for ZK-compatible selective disclosure is particularly important -- it enables presenting citizenship credentials without revealing specific personal data.

---

### 4.3 EU eIDAS 2.0 Digital Identity Wallet

**Status:** Implementation in progress; 7 new implementing regulations adopted July 2025; wallet availability deadline November 21, 2026
**Scope:** All EU member states must provide certified digital identity wallets

**Key Timeline:**
- Core trust services in place by end of 2025
- **November 21, 2026:** All EU governments must offer at least one certified wallet
- **November 21, 2027:** Businesses must accept wallets for customer authentication
- Countries already deploying: Austria, France, Italy, Belgium, Poland
- Countries developing: Germany, Finland, Spain (piloting age-assurance)

**Key Features:**
- Data stored locally on device (privacy by design)
- Privacy dashboard for transparency on data sharing
- Integration with existing national eID schemes
- Free e-signatures for non-professional use
- Cross-border recognition across all EU member states

**UNITA Fit:** **CRITICAL integration target for European adoption.** By November 2026, hundreds of millions of EU citizens will have government-issued digital identity wallets. UNITA must integrate with eIDAS 2.0 wallets to:
1. Verify citizenship for jurisdiction-based voting without storing personal data
2. Enable one-person-one-vote enforcement using government-issued credentials
3. Bridge government identity to ZK-anonymous voting proofs
4. Provide a "National ID Bridge" that works across all EU member states simultaneously

This is the most realistic path to mass adoption for UNITA in Europe. The ZK bridge works as follows: User presents eIDAS credential to local UNITA client -> client generates ZK proof of citizenship -> proof is submitted on-chain without revealing identity.

---

### 4.4 Polygon ID / Privado ID / Iden3

**Status:** Active development; rebranded to "Billions Network & Privado ID"; recent commits Jan 2026
**Technology:** Iden3 protocol + Circom ZK toolkit

**Overview:**
Privado ID (formerly Polygon ID) is a self-sovereign identity platform using zero-knowledge proofs for privacy-preserving credential verification. Built on the Iden3 protocol with the Circom ZK toolkit.

**Key Capabilities:**
- Private by default: ZK proofs for credential verification
- On-chain and off-chain verification
- Permissionless attestation
- DID-based identity (did:polygonid method)
- Cross-chain credential verification
- Active development with recent 2026 commits

**UNITA Fit:** **STRONG CANDIDATE for ZK identity infrastructure.** Privado ID's Circom-based ZK credential verification is directly applicable to UNITA. The existing infrastructure for DID creation, credential issuance, and ZK verification could accelerate UNITA's development. Consider using Iden3's circuit libraries for building UNITA's identity verification layer rather than building from scratch.

---

### 4.5 Worldcoin / World ID

**Status:** Active global expansion; Orb Mini expected 2026; 7,500 Orbs in US by end 2025
**Technology:** Iris biometrics + ZK proofs (Semaphore-based)

**Overview:**
World ID provides proof-of-personhood through iris biometric scanning with a custom device (the Orb). The iris code is generated on-device; the original biometric is destroyed. ZK proofs (based on Semaphore) allow proving uniqueness without revealing identity.

**Key Properties:**
- Biometric proof of unique personhood
- Privacy-preserving: ZK proofs, biometric data destroyed on-device
- Targeting 100M+ users via Orb Mini (2026)
- Growing partnerships (Razer, Match Group)
- Southeast Asia expansion (Philippines, Indonesia, Thailand)

**Limitations:**
- Requires physical Orb hardware (centralized manufacturing)
- Privacy concerns despite ZK claims (iris data collection)
- Regulatory challenges in multiple jurisdictions (banned/restricted in some countries)
- Single-vendor dependency
- Centralization of the Orb network

**UNITA Fit:** **INTEGRATION OPTION for proof-of-personhood, but NOT primary identity.** World ID could serve as one of multiple identity verification paths in UNITA, particularly for users without government-issued digital IDs. However, UNITA should not depend on a single vendor's biometric hardware. Treat World ID as one identity provider among many (alongside eIDAS, AnonAadhaar, national eID bridges). The Semaphore-based ZK architecture makes integration straightforward.

---

### 4.6 Zupass (Proof-Carrying Data)

**Status:** Active development by 0xPARC / Zuzalu community
**Architecture:** Wallet for Proof-Carrying Data (PCD) management

**Overview:**
Zupass is a platform for storing and managing Proof-Carrying Data -- any data whose well-formedness and validity are cryptographically verifiable. Originally Zuzalu's digital passport, it has evolved into a general PCD wallet.

**Key Capabilities:**
- Storage for ZK proofs, signatures, Merkle proofs
- Anonymous group membership proofs (based on Semaphore)
- Composable proofs (prove N degrees of separation, event attendance, group membership)
- Web-based wallet interface
- POD (Provable Object Data) format for structured verifiable data

**UNITA Fit:** **INSPIRATION for UNITA's credential wallet.** Zupass's PCD model is compelling for UNITA: users could store their citizenship proofs, delegation credentials, Arete reputation proofs, and vote receipts in a Zupass-compatible wallet. The composability model (prove "I am a citizen AND I engaged with Ijtihad AI AND I have >50 Arete score") directly maps to UNITA's multi-factor voting eligibility system.

---

### 4.7 AnonAadhaar

**Status:** Active; maintained by Privacy & Scaling Explorations (Ethereum Foundation)
**Technology:** ZK circuits for Aadhaar (India) identity verification

**Overview:**
AnonAadhaar is a ZK protocol allowing India's Aadhaar ID holders to prove identity attributes (age, state, gender) without revealing their full identity. Proofs are generated client-side (browser/mobile) and can be verified on EVM chains.

**Key Properties:**
- Client-side proof generation (no server-side data exposure)
- Selective disclosure of Aadhaar attributes
- EVM-compatible on-chain verification
- React SDK for easy integration

**UNITA Fit:** **ESSENTIAL for Indian citizen participation.** India has 1.4 billion people with Aadhaar. AnonAadhaar provides an immediate path for Indian citizens to join UNITA with privacy-preserving identity verification. This directly implements UNITA's "National ID Bridge" concept for India. The React SDK enables quick integration into UNITA's web client.

---

## 5. UNITA Architecture Recommendations

### 5.1 Recommended Technology Stack

Based on the comprehensive evaluation above, here is the recommended architecture for UNITA:

```
+---------------------------------------------------------------+
|                     UNITA Architecture                         |
+---------------------------------------------------------------+
|                                                                |
|  CLIENT LAYER (Browser / Mobile)                               |
|  +----------------------------------------------------------+ |
|  | Helia (IPFS) | Waku Light | Gun.js   | ZK Proof Gen      | |
|  | (Documents)  | (Messages) | (Local)  | (Circom/snarkjs)  | |
|  +----------------------------------------------------------+ |
|                                                                |
|  P2P NETWORKING LAYER                                          |
|  +----------------------------------------------------------+ |
|  | libp2p (Transport)                                        | |
|  |   +-- GossipSub (Proposal/Vote propagation)              | |
|  |   +-- Waku Relay (Private messaging & notifications)     | |
|  |   +-- Kademlia DHT (Peer discovery)                      | |
|  +----------------------------------------------------------+ |
|                                                                |
|  IDENTITY LAYER                                                |
|  +----------------------------------------------------------+ |
|  | W3C DIDs + Verifiable Credentials v2.0                    | |
|  |   +-- eIDAS 2.0 Bridge (EU citizens)                     | |
|  |   +-- AnonAadhaar Bridge (India)                         | |
|  |   +-- World ID Bridge (global fallback)                  | |
|  |   +-- Privado ID / Iden3 (ZK credential verification)    | |
|  |   +-- Semaphore (Anonymous group membership)              | |
|  +----------------------------------------------------------+ |
|                                                                |
|  GOVERNANCE CHAIN (Substrate / Polkadot)                       |
|  +----------------------------------------------------------+ |
|  | Custom Pallets:                                           | |
|  |   +-- pallet-unita-voting (quadratic, liquid delegation)  | |
|  |   +-- pallet-equilibrium (zero-sum budgeting)             | |
|  |   +-- pallet-arete (reputation system)                    | |
|  |   +-- pallet-semaphore (ZK vote verification)             | |
|  | Data Availability: Celestia or Avail                      | |
|  | Interop: XCM (Polkadot) + IBC Eureka (Cosmos/Ethereum)   | |
|  +----------------------------------------------------------+ |
|                                                                |
|  STORAGE LAYER                                                 |
|  +----------------------------------------------------------+ |
|  | IPFS + Filecoin (Proposals, AI reports, media)            | |
|  | Hypercore (Append-only vote audit logs)                   | |
|  +----------------------------------------------------------+ |
|                                                                |
|  ZK PROOF LAYER                                                |
|  +----------------------------------------------------------+ |
|  | Circom/snarkjs (ID verification circuits)                 | |
|  | Noir (Complex voting logic circuits)                      | |
|  | SP1 zkVM (General-purpose provable computation)           | |
|  | Semaphore (Anonymous voting proofs)                       | |
|  +----------------------------------------------------------+ |
|                                                                |
|  AI ORACLE LAYER                                               |
|  +----------------------------------------------------------+ |
|  | Decentralized LLM Gateways (Ijtihad AI)                  | |
|  | Economic Modeling Agents (Equilibrium Simulator)          | |
|  | SP1 proofs of AI analysis integrity                       | |
|  +----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

### 5.2 Key Architectural Decisions

#### Decision 1: Governance Chain -- Substrate/Polkadot (Primary) with IBC Bridge

**Rationale:** Substrate's built-in democracy pallets, forkless upgrades, and FRAME modularity provide the strongest foundation for a governance-specific blockchain. Agile Coretime eliminates the massive upfront capital that parachain slots previously required. Elastic Scaling provides throughput headroom. XCM enables ecosystem interoperability.

**Alternative Considered:** Cosmos SDK -- viable if the team has stronger Go expertise. The IBC Eureka bridge to Ethereum is compelling. Cosmos gives more sovereignty (no relay chain dependency).

**Risk Mitigation:** Build an IBC bridge to Cosmos/Ethereum ecosystems for identity credential portability.

#### Decision 2: Messaging -- Waku (Primary) + GossipSub (Secondary)

**Rationale:** Waku's privacy-first design with RLN spam protection is purpose-built for UNITA's messaging needs. GossipSub handles public topic propagation (proposal broadcasts, tally updates). The combination provides both private (delegation alerts, DMs) and public (proposal feeds) communication.

#### Decision 3: Identity -- Multi-Bridge with Semaphore Anonymous Layer

**Rationale:** No single identity system covers the global population. UNITA must support multiple identity bridges (eIDAS for EU, AnonAadhaar for India, World ID for global coverage). Semaphore provides the anonymous layer on top: regardless of which bridge verified your identity, you join the same Semaphore group and vote anonymously.

#### Decision 4: ZK Toolchain -- Circom for Identity + Noir for Complex Logic + SP1 for General Proofs

**Rationale:** Circom/snarkjs is the proven choice for identity circuits (used by Semaphore, AnonAadhaar, Privado ID). Noir's higher-level abstractions accelerate development of complex voting circuits (quadratic proofs, delegation chain verification). SP1's zkVM handles general-purpose provable computation (AI analysis integrity, economic model verification).

#### Decision 5: Storage -- IPFS/Filecoin + Hypercore

**Rationale:** IPFS provides content-addressed, tamper-evident storage for proposal documents and AI reports. Filecoin ensures persistence. Hypercore's append-only log is ideal for immutable vote audit trails.

### 5.3 UNITA-Specific Technology Gaps

The following needs are not fully addressed by any existing technology and require custom development:

1. **Liquid Delegation with ZK Privacy:** No existing system supports delegated voting where the delegation graph is private (you can delegate to an expert without anyone knowing who you delegated to). Requires custom Semaphore extensions.

2. **Proof of Instruction (Ijtihad Engagement):** The concept of proving a user engaged with an AI debate for a minimum duration before voting is novel. Requires a custom circuit that verifies a timestamped interaction transcript.

3. **Zero-Sum Budget Voting:** Enforcing that vote allocations sum to exactly 100% across resource categories requires custom on-chain logic (pallet-equilibrium) with corresponding ZK circuits.

4. **Arete Reputation with Privacy:** Reputation that accrues from "responsible abstention" and "admitting error" while remaining pseudonymous is a novel design challenge.

5. **Cross-Jurisdiction Vote Aggregation:** Aggregating votes from local to global levels while respecting jurisdiction boundaries and maintaining anonymity requires careful Semaphore group hierarchy design.

6. **MACI (Minimum Anti-Collusion Infrastructure) Integration:** Preventing vote buying and coercion in a liquid democracy context requires extending MACI for delegation-aware anti-collusion.

### 5.4 Development Phasing

**Phase 1 (Foundation):** libp2p networking + Semaphore identity groups + Substrate chain with basic voting pallet + IPFS proposal storage

**Phase 2 (Identity Bridges):** eIDAS 2.0 integration (aligned with Nov 2026 deadline) + AnonAadhaar + W3C VC credential issuance

**Phase 3 (Advanced Governance):** Liquid delegation + Quadratic voting + Equilibrium budget module + Noir circuits for complex proofs

**Phase 4 (AI Integration):** Ijtihad AI oracles + Proof of Instruction + Economic modeling + SP1 provable AI analysis

**Phase 5 (Global Scale):** Multi-chain bridges (IBC Eureka) + Celestia/Avail DA scaling + Mina succinct verification + Cross-jurisdiction aggregation

---

## 6. Sources

### P2P Protocols
- [Waku Official Site](https://waku.org/)
- [Waku Documentation](https://docs.waku.org/)
- [Waku Monthly Update - June 2025](https://blog.waku.org/waku-monthly-update-june-2025/)
- [Waku 2024 Year in Review](https://blog.waku.org/waku-2024-year-in-review/)
- [libp2p Official Site](https://libp2p.io/)
- [rust-libp2p GitHub](https://github.com/libp2p/rust-libp2p)
- [libp2p March 2025 Newsletter](https://blog.libp2p.io/newsletters/2025/03/)
- [GossipSub Specification](https://github.com/libp2p/specs/tree/master/pubsub/gossipsub)
- [GossipSub v2.0 Proposal](https://github.com/libp2p/specs/pull/653)
- [Nostr Official Site](https://nostr.com/)
- [Nostr Overview and Statistics (Oct 2025)](https://www.glukhov.org/post/2025/10/nostr-overview-and-statistics/)
- [AT Protocol Federation Architecture](https://docs.bsky.app/docs/advanced-guides/federation-architecture)
- [Bluesky 2025 Protocol Roadmap](https://docs.bsky.app/blog/2025-protocol-roadmap-spring)
- [AT Protocol Wikipedia](https://en.wikipedia.org/wiki/AT_Protocol)
- [Gun.js Official Site](https://gun.eco/)
- [OrbitDB GitHub](https://github.com/orbitdb/orbitdb)
- [Holepunch / Pear Runtime](https://docs.pears.com/)
- [IPFS Helia GitHub](https://github.com/ipfs/helia)
- [Filecoin Onchain Cloud](https://filecoin.io/blog/posts/introducing-filecoin-onchain-cloud-verifiable-developer-owned-infrastructure/)
- [Filecoin Foundation December 2025](https://fil.org/blog/fresh-from-ff-december-2025)

### Blockchain and Consensus
- [Polkadot SDK Introduction](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk)
- [Polkadot Upgrade 2025](https://www.parity.io/blog/polkadot-upgrade-2025-what-you-need-to-know)
- [Polkadot 2025-26 Milestones](https://onekey.so/blog/ecosystem/whats-next-for-polkadot-upcoming-upgrades-and-milestones-for-202526/)
- [Cosmos Stack 2026 Roadmap](https://www.cosmoslabs.io/blog/the-cosmos-stack-roadmap-2026)
- [IBC v2 Eureka Announcement](https://ibcprotocol.dev/blog/ibc-v2-announcement)
- [Cosmos Q1 2025 Roadmap Update](https://www.cosmoslabs.io/blog/q1-2025-roadmap-update-for-the-cosmos-stack)
- [Celestia Official Site](https://celestia.org/)
- [Celestia 2025 Milestones and Road to 1GB Blockspace](https://medium.com/krews/celestia-in-2025-milestones-and-the-road-to-1gb-blockspace-6a41faac9e81)
- [Avail DA Official Site](https://availproject.org/da)
- [Mina Protocol Official Site](https://minaprotocol.com/)
- [Mina 2025 Recap](https://minaprotocol.com/blog/2025-mina-recap)
- [Mina Roadmap](https://minaprotocol.com/roadmap)
- [2026 Layer 2 Outlook - The Block](https://www.theblock.co/post/383329/2026-layer-2-outlook)
- [Ethereum L2 Consolidation Analysis](https://cryptonews.com/news/most-ethereum-l2s-may-not-survive-2026-as-base-arbitrum-optimism-tighten-grip-21shares/)
- [Solana Firedancer Deep Dive](https://www.blockdaemon.com/blog/solanas-firedancer-validator-client-deep-dive)
- [Solana Alpenglow Upgrade](https://bingx.com/en/learn/article/what-are-alpenglow-and-firedancer-upgrades-on-solana-and-will-boost-speed-100x)

### Zero-Knowledge Technology
- [Semaphore Protocol](https://semaphore.pse.dev/)
- [Semaphore Documentation](https://docs.semaphore.pse.dev/)
- [Semaphore GitHub](https://github.com/semaphore-protocol/semaphore)
- [PLONK vs Groth16 Comparison](https://medium.com/@mehialiabadi/plonk-vs-groth16-50254c157196)
- [ZK Proof Frameworks Survey (arXiv 2025)](https://arxiv.org/html/2502.07063v1)
- [zk-SNARKs vs zk-STARKs Guide](https://www.cyfrin.io/blog/a-full-comparison-what-are-zk-snarks-and-zk-starks)
- [Noir 1.0 Pre-Release Announcement](https://aztec.network/blog/the-future-of-zk-development-is-here-announcing-the-noir-1-0-pre-release)
- [Noir Documentation](https://noir-lang.org/docs/)
- [Aztec Ignition Chain](https://aztec.network/)
- [SP1 Hypercube - Real-Time Proving](https://blog.succinct.xyz/real-time-proving-16-gpus/)
- [SP1 GitHub](https://github.com/succinctlabs/sp1)
- [RISC Zero Official Site](https://risczero.com/)
- [RISC Zero GitHub](https://github.com/risc0/risc0)
- [Circom ZK Proofs Tutorial](https://zkplabs.network/blog/Zero-Knowledge-Proofs-with-Circom-A-domain-specific-language-purpose)
- [ZK Authentication with Circom/snarkjs](https://cyberpath.net/zk-authentication-build-bulletproof-zero-knowledge-authentication-6-easy-steps-2025/)
- [Polygon zkEVM Type 1 Prover](https://polygon.technology/blog/upgrade-every-evm-chain-to-zk-introducing-the-type-1-prover)
- [Polygon zkEVM Sunsetting](https://forum.polygon.technology/t/sunsetting-polygon-zkevm-mainnet-beta-in-2026/21020)

### Decentralized Identity
- [W3C DID Core v1.0](https://www.w3.org/TR/did-1.0/)
- [W3C DID Core v1.1 (Experimental)](https://www.w3.org/TR/did-1.1/)
- [W3C Verifiable Credentials v2.0](https://www.w3.org/TR/vc-data-model-2.0/)
- [W3C VC 2.0 Press Release (May 2025)](https://www.w3.org/press-releases/2025/verifiable-credentials-2-0/)
- [eIDAS 2.0 Official Updates](https://www.european-digital-identity-regulation.com/)
- [EUDI Wallet 2026 Impact](https://www.partisia.com/blog/eudi-wallet-2026-what-it-means-for-eu-digital-identity)
- [eIDAS 2.0 Compliance Requirements](https://yousign.com/blog/eidas-2-0-digital-identity-wallet-compliance-requirements)
- [Privado ID / Polygon ID GitHub](https://github.com/0xPolygonID)
- [Iden3 Official Site](https://iden3.io/)
- [World ID Whitepaper](https://whitepaper.world.org/)
- [World ID Proof of Personhood](https://world.org/blog/world/proof-of-personhood-what-it-is-why-its-needed)
- [World Southeast Asia Expansion](https://www.biometricupdate.com/202502/world-expands-in-southeast-asia-as-global-proof-of-personhood-push-continues)
- [Zupass GitHub](https://github.com/proofcarryingdata/zupass)
- [AnonAadhaar Official Site](https://anon-aadhaar.pse.dev/)
- [AnonAadhaar GitHub](https://github.com/anon-aadhaar/anon-aadhaar)

### Blockchain Voting Research
- [DemocracyGuard: Blockchain-based Secure Voting (2025)](https://onlinelibrary.wiley.com/doi/10.1111/exsy.13694)
- [Democratic Innovation: Blockchain E-Voting Evaluation 2022-2025](https://www.mdpi.com/2227-7080/14/2/95)
- [Blockchain Voting: Theory to Ballots](https://cryptorank.io/news/feed/0122c-democracys-next-upgrade-how-blockchain-is-finally-moving-from-theory-to-ballots)

---

*Report generated 2026-02-06. Technology landscape changes rapidly; verify current status of all technologies before architectural commitments.*
