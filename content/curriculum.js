/* =========================================================
   CURRICULUM — single source of truth for levels & modules.
   Module content lives in content/modules/<file>.js
   prereqs drive the Concept Map.
   ========================================================= */
window.CURRICULUM = {
  title: 'Modern AI Era — Learning Hub',
  updated: 'October 2026',
  levels: [
    { id: 'L0', num: 0, title: 'Orientation', subtitle: 'The big map of what changed (2022 → 2026) and how to use this hub.', phase: 1 },
    { id: 'L1', num: 1, title: 'How Modern AI Thinks', subtitle: 'LLMs, tokens, training, embeddings — the mental models everything else is built on. No code.', phase: 1 },
    { id: 'L2', num: 2, title: 'The Model Landscape', subtitle: 'The AI race, multimodal & reasoning models, open-source vs closed, choosing the right model.', phase: 1 },
    { id: 'L3', num: 3, title: 'Talking to AI', subtitle: 'From prompt engineering to context engineering — getting the best out of any AI.', phase: 1 },
    { id: 'L4', num: 4, title: 'Building Blocks of AI Apps', subtitle: 'APIs, tool calling, RAG, fine-tuning, MCP, memory and no-code automation.', phase: 2 },
    { id: 'L5', num: 5, title: 'Agents', subtitle: 'Agent loops, harness engineering, skills, multi-agent systems, loop engineering.', phase: 2 },
    { id: 'L6', num: 6, title: 'Building Software with AI', subtitle: 'Vibe coding, app builders, coding agents, spec-driven development, AI-assisted architecture.', phase: 3 },
    { id: 'L7', num: 7, title: 'Production & Responsibility', subtitle: 'Evals, cost & observability, AI security, ethics & regulation, the road ahead.', phase: 3 },
    { id: 'L8', num: 8, title: 'Capstone Projects', subtitle: 'Four guided builds that combine everything you learned.', phase: 3 }
  ],
  modules: [
    // ---- Level 0
    { id: '0.1', level: 'L0', title: 'The Big Map: what changed from 2022 to 2026', file: 'L0-01-big-map', difficulty: 'beginner', minutes: 20, prereqs: [] },
    { id: '0.2', level: 'L0', title: 'How to use this hub (tracks, levels, practice)', file: 'L0-02-how-to-use', difficulty: 'beginner', minutes: 8, prereqs: ['0.1'] },
    // ---- Level 1
    { id: '1.1', level: 'L1', title: 'AI vs ML vs Deep Learning vs Generative AI', file: 'L1-01-ai-ml-dl-genai', difficulty: 'beginner', minutes: 15, prereqs: ['0.1'] },
    { id: '1.2', level: 'L1', title: 'What an LLM really is: a next-word predictor', file: 'L1-02-what-is-llm', difficulty: 'beginner', minutes: 20, prereqs: ['1.1'] },
    { id: '1.3', level: 'L1', title: 'Tokens & the context window', file: 'L1-03-tokens-context', difficulty: 'beginner', minutes: 18, prereqs: ['1.2'] },
    { id: '1.4', level: 'L1', title: 'How a model is made: pre-training → fine-tuning → RLHF', file: 'L1-04-how-models-are-made', difficulty: 'beginner', minutes: 22, prereqs: ['1.2'] },
    { id: '1.5', level: 'L1', title: 'Temperature & randomness: why answers differ', file: 'L1-05-temperature', difficulty: 'beginner', minutes: 12, prereqs: ['1.2'] },
    { id: '1.6', level: 'L1', title: 'Hallucinations, knowledge cutoff & limits', file: 'L1-06-hallucinations', difficulty: 'beginner', minutes: 15, prereqs: ['1.4', '1.5'] },
    { id: '1.7', level: 'L1', title: 'Transformers & attention, by intuition', file: 'L1-07-transformers-attention', difficulty: 'intermediate', minutes: 22, prereqs: ['1.3'] },
    { id: '1.8', level: 'L1', title: 'Embeddings: meaning as coordinates', file: 'L1-08-embeddings', difficulty: 'intermediate', minutes: 18, prereqs: ['1.7'] },
    // ---- Level 2
    { id: '2.1', level: 'L2', title: 'The AI race: labs, model families & strengths', file: 'L2-01-ai-race', difficulty: 'beginner', minutes: 20, prereqs: ['1.4'] },
    { id: '2.2', level: 'L2', title: 'Multimodal AI: vision, voice, image, video, real-time', file: 'L2-02-multimodal', difficulty: 'beginner', minutes: 18, prereqs: ['2.1'] },
    { id: '2.3', level: 'L2', title: 'Reasoning models & “thinking” (test-time compute)', file: 'L2-03-reasoning-models', difficulty: 'intermediate', minutes: 20, prereqs: ['2.1', '1.6'] },
    { id: '2.4', level: 'L2', title: 'Open-source vs open-weight vs closed — and running models locally', file: 'L2-04-open-models-local', difficulty: 'intermediate', minutes: 22, prereqs: ['2.1'] },
    { id: '2.5', level: 'L2', title: 'Choosing a model: benchmarks, cost, speed, context', file: 'L2-05-choosing-models', difficulty: 'intermediate', minutes: 18, prereqs: ['2.3', '2.4', '1.3'] },
    { id: '2.6', level: 'L2', title: 'Efficiency under the hood: MoE, distillation, quantization', file: 'L2-06-efficiency', difficulty: 'advanced', minutes: 20, prereqs: ['2.4', '1.7'] },
    // ---- Level 3
    { id: '3.1', level: 'L3', title: 'Anatomy of a great prompt', file: 'L3-01-prompt-anatomy', difficulty: 'beginner', minutes: 18, prereqs: ['1.2'] },
    { id: '3.2', level: 'L3', title: 'Core prompting techniques', file: 'L3-02-prompt-techniques', difficulty: 'beginner', minutes: 22, prereqs: ['3.1'] },
    { id: '3.3', level: 'L3', title: 'Personalising AI: system prompts, custom GPTs/Gems/Projects, memory', file: 'L3-03-personalising-ai', difficulty: 'beginner', minutes: 16, prereqs: ['3.1'] },
    { id: '3.4', level: 'L3', title: 'Structured output (JSON) & prompt chaining', file: 'L3-04-structured-output-chaining', difficulty: 'intermediate', minutes: 18, prereqs: ['3.2'] },
    { id: '3.5', level: 'L3', title: 'Prompting reasoning models differently', file: 'L3-05-prompting-reasoning-models', difficulty: 'intermediate', minutes: 12, prereqs: ['3.2', '2.3'] },
    { id: '3.6', level: 'L3', title: 'Context engineering: curating what the model sees', file: 'L3-06-context-engineering', difficulty: 'intermediate', minutes: 24, prereqs: ['3.3', '1.3'] },
    { id: '3.7', level: 'L3', title: 'AI for learning & research: deep research, verification, citations', file: 'L3-07-ai-research-learning', difficulty: 'beginner', minutes: 16, prereqs: ['3.2', '1.6'] },
    // ---- Level 4
    { id: '4.1', level: 'L4', title: 'APIs, SDKs, keys & pricing: talking to a model from code', file: 'L4-01-apis-sdks', difficulty: 'beginner', minutes: 22, prereqs: ['1.3', '2.5'] },
    { id: '4.2', level: 'L4', title: 'Function calling / tool use: giving AI hands', file: 'L4-02-function-calling', difficulty: 'intermediate', minutes: 20, prereqs: ['4.1', '3.4'] },
    { id: '4.3', level: 'L4', title: 'RAG part 1: giving AI your own knowledge', file: 'L4-03-rag-basics', difficulty: 'intermediate', minutes: 25, prereqs: ['1.8', '4.1'] },
    { id: '4.4', level: 'L4', title: 'RAG part 2: reranking, hybrid search, GraphRAG, agentic RAG', file: 'L4-04-rag-advanced', difficulty: 'advanced', minutes: 22, prereqs: ['4.3'] },
    { id: '4.5', level: 'L4', title: 'Fine-tuning vs RAG vs prompting (and LoRA)', file: 'L4-05-finetune-vs-rag', difficulty: 'intermediate', minutes: 18, prereqs: ['4.3', '1.4'] },
    { id: '4.6', level: 'L4', title: 'MCP: the “USB-C port” for AI', file: 'L4-06-mcp', difficulty: 'intermediate', minutes: 22, prereqs: ['4.2'] },
    { id: '4.7', level: 'L4', title: 'Memory: short-term, long-term & user memory', file: 'L4-07-memory', difficulty: 'intermediate', minutes: 16, prereqs: ['4.3', '3.6'] },
    { id: '4.8', level: 'L4', title: 'No-code / low-code AI automation', file: 'L4-08-no-code-automation', difficulty: 'beginner', minutes: 18, prereqs: ['4.2'] },
    // ---- Level 5
    { id: '5.1', level: 'L5', title: 'What is an agent? The think → act → observe loop', file: 'L5-01-what-is-agent', difficulty: 'beginner', minutes: 20, prereqs: ['4.2'] },
    { id: '5.2', level: 'L5', title: 'Workflows vs agents: the classic design patterns', file: 'L5-02-agent-patterns', difficulty: 'intermediate', minutes: 24, prereqs: ['5.1', '3.4'] },
    { id: '5.3', level: 'L5', title: 'Agent = Model + Harness', file: 'L5-03-harness', difficulty: 'intermediate', minutes: 24, prereqs: ['5.1', '3.6', '4.7'] },
    { id: '5.4', level: 'L5', title: 'Skills, AGENTS.md, rules, hooks & plugins', file: 'L5-04-skills-agentsmd', difficulty: 'intermediate', minutes: 22, prereqs: ['5.3', '4.6'] },
    { id: '5.5', level: 'L5', title: 'Multi-agent systems, subagents & A2A', file: 'L5-05-multi-agent-a2a', difficulty: 'advanced', minutes: 24, prereqs: ['5.2', '5.3'] },
    { id: '5.6', level: 'L5', title: 'Loop engineering: Ralph loop & long-running agents', file: 'L5-06-loop-engineering', difficulty: 'advanced', minutes: 22, prereqs: ['5.3'] },
    { id: '5.7', level: 'L5', title: 'Computer-use & browser agents', file: 'L5-07-computer-use', difficulty: 'intermediate', minutes: 16, prereqs: ['5.1', '2.2'] },
    { id: '5.8', level: 'L5', title: 'Agent frameworks landscape', file: 'L5-08-frameworks', difficulty: 'advanced', minutes: 20, prereqs: ['5.5'] },
    // ---- Level 6
    { id: '6.1', level: 'L6', title: 'Evolution of AI coding: autocomplete → agents', file: 'L6-01-ai-coding-evolution', difficulty: 'beginner', minutes: 18, prereqs: ['5.1'] },
    { id: '6.2', level: 'L6', title: 'Vibe coding: what, when, and when it bites', file: 'L6-02-vibe-coding', difficulty: 'beginner', minutes: 18, prereqs: ['6.1'] },
    { id: '6.3', level: 'L6', title: 'App builders: from idea to deployed website', file: 'L6-03-app-builders', difficulty: 'beginner', minutes: 20, prereqs: ['6.2'] },
    { id: '6.4', level: 'L6', title: 'Working with coding agents: plan-first, context files, git, tests', file: 'L6-04-coding-agents-workflow', difficulty: 'intermediate', minutes: 26, prereqs: ['6.2', '5.4'] },
    { id: '6.5', level: 'L6', title: 'Spec-driven development', file: 'L6-05-spec-driven', difficulty: 'intermediate', minutes: 22, prereqs: ['6.4'] },
    { id: '6.6', level: 'L6', title: 'AI for system design & architecture', file: 'L6-06-system-design', difficulty: 'intermediate', minutes: 22, prereqs: ['6.5'] },
    { id: '6.7', level: 'L6', title: 'Orchestrating a team of coding agents', file: 'L6-07-agent-teams', difficulty: 'advanced', minutes: 22, prereqs: ['6.5', '5.5', '5.6'] },
    { id: '6.8', level: 'L6', title: 'Security of AI-generated code', file: 'L6-08-code-security', difficulty: 'intermediate', minutes: 18, prereqs: ['6.4'] },
    // ---- Level 7
    { id: '7.1', level: 'L7', title: 'Evals: measuring AI quality', file: 'L7-01-evals', difficulty: 'intermediate', minutes: 22, prereqs: ['4.3', '5.2'] },
    { id: '7.2', level: 'L7', title: 'Cost, latency & observability', file: 'L7-02-cost-latency-observability', difficulty: 'intermediate', minutes: 20, prereqs: ['4.1', '7.1'] },
    { id: '7.3', level: 'L7', title: 'AI security: prompt injection, jailbreaks, guardrails', file: 'L7-03-ai-security', difficulty: 'intermediate', minutes: 22, prereqs: ['5.3', '6.8'] },
    { id: '7.4', level: 'L7', title: 'Ethics, copyright, privacy & regulation', file: 'L7-04-ethics-regulation', difficulty: 'beginner', minutes: 18, prereqs: ['1.6'] },
    { id: '7.5', level: 'L7', title: 'Where it’s heading: alignment, AGI debate, skills that last', file: 'L7-05-future', difficulty: 'beginner', minutes: 16, prereqs: ['7.4'] },
    // ---- Level 8
    { id: 'P1', level: 'L8', title: 'Project 1 — Personal study assistant over your notes', file: 'P1-study-assistant', difficulty: 'intermediate', minutes: 90, prereqs: ['4.3', '3.6'] },
    { id: 'P2', level: 'L8', title: 'Project 2 — Vibe-code & deploy your personal website', file: 'P2-vibe-website', difficulty: 'beginner', minutes: 90, prereqs: ['6.3'] },
    { id: 'P3', level: 'L8', title: 'Project 3 — A tool-using agent connected to MCP', file: 'P3-mcp-agent', difficulty: 'advanced', minutes: 120, prereqs: ['4.6', '5.3'] },
    { id: 'P4', level: 'L8', title: 'Project 4 — Spec-driven mini product with evals', file: 'P4-spec-product', difficulty: 'advanced', minutes: 150, prereqs: ['6.5', '7.1', '7.3'] }
  ],
  tracks: [
    { id: 'user', title: '🧭 Power User track', desc: 'Use AI brilliantly for study, work and research — no coding needed.', modules: ['0.1', '1.1', '1.2', '1.3', '1.5', '1.6', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '3.6', '3.7', '6.2', '6.3', '7.4'] },
    { id: 'builder', title: '🛠 AI-assisted Builder track', desc: 'Build websites & software faster with AI coding agents.', modules: ['0.1', '1.2', '1.3', '2.5', '3.1', '3.6', '5.1', '5.3', '5.4', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.8', 'P2', 'P4'] },
    { id: 'product', title: '🚀 AI Product Builder track', desc: 'Build AI-powered apps: RAG, agents, APIs, fine-tuning.', modules: ['1.2', '1.8', '2.5', '3.4', '3.6', '4.1', '4.2', '4.3', '4.5', '4.6', '5.1', '5.2', '5.3', '5.5', '7.1', '7.3', 'P1', 'P3'] }
  ],
  glossaryFiles: ['L0', 'L1', 'L1b', 'L2', 'L2b', 'L3', 'L3b', 'L4', 'L4b', 'L5', 'L5b', 'L6', 'L6b', 'L7', 'L8']
};
