# Final Humanization Rubric

Use this file before returning a humanized rewrite or detection report.

Score internally; do not show the score unless the user asks. Revise until the output passes every required gate.

## Required Gates

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

- sentence lengths have natural variation;
- the text has a clear authorial stance;
- it ends when the job is done;
- it uses concrete nouns and verbs more than abstract evaluation.

Fail if:

- every sentence is uniformly polished;
- every paragraph has a transition;
- the ending adds a generic summary or help offer;
- the prose sounds like a balanced overview when the user needed a decision.

## Quick Final Checklist

Before returning output, ask internally:

- Did I remove the strongest AI tells first?
- Did I keep technical precision?
- Did I avoid adding unsupported facts?
- Did I match the channel and audience?
- Would a teammate plausibly send this as-is?
- If a source is missing, did I expose that rather than hiding it?

If any answer is no, revise once more.
