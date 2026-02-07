# Contributing to UNITA Protocol

Welcome, and thank you for your interest in UNITA. We are building a Global P2P Liquid Democracy and Resource Equilibrium protocol, and every contribution matters.

UNITA is currently in **Phase 0 — Documentation and Research**. There is no code yet. We are defining the constitution, protocol stack, security model, and AI agent framework. This is the most impactful time to shape the project's direction.

## How to Contribute

### GitHub Issues

Open an issue for anything: questions, suggestions, critique, or research pointers. Asking a good question is a valuable contribution. Use the [GitHub Issues](https://github.com/unita-protocol/unita/issues) tracker.

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b your-topic`)
3. Make your changes
4. Write a clear PR description explaining *what* and *why*
5. Submit the PR against `main`

Keep PRs focused. One topic per PR is easier to review.

### Communication

- **GitHub Issues** — primary channel for all discussion
- **Matrix rooms** — coming soon (#general, #dev, #governance)

## What We Are Looking For

- **Constitutional review** — Analyze the 40-article constitution for gaps, contradictions, or unintended consequences
- **Protocol analysis** — Review our choices (Matrix, Semaphore, MACI, Substrate) and challenge assumptions
- **Security audits** — Threat modeling, attack surface analysis, privacy review
- **AI safety research** — Guardrails for AI deliberation agents, EU AI Act compliance
- **ZK and identity expertise** — Semaphore circuits, eIDAS 2.0 integration, national ID bridges
- **Translation and localization** — The protocol serves a global audience
- **Landscape research** — Comparisons with existing governance projects (DAOs, liquid democracy platforms)
- **Architecture review** — Critique the C4 model, hexagonal architecture, and protocol stack

## Documentation Guidelines

All contributions in Phase 0 are documentation. Follow these conventions:

- Write in Markdown
- Use clear hierarchical headings
- Cite sources with links when referencing research, standards, or external projects
- Place new documents in the appropriate `docs/` subdirectory
- For architecture decisions, use the ADR format in `docs/adr/`

Code style guidelines will be defined when implementation begins.

## Development Setup

```bash
git clone https://github.com/unita-protocol/unita.git
cd unita
```

That is it. There is no build system, no dependencies, and no toolchain yet. You need a text editor and Git.

## License

By contributing, you agree that your contributions will be licensed under:

- **AGPL-3.0** for code (when it exists)
- **CC-BY-SA 4.0** for documentation

See [LICENSE](LICENSE) for details.

## Questions?

Open a GitHub Issue or email unita.protocol@gmail.com. There are no bad questions at this stage.
