---
name: tech-humanizer-skill
description: Use this skill when the user asks to humanize, rewrite, de-AI, polish, or detect AI writing in documents, emails, chat messages, pull request text, release notes, technical docs, or other prose. It removes AI-writing markers while preserving technical terminology, reports AI-marker density with concrete fixes, and learns the user's wording preferences, domain terms, and recurring writing habits over time.
version: 1.0.0
author: ClydeShen
license: MIT
---

# tech-humanizer-skill

Turn AI-shaped prose into credible human writing without flattening useful technical language.

Use this skill for three jobs:

- **Humanize**: rewrite documents, emails, messages, technical docs, PR descriptions, release notes, and similar prose.
- **Detect**: estimate AI-marker density and give targeted rewrite suggestions.
- **Learn style**: maintain a local writing profile for user preferences, domain terms, and recurring corrections.

## Load Order

Read only what the task needs:

- Humanizing or detection: read `references/ai-markers.md`.
- Humanizing output: also read `references/outcome/rewrite-playbook.md` and `references/outcome/final-rubric.md`.
- Channel-specific rewrites: read `references/outcome/channel-style.md`.
- Text with citations, links, Markdown, HTML, wiki markup, or source claims: read `references/outcome/source-and-markup-integrity.md`.
- Strict marker lookup or scripted scanning: read `references/lexicons/ai-style-lexicon.json`.
- Technical or product text: also read `references/technical-terms.md`.
- User asks about profile behavior or persistent learning: read `references/profile-schema.md`.
- Detection reports: use `assets/detection-report-template.txt` when the user needs a structured report.
- Validating this skill as a repository maintainer: run `python scripts/validate.py`.

## Core Principles

- Preserve exact technical terms, product names, acronyms, code identifiers, CLI flags, API names, and domain-specific jargon unless the user explicitly asks to change them.
- Replace AI markers with specific, grounded, author-like language. Do not merely swap one fancy word for another.
- Prefer direct claims over ceremonial framing, vague attribution, generic importance claims, and assistant-style service language.
- Match the target channel: a Slack message should sound different from a client report, release note, or engineering design doc.
- Keep the user's intent and risk posture. Do not soften warnings, remove constraints, or alter commitments.
- If the input is already clean, say so and avoid unnecessary rewriting.

## Humanize Workflow

1. Identify the target format and audience from the request: document, email, message, PR, release note, technical doc, or other.
2. Load `references/ai-markers.md`, `references/outcome/rewrite-playbook.md`, and `references/outcome/final-rubric.md`.
3. If the target channel is clear, load `references/outcome/channel-style.md`. If the text contains source claims, citations, links, Markdown, HTML, wiki markup, or retrieval tokens, load `references/outcome/source-and-markup-integrity.md`.
4. If the text is technical, load `references/technical-terms.md` and treat those terms as protected.
5. Load `writing-profile.json` from the current working directory if it exists. Apply explicit user preferences and domain terms before general style rules.
6. Scan the text across the marker dimensions: content, language, style/formatting, communication intent, markup/citations/sources, and comment-style residue.
7. Rewrite marked passages using concrete wording, simpler structure, and the user's register. Preserve evidence boundaries instead of making unsupported claims sound more confident.
8. Preserve technical terminology and identifiers verbatim unless the profile says the user prefers a different term.
9. Self-check the output with `references/outcome/final-rubric.md`. Revise again if any required gate fails.
10. Return the rewritten text. If the user asked for an explanation, add a short change list after the rewrite.

### Humanize Output

Default output is only the rewritten text.

If the user asks for explanation, append:

```text
Changes:
- "<original>" -> "<replacement>": <brief reason>
```

For empty input, respond:

```text
Input text is empty. Please provide the content you want rewritten.
```

## Detect Workflow

1. Load `references/ai-markers.md`; load `references/technical-terms.md` when the text is technical.
2. Split the text into sentences or sentence-like units. Count each sentence at most once.
3. Mark sentences containing one or more AI markers, ignoring protected technical terms.
4. Calculate `AI marker density = floor(marked_sentences / total_sentences * 100)`.
5. Group findings under all report dimensions, even when a section has zero findings.
6. For each non-empty dimension, provide at least one actionable fix with original fragment, issue, and rewrite example.

### Detect Output

Use this structure:

```text
AI marker density: <N>%

Content: <count>
- Location: <paragraph/sentence>
  Fragment: "<text>"
  Issue: <why it reads AI-shaped>
  Rewrite example: "<example>"

Language: <count>
...

Style and formatting: <count>
...

Communication intent: <count>
...

Markup, citations, and sources: <count>
...

Comment-style residue: <count>
...
```

For empty input, respond:

```text
Input document is empty. I cannot run detection without text.
```

## Learning User Style

Use `writing-profile.json` in the current working directory when available. If it does not exist, continue normally and create it only when the user gives a preference, correction, sample, or asks you to learn their style.

Record:

- **Preference corrections**: "use X instead of Y", "we say X", "avoid Y".
- **Domain terms**: team, product, architecture, or business terms the user wants preserved or preferred.
- **Style samples**: short examples of the user's own writing, summarized into practical guidance.
- **Recurring patterns**: repeated L1-transfer or habit patterns that the user corrects or that appear at least twice in the same submitted text.

Do not expose sensitive inferences. When recording a profile update, confirm only the concrete preference or term that was saved.

Profile storage and limits are defined in `references/profile-schema.md`.

## Gotchas

- Some words in AI-marker lists are legitimate technical terms in context. Check `references/technical-terms.md` before flagging them.
- "Human" does not mean casual. A humanized client report can still be formal, precise, and restrained.
- Do not invent facts to replace vague claims. If a claim needs evidence and no evidence is available, make the sentence more honest or ask for the missing detail.
- Do not remove citations, warnings, legal qualifiers, or security constraints just because they look formal. Remove only AI-shaped filler and malformed reference leaks.
- Preserve code blocks and commands unless the user asks to rewrite them.
