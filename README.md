# tech-humanizer-skill

An Agent Skill that rewrites AI-generated text into natural, human-sounding prose while preserving technical terminology and jargon.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- An agent tool that supports the [Agent Skills Specification](https://skills.sh) (see supported tools below)

### Install

```bash
npx skills add ClydeShen/tech-humanizer-skill
```

Run this command in your project directory. The skill will be installed and available to any supported agent tool running in that directory.

### Supported Agent Tools

- Claude Desktop
- Claude Code
- Codex
- Gemini CLI
- Kiro

## Features

### Humanize

Rewrites AI-style text into natural, human-sounding prose. The skill identifies and removes AI writing markers — overused vocabulary, collaborative filler phrases, templated structures, and excessive formatting — while preserving all technical terms and jargon exactly as written.

### Detect

Scans text for AI writing markers across four dimensions: content (vague attribution, promotional language), language (high-density AI vocabulary, negative parallel structures), style (title case, excessive bold, inline header lists), and communication intent (collaborative filler, knowledge cutoff disclaimers). Outputs an AI marker density report showing the percentage of sentences containing markers, grouped by category with specific instances and improvement suggestions.

### Profile Management

On first use, the skill runs a short 3-question assessment to infer your English variant (British/American), CEFR level (B1–C1), and style preferences across three contexts (client docs, team collaboration, casual chat). The profile is saved locally and applied automatically to all subsequent rewrites. You can view, update, or reset your profile at any time.

---

## Usage

### Humanize

```
Humanize this email: [paste text]
```

```
Rewrite this for a Slack message: [paste text]
```

```
Humanize this pull request description: [paste text]
```

### Detect

```
Detect AI markers in this document: [paste text]
```

```
What's the AI marker density of this text? [paste text]
```

### Profile

```
Show my writing profile
```

```
Update my profile
```

```
Reset writing profile
```

```
Clear my writing profile
```

---

## Configuration

Two files are auto-generated in your working directory when you use the skill:

- `profile.json` — stores your inferred user persona (English variant, CEFR level, style preferences)
- `writing-profile.json` — stores your accumulated writing preferences, vocabulary corrections, and observed L1 transfer patterns

Both files are listed in `.gitignore` and are excluded from version control by default. You do not need to create or edit them manually.

---

## License

MIT — see [LICENSE](LICENSE)
