---
name: "tech-humanizer"
description: "Rewrites AI-generated technical content into natural human writing style while preserving domain terminology. Detects AI writing markers across four dimensions (content, language, style, communication intent) and learns user writing preferences over time. Use when humanizing docs, emails, or messages, or when detecting AI writing patterns."
license: "MIT"
compatibility: "Works with Claude Desktop, Claude Code, Codex, Gemini CLI, Kiro, and any agent supporting the Agent Skills Specification."
metadata:
  author: "ClydeShen"
  version: "1.0.0"
---

# tech-humanizer

## Quick Reference

| Function | Trigger phrases | Purpose |
|----------|----------------|---------|
| **humanize** | "Humanize this…", "Rewrite this…", "Make this sound more human" | Rewrites AI-style text into human-style, preserving technical terms |
| **detect** | "Detect AI markers…", "What's the AI density of…", "Check this for AI writing" | Scans text for AI writing markers, outputs density report |
| **profile** | "Show my writing profile", "Update my profile", "Reset writing profile" | Manages first-use assessment, view, update, and reset of user persona |

---

## First-Use Flow

On every invocation, check whether `profile.json` exists in the current working directory. If it is absent, present the three questions below before processing the original request.

**Q1 — You're writing a release note for a client. Which fits your style?**
- A) "We're happy to let you know the new reporting feature is live. You can now build customised reports from the Reports tab."
- B) "The reporting feature is now live. Head to the Reports tab to build custom reports."
- C) "Reporting feature live. Custom reports under Reports tab."

**Q2 — A teammate leaves a good suggestion on your PR. How do you reply?**
- A) "Thanks for catching that. I've refactored the function and updated the tests."
- B) "Good call, done."
- C) "Cheers! Fixed — also caught a related issue while I was in there."

**Q3 — You need to tell the team a prod deploy just finished. What do you post in Slack?**
- A) "Prod deploy is done. Please check your services and flag anything that looks off."
- B) "Deploy done. Quick check on your end — ping me if something's off."
- C) "We're live! Check your stuff and shout if anything's broken."

After the user answers, infer the profile using these rules.

**English variant** (Q1 primary, Q2/Q3 auxiliary):
- Q1-A contains "customised" → British signal; Q1-A/B/C contains "custom" → American signal
- Q2-C "Cheers" or Q3-C "shout" → British weighting
- Majority British signals → `english_variant: "British"`, otherwise `"American"`

**CEFR level**:
- All A → C1
- Two A, one B/C → B2
- Two B, one A/C → B2
- All B, or B/C mixed → B1
- All C → B1

**Style by context**:

| Answer | client_docs (Q1) | team_collab (Q2) | casual_chat (Q3) |
|--------|-----------------|-----------------|-----------------|
| A | formal | formal | formal |
| B | semi-formal | informal | informal |
| C | informal | informal | casual |

Save `profile.json` with this schema:

```json
{
  "english_variant": "British" | "American",
  "cefr_level": "B1" | "B2" | "C1",
  "style_by_context": {
    "client_docs": "formal" | "semi-formal" | "informal",
    "team_collab": "formal" | "informal",
    "casual_chat": "formal" | "informal" | "casual"
  },
  "answers": { "q1": "A"|"B"|"C", "q2": "A"|"B"|"C", "q3": "A"|"B"|"C" },
  "created_at": "<UTC ISO 8601 timestamp>",
  "version": "1.0"
}
```

Display a two-line summary, then immediately continue processing the original request:

```
Profile: [British/American] English · [CEFR level]
Style: client docs → [style] · team → [style] · chat → [style]
```

**Skip handling**: if the user inputs "skip", "s", or empty for any question, use default answer B for that question and append `(some defaults applied)` to the summary.

---

## Humanize Flow

**Trigger**: User requests a rewrite or humanization.

1. Load `profile.json` (if present) and `writing-profile.json` (if present).
2. Identify the target register: match the request context to `style_by_context` — client docs/external reports → `client_docs`; PR review/tech docs/internal email → `team_collab`; Slack/IM/informal → `casual_chat`.
3. Load [`./rules/ai-markers.md`](./rules/ai-markers.md) and [`./rules/tech-terms.md`](./rules/tech-terms.md).
4. Scan the input for AI markers across all four dimensions (content, language, style, communication intent). Check each candidate word against `./rules/tech-terms.md` — if it appears there, do NOT flag it.
5. Apply rewrite rules: remove/replace all flagged markers while preserving every technical term verbatim.
6. Apply `writing-profile.json` preferences: replace any expression marked as dispreferred with the user's preferred expression. If a preference conflicts with the target register style, the user preference wins — append a note: "以下偏好来自您的写作档案：[specific entries]".
7. Correct any L1 transfer patterns recorded in `writing-profile.json`.
8. Self-check: scan the output for any remaining AI marker vocabulary. If found, revise until the output is clean.
9. Output the rewritten text. If the user requested a change explanation, append a list of each replaced marker: original fragment → replacement → reason.

**Error cases**:
- Empty or whitespace-only input → return: "输入文本不能为空，请提供需要改写的内容。" Do not rewrite.
- No AI markers found → inform the user the text already matches human writing style; explain why no changes were made; do not output a modified version.

---

## Detect Flow

**Trigger**: User requests AI marker detection or density check.

1. Load [`./rules/ai-markers.md`](./rules/ai-markers.md).
2. Scan the document across all four dimensions: content, language, style, communication intent.
3. For each candidate word/phrase, check `./rules/tech-terms.md` — if present, skip it.
4. Count sentences: `density = floor((sentences_with_at_least_one_marker / total_sentences) * 100)`. Result is an integer in [0, 100]. Each sentence counts at most once.
5. Group results by the four categories. For each detected category, provide at least one improvement suggestion containing: original fragment, problem description, rewrite example.
6. Output format:
   - AI marker density: N%
   - Four category sections (always present, even if empty): Content, Language, Style, Communication Intent
   - Each section: count of instances + list of specific instances with paragraph/sentence location
   - Improvement suggestions for each detected category

**Error cases**:
- Empty document (0 characters) → return: "输入文档为空，无法执行检测。" Do not output a report.
- No markers found → output: "未检测到 AI 写作痕迹，AI 痕迹占有率为 0%", list the four dimensions checked.

---

## Writing Profile

`writing-profile.json` schema:

```json
{
  "preferences": [
    {
      "original": "<dispreferred expression>",
      "preferred": "<user's preferred expression>",
      "added_at": "<UTC ISO 8601 timestamp>"
    }
  ],
  "domain_terms": [
    {
      "term": "<domain-specific term>",
      "context": "<usage context note>",
      "added_at": "<UTC ISO 8601 timestamp>"
    }
  ],
  "l1_patterns": [
    {
      "pattern": "<L1 transfer pattern description>",
      "observed_at": "<UTC ISO 8601 timestamp>"
    }
  ],
  "version": "1.0"
}
```

**Capacity limits**:
- `preferences` + `domain_terms` combined: max 50 entries. When the limit is reached, notify the user: "写作档案已达上限（50 条），新记录将替换最早添加的条目", then apply FIFO eviction (remove oldest by `added_at`).
- `l1_patterns`: max 10 entries, separate FIFO limit, silent eviction (no user notification).

---

## Profile Management

**view** (triggered by "显示我的写作档案", "show my writing profile", or similar):
Output all entries as a categorised list:
- Preference corrections: "original → preferred" format
- Domain terms: term + context
- L1 patterns: pattern description
- If the profile is empty: "写作档案当前为空"

**reset** (triggered by "清空写作档案", "reset writing profile", or similar):
Clear all entries including `l1_patterns`. Output: "写作档案已清空，共删除 N 条记录" (N = actual count deleted).

**update profile** (triggered by "update my profile", "更新画像", "reset profile", or similar):
Re-present Q1/Q2/Q3. After completion, overwrite `profile.json`. Show before/after comparison: `Before: [old summary] → After: [new summary]`.

**Automatic recording during humanize/detect**:

- **Corrections**: When the user explicitly corrects a word/phrase ("use X instead of Y"), record to `preferences` as "original → preferred". Apply in all subsequent humanizations.
- **Domain terms**: When the user mentions a specific term preference ("we use 'canary deployment' not 'gradual rollout'"), record to `domain_terms` with context.
- **L1 patterns**: Silently analyse submitted text. If a pattern appears ≥2 times in the same text, record to `l1_patterns` without showing the inference to the user. Apply corrections in subsequent humanizations.

**Conflict resolution**: User preference always wins over register style. Append note listing applied preferences.
