/* Resource library — "Start here" general resources (module-specific resources live in each module).
   Format: { title, url, type: 'video|doc|article|paper|course|tool|repo', note }
   All URLs verified reachable in October 2026. */
HUB.addResources([
  { title: 'Andrej Karpathy — Intro to Large Language Models', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'video', note: 'The best 1-hour general-audience explanation of how LLMs work.' },
  { title: 'Andrej Karpathy — How I use LLMs', url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw', type: 'video', note: 'Practical tour of everyday AI tools and habits (2025).' },
  { title: '3Blue1Brown — Neural networks series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'video', note: 'Beautiful visual explanations, from neural networks to transformers and attention.' },
  { title: 'Google — Gemini API prompting strategies', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies', type: 'doc', note: 'Official, practical prompting guide.' },
  { title: 'OpenAI — Prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', type: 'doc', note: 'Official prompting best practices from OpenAI.' },
  { title: 'Anthropic — Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', type: 'article', note: 'The classic guide to workflows vs agents and the core agent patterns.' },
  { title: 'Anthropic — Effective context engineering for AI agents', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', type: 'article', note: 'Why context, not just prompts, decides agent quality.' },
  { title: 'Model Context Protocol — official docs', url: 'https://modelcontextprotocol.io/', type: 'doc', note: 'The open standard for connecting AI apps to tools and data.' },
  { title: 'Hugging Face — Learn', url: 'https://huggingface.co/learn', type: 'course', note: 'Free courses on LLMs, agents and open models.' },
  { title: 'DeepLearning.AI — Short courses', url: 'https://www.deeplearning.ai/short-courses/', type: 'course', note: 'Free 1–2 hour courses on prompting, RAG, agents and more.' },
  { title: 'Simon Willison — Things we learned about LLMs in 2024', url: 'https://simonwillison.net/2024/Dec/31/llms-in-2024/', type: 'article', note: 'A careful yearly review that catches you up on a whole year at once.' },
  { title: 'Simon Willison — 2025: The year in LLMs', url: 'https://simonwillison.net/2025/Dec/31/the-year-in-llms/', type: 'article', note: 'The 2025 follow-up: agents, coding tools, reasoning.' },
  { title: 'Stanford HAI — AI Index Report', url: 'https://hai.stanford.edu/ai-index', type: 'paper', note: 'Yearly data on AI progress, cost, adoption and policy.' },
  { title: 'Lilian Weng — Lil\'Log', url: 'https://lilianweng.github.io/', type: 'article', note: 'In-depth technical write-ups (agents, hallucination, reasoning) for when you want to go deeper.' },
  { title: 'Google AI Studio', url: 'https://aistudio.google.com/', type: 'tool', note: 'Free playground for Gemini models and a free API key.' },
  { title: 'Ollama', url: 'https://ollama.com/', type: 'tool', note: 'Run open-weight models on your own computer.' }
]);
