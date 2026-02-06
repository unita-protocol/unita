# ADR-001: Core Protocol Selection

## Status: Accepted

## Date: 2026-02-06

## Context

UNITA requires a technology stack that supports:
1. Anonymous, coercion-resistant voting at global scale
2. Decentralized, censorship-resistant communication
3. Self-sovereign identity with national ID integration
4. AI-assisted deliberation with safety guardrails
5. Minimal initial infrastructure (start with GitHub, scale to full P2P)

## Decision

### P2P Messaging: Waku Relay (**SUPERSEDED by [ADR-002](ADR-002-messaging-layer.md)**)

> **This section is superseded.** After deeper analysis of project health, ecosystem maturity, and architectural fit, the messaging layer decision was revised in [ADR-002: Messaging Layer — Matrix Primary + libp2p/RLN Privacy Channel](ADR-002-messaging-layer.md). Matrix is now the primary messaging layer, with libp2p + standalone RLN as the secondary privacy channel. Waku is no longer a direct dependency.

~~**Chosen over**: Matrix, raw libp2p, AT Protocol~~

**Original Rationale** (no longer current):
- Built-in RLN (Rate Limiting Nullifier) for ZK-based DoS protection
- Privacy-by-default design philosophy
- Actively maintained by Status/Logos team
- libp2p-based (standard transport layer)

**Reasons for revision** (see ADR-002):
- Waku project risks: 3-5 core engineers, crypto-treasury funding, rebranding to Logos
- Matrix proven at scale: 115M+ accounts, 25+ government deployments
- Matrix custom event types map directly to governance objects
- RLN is independently maintained — no Waku dependency needed

### Social Layer: Nostr Protocol
**Chosen over**: AT Protocol (Bluesky), Lens Protocol, Farcaster

**Rationale**:
- Simplest possible architecture (clients + relays)
- No corporate control (unlike AT Protocol/Bluesky)
- Cryptographic identity without blockchain dependency
- NIPs allow extensibility (NIP-0A for CRDT contact lists)
- Lightning integration for micro-incentives

**Trade-offs**:
- Smaller user base (21K vs millions)
- No built-in moderation (by design)
- Relay infrastructure dependent on community

### ZK Identity: Semaphore v4
**Chosen over**: custom circuits, WorldID alone, Sismo

**Rationale**:
- Ethereum Foundation backed (PSE team)
- Battle-tested in production
- Clean TypeScript API for group management and proof generation
- Compatible with MACI and Privado ID
- Open source with permissive license

### Anti-Collusion: MACI
**Chosen over**: custom implementation, no anti-collusion

**Rationale**:
- Designed by Vitalik Buterin specifically for voting
- Proven in Gitcoin grants (CLR.fund)
- ZK-SNARK tally verification
- Key-change mechanism for coercion resistance
- Actively maintained with 2025 feature updates

### Blockchain: Substrate
**Chosen over**: Cosmos SDK, Solana, Ethereum L2

**Rationale**:
- Custom pallets for governance-specific logic
- Polkadot parachain option for interoperability
- NPoS consensus (energy efficient)
- Rich governance primitives built-in
- Rust implementation (security + performance)

**Trade-offs**:
- Smaller developer ecosystem than Ethereum
- Steeper learning curve (Rust)
- Parachain slot costs if choosing Polkadot

### Storage: IPFS + Filecoin
**Chosen over**: Arweave, Ceramic, centralized storage

**Rationale**:
- Largest decentralized storage network
- Content-addressing ensures data integrity
- Filecoin deals for guaranteed persistence
- Helia (JS) for browser-native IPFS
- Frontend hosting via IPFS gateways

### AI Safety: NeMo Guardrails
**Chosen over**: Guardrails AI, custom implementation

**Rationale**:
- Open-source with permissive license
- Colang modeling language for custom rules
- Production-grade content safety
- Multilingual support with automatic language detection
- Compatible with any LLM provider

### Voting Protocol: DAVINCI-inspired
**Chosen over**: simple commit-reveal, homomorphic tallying alone

**Rationale**:
- Recursive ZK proofs achieve constant-size verification
- Vocdoni's 4-circuit design is mathematically elegant
- Millions of votes → one small on-chain proof
- Separates execution from verification
- Composable with MACI for anti-collusion

## Consequences

### Positive
- All chosen protocols are open source and community-governed
- Strong privacy guarantees at every layer
- Proven technologies reduce implementation risk
- Modular design allows component replacement
- Standards-based (W3C DID, libp2p) prevents lock-in

### Negative
- Integration complexity of multiple protocols
- Smaller developer pools for some choices (Substrate)
- ZK circuit development requires specialized expertise
- Multi-model AI orchestration adds operational complexity

### Risks
- ~~Waku rebranding may affect community momentum~~ (Mitigated: see ADR-002, Waku dependency removed)
- MACI coordinator centralization needs careful design
- Substrate/Polkadot ecosystem direction uncertainty
- AI model provider API changes or restrictions

## References
- [Vocdoni DAVINCI Whitepaper](https://hackmd.io/@vocdoni/BJY8EXQy1x)
- [MACI Documentation](https://maci.pse.dev/docs/introduction)
- [Semaphore Protocol](https://semaphore.pse.dev/)
- [Waku Documentation](https://docs.waku.org/)
- [Substrate Documentation](https://docs.substrate.io/)
- [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails)
