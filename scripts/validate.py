#!/usr/bin/env python3
"""Repository validation for tech-humanizer skill."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_MARKERS = {
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "L1",
    "L2",
    "L3",
    "L4",
    "L5",
    "L6",
    "L7",
    "L8",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "W1",
    "W2",
    "W3",
    "W4",
}


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError as exc:
        fail(f"{path.relative_to(ROOT)} is not valid UTF-8: {exc}")


def parse_frontmatter(skill_md: str) -> dict[str, str]:
    if not skill_md.startswith("---\n"):
        fail("SKILL.md must start with YAML frontmatter")
    end = skill_md.find("\n---\n", 4)
    if end == -1:
        fail("SKILL.md frontmatter is not closed")
    frontmatter = {}
    for line in skill_md[4:end].splitlines():
        if not line.strip():
            continue
        if ":" not in line:
            fail(f"Invalid frontmatter line: {line}")
        key, value = line.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip('"').strip("'")
    return frontmatter


def validate_skill() -> None:
    skill_path = ROOT / "SKILL.md"
    if not skill_path.exists():
        fail("SKILL.md is missing")
    skill_md = read_text(skill_path)
    frontmatter = parse_frontmatter(skill_md)

    name = frontmatter.get("name", "")
    description = frontmatter.get("description", "")
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,63}", name):
        fail("SKILL.md name must be lowercase letters, numbers, and hyphens, max 64 chars")
    if not description:
        fail("SKILL.md description is required")
    if len(description) > 1024:
        fail("SKILL.md description must be <= 1024 characters")
    if "<" in description or ">" in description:
        fail("SKILL.md description must not contain XML-like angle brackets")

    line_count = len(skill_md.splitlines())
    if line_count > 500:
        fail(f"SKILL.md should stay under 500 lines; found {line_count}")

    for rel_path in [
        "references/ai-markers.md",
        "references/technical-terms.json",
        "references/profile-schema.md",
        "references/rewrite-playbook.md",
        "references/channel-style.md",
        "references/source-and-markup-integrity.md",
        "references/final-rubric.md",
        "references/ai-style-lexicon.json",
        "assets/detection-report-template.txt",
    ]:
        if not (ROOT / rel_path).exists():
            fail(f"Missing referenced file: {rel_path}")

    lexicon_path = ROOT / "references" / "ai-style-lexicon.json"
    try:
        lexicon = json.loads(read_text(lexicon_path))
    except json.JSONDecodeError as exc:
        fail(f"ai-style-lexicon.json is not valid JSON: {exc}")
    required_lexicon_keys = {
        "high_density_ai_vocabulary",
        "assistant_service_language",
        "knowledge_cutoff_disclaimers",
        "source_laundering_phrases",
        "internal_reference_leaks",
        "placeholder_patterns",
        "inflated_formality",
    }
    missing_lexicon_keys = required_lexicon_keys - lexicon.keys()
    if missing_lexicon_keys:
        fail(f"ai-style-lexicon.json missing keys: {', '.join(sorted(missing_lexicon_keys))}")


def validate_markers() -> None:
    marker_text = read_text(ROOT / "references" / "ai-markers.md")
    found = set(re.findall(r"\b([CLSIMW][0-9]+)\.", marker_text))
    missing = REQUIRED_MARKERS - found
    if missing:
        fail(f"ai-markers.md is missing marker sections: {', '.join(sorted(missing))}")


def main() -> None:
    validate_skill()
    validate_markers()
    print("OK: skill structure and references are valid.")


if __name__ == "__main__":
    main()
