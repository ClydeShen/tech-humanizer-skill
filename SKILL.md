---
name: tech-humanizer-skill
description: Use this skill when the user asks to humanize, rewrite, de-AI, polish, or detect AI writing in documents, emails, chat messages, pull request text, release notes, technical docs, or other prose. It removes AI-writing markers while preserving technical terminology, reports AI-marker density with concrete fixes, and learns the user's wording preferences, domain terms, and recurring writing habits over time. Don't use for grammar correction unrelated to AI markers, original content generation, fact-checking source material, or translating between languages.
version: 2.1.0
author: ClydeShen
license: MIT
---

# tech-humanizer-skill

Turn AI-shaped prose into credible human writing without flattening useful technical language.

Use this skill for three jobs:

- **Humanize**: rewrite documents, emails, messages, technical docs, PR descriptions, release notes, and similar prose.
- **Detect**: estimate AI-marker density and give targeted rewrite suggestions.
- **Learn style**: maintain a local writing profile for user preferences, domain terms, syntactic DNA, and recurring corrections.

## Load Order

Read only what the task needs:

- Humanizing (RECURSE): read `references/bucket-quickref.md`.
- Humanizing or detection (detail): read `references/ai-markers.md`.
- Humanizing output: also read `references/rewrite-playbook.md` and `references/final-rubric.md`.
- Channel-specific rewrites: read `references/channel-style.md`.
- Text with citations, links, Markdown, HTML, wiki markup, or source claims: read `references/source-and-markup-integrity.md`.
- Strict marker lookup or scripted scanning: read `references/ai-style-lexicon.json`.
- Technical or product text: also read `references/technical-terms.json`.
- User asks about profile behavior or persistent learning: read `references/profile-schema.md`.
- Terminology alignment: read `CONTEXT.md`.
- Detection reports: use `assets/detection-report-template.txt` when the user needs a structured report.
- Validating this skill as a repository maintainer: run `python scripts/validate.py`.

## Core Principles

- Preserve exact technical terms, product names, acronyms, code identifiers, CLI flags, API names, and domain-specific jargon unless the user explicitly asks to change them.
- Replace AI markers with specific, grounded, author-like language. Do not merely swap one fancy word for another.
- Prefer direct claims over ceremonial framing, vague attribution, generic importance claims, and assistant-style service language.
- Match the target channel: a Slack message should sound different from a client report, release note, or engineering design doc.
- Keep the user's intent and risk posture. Do not soften warnings, remove constraints, or alter commitments.
- Prioritize authentic technical voice over detector evasion. Do not artificially inflate perplexity or burstiness scores to game AI detectors; natural sentence-length variation and precise word choice are legitimate writing goals.
- If the input is already clean, say so and avoid unnecessary rewriting.

## Senior Engineer Voice

The positive target after humanization. Defines what to move toward, not only what to remove.

- **Lead with the constraint, not the category.** Do not say "there are performance considerations." Say "this will timeout after 30s under load."
- **Opinions without apology.** A senior engineer takes positions. "I would use Postgres here" not "one option is Postgres."
- **Incomplete is fine when incomplete is true.** Leave open questions open. Do not resolve ambiguity the user did not resolve.
- **Repetition over rotation.** Use the same precise term twice rather than inventing a synonym. "The cache" is always "the cache."
- **Dry beats enthusiastic.** Understatement signals confidence. "This works" is stronger than "this is a powerful solution."

Syntactic DNA governs rhythm (sentence length, punctuation habits, pacing). Senior Engineer Voice governs content decisions (what to lead with, claim scoping, position-taking). They operate on separate axes and do not conflict.

## Humanize Workflow (STRIP -> PROTECT -> DRAFT -> RECURSE)

1. **Identify** the target format and audience: document, email, message, PR, release note, technical doc, or other.
2. **STRIP** -- Remove unconditionally on every pass: I1 (assistant service language), I2 (knowledge-cutoff disclaimers), I3 (placeholder residue), I4 ceremonial openers where they add no meaning, M1-M3 (markup leaks, broken citations, internal tokens). Also remove regardless of score: emoji (remove entirely), em dashes (replace with comma, colon, or parentheses), curly quotes (replace with straight ASCII quotes). See severity **High** in `references/ai-markers.md`.

   **Product copy channels:** Do not invent product names or brands not present in the source draft. If the draft has no product name, frame the product descriptively — e.g., "this double-walled travel mug," not an invented brand like "CommuterShield." A source pattern that describes a human example "adding a product name" licenses descriptive framing only; it is not permission to invent a name. Remove product-copy formula phrases (Perfect for, Ideal for, Introducing, Designed for) as AI markers.

3. **PROTECT** -- Load `references/technical-terms.json` and `writing-profile.json` (including `syntactic_dna` when present). Lock protected terms and apply explicit preferences. Also lock verbatim-required phrases before drafting: safety instructions, legal scope terms, the draft's central claim. See `references/rewrite-playbook.md § Verbatim Preservation`.

   **Clinical/legal/safety terminology:** When a reference provides specific professional terms (e.g., "prescribing clinician", "hold harmless", "sentence-length diversity"), treat those as required verbatim — do not substitute colloquial or near-synonym equivalents. Reference terms take priority over synonyms in the draft: if the reference says "prescribing clinician," use that exact phrase even if the draft says "your doctor." These terms carry precision the author chose deliberately.

4. **DRAFT** -- Rewrite with lead-fronting, active voice, and channel fit. Load `references/rewrite-playbook.md`, `references/final-rubric.md`, and `references/channel-style.md` when the channel is clear. Load `references/source-and-markup-integrity.md` when sources or markup matter.

   **Voice (limited):** Vary sentence length; lead with facts or actions; prefer one concrete detail over abstract triples; use first person only when the channel and profile allow. Do not invent facts, metrics, or anecdotes.

   **Channel-fit voice:** For forum and conversational channels, write as a participant making a felt observation — not an analyst explaining. Let rhythm and phrasing demonstrate the point rather than describe it. Vary sentence length aggressively: the gap between the shortest and longest sentence in a passage should span at least 6 words. Include at least one sentence under 8 words and at least one over 15 words. For casual explanation channels with a directional opinion in the source, explain the causal connection between mechanism and effect — commit to the position rather than hedging. Stating only the outcome ("can feel less distinctive") is neutral; naming the cause ("the model always picks what's most probable, so the result regresses toward plausible rather than distinctive") commits to a position.

   **Study claim scoping:** When source material references a specific corpus, study, or named author, keep every empirical claim scoped to that source. Preserve comparison entities from the draft (e.g., do not replace "ChatGPT" with "other writing"). Do not add evaluative conclusion sentences that generalize beyond the stated findings.

   **Claim Scoping:** When a claim meets all three conditions, narrow its logical scope (do not add hedging qualifiers): (1) uses absolute certainty language such as always, never, definitely, it is clear, universally; (2) no supporting evidence appears within 2 sentences; (3) the claim is empirical -- about measurable behavior or facts, not a stated design decision or preference. Design decisions and stated preferences are protected even without evidence.

   - Before: "This approach always outperforms the naive implementation."
   - After: "This approach outperformed the naive implementation in our load tests."

   **Evidence gate:** Strengthen claims that have citations or supplied data. Delete filler hedging (it is important to note). Do not soften security warnings, legal qualifiers, or user-stated commitments.

   **SNR guideline:** Aim for 15-25% word reduction in AI-padded technical drafts by removing preamble, restatement, and ceremonial hedging. Do not cut to hit a number. Every sentence earns its length.

5. **RECURSE** -- Score with `references/bucket-quickref.md` using weighted points per detected marker: Structure 5 pts, Tone 2 pts, Vocabulary 2 pts, Formatting 1 pt. Refine surgically when:
   - paragraph score >= 5 pts, or
   - document score >= 12 pts.
   Repair the highest-scoring bucket first. Maximum **3 passes**. Stop when below threshold.
6. **Final check** -- Run `references/final-rubric.md`. Revise if any required gate fails.
7. **Return** the rewritten text only (silent output). Append a Changes list only if the user asked for explanation.

### Humanize Output

Default output is only the rewritten text.

If the user asks for explanation, append:

```text
Changes:
- "<original>" -> "<replacement>": <brief reason>
```

## Style Learning

The skill observes the user's own conversation messages to build `syntactic_dna` in `writing-profile.json`. Sampling triggers when a user message contains 2 or more complete sentences totalling 30 or more words. The skill extracts descriptive structural observations (rhythm patterns, punctuation habits, voice register), not numeric measurements. A pattern is committed to `syntactic_dna` only after 3 independent session observations agree.

Syntactic DNA governs rhythm. Senior Engineer Voice governs content decisions. The two do not conflict.

Explicit preferences (word choices, domain terms, corrections to skill output) are written to `writing-profile.json` immediately when stated.

Sampling never applies to text submitted for humanization. Only the user's own typed messages qualify as style evidence.

## Error Handling

- **Draft has no AI markers**: Return the draft unchanged and note it is already clean.
- **Channel is unknown**: Default to technical documentation register. Ask for the channel if register would materially change the rewrite.
- **writing-profile.json is missing or malformed**: Proceed without profile preferences. Do not create the file until the user gives an explicit preference or correction.
- **Technical term not in `references/technical-terms.json`**: Treat unfamiliar domain terms as protected unless the user identifies them as AI marker vocabulary.
- **Source claim cannot be verified**: Flag as source-integrity issue. Do not rewrite it to sound confident. See `references/source-and-markup-integrity.md`.
- **Verbatim phrase conflicts with a detected AI marker**: Verbatim preservation wins. Copy the phrase as-is and adjust surrounding prose instead.
