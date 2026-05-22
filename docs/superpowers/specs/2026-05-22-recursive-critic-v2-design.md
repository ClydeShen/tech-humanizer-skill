# Design Spec: Recursive Critic v2 (Adaptive Technical Humanizer)

**Date:** 2026-05-22
**Status:** Approved
**Topic:** Evolution of `tech-humanizer-skill` into a high-SNR, adaptive humanization engine for professional English.

## 1. Executive Summary
Recursive Critic v2 moves beyond statistical de-AI-ing to achieve **Authenticity**. It prioritizes high Signal-to-Noise Ratio (SNR) through aggressive preamble cutting, introduces "Authentic Uncertainty" to combat hallucinations, and employs a "Syntactic DNA" model to mirror the user's personal writing rhythm.

## 2. Core Pillars
*   **High SNR & Lead-Fronting:** Eradicate AI "preambles". Force sentences to lead with core nouns/actions.
*   **Authentic Uncertainty:** Align humanization with anti-hallucination. Replace AI's "false confidence" with cautious phrasing (e.g., *"I'm not 100% sure about X, but..."*) when the text relies on low-evidence claims or lacks source citations.
*   **Adaptive Rhythm:** Vary sentence structure to break the "metronome" rhythm.
*   **Syntactic DNA:** Record structural habits (e.g., preferred sentence lengths, punctuation preferences) to `writing-profile.json` as descriptive patterns.

## 3. Architecture: The Adaptive Critic Loop

### Phase 2: Heuristic Critique (The 4 Buckets)
Instead of complex mathematical formulas, the agent performs a **Heuristic Evaluation** against 4 weighted **Metric Buckets**.

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
*   **Refinement Trigger:** Trigger refinement if **more than 2 unique marker types** are detected in a single paragraph, or **more than 5 total markers** are found in the document.
*   **Action:** Perform a **targeted redraft** of only the failing sections.
*   **Authentic Uncertainty Heuristic:** If the input text claims strong certainty ("definitely," "always," "it is clear") but lacks source citations or supporting data points, the agent is instructed to inject cautious phrasing (e.g., "The data suggests," "I suspect").
*   **Termination Strategy:**
    *   Loop terminates when marker count falls below the threshold or after 3 passes.
*   **Learning Trigger (Non-Interactive):** Instead of a prompt, the Agent logs detected patterns to a `PENDING_PROFILE.json` file. The user can review and approve these suggested changes via a separate `/humanizer:apply-pending` command.

## 4. Implementation Components (KISS & SOTA)
*   **`SKILL.md` (v1.2.0):** Implements the STRIP -> PROTECT -> DRAFT -> RECURSE logic with "Authenticity Injection".
*   **`references/ai-markers.md` (Distilled):** Compact <2KB reference of Wikipedia signs + "Lead-Cutter" patterns.
*   **`writing-profile.json`:** Expanded to include `syntactic_dna` (descriptive patterns).

## 5. Success Criteria
*   **Evasion:** Bypasses state-of-the-art detectors by generating high-perplexity/high-burstiness text.
*   **SNR:** 15-25% reduction in total word count for technical drafts by removing AI padding.
*   **Authenticity:** Subjective review confirms the text sounds like a "Senior Engineer/Architect" rather than an "Assistant".
