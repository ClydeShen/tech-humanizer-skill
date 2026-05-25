// Replicate the exact same request as the eval for "detect-density-by-sentence"
const system = "Task: Transform the given text to remove AI-shaped prose patterns. Produce only the transformed text.\n\nPatterns to fix:\n- Grand claims: \"stands as a testament\", \"pivotal moment\", \"dawn of\",\n- Vague attribution: \"experts argue\", \"according to sources\", \"industry leaders believe\"\n- Inflated words: \"utilize\", \"leverage\", \"robust\", \"cutting-edge\", \"groundbreaking\"\n- Hedging: \"it is important to note\", \"please be advised\", \"it should be noted\"\n- Assistant language: \"Certainly!\", \"I hope this helps\", \"Is there anything else\"\n- Rule-of-three: \"fast, reliable, and scalable\", \"fast, flexible, and powerful\"\n- Decorative formatting: **bold** emphasis, em-dash overuse\n- Citation leaks: <ref>, contentReference:, turn0search:, oaicite:\n- Knowledge cutoff: \"As of my last knowledge update\"\n\nDirectives:\n1. Replace each pattern with simple, direct language\n2. Keep facts, metrics, technical terms\n3. Output ONLY the transformed text\n4. Do not explain, list, or enumerate what you changed";

const user_input = 'Detect AI writing markers in this text: "The API returns 200 when the request succeeds. This robust system stands as a testament to engineering excellence. Please note that retries run after token refresh. Certainly! I hope this helps."\n';

console.log('Testing detect-density-by-sentence case...\n');

// Try multiple times to check non-determinism
for (let i = 1; i <= 3; i++) {
  const res = await fetch('http://localhost:8080/v1/chat/completions', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer local',
      'User-Agent': 'promptfoo/1.25.0'  // Match what promptfoo sends
    },
    body: JSON.stringify({
      model: 'Qwen3.6-35B-A3B-UD-Q5_K_M.gguf',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user_input }
      ],
      temperature: 0.1,
      max_tokens: 4096
    })
  });
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const tokens = data.usage?.completion_tokens;
  console.log(`Run ${i}: finish=${data.choices?.[0]?.finish_reason} tokens=${tokens} output_len=${text.length}`);
  console.log(`  Output: ${JSON.stringify(text.substring(0, 100))}`);
  if (text.length < 10) {
    console.log(`  ** SHORT OUTPUT - likely reasoning trace stripped **`);
  }
}
