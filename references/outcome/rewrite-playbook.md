# Humanization Rewrite Playbook

Use this file after `references/ai-markers.md` identifies likely AI-shaped passages. The goal is not to hide authorship; the goal is to make the text useful, owned, specific, and suited to its channel.

## Outcome Definition

A strong humanized rewrite should:

- sound like someone with a reason to write it;
- keep the author's actual claim, uncertainty, and risk posture;
- replace generic significance with concrete consequences;
- use technical terms naturally, not decoratively;
- avoid assistant-service stance;
- avoid smooth-but-empty transitions;
- preserve evidence boundaries instead of making unsupported claims sound cleaner.

## Rewrite Sequence

1. **Remove residue first**: assistant phrases, knowledge-cutoff disclaimers, placeholders, leaked citations, broken markup, and search tokens.
2. **Identify the job of the text**: inform, request, decide, warn, summarize, persuade, document, or review.
3. **Protect technical and user-specific terms**: consult `references/technical-terms.md` and `writing-profile.json`.
4. **Replace generic claims with specific claims**: keep metrics, actors, dates, constraints, examples, and observed behavior.
5. **Restore author ownership**: name who did what, what changed, what is uncertain, and what the reader should do.
6. **Simplify language**: cut inflated verbs, vague adjectives, ceremonial framing, and repeated summaries.
7. **Reshape structure**: use headings, bullets, tables, and emphasis only when the target channel benefits from them.
8. **Run the final rubric**: use `references/outcome/final-rubric.md`.

## Transformation Patterns

### Generic Importance to Concrete Outcome

Before:

```text
This release represents a pivotal moment for the platform and underscores our commitment to innovation.
```

After:

```text
This release adds project-level audit logs and cuts export time from 90 seconds to 20 seconds.
```

If no concrete detail exists:

```text
This release adds the first version of project-level audit logs.
```

### Vague Authority to Owned Reasoning

Before:

```text
Experts argue that this approach improves reliability.
```

After:

```text
This approach improves reliability when failures are transient, because the retry can succeed after the upstream service recovers.
```

If the source matters:

```text
Name the source or leave the claim as an internal rationale.
```

### Marketing Tone to Observable Description

Before:

```text
Our cutting-edge platform boasts a vibrant developer ecosystem.
```

After:

```text
The platform supports plugin packages, public API keys, and a community template registry.
```

### Assistant Stance to Author Stance

Before:

```text
Certainly! I hope this helps clarify the deployment process. Let me know if you need anything else.
```

After:

```text
The deployment process is below.
```

For a teammate:

```text
Deploy steps are below. Ping me if any step is unclear.
```

Only keep a help offer when the target channel naturally expects one and it names a concrete next step.

### Over-Polished Transitions to Natural Flow

Before:

```text
Furthermore, the service validates tokens. Additionally, it logs failed attempts. Consequently, teams can investigate incidents.
```

After:

```text
The service validates tokens and logs failed attempts, which gives teams enough detail to investigate incidents.
```

### Passive Compliance Voice to Actor and Action

Before:

```text
Care should be taken to update the implementation.
```

After:

```text
Please update the implementation to reject expired tokens before the database call.
```

### Placeholder Residue to Usable Draft

Before:

```text
Hi [Recipient Name], please review [Project Name] by [Date].
```

After when values are known:

```text
Hi Priya, please review the Atlas migration by Friday.
```

After when values are unknown:

```text
Please review the migration by the agreed deadline.
```

### False Specificity to Evidence Boundary

Before:

```text
The tool is used by millions of developers worldwide.
```

After without source:

```text
The tool is used by development teams that need release approvals and audit logs.
```

After with source:

```text
According to the March 2026 usage report, 2.1 million developer accounts created at least one release approval in Q1.
```

## Controlled Imperfection

Human writing is not made better by adding typos, slang, or randomness. Use controlled imperfection instead:

- Keep one direct sentence where AI would add a transition.
- Prefer one concrete example over a balanced list of every possible angle.
- Allow mild asymmetry in sentence length.
- Let the conclusion end when the work is done; do not add a ceremonial closing.
- Preserve domain shorthand when the audience would use it.

## What Not to Do

- Do not add fake facts, fake citations, or fake personal anecdotes.
- Do not make professional writing casual by default.
- Do not remove useful warnings or legal/security qualifiers.
- Do not replace every flagged word mechanically.
- Do not make the text choppy just to avoid polish.
