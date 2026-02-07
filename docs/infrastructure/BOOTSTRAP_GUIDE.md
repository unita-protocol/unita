# UNITA Infrastructure Bootstrap Guide

## Phase 0: Project Identity & Free-Tier Hosting

This guide walks through setting up UNITA's minimal infrastructure using free services.

---

### 1. Project Email

**Recommendation: Gmail** (pragmatic for GCP integration) + **ProtonMail** (for public-facing, privacy-aligned identity)

#### Step 1a: Gmail (GCP admin account)
1. Go to https://accounts.google.com/signup
2. Create: `unita.protocol@gmail.com` (or similar available name)
3. Enable 2FA immediately
4. This account is for: GCP console, GitHub org, CI/CD

#### Step 1b: ProtonMail (optional, public-facing)
1. Go to https://proton.me/mail/pricing (free tier)
2. Create: `contact@unita-protocol.org` (once domain is registered)
3. This account is for: public contact, governance communications
4. Aligns with UNITA's privacy-first values

#### KeePass Entry
```
Title: UNITA Gmail (GCP Admin)
URL: https://mail.google.com
Username: unita.protocol@gmail.com
Password: [generated 20+ char]
Notes: GCP project admin. 2FA enabled. Recovery phone: [your number]
Tags: unita, admin, gcp
```

---

### 2. GitHub Organization

1. Go to https://github.com/organizations/new (free tier)
2. Organization name: `unita-protocol` (or `unita-governance`)
3. Set email to the Gmail account
4. Create repositories:
   - `unita` — Main repo (move current docs here)
   - `unita-homeserver` — Matrix homeserver config (future)
   - `unita-contracts` — Substrate pallets (future)

#### KeePass Entry
```
Title: UNITA GitHub Org
URL: https://github.com/unita-protocol
Username: [your GitHub username]
Notes: Org owner. Personal account linked.
Tags: unita, github
```

---

### 3. Vercel Deployment (MVP Hosting)

UNITA's Next.js app deploys to Vercel Free tier from the pnpm/Turborepo monorepo.

> **Reference**: [Vercel Monorepo Docs](https://vercel.com/docs/monorepos/turborepo), [Vercel Deployment Guide](https://vercel.com/docs/git)

#### Step 1: Import the Repository

1. Go to **https://vercel.com/new**
2. Sign in with your GitHub account (the one that owns `unita-protocol` org)
3. Under "Import Git Repository", find and click **Import** next to `unita-protocol/unita`

#### Step 2: Configure Project Settings

Vercel auto-detects Turborepo monorepos, but verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/web` (click Edit to change) |
| **Build Command** | `cd ../.. && pnpm turbo build --filter=@unita/web` |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `pnpm install` (auto-detected) |
| **Node.js Version** | 22.x |

**Critical**: The Root Directory **must** be `apps/web`. Vercel will automatically enable "Include source files outside of the Root Directory in the Build Step" for monorepo projects, which allows the build to access `packages/*`. If not enabled automatically, toggle it manually under Root Directory settings.

The custom build command `cd ../.. && pnpm turbo build --filter=@unita/web` is needed because Vercel runs the build from within `apps/web`, but Turborepo needs to run from the monorepo root to resolve workspace dependencies. If Vercel auto-detects the Turborepo setup correctly, you can also leave Build Command blank and let it use the default.

#### Step 3: Set Environment Variables

Add these three env vars (all targets: Production, Preview, Development):

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://postgres.xxxx:password@aws-1-eu-west-1.pooler.supabase.com:6543/postgres` | Supabase pooler connection string |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `AIza...` | Google AI Studio key for Gemini 3 Flash |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase project URL |

Copy these values from your local `.env` file. Use the **Supabase pooler** URL (port 6543), not the direct connection (which is IPv6-only and won't work from Vercel).

#### Step 4: Deploy

1. Click **Deploy**
2. First build takes ~30-60 seconds
3. Vercel assigns a URL like `unita-xxxx.vercel.app`

#### Step 5: Verify

Test the full E2E flow on the production URL:
1. **Home page** loads with live stats
2. **Create Proposal** → saves to Supabase, AI analysis starts automatically
3. **Refresh after ~30s** → see 3-agent AI analysis
4. **Go to /identity** → generate ZK identity
5. **Back to proposal** → Register to Vote → Vote YES/NO with real ZK proof
6. **See results** → visual vote bar, participation stats

#### Post-Deploy Configuration

**Custom Domain** (optional):
1. Go to Project Settings → Domains
2. Add your domain (e.g., `app.unita.org`)
3. Follow DNS instructions (CNAME or A record)

**Auto-Deploy**: Every push to `main` triggers a new deployment. Preview deployments are created for pull requests.

**Function Timeout**: The `vercel.json` in `apps/web/` sets API routes to 60s max duration (Fluid Compute), which handles the ~12.5s AI analysis without issues.

**Monorepo Caching**: Vercel provides free Remote Cache for Turborepo builds. To enable:
```bash
cd /data/unita
npx turbo link  # Links to Vercel Remote Cache
```

#### Troubleshooting

| Problem | Solution |
|---------|----------|
| "No Next.js version detected" | Verify Root Directory is `apps/web`, not monorepo root |
| Build fails with missing packages | Ensure `pnpm-workspace.yaml` is at monorepo root and `node-linker=hoisted` is in `.npmrc` |
| Database connection fails | Use Supabase **pooler** URL (port 6543), not direct (port 5432). Pooler user is `postgres.[project-ref]` |
| AI analysis times out | `vercel.json` sets 60s timeout. If still timing out, check Gemini API key is valid |
| `Cannot find module '@unita/db'` | `transpilePackages` in `next.config.ts` must include all workspace packages |

#### KeePass Entry
```
Title: UNITA Vercel
URL: https://vercel.com/unita-protocol
Project: unita
Production URL: https://unita-xxxx.vercel.app
Notes: Deployed from apps/web. Auto-deploys on push to main.
Tags: unita, vercel, hosting
```

---

### 4. Matrix Channel (Immediate — Dogfooding our own stack)

Since Matrix is our primary messaging layer (ADR-002), we should use it from day one.

#### Option A: Room on existing server (fastest, free)
1. Register at https://app.element.io (Element is the main Matrix client)
2. Create account `@unita-admin:matrix.org` on the public matrix.org server
3. Create rooms:
   - `#unita-general:matrix.org` — Public discussion
   - `#unita-dev:matrix.org` — Development chat
   - `#unita-governance:matrix.org` — Governance design discussions
4. Set room topic, avatar, and invite links

**Pros**: Free, instant, no infrastructure needed
**Cons**: Hosted on matrix.org (not our own server), limited admin control

#### Option B: Own homeserver on GCP (recommended for Phase 1)
See Section 5 below for running Continuwuity on GCP free tier.

#### KeePass Entry
```
Title: UNITA Matrix Admin
URL: https://app.element.io
Username: @unita-admin:matrix.org
Password: [generated 20+ char]
Notes: Matrix admin account. Owns #unita-* rooms.
Tags: unita, matrix, messaging
```

---

### 4. Google Cloud Free Tier

GCP Always Free tier includes:
- **1x e2-micro VM** (0.25 vCPU, 1GB RAM) — enough for a lightweight Matrix homeserver
- **30GB standard persistent disk**
- **1GB egress/month** to most destinations
- **5GB Cloud Storage**
- **Firestore: 1GB storage, 50K reads/day**

#### Step 1: Create GCP Project
1. Go to https://console.cloud.google.com
2. Sign in with `unita.protocol@gmail.com`
3. Create project: `unita-protocol`
4. Enable billing (required, but won't charge within free tier)
5. Set budget alert at $1/month as safety net

#### Step 2: Create e2-micro VM
```bash
# After installing gcloud CLI
gcloud auth login
gcloud config set project unita-protocol

# Create the VM (Always Free eligible)
gcloud compute instances create unita-node-01 \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=debian-13 \
  --image-project=debian-cloud \
  # NOTE: If debian-13 isn't available yet on GCP, use:
  #   --image-family=ubuntu-2404-lts-amd64 --image-project=ubuntu-os-cloud
  # Check available images: gcloud compute images list --project=debian-cloud --filter="family~debian"
  --boot-disk-size=30GB \
  --tags=http-server,https-server

# Open firewall for Matrix federation (port 8448) and HTTPS (443)
gcloud compute firewall-rules create allow-matrix \
  --allow tcp:8448,tcp:443,tcp:80 \
  --target-tags=http-server
```

#### Step 3: Budget Safety
```bash
# Set billing budget (alerts only, won't stop services)
# Do this in Console: Billing > Budgets & alerts > Create budget
# Amount: $1/month
# Alert at: 50%, 90%, 100%
```

#### KeePass Entry
```
Title: UNITA GCP Console
URL: https://console.cloud.google.com
Username: unita.protocol@gmail.com
Project: unita-protocol
Zone: us-central1-a
VM: unita-node-01
Notes: Free tier e2-micro. Budget alert at $1/month.
Tags: unita, gcp, infrastructure
```

---

### 5. Matrix Homeserver on GCP Free Tier

**Recommended: Continuwuity** (lightweight Rust homeserver, ~50MB RAM idle)

#### Why Continuwuity over Synapse?
- Synapse (Python) needs 500MB+ RAM — won't fit on e2-micro
- Continuwuity (Rust) runs with ~50-100MB RAM — perfect for free tier
- We recommended it in ADR-002 for community governance nodes

#### Installation on the VM
```bash
# SSH into the VM
gcloud compute ssh unita-node-01 --zone=us-central1-a

# Install dependencies
sudo apt update && sudo apt install -y curl wget

# Option 1: Docker (simplest)
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker

# Create config directory
sudo mkdir -p /opt/continuwuity/data

# Create config file (see continuwuity docs for full options)
sudo tee /opt/continuwuity/continuwuity.toml << 'EOF'
[global]
server_name = "unita-matrix.duckdns.org"  # Free DNS, see below
database_path = "/data"
port = [8008, 8448]
max_request_size = 20_000_000
allow_registration = false  # Manual registration only for now
registration_token = "CHANGE_ME_RANDOM_TOKEN"
allow_federation = true

[global.well_known]
client = "https://unita-matrix.duckdns.org"
server = "unita-matrix.duckdns.org:8448"
EOF

# Run with Docker
sudo docker run -d \
  --name continuwuity \
  --restart unless-stopped \
  -v /opt/continuwuity/data:/data \
  -v /opt/continuwuity/continuwuity.toml:/etc/continuwuity/continuwuity.toml \
  -p 8008:8008 \
  -p 8448:8448 \
  girlbossceo/continuwuity:latest
```

#### Free DNS (DuckDNS)
1. Go to https://www.duckdns.org (free, no account needed — use GitHub login)
2. Register subdomain: `unita-matrix.duckdns.org`
3. Point to your GCP VM's external IP
4. Set up auto-update cron:
```bash
echo "*/5 * * * * curl -s 'https://www.duckdns.org/update?domains=unita-matrix&token=YOUR_DUCKDNS_TOKEN'" | sudo crontab -
```

#### Free TLS (Let's Encrypt + Caddy)
```bash
# Install Caddy (automatic HTTPS)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy

# Caddy config
sudo tee /etc/caddy/Caddyfile << 'EOF'
unita-matrix.duckdns.org {
    reverse_proxy /_matrix/* localhost:8008
    reverse_proxy /_synapse/* localhost:8008
}

unita-matrix.duckdns.org:8448 {
    reverse_proxy localhost:8448
}
EOF

sudo systemctl restart caddy
```

#### KeePass Entry
```
Title: UNITA Matrix Homeserver
URL: https://unita-matrix.duckdns.org
Admin User: @admin:unita-matrix.duckdns.org
Registration Token: [generated random]
DuckDNS Token: [from duckdns.org]
SSH: gcloud compute ssh unita-node-01 --zone=us-central1-a
Notes: Continuwuity on GCP e2-micro free tier. Caddy reverse proxy.
Tags: unita, matrix, homeserver, infrastructure
```

---

### 6. Create Matrix Rooms (After Homeserver is Running)

Using Element client or `curl`:

```bash
# Register admin user
curl -X POST "https://unita-matrix.duckdns.org/_matrix/client/v3/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "YOUR_SECURE_PASSWORD",
    "auth": {"type": "m.login.registration_token", "token": "YOUR_REGISTRATION_TOKEN"}
  }'

# Then use Element (app.element.io) to:
# 1. Log in with @admin:unita-matrix.duckdns.org
# 2. Create rooms:
#    - #unita-general    (public, anyone can join)
#    - #unita-dev        (public, development discussion)
#    - #unita-governance (public, governance design)
#    - #unita-core       (private, core team only)
```

---

### 7. Nostr Identity (Public Social Layer)

```bash
# Generate Nostr keypair (on your local machine, NOT on a server)
# Option 1: Using nak (Nostr Army Knife)
# Install: go install github.com/fiatjaf/nak@latest
nak key generate

# Option 2: Using openssl
openssl rand -hex 32  # This is your private key (nsec)

# Then use a Nostr client (e.g., Damus, Primal, Snort) to:
# 1. Import the private key
# 2. Set display name: "UNITA Protocol"
# 3. Set bio: "Global P2P Liquid Democracy & Resource Equilibrium"
# 4. Post first note announcing the project
```

#### KeePass Entry
```
Title: UNITA Nostr Identity
URL: https://primal.net/p/[npub]
Private Key (nsec): [NEVER share this]
Public Key (npub): [shareable]
Notes: Project announcement account. Used for public delegation feeds.
Tags: unita, nostr, social
```

---

### 8. Domain Name (When Ready)

**Recommended domains** (check availability):
1. `unita.org` — Clean, professional
2. `unita-protocol.org` — More descriptive
3. `unita.network` — Technical feel
4. `unita.community` — Community focus

**Free options for now**:
- `unita-protocol.github.io` (GitHub Pages)
- `unita-matrix.duckdns.org` (Matrix homeserver)

---

## KeePass Organization

Create a KeePass database (`UNITA.kdbx`) with this structure:

```
UNITA/
├── Admin/
│   ├── Gmail (GCP Admin)
│   ├── GitHub Org Owner
│   └── GCP Console
├── Infrastructure/
│   ├── Matrix Homeserver
│   ├── DuckDNS
│   ├── Domain Registrar (future)
│   └── GCP VM SSH Key
├── Social/
│   ├── Matrix Admin User
│   ├── Nostr Identity
│   └── ProtonMail (future)
├── API Keys/
│   ├── Anthropic (future)
│   ├── Google AI (future)
│   └── DeepSeek (future)
└── Recovery/
    ├── Gmail Recovery Codes
    ├── GitHub Recovery Codes
    └── GCP Backup Codes
```

**Security rules**:
- Master password: 25+ characters, memorized, NOT stored digitally
- Key file: Store on separate USB drive
- Database backup: Encrypted cloud storage (not the same cloud as the project)
- Share with co-founders via KeePass shared database or Bitwarden org (future)

---

## Cost Summary (Phase 0)

| Service | Cost | What You Get |
|---------|------|-------------|
| Gmail | Free | Project email, GCP admin |
| GitHub Org | Free | Code hosting, CI/CD, Pages |
| Vercel Free | Free | Next.js hosting, serverless functions, auto-deploy |
| Supabase Free | Free | 500MB Postgres, auth, real-time |
| Google AI (Gemini 3 Flash) | Free | 5 RPM, 250 RPD AI analysis |
| GCP e2-micro | Free (always) | VM for Matrix homeserver |
| DuckDNS | Free | DNS for homeserver |
| Let's Encrypt | Free | TLS certificates |
| Caddy | Free (open source) | Reverse proxy |
| Continuwuity | Free (open source) | Matrix homeserver |
| Element | Free | Matrix client |
| Nostr | Free | Public social identity |
| **Total** | **$0/month** | Full project infrastructure |

---

## Checklist

- [x] Create Gmail account (`unita.protocol@gmail.com`)
- [x] Enable 2FA on Gmail
- [x] Create KeePass database with structure above
- [x] Create GitHub organization
- [ ] Deploy to Vercel (see Section 3)
- [ ] Create GCP project (link Gmail account)
- [ ] Set $1/month budget alert on GCP
- [ ] Create e2-micro VM on GCP
- [ ] Register DuckDNS subdomain
- [ ] Install Continuwuity + Caddy on VM
- [ ] Create Matrix admin account
- [ ] Create public Matrix rooms (#unita-general, #unita-dev, #unita-governance)
- [ ] Log in with Element client, verify federation works
- [ ] Generate Nostr keypair
- [ ] Set up Nostr profile
- [ ] Move documentation repo to GitHub org
- [ ] Update README with Matrix room links and Nostr npub

---

## What NOT to Do

1. **Do NOT store real credentials in the repo** — not in `.env`, `.secrets`, or anywhere else. Use `.env.example` for templates only.
2. **Do NOT use the same password anywhere** — KeePass generates unique passwords.
3. **Do NOT skip 2FA** — enable on every service that supports it.
4. **Do NOT run services as root** — create a dedicated `unita` user on the VM.
5. **Do NOT open unnecessary ports** — only 80, 443, 8448 for Matrix federation.
6. **Do NOT allow open registration** on the homeserver — use registration tokens.
