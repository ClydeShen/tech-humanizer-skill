# Design Spec: Recursive Critic with Metric Buckets Humanizer

**Date:** 2026-05-22
**Status:** Draft
**Topic:** Evolution of `tech-humanizer-skill` to a high-SNR, detection-evasion-ready architecture.

## 1. Executive Summary
This design evolves the `tech-humanizer-skill` from a linear rewrite tool into an iterative **Recursive Critic** system. It applies **First Principles** of NLP and engineering (**KISS, SOTA, Occam's Razor**) to achieve high Signal-to-Noise Ratio (SNR) and maximum detection evasion while minimizing token usage through rule distillation.

## 2. Goals & Success Criteria
*   **High SNR:** Eliminate AI "fluff" and ceremonial framing while preserving 100% of technical precision.
*   **Detection Evasion:** Radically vary structural rhythm and vocabulary density to bypass statistical AI detectors (GPTZero, Turnitin, etc.).
*   **Token Efficiency:** Reduce rule-loading context by 90% (from 20KB to ~2KB).
*   **Recursive Accuracy:** Use a "判别能力 > 生成能力" (Discrimination > Generation) feedback loop to ensure quality.

## 3. Architecture: The Recursive Critic Loop

The system moves away from a 10-step linear process to a 3-phase iterative loop, optimized for single-turn execution whenever possible.

### Phase 1: High-SNR Generation
*   **Goal:** Produce a "clean" draft focusing on intent and technical accuracy.
*   **Principle:** **Occam's Razor**. The simplest explanation/statement is usually the most human-like.
*   **Action:** Strip all "Assistant-speak" and "Ceremonial Framing" immediately.

### Phase 2: Heuristic-Driven Critique (The 4 Buckets)
Instead of complex mathematical formulas, the agent performs a **Heuristic Evaluation** against 4 weighted **Metric Buckets**. This leverages the LLM's strength in qualitative judgment over raw math.

1.  **Bucket 1: Structure (Weight: 30%)**
    *   *AI Tells:* Monotone sentence length, passive voice clusters, repetitive transition chains.
    *   *Heuristic:* "Does this paragraph feel like a metronome? Are there more than 2 consecutive sentences with similar length or structure?"
2.  **Bucket 2: Tone (Weight: 30%)**
    *   *AI Tells:* "It is important to note", "In today's landscape", "Hope this helps".
    *   *Heuristic:* "Is there any 'assistant-to-user' framing or unnecessary preamble?"
3.  **Bucket 3: Vocabulary (Weight: 30%)**
    *   *AI Tells:* "Tapestry", "delve", "robust", "meticulous", vague attribution ("experts say").
    *   *Heuristic:* "Are there abstract evaluative adjectives that could be replaced by concrete technical data?"
4.  **Bucket 4: Formatting (Weight: 10%)**
    *   *AI Tells:* Bold adjectives, perfect title case mid-sentence, skipped heading levels.
    *   *Heuristic:* "Does the formatting follow standard engineering Markdown conventions?"

### Phase 3: Surgical Refinement & Termination
*   **Threshold:** We use a unified **Marker Density Threshold**. If the agent detects **more than 2 markers** in a single paragraph, or **more than 5 markers** in the total document, trigger refinement.
*   **Action:** The agent performs a **targeted redraft** of only the failing sections.
*   **Termination Strategy:** 
    *   The loop terminates when the marker count falls below the threshold.
    *   **Maximum Iterations:** 3 passes.
*   **Edge Case: Short Inputs (< 50 words):** 
    *   For short messages (Slack, chat), the threshold is reduced to **1 marker**. 
    *   The priority shifts entirely to **Directness** and **Tone** (Bucket 2 & 3).

## 4. Implementation Details (The KISS Approach)

### The 4 Core Directives (The "Workflow")
The `SKILL.md` will be updated to follow these 4 simplified directives:
1.  **STRIP:** Remove all known high-severity AI markers (Assistant-speak, disclaimers) immediately.
2.  **PROTECT:** Identify and lock technical terms from `references/technical-terms.md`.
3.  **DRAFT:** Rewrite using active voice and high-variance sentence structure.
4.  **RECURSE:** Evaluate against the 4 Buckets; refine up to 3 times if thresholds are exceeded.

## 5. First Principles & Principles Applied
*   **First Principles:** Addressing the *root cause* of AI detection (statistical predictability) rather than just swapping synonyms.
*   **SOTA:** Mimicking the adversarial nature of modern AI detectors.
*   **KISS:** Reducing complex linguistic rules into 4 manageable "Buckets".
*   **Occam's Razor:** Preferring direct, active voice claims over complex framing.

## 6. Testing & Validation
*   **SNR Test:** Measure word count reduction (target: 10-20% reduction in non-technical filler).
*   **Evasion Test:** Pass current `evals.json` tests with lower "Marker Density" scores.
*   **Token Test:** Verify the agent loads <3KB of rules per session.

## 7. Next Steps
1.  **Rule Distillation:** Create the 2KB version of `references/ai-markers.md`.
2.  **Logic Update:** Overhaul `SKILL.md` with the Recursive Critic workflow.
3.  **Refinement:** Consolidate redundant files in `references/outcome/`.
