# tech-humanizer-skill

[![skills.sh](https://skills.sh/b/ClydeShen/tech-humanizer-skill)](https://skills.sh/ClydeShen/tech-humanizer-skill)
[![Validate Skill](https://github.com/ClydeShen/tech-humanizer-skill/actions/workflows/evals.yml/badge.svg)](https://github.com/ClydeShen/tech-humanizer-skill/actions/workflows/evals.yml)

An Agent Skill for rewriting AI-shaped prose into natural human writing while preserving technical terminology.

It supports documents, emails, chat messages, pull request text, release notes, and technical docs. It can also detect AI-writing marker density and maintain a local writing profile so future rewrites move closer to the user's own wording.

## Install

```bash
npx skills add ClydeShen/tech-humanizer-skill
```

Run the command in the project where you want the skill installed. The repository keeps `SKILL.md` at the root so it can be discovered by `skills.sh` and by agent clients that support the Agent Skills layout.

## Supported Agent Tools

The skill uses plain Markdown instructions and local reference files, so it is intended to work across mainstream agent environments:

- Claude Desktop
- Claude Code
- Codex
- Gemini CLI
- Kiro
- Other agents that can load a `SKILL.md` skill folder

## What It Does

### Humanize

Rewrites AI-style text into direct, context-aware prose. It removes patterns such as grand importance claims, vague attribution, promotional vocabulary, assistant service language, template residue, excessive formatting, skipped Markdown heading levels, and internal citation leaks.

Technical terms are preserved by default. For example, terms such as `Kubernetes`, `OAuth 2.0`, `JWT`, `CI/CD`, `RAG`, `schema`, `latency`, and `canary deployment` should stay intact unless the user explicitly asks for a house-style change.

### Detect

Reports AI-marker density as:

```text
floor(sentences_with_markers / total_sentences * 100)
```

Findings are grouped into:

- Content
- Language
- Style and formatting
- Communication intent
- Markup, citations, and sources
- Comment-style residue

Each non-empty group includes specific fragments, the issue, and a rewrite example.

### Learn User Style

The skill can maintain a local `writing-profile.json` with:

- preferred wording corrections;
- domain terms;
- style notes from user samples;
- recurring writing patterns the user wants corrected.

The profile file is ignored by Git by default.

## Repository Structure

```text
.
|-- SKILL.md
|-- references/
|   |-- ai-markers.md
|   |-- technical-terms.md
|   |-- profile-schema.md
|   |-- outcome/
|   |   |-- rewrite-playbook.md
|   |   |-- channel-style.md
|   |   |-- source-and-markup-integrity.md
|   |   `-- final-rubric.md
|   `-- lexicons/
|       `-- ai-style-lexicon.json
|-- assets/
|   `-- detection-report-template.txt
|-- scripts/
|   `-- validate.py
|-- evals.json
|-- .github/
|   |-- workflows/evals.yml
|   |-- ISSUE_TEMPLATE/
|   `-- PULL_REQUEST_TEMPLATE.md
`-- package.json
```

`SKILL.md` is intentionally short. Detailed marker rules and outcome guidance live in `references/` and are loaded only when needed.

The reference layout separates:

- `ai-markers.md`: diagnostic field guide based on Wikipedia's AI-writing signs.
- `outcome/`: practical rewrite behavior, channel style, source/markup integrity, and final self-check rubric.
- `lexicons/`: structured marker phrases for stricter lookup or future scripted scanning.

## Validate Locally

```bash
npm run validate
```

or:

```bash
python scripts/validate.py
```

The validation checks:

- `SKILL.md` frontmatter;
- skill length and required references;
- AI-marker reference coverage;
- `evals.json` schema and marker coverage.

## Evaluation Set

`evals.json` contains regression prompts for:

- marker removal;
- technical-term preservation;
- AI-marker density reporting;
- style/profile behavior;
- Markdown formatting cleanup;
- citation/reference leak removal.

The CI workflow validates that eval coverage stays aligned with the marker reference.

## Sources and Design Basis

This skill is based on:

- [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- [Claude Agent Skills best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [skills-best-practices](https://github.com/mgechev/skills-best-practices)
- [skills.sh docs](https://www.skills.sh/docs)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). New AI-writing markers should update both `references/ai-markers.md` and `evals.json`.

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
