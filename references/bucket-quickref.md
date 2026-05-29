# Bucket Quick Reference

Scoring model for RECURSE. Assign points per detected marker, then compare totals against thresholds.

| Bucket | Points per marker |
|---|---|
| Structure | 5 |
| Tone | 2 |
| Vocabulary | 2 |
| Formatting | 1 |

**Trigger:** paragraph score >= 5 pts OR document score >= 12 pts.
**Repair order:** fix the highest-scoring bucket first.
**Maximum:** 3 passes. Stop when below threshold.

---

## Structure (5 pts per marker)

- More than 2 consecutive sentences of similar length or structure (metronome rhythm)
- Passive voice cluster: 3 or more passive constructions in one paragraph when the actor is known
- Repetitive transition chain at paragraph openings: Moreover, Furthermore, Additionally stacked across adjacent paragraphs
- Every paragraph follows the same setup-body-conclusion shape with no variation

Ask: "Does this paragraph feel like a metronome? Could I predict the next sentence's length and shape before reading it?"

---

## Tone (2 pts per marker)

**Lead-Cutter cluster (C5, I4, I5, C9):** any sentence that could start at word 6 instead of word 1.

- Template openers: "In the realm of...", "In today's landscape...", "This section will discuss...", "At its core..."
- Hedging preamble: "It is important to note that...", "It is worth mentioning that...", "Please note that..."
- Compliance neutrality: "It is advisable to...", "One should consider...", "Users may wish to..."
- Over-contextualized background: long setup before a small operational answer
- Assistant service framing: "Hope this helps", "Feel free to ask", "Happy to assist"
- Generic balance without judgment: "While X offers advantages, it also presents challenges..." with no position stated

Ask: "Is the actual point buried behind a frame? Does the paragraph take a position or avoid one?"

---

## Vocabulary (2 pts per marker)

- High-density AI vocabulary: check `references/ai-style-lexicon.json` for current-era terms. Common examples: delve, tapestry, robust, meticulous, pivotal, showcase, foster, align with, enhance, underscore, garner, intricate, vibrant, testament, bolster, landscape.
- Elegant variation: synonym-swapping to avoid repeating a precise technical noun ("data persistence layer" instead of "database")
- Copula avoidance: "serves as" where "is" works, "represents" where "is" works, "functions as" where "is a" works
- Vague attribution: "experts argue", "research suggests", "industry reports indicate" with no named source
- Unsupported importance: "stands as a testament", "pivotal moment", "landmark achievement" with no concrete evidence
- Abstract evaluative adjectives where a specific measurement or outcome exists

Ask: "Are there abstract words stacked where a concrete measurement, a simple verb, or a named fact would work?"

---

## Formatting (1 pt per marker)

**Unconditional strip (handle in STRIP step, not scored against threshold):**
- Emoji: remove entirely
- Em dashes: replace with comma, colon, or parentheses
- Curly quotes: replace with straight ASCII quotes

**Scored formatting markers:**
- Title case on ordinary mid-sentence nouns, verbs, or adjectives (not acronyms or product names)
- Decorative bold on adjectives or whole phrases that are not warnings, UI labels, or commands
- Inline-header lists: 3 or more bullets in "**Label**: description" form that could be prose or a plain list
- Skipped heading levels: H2 jumping to H4
- Redundant horizontal rules placed before headings
- Formulaic summary blocks: "Key Takeaways" or "In summary" sections that restate the preceding content
- Over-sectioned output: more headings than the content justifies
- Intra-document register shift (S11): abrupt change in writing quality or tone between sections of the same document

Ask: "Does the formatting follow standard engineering Markdown conventions? Does the document read at a consistent register throughout?"
