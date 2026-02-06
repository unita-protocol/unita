# UNITA Project TODO

## Infrastructure Setup (Phase 0)

### Completed
- [x] Create project email (`unita.protocol@gmail.com`)
- [x] Set up KeePass database
- [x] Create GitHub organization ([unita-protocol](https://github.com/unita-protocol))
- [x] Create GitHub repo ([unita-protocol/unita](https://github.com/unita-protocol/unita))
- [x] Initialize git, configure remote, push initial commit
- [x] LICENSE — AGPL-3.0 (code) + CC-BY-SA 4.0 (docs)

### Pending — GCP & Matrix Homeserver
> All steps detailed in [`docs/infrastructure/BOOTSTRAP_GUIDE.md`](docs/infrastructure/BOOTSTRAP_GUIDE.md)

- [ ] **Create GCP project** (~10 min, browser)
  - Sign in to [console.cloud.google.com](https://console.cloud.google.com) with `unita.protocol@gmail.com`
  - Create project: `unita-protocol`
  - Set billing budget alert: $1/month (safety net — all services are free tier)
  - Save credentials to KeePass (`Admin/GCP Console`)

- [ ] **Create GCP e2-micro VM** (~5 min, browser or CLI)
  - Zone: `us-central1-a`, Image: Debian 12, Disk: 30GB
  - Tags: `http-server`, `https-server`
  - Open firewall: TCP 80, 443, 8448
  - See Bootstrap Guide Section 4, Step 2 for exact `gcloud` commands

- [ ] **Register DuckDNS subdomain** (~2 min, browser)
  - Go to [duckdns.org](https://www.duckdns.org), login with GitHub
  - Register: `unita-matrix` (gives `unita-matrix.duckdns.org`)
  - Point to GCP VM external IP
  - Save DuckDNS token to KeePass (`Infrastructure/DuckDNS`)

- [ ] **Install Continuwuity + Caddy on VM** (~15 min, SSH)
  - SSH: `gcloud compute ssh unita-node-01 --zone=us-central1-a`
  - Install Docker, pull Continuwuity image
  - Configure `continuwuity.toml` (server name, registration token)
  - Install Caddy for automatic HTTPS
  - See Bootstrap Guide Section 5 for copy-paste commands

- [ ] **Create Matrix admin account** (~2 min)
  - Register `@admin:unita-matrix.duckdns.org` using registration token
  - Save to KeePass (`Social/Matrix Admin User`)

- [ ] **Create Matrix rooms** (~5 min, Element client)
  - Log in at [app.element.io](https://app.element.io) with admin account
  - Create: `#unita-general` (public), `#unita-dev` (public), `#unita-governance` (public)
  - Set room topics, avatar
  - Get invite links for README

### Pending — Nostr Identity
- [ ] **Generate Nostr keypair** (~2 min, local machine)
  - `openssl rand -hex 32` for private key
  - Or use [nak](https://github.com/fiatjaf/nak): `nak key generate`
  - Save private key (nsec) to KeePass (`Social/Nostr Identity`) — NEVER share

- [ ] **Set up Nostr profile** (~5 min, Nostr client)
  - Use [Primal](https://primal.net) or [Snort](https://snort.social)
  - Display name: "UNITA Protocol"
  - Bio: "Global P2P Liquid Democracy & Resource Equilibrium"
  - Post first announcement note
  - Copy npub for README

### Pending — GitHub & Web
- [ ] **Enable GitHub Pages** (~2 min, browser)
  - Repo Settings > Pages > Source: main branch > Save
  - Gives: `unita-protocol.github.io/unita`

- [ ] **Register domain** (when budget allows)
  - Check: `unita.org`, `unita-protocol.org`, `unita.network`
  - Point to GitHub Pages or GCP VM

### Pending — Documentation
- [ ] **Update README** with Matrix room links and Nostr npub (after creating them)
- [ ] **CONTRIBUTING.md** — contribution guidelines, code of conduct
- [ ] **CODE_OF_CONDUCT.md** — community standards (consider Contributor Covenant)

---

## Development Roadmap (Phase 1+)

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full phased development plan.

**Next milestones:**
- [ ] PWA prototype on IPFS / GitHub Pages
- [ ] Semaphore + MACI ZK-voting prototype
- [ ] Matrix custom event types SDK (`org.unita.proposal`, etc.)
- [ ] Budget Balancer UI component
- [ ] AI deliberation prompt engineering (Ijtihad agent)

---

## Research (Ongoing)

- [ ] Legal wrappers — "Lex Cryptographia" in Switzerland/EU for binding votes
- [ ] Post-quantum ZK migration path
- [ ] Tokenized time credits design
- [ ] Coercion resistance — MACI + DAVINCI combined analysis
- [ ] eIDAS 2.0 EUDI Wallet integration prototype (deadline: Nov 2026)

---

*Last updated: 2026-02-06*
