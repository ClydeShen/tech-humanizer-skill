# Human Writing Distinctions Evals

This suite checks whether `tech-humanizer-skill` rewrites AI-shaped prose into
credible human writing while preserving technical, legal, medical, and source
constraints.

The cases are derived from these sources:

- Lovarank side-by-side examples: specificity, concrete buyer scenarios, legal
  precision, and medical safety details.
- Reddit r/WritingWithAI discussion: prosody, lived texture, sentence rhythm,
  and the "statistical average" failure mode.
- Desaire et al. PMC article: academic science writing signals such as longer
  paragraphs and equivocal connectives.
- HackerNoon technical analysis: predictability, repetition, lexical variety,
  and sentence uniformity as measurable traits.

Run:

```bash
npx promptfoo@latest validate config -c evals/promptfooconfig.yaml
npx promptfoo@latest eval -c evals/promptfooconfig.yaml -o evals/output.json --no-cache --no-share
```

Required environment:

- A llama.cpp OpenAI-compatible server running on `http://localhost:8081/v1`.
- The configured model ID is `qwen2.5-coder-32b-instruct-q5_k_m.gguf`.
