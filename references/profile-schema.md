# Writing Profile Schema

The skill may maintain `writing-profile.json` in the user's current working directory. The file is local to the project where the user invokes the skill.

Create or update this file only when the user:

- explicitly gives a wording preference;
- corrects a phrase;
- asks the skill to learn their style;
- provides writing samples to imitate;
- mentions domain terminology that should be preserved or preferred.

### Syntactic DNA sourcing rules

`syntactic_dna` entries are written under stricter conditions than other profile fields:

- **Valid sources:** explicit writing samples the user flags as their own work, and corrections the user makes to skill output.
- **Invalid source:** text the user submits for humanization. That text may be AI-generated and cannot be used as style evidence.
- **Commit threshold:** write an observation to `syntactic_dna` only after 3 independent session observations agree on the same pattern. Do not write after a single session.
- **Format:** descriptive prose observations, not numeric measurements. "Leads with a short declarative sentence, then follows with a longer explanation" not "avg sentence length: 14 words."
- **Scope:** `syntactic_dna` governs rhythm (sentence length variation, punctuation habits, pacing). It does not override Senior Engineer Voice content decisions.

## Schema

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
  "domain_terms": [
    {
      "term": "canary deployment",
      "preferred_over": "gradual rollout",
      "context": "Release process terminology",
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
  "version": "2.0"
}
```

## Limits

- `preferences`: keep the newest 50 entries.
- `domain_terms`: keep the newest 100 entries.
- `style_notes`: keep the newest 25 entries.
- `recurring_patterns`: keep the newest 25 entries.
- `syntactic_dna`: keep the newest 20 entries.

When a visible user preference or domain term is evicted, mention it briefly. Silent inferred pattern eviction does not need a message.

## Conflict Resolution

1. Explicit user correction wins.
2. Domain term preference wins over general humanization.
3. Technical terminology preservation wins over AI-vocabulary replacement.
4. Target channel style wins over generic "make it human" style.

If the instruction is ambiguous, preserve the original meaning and ask only when the rewrite would change a factual claim, legal meaning, security constraint, or commitment.
