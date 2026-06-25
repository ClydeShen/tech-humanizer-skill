# Final Humanization Rubric

Use this file before returning a humanized rewrite or detection report.

Score internally; do not show the score unless the user asks. Revise until the output passes every required gate.

## Required Gates

### 0. Verbatim Safety

Pass if:

- safety-critical phrases are copied word for word (dosing, timing, route, warning signs, stop/contact instructions);
- the draft's central claim uses the same key words (not synonyms);
- no legal term was added that is absent from the draft;
- no technical detail was invented (algorithm names, metrics, identifiers).

Fail if:

- "with food" became "with a meal";
- "technically correct" became "hits the technical marks";
- "third-party claims" or "consequential damages" appeared when the draft had neither;
- an implementation detail not in the draft was added to sound specific.

This gate takes priority over all style improvements. A rewrite that fails Gate 0 is wrong regardless of how human it sounds.

### 0b. Do Not Inflate Ordinary Verbs

Plain verbs are not AI markers. Formalizing them is the `inflated_formality` anti-pattern in `references/ai-style-lexicon.json` (the same list that flags `utilize`, `facilitate`, `commence`), applied to ordinary words.

Fail if a plain verb was swapped for a ceremonial synonym:

- `get` became `retrieve` or `obtain`;
- `show up` / `shows up` became `appear`;
- `open` became `access` or `navigate to`;
- `find`, `run`, `read`, `use`, `set up` were similarly inflated.

Keep these verbs verbatim. See `colloquial_jargon._meta.never_formalize` for the protected list. The legitimate direction is the opposite one: dev slang that stands in for a real technical concept (`baked into the build` -> `set at build time`) may be mapped to its term, one direction only. Standard event-driven phrasing (a trigger `fires`) is correct and must be preserved, not rewritten.

### 1. Meaning Preservation

Pass if:

- the core claim, ask, warning, or decision is unchanged;
- no factual claim was added without support;
- uncertainty remains visible where the source was uncertain.

Fail if:

- vague text was replaced with invented facts;
- a warning, condition, or legal/security qualifier disappeared;
- the rewrite changes who is responsible for an action.

### 2. Technical Preservation

Pass if:

- technical terms, acronyms, identifiers, commands, code snippets, API names, and product names remain intact;
- user-preferred domain terms from `writing-profile.json` are applied.

Fail if:

- a technical term was simplified into a less accurate general phrase;
- an identifier, flag, status code, endpoint, or metric changed.

### 3. AI Residue Removal

Pass if:

- no high-severity residue remains;
- medium-severity markers are removed unless they are justified by context;
- repeated low-severity markers no longer form a pattern.

Fail if output still contains:

- assistant service language;
- knowledge-cutoff disclaimers;
- leaked retrieval/citation tokens;
- placeholder text;
- unsupported grand significance claims;
- stacked AI vocabulary.

### 4. Specificity and Evidence Boundary

Pass if:

- generic claims become concrete where evidence exists;
- unsupported specifics are narrowed, flagged, or removed;
- source-related problems are not disguised as polished prose.

Fail if:

- the rewrite sounds more confident than the input supports;
- source laundering remains;
- false specificity remains without a source.

### 5. Channel Fit

Pass if:

- the register matches the target: Slack, email, PR, docs, release note, client report, or encyclopedia-like prose;
- structure suits the channel;
- the closing feels natural for that format.

Fail if:

- a Slack message reads like a formal letter;
- a design doc reads like marketing copy;
- a client email reads like a chatbot response;
- headings/tables/lists are used because AI tends to use them, not because the reader needs them.

### 6. Human Texture

Pass if:

- sentence lengths vary: the standard deviation is noticeable (bursts of short sentences, occasional longer ones);
- at least one equivocal connective is present where the content supports it (but, however, although, because);
- the text has a clear authorial stance — not a balanced overview;
- it ends when the job is done;
- it uses concrete nouns and verbs more than abstract evaluation.

Fail if:

- every sentence is uniformly medium-length and polished (low burstiness);
- every paragraph has an AI-style transition ("Furthermore," "Additionally," "In conclusion");
- the ending adds a generic summary, help offer, or ceremonial close;
- the prose sounds statistically average — fluent, broadly likeable, and unmemorable;
- the specific word was replaced with the probable word throughout.

## Quick Final Checklist

Before returning output, ask internally:

- Did I remove the strongest AI tells first?
- Did I keep technical precision?
- Did I avoid adding unsupported facts?
- Did I match the channel and audience?
- Would a teammate plausibly send this as-is?
- If a source is missing, did I expose that rather than hiding it?

If any answer is no, revise once more.
