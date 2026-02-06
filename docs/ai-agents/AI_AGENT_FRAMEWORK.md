# UNITA AI Agent Framework

## Intelligent Deliberation & Governance Assistance

### 1. Philosophy

AI in UNITA serves one purpose: **making voters more informed, never making decisions for them**.

Every AI agent operates under the UNITA Constitution (Article 31: "AI as Servant, Not Master"). Agents inform, challenge, analyze, and present — but the human always decides.

### 2. Agent Architecture

```
┌──────────────────────────────────────────────────────┐
│                  UNITA AI Orchestrator                │
│  Routes requests to appropriate agents               │
│  Enforces guardrails and constitutional compliance   │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │  Ijtihad    │ │ Economist   │ │ Guardian     │   │
│  │  Agent      │ │ Agent       │ │ Agent        │   │
│  │ (Deliberate)│ │ (Analyze)   │ │ (Protect)    │   │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘   │
│         │               │               │           │
│  ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐   │
│  │ Translator  │ │ Fact-Check  │ │ Red Team    │   │
│  │ Agent       │ │ Agent       │ │ Agent        │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                       │
├──────────────────────────────────────────────────────┤
│              NeMo Guardrails Layer                    │
│  Content Safety | PII Detection | Constitutional AI  │
├──────────────────────────────────────────────────────┤
│           Multi-Model Backend (3+ providers)         │
│  Claude (Anthropic) | Gemini (Google) | DeepSeek     │
│  GigaChat (Russia)  | Local models (Llama/Mistral)   │
└──────────────────────────────────────────────────────┘
```

### 3. Agent Definitions

#### 3.1 Ijtihad Agent (Primary Deliberation)
- **Role**: Presents balanced analysis of proposals
- **Behavior**:
  - Steel-mans BOTH sides of every proposal
  - Identifies unintended consequences
  - Lists financial beneficiaries and cost-bearers
  - Rates logical consistency (1-10)
  - Culturally neutral — no regional bias
- **Trigger**: Activated when voter opens any proposal
- **Output**: Structured deliberation brief (JSON + human-readable)

#### 3.2 Economist Agent (Impact Analysis)
- **Role**: Calculates resource intensity and economic impact
- **Behavior**:
  - Classifies Capital/Labor/Energy requirements
  - Models 5-year impact projection
  - Suggests budget trade-offs
  - Exposes hidden costs of "free" proposals
  - Generates Sustainability Score
- **Trigger**: Activated for proposals with resource allocation
- **Output**: Impact report with risk assessment

#### 3.3 Guardian Agent (Constitutional Protection)
- **Role**: Validates proposals against UNITA Constitution
- **Behavior**:
  - Checks all 40 Articles for violations
  - Suggests amendments to make proposals constitutional
  - Rates compliance: PASS / CONDITIONAL / REJECT
  - Cannot be overridden by any other agent
- **Trigger**: Automatically runs on every proposal before it enters voting queue
- **Output**: Constitutional compliance report

#### 3.4 Translator Agent (Multilingual Access)
- **Role**: Real-time translation of proposals and deliberation
- **Behavior**:
  - Translates to/from the 20 most spoken languages
  - Preserves cultural context and nuance
  - Flags untranslatable concepts with explanations
- **Trigger**: When user's language differs from proposal language
- **Output**: Translated content with cultural notes

#### 3.5 Fact-Check Agent (Verification)
- **Role**: Verifies claims made in proposals and deliberation
- **Behavior**:
  - Cross-references claims with authoritative sources
  - Provides confidence scores for each claim
  - Flags unverifiable or misleading statements
  - Links to primary sources
- **Trigger**: On-demand or when claims exceed confidence threshold
- **Output**: Fact-check report with source links

#### 3.6 Red Team Agent (Adversarial Testing)
- **Role**: Continuously tests other agents for vulnerabilities
- **Behavior**:
  - Attempts prompt injection on deliberation agents
  - Tests for cultural bias in outputs
  - Verifies guardrail effectiveness
  - Reports findings to community
- **Trigger**: Continuous background process
- **Output**: Security reports (public)

### 4. AI Compute Delegation

Users can voluntarily contribute AI compute credits to improve collective deliberation.

#### 4.1 Delegation Model
```
User AI Wallet
├── Personal Credits: Used for your own deliberation queries
├── Delegated Credits: Contributed to collective pool
│   ├── Spending Limit: Max credits per epoch (user-defined)
│   ├── Purpose Filter: "Education" | "Climate" | "All" topics
│   └── Revocation: Instant revocation at any time
└── Earned Credits: Gained through Areté reputation
```

#### 4.2 Security Controls
- **Cryptographic Bound**: Delegation is a signed, time-locked commitment
- **Usage Transparency**: Every credit spent is logged with purpose
- **Rate Limiting**: No single proposal can consume >5% of the pool
- **Audit Trail**: Publicly verifiable credit flow
- **Emergency Revoke**: One-click revocation with immediate effect

#### 4.3 Privacy Guarantees
- Who delegated what: **Private** (ZK proof of delegation amount without identity)
- How credits were used: **Public** (aggregate usage by topic)
- Individual query logs: **Never stored** (ephemeral computation)

### 5. Guardrail Architecture

Using [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) with custom Colang rules:

#### 5.1 Constitutional Rails
```colang
define flow constitutional_check
  user asks about proposal $proposal
  $compliance = execute check_constitution($proposal)
  if $compliance.status == "REJECT"
    bot inform "This proposal conflicts with Article {$compliance.article}.
                The Constitutional Guardian has flagged: {$compliance.reason}"
    bot suggest amendment
```

#### 5.2 Anti-Manipulation Rails
```colang
define flow anti_manipulation
  user submits deliberation input $input
  $safety = execute check_safety($input)
  if $safety.coordinated_campaign_detected
    bot warn "This input appears to be part of a coordinated campaign.
              Flagged for community review."
  if $safety.prompt_injection_detected
    bot block "Security violation detected. Input rejected."
```

#### 5.3 Cultural Sensitivity Rails
```colang
define flow cultural_sensitivity
  bot generates response $response
  $cultural = execute check_cultural_bias($response)
  if $cultural.western_centric
    bot revise "Adding perspectives from: {$cultural.missing_perspectives}"
  if $cultural.insensitive
    bot revise "Adjusting language for cultural sensitivity"
```

### 6. Multi-Model Orchestration

#### 6.1 Why Multi-Model?
No single AI model should monopolize deliberation (Constitution Article 32). Different models have different training data, biases, and strengths:

| Model | Origin | Strength | Perspective |
|-------|--------|----------|-------------|
| Claude | USA/Anthropic | Nuanced reasoning, safety | Western analytical |
| Gemini | USA/Google | Broad knowledge, multimodal | Global mainstream |
| DeepSeek | China | Technical depth, different training data | East Asian perspective |
| GigaChat | Russia | Different information landscape | Eurasian perspective |
| Llama/Mistral | Open source | Customizable, auditable | Community-controlled |

#### 6.2 Consensus Mechanism
For critical deliberation outputs:
1. Query all models independently
2. Compare outputs for agreement/divergence
3. If >80% agreement → present consensus view
4. If divergence → present all perspectives explicitly
5. Flag significant disagreements for human review

### 7. Agent Technology Stack

#### 7.1 Model Context Protocol (MCP)
- **URL**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- **What**: Vendor-neutral tool interface for AI models; donated to Linux Foundation (Dec 2025)
- **Supported by**: Anthropic, OpenAI, Block, and growing ecosystem
- **UNITA Usage**: Single integration layer for Claude, Gemini, DeepSeek, GigaChat — swap providers without changing agent logic
- **Key Feature**: "MCP Apps" (Jan 2026) enables interactive UI components in AI conversations — relevant for Budget Balancer

#### 7.2 LangGraph (Workflow Orchestration)
- **URL**: [langchain.com/langgraph](https://www.langchain.com/langgraph)
- **What**: Stateful, controllable agent framework with human-in-the-loop and durable execution
- **UNITA Usage**: Governance workflow engine — proposal lifecycle (submit → deliberate → vote → tally → execute) with state persistence across sessions

#### 7.3 CrewAI (Multi-Perspective Analysis)
- **URL**: [crewai.com](https://www.crewai.com/)
- **What**: Role-based multi-agent collaboration framework
- **UNITA Usage**: Specialized governance crews (Ijtihad Analyst, Economist, Cultural Mediator) working together on proposals

#### 7.4 Verifiable AI (ZKML)
Zero-Knowledge Machine Learning enables cryptographic verification of AI inference:
- **ERC-8004** (Aug 2025): On-chain identity/reputation registries for autonomous AI agents
- **ZKML Proofs**: Verify correct model execution for up to 18M parameter models
- **UNITA Usage**: Community auditors can verify AI proof without running models; ensures multi-model consensus wasn't tampered with

#### 7.5 Guardrails AI (Structured Validation)
- **URL**: [guardrailsai.com](https://www.guardrailsai.com/)
- **What**: Python framework for input/output validation with pre-built Validators Hub
- **UNITA Usage**: Enforce structured JSON governance outputs (Winners, Losers, Inflationary Risks, Sustainability Score) consistently across all LLM providers

#### 7.6 Collective Constitutional AI
- **Precedent**: [Anthropic's approach](https://www.anthropic.com/research/collective-constitutional-ai-aligning-a-language-model-with-public-input) using Polis to let users define AI behavior principles
- **UNITA Implementation**:
  1. Use Polis for citizens to define AI behavior principles
  2. Encode ratified principles into smart contracts
  3. AI agents reference on-chain constitution for behavioral constraints
  4. Community amends AI constitution through UNITA governance

#### 7.7 Federated Learning (Privacy-Preserving ML)
- Local governance data stays on local nodes
- Only model improvements shared globally
- Differential privacy protects individual voting patterns
- Meets GDPR data minimization requirements

### 8. Integration with Existing Platforms

#### 7.1 Collective Intelligence Platforms
- **[Polis](https://pol.is/)**: Import opinion clustering for pre-vote consensus mapping
- **[Make.org Dialogue](https://about.make.org/)**: Multilingual citizen co-construction
- **[Decidim](https://decidim.org/)**: Open-source participatory democracy integration

#### 7.2 Governance Platforms
- **[Tally](https://tally.xyz/)**: On-chain governance execution (MCP server available)
- **[Snapshot](https://snapshot.org/)**: Off-chain voting for non-binding polls
- **[Aragon](https://aragon.org/)**: DAO framework for organizational governance

### 9. Metrics & Accountability

Every AI agent reports:
- **Usage**: Queries served, credits consumed
- **Accuracy**: Post-vote analysis of prediction quality
- **Bias**: Quarterly bias audit results (public)
- **Safety**: Guardrail trigger frequency and false positive rate
- **Diversity**: Distribution of model usage across providers
- **Satisfaction**: User ratings of deliberation quality

### 10. Upgrade Path

AI agents evolve through constitutional governance:
1. New model/prompt → Public proposal (30-day comment)
2. Community vote (simple majority)
3. Gradual rollout (10% → 50% → 100%) with rollback capability
4. 14-day monitoring window
5. Permanent deployment or rollback
