# Writing Profile Schema

The skill maintains two files, split by scope:

- **`~/.claude/tech-humanizer/user-profile.json`** -- the user's own writing habits: `preferences`, `style_notes`, `recurring_patterns`, `syntactic_dna`, `observations`, `do_not_change`. This is how a person writes, not what any one project is about. It applies across every project and is never project-specific.
- **`writing-profile.json`** in the project's current working directory -- `domain_terms` only. This is the project's own vocabulary (e.g., "canary deployment"), which is meaningless or actively wrong outside that project. Keep it out of the global file so one project's jargon never surfaces in another.

Before writing to either file, check `references/ai-markers.md` and `references/ai-style-lexicon.json` for a built-in rule that already covers the correction (e.g., a user rejecting a decorative unicode bullet -- see S12). If a built-in rule already covers it, apply that rule and skip the profile write; relearning a universal marker per user duplicates what the skill already knows.

**Existing single-file profiles:** a `writing-profile.json` written before this split may still carry personal fields (`preferences`, `syntactic_dna`, etc.) alongside `domain_terms`. Read those fields for the current session as a fallback, but write all new personal-field updates to `user-profile.json` going forward -- do not add to the project file's personal fields again.

Create or update `user-profile.json` when the user:

- explicitly gives a wording preference;
- corrects a phrase;
- **reverts** a change the skill made (record a `do_not_change` negative preference);
- restates something the skill rewrote, signalling the original was better;
- asks the skill to learn their style;
- provides writing samples to imitate.

Create or update `writing-profile.json` (project-local) when the user mentions domain terminology that should be preserved or preferred for this project.

Learning is **active**: capture a low-friction `observations` entry on any correction, revert, or restatement — do not wait for an explicit "learn my style" request. Observations accumulate and promote to a durable field once they cross the threshold below.

### Generalize, don't relearn per instance

A correction usually implies a class, not one literal token. When the user rejects one member of a class (one decorative bullet, one filler phrase), write the `do_not_change` or `preference` at the level of the class the evidence supports, with an `examples` array that accumulates instances -- not a fresh entry per instance. "Rejected ● as a bullet" generalizes to "rejected decorative unicode bullets/enumeration glyphs as list markers," which then already covers ①②③ and ▪ without a second correction.

This does not apply to genuinely one-off word preferences (`utilize -> use` is already maximally specific -- there is no broader class to lift it into).

### Observation promotion threshold

- A new `observations` entry starts at `confidence: "low"`.
- A second independent agreement raises it to `medium`; a third raises it to `high`.
- Promote to a `preference` (or `do_not_change`) at `high`, or immediately if the user stated it explicitly.
- `syntactic_dna` still requires 3 independent observations regardless of confidence (see **Syntactic DNA sourcing rules** for what counts as independent) — observations below that may be held provisionally but not committed to `syntactic_dna`.

### Syntactic DNA sourcing rules

`syntactic_dna` entries are written under stricter conditions than other profile fields:

- **Valid sources:**
  - the user's own typed conversation messages (2+ complete sentences, 30+ words);
  - a document, file, or pasted block the user explicitly flags as their own writing ("this is something I wrote", "here's my style", a shared doc with the user as author) -- this counts as evidence even though it did not originate as a chat message, and unlike a chat message it may contain enough internal repetition to satisfy the commit threshold by itself (see below);
  - corrections the user makes to skill output (a revert or restate signals the original matched their voice).
- **Invalid source:** text the user submits for humanization. That text may be AI-generated and cannot be used as style evidence.
- **Commit threshold:** a pattern commits to `syntactic_dna` once it has been observed 3 times independently, from any mix of valid sources. Three occurrences within one flagged writing sample count, since the sample is a single act of evidence-giving with enough internal repetition to demonstrate a habit; three occurrences spread across chat messages in a single live turn do not (that is one observation, not three). Do not write after a single independent observation.
- **Format:** descriptive prose observations, not numeric measurements. "Leads with a short declarative sentence, then follows with a longer explanation" not "avg sentence length: 14 words."
- **Scope:** `syntactic_dna` governs both sentence-level rhythm (length variation, punctuation habits, pacing) and passage-level structure (what the user characteristically leads with, how they sequence claim and justification, where they place caveats). It does not override Senior Engineer Voice content decisions -- Senior Engineer Voice decides *what* to lead with when the two are silent; a captured `syntactic_dna` structural habit for this specific user wins when they conflict.

## Schema

### `~/.claude/tech-humanizer/user-profile.json` (global, cross-project)

```json
{
  "preferences": [
    {
      "original": "utilize",
      "preferred": "use",
      "context": "General engineering prose",
      "added_at": "2026-05-22T00:00:00Z"
    }
  ],
  "style_notes": [
    {
      "note": "Prefers short, direct PR comments with concrete next steps.",
      "evidence": "User corrected a verbose review comment.",
      "added_at": "2026-05-22T00:00:00Z"
    }
  ],
  "recurring_patterns": [
    {
      "pattern": "Overuse of passive voice in deployment updates",
      "action": "Prefer active subject + verb when the actor is known.",
      "observed_at": "2026-05-22T00:00:00Z"
    }
  ],
  "syntactic_dna": [
    {
      "observation": "Leads with a short declarative sentence, then follows with a longer explanatory sentence.",
      "evidence": "Observed across 3 writing samples provided on 2026-05-22.",
      "added_at": "2026-05-22T00:00:00Z"
    }
  ],
  "observations": [
    {
      "observation": "Leaves plain verbs alone; pushed back on get -> retrieve.",
      "confidence": "low",
      "evidence": "User reverted one edit on 2026-06-26.",
      "added_at": "2026-06-26T00:00:00Z"
    }
  ],
  "do_not_change": [
    {
      "pattern": "get -> retrieve",
      "reason": "Reverted 2026-06; plain verb, not jargon.",
      "examples": ["get the project number"],
      "added_at": "2026-06-26T00:00:00Z"
    },
    {
      "pattern": "decorative unicode bullets/enumeration glyphs as list markers",
      "reason": "Rejected 2026-09; generalizes across any glyph in the class, not just the one corrected.",
      "examples": ["●", "①②③"],
      "added_at": "2026-09-03T00:00:00Z"
    }
  ],
  "version": "3.0"
}
```

### `writing-profile.json` (project-local, in the project's working directory)

```json
{
  "domain_terms": [
    {
      "term": "canary deployment",
      "preferred_over": "gradual rollout",
      "context": "Release process terminology",
      "added_at": "2026-05-22T00:00:00Z"
    }
  ],
  "version": "3.0"
}
```

## Limits

`user-profile.json`:
- `preferences`: keep the newest 50 entries.
- `style_notes`: keep the newest 25 entries.
- `recurring_patterns`: keep the newest 25 entries.
- `syntactic_dna`: keep the newest 20 entries.
- `observations`: keep the newest 50 entries; drop an observation once it has been promoted.
- `do_not_change`: keep the newest 50 entries.

`writing-profile.json`:
- `domain_terms`: keep the newest 100 entries.

When a visible user preference or domain term is evicted, mention it briefly. Silent inferred pattern eviction does not need a message.

## Conflict Resolution

1. Explicit user correction wins.
2. A `do_not_change` rule blocks the edit it names, even if a general humanization rule would make it. The loader treats it as a first-class block, not a hint. Its `reason` field exists so a future session knows why and does not relearn the change.
3. Domain term preference wins over general humanization.
4. Technical terminology preservation wins over AI-vocabulary replacement.
5. Target channel style wins over generic "make it human" style.

`domain_terms` extends the skill's generic `references/technical-terms.json`: the two are merged at load time and `domain_terms` wins on conflict. Project terms live only in the project's `writing-profile.json`, never in the skill's own references and never in the global `user-profile.json`.

If the instruction is ambiguous, preserve the original meaning and ask only when the rewrite would change a factual claim, legal meaning, security constraint, or commitment.
