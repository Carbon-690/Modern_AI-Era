# Modern AI Era — Interactive Learning Hub

[![License: Dual MIT & CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT%20%2F%20CC--BY--SA%204.0-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)](#)
[![100% Offline](https://img.shields.io/badge/Runtime-100%25%20Offline-brightgreen.svg)](#)
[![Vibe Coder Friendly](https://img.shields.io/badge/Contributions-Vibe%20Coder%20Friendly-purple.svg)](#-how-to-contribute-in-3-steps-zero-terminal-required)

A visual, beginner-to-advanced, **zero-dependency, 100% offline interactive learning hub** covering the concepts, skills, and tools of the modern AI era (November 2022 to October 2026).

---

## What is this project?

This hub is designed for self-paced learning by anyone who missed the rapid developments in AI since ChatGPT launched (Nov 2022). It focuses on **intuition, conceptual mental models, and practical skills**:

* **9 Progressive Levels (L0–L8):** Orientation, LLM mechanics, model landscape, prompt engineering, AI building blocks (RAG, MCP), agent systems, vibe coding, production/evals, and capstone projects.
* **Visual & Interactive:** Signature SVG diagrams, interactive widgets (simulators, steppers, decision trees), and scenario quizzes.
* **100% Offline & Private:** Zero npm packages, zero external CDNs, zero network calls. Runs straight from `index.html` in any browser. Progress is saved in local storage.

---

## 🚀 How to Run Locally

No Node.js, no terminal, and no build tools required:

1. Download or clone this repository.
2. Double-click `index.html` to open it in your browser (Chrome, Firefox, Safari, Edge).
3. That's it!

---

## ⚡ How to Contribute in 3 Steps 

We are building this curriculum with open-source contributors! You should have claude pro/max plan for this contribution 

```
[1. Give Repo to Claude] ➔ [2. Copy Module Prompt Below] ➔ [3. Paste on GitHub Web & PR]
```

### Step 1: Give this project to Claude
* Download this repo as a `.zip` (or upload it to a **Claude Project**).
* Claude will read [`ImplementationPlan.md`](ImplementationPlan.md) for full context and [`content/modules/L1-01-ai-ml-dl-genai.js`](content/modules/L1-01-ai-ml-dl-genai.js) for code formatting.

### Step 2: Pick an open module & copy its prompt
* Scroll down to the [Curriculum Roadmap](#curriculum-roadmap--module-prompts) below.
* Pick any module marked `🟡 Open`.
* Copy the pre-made 2-line prompt and paste it into Claude.

### Step 3: Submit a Pull Request

---

## 📐 Golden Rules for Every Module

When generating a module with Claude, make sure it adheres to these basic guidelines:
1. **100% Offline:** Pure JavaScript calling `HUB.registerModule({...})`. No external libraries, CDNs, or remote image links.
2. **Follow Existing Format:** Structure must match [`content/modules/L1-01-ai-ml-dl-genai.js`](content/modules/L1-01-ai-ml-dl-genai.js) (includes `why`, `analogy`, `diagram`, `sections`, `widgets`, and `quiz`).
3. **Include 5 Scenario Quizzes:** Five multiple-choice questions testing intuition (not trivia), with explanatory feedback for each option.
4. **Attribution:** Fill in the `contributor` field inside the module file so you are recognized:
   ```javascript
   contributor: {
     name: 'Your Name',
     github: 'your-username'
   }
   ```

---

## Curriculum Roadmap & Module Prompts

*Legend: `✅ Completed` · `🟡 Open for Contribution`*

### Level 0 — Orientation
| ID | Module Title | Target File | Status |
|:---|:---|:---|:---|
| **0.1** | The Big Map: what changed from 2022 to 2026 | `content/modules/L0-01-big-map.js` | ✅ Completed |
| **0.2** | How to use this hub (tracks, levels, practice) | `content/modules/L0-02-how-to-use.js` | ✅ Completed |

---

### Level 1 — How Modern AI Thinks
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **1.1** | AI vs ML vs Deep Learning vs Generative AI | `content/modules/L1-01-ai-ml-dl-genai.js` | ✅ Completed | — |
| **1.2** | What an LLM really is: a next-word predictor | `content/modules/L1-02-what-is-llm.js` | ✅ Completed | — |
| **1.3** | Tokens & the context window | `content/modules/L1-03-tokens-context.js` | ✅ Completed | — |
| **1.4** | How a model is made: pre-training → fine-tuning → RLHF | `content/modules/L1-04-how-models-are-made.js` | ✅ Completed | — |
| **1.5** | Temperature & randomness: why answers differ | `content/modules/L1-05-temperature.js` | ✅ Completed | — |
| **1.6** | Hallucinations, knowledge cutoff & limits | `content/modules/L1-06-hallucinations.js` | ✅ Completed | — |
| **1.7** | Transformers & attention, by intuition | `content/modules/L1-07-transformers-attention.js` | 🟡 Open | `Please write the complete JavaScript module for Module 1.7: "Transformers & attention, by intuition" (file: content/modules/L1-07-transformers-attention.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **1.8** | Embeddings: meaning as coordinates | `content/modules/L1-08-embeddings.js` | 🟡 Open | `Please write the complete JavaScript module for Module 1.8: "Embeddings: meaning as coordinates" (file: content/modules/L1-08-embeddings.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 2 — The Model Landscape
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **2.1** | The AI race: labs, model families & strengths | `content/modules/L2-01-ai-race.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.1: "The AI race: labs, model families & strengths" (file: content/modules/L2-01-ai-race.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **2.2** | Multimodal AI: vision, voice, image, video, real-time | `content/modules/L2-02-multimodal.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.2: "Multimodal AI: vision, voice, image, video, real-time" (file: content/modules/L2-02-multimodal.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **2.3** | Reasoning models & "thinking" (test-time compute) | `content/modules/L2-03-reasoning-models.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.3: "Reasoning models & 'thinking' (test-time compute)" (file: content/modules/L2-03-reasoning-models.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **2.4** | Open-source vs open-weight vs closed — running locally | `content/modules/L2-04-open-models-local.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.4: "Open-source vs open-weight vs closed — running locally" (file: content/modules/L2-04-open-models-local.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **2.5** | Choosing a model: benchmarks, cost, speed, context | `content/modules/L2-05-choosing-models.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.5: "Choosing a model: benchmarks, cost, speed, context" (file: content/modules/L2-05-choosing-models.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **2.6** | Efficiency under the hood: MoE, distillation, quantization | `content/modules/L2-06-efficiency.js` | 🟡 Open | `Please write the complete JavaScript module for Module 2.6: "Efficiency under the hood: MoE, distillation, quantization" (file: content/modules/L2-06-efficiency.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 3 — Talking to AI (Prompt & Context Engineering)
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **3.1** | Anatomy of a great prompt | `content/modules/L3-01-prompt-anatomy.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.1: "Anatomy of a great prompt" (file: content/modules/L3-01-prompt-anatomy.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.2** | Core prompting techniques | `content/modules/L3-02-prompt-techniques.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.2: "Core prompting techniques" (file: content/modules/L3-02-prompt-techniques.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.3** | Personalising AI: system prompts, custom GPTs/Gems, memory | `content/modules/L3-03-personalising-ai.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.3: "Personalising AI: system prompts, custom GPTs/Gems, memory" (file: content/modules/L3-03-personalising-ai.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.4** | Structured output (JSON) & prompt chaining | `content/modules/L3-04-structured-output-chaining.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.4: "Structured output (JSON) & prompt chaining" (file: content/modules/L3-04-structured-output-chaining.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.5** | Prompting reasoning models differently | `content/modules/L3-05-prompting-reasoning-models.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.5: "Prompting reasoning models differently" (file: content/modules/L3-05-prompting-reasoning-models.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.6** | Context engineering: curating what the model sees | `content/modules/L3-06-context-engineering.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.6: "Context engineering: curating what the model sees" (file: content/modules/L3-06-context-engineering.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **3.7** | AI for learning & research: deep research, citations | `content/modules/L3-07-ai-research-learning.js` | 🟡 Open | `Please write the complete JavaScript module for Module 3.7: "AI for learning & research: deep research, citations" (file: content/modules/L3-07-ai-research-learning.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 4 — Building Blocks of AI Apps
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **4.1** | APIs, SDKs, keys & pricing: talking to models from code | `content/modules/L4-01-apis-sdks.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.1: "APIs, SDKs, keys & pricing" (file: content/modules/L4-01-apis-sdks.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.2** | Function calling / tool use: giving AI hands | `content/modules/L4-02-function-calling.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.2: "Function calling / tool use: giving AI hands" (file: content/modules/L4-02-function-calling.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.3** | RAG part 1: giving AI your own knowledge | `content/modules/L4-03-rag-basics.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.3: "RAG part 1: giving AI your own knowledge" (file: content/modules/L4-03-rag-basics.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.4** | RAG part 2: reranking, hybrid search, GraphRAG, agentic RAG | `content/modules/L4-04-rag-advanced.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.4: "RAG part 2: reranking, hybrid search, GraphRAG, agentic RAG" (file: content/modules/L4-04-rag-advanced.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.5** | Fine-tuning vs RAG vs prompting (and LoRA) | `content/modules/L4-05-finetune-vs-rag.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.5: "Fine-tuning vs RAG vs prompting (and LoRA)" (file: content/modules/L4-05-finetune-vs-rag.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.6** | MCP: the "USB-C port" for AI | `content/modules/L4-06-mcp.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.6: "MCP: the 'USB-C port' for AI" (file: content/modules/L4-06-mcp.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.7** | Memory: short-term, long-term & user memory | `content/modules/L4-07-memory.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.7: "Memory: short-term, long-term & user memory" (file: content/modules/L4-07-memory.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **4.8** | No-code / low-code AI automation | `content/modules/L4-08-no-code-automation.js` | 🟡 Open | `Please write the complete JavaScript module for Module 4.8: "No-code / low-code AI automation" (file: content/modules/L4-08-no-code-automation.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 5 — Agents
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **5.1** | What is an agent? The think → act → observe loop | `content/modules/L5-01-what-is-agent.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.1: "What is an agent? The think → act → observe loop" (file: content/modules/L5-01-what-is-agent.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.2** | Workflows vs agents: classic design patterns | `content/modules/L5-02-agent-patterns.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.2: "Workflows vs agents: classic design patterns" (file: content/modules/L5-02-agent-patterns.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.3** | Agent = Model + Harness | `content/modules/L5-03-harness.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.3: "Agent = Model + Harness" (file: content/modules/L5-03-harness.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.4** | Skills, AGENTS.md, rules, hooks & plugins | `content/modules/L5-04-skills-agentsmd.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.4: "Skills, AGENTS.md, rules, hooks & plugins" (file: content/modules/L5-04-skills-agentsmd.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.5** | Multi-agent systems, subagents & A2A | `content/modules/L5-05-multi-agent-a2a.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.5: "Multi-agent systems, subagents & A2A" (file: content/modules/L5-05-multi-agent-a2a.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.6** | Loop engineering: Ralph loop & long-running agents | `content/modules/L5-06-loop-engineering.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.6: "Loop engineering: Ralph loop & long-running agents" (file: content/modules/L5-06-loop-engineering.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.7** | Computer-use & browser agents | `content/modules/L5-07-computer-use.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.7: "Computer-use & browser agents" (file: content/modules/L5-07-computer-use.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **5.8** | Agent frameworks landscape | `content/modules/L5-08-frameworks.js` | 🟡 Open | `Please write the complete JavaScript module for Module 5.8: "Agent frameworks landscape" (file: content/modules/L5-08-frameworks.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 6 — Building Software with AI (Vibe Coding & Coding Agents)
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **6.1** | Evolution of AI coding: autocomplete → agents | `content/modules/L6-01-ai-coding-evolution.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.1: "Evolution of AI coding: autocomplete → agents" (file: content/modules/L6-01-ai-coding-evolution.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.2** | Vibe coding: what, when, and when it bites | `content/modules/L6-02-vibe-coding.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.2: "Vibe coding: what, when, and when it bites" (file: content/modules/L6-02-vibe-coding.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.3** | App builders: from idea to deployed website | `content/modules/L6-03-app-builders.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.3: "App builders: from idea to deployed website" (file: content/modules/L6-03-app-builders.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.4** | Working with coding agents: plans, context, git, tests | `content/modules/L6-04-coding-agents-workflow.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.4: "Working with coding agents: plans, context, git, tests" (file: content/modules/L6-04-coding-agents-workflow.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.5** | Spec-driven development | `content/modules/L6-05-spec-driven.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.5: "Spec-driven development" (file: content/modules/L6-05-spec-driven.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.6** | AI for system design & architecture | `content/modules/L6-06-system-design.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.6: "AI for system design & architecture" (file: content/modules/L6-06-system-design.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.7** | Orchestrating a team of coding agents | `content/modules/L6-07-agent-teams.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.7: "Orchestrating a team of coding agents" (file: content/modules/L6-07-agent-teams.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **6.8** | Security of AI-generated code | `content/modules/L6-08-code-security.js` | 🟡 Open | `Please write the complete JavaScript module for Module 6.8: "Security of AI-generated code" (file: content/modules/L6-08-code-security.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 7 — Production & Responsibility
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **7.1** | Evals: measuring AI quality | `content/modules/L7-01-evals.js` | 🟡 Open | `Please write the complete JavaScript module for Module 7.1: "Evals: measuring AI quality" (file: content/modules/L7-01-evals.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **7.2** | Cost, latency & observability | `content/modules/L7-02-cost-latency-observability.js` | 🟡 Open | `Please write the complete JavaScript module for Module 7.2: "Cost, latency & observability" (file: content/modules/L7-02-cost-latency-observability.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **7.3** | AI security: prompt injection, jailbreaks, guardrails | `content/modules/L7-03-ai-security.js` | 🟡 Open | `Please write the complete JavaScript module for Module 7.3: "AI security: prompt injection, jailbreaks, guardrails" (file: content/modules/L7-03-ai-security.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **7.4** | Ethics, copyright, privacy & regulation | `content/modules/L7-04-ethics-regulation.js` | 🟡 Open | `Please write the complete JavaScript module for Module 7.4: "Ethics, copyright, privacy & regulation" (file: content/modules/L7-04-ethics-regulation.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **7.5** | Where it's heading: alignment, AGI, durable skills | `content/modules/L7-05-future.js` | 🟡 Open | `Please write the complete JavaScript module for Module 7.5: "Where it's heading: alignment, AGI, durable skills" (file: content/modules/L7-05-future.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

### Level 8 — Capstone Projects
| ID | Module Title | Target File | Status | Claude Prompt |
|:---|:---|:---|:---|:---|
| **P1** | Project 1 — Personal study assistant over your notes | `content/modules/P1-study-assistant.js` | 🟡 Open | `Please write the complete JavaScript module for Project P1: "Personal study assistant over your notes" (file: content/modules/P1-study-assistant.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **P2** | Project 2 — Vibe-code & deploy your personal website | `content/modules/P2-vibe-website.js` | 🟡 Open | `Please write the complete JavaScript module for Project P2: "Vibe-code & deploy your personal website" (file: content/modules/P2-vibe-website.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **P3** | Project 3 — A tool-using agent connected to MCP | `content/modules/P3-mcp-agent.js` | 🟡 Open | `Please write the complete JavaScript module for Project P3: "A tool-using agent connected to MCP" (file: content/modules/P3-mcp-agent.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |
| **P4** | Project 4 — Spec-driven mini product with evals | `content/modules/P4-spec-product.js` | 🟡 Open | `Please write the complete JavaScript module for Project P4: "Spec-driven mini product with evals" (file: content/modules/P4-spec-product.js) based on ImplementationPlan.md. Follow the exact structure, widgets, diagrams, and 5-question quiz format of content/modules/L1-01-ai-ml-dl-genai.js.` |

---

## 📂 Project Architecture

```
Modern_AI-Era/
├── index.html                   # Pure HTML/JS single-page offline application
├── ImplementationPlan.md        # Full project blueprint, curriculum specs & authoring rules
├── README.md                    # Roadmap, vibe coder guide, and copy-paste prompts
├── LICENSE                      # Dual MIT / CC-BY-SA 4.0 license
├── assets/                      # Stylesheets and core interactive engines (css, js)
├── content/
│   ├── curriculum.js            # Master curriculum manifest
│   ├── resources.js             # Curated links and reading lists
│   ├── glossary/                # Terminology lookup definitions
│   └── modules/                 # Individual lesson files (where contributions go!)
└── .github/                     # Automated CI testing on Pull Requests
```

---

## 📜 License

This project is dual-licensed:
* **Code & Engine:** [MIT License](LICENSE)
* **Curriculum & Educational Content:** [Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)](LICENSE)
