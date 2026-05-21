# AI Writing Marker Reference

This reference is based on the marker families described in Wikipedia's "Signs of AI writing" guidance, adapted for technical documents, emails, messages, and collaborative writing.

Use it as a diagnostic map, not as a word blacklist. A marker matters when it makes the text sound generated, generic, evasive, over-polished, or assistant-authored.

## Contents

- Content markers
- Language markers
- Style and formatting markers
- Communication intent markers
- Reference and citation leaks
- Detection notes

## Content Markers

### C1. Unsupported Importance or Legacy Claims

Signals:

- "stands as a testament"
- "pivotal moment"
- "enduring legacy"
- "underscores its importance"
- "landmark achievement"
- "of paramount importance"
- "defining moment"

Fix:

- Replace the claim with a specific fact, consequence, metric, date, shipped behavior, or observable result.
- Delete the grand framing when no evidence is available.

### C2. Vague Attribution

Signals:

- "Experts argue"
- "Observers note"
- "Industry reports suggest"
- "Studies show"
- "Research suggests"
- "Many believe"
- "It is widely accepted"

Fix:

- Name the source, date, and finding if the source is real.
- Otherwise rewrite as the author's own reasoned position.

### C3. Promotional or Tourism-Like Framing

Signals:

- "boasts"
- "vibrant"
- "nestled"
- "groundbreaking"
- "revolutionary"
- "cutting-edge"
- "state-of-the-art"
- "world-class"
- "game-changing"
- "unparalleled"

Fix:

- Replace hype with concrete details: what changed, who uses it, how much, how fast, where, or under what constraint.

### C4. Dangling Participial Commentary

Signals:

- Sentence-final commentary beginning with "highlighting", "showcasing", "demonstrating", "underscoring", "reflecting", "emphasizing", "illustrating", or "signalling".

Fix:

- Delete the trailing phrase when it restates the sentence.
- If it adds useful meaning, rewrite it as a separate concrete claim.

### C5. Template Openers and Essay Structure

Signals:

- "In the realm of..."
- "In today's fast-paced landscape..."
- "At its core..."
- "It is worth noting that..."
- "This article will explore..."
- "Despite its X, Y faces challenges..."
- Overused conclusion formulas such as "In conclusion" or "Looking ahead".

Fix:

- Start with the actual claim or action.
- Remove meta-commentary about what the text will do.

### C6. Elegant Variation

Signals:

- Artificial synonyms used to avoid repetition: "software artisan" for developer, "data persistence repository" for database, "application programming interface entrypoint" for API, "keyboard wrangler" for developer.

Fix:

- Standardize on the simplest accurate term.
- Repeat the technical noun when repetition is clearer than synonym-chasing.

### C7. Generic Balance Without Judgment

Signals:

- Paragraphs that list benefits and challenges without choosing a position.
- "While X offers many advantages, it also presents challenges..." with no specific tradeoff.

Fix:

- Name the actual tradeoff, affected user, and decision criteria.

## Language Markers

### L1. High-Density AI Vocabulary

Common markers:

- additionally
- align with
- bolstered
- crucial
- delve
- emphasizing
- enduring
- enhance
- fostering
- garner
- highlight
- interplay
- intricate
- intricacies
- key
- landscape
- meticulous
- meticulously
- pivotal
- robust
- showcase
- tapestry
- testament
- underscore
- valuable
- vibrant

Fix:

- Replace abstract words with specific action verbs, measurable qualities, or direct nouns.
- If a word is a legitimate technical term in context, preserve it.

### L2. Copula Avoidance

Signals:

- "serves as" where "is" works.
- "features" where "has" or "includes" works.
- "represents" where "is" works.
- "functions as" where "is" works.

Fix:

- Use the simpler verb unless the longer phrase adds meaning.

### L3. Negative Parallelism

Signals:

- "Not only X, but also Y"
- "Not just X, but Y"
- "Not X, but Y" where no real correction is being made.

Fix:

- State the positive claim directly.
- Use "and" if both clauses matter.

### L4. Rule-of-Three Padding

Signals:

- Three adjectives or nouns used rhythmically: "fast, reliable, and scalable"; "simple, powerful, and intuitive".
- Exactly three parallel bullets where one or two would do.

Fix:

- Keep only distinct, meaningful items.
- Replace vague triples with concrete constraints or outcomes.

## Style and Formatting Markers

### S1. Title Case on Ordinary Words

Signal:

- Mid-sentence capitalization of common nouns, verbs, or adjectives.

Fix:

- Lowercase non-proper nouns, preserving acronyms, product names, and sentence starts.

### S2. Decorative Bold

Signal:

- Bold applied to ordinary adjectives, verbs, or whole phrases just to add emphasis.

Fix:

- Keep bold only for warnings, UI labels, field names, commands, or genuinely important terms.

### S3. Inline-Header Lists

Signal:

- Three or more bullets in the form `- **Label**: description`.

Fix:

- Convert to prose, a plain list, or a table when comparison is the real goal.

### S4. Em Dash Overuse

Signal:

- Multiple em dashes in one sentence or repeated dashes across a short passage.

Fix:

- Use commas, parentheses, colons, or sentence breaks. In technical contexts, ASCII hyphens are often more natural than typographic punctuation.

### S5. Curly Quotes in Technical Text

Signal:

- Curly quotes around code strings, CLI examples, identifiers, or chat-like prose.

Fix:

- Use straight ASCII quotes unless the output is a typeset publication with a house style.

### S6. Skipped Heading Levels

Signal:

- Markdown jumps from `#` to `###`, or from `##` to `####`.

Fix:

- Adjust heading levels so they increase one level at a time.

### S7. Redundant Thematic Breaks

Signal:

- `---` immediately before headings.

Fix:

- Delete the break and use normal spacing.

### S8. Table Overuse

Signal:

- Tables used for simple lists or explanations where prose is easier to scan.

Fix:

- Keep tables only for comparison, matrices, structured data, or repeated fields.

## Communication Intent Markers

### I1. Assistant Service Language

Signals:

- "Certainly!"
- "Of course!"
- "Absolutely!"
- "I hope this helps"
- "Happy to help"
- "Would you like me to..."
- "Is there anything else I can help you with?"
- "Feel free to ask"
- "Don't hesitate to reach out"

Fix:

- Delete service framing.
- Keep only the substantive message.

### I2. Knowledge-Cutoff Disclaimers

Signals:

- "As of my last knowledge update"
- "As of my knowledge cutoff"
- "Based on my training data"
- "I do not have information beyond..."
- "My knowledge only extends to..."

Fix:

- Replace with a dated, verifiable statement if needed.
- Otherwise remove the disclaimer.

### I3. Placeholder Residue

Signals:

- `[Your Name]`
- `[Company Name]`
- `[Project Name]`
- `[Date]`
- "Insert X here"
- "Replace this with..."
- "Add relevant details..."

Fix:

- Replace with actual details.
- If details are unknown, rewrite to avoid the placeholder.

### I4. Hedging and Meta-Commentary

Signals:

- "It is important to note that"
- "It is worth mentioning that"
- "Please note that"
- "Keep in mind that"
- "It should be noted that"
- "Notably,"
- "Importantly,"
- "Crucially,"

Fix:

- Start with the substantive claim.
- Use a structured note or warning only when the content is genuinely a note or warning.

## Reference and Citation Leaks

Signals:

- `turn0search0`
- `oaicite`
- `oai_citation`
- `contentReference`
- `attached_file`
- `[attachment: ...]`
- broken citation placeholders such as `[citation needed]` in non-Wikipedia prose
- raw search-query language such as "I found this in search result..."
- tracking parameters such as `utm_source=chatgpt.com`

Fix:

- Strip internal markers.
- Name the source naturally if a real source exists.
- Ask for the source if the claim depends on one and none is present.

## Detection Notes

- A sentence with multiple markers counts once for density.
- A passage can be human-written and still contain a marker; report it as a style risk, not proof of authorship.
- For technical documents, protect accepted technical terms before applying vocabulary rules.
- For user-facing reports, prioritize actionable fixes over exhaustive marker lists.
