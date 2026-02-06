# UNITA Project TODO

## Infrastructure Setup (Phase 0)

- [x] Create project email (`unita.protocol@gmail.com`)
- [x] Set up KeePass database
- [x] Create GitHub organization (`unita-protocol`)
- [x] Create GitHub repo (`unita-protocol/unita`)
- [x] Initialize git, configure remote
- [ ] **Create GCP project** — sign in with `unita.protocol@gmail.com`, create project `unita-protocol`, set $1/month budget alert
- [ ] **Create GCP e2-micro VM** — `us-central1-a`, Debian 12, 30GB disk (see `docs/infrastructure/BOOTSTRAP_GUIDE.md`)
- [ ] **Register DuckDNS subdomain** — `unita-matrix.duckdns.org` pointed to VM external IP
- [ ] **Install Continuwuity** — Matrix homeserver on GCP VM (Docker + Caddy reverse proxy)
- [ ] **Create Matrix admin account** — `@admin:unita-matrix.duckdns.org`
- [ ] **Create Matrix rooms** — `#unita-general`, `#unita-dev`, `#unita-governance`
- [ ] **Generate Nostr keypair** — project identity for public social layer
- [ ] **Set up Nostr profile** — display name, bio, first announcement post
- [ ] **Push initial commit** to GitHub
- [ ] **Enable GitHub Pages** — `unita-protocol.github.io`
- [ ] **Register domain** — `unita.org` or `unita-protocol.org` (when budget allows)

## Documentation (Phase 0 — Ongoing)

- [x] README.md — project overview
- [x] Constitution — 40 articles, 3 parts
- [x] System Architecture — C4 model, hexagonal architecture
- [x] Security Framework — threat model + EU AI Act compliance
- [x] Protocol Stack — all protocol specs
- [x] AI Agent Framework — 6 agents + tech stack + guardrails
- [x] Landscape Analysis — 30+ projects analyzed
- [x] Technology Landscape 2026 — P2P/blockchain deep dive
- [x] AI Governance Security Research — AI agents, security, compliance
- [x] ADR-001 — protocol selection (P2P messaging section superseded)
- [x] ADR-002 — messaging layer (Matrix primary + libp2p/RLN secondary)
- [x] Bootstrap Guide — infrastructure setup instructions
- [ ] **CONTRIBUTING.md** — contribution guidelines
- [ ] **LICENSE** — choose open-source license (AGPL-3.0? MIT? Apache-2.0?)
- [ ] **CODE_OF_CONDUCT.md** — community standards
- [ ] **Update README** with Matrix room links and Nostr npub once created

## Development (Phase 1 — Future)

- [ ] PWA prototype on IPFS / GitHub Pages
- [ ] Semaphore + MACI ZK-voting prototype
- [ ] Matrix custom event types SDK (`org.unita.proposal`, etc.)
- [ ] Budget Balancer UI component
- [ ] AI deliberation prompt engineering (Ijtihad agent)

## Research (Ongoing)

- [ ] Legal wrappers — "Lex Cryptographia" in Switzerland/EU for binding votes
- [ ] Post-quantum ZK migration path
- [ ] Tokenized time credits design
- [ ] Coercion resistance — MACI + DAVINCI combined analysis
- [ ] eIDAS 2.0 EUDI Wallet integration prototype (deadline: Nov 2026)

---

*Last updated: 2026-02-06*
