# Contributing to tech-humanizer-skill

Thanks for helping improve `tech-humanizer-skill`. This is a personal open-source project, so the process is intentionally lightweight: clear issues, small pull requests, and regression coverage for behavior changes.

## Good Contributions

- Add or refine AI-writing markers in `references/ai-markers.md`.
- Expand the technical terminology whitelist in `references/technical-terms.md`.
- Improve profile behavior in `references/profile-schema.md` or `SKILL.md`.
- Add evals for missed AI markers, false positives, or technical-term preservation.
- Improve documentation for installation or compatibility with agent tools.

## Before Opening a Pull Request

1. Keep `SKILL.md` lean. Put detailed rules in `references/`.
2. Keep supporting files one level deep under `references/`, `scripts/`, or `assets/`.
3. Add or update evals in `evals.json` for any behavior change.
4. Run validation:

```bash
npm run validate
```

or:

```bash
python scripts/validate.py
```

## Adding an AI-Writing Marker

Update `references/ai-markers.md` with:

- marker ID and name;
- signal patterns;
- rewrite behavior;
- at least one concrete example if useful.

Then add an eval entry in `evals.json` with:

- a realistic user prompt;
- expected output behavior;
- assertions;
- the marker ID in `covers`.

## Pull Request Checklist

- The change is scoped to one clear behavior or documentation improvement.
- `npm run validate` passes.
- New marker behavior has eval coverage.
- Technical terms are preserved unless the change intentionally updates the whitelist.
- The PR description explains the user-facing effect.

## Code of Conduct

By participating, you agree to follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

Contributions are licensed under the MIT License.
