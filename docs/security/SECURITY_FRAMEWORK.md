# UNITA Security Framework

## Threat Model & Defense Architecture

### 1. Threat Categories

#### 1.1 Identity Attacks
| Threat | Description | Mitigation |
|--------|-------------|------------|
| **Sybil Attack** | Creating fake identities to gain multiple votes | Multi-layer identity: Semaphore groups + national ID ZK bridge + World ID proof-of-personhood |
| **Identity Theft** | Using someone else's credentials to vote | ZK proofs are non-transferable; biometric binding via eIDAS 2.0 EUDI wallet |
| **Credential Forgery** | Forging verifiable credentials | Cryptographic verification against issuer public keys; W3C VC standard |

#### 1.2 Voting Attacks
| Threat | Description | Mitigation |
|--------|-------------|------------|
| **Vote Buying** | Paying voters to vote a certain way | [MACI](https://maci.pse.dev/) encryption: voters can change votes; final vote is encrypted; no receipt to prove how you voted |
| **Coercion** | Forcing voters under threat | MACI's key-change mechanism: voters can privately invalidate coerced votes |
| **Ballot Stuffing** | Submitting multiple votes | Semaphore nullifiers: one signal per identity per scope (mathematically enforced) |
| **Tally Manipulation** | Altering vote counts | DAVINCI-style ZK recursive proofs: aggregated tally is cryptographically verifiable |

#### 1.3 Network Attacks
| Threat | Description | Mitigation |
|--------|-------------|------------|
| **DoS / Spam** | Flooding the network with messages | Standalone RLN (Rate Limiting Nullifier): ZK-based rate limiting on libp2p privacy channel; Matrix server-side rate limiting on federation |
| **Eclipse Attack** | Isolating a peer from the network | Matrix federation (multiple homeservers); libp2p peer diversity requirements |
| **Censorship** | Blocking proposals or votes | Matrix federation: no single point of failure; libp2p+RLN censorship-resistant fallback; Nostr as public backup |
| **Man-in-the-Middle** | Intercepting communications | Matrix E2E encryption (Megolm/Vodozemac); libp2p Noise/TLS; all votes encrypted with MACI |

#### 1.4 AI Attacks
| Threat | Description | Mitigation |
|--------|-------------|------------|
| **Prompt Injection** | Manipulating AI deliberation agents | NeMo Guardrails + input sanitization + Constitutional AI constraints |
| **Model Poisoning** | Corrupting AI training data | Multi-model redundancy (3+ providers); adversarial cross-checking |
| **Coordinated Manipulation** | Using AI bots to sway deliberation | Proof-of-personhood required for all deliberation participation |
| **Deepfake Proposals** | AI-generated misleading proposals | Proposal provenance tracking; human attestation requirements |

#### 1.5 Governance Attacks
| Threat | Description | Mitigation |
|--------|-------------|------------|
| **51% Attack** | Majority takeover of governance | Constitutional supermajority requirements (75%) for fundamental changes |
| **Whale Dominance** | Large stakeholders controlling outcomes | One-person-one-vote for constitutional matters; quadratic voting for resources |
| **Dark DAO** | Secret coordination to manipulate votes | MACI makes coordination unprovable; encrypted ballots prevent verification |
| **Constitutional Hijacking** | Modifying core rights through governance | Part I rights require 75% supermajority + 90-day deliberation + cross-regional approval |

### 2. Defense-in-Depth Architecture

```
┌─────────────────────────────────────────────┐
│  Layer 7: Constitutional Enforcement        │
│  Guardian AI + Human Council + Supermajority │
├─────────────────────────────────────────────┤
│  Layer 6: AI Safety                         │
│  NeMo Guardrails + Multi-model + Red Team   │
├─────────────────────────────────────────────┤
│  Layer 5: Anti-Collusion                    │
│  MACI encrypted ballots + key rotation      │
├─────────────────────────────────────────────┤
│  Layer 4: Sybil Resistance                  │
│  Semaphore + World ID + National ID ZK      │
├─────────────────────────────────────────────┤
│  Layer 3: Cryptographic Privacy             │
│  ZK-SNARKs + end-to-end encryption          │
├─────────────────────────────────────────────┤
│  Layer 2: Network Security                  │
│  Matrix E2E + libp2p/RLN + DoS protection   │
├─────────────────────────────────────────────┤
│  Layer 1: Infrastructure Security           │
│  Open source audit + formal verification    │
└─────────────────────────────────────────────┘
```

### 3. Anti-Hijacking Mechanisms

#### 3.1 Progressive Decentralization
- **Phase 1**: Founding team maintains emergency keys (time-locked, publicly known)
- **Phase 2**: Guardian Council elected (7 members, 3-year terms, revocable)
- **Phase 3**: Full community governance (Guardian Council becomes advisory only)
- **Each phase has public milestones** that trigger automatic transition

#### 3.2 Circuit Breakers
- **Voting Anomaly Detection**: If voting patterns deviate >3 standard deviations from historical norms, voting is paused for 24h review
- **AI Drift Detection**: If AI deliberation outputs diverge significantly between providers, flagged for human review
- **Economic Circuit Breaker**: If a proposal would commit >10% of available resources, requires extended deliberation period

#### 3.3 Cryptographic Guarantees
| Property | Mechanism |
|----------|-----------|
| **Ballot secrecy** | MACI encryption + ZK proofs |
| **Vote integrity** | Recursive ZK proof aggregation (DAVINCI) |
| **Identity privacy** | Semaphore nullifiers |
| **Coercion resistance** | MACI key-change mechanism |
| **Audit trail** | Event sourcing on immutable ledger |
| **Data sovereignty** | Local-first storage + IPFS pinning |

### 4. Incident Response

#### 4.1 Severity Levels
- **CRITICAL**: Constitutional violation or identity system compromise → 72h emergency pause
- **HIGH**: AI manipulation or voting anomaly detected → 24h review period
- **MEDIUM**: Network degradation or single-provider failure → Automatic failover
- **LOW**: UI bug or minor service disruption → Community fix process

#### 4.2 Response Protocol
1. **Detect** → Automated monitoring + community reporting
2. **Classify** → Severity assignment by Guardian Council
3. **Contain** → Pause affected subsystem (minimum scope)
4. **Investigate** → Public investigation with community participation
5. **Resolve** → Fix, audit, deploy with rollback plan
6. **Report** → Public post-mortem within 7 days

### 5. Audit Requirements

- All ZK circuits: formal verification + third-party audit before deployment
- All smart contracts: minimum 2 independent audits + bug bounty program
- AI system prompts: quarterly community review
- Cryptographic primitives: use only battle-tested libraries (snarkjs, circom)
- Penetration testing: annual third-party security assessment

### 6. EU AI Act Compliance Roadmap

UNITA's governance AI likely qualifies as a **high-risk AI system** under Annex III (democratic processes category). Full application: **August 2, 2026**.

| Requirement | EU AI Act Article | UNITA Implementation | Deadline |
|------------|------------------|---------------------|----------|
| AI Literacy | Art. 4 | User education before voting (Proof of Instruction) | Now |
| Prohibited Practices | Art. 5 | No subliminal manipulation, social scoring, or exploitation | Now |
| High-Risk Classification | Art. 6 | Prepare conformity assessment for governance AI | Aug 2026 |
| Data Governance | Art. 10 | Federated learning + auditable training data | Aug 2026 |
| Technical Documentation | Art. 11 | Open-source documentation of all AI systems | Aug 2026 |
| Record-Keeping | Art. 12 | Blockchain-native audit trail for all AI actions | Aug 2026 |
| Human Oversight | Art. 14 | Vote override, delegation alerts, human-in-the-loop | Aug 2026 |
| Accuracy & Robustness | Art. 15 | Multi-model consensus, adversarial testing | Aug 2026 |
| Regulatory Sandbox | Art. 57 | Apply for sandbox in EU member state | 2026 |

**Standards Alignment**:
- **IEEE CertifAIEd**: Target certification for algorithmic bias, ethical transparency, privacy, and accountability
- **NIST AI 100-2e2025**: Apply adversarial ML taxonomy for threat modeling
- **IEEE 7000-2021**: Use as structured process for embedding ethics into AI system design

### 7. Enhanced Threat Model (Delegation & AI-Specific)

| Threat | Severity | Mitigation | Technology |
|--------|----------|-----------|------------|
| **Delegation Concentration** | HIGH | Hard caps on delegation depth; concentration alerts; decay mechanism | Custom + LangGraph |
| **Flash Loan Governance Attack** | LOW | Identity-based voting (not token-weighted) eliminates this vector | Substrate identity pallet |
| **Adversarial ML on Governance AI** | MEDIUM | Multi-model redundancy; adversarial training; red teaming | NIST AI 100-2e2025 framework |
| **Deepfake Identity Spoofing** | HIGH | Anti-spoofing AI + ZK credentials + liveness detection | World ID, Privado ID |
| **Algorithmic Amplification** | HIGH | No feed algorithm; chronological by default; diversity checks | Custom moderation |
| **AI Overwhelm / Information Flooding** | MEDIUM | Deliberation rate limiting during voting periods; cooling periods | Standalone RLN + Matrix rate limiting + custom |

### 8. OWASP Top 10 for Agentic AI (Dec 2025) — Mapping

Assessment of UNITA's 7-layer defense against the [OWASP Agentic AI Top 10](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/):

| # | OWASP Threat | UNITA Defense | Coverage | Notes |
|---|-------------|---------------|----------|-------|
| ASI01 | **Agent Goal & Instruction Hijacking** | Guardian Agent constitutional veto (L7) + NeMo Guardrails (L6) | Covered | Guardian can REJECT proposals violating Articles; system prompts public per Article 21 |
| ASI02 | **Tool & Function Misuse** | Agent tool manifests are public (Article 21); Guardian can veto tool calls not on manifest | Covered | Capability-based security: agents request permissions, not assume them |
| ASI03 | **Memory & Context Manipulation** | Stateless per-proposal analysis; no persistent memory across sessions | Covered | Agents don't accumulate context that can be poisoned |
| ASI04 | **Supply Chain & Dependency Vulnerability** | AGPL-3.0 open-source code; behavioral monitoring + drift detection circuit breaker (>3 std dev) | Partial | Can audit own code, but AI providers are black boxes. Best effort: detect behavioral drift |
| ASI05 | **Unexpected Code Execution** | MVP agents don't execute code; future tool-calling requires strict allowlists + Guardian veto | Gap (future) | Needs implementation when tool-calling is added |
| ASI06 | **Identity & Access Abuse** | Semaphore v4 ZK identity (L4) + national ID bridges + MACI (L5) | Covered | ZK proofs are non-transferable; nullifiers prevent replay |
| ASI07 | **Cross-Agent Communication Attacks** | Multi-model consensus (Article 32); agents don't share context directly; orchestrator mediates | Covered | No direct agent-to-agent communication channel to exploit |
| ASI08 | **Cascading Hallucination Failures** | Multi-model cross-checking; Guardrails AI structured output validation; Red Team continuous testing | Partial | Reduces but doesn't eliminate correlated hallucinations across providers |
| ASI09 | **Trust & Reputation Exploitation** | No agent karma/reputation system; all outputs are advisory only (Article 31) | Covered | Agents can't accumulate trust that could be exploited |
| ASI10 | **Rogue Autonomous Agent Behavior** | Red Team Agent detection + Article 21 community replacement + circuit breakers | Partial | Detection layer exists, but Red Team itself could be compromised. Recovery via community vote. |

**Summary**: 6/10 covered, 3/10 partial, 1/10 gap (code execution — deferred to tool-calling phase).

**Unsolved: The Framing Problem** — All 10 OWASP threats assume we can correctly frame what's threatening. But the framing itself shapes which answers look right. UNITA's mitigation: make all agent prompts public (Article 21), enable community governance of agent behavior, require providers from different cultural origins (Article 32). This reduces but cannot eliminate framing bias.

*Analysis based on community review, Moltbook m/aisafety engagement, Feb 2026.*

---

### 9. Future Considerations

- **Post-Quantum Migration**: Monitor NIST PQC standards; plan migration of ZK proofs to quantum-resistant schemes
- **AI Adversarial Robustness**: As AI capabilities increase, continuously update guardrail strength; track NIST AI 100-2e2025 taxonomy
- **Cross-Chain Security**: Audit bridge contracts with extra scrutiny (historically the weakest link)
- **Decentralized AI Compute**: Investigate Akash/Bittensor for censorship-resistant AI infrastructure
- **Content Moderation Evolution**: Human-in-the-loop with audit-ready transparency (2026 industry standard); Community Notes model for AI-flagged + community-verified moderation
