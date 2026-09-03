# Context: tech-humanizer-skill

## Domain

tech-humanizer-skill is a Claude Code skill for detecting and removing AI-writing markers from prose while preserving technical terminology. It targets software engineers writing documentation, PRs, emails, and release notes.

## Key terms

| Term | Definition |
|---|---|
| AI marker | Word, phrase, or pattern statistically associated with AI-generated text (see `references/ai-markers.md`) |
| Humanize | Transform AI-shaped text into credible human writing |
| Senior Engineer Voice | The positive writing target after humanization — direct, opinionated, precise |
| Syntactic DNA | Per-author rhythm: sentence length, punctuation habits, pacing |
| STRIP phase | Unconditional first-pass removal of high-severity markers |
| PROTECT phase | Preservation of technical terms, code identifiers, CLI flags, and links |
| DRAFT phase | Replacement of remaining markers with specific, grounded language |
| RECURSE pass | Additional pass that checks output against the full marker inventory |
| Bucket | Marker category grouping (see `references/bucket-quickref.md`) |
| Writing profile | Project-local `writing-profile.json`: `domain_terms` only, scoped to one project |
| User profile | Global `user-profile.json` (`~/.claude/tech-humanizer/`): wording preferences, syntactic DNA, corrections — shared across every project |
| Reader language level | Explicit-only axis (see `references/reader-level.md`) that adjusts sentence syntax for a stated non-native audience without touching terminology |

## Decisions

<!-- Log significant design decisions as ADRs in docs/adr/. Link them here. -->
