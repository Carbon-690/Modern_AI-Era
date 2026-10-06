/* Module 0.1 — The Big Map: what changed from 2022 to 2026 */
HUB.registerModule({
  id: '0.1',
  title: 'The Big Map: what changed from 2022 to 2026',
  tagline: 'Four years, five eras, one pattern: each new AI ability created a new skill. This module gives you the map. The rest of the hub teaches the skills.',
  updated: 'October 2026',

  why: {
    era: 'Nov 2022 → Oct 2026',
    html: `<p>If you stopped following technology in late 2022, you came back to a different world. Classmates "talk" to AI to study. Developers ship apps that AI agents wrote. Job posts ask for "prompt", "RAG" and "agent" skills that did not exist four years ago. It feels like a pile of buzzwords. Underneath, though, there is one clear story: <b>every time AI gained a new ability, people had to learn a new skill to use it well.</b> This module shows you that story, so every later module has a place on your map.</p>`
  },

  analogy: {
    title: 'Coming home to a city that rebuilt its roads',
    html: `<p>Imagine you left your city for four years. When you return there are metro lines, flyovers and a new app for every bus. You don't need the construction history of every flyover. You need <b>a map</b>: what exists now, what connects to what, and which routes get you where you want to go. This module is that map. It tells you which "lines" exist (chat, data, reasoning, agents, AI-built software) and which skill each one needs.</p>`
  },

  diagram: {
    title: 'The five eras of modern AI (as skills, not history)',
    svg: D.timeline([
      { date: 'Nov 2022', t: 'ChatGPT launches', s: 'AI chat for everyone', c: 'blue' },
      { date: 'Mar 2023', t: 'GPT-4 & rivals', s: 'Claude, Bard, Llama arrive', c: 'purple' },
      { date: '2023–24', t: 'Your data + tools', s: 'RAG, function calling', c: 'cyan' },
      { date: 'Sep 2024', t: 'Reasoning models', s: 'AI that thinks first', c: 'pink' },
      { date: 'Nov 2024', t: 'MCP standard', s: 'one plug for all tools', c: 'orange' },
      { date: '2025', t: 'AI writes software', s: 'vibe coding, coding agents', c: 'green' },
      { date: '2026', t: 'AI as a team', s: 'multi-agent, skills, harnesses', c: 'yellow' }
    ], { colW: 150 }),
    caption: 'Read it left to right as a chain of <b>problem → new ability → new skill</b>. Each dot is a turning point that made a new skill worth learning. Each skill has its own module in this hub.'
  },

  sections: [
    {
      title: 'The pattern: every new ability created a new skill',
      html: `<p>On <b>30 November 2022</b> OpenAI released ChatGPT, a free chat app built on a [[llm|large language model]]. This was the [[chatgpt-moment|ChatGPT moment]]. Within weeks millions of people were using it, and the [[ai-race|AI race]] began: [[frontier-lab|frontier labs]] such as OpenAI, Google, Anthropic and Meta began shipping better models every few months.</p>
      <p>Each wave fixed a weakness of the one before. Each fix also asked something new of <i>you</i>, the user:</p>
      <div data-widget="eraStepper"></div>
      <div class="callout key"><span class="ic">🔑</span><div><b>The big idea of this hub:</b> the eras are not history to memorise. Each one is a <b>skill</b> you can learn. Prompting, giving AI context, connecting tools, directing agents and building software with AI all stack on top of each other.</div></div>`
    },
    {
      title: 'The real shift: from asking AI to delegating to AI',
      html: `<p>The single most important change from 2022 to 2026 is <b>how much work the AI does on its own</b>. In 2022 you asked a question and got a paragraph back. In 2026 you can hand an agent a goal, such as "fix this bug and open a pull request" or "research these five companies and write a report". It plans, uses tools and works for minutes or hours before coming back.</p>
      ${D.fig(D.spectrum('You do the work, AI answers', 'AI does the work, you supervise', [
        { t: 'Chat Q&A', s: '2022', pos: 0.05, c: 'blue' },
        { t: 'Chat + files & search', s: '2023', pos: 0.28, c: 'cyan' },
        { t: 'Reasoning models', s: '2024', pos: 0.5, c: 'pink' },
        { t: 'Coding agents', s: '2025', pos: 0.73, c: 'green' },
        { t: 'Agent teams', s: '2026', pos: 0.95, c: 'yellow' }
      ], { id: 'autonomy' }), 'Autonomy keeps rising. Your role moves from <b>writer</b> to <b>editor</b> to <b>manager</b> of AI work.')}
      <p>This is why people now talk about [[agentic-ai|agentic AI]]. As autonomy rises, the skill that matters most also changes:</p>
      <table>
        <tr><th>When AI…</th><th>…your key skill is</th><th>Where you learn it</th></tr>
        <tr><td>answers questions</td><td>asking clearly (prompting)</td><td>[[m:3.1]], [[m:3.2]]</td></tr>
        <tr><td>works with your documents</td><td>choosing what it sees (context)</td><td>[[m:3.6]], [[m:4.3]]</td></tr>
        <tr><td>thinks through hard problems</td><td>setting goals and checking reasoning</td><td>[[m:2.3]], [[m:3.5]]</td></tr>
        <tr><td>uses tools and acts</td><td>connecting tools safely</td><td>[[m:4.2]], [[m:4.6]]</td></tr>
        <tr><td>works for hours on its own</td><td>specifying, supervising, verifying</td><td>[[m:5.1]], [[m:6.5]], [[m:7.1]]</td></tr>
      </table>`
    },
    {
      title: 'The skill stack you will build',
      html: `<p>The hub turns the eras into a stack of skills. Each layer rests on the one below it. You can't direct an agent well if you don't understand why a model gets things wrong.</p>
      ${D.fig(D.layers([
        { t: 'Ship safely', s: 'evals, cost, security, ethics (Level 7)', c: 'red', icon: '🛡️' },
        { t: 'Build software', s: 'vibe coding, coding agents, specs (Level 6)', c: 'green', icon: '🏗️' },
        { t: 'Delegate', s: 'agents, harnesses, skills, multi-agent (Level 5)', c: 'yellow', icon: '🤖' },
        { t: 'Connect', s: 'APIs, tools, RAG, MCP, memory (Level 4)', c: 'orange', icon: '🔌' },
        { t: 'Communicate', s: 'prompt and context engineering (Level 3)', c: 'pink', icon: '💬' },
        { t: 'Choose', s: 'which model for which job (Level 2)', c: 'purple', icon: '🧭' },
        { t: 'Understand', s: 'how LLMs actually work (Level 1)', c: 'blue', icon: '🧠' }
      ], { brackets: [{ from: 0, to: 3, label: 'Builder skills', c: 'green' }, { from: 4, to: 6, label: 'Power User skills', c: 'blue' }] }), 'Read bottom to top. The Power User track stops at Level 3. The builder tracks continue up the stack.')}
      <p>Notice that the foundation is <b>understanding</b>, not tools. A person who knows that an LLM predicts plausible text (see [[m:1.2]]) can explain almost any odd AI behaviour, even with a product they have never used.</p>`
    },
    {
      title: 'What changes fast, and what lasts',
      html: `<p>The [[ai-race|AI race]] means product names, model versions and prices change every few months. That sounds scary for a learner. It is actually good news, because the <b>concepts underneath change slowly</b>.</p>
      ${D.compare([
        { t: 'Changes every few months', icon: '🌪️', c: 'orange', items: ['Model names and version numbers', 'Which model tops the leaderboard', 'Prices per token', 'App features and buttons', 'The "hottest" tool of the month'] },
        { t: 'Lasts for years', icon: '🪨', c: 'green', items: ['Models predict tokens, so they can [[hallucination|hallucinate]]', 'Good context in gives good output', 'Tools and data make AI useful', 'Agents = model + loop + tools', 'Always verify, measure and secure'] }
      ])}
      <div class="callout tip"><span class="ic">💡</span><div><b>How this hub handles change:</b> every module teaches the lasting concept first and names current tools only as examples ("e.g."). When a new model appears next month, you'll know exactly where it fits on your map.</div></div>`
    },
    {
      title: 'Test your map: which era does it belong to?',
      html: `<p>Sort each development into the era whose problem it solved. Don't worry about exact dates. Focus on <i>what problem it fixed</i>.</p>
      <div data-widget="eraSort"></div>
      <p>If you could place most of these, you already have the backbone of the whole hub in your head.</p>`
    },
    {
      title: 'Then vs now: what a good AI user does in 2026',
      html: `<p>Here is how everyday AI use changed. Flip each card to see the 2026 version.</p>
      <div data-widget="thenNow"></div>
      <div class="callout example"><span class="ic">📝</span><div><b>Example: preparing for an exam.</b> In 2022 you might ask a chatbot to explain a topic and hope it was right. In 2026 a good user uploads the official syllabus and their own notes, asks a reasoning model to build a study plan grounded in those files, has it quiz them with [[m:3.2|few-shot]] examples of past questions, and checks key facts against the cited sources. Same AI family, very different results. The difference is <b>skill</b>.</div></div>`
    }
  ],

  widgets: {
    eraStepper: {
      type: 'stepper',
      title: 'Five eras: problem → new ability → skill you need',
      steps: [
        {
          title: '2022–23 · Chatbots → prompt engineering',
          html: `<p>ChatGPT made AI conversational, but answers were only as good as the question. People discovered that <b>how you ask</b> (role, context, examples, format) changes results dramatically. GPT-4 (March 2023) and rivals such as Claude, Bard (now Gemini) and Meta's open Llama models raised the ceiling.</p><p>Skill born: <b>prompt engineering</b> → <a href="#/m/3.1">3.1</a>, <a href="#/m/3.2">3.2</a>.</p>`,
          diagram: D.flow([{ t: 'Problem', s: 'vague answers', c: 'red' }, { t: 'New ability', s: 'chat with an LLM', c: 'blue' }, { t: 'Skill', s: 'prompting', c: 'green' }], { w: 170 })
        },
        {
          title: '2023–24 · Hallucination & private data → RAG and tools',
          html: `<p>Models confidently invented facts (hallucinations), knew nothing after their training date, and had never seen <i>your</i> documents. Builders responded by feeding the model relevant documents at question time (<b>RAG</b>) and letting it call tools such as search, calculators and databases (<b>function calling</b>, mid-2023).</p><p>Skills born: <b>RAG, embeddings, tool use</b> → <a href="#/m/1.8">1.8</a>, <a href="#/m/4.2">4.2</a>, <a href="#/m/4.3">4.3</a>.</p>`,
          diagram: D.flow([{ t: 'Problem', s: 'made-up facts, no private data', c: 'red' }, { t: 'New ability', s: 'retrieve + call tools', c: 'cyan' }, { t: 'Skill', s: 'RAG & tool use', c: 'green' }], { w: 170 })
        },
        {
          title: '2024 · Models that see, hear, think and act',
          html: `<p>Models became <b>multimodal</b>, handling images, voice and real-time conversation (e.g. GPT-4o, May 2024). In September 2024 OpenAI's o1 introduced <b>reasoning models</b> that "think" before answering, trading time for accuracy on hard problems. In November 2024 Anthropic released the <b>Model Context Protocol (MCP)</b>, a shared standard for plugging tools and data into any AI app.</p><p>Skills born: <b>choosing models, prompting reasoning models, connecting tools</b> → <a href="#/m/2.2">2.2</a>, <a href="#/m/2.3">2.3</a>, <a href="#/m/4.6">4.6</a>.</p>`,
          diagram: D.flow([{ t: 'Problem', s: 'shallow answers, text only', c: 'red' }, { t: 'New ability', s: 'multimodal + reasoning', c: 'pink' }, { t: 'Skill', s: 'model choice', c: 'green' }], { w: 170 })
        },
        {
          title: '2025 · AI writes software',
          html: `<p>In February 2025 Andrej Karpathy coined <b>"vibe coding"</b>: describing what you want and letting AI write the code. Coding agents that work in your terminal or editor (e.g. Claude Code, OpenAI Codex, Gemini CLI, Cursor) could now edit whole projects. Open-weight reasoning models such as DeepSeek-R1 (January 2025) showed that frontier ability was no longer only in closed labs. As agents grew, <b>context engineering</b>, deciding exactly what goes into the model's window, became a named skill.</p><p>Skills born: <b>vibe coding, working with coding agents, context engineering</b> → <a href="#/m/3.6">3.6</a>, <a href="#/m/6.2">6.2</a>, <a href="#/m/6.4">6.4</a>.</p>`,
          diagram: D.flow([{ t: 'Problem', s: 'software is slow to build', c: 'red' }, { t: 'New ability', s: 'agents edit code', c: 'green' }, { t: 'Skill', s: 'directing agents', c: 'green' }], { w: 170 })
        },
        {
          title: '2026 · AI as a team',
          html: `<p>The focus has moved from one chat to <b>systems of agents</b>. Long-running agents work for hours. Orchestrators hand work to subagents. Agents talk to each other through open standards (e.g. MCP for tools, A2A for agent-to-agent). Reusable <b>Skills</b> and <code>AGENTS.md</code> files give them know-how. The model is now one part. The <b>harness</b> around it (tools, memory, guardrails, loops) decides how well it works, and <b>specs</b> act as contracts for what agents should build.</p><p>Skills born: <b>harness and loop engineering, multi-agent orchestration, spec-driven development</b> → <a href="#/m/5.3">5.3</a>, <a href="#/m/5.5">5.5</a>, <a href="#/m/5.6">5.6</a>, <a href="#/m/6.5">6.5</a>.</p>`,
          diagram: D.flow([{ t: 'Problem', s: 'one agent can\'t do it all', c: 'red' }, { t: 'New ability', s: 'agent teams + standards', c: 'yellow' }, { t: 'Skill', s: 'orchestration', c: 'green' }], { w: 170 })
        }
      ]
    },
    eraSort: {
      type: 'classify',
      title: 'Which era\'s problem did this solve?',
      buckets: ['2022–23 Chatbots', '2023–24 Data & tools', '2024 Think & see', '2025–26 Agents & AI-built software'],
      items: [
        { t: 'Learning to write a clear role + task + format prompt', bucket: 0, why: 'The first skill people needed once chatbots arrived: asking well.' },
        { t: 'Letting the AI search your company PDFs before answering', bucket: 1, why: 'That is RAG, the fix for hallucinations and missing private data.' },
        { t: 'A model that pauses to "think" before solving a maths problem', bucket: 2, why: 'Reasoning models (from September 2024) spend extra compute thinking first.' },
        { t: 'Talking to an AI by voice in real time and showing it your camera', bucket: 2, why: 'Real-time multimodal AI arrived in 2024.' },
        { t: 'Describing an app in plain English and letting an agent build it', bucket: 3, why: 'Vibe coding and coding agents defined 2025.' },
        { t: 'Letting the AI call a weather API or a calculator', bucket: 1, why: 'Function calling (mid-2023) gave models "hands".' },
        { t: 'An orchestrator agent splitting a project among several subagents', bucket: 3, why: 'Multi-agent systems are the 2026 frontier.' },
        { t: 'Adding "Let\'s think step by step" to get better answers', bucket: 0, why: 'A classic early prompting trick, before models did this on their own.' }
      ]
    },
    thenNow: {
      type: 'flipcards',
      title: 'Then (2022) → Now (2026)',
      cards: [
        { front: '<b>2022:</b> Type a question, read the answer, hope it\'s right.', back: '<b>2026:</b> Give context (files, goals, examples), pick the right model, ask for sources, verify key claims.' },
        { front: '<b>2022:</b> AI can\'t see anything after its training date.', back: '<b>2026:</b> Assistants search the web, read your documents and connect to your apps through tools and MCP.' },
        { front: '<b>2022:</b> AI helps you write a function, one snippet at a time.', back: '<b>2026:</b> Coding agents plan, edit many files, run tests and open pull requests while you review.' },
        { front: '<b>2022:</b> One chatbot, one conversation.', back: '<b>2026:</b> Teams of agents with skills, memory and guardrails, working for hours toward a goal.' }
      ]
    }
  },

  deeper: [
    {
      title: 'Why did it move so fast?',
      html: `<p>Three forces fed each other. <b>Scale:</b> labs found that bigger models trained on more data and compute got reliably better, so they invested heavily in chips and data centres. <b>Competition:</b> once ChatGPT proved the demand, every major tech company and many start-ups joined the [[ai-race|AI race]], and open-weight releases (e.g. Meta's Llama, Mistral, DeepSeek, Qwen) pushed closed labs to move faster. <b>New axes of progress:</b> when simple scaling became expensive, labs found other levers, such as better training data, reinforcement learning, reasoning at answer time and cheaper architectures (see [[m:2.3]] and [[m:2.6]]).</p>`
    },
    {
      title: 'A survival guide for a field that changes monthly',
      html: `<p>When you meet a new AI term, ask three questions: <b>(1) What problem does it solve?</b> <b>(2) Which layer of the skill stack is it on?</b> (model, prompt/context, tools/data, agent, software, production) <b>(3) Is it a concept or a product?</b> Concepts (RAG, agents, MCP) last. Products (a specific app or model version) get replaced. Yearly reviews like Simon Willison's "things we learned about LLMs" posts and the Stanford AI Index are good ways to refresh your map once a year without drowning in daily news.</p>`
    },
    {
      title: 'Standards: why 2024–26 felt like "AI plumbing" season',
      html: `<p>Early AI apps each invented their own way to connect tools. As agents spread, the industry converged on shared standards so that work could be reused: <b>MCP</b> (tools and data for models, from Anthropic, November 2024), <b>A2A</b> (agent-to-agent communication, from Google, April 2025), and conventions such as <code>AGENTS.md</code> and Agent Skills (folders of instructions an agent loads when needed). In December 2025 several of these were placed under neutral, open governance. For you this means one skill (e.g. writing an MCP server or a Skill) now works across many AI products. You'll meet them in Levels 4 and 5.</p>`
    }
  ],

  misconceptions: [
    { myth: 'I\'m four years behind, so I have to catch up on four years of news.', truth: 'You need the <b>concepts</b> and <b>skills</b>, not the news. About 20–40 hours of focused learning gets you to a strong level, because most headlines were variations on a few core ideas.' },
    { myth: 'AI tools change so fast that anything I learn will be outdated in months.', truth: 'Product names change. The concepts (prediction, context, tools, agents, verification) have held since 2022–23 and build on each other.' },
    { myth: 'Modern AI is a different technology from the 2022 ChatGPT.', truth: 'Underneath it is still a large language model predicting tokens. What changed is what we build <i>around</i> it: reasoning, tools, memory, agents and harnesses.' },
    { myth: 'Agents mean I won\'t need any skills; the AI does everything.', truth: 'More autonomy makes <b>specifying, supervising and verifying</b> more important. A vague goal given to an agent produces a lot of confident, wrong work quickly.' }
  ],

  takeaways: [
    'Since the ChatGPT moment (30 Nov 2022), each new AI ability created a new skill worth learning.',
    'Five eras: chatbots → data & tools → reasoning & multimodal → AI writes software → AI as a team.',
    'The big shift is from asking AI to delegating to AI. Your role moves from writer to editor to manager.',
    'Skills stack: understand → choose → communicate → connect → delegate → build → ship safely.',
    'Product names change monthly. Concepts last. Learn the concept, treat tools as examples.',
    'For any new term, ask: what problem does it solve, and which layer of the stack is it on?'
  ],

  tryIt: {
    title: 'See four years of progress in ten minutes',
    time: '10 min',
    intro: '<p>Open any free AI assistant. You will experience several eras in one sitting.</p>',
    steps: [
      '<b>Era 1, chat:</b> Ask <i>"Explain what a large language model is in 3 sentences."</i> Then ask it to explain again <i>"for a 12-year-old, with an analogy."</i> Notice how the way you ask changes the answer.',
      '<b>Era 2, data and tools:</b> Turn on web search (or ask about yesterday\'s news). Ask a question about something recent and check whether it cites sources. Compare with an answer given without search.',
      '<b>Era 3, reasoning and multimodal:</b> If your app offers a "thinking" or "reasoning" mode, give it a tricky puzzle and watch it think first. Or upload a photo of handwritten notes and ask for a summary.',
      '<b>Era 4–5, agents:</b> Ask <i>"Plan a 2-week study schedule to learn AI fundamentals, then turn it into a checklist table."</i> Notice how it breaks a goal into steps, the seed of agent behaviour.',
      '<b>Reflect:</b> In your notes below, write which era felt most useful to you today, and which skill from the stack you most want to build.'
    ],
    tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)', 'Google AI Studio (free)']
  },

  quiz: [
    { q: 'What is the main lesson of the five-era map?', options: ['You must memorise every model release date', 'Each new AI ability created a new skill, and the skills stack on each other', 'Only the newest era matters, so skip the basics', 'AI progress has stopped since 2024'], answer: 1, explain: 'The hub treats each era as a skill. Later skills (agents) depend on earlier ones (prompting, context, tools).' },
    { q: 'A company wants its chatbot to answer from its own internal policy PDFs without making things up. Which era\'s solution fits best?', options: ['Prompt engineering alone', 'Bigger model', 'Retrieval of relevant documents at question time (RAG)', 'Raising the temperature'], answer: 2, explain: 'RAG (2023–24) was invented to fix hallucinations and the lack of private data.' },
    { q: 'What best describes the shift from 2022 to 2026?', options: ['From asking AI questions to delegating whole tasks to AI and supervising it', 'From text AI to image-only AI', 'From open models to only closed models', 'From paid tools to free tools'], answer: 0, explain: 'Autonomy keeps rising. Your role moves from writer to editor to manager.' },
    { q: 'You read about a brand-new AI product next month. What is the most useful first question?', options: ['What is its version number?', 'Who is the CEO?', 'Is it the most popular app right now?', 'What problem does it solve, and which layer of the skill stack is it on?'], answer: 3, explain: 'Placing new things on your map by problem and layer keeps you current without chasing every headline.' },
    { q: 'Why does this hub start with "Understand how LLMs work" before agents and coding?', options: ['Because it is historically first', 'Because understanding why models behave as they do makes every higher skill (prompting, tools, agents) work better', 'Because agents are not important', 'Because coding is too hard for beginners'], answer: 1, explain: 'The skill stack builds bottom-up. Understanding explains hallucinations, variation and why context matters.' }
  ],

  terms: ['chatgpt-moment', 'frontier-lab', 'ai-race', 'ai-assistant', 'agentic-ai', 'llm', 'hallucination'],

  resources: [
    { title: 'OpenAI — Introducing ChatGPT (Nov 2022)', url: 'https://openai.com/index/chatgpt/', type: 'article', note: 'The original launch post that started the era.' },
    { title: 'Simon Willison — Things we learned about LLMs in 2024', url: 'https://simonwillison.net/2024/Dec/31/llms-in-2024/', type: 'article', note: 'A clear, honest review of a whole year of AI progress.' },
    { title: 'Simon Willison — 2025: The year in LLMs', url: 'https://simonwillison.net/2025/Dec/31/the-year-in-llms/', type: 'article', note: 'The follow-up review covering agents, coding tools and reasoning in 2025.' },
    { title: 'Stanford HAI — AI Index Report', url: 'https://hai.stanford.edu/ai-index', type: 'paper', note: 'The yearly data-driven report on AI progress, cost and adoption.' },
    { title: 'Andrej Karpathy — Intro to Large Language Models', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'video', note: 'A 1-hour talk for a general audience. A great base for Level 1.' }
  ],

  connects: ['0.2', '1.1', '1.2', '2.1', '3.6', '5.1', '6.2']
});
