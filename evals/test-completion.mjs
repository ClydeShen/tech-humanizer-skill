const res = await fetch('http://localhost:8080/v1/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer local' },
  body: JSON.stringify({
    model: 'Qwen3.6-35B-A3B-UD-Q5_K_M.gguf',
    prompt: 'System: You are a writing editor. Transform text to remove AI patterns. Output ONLY the transformed text.\nHuman: Rewrite this: This launch stands as a testament to our engineering excellence.\nAssistant:',
    temperature: 0.1,
    max_tokens: 8192
  })
});
const data = await res.json();
const output = data.choices?.[0]?.text;
console.log('Finish:', data.choices?.[0]?.finish_reason);
console.log('Completion tokens:', data.usage?.completion_tokens);

// Extract after </think>
const endTag = '</think>';
const idx = output.indexOf(endTag);
const afterTag = idx >= 0 ? output.substring(idx + endTag.length) : '(no end tag found)';
console.log('After tag:', JSON.stringify(afterTag.substring(0, 500)));
