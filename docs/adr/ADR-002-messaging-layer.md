# ADR-002: Messaging Layer — Matrix Primary + libp2p/RLN Privacy Channel

## Status: Accepted

## Date: 2026-02-06

## Context

ADR-001 selected Waku Relay as the primary P2P messaging layer for UNITA. After deep analysis of project health, ecosystem maturity, and architectural fit, this decision is being revised.

### Key findings that triggered this revision:

1. **Waku project risks**: Core team of 3-5 engineers, crypto-treasury (SNT) funding dependency, active rebranding from Waku → Logos Messaging (waku.org now redirects to logos.co), no deployment beyond ~10K users
2. **Matrix proven at scale**: 115M+ accounts, 10K+ federated servers, 25+ government deployments (Bundeswehr 100K+ users, NATO, EU Commission, French government)
3. **Matrix rooms are typed JSON event DAGs**: Custom event types are first-class — this maps directly to governance objects (proposals, votes, delegations) without building a separate data layer
4. **Waku IS libp2p + GossipSub + custom protocols + RLN**: The valuable primitives (libp2p, RLN) are independently maintained and can be used without the Waku wrapper
5. **RLN is standalone**: The [Rate-Limiting-Nullifier](https://github.com/Rate-Limiting-Nullifier) organization maintains independent libraries (rlnjs, rln-circuits, rln-contract, noir-rln)

## Decision

### Primary Layer: Matrix Protocol
**For**: Deliberation, proposals, delegation management, notifications, social feed, governance data replication

**Rationale**:
- Custom event types (`org.unita.proposal`, `org.unita.vote`, `org.unita.delegation`) as structured JSON in room DAGs
- Federation provides decentralized state replication without blockchain
- [Matrix Rust SDK](https://github.com/matrix-org/matrix-rust-sdk) production-ready with UniFFI bindings (iOS/Android/desktop/web)
- [Tuwunel](https://github.com/matrix-construct/tuwunel) (Swiss government-backed Rust homeserver) and [Continuwuity](https://github.com/continuwuity/continuwuity) for lightweight community governance nodes
- Sliding Sync for mobile-first UX
- 28+ bridges (Discord, Telegram, Signal, Slack, IRC, webhooks via Hookshot)
- Power levels map to governance roles (voters, proposers, admins)
- E2E encryption (Megolm/Vodozemac) with MLS and post-quantum on roadmap

### Secondary Layer: libp2p GossipSub + Standalone RLN
**For**: Anonymous metadata-private signaling, censorship-resistant fallback, ZK-based rate limiting

**Rationale**:
- libp2p is the standard P2P networking stack (used by IPFS, Ethereum, Polkadot/Substrate)
- GossipSub v1.1 provides pub/sub with peer scoring
- RLN provides ZK-proof-based rate limiting independent of any messaging protocol
- No dependency on Waku/Logos project health or roadmap
- Used only for channels requiring metadata privacy (anonymous vote notifications, ZK-proof signaling)

### NOT using: Waku directly
**Waku is libp2p + application protocols**. Rather than depending on the Waku project, we use the underlying primitives:
- libp2p for transport, discovery, GossipSub
- Standalone RLN libraries for ZK rate limiting
- Custom protocol handlers where needed

This eliminates the Waku project dependency while preserving all technical benefits.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    UNITA Messaging Architecture               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │          Matrix Federation (PRIMARY)                 │     │
│  │                                                       │     │
│  │  Deliberation Rooms ─── Custom Event Types           │     │
│  │  Proposal Lifecycle ─── org.unita.proposal           │     │
│  │  Delegation Mgmt ────── org.unita.delegation         │     │
│  │  Social Feed ─────────── org.unita.social            │     │
│  │  Notifications ───────── org.unita.alert             │     │
│  │                                                       │     │
│  │  Homeservers: Tuwunel / Continuwuity (Rust)          │     │
│  │  SDK: matrix-rust-sdk + UniFFI bindings              │     │
│  │  Bridges: Discord, Telegram, Signal, webhooks        │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │     libp2p + RLN Privacy Channel (SECONDARY)        │     │
│  │                                                       │     │
│  │  Anonymous Vote Notifications                        │     │
│  │  ZK-Proof Signaling                                  │     │
│  │  Censorship-Resistant Fallback                       │     │
│  │                                                       │     │
│  │  Transport: libp2p GossipSub v1.1                    │     │
│  │  Spam Protection: Standalone RLN (ZK rate limiting)  │     │
│  │  Discovery: libp2p discv5 / DHT                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │     Nostr (PUBLIC social transparency)               │     │
│  │                                                       │     │
│  │  Public delegation announcements                     │     │
│  │  Transparency feeds                                  │     │
│  │  Lightning/Zaps micro-incentives                     │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│  Voting Layer (separate — NOT messaging)                      │
│  MACI + Semaphore + DAVINCI on Substrate                     │
└──────────────────────────────────────────────────────────────┘
```

## Custom Matrix Event Types for Governance

| Governance Concept | Matrix Event Type | Category |
|---|---|---|
| Proposal submission | `org.unita.proposal` | Timeline event |
| Proposal status | `org.unita.proposal.status` | State event (key: proposal ID) |
| Vote notification | `org.unita.vote.notification` | Timeline event |
| Delegation assignment | `org.unita.delegation` | State event (key: delegator ID) |
| Deliberation brief | `org.unita.deliberation` | Timeline event |
| Constitutional check | `org.unita.constitutional.check` | Timeline event |
| Governance config | `org.unita.config` | State event |

## Waku Forkability Assessment

If UNITA ever needs Waku-specific features (Store protocol, Filter, LightPush):
- **License**: Apache-2.0 OR MIT (dual) — fully permissive, no copyleft
- **Best fork target**: go-waku (1,169 commits, Go, 98.8% Go code)
- **Effort to fork**: 1-2 weeks to strip and maintain
- **Effort to build equivalent on raw libp2p**: 2-4 weeks for pub/sub + RLN; 3-6 months for full equivalent
- **Current assessment**: Fork not needed. libp2p + standalone RLN covers our requirements.

## Consequences

### Positive
- Production-proven infrastructure (Matrix) as primary layer
- Custom event types give us structured governance data replication for free
- Massive developer ecosystem (Rust SDK, multiple clients, 28+ bridges)
- Lightweight homeservers (Tuwunel, Continuwuity) for community governance nodes
- No dependency on Waku/Logos project health
- libp2p + RLN preserves privacy capabilities where needed
- Same libp2p transport used by Substrate (our chain) and IPFS (our storage)

### Negative
- Matrix federation leaks metadata (who, when, which server) — mitigated by libp2p channel for anonymous signaling
- Matrix homeservers require maintenance (mitigated by lightweight Rust implementations)
- No built-in ZK integration in Matrix — must build custom event types + client-side verification
- Two messaging systems increases complexity

### Risks
- Matrix.org Foundation financial sustainability (improving but not fully resolved)
- Sliding Sync performance regression (actively being fixed)
- P2P Matrix still experimental (2-3 years away)
- Extensible Events (MSC1767) not yet in stable spec

### Mitigations
- Hexagonal architecture allows swapping Matrix for any future alternative
- libp2p channel provides censorship-resistant fallback
- Nostr remains as public transparency layer
- All chosen protocols are open source with permissive licenses

## Supersedes
ADR-001 Section "P2P Messaging: Waku Relay" — replaced by this decision.

## References
- [Matrix Specification](https://spec.matrix.org/latest/)
- [Matrix Rust SDK](https://github.com/matrix-org/matrix-rust-sdk)
- [Tuwunel (Rust homeserver)](https://github.com/matrix-construct/tuwunel)
- [Continuwuity (Rust homeserver)](https://github.com/continuwuity/continuwuity)
- [Rate-Limiting-Nullifier (standalone RLN)](https://github.com/Rate-Limiting-Nullifier)
- [libp2p GossipSub v1.1](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md)
- [Matrix Bridges Ecosystem](https://matrix.org/ecosystem/bridges/)
- [Waku vs libp2p comparison](https://docs.waku.org/learn/waku-vs-libp2p)
