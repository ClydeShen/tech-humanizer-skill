const tests = [
  {
    name: 'rule-of-three',
    user_input: 'Humanize this marketing-heavy product sentence for engineers: "The tool provides a fast, reliable, and scalable solution that monitors, analyzes, and reports on pipeline health."'
  },
  {
    name: 'heading-breaks',
    user_input: 'Humanize this Markdown document:\n# Setup\n\n---\n\n### Install the CLI\nRun npm install.'
  },
  {
    name: 'detect-density',
    user_input: 'Detect AI writing markers in this text: "The API returns 200 when the request succeeds. This robust system stands as a testament to engineering excellence. Please note that retries run after token refresh. Certainly! I hope this helps."'
  },
  {
    name: 'detect-markup',
    user_input: 'Detect AI writing markers in this text: "According to sources, the endpoint is deprecated <ref>Release Notes. See turn0search0 and contentReference:2 for details. The change is documented in a major 2025 industry report."'
  },
  {
    name: 'slack-vs-client',
    user_input: 'Rewrite this twice, once for Slack and once for a client email: "I am pleased to inform you that the deployment has been completed successfully. Please review your services at your earliest convenience and notify me of any anomalies."'
  },
  {
    name: 'source-boundary',
    user_input: 'Humanize this without inventing or hiding missing evidence: "Reports indicate that AtlasFlow is the fastest CI/CD tool in the market, with unmatched adoption across Fortune 500 companies."'
  }
];

const system = "Task: Transform the given text to remove AI-shaped prose patterns. Produce only the transformed text.\n\nPatterns to fix:\n- Grand claims: \"stands as a testament\", \"pivotal moment\", \"dawn of\",\n- Vague attribution: \"experts argue\", \"according to sources\", \"industry leaders believe\"\n- Inflated words: \"utilize\", \"leverage\", \"robust\", \"cutting-edge\", \"groundbreaking\"\n- Hedging: \"it is important to note\", \"please be advised\", \"it should be noted\"\n- Assistant language: \"Certainly!\", \"I hope this helps\", \"Is there anything else\"\n- Rule-of-three: \"fast, reliable, and scalable\", \"fast, flexible, and powerful\"\n- Decorative formatting: **bold** emphasis, em-dash overuse\n- Citation leaks: <ref>, contentReference:, turn0search:, oaicite:\n- Knowledge cutoff: \"As of my last knowledge update\"\n\nDirectives:\n1. Replace each pattern with simple, direct language\n2. Keep facts, metrics, technical terms\n3. Output ONLY the transformed text\n4. Do not explain, list, or enumerate what you changed";

for (const t of tests) {
  console.log(`\n=== ${t.name} ===`);
  const res = await fetch('http://localhost:8080/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer local' },
    body: JSON.stringify({
      model: 'Qwen3.6-35B-A3B-UD-Q5_K_M.gguf',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: t.user_input }
      ],
      temperature: 0.1,
      max_tokens: 4096
    })
  });
  const data = await res.json();
  const msg = data.choices?.[0]?.message || {};
  const text = msg.content || '';
  console.log('finish_reason:', data.choices?.[0]?.finish_reason);
  console.log('tokens:', data.usage?.completion_tokens);
  console.log('output length:', text.length);
  console.log('output:', JSON.stringify(text.substring(0, 300)));
  
  // Check if output has reasoning tags
  const thinkTag = '<think>';
  const endTag = '</think>';
  if (text.includes(thinkTag)) {
    const thinkStart = text.indexOf(thinkTag);
    const thinkEnd = text.indexOf(endTag, thinkStart);
    const afterThink = text.substring(thinkEnd + endTag.length);
    console.log('After </think>: ' + JSON.stringify(afterThink.substring(0, 200)));
  }
}
