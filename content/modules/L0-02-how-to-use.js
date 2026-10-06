/* Module 0.2 — How to use this hub (tracks, levels, practice) */
(function () {
  // Build track tabs from the curriculum so they never drift out of sync.
  const C = window.CURRICULUM;
  const byId = Object.fromEntries(C.modules.map((m) => [m.id, m]));
  const trackTabs = C.tracks.map((t) => {
    const mins = t.modules.reduce((a, id) => a + (byId[id] ? byId[id].minutes : 0), 0);
    return {
      label: t.title,
      html: `<p>${t.desc}</p>
        <p><b>${t.modules.length} modules</b> · about <b>${Math.round(mins / 60)} hours</b> of reading, plus practice time.</p>
        <ol>${t.modules.map((id) => `<li><a href="#/m/${id}">${id} ${byId[id] ? byId[id].title : ''}</a></li>`).join('')}</ol>`
    };
  });

  HUB.registerModule({
    id: '0.2',
    title: 'How to use this hub (tracks, levels, practice)',
    tagline: 'A map is only useful if you know how to read it. Pick a track, learn the rhythm of a module, and set up a practice habit that makes it stick.',
    updated: 'October 2026',

    why: {
      era: 'October 2026',
      html: `<p>AI is now a huge field that changes every month. Most people try to catch up by watching random videos and reading headlines. They end up with a pile of buzzwords and no working skill. This hub exists to fix that: a <b>structured path</b> from zero to building with AI, where every module is built around a picture, a hands-on exercise and a quick check. Spend 8 minutes here to learn how to get the most out of the next 40 hours.</p>`
    },

    analogy: {
      title: 'A metro map, not a textbook',
      html: `<p>Don't read this hub cover to cover like a textbook. Use it like a <b>metro map</b>. The <b>levels</b> are zones, running from the city centre (basics) outwards (advanced). The <b>tracks</b> are metro lines that take you straight to your destination, such as "Power User" or "AI Builder". Some <b>stations</b> (modules) sit on every line, because everyone needs them. You can ride one line end to end, or change lines when your goals change.</p>`
    },

    diagram: {
      title: 'The learning loop: how to study each module',
      svg: D.cycle([
        { t: 'Why + analogy', s: 'what problem, what picture', c: 'blue', icon: '💡' },
        { t: 'Study the diagram', s: 'the signature visual', c: 'purple', icon: '📊' },
        { t: 'Read & interact', s: 'sections + widgets', c: 'pink', icon: '🖐️' },
        { t: 'Try it on real AI', s: 'free tools, 10–20 min', c: 'orange', icon: '🛠' },
        { t: 'Quick check', s: 'quiz, instant feedback', c: 'green', icon: '❓' },
        { t: 'Teach it back', s: 'write in My notes', c: 'cyan', icon: '✍' }
      ], { center: { t: 'One module', s: 'about 15–25 min' }, w: 160 }),
      caption: 'Every module follows the same loop. The two steps people skip, <b>Try it</b> and <b>Teach it back</b>, are the ones that turn reading into skill.'
    },

    sections: [
      {
        title: 'How the hub is organised',
        html: `<p>The hub has <b>9 levels</b>. The early ones need no coding at all. Code first appears in Level 4, and every line is explained.</p>
        ${D.fig(D.layers([
          { t: 'L0 Orientation', s: 'the big map and this guide', c: 'slate' },
          { t: 'L1 How AI thinks', s: 'LLMs, tokens, training, embeddings (no code)', c: 'blue' },
          { t: 'L2 Model landscape', s: 'labs, multimodal, reasoning, open vs closed', c: 'purple' },
          { t: 'L3 Talking to AI', s: 'prompt and context engineering', c: 'pink' },
          { t: 'L4 Building blocks', s: 'APIs, tools, RAG, MCP, memory', c: 'orange' },
          { t: 'L5 Agents', s: 'loops, harnesses, skills, multi-agent', c: 'yellow' },
          { t: 'L6 Building software', s: 'vibe coding, coding agents, specs', c: 'green' },
          { t: 'L7 Production', s: 'evals, cost, security, ethics', c: 'red' },
          { t: 'L8 Capstones', s: 'four guided projects', c: 'cyan' }
        ], { h: 46, gap: 8, brackets: [{ from: 1, to: 3, label: 'Good AI user', c: 'blue' }, { from: 4, to: 7, label: 'AI builder', c: 'green' }, { from: 8, to: 8, label: 'Prove it', c: 'cyan' }] }), 'Difficulty rises as you go down the list. Each module is tagged 🟢 beginner, 🟡 intermediate or 🔴 advanced.')}
        <p>The order matters. Prerequisites are listed on every module, and the <b>Concept Map</b> (in the sidebar) shows which ideas depend on which.</p>`
      },
      {
        title: 'Choose your track',
        html: `<p>You don't have to do all 56 modules. A [[learning-track|learning track]] is a hand-picked line through the hub for one goal. Answer two quick questions:</p>
        <div data-widget="trackPick"></div>
        <p>Here is what each track contains. Click a tab to see its stations:</p>
        <div data-widget="trackTabs"></div>
        <div class="callout tip"><span class="ic">💡</span><div><b>Tracks overlap on purpose.</b> [[m:0.1]], [[m:1.2]] and [[m:1.3]] appear in almost every track because everything else rests on them. If you're unsure, start with the Power User track. It is the shortest and makes every later track easier.</div></div>`
      },
      {
        title: 'Anatomy of a module',
        html: `<p>Every module has the same parts, in the same order, so you always know where you are:</p>
        ${D.fig(D.layers([
          { t: '💡 Why was this invented?', s: 'the problem that made this skill necessary' },
          { t: '🧠 Mental model', s: 'an everyday analogy to hang the idea on' },
          { t: '📊 The diagram', s: 'the one picture to remember' },
          { t: '📖 Core sections', s: 'plain-language teaching + interactive widgets' },
          { t: '🔍 Go deeper', s: 'optional technical detail (skip on first pass)' },
          { t: '⚠️ Misconceptions', s: 'common wrong ideas, corrected' },
          { t: '🛠 Try it', s: 'a hands-on exercise with free AI tools' },
          { t: '❓ Quick check', s: '5 scenario questions with explanations' },
          { t: '🏷 Terms · 🔗 Resources · ➡ Connects', s: 'glossary, best external material, next modules' }
        ], { h: 42, gap: 6, highlight: 6, brackets: [{ from: 0, to: 3, label: 'Must do', c: 'green' }, { from: 4, to: 5, label: 'Optional', c: 'slate' }, { from: 6, to: 7, label: 'Make it stick', c: 'orange' }] }), 'On a first pass, do the green and orange parts. Come back for "Go deeper" when a later module needs it.')}
        <p>Small conventions you'll see everywhere:</p>
        <ul>
          <li><b>Dotted-underlined words</b> are glossary terms. Hover (or tap) for a definition, e.g. [[llm]] or [[token]].</li>
          <li><b>Module links</b> like [[m:1.2]] jump to another module.</li>
          <li><b>Callouts</b>: 🔑 key idea, 💡 tip, ⚠️ warning, 📝 example.</li>
          <li>An <b>"Accurate as of October 2026"</b> stamp. Tool names change. Concepts are what you're here for.</li>
        </ul>`
      },
      {
        title: 'How to practise so it sticks',
        html: `<p>Reading about AI is like reading about swimming. The skill only appears when you get in the water. Three habits make the biggest difference:</p>
        ${D.compare([
          { t: 'Use it today', icon: '🛠', c: 'orange', items: ['Do every <b>Try it</b> with a real AI tool', 'Apply one idea to your own work or study the same day', 'Free tiers are enough for Levels 0–3'] },
          { t: 'Pull, don\'t re-read', icon: '🧠', c: 'purple', items: ['Answer the quiz <i>before</i> re-reading', 'Explain the diagram aloud from memory', 'This is [[active-recall|active recall]], one of the best-proven study methods'] },
          { t: 'Come back later', icon: '🔁', c: 'green', items: ['Retake a quiz after 1 day, then 1 week', 'Skim your notes before starting a new level', 'This is [[spaced-repetition|spaced repetition]]'] }
        ])}
        <p><b>Use AI to learn AI.</b> Your [[ai-assistant|AI assistant]] is a patient tutor. Try prompts like:</p>
        <ul>
          <li><i>"I just learned that LLMs predict the next token. Quiz me with 5 questions, one at a time, and correct me."</i></li>
          <li><i>"Explain RAG using an analogy from exam preparation."</i></li>
          <li><i>"Here is my one-paragraph summary of this module. What did I get wrong or leave out?"</i></li>
        </ul>
        <div class="callout warn"><span class="ic">⚠️</span><div><b>Trust, but verify.</b> AI tutors can [[hallucination|hallucinate]]. When an AI explanation disagrees with this hub or an official doc, treat it as a cue to dig deeper, not as the final word. Learning to spot this is itself a core skill (see [[m:1.6]]).</div></div>`
      },
      {
        title: 'Your toolkit and the site\'s features',
        html: `<p>You need nothing beyond a browser and free AI accounts. Recommended free tools:</p>
        <table>
          <tr><th>Tool</th><th>Good for</th><th>Needed from</th></tr>
          <tr><td>ChatGPT, Gemini or Claude (free tiers)</td><td>All "Try it" exercises in Levels 0–3</td><td>Level 0</td></tr>
          <tr><td>Google AI Studio</td><td>Trying models, settings like temperature, and getting a free API key</td><td>Level 1 / 4</td></tr>
          <tr><td>Ollama (optional)</td><td>Running open models on your own computer</td><td>Level 2</td></tr>
          <tr><td>A code editor + an AI coding agent</td><td>Building software with AI</td><td>Level 6</td></tr>
        </table>
        <p>Built into this site:</p>
        <div data-widget="features"></div>
        <div class="callout key"><span class="ic">🔑</span><div>Your progress, quiz scores and notes are saved <b>in this browser only</b> (local storage). Nothing is uploaded. Clearing browser data or switching browsers starts you fresh.</div></div>`
      },
      {
        title: 'A realistic study plan',
        html: `<p>The modules add up to about <b>24 hours of reading</b>. With exercises and projects, plan for <b>40–60 hours</b> for the whole hub. You don't need all of it at once:</p>
        <table>
          <tr><th>Your pace</th><th>Power User track</th><th>A builder track</th><th>Whole hub</th></tr>
          <tr><td>30 min a day</td><td>about 3 weeks</td><td>about 6 weeks</td><td>3–4 months</td></tr>
          <tr><td>1 hour a day</td><td>about 1.5 weeks</td><td>about 3 weeks</td><td>about 2 months</td></tr>
          <tr><td>Weekends only (4 h)</td><td>about 3 weekends</td><td>about 6 weekends</td><td>3–4 months</td></tr>
        </table>
        <div class="callout example"><span class="ic">📝</span><div><b>A good first week:</b> Day 1, [[m:0.1]] + this module. Days 2–5, one Level 1 module per day, doing every "Try it". Day 6, retake all quizzes without notes. Day 7, rest, or explain "how an LLM works" to a friend.</div></div>`
      }
    ],

    widgets: {
      trackPick: {
        type: 'decision',
        title: 'Which track should I start with?',
        start: 'goal',
        nodes: {
          goal: {
            q: 'What do you most want from AI in the next few months?',
            hint: 'Pick the closest. You can switch tracks any time.',
            options: [
              { label: 'Use AI brilliantly for study, work and research', next: 'user' },
              { label: 'Build websites and software faster', next: 'code' },
              { label: 'Build AI-powered apps (chatbots over documents, agents)', next: 'product' },
              { label: 'Honestly, not sure yet', next: 'unsure' }
            ]
          },
          code: {
            q: 'Are you comfortable reading a little code if it is explained?',
            options: [
              { label: 'Yes, or I\'m willing to learn', next: 'builder' },
              { label: 'Not yet, I\'d rather avoid code for now', next: 'userFirst' }
            ]
          },
          user: { result: '🧭 Power User track', icon: '🧭', html: '<p>Shortest track (about 17 modules). Focuses on understanding models and mastering prompt and context engineering. No code. Start with <a href="#/m/0.1">0.1</a> → <a href="#/m/1.1">1.1</a> → <a href="#/m/1.2">1.2</a>.</p>' },
          builder: { result: '🛠 AI-assisted Builder track', icon: '🛠', html: '<p>Fundamentals, then straight to agents and coding with AI: vibe coding, coding agents and spec-driven development. Ends with capstones P2 and P4. Start with <a href="#/m/0.1">0.1</a> → <a href="#/m/1.2">1.2</a> → <a href="#/m/1.3">1.3</a>.</p>' },
          product: { result: '🚀 AI Product Builder track', icon: '🚀', html: '<p>APIs, tool calling, RAG, MCP, agents and evals. Ends with capstones P1 and P3. Start with <a href="#/m/1.2">1.2</a> → <a href="#/m/1.8">1.8</a>. If <a href="#/m/1.2">1.2</a> feels new, do Level 1 in order first.</p>' },
          userFirst: { result: '🧭 → 🛠 Power User first, then Builder', icon: '🪜', html: '<p>Do the Power User track first. By the end you\'ll be comfortable enough to move to the Builder track. <a href="#/m/6.2">6.2</a> and <a href="#/m/6.3">6.3</a> show that many apps can now be built with very little hand-written code.</p>' },
          unsure: { result: '📚 Follow the levels in order', icon: '📚', html: '<p>Do Level 0 and Level 1 in order (about 3 hours). By then you\'ll know which goal excites you. Come back to this question afterwards.</p>' }
        }
      },
      trackTabs: { type: 'tabs', title: 'The three tracks', tabs: trackTabs },
      features: {
        type: 'flipcards',
        title: 'Site features (flip each card)',
        cards: [
          { front: '🔎 <b>Search</b>', back: 'Press <kbd>/</kbd> anywhere to search modules and glossary terms. Use arrow keys and <kbd>Enter</kbd> to jump.' },
          { front: '🏷 <b>Glossary</b>', back: 'Every key term with a plain-language definition and a link to the module that teaches it.' },
          { front: '🗺 <b>Concept Map</b>', back: 'A clickable graph of all modules and their prerequisites. Use it to see what to learn before what.' },
          { front: '✓ <b>Progress</b>', back: 'Mark modules complete. Your level and track progress appear on the home dashboard.' },
          { front: '✍ <b>My notes</b>', back: 'Every module has a notes box at the bottom. It saves automatically as you type. Use it for "teach it back".' },
          { front: '🔗 <b>Resources</b>', back: 'The best videos, docs and papers from every module, collected and filterable by type.' }
        ]
      }
    },

    deeper: [
      {
        title: 'Why this format? The learning science behind it',
        html: `<p>The module template follows well-established findings from learning research. <b>Dual coding:</b> pairing words with a diagram helps memory more than words alone, which is why each module centres on one visual. <b>Elaboration:</b> the "why" box and analogy tie new ideas to things you already know. <b>Retrieval practice:</b> quizzes are for learning, not grading, and recalling an answer strengthens memory more than re-reading. <b>Spacing:</b> revisiting topics over days beats cramming. The course "Learning How to Learn" (in the resources) is a friendly introduction to all four.</p>`
      },
      {
        title: 'How to keep your map current after you finish',
        html: `<p>The hub is accurate as of October 2026. To stay current without drowning in news: follow 2–3 high-signal sources (e.g. official lab blogs and a careful independent writer such as Simon Willison), read a yearly review each December or January, and when something new appears, place it on your skill stack from [[m:0.1]] before deciding whether it matters to you.</p>`
      }
    ],

    misconceptions: [
      { myth: 'I have to finish all 56 modules before I can use AI well.', truth: 'The Power User track (about 17 modules) already makes you better than most AI users. Use what you learn from day one.' },
      { myth: 'Reading a module = learning it.', truth: 'Skill comes from the <b>Try it</b> exercise and from recalling ideas without looking. Reading alone fades within days.' },
      { myth: 'I should skip the basics and jump straight to agents.', truth: 'Agents amplify your understanding of prompts, context and model limits. Without the basics you can\'t tell why an agent went wrong.' },
      { myth: 'A low quiz score means I failed.', truth: 'Quizzes are a learning tool. Wrong answers with explanations teach more than easy right answers. Retake them later.' }
    ],

    takeaways: [
      '9 levels from zero to building. Code starts only at Level 4.',
      'Pick a track (Power User, Builder, Product Builder) to focus on what you need. Switch any time.',
      'Every module follows one loop: why → diagram → interact → try it → quick check → teach it back.',
      'Do every "Try it" with a real AI tool. That is where reading turns into skill.',
      'Use active recall and spaced repetition: quiz yourself first, revisit after a day and a week.',
      'Progress and notes stay in your browser. Nothing is uploaded.'
    ],

    tryIt: {
      title: 'Set up your learning base',
      time: '10 min',
      intro: '<p>Get everything ready so that starting each module takes zero effort.</p>',
      steps: [
        'Use the decision widget above to <b>pick your track</b>. Write your choice and your main goal in one sentence in <b>My notes</b> below.',
        'Create (or log in to) at least <b>one free AI assistant</b>, such as ChatGPT, Gemini or Claude, and keep it open in a browser tab next to this hub.',
        'Ask that assistant: <i>"I am starting to learn modern AI from zero. Ask me 3 questions to find out what I already know, then summarise my starting level."</i> Paste its summary into your notes.',
        'Press <kbd>/</kbd> and search for <b>token</b>. Open the glossary entry, then visit the <b>Concept Map</b> and find module 1.2.',
        'Mark this module complete and <b>block 20–30 minutes in your calendar</b> for your next module.'
    ],
      tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)']
    },

    quiz: [
      { q: 'You want to use AI better for study and research, and you never plan to code. Which track fits best?', options: ['AI Product Builder', 'Power User', 'AI-assisted Builder', 'All 56 modules in order'], answer: 1, explain: 'The Power User track covers understanding, model choice and prompt/context engineering with no code.' },
      { q: 'Which two steps of the learning loop most turn reading into real skill?', options: ['Reading the title and tagline', 'Go deeper and resources', 'Try it on a real AI tool and teaching it back from memory', 'Skimming the diagram and moving on'], answer: 2, explain: 'Hands-on practice and active recall are what make knowledge stick.' },
      { q: 'You finished a module yesterday. What is the most effective way to review it today?', options: ['Answer the quiz from memory before re-reading', 'Re-read the whole module carefully', 'Watch a related video', 'Skip review; once is enough'], answer: 0, explain: 'Retrieving answers from memory (active recall), spaced over days, beats re-reading.' },
      { q: 'An AI tutor gives you an explanation that contradicts this hub. What should you do?', options: ['Always trust the AI; it is newer', 'Always trust the hub and ignore the AI', 'Stop using AI tutors', 'Treat it as a cue to check an official source; AI can hallucinate and sources can date'], answer: 3, explain: 'Verifying conflicting claims against primary sources is a core AI-era skill.' },
      { q: 'Where are your progress, quiz scores and notes stored?', options: ['On a cloud server', 'In your browser\'s local storage on this device', 'In your AI assistant\'s memory', 'They are not saved'], answer: 1, explain: 'Everything stays local in your browser. Switching browsers or clearing data starts fresh.' }
    ],

    terms: ['learning-track', 'active-recall', 'spaced-repetition', 'ai-assistant', 'hallucination'],

    resources: [
      { title: 'Andrej Karpathy — How I use LLMs', url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw', type: 'video', note: 'A practical tour of everyday AI tools and habits. A perfect companion to the Power User track.' },
      { title: 'Learning How to Learn (Coursera)', url: 'https://www.coursera.org/learn/learning-how-to-learn', type: 'course', note: 'A popular free course on active recall, spacing and focused study.' },
      { title: 'Google AI Studio', url: 'https://aistudio.google.com/', type: 'tool', note: 'Free playground for Gemini models. You will use it from Level 1 onwards.' },
      { title: 'Ollama', url: 'https://ollama.com/', type: 'tool', note: 'Optional: run open models locally (Level 2).' }
    ],

    connects: ['0.1', '1.1', '1.2', '1.6', '3.7']
  });
})();
