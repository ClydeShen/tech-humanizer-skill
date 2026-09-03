# tech-humanizer-skill

Turn AI-shaped prose into credible human writing without flattening useful technical language.

## Project

- **Repo**: ClydeShen/tech-humanizer-skill
- **Issue tracker**: GitHub Issues (`gh issue` CLI)
- **Validate**: `python scripts/validate.py` — run after changing `SKILL.md`, `references/`, or `assets/`.
- **Evals**: config and provider live in `evals/promptfooconfig.yaml`; run commands in `evals/README.md`. Run only when requested or when verification requires it.

## File map

- `SKILL.md` — the public skill contract read by skill runners. Keep it concise and procedural. The workflow, its steps, and their completion criteria live here and nowhere else — don't restate them elsewhere, they've changed shape more than once.
- `references/` — material the skill loads on demand (marker taxonomy, rewrite techniques, channel voice, source integrity, protected terms, the writing-profile schema). Each file's own heading says what it covers.
- `CONTEXT.md` — this project's own domain glossary (terms the skill itself uses to describe its own mechanics), not to be confused with the writing profiles the skill maintains for its *users*.

## Working rules

- Preserve user edits. The working tree may be dirty; do not revert unrelated changes.
- Prefer small, focused patches. Do not reorganize reference files unless the task explicitly asks for it.
- Keep files UTF-8 and mostly ASCII; use non-ASCII only when source material or a test fixture requires it.
- Do not add invented facts to examples, rubrics, or rewritten prose.
- For high-risk examples, preserve exact safety, legal, medical, source, citation, URL, code, and measurement details supplied in the draft or fixture.
- Avoid detector-evasion language — this project improves writing quality, it does not optimize for bypassing AI detectors.
- When changing behavior, update the owning reference file first, then check whether `SKILL.md`, `evals/`, and `README.md` examples still match it.
