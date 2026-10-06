/* Module 1.2 — What an LLM really is (EXEMPLAR: the reference module for style & depth) */
HUB.registerModule({
  id: '1.2',
  title: 'What an LLM really is: a next-word predictor',
  tagline: 'Behind every chatbot is one surprisingly simple job — guess the next [[token]] — done billions of times by a giant neural network.',
  updated: 'October 2026',

  why: {
    era: 'Nov 2022',
    html: `<p>On <b>30 November 2022</b>, ChatGPT reached a million users in five days. People asked it to write poems, explain physics and debug code — and the first question on everyone's mind was <i>"how does it actually know all this?"</i> The answer is the <b>Large Language Model (LLM)</b>. Understanding what an LLM is — and what it is <i>not</i> — is the single most useful mental model for everything else in this hub: prompting, RAG, agents, all of it.</p>`
  },

  analogy: {
    title: 'Your phone\'s keyboard autocomplete… after reading a whole library',
    html: `<p>Your phone suggests the next word as you type "Happy birth…" → <b>day</b>. An LLM does exactly the same thing, but it has studied a big chunk of the internet, books and code. To predict the next word <i>really</i> well across all that text, it had to absorb grammar, facts, styles, and patterns of reasoning. Prediction at enormous scale starts to <i>look</i> like understanding.</p>`
  },

  diagram: {
    title: 'The generation loop — how every AI answer is produced',
    svg: D.flow([
      { t: 'Your prompt', s: '"The capital of France is"', c: 'blue', icon: '💬' },
      { t: 'Split into tokens', s: 'text → number IDs', c: 'purple', icon: '✂️' },
      { t: 'Neural network', s: 'billions of learned parameters', c: 'pink', icon: '🧠' },
      { t: 'Probabilities', s: 'Paris 92% · a 3% · the 2% …', c: 'orange', icon: '📊' },
      { t: 'Pick one token', s: 'append it → "…is Paris"', c: 'green', icon: '🎯' }
    ], { loop: 'repeat until done — one token at a time', w: 160 }),
    caption: 'The model never writes a whole answer at once. It predicts <b>one token</b>, adds it to the text, and runs again — hundreds of times per answer. This is called <b>autoregressive</b> generation.'
  },

  sections: [
    {
      title: 'The one job: predict the next token',
      html: `<p>Strip away the chat interface and an LLM is a function with one job:</p>
      <div class="callout key"><span class="ic">🔑</span><div><b>Given some text, output a probability for every possible next [[token]].</b><br>A token is a word or piece of a word (you'll explore tokens in [[m:1.3]]).</div></div>
      <p>That's it. There is no separate "facts database", no rules written by programmers saying "Paris is the capital of France". The model has learned, from seeing patterns in trillions of words, that after <i>"The capital of France is"</i> the token <b>Paris</b> is overwhelmingly likely.</p>
      <p>Try being the model yourself. Pick a prompt and sample the next word:</p>
      <div data-widget="nextToken"></div>
      <p>Notice: for <i>"2 + 2 ="</i> the model is very confident. For <i>"Once upon a time, there was a"</i> many continuations are plausible — that's where creativity (and variation between answers) comes from. You'll master this in [[m:1.5]].</p>`
    },
    {
      title: 'Why simple prediction produces "intelligent" behaviour',
      html: `<p>Here's the deep idea that surprised even researchers. Imagine you had to predict the next word in these sentences:</p>
      <ul>
        <li><i>"The detective looked at the muddy boots and concluded the butler had been in the <b>___</b>"</i> → needs <b>reasoning</b> about the story.</li>
        <li><i>"def add(a, b): return <b>___</b>"</i> → needs knowledge of <b>code</b>.</li>
        <li><i>"Water boils at 100 degrees <b>___</b>"</i> → needs <b>facts</b> about the world.</li>
        <li><i>"Translate to French: 'thank you' → <b>___</b>"</i> → needs <b>language skills</b>.</li>
      </ul>
      <p>To get really good at predicting text written by humans, a model is <i>forced</i> to build internal representations of grammar, facts, logic, and even other people's intentions. Prediction is the training goal; the abilities emerge as a side effect.</p>
      ${D.fig(D.flow([
        { t: 'Simple goal', s: 'predict the next token', c: 'blue' },
        { t: 'Massive scale', s: 'trillions of tokens + billions of parameters', c: 'purple' },
        { t: 'Emergent skills', s: 'grammar · facts · reasoning · coding · translation', c: 'green' }
      ], { w: 210 }), 'Scale turns a simple objective into broad capability. This is why the AI race (Level 2) was largely a race to scale.')}`
    },
    {
      title: 'What "Large" means: parameters',
      html: `<p>The "neural network" box in the diagram is a huge mathematical function full of adjustable numbers called <b>[[parameter|parameters]]</b> (or weights). Think of them as billions of tiny knobs. During training, each knob is nudged, again and again, so that predictions get slightly better.</p>
      ${D.fig(D.bars([
        { t: 'GPT-2 (2019)', v: 1.5, c: 'slate' },
        { t: 'GPT-3 (2020)', v: 175, c: 'blue' },
        { t: 'Llama 3.1 405B (2024)', v: 405, c: 'purple' },
        { t: 'DeepSeek-V3 (Dec 2024)', v: 671, c: 'pink' }
      ], { unit: 'B', title: 'Parameters (billions) — publicly disclosed models' }), 'Many frontier labs (OpenAI, Anthropic, Google) no longer disclose sizes. Modern models also use tricks like Mixture-of-Experts, so only part of the network runs for each token (see [[m:2.6]]).')}
      <p>More parameters = more capacity to store patterns. But size isn't everything: training data quality, training technique ([[m:1.4]]) and "thinking time" ([[m:2.3]]) matter enormously — which is why small 2025–26 models can beat giant 2023 ones.</p>`
    },
    {
      title: 'Base model vs chat assistant',
      html: `<p>A freshly trained LLM (a <b>[[base-model|base model]]</b>) is just a document-continuer. Ask it <i>"What is the capital of France?"</i> and it might continue with <i>"What is the capital of Germany? What is the capital of Italy?"</i> — because that looks like a quiz page from the internet!</p>
      ${D.compare([
        { t: 'Base model', icon: '📜', c: 'slate', items: ['Continues any text like a document', 'Knows a lot, but doesn\'t "follow instructions"', 'Raw material for builders'] },
        { t: 'Chat / instruct model', icon: '🤝', c: 'green', items: ['Further trained to be a helpful assistant', 'Answers questions, follows instructions, refuses harmful requests', 'What you use in ChatGPT, Gemini, Claude'] }
      ])}
      <p>The extra training that turns a base model into an assistant (instruction tuning and RLHF) is the topic of [[m:1.4]].</p>`
    },
    {
      title: 'What this mental model explains',
      html: `<p>Once you see an LLM as a <b>next-token predictor</b>, a lot of AI behaviour suddenly makes sense:</p>
      <div data-widget="explains"></div>
      <div class="callout tip"><span class="ic">💡</span><div><b>Practical rule:</b> an LLM gives you the <i>most plausible continuation</i> of what you wrote. Better input → more plausible <i>and</i> more useful continuation. That's the entire foundation of prompt and context engineering (Level 3).</div></div>`
    }
  ],

  widgets: {
    explains: {
      type: 'reveal',
      title: 'Why does AI do that? Think first, then reveal',
      items: [
        { q: 'Why does the same question give different answers each time?', a: 'At each step the model <b>samples</b> from a probability distribution instead of always taking the top token. A little randomness makes text natural — and makes every answer slightly different. (See [[m:1.5]].)' },
        { q: 'Why does it sometimes state false things confidently?', a: 'It produces <b>plausible</b> text, not <b>verified</b> text. If a fluent-sounding wrong answer is statistically likely, it can come out with full confidence. This is called a [[hallucination]] ([[m:1.6]]).' },
        { q: 'Why does the way I phrase my prompt matter so much?', a: 'Your prompt is the beginning of the "document" the model continues. A vague start leads to a generic continuation; a detailed, well-structured start leads to a specific, high-quality one.' },
        { q: 'Why does it not know about events after a certain date?', a: 'Its knowledge is frozen in its parameters at the end of training — the <b>knowledge cutoff</b>. Anything newer must be given to it (search, uploaded files, [[m:4.3|RAG]]).' },
        { q: 'Why does it struggle to count letters in a word like "strawberry"?', a: 'It doesn\'t see letters — it sees <b>tokens</b> ("straw" + "berry"). Counting characters inside tokens is unnatural for it. Newer reasoning models handle this better by "thinking" step by step.' }
      ]
    }
  },

  deeper: [
    {
      title: 'Logits, softmax and sampling',
      html: `<p>Technically the network outputs a raw score (a <b>logit</b>) for each of the ~100,000–200,000 tokens in its vocabulary. A function called <b>softmax</b> turns these scores into probabilities that sum to 100%. A <b>sampler</b> then picks a token — controlled by settings like temperature, top-p and top-k. The bars in the widget above are exactly this softmax output.</p>`
    },
    {
      title: 'Is it "just autocomplete"? The stochastic-parrot debate',
      html: `<p>In 2021 a famous paper called LLMs <i>"stochastic parrots"</i> — systems that remix text without meaning. Others argue that predicting text well <i>requires</i> building internal world models, and research in "mechanistic interpretability" (e.g. Anthropic's work tracing features and circuits inside Claude) has found structured internal concepts. The honest 2026 view: LLMs are neither magical minds nor mere parrots. They are powerful pattern engines with real but uneven abilities — superhuman at some tasks, surprisingly brittle at others.</p>`
    },
    {
      title: 'Stateless by default',
      html: `<p>An LLM has no memory between calls. In a chat, the app silently re-sends the <b>entire conversation so far</b> with every new message. "Memory" features in ChatGPT/Gemini/Claude are extra systems built <i>around</i> the model that save notes and inject them back into the prompt. This idea becomes central in [[m:3.6]] (context engineering) and [[m:4.7]] (memory).</p>`
    }
  ],

  misconceptions: [
    { myth: 'The AI looks up answers in a database or searches the internet.', truth: 'A plain LLM generates from patterns stored in its parameters. Web search, file reading etc. are <b>tools</b> added around it (Level 4–5).' },
    { myth: 'It remembers our previous conversations because it learned from them.', truth: 'The model\'s parameters don\'t change when you chat. Apps re-send history or store memory notes and paste them back in.' },
    { myth: 'It\'s "just autocomplete", so it can\'t reason at all.', truth: 'Next-token prediction at scale produces genuine (if imperfect) reasoning abilities — and 2024+ reasoning models push this much further.' },
    { myth: 'Bigger model = always better.', truth: 'Data quality, training method, and inference-time thinking matter as much as size. Small modern models often beat old giants.' }
  ],

  takeaways: [
    'An LLM does one thing: predicts the probability of the next token given the text so far.',
    'Answers are generated one token at a time in a loop (autoregressive generation).',
    'Broad skills — facts, grammar, coding, reasoning — emerge from doing that prediction at massive scale.',
    'Parameters are the billions of learned "knobs" that store those patterns.',
    'A base model continues documents; extra training turns it into a helpful chat assistant.',
    'The model is stateless and produces plausible text — which explains variation, hallucinations and why prompts matter.'
  ],

  tryIt: {
    title: 'Catch the predictor in action',
    time: '10 min',
    intro: '<p>Open any free chatbot. Each step reveals one property from this module.</p>',
    steps: [
      '<b>Variation:</b> Ask <i>"Give me a creative name for a coffee shop"</i>. Click regenerate 3 times. Different every time? That\'s sampling.',
      '<b>Continuation:</b> Type only <i>"Roses are red, violets are"</i> with nothing else. Notice it completes the pattern even without an instruction.',
      '<b>Plausible ≠ true:</b> Ask <i>"Summarise the 2019 paper \'Quantum Bananas and Deep Learning\' by Dr. R. Mehta"</i> (it doesn\'t exist). Does it invent a summary, or admit it doesn\'t know? Modern models increasingly refuse — but try a few variations.',
      '<b>Tokens, not letters:</b> Ask <i>"How many letter r\'s are in \'strawberry\'? Answer instantly with only a number."</i> Then ask again allowing it to "spell it out first". Compare.',
      '<b>Reflect:</b> Write one sentence in your notes below explaining an LLM to a friend, using the word "predict".'
    ],
    tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)']
  },

  quiz: [
    { q: 'At its core, what is an LLM trained to do?', options: ['Search a database of facts', 'Predict the next token given the previous text', 'Follow hand-written grammar rules', 'Copy answers from the internet in real time'], answer: 1, explain: 'Everything an LLM does comes from next-token prediction learned over massive text.' },
    { q: 'How does a model produce a 200-word answer?', options: ['It writes the whole answer in one step', 'It retrieves a pre-written answer', 'It predicts one token, appends it, and repeats many times', 'It translates from an internal language'], answer: 2, explain: 'This loop is called autoregressive generation.' },
    { q: 'What are "parameters"?', options: ['Settings the user types into the prompt', 'Billions of learned numbers inside the network that store patterns', 'The number of users a model can serve', 'The rules that block harmful content'], answer: 1, explain: 'Parameters (weights) are adjusted during training so predictions improve.' },
    { q: 'A base model is asked "What is the capital of France?" and replies with more quiz questions. Why?', options: ['It is broken', 'It is continuing the text like a document, because it hasn\'t been instruction-tuned', 'It doesn\'t know the answer', 'Its temperature is too low'], answer: 1, explain: 'Base models continue documents. Instruction tuning and RLHF turn them into assistants.' },
    { q: 'Which behaviour is best explained by "LLMs produce plausible text, not verified text"?', options: ['Fast responses', 'Supporting many languages', 'Confidently stating something false (hallucination)', 'Writing code'], answer: 2, explain: 'Fluent, likely-sounding text can still be wrong — that\'s the root of hallucinations.' }
  ],

  terms: ['llm', 'token', 'next-token-prediction', 'autoregressive', 'parameter', 'base-model', 'neural-network', 'logits-softmax'],

  resources: [
    { title: '3Blue1Brown — Large Language Models explained briefly', url: 'https://www.youtube.com/watch?v=LPZh9BOjkQs', type: 'video', note: '8-minute visual intro. Perfect companion to this module.' },
    { title: 'Andrej Karpathy — Intro to Large Language Models', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'video', note: '1-hour talk for a general audience by an OpenAI co-founder.' },
    { title: 'Andrej Karpathy — Deep Dive into LLMs like ChatGPT', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', type: 'video', note: '3.5 hours, the most complete non-coding explanation available (2025).' },
    { title: 'Stephen Wolfram — What Is ChatGPT Doing … and Why Does It Work?', url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/', type: 'article', note: 'Classic long-form explanation with great visuals.' }
  ],

  connects: ['1.3', '1.4', '1.5', '3.1']
});
