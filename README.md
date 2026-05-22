# ✍️ tech-humanizer-skill

[![skills.sh](https://img.shields.io/badge/skills.sh-ClydeShen%2Ftech--humanizer--skill-blue?style=flat-square)](https://skills.sh/ClydeShen/tech-humanizer-skill)
[![Validate Skill](https://img.shields.io/github/actions/workflow/status/ClydeShen/tech-humanizer-skill/evals.yml?branch=main&label=Build&style=flat-square)](https://github.com/ClydeShen/tech-humanizer-skill/actions/workflows/evals.yml)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Compatible with Claude Code](https://img.shields.io/badge/Compatible-Claude%20Code-7C4DFF?style=flat-square)](#supported-agent-tools)
[![Compatible with Gemini CLI](https://img.shields.io/badge/Compatible-Gemini%20CLI-4285F4?style=flat-square)](#supported-agent-tools)

### **High-Signal Technical Writing. No AI Fluff.**

Stop shipping PRs and docs that sound like they were written by a generic assistant. **tech-humanizer-skill** is an agent-side tool designed to purge AI-writing markers (ceremonial framing, vague claims, and promotional filler) while rigorously protecting the technical precision engineers actually care about.

It doesn't just "rewrite" text; it recalibrates your technical communication for the right channel—whether that's a high-signal Slack update or a formal engineering design doc.

---

## 🛠️ Why this matters

*   **🛡️ Protects Technical Depth:** Automatically shields terms like `Kubernetes`, `OAuth 2.0`, `JWT`, and `CI/CD` from being "simplified" into meaningless fluff.
*   **🧠 Grounded in Methodology:** Uses a community-driven field guide (based on [Wikipedia's AI markers](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)) to identify and fix specific "tells."
*   **📈 Learns Your Voice:** Maintains a local `writing-profile.json` that tracks your team's nomenclature and your personal style preferences. No black boxes.
*   **🎯 Context Aware:** Understands that a PR description needs impact, a Slack message needs brevity, and a technical doc needs precision.

---

## ✨ Before & After: Real Engineering Scenarios

| **Context** | **Generic AI Output** | **Humanized Output** |
| :--- | :--- | :--- |
| **Engineering (PR)** | "This pull request encompasses a comprehensive refactoring of the authentication module to enhance security posture." | "Refactored the auth module to fix a potential session hijacking vulnerability." |
| **Product (Release Notes)** | "We are excited to unveil a plethora of new features designed to empower your workflow and drive synergy." | "We've added bulk-editing and a new dashboard to speed up your daily tasks." |
| **Architecture Doc** | "It is important to note that our innovative solution leverages Kubernetes to optimize scalability and ensure high availability." | "We use Kubernetes to handle scaling and keep the service up during traffic spikes." |
| **On-call / Chat** | "I am reaching out to inform you that I have completed the requested investigation into the latency issues." | "Found the cause of the latency spikes. It was a missing index on the `users` table." |
| **Email to Client** | "Please find the attached documentation for your perusal. Should you have any questions, feel free to reach out." | "I’ve attached the docs. Let me know if you have questions." |

---

## 👤 Who is this for?

*   **Individual Contributors:** Keep your PRs high-signal and author-like.
*   **Leads & Architects:** Ensure technical docs are precise and free of assistant-style "filler."
*   **Product Owners:** Write release notes that actually tell users what changed.
*   **Teams:** Standardize internal nomenclature via a shared writing profile.

---

## ⚙️ How it works

1.  **Diagnostic Scan:** Identifies markers like "ceremonial framing" (e.g., "It is important to note") and "vague attribution" (e.g., "Many believe").
2.  **Technical Shielding:** Cross-references with local lexicons to ensure protected terms stay verbatim.
3.  **Recursive Check:** Re-evaluates the output against a professional rubric to ensure it sounds like a human wrote it, not just a "polished AI."

---

## 📦 Installation & Setup

### **Add to your project**
```bash
npx skills add ClydeShen/tech-humanizer-skill
```

### **Update to the latest version**
```bash
npx skills update ClydeShen/tech-humanizer-skill
```

---

## 🛠️ Supported Agent Tools

This skill is a standard `SKILL.md` layout, compatible with:

*   **Claude Code** (Native support)
*   **Gemini CLI** (Built-in integration)
*   **Codex** & **Kiro**
*   **Claude Desktop**

---

## 👤 The Writing Profile: Local & Transparent

Unlike "cloud" humanizers, this skill uses a local `writing-profile.json` in your project root. It’s private, ignored by Git, and allows you to:

*   **Define Nomenclature:** "Always use *Registry*, never *Store*."
*   **Store Samples:** Give the skill a few of your own sentences to match your register.
*   **Internalize Corrections:** If you fix an AI word twice, the skill remembers never to use it again.

---

## 🔗 Project Links

*   **[Contributing](CONTRIBUTING.md)** - Help us expand the AI-marker field guide.
*   **[Code of Conduct](CODE_OF_CONDUCT.md)** - Standard community guidelines.
*   **[Security](SECURITY.md)** - How we handle vulnerability reports.
*   **[MIT License](LICENSE)** - Open-source and free.

---
<p align="center">Made with ❤️ for the Engineering Community</p>
