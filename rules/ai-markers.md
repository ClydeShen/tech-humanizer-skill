# AI Writing Marker Rule Library

This file is the single authoritative source for all AI writing marker rules used by the tech-humanizer skill. It is referenced by both the humanize and detect flows. Maintainers update this file directly; changes take effect on the next Skill invocation.

---

## Content Dimension

The content dimension covers what is said — the ideas, claims, and rhetorical moves that are characteristic of AI-generated text, regardless of how they are phrased.

### C1 — Importance / Legacy Phrases

**Pattern**: Formulaic phrases that assert significance, historical weight, or lasting impact without providing evidence. AI models default to these constructions to signal that a topic matters rather than demonstrating it through specific detail.

**Trigger phrases**: "stands as a testament", "pivotal moment", "underscores its importance", "enduring legacy", "landmark achievement", "of paramount importance", "a defining moment", "speaks to the significance"

**Examples**:
- ❌ "The Apollo programme stands as a testament to human ingenuity and ambition."
- ❌ "This was a pivotal moment in the history of computing."
- ❌ "The project underscores its importance to the wider industry."
- ✅ "The Apollo programme put twelve people on the Moon between 1969 and 1972."
- ✅ "The release of the IBM PC in 1981 opened the market to third-party hardware clones."

**Detection rule**: Flag any sentence containing one or more of the trigger phrases listed above.

**Humanization**: Replace the assertion with a specific fact, figure, or concrete outcome that demonstrates the claimed significance. Delete the trigger phrase entirely.

---

### C2 — Vague Attribution

**Pattern**: Citing unnamed or unverifiable sources to lend authority to a claim. AI models use these constructions because they cannot cite real sources but need to signal that a claim is supported.

**Trigger phrases**: "Experts argue", "Observers have cited", "Industry reports", "Studies show", "Research suggests", "Analysts note", "Many believe", "It is widely accepted that", "According to experts"

**Examples**:
- ❌ "Experts argue that microservices improve deployment flexibility."
- ❌ "Industry reports suggest that cloud adoption is accelerating."
- ❌ "Studies show that remote work increases productivity."
- ✅ "The 2023 CNCF survey found that 84% of organisations run microservices in production."
- ✅ "AWS reported 17% year-on-year revenue growth in Q1 2024."

**Detection rule**: Flag any sentence that opens with or contains one of the trigger phrases above, particularly when no specific source name, publication, or date is provided.

**Humanization**: Either replace with a named, verifiable source and specific finding, or rewrite the claim as the author's own reasoned position ("In practice, microservices let teams deploy independently…").

---

### C3 — Promotional Vocabulary

**Pattern**: Adjectives and verbs that describe a subject in marketing or tourism language rather than technical or neutral language. These words inflate perceived quality without adding information.

**Trigger words**: "boasts", "vibrant", "nestled", "groundbreaking", "revolutionary", "cutting-edge", "state-of-the-art", "world-class", "innovative", "transformative", "game-changing", "pioneering", "unparalleled", "best-in-class"

**Examples**:
- ❌ "The platform boasts a vibrant developer community and groundbreaking AI features."
- ❌ "Nestled in the heart of Silicon Valley, the company offers cutting-edge solutions."
- ❌ "This revolutionary approach transforms how teams collaborate."
- ✅ "The platform has over 40,000 active contributors and ships a new model API each quarter."
- ✅ "The company is headquartered in Palo Alto and focuses on developer tooling."

**Detection rule**: Flag any sentence containing one or more of the trigger words above. Pay particular attention to "boasts" (almost always promotional) and "nestled" (geographic promotional framing).

**Humanization**: Replace promotional adjectives and verbs with specific, verifiable details (numbers, features, locations, dates). If no specific detail is available, use neutral descriptive language.

---

### C4 — Dangling Participial Phrases

**Pattern**: Appending a participial phrase at the end of a sentence to add a layer of interpretation or commentary on the main clause. This is a structural tell: AI models use these trailing phrases to appear analytical without adding new information. The phrase typically restates or weakly elaborates what was just said.

**Trigger patterns**: Sentence-final clauses beginning with "highlighting…", "emphasizing…", "reflecting…", "showcasing…", "demonstrating…", "underscoring…", "illustrating…", "signalling…"

**Examples**:
- ❌ "The team shipped the feature two weeks early, highlighting their strong execution culture."
- ❌ "Adoption grew 40% year-on-year, reflecting the market's appetite for automation."
- ❌ "The API handles 10,000 requests per second, showcasing its robust architecture."
- ✅ "The team shipped the feature two weeks early."
- ✅ "Adoption grew 40% year-on-year."
- ✅ "The API handles 10,000 requests per second."

**Detection rule**: Flag any sentence where the final clause is a present participial phrase beginning with one of the trigger words above, especially when the participial phrase restates or interprets the main clause rather than adding new factual content.

**Humanization**: Delete the trailing participial phrase. If the interpretation it contains is genuinely useful, rewrite it as a separate sentence with a concrete claim.

---

### C5 — Template Structure

**Pattern**: Formulaic sentence or paragraph openings that follow a recognisable AI essay template. These structures signal that the text was generated from a prompt template rather than written from a specific point of view.

**Trigger patterns**:
- "Despite its [X], [subject] faces challenges…" — concession-then-problem template
- "In the realm of…" — domain-framing opener
- "In today's [adjective] landscape…" — landscape opener
- "At its core, [subject] is…" — definition template
- "One of the most [superlative] aspects of…" — superlative framing
- "It is worth noting that…" — hedging filler
- "This section will explore…" / "This article will discuss…" — meta-commentary

**Examples**:
- ❌ "Despite its widespread adoption, Kubernetes faces challenges in multi-cloud environments."
- ❌ "In the realm of distributed systems, consistency and availability are often in tension."
- ❌ "In today's fast-paced technological landscape, organisations must adapt quickly."
- ❌ "It is worth noting that the configuration file must be updated before deployment."
- ✅ "Kubernetes multi-cloud deployments require careful network policy management."
- ✅ "Distributed systems trade consistency for availability under network partitions (CAP theorem)."
- ✅ "Update the configuration file before deploying."

**Detection rule**: Flag any sentence or paragraph opening that matches one of the trigger patterns above. The "Despite its…, faces challenges…" pattern is particularly reliable; flag it whenever the subject of the main clause is the same entity described in the concession.

**Humanization**: Delete the template framing and open directly with the substantive claim. For "Despite its X, Y faces challenges", rewrite as a direct statement of the specific challenge.

---

### Content Dimension — Quick Reference

| ID | Pattern | Detection signal | Humanization action |
|----|---------|-----------------|---------------------|
| C1 | Importance / legacy phrases | Trigger phrase present ("stands as a testament", "pivotal moment", etc.) | Replace with specific fact or outcome |
| C2 | Vague attribution | Unnamed source + claim ("Experts argue", "Studies show", etc.) | Name the source or rewrite as author's position |
| C3 | Promotional vocabulary | Trigger word present ("boasts", "vibrant", "groundbreaking", etc.) | Replace with specific, verifiable detail |
| C4 | Dangling participial phrases | Sentence-final participial clause beginning with "highlighting…", "reflecting…", etc. | Delete the trailing phrase; rewrite as separate sentence if needed |
| C5 | Template structure | Formulaic opener ("Despite its…", "In the realm of…", "In today's … landscape…", etc.) | Delete the template framing; open with the substantive claim |

---

## Language Dimension

The language dimension covers word-level and phrase-level patterns — the specific vocabulary choices and syntactic constructions that are statistically over-represented in AI-generated text compared to human writing.

### L1 — High-Density AI Vocabulary

**Pattern**: A set of 24 words and phrases that appear at significantly higher rates in AI-generated text than in human-written text of comparable register. These words are not wrong in isolation, but their co-occurrence and frequency are reliable markers of AI authorship. Many are abstract, evaluative, or connective words that AI models use as default fillers.

**Full vocabulary list** (24 items):

| Word / Phrase | Why AI models overuse it |
|---------------|--------------------------|
| additionally | Default additive connector instead of a more specific transition |
| align with | Abstract verb for agreement or consistency; avoids concrete description |
| bolstered | Passive-voice intensifier; sounds authoritative without specifics |
| crucial | Asserts importance without demonstrating it |
| delve | Formal synonym for "look at" or "explore"; rarely used in natural speech |
| emphasizing | Trailing participial filler (see also C4) |
| enduring | Implies lasting significance; often unverifiable |
| enhance | Vague improvement verb; avoids specifying what changes |
| fostering | Abstract verb for "creating" or "building"; sounds strategic |
| garner | Formal synonym for "get" or "receive"; rarely used in natural writing |
| highlight | Used as a verb meaning "show" or "demonstrate"; overused as a framing device |
| interplay | Abstract noun for "interaction" or "relationship"; sounds analytical without being specific |
| intricate / intricacies | Signals complexity without describing it |
| key | Asserts importance without evidence; near-synonym of "crucial" |
| landscape | Metaphorical framing word ("the AI landscape"); avoids direct description |
| meticulous / meticulously | Asserts care or precision without demonstrating it |
| pivotal | Asserts historical or strategic importance; near-synonym of "crucial" |
| robust | Vague quality adjective; rarely defined or measured |
| showcase | Promotional verb; implies display rather than function |
| tapestry | Metaphor for complexity or richness; almost always decorative |
| testament | Asserts significance ("a testament to…"); see also C1 |
| underscore | Verb meaning "emphasise"; used to assert importance rather than demonstrate it |
| valuable | Asserts worth without specifying value |
| vibrant | Promotional adjective; see also C3 |

**Examples**:
- ❌ "This robust framework delves into the intricate interplay between performance and reliability, showcasing a meticulous approach that is crucial for fostering a vibrant developer ecosystem."
- ❌ "The update bolstered the platform's capabilities, additionally enhancing its ability to garner user engagement and underscore its enduring value."
- ✅ "This framework separates performance tuning from reliability configuration, letting teams adjust each independently."
- ✅ "The update added two-factor authentication and cut average page load time from 1.4 s to 0.8 s."

**Detection rule**: Flag any sentence containing one or more words from the vocabulary list above. Apply the technical-term whitelist exemption: if a flagged word appears in `rules/tech-terms.md` in the current technical context, do not flag it.

**Humanization**: Replace each flagged word with a concrete, specific alternative:
- Vague importance words ("crucial", "key", "pivotal", "valuable") → delete or replace with a specific reason
- Vague quality adjectives ("robust", "meticulous", "vibrant", "intricate") → replace with a measurable or observable property
- Abstract verbs ("enhance", "foster", "garner", "bolster", "showcase") → replace with a specific action verb and its object
- Connective fillers ("additionally") → replace with a more specific transition or restructure the sentence
- Metaphors ("landscape", "tapestry", "interplay") → replace with a direct noun or description

---

### L2 — Copula Substitution

**Pattern**: Using a more elaborate verb phrase in place of a simple copula ("is", "has", "are") to make a sentence sound more formal or analytical. AI models default to these substitutions because they appear more sophisticated, but they add length without adding meaning.

**Common substitutions**:

| AI construction | Human equivalent |
|-----------------|-----------------|
| "serves as" | "is" |
| "features" (as a verb) | "has" / "includes" |
| "represents" | "is" |
| "functions as" | "is" / "acts as" |
| "acts as a" | "is a" |

**Examples**:
- ❌ "The configuration file serves as the single source of truth for all environment variables."
- ❌ "The dashboard features an interactive chart that represents the current system load."
- ❌ "This module functions as the primary interface between the client and the database."
- ✅ "The configuration file is the single source of truth for all environment variables."
- ✅ "The dashboard has an interactive chart showing current system load."
- ✅ "This module is the primary interface between the client and the database."

**Detection rule**: Flag any sentence where "serves as", "features" (used as a verb with a noun object), "represents", "functions as", or "acts as a" could be replaced by "is" or "has" without changing the meaning.

**Humanization**: Replace the copula substitution with the simpler copula ("is", "has", "are", "have"). If the substitution was masking a weak claim, consider whether the sentence adds value at all.

---

### L3 — Negative Parallel Structures

**Pattern**: Constructing a sentence with a negative clause followed by a positive restatement, creating a rhetorical contrast that sounds emphatic but is often redundant. AI models use these structures to appear balanced and analytical.

**Common forms**:
- "Not only X, but also Y" — implies X and Y are both surprising; usually only Y is the actual point
- "Not X, but Y" — frames a simple statement as a correction or contrast when no contrast is needed
- "Not just X, but Y" — variant of the above

**Examples**:
- ❌ "Not only does this approach reduce latency, but it also improves throughput."
- ❌ "This is not just a configuration change, but a fundamental shift in how the system handles requests."
- ❌ "Not only was the deployment successful, but it also completed ahead of schedule."
- ✅ "This approach reduces latency and improves throughput."
- ✅ "This configuration change affects how the system handles requests."
- ✅ "The deployment finished ahead of schedule."

**Detection rule**: Flag any sentence beginning with "Not only", "Not just", or containing the pattern "not only … but also", "not just … but", or "not X, but Y" where X and Y are parallel clauses.

**Humanization**: Collapse the negative parallel structure into a direct positive statement. If both X and Y carry distinct information, keep both as a simple conjunction ("and") without the rhetorical framing.

---

### L4 — Rule-of-Three Overuse

**Pattern**: Grouping items in lists of exactly three — three adjectives, three nouns, or three parallel phrases — to create a sense of completeness or rhetorical rhythm. While the rule of three is a legitimate rhetorical device, AI models apply it mechanically and far more frequently than human writers do, often padding lists to reach three items when one or two would suffice.

**Common forms**:
- Three consecutive adjectives before a noun: "a fast, reliable, and scalable solution"
- Three parallel noun phrases: "performance, reliability, and security"
- Three parallel verb phrases: "it monitors, analyses, and reports on system health"
- Three-item bullet lists where one or two items would be sufficient

**Examples**:
- ❌ "The platform delivers a fast, reliable, and scalable infrastructure for modern applications."
- ❌ "Our approach prioritises performance, reliability, and security at every layer of the stack."
- ❌ "The tool monitors, analyses, and reports on system health in real time."
- ✅ "The platform delivers low-latency infrastructure that scales horizontally."
- ✅ "Our approach prioritises reliability and security; performance is a secondary constraint."
- ✅ "The tool reports system health metrics in real time."

**Detection rule**: Flag any sentence containing three or more consecutive adjectives, three or more parallel noun phrases, or three or more parallel verb phrases joined by commas and/or "and". Also flag bullet lists of exactly three items where the items are structurally parallel and could be collapsed into prose.

**Humanization**: Reduce to the one or two items that carry the most specific information. If all three items are genuinely distinct and necessary, keep them but verify that the list is not padding — each item should add information that the others do not.

---

### Language Dimension — Quick Reference

| ID | Pattern | Detection signal | Humanization action |
|----|---------|-----------------|---------------------|
| L1 | High-density AI vocabulary | Any of the 24 flagged words present in a sentence | Replace with specific, concrete alternative; apply tech-term whitelist exemption |
| L2 | Copula substitution | "serves as", "features" (verb), "represents", "functions as", "acts as a" where "is"/"has" would suffice | Replace with simple copula ("is", "has", "are") |
| L3 | Negative parallel structures | "Not only … but also", "Not just … but", "not X, but Y" | Collapse into a direct positive statement; use "and" if both parts are needed |
| L4 | Rule-of-three overuse | Three consecutive adjectives, nouns, or parallel phrases | Reduce to the most informative one or two items; verify each item adds distinct information |

---

## Style Dimension

The style dimension covers formatting and typographic patterns that are characteristic of AI-generated text. These patterns relate to how content is visually presented rather than what is said.

### S1 — Title Case on Non-Proper Nouns

**Pattern**: Capitalising common nouns, adjectives, or verbs mid-sentence as if they were proper nouns or headings.

**Examples**:
- ❌ "This is a Great Opportunity to Improve your Workflow."
- ❌ "The System uses Advanced Algorithms to Process Data."
- ✅ "This is a great opportunity to improve your workflow."
- ✅ "The system uses advanced algorithms to process data."

**Detection rule**: Flag any sentence (outside of a heading line) where two or more non-proper, non-acronym words begin with a capital letter.

**Humanization**: Convert mid-sentence title-cased words to lowercase unless they are proper nouns, acronyms, or the first word of a sentence.

---

### S2 — Excessive Bold on Non-Keywords

**Pattern**: Bolding words or phrases that are not genuinely critical terms, warnings, or UI labels — used decoratively to signal importance rather than to mark truly essential information.

**Examples**:
- ❌ "It is **important** to **carefully** review the **configuration** before proceeding."
- ❌ "The **new** feature **allows** users to **customise** their **dashboard**."
- ✅ "It is important to carefully review the configuration before proceeding."
- ✅ "**Warning**: Changing this setting will restart the service."

**Detection rule**: Flag paragraphs where more than 20% of words are bolded, or where bolded phrases are ordinary adjectives, adverbs, or verbs rather than technical terms, UI labels, or warnings.

**Humanization**: Remove bold formatting from non-essential words. Retain bold only for genuine keywords, UI element names, warnings, and critical terms.

---

### S3 — Inline-Header Vertical Lists

**Pattern**: Bullet lists where each item begins with a bolded label followed by a colon and a short description — a rigid template structure that AI models default to when presenting information.

**Format signature**: `• **Bold Header**: description text`

**Examples**:
- ❌
  ```
  • **Scalability**: The system handles increased load automatically.
  • **Reliability**: Uptime is maintained through redundant nodes.
  • **Security**: All data is encrypted at rest and in transit.
  ```
- ✅ Prose paragraph: "The system scales automatically under load, maintains uptime through redundant nodes, and encrypts all data at rest and in transit."
- ✅ Simple list without inline headers when enumeration is genuinely needed.

**Detection rule**: Flag any bullet list where three or more consecutive items follow the `**Label**: description` pattern.

**Humanization**: Convert to flowing prose where possible. If a list is genuinely needed, remove the bold labels and restructure as plain bullet points or a table.

---

### S4 — Em-Dash Overuse

**Pattern**: Using em dashes (—) as a general-purpose connector in place of commas, parentheses, colons, or full stops. AI models overuse em dashes to create a sense of rhetorical emphasis.

**Examples**:
- ❌ "The update — which was released last Tuesday — introduces three new features — all of which improve performance."
- ❌ "This approach is effective — it reduces latency — and easy to implement — making it the preferred choice."
- ✅ "The update, released last Tuesday, introduces three new features that improve performance."
- ✅ "This approach is effective: it reduces latency and is easy to implement, making it the preferred choice."

**Detection rule**: Flag any sentence containing two or more em dashes, or any paragraph where em dashes appear more than once per three sentences on average.

**Humanization**: Replace em dashes with the grammatically appropriate punctuation: comma, colon, parentheses, or a full stop followed by a new sentence.

---

### S5 — Curly Quotes

**Pattern**: Using typographic (curly) quotation marks — `"` `"` `'` `'` — instead of straight ASCII quotes `"` `'`. While curly quotes are typographically correct in published prose, their consistent presence in AI output is a reliable marker because most human-typed text in technical contexts uses straight quotes.

**Examples**:
- ❌ `The function returns "success" when the operation completes.`  (with curly quotes)
- ✅ `The function returns "success" when the operation completes.`  (with straight quotes)

**Detection rule**: Flag any text block where curly quotes appear in inline code references, technical strings, or conversational prose that would normally be typed with a standard keyboard.

**Humanization**: Replace curly quotes with straight ASCII quotes in technical and conversational contexts. Retain curly quotes only in formally typeset documents (e.g., published articles, PDFs) where the house style requires them.

---

### Style Dimension — Quick Reference

| ID | Pattern | Detection signal | Humanization action |
|----|---------|-----------------|---------------------|
| S1 | Title Case on non-proper nouns | ≥2 capitalised common words in a sentence | Lowercase non-proper, non-acronym words |
| S2 | Excessive bold on non-keywords | >20% of words bolded, or decorative bold | Remove bold from non-essential words |
| S3 | Inline-header vertical lists | ≥3 consecutive `**Label**: desc` bullets | Convert to prose or plain list |
| S4 | Em-dash overuse | ≥2 em dashes per sentence, or >1 per 3 sentences | Replace with comma, colon, parens, or full stop |
| S5 | Curly quotes | Typographic `"` `"` in technical/conversational text | Replace with straight ASCII quotes |

---

## Communication Intent Dimension

The communication intent dimension covers phrases and patterns that reveal the communicative stance of an AI assistant — the way it positions itself as a helpful, cautious, or deferential agent rather than a peer author. These patterns are invisible to content and style checks but are immediately recognisable to human readers.

### I1 — Collaborative / Assistant Language

**Pattern**: Phrases that signal the writer is an AI assistant performing a service rather than a person sharing information. These expressions — enthusiastic affirmations, offers to continue helping, and invitations to ask follow-up questions — are absent from human-authored documents and messages because humans do not narrate their own helpfulness.

**Trigger phrases**: "Certainly!", "Of course!", "Absolutely!", "I hope this helps", "I hope this was helpful", "Would you like me to…", "Would you like me to explain…", "Is there anything else I can help you with?", "Is there anything else you'd like to know?", "Feel free to ask", "Feel free to reach out", "Don't hesitate to reach out", "Don't hesitate to ask", "Happy to help", "Let me know if you need anything else"

**Examples**:
- ❌ "Certainly! Here is a summary of the deployment process."
- ❌ "I hope this helps! Let me know if you need anything else."
- ❌ "Would you like me to explain the configuration options in more detail?"
- ❌ "Is there anything else I can help you with today?"
- ❌ "Feel free to ask if you have further questions."
- ✅ "Here is a summary of the deployment process."
- ✅ "The configuration options are described in the next section."
- ✅ *(end the document or message without a closing offer)*

**Detection rule**: Flag any sentence that opens with or contains one of the trigger phrases above. Pay particular attention to sentence-opening affirmations ("Certainly!", "Of course!", "Absolutely!") and closing offers ("Feel free to…", "Don't hesitate to…", "Is there anything else…").

**Humanization**: Delete the trigger phrase entirely. If the sentence contains useful content beyond the phrase, retain that content with direct phrasing. Closing offers ("Is there anything else I can help you with?") should be deleted without replacement.

---

### I2 — Knowledge Cutoff Disclaimers

**Pattern**: Statements that explicitly reference the writer's training data boundary or acknowledge that information may be outdated. These disclaimers are a structural tell: human authors either verify currency before writing or note a specific date; they do not reference a "knowledge cutoff" or "training update" because those concepts do not apply to human writers.

**Trigger phrases**: "As of my last knowledge update", "As of my knowledge cutoff", "Up to my last training update", "As of my training data", "I don't have information beyond…", "My knowledge only extends to…", "Based on my training data", "As of the time of my training", "I may not have the most current information"

**Examples**:
- ❌ "As of my last knowledge update, the latest stable version is 3.2.1."
- ❌ "Up to my last training update, this API endpoint was still supported."
- ❌ "I don't have information beyond early 2024, so please verify this."
- ❌ "Based on my training data, the recommended approach is to use async/await."
- ✅ "The latest stable version as of March 2024 is 3.2.1 — check the release page for updates."
- ✅ "This API endpoint was supported in v3.x; verify against the current changelog."
- ✅ "The recommended approach is async/await."

**Detection rule**: Flag any sentence containing one of the trigger phrases above. The phrases "As of my…" and "Up to my…" are near-certain indicators; flag them unconditionally.

**Humanization**: Either replace with a specific, verifiable date ("as of March 2024") and direct the reader to a source for current information, or remove the disclaimer entirely if the claim is stable enough not to require it. Never retain the phrase "my knowledge cutoff" or "my training" in humanized output.

---

### I3 — Phrase Templates and Placeholder Text

**Pattern**: Bracketed placeholders, fill-in-the-blank instructions, and "Note: Replace this with…" annotations that indicate the text was generated as a template rather than written for a specific context. Human authors write for their actual situation; they do not leave structural scaffolding in the final document.

**Trigger patterns**:
- Bracketed placeholders: `[Your Name]`, `[Insert X here]`, `[Describe the specific section]`, `[Add relevant details]`, `[Company Name]`, `[Date]`, `[Recipient Name]`, `[Project Name]`, `[Your email address]`
- Inline replacement instructions: "Note: Replace this with…", "Replace [X] with your actual…", "Insert your [X] here", "Add your [X] below"
- Generic structural labels used as content: "Introduction goes here", "Add conclusion here", "Describe your use case"

**Examples**:
- ❌ "Dear [Recipient Name], I am writing to inform you about [Project Name]."
- ❌ "Note: Replace this with a description of your specific deployment environment."
- ❌ "[Add relevant details about your team's workflow here.]"
- ❌ "Contact us at [Your email address] for further information."
- ✅ "Dear Sarah, I am writing to inform you about the Atlas migration."
- ✅ "The deployment environment uses three t3.medium instances behind an ALB."
- ✅ "Contact us at ops@example.com for further information."

**Detection rule**: Flag any text containing bracket-enclosed placeholder labels (`[…]` where the content is a generic label rather than a code variable or Markdown link), or any sentence containing explicit replacement instructions ("Note: Replace this with…", "Insert your…", "Add your…").

**Humanization**: Replace each placeholder with the actual value for the specific context. If the actual value is not known, rewrite the sentence to omit the placeholder rather than leaving the bracket in place. Delete all "Note: Replace this with…" annotations entirely.

---

### I4 — Excessive Hedging and Meta-Commentary

**Pattern**: Sentence-opening phrases that announce the importance or noteworthiness of what follows rather than stating it directly. These hedges add no information — they are a verbal throat-clearing that signals the writer is managing the reader's attention rather than trusting the content to speak for itself. Human writers occasionally use one such phrase for genuine emphasis; AI models use them habitually as sentence starters.

**Trigger phrases**: "It's important to note that", "It is important to note that", "It's worth mentioning that", "It is worth mentioning that", "It's worth noting that", "It is worth noting that", "I should point out that", "I should mention that", "Please note that", "Keep in mind that", "Bear in mind that", "It should be noted that", "Note that", "Notably,", "Importantly,", "Crucially,", "It goes without saying that"

**Examples**:
- ❌ "It's important to note that the configuration file must be updated before deployment."
- ❌ "It's worth mentioning that this approach has some limitations."
- ❌ "Please note that the API rate limit applies to all endpoints."
- ❌ "Keep in mind that the default timeout is 30 seconds."
- ❌ "It goes without saying that security should be a top priority."
- ✅ "Update the configuration file before deployment."
- ✅ "This approach has the following limitations: …"
- ✅ "The API rate limit applies to all endpoints."
- ✅ "The default timeout is 30 seconds."
- ✅ *(delete "It goes without saying that" and state the claim directly)*

**Detection rule**: Flag any sentence that opens with one of the trigger phrases above. "It's important to note that", "Please note that", and "Keep in mind that" are the most frequent; flag them unconditionally. For "Note that" and "Notably,", flag when they appear as sentence openers rather than as part of a structured warning block (e.g., a `> **Note:**` callout in documentation is acceptable).

**Humanization**: Delete the trigger phrase and begin the sentence with the substantive claim. If the phrase was used to introduce a genuine warning or constraint, consider using a structured callout (`> **Note:**` or `> **Warning:**`) instead of inline hedging prose.

---

### Communication Intent Dimension — Quick Reference

| ID | Pattern | Trigger signals | Detection rule | Humanization action |
|----|---------|----------------|----------------|---------------------|
| I1 | Collaborative / assistant language | "Certainly!", "Of course!", "I hope this helps", "Would you like me to…", "Is there anything else I can help you with?", "Feel free to ask", "Don't hesitate to reach out" | Flag any sentence opening with or containing a trigger phrase | Delete the trigger phrase; retain substantive content with direct phrasing; delete closing offers entirely |
| I2 | Knowledge cutoff disclaimers | "As of my last knowledge update", "Up to my last training update", "As of my knowledge cutoff", "I don't have information beyond…", "Based on my training data" | Flag unconditionally on "As of my…" or "Up to my…"; flag other triggers on match | Replace with a specific verifiable date and source reference, or remove if the claim is stable |
| I3 | Phrase templates and placeholder text | `[Your Name]`, `[Insert X here]`, `[Describe the specific section]`, `[Add relevant details]`, "Note: Replace this with…" | Flag bracket-enclosed generic labels and explicit replacement instructions | Replace placeholders with actual values; delete replacement-instruction annotations |
| I4 | Excessive hedging and meta-commentary | "It's important to note that", "It's worth mentioning that", "I should point out that", "Please note that", "Keep in mind that" | Flag sentence-opening trigger phrases unconditionally; allow structured callout blocks | Delete the trigger phrase; open directly with the substantive claim; use structured callouts for genuine warnings |
