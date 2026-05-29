# tech-humanizer-skill

[![skills.sh](https://img.shields.io/badge/skills.sh-ClydeShen%2Ftech--humanizer--skill-blue?style=flat-square)](https://skills.sh/ClydeShen/tech-humanizer-skill)
[![Validate Skill](https://img.shields.io/github/actions/workflow/status/ClydeShen/tech-humanizer-skill/evals.yml?branch=main&label=Build&style=flat-square)](https://github.com/ClydeShen/tech-humanizer-skill/actions/workflows/evals.yml)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Compatible with Claude Code](https://img.shields.io/badge/Compatible-Claude%20Code-7C4DFF?style=flat-square)](#supported-agent-tools)
[![Compatible with Gemini CLI](https://img.shields.io/badge/Compatible-Gemini%20CLI-4285F4?style=flat-square)](#supported-agent-tools)

**High-signal technical writing. No AI fluff.**

Stop shipping PRs and docs that sound like they were written by a generic assistant. **tech-humanizer-skill** is an agent-side tool that removes AI-writing markers (ceremonial framing, vague claims, and promotional filler) while protecting the technical precision engineers rely on. It targets the right output format whether that's a Slack update or a formal engineering design doc.

## Why this matters

- Protects technical depth: shields terms like `Kubernetes`, `OAuth 2.0`, `JWT`, and `CI/CD` from being simplified into vague filler.
- Grounded in methodology: uses a community-driven field guide based on [Wikipedia's AI markers](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) to identify and fix specific tells.
- Learns your voice: maintains a local `writing-profile.json` that tracks your team's nomenclature and personal style preferences. No black boxes.
- Context-aware: a PR description needs impact; a Slack message needs brevity; a technical doc needs precision.

## Before and after: real engineering scenarios

| Context | Generic AI output | Humanized output |
| :--- | :--- | :--- |
| Engineering (PR) | "This pull request encompasses a comprehensive refactoring of the authentication module to enhance security posture." | "Refactored the auth module to fix a potential session hijacking vulnerability." |
| Product (Release Notes) | "We are excited to unveil a plethora of new features designed to empower your workflow and drive synergy." | "We've added bulk-editing and a new dashboard to speed up your daily tasks." |
| Architecture doc | "It is important to note that our innovative solution leverages Kubernetes to optimize scalability and ensure high availability." | "We use Kubernetes to handle scaling and keep the service up during traffic spikes." |
| On-call / chat | "I am reaching out to inform you that I have completed the requested investigation into the latency issues." | "Found the cause of the latency spikes. It was a missing index on the `users` table." |
| Email to client | "Please find the attached documentation for your perusal. Should you have any questions, feel free to reach out." | "I've attached the docs. Let me know if you have questions." |

## Who this is for

- Individual contributors keeping PRs high-signal and author-like.
- Leads and architects keeping technical docs precise and free of assistant-style filler.
- Product owners writing release notes that tell users what changed.
- Teams standardizing internal nomenclature via a shared writing profile.

## How it works

1. **Diagnostic scan:** identifies markers like ceremonial framing (e.g., "It is important to note") and vague attribution (e.g., "Many believe").
2. **Technical shielding:** cross-references with local lexicons to keep protected terms verbatim.
3. **Recursive check:** re-evaluates the output against a rubric to confirm the result reads like a human wrote it.

## Installation

### Add to your project
```bash
npx skills add clydeshen/tech-humanizer-skill
```

### Update to the latest version
```bash
npx skills update clydeshen/tech-humanizer-skill
```

## Supported agent tools

This skill uses the standard `SKILL.md` layout and is compatible with:

- Claude Code (native support)
- Gemini CLI (built-in integration)
- Codex and Kiro
- Claude Desktop

## Writing profile: local and transparent

Unlike cloud humanizers, this skill uses a local `writing-profile.json` in your project root. It is private, ignored by Git, and lets you:

- Define nomenclature: "Always use *Registry*, never *Store*."
- Store samples: give the skill a few of your own sentences to match your register.
- Internalize corrections: if you correct an AI word twice, the skill will not use it again.

## Project links

- [Contributing](CONTRIBUTING.md): help expand the AI-marker field guide.
- [Code of Conduct](CODE_OF_CONDUCT.md): standard community guidelines.
- [Security](SECURITY.md): how we handle vulnerability reports.
- [MIT License](LICENSE): open-source and free.
