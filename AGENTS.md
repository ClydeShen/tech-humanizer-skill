# Agent Guide: tech-humanizer-skill

This repository defines an agent skill for turning AI-shaped prose into credible
human writing while preserving technical, legal, medical, and source-sensitive
details.

## Project Map

- `SKILL.md` is the public skill contract. Keep it concise, procedural, and
  compatible with skill runners.
- `references/` contains the working rules used by the skill:
  - `ai-markers.md`: marker taxonomy and examples.
  - `bucket-quickref.md`: scoring buckets for recursive checks.
  - `rewrite-playbook.md`: rewrite techniques and preservation rules.
  - `final-rubric.md`: completion gates.
  - `channel-style.md`: channel-specific voice guidance.
  - `source-and-markup-integrity.md`: citation, link, Markdown, HTML, and claim
    handling.
  - `technical-terms.json`: protected technical terms.
  - `ai-style-lexicon.json`: strict marker lookup data.
  - `profile-schema.md`: local writing profile behavior.
- `assets/detection-report-template.txt` is used for structured detection
  reports.
- `scripts/validate.py` validates the skill structure and required references.
- `evals/` contains promptfoo eval configuration for human-vs-AI writing
  distinction tests against a local llama.cpp OpenAI-compatible server.

## Working Rules

- Preserve user edits. The working tree may be dirty; do not revert unrelated
  changes.
- Prefer small, focused patches. Do not reorganize reference files unless the
  task explicitly asks for it.
- Keep files UTF-8 and mostly ASCII. Use non-ASCII only when the source material
  or test case requires it.
- Do not add invented facts to examples, rubrics, or rewritten prose.
- For high-risk examples, preserve the exact safety, legal, medical, source,
  citation, URL, code, and measurement details supplied in the draft or test
  fixture.
- Avoid detector-evasion language. This project improves writing quality; it
  does not optimize for bypassing AI detectors.

## Documentation Lookup

Use the `ctx7` CLI whenever the user asks about a library, framework, SDK, API,
CLI tool, or cloud service, including setup, configuration, migrations, syntax,
or library-specific debugging.

1. Resolve the library first:

   ```bash
   npx ctx7@latest library <name> "<user's full question>"
   ```

2. Choose the best `/org/project` match by exact name, description relevance,
   snippet count, source reputation, and benchmark score.

3. Fetch docs:

   ```bash
   npx ctx7@latest docs <libraryId> "<user's full question>"
   ```

Use at most 3 Context7 commands per question. Run Context7 outside Codex's
default sandbox. If a Context7 command hits quota, tell the user and suggest
`npx ctx7@latest login` or `CONTEXT7_API_KEY`.

Do not use Context7 for business-logic debugging, refactoring, code review, or
general programming concepts.

## Skill Behavior Expectations

The skill workflow is `STRIP -> PROTECT -> DRAFT -> RECURSE -> Final check`.

- `STRIP`: remove high-severity AI markers and assistant-service residue.
- `PROTECT`: lock technical terms, identifiers, links, legal scope, safety
  instructions, and the draft's central claim.
- `DRAFT`: replace vague or ceremonial language with specific, channel-fit
  wording.
- `RECURSE`: rescore against marker buckets and fix the highest-scoring bucket
  first.
- `Final check`: run the gates in `references/final-rubric.md`.

When changing behavior, update the relevant reference file and then check
whether `SKILL.md`, evals, and README examples need to stay aligned.

## Evals

Promptfoo evals live directly under `evals/`; do not add nested suite folders
unless the user asks for them.

Current local provider:

```yaml
id: openai:chat:qwen2.5-coder-32b-instruct-q5_k_m.gguf
config:
  apiBaseUrl: http://localhost:8081/v1
  apiKey: llama.cpp
```

The evals test whether the skill can:

- convert AI-ish drafts into more human, channel-fit writing,
- preserve supplied facts and risk boundaries,
- avoid adding unsupported details,
- distinguish source-derived traits such as specificity, prosody, scoped
  academic claims, and detector-limit caveats.

Run only when requested or when verification requires it:

```bash
npx promptfoo@latest validate config -c evals/promptfooconfig.yaml
npx promptfoo@latest eval -c evals/promptfooconfig.yaml -o evals/output.json --no-cache --no-share
```

## Validation

For repository-level validation:

```bash
python scripts/validate.py
```

Run this after changing `SKILL.md`, `references/`, `assets/`, or validation
logic. Promptfoo eval validation is separate from repository validation.

## Useful Skills

Use the smallest relevant set:

- `tech-humanizer-skill`: humanize, detect AI markers, or polish prose.
- `promptfoo-evals`: create or refine promptfoo eval suites.
- `brainstorming`: before creative feature work or behavior changes.
- `writing-plans`: before multi-step implementation work.
- `systematic-debugging`: for bugs, failing tests, or unexpected behavior.
- `verification-before-completion`: before claiming completion.
- `review` or `gsd-code-review`: for code-review style analysis.
- `context-handover`: when context is near exhaustion.
