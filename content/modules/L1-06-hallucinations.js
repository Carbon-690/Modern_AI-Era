/* Module 1.6 — Hallucinations, knowledge cutoff & limits */
HUB.registerModule({
  id: '1.6',
  title: 'Hallucinations, knowledge cutoff & limits',
  tagline: 'An LLM is a brilliant, confident guesser. It sounds just as sure when it is inventing as when it is right. Learn why [[hallucination|hallucinations]] happen, what the [[knowledge-cutoff|knowledge cutoff]] means, and the simple habits that keep you safe.',
  updated: 'October 2026',

  why: {
    era: 'February 2023 → today',
    html: `<p>In February 2023, in its very first public demo, Google's Bard chatbot claimed that the James Webb Space Telescope took the first pictures of a planet outside our solar system. It didn't: that happened in 2004. Alphabet's share price fell sharply the same day. A few months later, a New York lawyer submitted a court brief full of case law that ChatGPT had invented; the judge fined him (<i>Mata v. Avianca</i>, June 2023). In 2024 a Canadian tribunal ordered Air Canada to honour a refund policy its support chatbot had made up. In 2025 Deloitte agreed to partly refund the Australian government after a report it delivered was found to contain non-existent references and a fabricated court quote. The tools keep improving, but the lesson stays the same: <b>fluent is not the same as true</b>. Knowing <i>when</i> and <i>why</i> AI makes things up is the single most important skill for using it safely.</p>`
  },

  analogy: {
    title: 'The student who never leaves a blank',
    html: `<p>Picture a very well-read student in an exam where a blank answer scores zero and a wrong answer also scores zero. What is the smart strategy? <b>Never leave a blank.</b> If you know the answer, write it. If you half-know it, write your best guess, confidently, because confident answers sometimes get marks.</p><p>Now imagine this student has read millions of books but has no notes to check, cannot see a calendar, and stopped reading on a fixed date some months ago. Ask about something famous and they are excellent. Ask about a small-town college's founding year, the exact wording of a court judgment, or last week's news, and they will still write something that <i>sounds</i> right. That is an LLM: a <b>confident guesser</b> whose tone doesn't change between knowing and guessing.</p>`
  },

  diagram: {
    title: 'The confident guesser: how reliable the model is depends on what it has seen',
    svg: D.nested([
      { t: '❓ Never seen', s: 'after the knowledge cutoff · your private files · things that do not exist', c: 'red' },
      { t: '⚠️ Seen rarely', s: 'niche facts · exact numbers and dates · quotes · citations · small-town details', c: 'orange' },
      { t: '✅ Seen thousands of times', s: 'common facts, popular code, well-known concepts: usually reliable', c: 'green' }
    ], { w: 720, step: 46, vstep: 50, innerH: 80 }),
    caption: 'The model answers in <b>every</b> zone with the same fluent, confident voice. Hallucinations live mostly in the outer two rings. Your job is to notice when a question lands there and to verify the answer or give the model the facts.'
  },

  sections: [
    {
      title: 'What a hallucination really is',
      html: `<p>A <b>[[hallucination]]</b> is output that is fluent and confident but false or unsupported. Researchers sometimes prefer the word <i>confabulation</i>, borrowed from psychology: filling a memory gap with a plausible story without realising it is made up. The model isn't lying. Lying needs an intention to deceive. It is doing exactly what it was built to do ([[m:1.2]]): producing the most plausible next [[token]], one after another.</p>
      <div class="callout key"><span class="ic">🔑</span><div><b>An LLM generates what is <i>plausible</i>, not what is <i>verified</i>.</b> Most of the time plausible and true are the same thing. Hallucinations are the cases where they come apart.</div></div>
      <p>Hallucinations come in a few recognisable flavours:</p>
      ${D.compare([
        { t: 'Made up', icon: '🎭', c: 'red', s: 'fabrication', items: ['Invented facts, people, events or statistics', 'Fake citations: real-looking paper titles, DOIs, court cases', 'Code that calls functions or packages that don\'t exist'] },
        { t: 'Out of date', icon: '📅', c: 'orange', s: 'knowledge cutoff', items: ['Describes the world as it was when training data was collected', '"The latest version is…" (it isn\'t anymore)', 'Doesn\'t know today\'s date unless told'] },
        { t: 'Unfaithful', icon: '📄', c: 'purple', s: 'wrong about your source', items: ['A summary adds a claim that isn\'t in the document you gave it', 'Misquotes or swaps numbers from the text', 'Cites a real source that doesn\'t actually say that'] }
      ])}
      <p>The third flavour surprises people the most. Even when you hand the model the right document, it can still blend in what it "expects" the document to say. Giving it sources lowers the risk a lot, but doesn't remove it.</p>
      <p>How common is it? It depends heavily on the task. On well-known topics, frontier models in 2026 are right the vast majority of the time. On obscure facts, exact figures, and questions about specific people, error rates can still be high, especially with search turned off. One public tracker, Vectara's hallucination leaderboard, measures how often models add unsupported claims when summarising short documents. The best models score low single-digit percentages, and many others score much worse. Treat any single "hallucination rate" figure with care: it only describes one kind of task.</p>`
    },
    {
      title: 'Why models make things up',
      html: `<p>There is no fact database inside an LLM that it looks things up in. There is only a network of [[parameter|parameters]] that turns the text so far into probabilities for the next token. Follow what happens when the question lands in the "seen rarely" ring:</p>
      ${D.fig(D.flow([
        { t: 'Question', s: '"Who founded the Nashik Science Society, and when?"', c: 'blue', icon: '❓' },
        { t: 'Pattern match', s: '"founded by [Indian name] in [year]" is a familiar shape', c: 'purple', icon: '🧩' },
        { t: 'No solid memory', s: 'the specific fact appeared rarely or never in training data', c: 'orange', icon: '🕳️' },
        { t: 'Must still pick a token', s: 'a name and a year are the most plausible continuation', c: 'pink', icon: '🎲' },
        { t: 'Fluent guess', s: '"…founded by Dr. R. Kulkarni in 1962." Confident, possibly fictional', c: 'red', icon: '🎭' }
      ], { dir: 'v', w: 520 }), 'The shape of the answer is learned very well. The specific fact may not be. The model fills the slot with something that fits the shape.')}
      <p>Five forces push in this direction:</p>
      <ol>
        <li><b>Rare facts are weakly stored.</b> A fact seen thousands of times in [[pre-training]] is stored robustly. A fact seen once or twice, like a minor person's birthday, is barely stored at all, yet the model still produces an answer of the right shape.</li>
        <li><b>Nothing forces a blank.</b> Next-token prediction always produces <i>some</i> token. Saying "I don't know" is itself just another continuation that has to be learned and rewarded.</li>
        <li><b>Training and tests reward guessing.</b> Like the exam in the analogy, most benchmarks give a point for a right answer and zero for both a wrong answer and "I don't know". A model that always guesses scores higher. OpenAI's 2025 paper <i>Why Language Models Hallucinate</i> argued this is a major root cause.</li>
        <li><b>[[sampling|Sampling]] can drift.</b> One unlucky token early in a sentence ("…founded in <b>1962</b>") is then defended by everything that follows, because each token builds on the ones before it ([[m:1.5]]).</li>
        <li><b>People like confident, agreeable answers.</b> Preference training ([[rlhf|RLHF]], [[m:1.4]]) can reward answers that sound sure and agree with the user. This is called [[sycophancy]]. If you say "I think the answer is X, right?", the model is pulled towards X.</li>
      </ol>
      <p>OpenAI's write-up included a striking example from the SimpleQA fact benchmark. Compare an older model that almost never says "I don't know" with a newer one that is trained to abstain when unsure:</p>
      ${D.fig(D.bars([
        { t: 'o4-mini · right', v: 24, c: 'green' },
        { t: 'o4-mini · wrong', v: 75, c: 'red' },
        { t: 'o4-mini · abstained', v: 1, c: 'slate' },
        { t: 'gpt-5-thinking-mini · right', v: 22, c: 'green' },
        { t: 'gpt-5-thinking-mini · wrong', v: 26, c: 'red' },
        { t: 'gpt-5-thinking-mini · abstained', v: 52, c: 'slate' }
      ], { unit: '%', max: 100, labelW: 230, title: 'SimpleQA: right vs wrong vs "I don\'t know" (OpenAI, Sept 2025)' }), 'On a pure accuracy leaderboard the guesser "wins" (24% vs 22%), yet it gives almost three times as many wrong answers. Scoring that punishes confident errors more than honest abstentions would reward the second model.')}`
    },
    {
      title: 'The knowledge cutoff: a snapshot, not a live feed',
      html: `<p>A model's knowledge is frozen at its <b>[[knowledge-cutoff|knowledge cutoff]]</b>: the point when its [[training-data|training data]] was collected. Everything after that is invisible to it unless you or a tool supply it. And the gap is bigger than people expect:</p>
      ${D.fig(D.timeline([
        { date: 'Month 0', t: 'Data collected', s: 'the knowledge cutoff', c: 'blue' },
        { date: '+ months', t: 'Training & testing', s: 'pre-training, post-training, safety evals', c: 'purple' },
        { date: '+ 3–12 months', t: 'Public release', s: 'the model is already behind', c: 'pink' },
        { date: '+ 1–2 years', t: 'Still in use', s: 'apps keep serving it; the gap keeps growing', c: 'orange' },
        { date: 'Today', t: 'Your question', s: '"What\'s the latest…?" lands in the blind spot', c: 'red' }
      ]), 'A model released today typically has a cutoff several months in the past, and you may use it for a year or more after release.')}
      <p>Three practical consequences:</p>
      <ul>
        <li><b>"Latest" questions are traps.</b> Ask a model without search for "the newest iPhone", "current repo rate" or "the best AI model" and it will confidently describe its own past.</li>
        <li><b>It may not know what day it is.</b> Chat apps usually add the current date to a hidden system prompt. Without that, a model may assume it is still the year of its cutoff.</li>
        <li><b>The cutoff is fuzzy.</b> Events from the last few months before the cutoff were barely written about yet, so the model knows them only thinly. Models are often unsure of their own cutoff date and may state it wrongly.</li>
      </ul>
      <div class="callout tip"><span class="ic">💡</span><div><b>Search tools change the picture.</b> Since 2024–25, ChatGPT, Gemini, Claude, Perplexity and others can search the web and read pages before answering. The model's built-in knowledge is still frozen, but it can now read fresh text and work from that. When you need recent facts, check that search is actually on and look at the sources it shows.</div></div>`
    },
    {
      title: 'Other limits worth knowing',
      html: `<p>Hallucination is the most famous limit, but several others come from the same "next-token predictor" design:</p>
      <table>
        <thead><tr><th>Limit</th><th>What you see</th><th>Why it happens</th><th>What to do</th></tr></thead>
        <tbody>
          <tr><td>🔢 Exact counting and arithmetic</td><td>Miscounts letters in a word, slips in long multiplications</td><td>It sees [[token|tokens]], not letters ([[m:1.3]]), and predicts digits instead of calculating</td><td>Ask it to use a calculator or code tool; reasoning models do much better</td></tr>
          <tr><td>🙇 Sycophancy</td><td>Agrees with your wrong claim, praises weak work</td><td>Preference training rewarded agreeable answers ([[m:1.4]])</td><td>Ask neutral questions; request criticism explicitly</td></tr>
          <tr><td>📚 Long-context slips</td><td>Misses a detail buried in a long document</td><td>Attention spreads thin; [[lost-in-the-middle]] effect</td><td>Point to the section; ask for quotes; split long inputs</td></tr>
          <tr><td>🧠 No memory between chats</td><td>Forgets yesterday's conversation</td><td>Each chat starts with an empty [[context-window]]; "memory" features are notes added back in</td><td>Paste key context again, or use projects / memory features ([[m:3.3]])</td></tr>
          <tr><td>🪞 Unreliable self-explanations</td><td>Explains "how it got the answer" with a tidy story</td><td>The explanation is generated text too, not a readout of its internal process</td><td>Judge the answer and its sources, not its story about itself</td></tr>
        </tbody>
      </table>
      <div class="callout warn"><span class="ic">⚠️</span><div><b>Confidence is not a signal.</b> A model saying "I'm 100% sure" tells you very little. The words "definitely" and "certainly" are tokens like any other. Judge the <i>kind of question</i> (common vs rare, old vs recent, checkable vs not), not the tone of the answer.</div></div>`
    },
    {
      title: 'How to shrink hallucinations',
      html: `<p>You can't switch hallucinations off, but you can make them much rarer. The most powerful idea is <b>[[grounding]]</b>: making the model answer from sources you provide or that it retrieves, instead of from memory. It turns a closed-book exam into an open-book one.</p>
      <p>Watch the same question asked two ways:</p>
      <div data-widget="grounding"></div>
      <p>Techniques, roughly in order of impact:</p>
      <ol>
        <li><b>Give it the facts.</b> Paste the document, upload the PDF, turn on web search, or (for builders) use [[m:4.3|RAG]]. Knowledge problems are solved with context.</li>
        <li><b>Give it permission not to know.</b> Add: <i>"If the answer isn't in the text or you're not sure, say so. Don't guess."</i> This one sentence noticeably reduces made-up answers.</li>
        <li><b>Ask for quotes and sources.</b> <i>"Support each claim with an exact quote from the document."</i> Quotes are easy to check, and a claim with no quote is a red flag.</li>
        <li><b>Use a reasoning model with search for hard factual questions</b> ([[m:2.3]]). Thinking before answering helps with multi-step problems, and search supplies the facts. Reasoning alone does not guarantee truth.</li>
        <li><b>Ask neutrally.</b> "What year was X founded?" beats "X was founded in 1962, right?". Leading questions invite [[sycophancy]].</li>
        <li><b>Cross-check what matters.</b> Ask a second model, or ask the same model to check its answer against the source. Different models rarely invent the <i>same</i> fake fact.</li>
      </ol>
      <div class="callout example"><span class="ic">📝</span><div><b>What doesn't work well:</b> lowering the [[temperature]] to 0. It makes answers <i>repeatable</i>, not <i>correct</i> ([[m:1.5]]). A model that doesn't know a fact will just repeat the same wrong guess every time.</div></div>`
    },
    {
      title: 'The verification habit: trust in proportion to stakes',
      html: `<p>Checking everything would make AI useless; checking nothing is dangerous. The skill is matching your effort to <b>how costly an error would be</b> and <b>how hard it is to spot</b>:</p>
      ${D.fig(D.spectrum('Low stakes · easy to check', 'High stakes · hard to check', [
        { t: 'Brainstorm names', s: 'no "truth" to get wrong', pos: 0.05, c: 'green' },
        { t: 'Draft an email', s: 'you read it anyway', pos: 0.2, c: 'green' },
        { t: 'Explain a concept', s: 'cross-check key points', pos: 0.38, c: 'yellow' },
        { t: 'Code', s: 'run it, test it', pos: 0.52, c: 'yellow' },
        { t: 'Statistics & dates', s: 'verify at the source', pos: 0.7, c: 'orange' },
        { t: 'Medical, legal, money', s: 'expert + primary source', pos: 0.92, c: 'red' }
      ], { id: 'risk16' }), 'Code sits in the middle because errors are often caught simply by running it. A fake statistic in a report can travel far before anyone notices.')}
      <p>A simple routine to make this automatic:</p>
      ${D.fig(D.cycle([
        { t: 'Ask', s: 'neutral question, sources allowed', c: 'blue', icon: '💬' },
        { t: 'Classify the claims', s: 'common or rare? recent? checkable?', c: 'purple', icon: '🔎' },
        { t: 'Verify the risky ones', s: 'open the source, search, run the code', c: 'orange', icon: '✅' },
        { t: 'Correct & ground', s: 'paste the facts, ask again', c: 'green', icon: '📎' }
      ], { center: { t: 'Trust,', s: 'but verify' } }), 'The verification loop. With practice it takes seconds for everyday questions. You will build a fuller research workflow in Module 3.7.')}
      <p>Use the helper below on any AI answer you are unsure about:</p>
      <div data-widget="verify"></div>
      <p>Now practise spotting failures. Each case is based on the kinds of incidents reported since 2023. What went wrong?</p>
      <div data-widget="spotIt"></div>
      <div class="callout key"><span class="ic">🔑</span><div><b>The person who uses the output is responsible for it.</b> Courts, employers and universities have been clear on this since 2023: "the AI said so" is not a defence. Verification is part of using AI well, not a sign that you don't trust it.</div></div>`
    }
  ],

  widgets: {
    grounding: {
      type: 'chat',
      title: 'Closed book vs open book: the same question, two ways',
      badge: 'Replay',
      messages: [
        { role: 'system', text: 'Round 1: no sources, search off.' },
        { role: 'user', text: 'Give me two research papers that show mobile phone bans in Indian schools improve exam scores, with authors and years.' },
        { role: 'ai', text: 'Certainly! 1) <i>Sharma &amp; Iyer (2019), "Digital Distraction and Academic Outcomes in Indian Secondary Schools", Journal of Educational Research India.</i> 2) <i>Mehta, R. (2021), "Phone-Free Classrooms: Evidence from Maharashtra", Economic &amp; Political Weekly.</i>' },
        { role: 'thought', who: 'What happened', text: 'Both look perfectly real: plausible Indian surnames, plausible journals, plausible years. They are invented examples written for this demo, and a model with no evidence to hand can produce exactly this kind of fluent fake. The request asked for a specific, rare fact with a fixed shape, and the model filled the shape.' },
        { role: 'system', text: 'Round 2: grounded. Search on, with an instruction.' },
        { role: 'user', text: 'Search for studies on school mobile phone bans and exam results. Only cite studies you actually found, with links. If you can\'t find India-specific evidence, say so.' },
        { role: 'tool', who: 'Web search', text: 'Returns several real studies and reviews, mostly from Europe and the US, with mixed findings. No strong India-specific study found.' },
        { role: 'ai', text: 'I couldn\'t find a peer-reviewed India-specific study. Here is what I did find, with links: several European and US studies, with <b>mixed</b> results. Some show small gains for lower-performing students, others show no clear effect. I\'d treat any claim of a large effect with caution.' },
        { role: 'thought', who: 'What changed', text: 'Sources plus permission to say "not found" turned a confident fabrication into an honest, checkable answer. Your final step is still to open the links.' }
      ]
    },
    verify: {
      type: 'decision',
      title: 'Should I trust this AI answer?',
      start: 'kind',
      nodes: {
        kind: { q: 'What kind of output is it?', options: [
          { label: '💡 Ideas, drafts, rewording, brainstorming', next: 'creative' },
          { label: '📌 Factual claims: names, numbers, dates, quotes, citations', next: 'source' },
          { label: '💻 Code or commands', next: 'code' },
          { label: '🩺 Medical, legal, financial or safety advice', next: 'expert' }
        ] },
        source: { q: 'Is the answer based on sources you can see?', hint: 'For example, a document you pasted, or search results with links.', options: [
          { label: 'Yes, it cites or quotes sources', next: 'checked' },
          { label: 'No, it answered from memory', next: 'common' }
        ] },
        checked: { q: 'Have you opened a source and confirmed it says what the AI claims?', options: [
          { label: 'Yes, the key claims match', next: 'ok' },
          { label: 'Not yet', next: 'open' }
        ] },
        common: { q: 'Is this widely known, stable information, or rare / recent / very specific?', options: [
          { label: 'Widely known and stable (e.g. how photosynthesis works)', next: 'lowrisk' },
          { label: 'Rare, recent, or very specific (a statistic, a quote, a paper, last month\'s news)', next: 'ground' }
        ] },
        creative: { result: 'Low risk: use it freely', icon: '🟢', html: '<p>There is no single "true" answer to get wrong. Read it, edit it, make it yours. If facts slip into a draft (a statistic, a date), treat those sentences as factual claims and check them.</p>' },
        ok: { result: 'Reasonably safe to use', icon: '✅', html: '<p>Good. The answer is grounded and you have checked the source. For anything published or high-stakes, also check that the source itself is reliable (official, recent, primary).</p>' },
        open: { result: 'Open at least one source first', icon: '🔗', html: '<p>Citations can be real pages that don\'t say what the AI claims, or links that don\'t exist. Click through and find the exact sentence. If you can\'t find it, treat the claim as unverified.</p>' },
        lowrisk: { result: 'Probably fine, spot-check if it matters', icon: '🟡', html: '<p>Common, stable knowledge sits in the model\'s strongest zone. If you will rely on it (an assignment, a presentation), a 30-second check against a textbook or encyclopedia is still worth it.</p>' },
        ground: { result: 'High hallucination risk: ground it', icon: '🔴', html: '<p>This is the "seen rarely / never seen" zone. Ask again with search turned on, or paste a reliable source and say <i>"answer only from this; say if it\'s not there"</i>. Never copy a citation, statistic or quote you haven\'t seen in the original.</p>' },
        code: { result: 'Run it before trusting it', icon: '🧪', html: '<p>Code is checkable: run it, test it with a few inputs, read error messages. Watch for functions or packages that don\'t exist. Attackers even register fake package names that AI tends to invent. Never run commands that delete files or touch money or servers without understanding them. More in <a href="#/m/6.8">Module 6.8</a>.</p>' },
        expert: { result: 'Use AI to prepare, not to decide', icon: '🩺', html: '<p>AI is great for understanding terms, preparing questions and summarising documents you provide. But for decisions about health, law, money or safety, confirm with a qualified professional and primary sources (official guidelines, the actual law, your bank\'s terms).</p>' }
      }
    },
    spotIt: {
      type: 'classify',
      title: 'What went wrong here?',
      buckets: ['🎭 Made up', '📅 Out of date', '📄 Unfaithful to the source', '✅ Not a hallucination'],
      items: [
        { t: 'A lawyer files a brief citing six court cases suggested by a chatbot. The judge finds that none of them exist.', bucket: 0, why: 'Classic fabrication. This is the real 2023 <i>Mata v. Avianca</i> case. Citations have a very regular shape, so they are easy for a model to invent.' },
        { t: 'Without search, a chatbot tells you "the most advanced model available" is one that was replaced over a year ago.', bucket: 1, why: 'The model describes the world as of its knowledge cutoff. It isn\'t inventing; its snapshot is simply old.' },
        { t: 'You paste a 10-page report and ask for a summary. The summary says revenue grew 12%, but the report says 21%.', bucket: 2, why: 'The source was right there, but the model swapped the digits. Ask for exact quotes for any number you plan to reuse.' },
        { t: 'A customer-service bot tells a passenger they can claim a bereavement refund after travel. The airline\'s real policy says the opposite.', bucket: 0, why: 'The bot invented a policy that sounded reasonable. In 2024 a Canadian tribunal held Air Canada responsible for what its chatbot said.' },
        { t: 'You ask for a short poem about the monsoon and get lines describing "silver rain on Mumbai rooftops".', bucket: 3, why: 'Creative writing has no fact to get wrong. Imagination is the point here, not a failure.' },
        { t: 'A report drafted with AI help cites an academic paper by a real professor. The professor confirms she never wrote it.', bucket: 0, why: 'A fabricated reference attached to a real name, which makes it more convincing. References like this to works that don\'t exist were found in the 2025 Deloitte report for the Australian government.' },
        { t: 'Asked "what is today\'s date?" in an app that doesn\'t pass the date to the model, it names a day from a year ago.', bucket: 1, why: 'The model has no clock. Without the date in its context it assumes it is still around its cutoff.' },
        { t: 'The AI\'s answer cites a real government web page, but the page says nothing about the claim it is attached to.', bucket: 2, why: 'A real source that doesn\'t support the claim. This is why you open the link rather than trusting its presence.' }
      ]
    }
  },

  deeper: [
    {
      title: 'The statistics of guessing: why some hallucination is unavoidable',
      html: `<p>OpenAI's September 2025 paper (Kalai, Nachum, Vempala and Zhang) frames hallucination as a classification problem: for every candidate answer, the model is implicitly deciding "valid or not?". Some facts have no pattern to learn. A random person's birthday can't be worked out from anything else; it can only be memorised. The paper argues that for such facts, the error rate after pre-training is at least roughly the fraction of facts that appeared <b>only once</b> in the training data (the "singleton rate"). If 20% of birthday facts appear once, expect the base model to get at least about 20% of birthday questions wrong.</p><p>Post-training could teach the model to abstain on those questions, but the paper's second point is that most evaluations score abstaining as zero. So labs optimising for leaderboards are pushed towards models that guess. Their proposed fix is socio-technical: change mainstream benchmark scoring so that confident errors cost more than "I don't know".</p>`
    },
    {
      title: 'Inside the model: the "can\'t answer" circuit',
      html: `<p>In March 2025, Anthropic published interpretability research (<i>Tracing the thoughts of a large language model</i>) that looked at the internal features a Claude model uses. They found something like a <b>default "I can't answer that" pathway</b> that is active for every question. When the model recognises something it knows well, such as a famous person, "known entity" features <b>switch off</b> that default, and the model answers.</p><p>Hallucinations appeared when this switch misfired: the name felt <i>familiar</i> enough to suppress the "can't answer" default, but the model didn't actually know the details. So it produced a plausible answer. This matches everyday experience: models hallucinate most about things that are <i>half-familiar</i>, like a real author's non-existent book or a real court's non-existent case.</p>`
    },
    {
      title: 'Do reasoning models hallucinate less?',
      html: `<p>Not automatically. Reasoning models ([[m:2.3]]) are much better at maths, code and multi-step logic, because those were trained with checkable rewards. Factual recall is different. In April 2025, OpenAI's system card for o3 reported that it hallucinated on about a third of questions in its internal PersonQA test (questions about public figures), roughly double the rate of the older o1. One explanation: the model made more claims overall, so it got both more right and more wrong.</p><p>The big improvements in 2025–26 came from combining reasoning with <b>tools</b>, so the model searches and reads before answering, and from training that rewards abstaining when unsure. The lesson for you: "it thought for 40 seconds" makes an answer more careful, not necessarily more true. Check whether it actually used sources.</p>`
    },
    {
      title: 'Measuring hallucinations: closed-book vs grounded',
      html: `<p>Benchmarks test two different things, and confusing them causes misleading headlines:</p><ul><li><b>Closed-book factuality</b>, such as SimpleQA: short factual questions answered from memory. This tests what the model knows and whether it abstains when it doesn't.</li><li><b>Faithfulness</b>, such as Vectara's leaderboard: summarise a given document and measure claims not supported by it. This tests whether the model sticks to the source, which matters most for RAG and document tools.</li></ul><p>A model can be excellent at one and mediocre at the other. When you build with AI ([[m:7.1]]), you'll create your own small test sets that match <i>your</i> task, because general numbers rarely predict performance on a specific use case.</p>`
    }
  ],

  misconceptions: [
    { myth: 'If the AI sounds confident and detailed, it\'s probably right.', truth: 'Tone and detail are produced the same way whether the model knows or is guessing. Fabricated citations are often <b>more</b> detailed than real ones. Judge the kind of claim, not the confidence.' },
    { myth: 'Hallucinations are a bug that will soon be fixed completely.', truth: 'They have become much rarer, especially with search and grounding, but they follow from how next-token prediction works. Research in 2025 argued that some error rate on rare facts is statistically unavoidable. Plan for verification, not perfection.' },
    { myth: 'If it gives a link or citation, the claim is verified.', truth: 'Links can be invented, broken, or point to real pages that don\'t support the claim. A citation is an invitation to check, not proof.' },
    { myth: 'Setting temperature to 0 stops hallucinations.', truth: 'Temperature 0 makes output repeatable, not correct. If the model doesn\'t know, it will give the same wrong answer every time.' },
    { myth: 'Asking "Are you sure?" reliably catches mistakes.', truth: 'It sometimes helps, but because of sycophancy the model may simply change a <b>correct</b> answer to please you. Better: ask it to check against a source, or ask a second model.' }
  ],

  takeaways: [
    'A hallucination is fluent, confident output that is false or unsupported. The model generates what is plausible, not what is verified.',
    'The risk depends on what the model has seen: common knowledge is usually reliable; rare facts, exact figures, quotes, citations and recent events are risky.',
    'Models guess because next-token prediction always produces something, and because training and benchmarks have historically rewarded guessing over "I don\'t know".',
    'The knowledge cutoff freezes built-in knowledge months before release. "Latest" questions need search or sources you provide.',
    'Grounding (documents, search, RAG) plus permission to say "I don\'t know" is the most effective fix. Low temperature is not a fix.',
    'Match verification to stakes: use creative output freely, run code, and check facts, citations and high-stakes advice at the source.',
    'You are responsible for what you publish or submit. "The AI said so" is not a defence.'
  ],

  tryIt: {
    title: 'Catch a hallucination, then fix it with grounding',
    time: '15 min',
    intro: '<p>Use any free chatbot. For steps 1–3, turn web search <b>off</b> if your app allows it (or use Google AI Studio, where search grounding is off by default).</p>',
    steps: [
      '<b>Probe the rare zone:</b> Ask about something real but obscure that you can check, such as your school\'s or town\'s history: <i>"When was [your school/college] founded and who was its first principal?"</i> Compare with what you know or with the official website.',
      '<b>Ask for citations:</b> <i>"Give me 3 academic papers, with authors, year and journal, on [a niche topic you know]."</i> Search each title on Google Scholar. Count how many exist exactly as described.',
      '<b>Test the cutoff:</b> Ask <i>"What is your knowledge cutoff?"</i> and then <i>"What are the most important AI news stories of the last month?"</i> Note whether it admits the limit or invents news.',
      '<b>Test sycophancy:</b> Ask a leading question with a wrong premise: <i>"Since the Great Wall of China is visible from the Moon with the naked eye, how far away can it be seen?"</i> Does it correct the premise or play along?',
      '<b>Ground it:</b> Turn search on (or paste a reliable article) and repeat step 1 or 2, adding <i>"Only use sources you actually found, link them, and say if you can\'t find something."</i> Compare the two answers.',
      '<b>Reflect:</b> In your notes below, record which zone each failed question belonged to ("seen rarely" or "never seen") and which fix worked best.'
    ],
    tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)', 'Google AI Studio (free)', 'Google Scholar (free)'],
    outro: '<p>Most people are surprised by step 2. Keep the result in mind every time an AI hands you a reference.</p>'
  },

  quiz: [
    { q: 'Why does an LLM sometimes state false facts in a confident tone?', options: ['It has been instructed to deceive users when it doesn\'t know', 'Its fact database contains errors that engineers haven\'t fixed', 'Its temperature is always set too high', 'It generates the most plausible continuation, and its tone doesn\'t change between knowing and guessing'], answer: 3, explain: 'There is no fact database and no intent to deceive. The model predicts plausible tokens, and confident wording is just another plausible pattern.' },
    { q: 'Which question is most likely to produce a hallucination from a model with search turned off?', options: ['"Explain how vaccines train the immune system"', '"What did the 2024 annual report of a small Pune NGO say about its funding?"', '"Write a funny limerick about a cat"', '"What is the capital of France?"'], answer: 1, explain: 'A specific, rarely written-about document sits in the "seen rarely / never seen" zone. Common knowledge and creative tasks are much safer.' },
    { q: 'A friend says: "I set the temperature to 0, so the answers are now factually correct." What is the best reply?', options: ['Temperature 0 makes answers repeatable, but a fact the model doesn\'t know will just be repeated wrongly', 'Correct, temperature 0 turns off hallucinations', 'Temperature 0 makes the model search the web', 'Temperature only affects creative writing, not facts'], answer: 0, explain: 'Temperature reshapes probabilities; it adds no knowledge. Grounding with sources is what reduces factual errors.' },
    { q: 'You need recent statistics for a college presentation. Which approach is safest?', options: ['Ask the chatbot and trust the numbers if it sounds confident', 'Ask the same question three times and use the most common answer', 'Use search or a pasted source, ask it to quote and link each number, then open the sources to confirm', 'Ask "Are you sure?" after each number'], answer: 2, explain: 'Recent figures are outside the model\'s reliable zone. Grounding plus checking the original source is the reliable path. Repeated asking and "Are you sure?" can still return confident errors.' },
    { q: 'According to OpenAI\'s 2025 analysis, why do common benchmarks encourage hallucination?', options: ['They are too easy, so models stop trying', 'They give zero points for "I don\'t know", the same as a wrong answer, so guessing scores higher', 'They only test creative writing', 'They are run at a high temperature'], answer: 1, explain: 'If abstaining and being wrong score the same, a model that always guesses climbs the leaderboard. Changing scoring to penalise confident errors would reward honesty.' }
  ],

  terms: ['hallucination', 'knowledge-cutoff', 'grounding', 'sycophancy', 'training-data', 'pre-training', 'sampling', 'temperature', 'rlhf', 'context-window'],

  resources: [
    { title: 'Kalai, Nachum, Vempala & Zhang — Why Language Models Hallucinate (OpenAI, 2025)', url: 'https://arxiv.org/abs/2509.04664', type: 'paper', note: 'The "exam that rewards guessing" argument. The introduction and the SimpleQA example are readable without maths.' },
    { title: 'Anthropic — Tracing the thoughts of a large language model', url: 'https://www.anthropic.com/research/tracing-thoughts-language-model', type: 'article', note: 'Interpretability research, including the section on how a misfiring "known entity" feature leads to hallucination.' },
    { title: 'Simon Willison — Hallucinations in code are the least dangerous form of LLM mistakes', url: 'https://simonwillison.net/2025/Mar/2/hallucinations-in-code/', type: 'article', note: 'Why code errors are easy to catch (you run it), and why subtle factual errors in prose are the real danger.' },
    { title: 'Anthropic docs — Reduce hallucinations', url: 'https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations', type: 'doc', note: 'Practical prompting techniques: allow "I don\'t know", require direct quotes, verify with citations. They work with any model.' },
    { title: 'Vectara — Hallucination Leaderboard', url: 'https://github.com/vectara/hallucination-leaderboard', type: 'repo', note: 'A regularly updated comparison of how faithfully models summarise documents. Useful for seeing how rates differ between models.' }
  ],

  connects: ['1.2', '1.4', '1.5', '2.3', '3.7', '4.3', '7.1']
});
