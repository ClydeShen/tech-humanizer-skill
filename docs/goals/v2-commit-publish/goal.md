# Goal: Commit and Publish tech-humanizer-skill v2.0.0

## Charter

**Original request:** Agree with plan, implement plan, commit and publish to new version.

**Interpreted outcome:** All v2.0.0 changes are committed on a branch, a PR is created, and CI validation passes.

**Input shape:** existing_plan -- implementation is already complete. All 13 design decisions from the grill session have been applied to the codebase.

**Audience:** Maintainer (ClydeShen) and downstream skill users.

**Non-goals:**
- Do not modify any implementation files. All changes are already in place.
- Do not push directly to main. Use a branch and PR.
- Do not alter the spec docs in docs/superpowers/.

**Completion proof:** A PR exists on GitHub with all changed files staged, CI (validate.py) is green, and the PR is ready for merge.

**Likely misfire:** Committing only some files and missing bucket-quickref.md or the docs/ spec.

**Constraints:**
- validate.py must pass (already confirmed: OK).
- Commit message must follow the repo convention (seen in git log: type: description format).
- Branch name: feat/v2-recursive-critic or similar.
- All 6 file changes must be included: SKILL.md, references/ai-markers.md, references/lexicons/ai-style-lexicon.json, references/profile-schema.md, references/bucket-quickref.md (new), docs/ (new).

## Files changed

Modified:
- SKILL.md (v1.2.0 -> v2.0.0, Senior Engineer Voice, Claim Scoping, weighted RECURSE, Style Learning)
- references/ai-markers.md (High severity upgrades, S11, Claim Scoping, complexity-uniformity signal)
- references/lexicons/ai-style-lexicon.json (era field on vocabulary terms)
- references/profile-schema.md (syntactic_dna field and sourcing rules)

New:
- references/bucket-quickref.md (weighted scoring triage card)
- docs/superpowers/specs/ (design spec documents)
