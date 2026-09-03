# Reader Language Level

An axis independent of channel and voice: it adjusts how hard the prose is to parse, not what it says or which terms it uses. Load this file only when the user states the audience's language level or non-native status. Never infer it from the input text.

Terminology density and syntax difficulty are separate problems with separate fixes:

- **Terminology** (domain jargon, acronyms, product names) -- never simplified. A non-native technical reader already knows `agentic workflow`, `tool invocation`, `API`; spelling them out ("tool invocation, which means calling external APIs") adds words without adding clarity and reads as condescending.
- **Syntax** (clause nesting, connective complexity, sentence length) -- this is what actually gates comprehension for a non-native reader, and it is what this file controls.

## Applying a stated level

When the user gives a CEFR level (A1-C2) or a plain description ("beginner English", "non-native but fluent in the domain"), adjust sentence construction only:

- **One logical relationship per sentence.** Do not chain cause, contrast, and condition in one sentence with nested clauses. Split them.
- **Active voice, named actor.** "The system executes each subtask" over "each subtask is executed."
- **Short, explicit connectors over subordinate clauses.** Prefer "First... Next... If X, then Y" over "which, after doing X, allows Y provided that Z."
- **Keep pronoun references close.** Repeat the noun rather than letting "it" reach back more than one sentence.
- **Do not add glosses for terms the audience already knows.** Preserve every domain term verbatim (see `references/technical-terms.json` and the project's `writing-profile.json`).

Lower stated levels (A1-A2) tolerate more information loss -- some detail may need to be dropped rather than compressed, and the result will usually run *longer* than a native-register version, not shorter, because each logical relationship gets its own sentence instead of being folded into a subordinate clause. Higher stated levels (B2-C1) need little to no adjustment beyond removing dense nominalization chains.

## Example

Native-register (unstated audience, no adjustment):

```text
An agentic workflow refers to a process in which an AI system operates with a degree of autonomy: it interprets a goal, breaks it down into subtasks, selects and uses tools when needed, and evaluates its own progress.
```

Same content, audience stated as non-native technical readers (terms preserved, syntax flattened):

```text
Agentic workflow means the AI system has autonomy over a task. First, it does task decomposition: it breaks the goal into subtasks. Next, it executes each subtask. It may call tools or APIs during execution. After each step, it does self-monitoring: it checks the output against the expected result.
```

## Scope limit

This axis governs sentence-level parsing difficulty only. It does not change:

- voice or register (still the channel's Voice Profile);
- terminology (still fully preserved);
- content or claims (still the same information, unless the stated level is low enough that full information cannot fit -- flag this rather than silently dropping content).
