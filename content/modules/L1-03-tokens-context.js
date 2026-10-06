/* Module 1.3 — Tokens & the context window */
HUB.registerModule({
  id: '1.3',
  title: 'Tokens & the context window',
  tagline: 'Models don\'t read words, they read [[token|tokens]]. And they can only see what fits on their desk: the [[context-window|context window]]. These two ideas explain AI\'s strange mistakes, its memory limits and its price tag.',
  updated: 'October 2026',

  why: {
    era: 'Late 2022 → 2024',
    html: `<p>Early ChatGPT users hit two walls almost immediately. First, in long conversations the bot "forgot" what was said at the start, because the model could only hold about 4,000 [[token|tokens]] (roughly 3,000 words) at once. Second, you couldn't paste in a long report: it simply didn't fit. Meanwhile, developers discovered that every API call was <b>billed per token</b>. Understanding tokens and the context window became essential for anyone who wanted reliable, affordable results, and the AI race turned "bigger context windows" into a headline feature: from about 4K tokens in 2022 to around a million by 2025–26.</p>`
  },

  analogy: {
    title: 'The model\'s working desk',
    html: `<p>Picture a brilliant assistant who works at a desk but has <b>no filing cabinet and no memory between visits</b>. Everything they use for the current job must be on the desk: your instructions, the earlier conversation, the documents you handed over, and the blank paper for their answer. The size of the desk is the <b>context window</b>. The text is cut into small pieces, like scraps of paper, called <b>tokens</b>, and the desk holds a fixed number of scraps. When the desk is full, something has to go. And when the desk is cluttered, even a brilliant assistant misses the one note that mattered.</p>`
  },

  diagram: {
    title: 'How the model "sees" your text',
    svg: (function () {
      const toks = [['Un', 'blue', 1806], ['believ', 'purple', 31141], ['ably', 'pink', 2886], [',', 'orange', 11], ['·token', 'green', 6602], ['ization', 'cyan', 2065], ['·is', 'yellow', 382], ['·fun', 'blue', 2827], ['!', 'purple', 0]];
      const gap = 8, h = 42, ws = toks.map((t) => Math.max(48, Math.round(26 + t[0].length * 8.3)));
      const total = ws.reduce((a, b) => a + b, 0) + gap * (toks.length - 1);
      const W = 760, H = 330, x0 = (W - total) / 2;
      let s = D.text(W / 2, 22, 'Your text:  "Unbelievably, tokenization is fun!"', 'd-text');
      s += D.arrow(W / 2, 40, W / 2, 82, { label: '① tokenizer cuts it into pieces' });
      let x = x0;
      toks.forEach((t, i) => {
        s += D.node(x, 92, ws[i], h, { t: t[0], c: t[1] }, { rx: 8 });
        s += D.arrow(x + ws[i] / 2, 92 + h + 2, x + ws[i] / 2, 168, {});
        s += D.text(x + ws[i] / 2, 182, String(t[2]), 'd-label');
        x += ws[i] + gap;
      });
      s += D.text(x0 - 10, 113, 'tokens', 'd-sub', 'end');
      s += D.text(x0 - 10, 182, 'IDs', 'd-sub', 'end');
      s += D.arrow(W / 2, 198, W / 2, 238, { label: '② each piece becomes a number' });
      s += D.node(130, 246, 500, 62, { t: '③ The model only ever sees: 9 numbers', s: 'it never sees letters, so "how many b\'s?" is genuinely hard for it', c: 'slate' });
      return D.svg(W, H, s, 'Text to tokens to token IDs');
    })(),
    caption: 'An <b>illustrative</b> split: real tokenizers differ by model, and the IDs here are made up. Common words are usually one token. Rare or long words are cut into pieces. The "·" marks a leading space, which is usually glued to the start of the next word.'
  },

  sections: [
    {
      title: 'What a token is (and why not just use words?)',
      html: `<p>A [[token]] is the basic unit of text a model reads and writes. It can be a whole word ("the"), part of a word ("ization"), a single character ("!") or even a space plus a word (" fun"). Before your message reaches the model, a program called a [[tokenizer]] cuts it into tokens and swaps each one for a number from a fixed list, the model's [[token-vocabulary|vocabulary]]. Modern vocabularies hold roughly 100,000–200,000 different tokens.</p>
      <p>Why not just letters, or whole words? It is a balance:</p>
      ${D.fig(D.spectrum('Letters: tiny vocabulary, very long sequences', 'Whole words: short sequences, huge vocabulary', [
        { t: 'Letters', s: '"c","a","t" = 3 steps', pos: 0.06, c: 'slate' },
        { t: 'Subword tokens', s: 'what LLMs use', pos: 0.5, c: 'green' },
        { t: 'Whole words', s: 'fails on typos, new words', pos: 0.94, c: 'slate' }
      ], { id: 'tok-spectrum' }), 'Letters would make every sentence very long and slow to process. Whole words would need millions of entries and still fail on typos, names and new slang. Subword tokens, usually built with [[byte-pair-encoding|byte-pair encoding]], sit in the sweet spot.')}
      <div class="callout key"><span class="ic">🔑</span><div><b>Rule of thumb for English:</b> 1 token ≈ ¾ of a word ≈ 4 characters. So <b>100 tokens ≈ 75 words</b>, and a page of text is about 500–700 tokens. Code, numbers, unusual names and most non-English languages use more tokens per word.</div></div>
      <p>Type anything below and watch how it is cut up. Try a long rare word, a number like <code>3.14159</code>, your own name, or a sentence in Hindi.</p>
      <div data-widget="tokPlay"></div>`
    },
    {
      title: 'Tokens explain AI\'s strangest mistakes',
      html: `<p>Once you know the model sees <i>pieces</i> rather than letters, many odd failures stop being mysterious. The model is not "stupid". It is working with a different view of the text than you are.</p>
      <div data-widget="tokWhy"></div>
      <div class="callout tip"><span class="ic">💡</span><div><b>How to work around it:</b> for letter-level or exact-number tasks, ask the model to write the item out character by character first, or let it use a tool (a code interpreter or calculator). In 2026 many assistants do this automatically, and reasoning models (see [[m:2.3]]) handle such tasks much better by thinking step by step. Knowing <i>why</i> it fails tells you when to double-check.</div></div>`
    },
    {
      title: 'Not all languages pay the same: the token tax',
      html: `<p>Tokenizers learn their vocabulary mostly from the data they were trained on, and that data has historically been dominated by English. Common English words became single tokens. Words in Hindi, Tamil, Bengali and many other languages were more often split into many small pieces.</p>
      ${D.fig(D.compare([
        { t: 'English sentence', icon: '🇬🇧', c: 'green', s: 'well represented in the vocabulary', items: ['Most common words = 1 token each', 'Fewer tokens for the same meaning', 'Cheaper per message', 'More conversation fits on the desk'] },
        { t: 'Same sentence in many Indian languages', icon: '🇮🇳', c: 'orange', s: 'often split into more pieces', items: ['A single word may become several tokens', 'Often noticeably more tokens for the same meaning', 'Higher cost on pay-per-token APIs', 'The context window fills up sooner'] }
      ]), 'Same meaning, different token bill. Newer tokenizers (2024 onward) narrowed the gap a lot, but it has not disappeared. Measure it yourself in the Try-it section.')}
      <p>This matters in practice. If you are building a Hindi chatbot, expect higher token counts than an English one, budget for it, and test with real users' language. Some Indian AI efforts build tokenizers designed specifically for Indian languages for exactly this reason.</p>`
    },
    {
      title: 'The context window: everything the model can see right now',
      html: `<p>The [[context-window|context window]] is the maximum number of tokens the model can take in <b>at one time</b>. It is the size of the desk. Crucially, <b>everything shares that one desk</b>, including the model's own answer.</p>
      ${D.fig(D.layers([
        { t: 'Room for the answer', s: 'output tokens (and hidden "thinking" for reasoning models)', c: 'yellow', icon: '✍️' },
        { t: 'Your new message', s: 'the question you just typed', c: 'pink', icon: '💬' },
        { t: 'Files and pasted text', s: 'PDFs, web pages, code, search results', c: 'green', icon: '📄' },
        { t: 'Earlier conversation', s: 'every previous message and reply in this chat', c: 'blue', icon: '🗂️' },
        { t: 'Memory and custom instructions', s: 'facts the app saved about you', c: 'cyan', icon: '🧷' },
        { t: 'Hidden system prompt', s: 'the app\'s own rules, written by the company', c: 'purple', icon: '⚙️' }
      ], { brackets: [{ from: 0, to: 5, label: 'all must fit in one context window', c: 'orange' }] }), 'What is actually on the desk when you press Enter in a chat app. You only typed the pink layer. The app quietly adds the rest.')}
      <p>The second big idea: <b>the model itself is stateless</b>. It remembers nothing between calls. A chat app creates the illusion of memory by <b>re-sending the whole conversation every time</b> you send a new message.</p>
      ${D.fig(D.seq(['You', { t: 'Chat app', c: 'blue' }, { t: 'Model', c: 'purple' }], [
        [0, 1, 'Turn 1: "Hi, I\'m Priya"'],
        [1, 2, 'sends: rules + msg 1'],
        [2, 1, 'reply 1', true],
        [0, 1, 'Turn 2: "What\'s my name?"'],
        [1, 2, 'sends: rules + msg 1 + reply 1 + msg 2'],
        [2, 1, '"Your name is Priya"', true],
        { note: 'every turn re-sends everything before it' }
      ], { colW: 230 }), 'The model "knows" your name only because the app pasted the earlier messages back onto the desk. Start a new chat and the desk is wiped clean.')}
      <p>Context windows grew dramatically during the AI race:</p>
      ${D.fig(D.timeline([
        { date: 'Nov 2022', t: '~4K tokens', s: 'ChatGPT launch ≈ 3,000 words', c: 'slate' },
        { date: 'Mar 2023', t: '8K–32K', s: 'GPT-4', c: 'blue' },
        { date: 'May 2023', t: '100K', s: 'Claude: a short novel', c: 'purple' },
        { date: 'Nov 2023', t: '128K–200K', s: 'GPT-4 Turbo, Claude 2.1', c: 'pink' },
        { date: 'Feb 2024', t: '1M', s: 'Gemini 1.5 Pro', c: 'orange' },
        { date: '2025–26', t: '~1M is common', s: 'at the frontier; some go further', c: 'green' }
      ], { colW: 125 }), 'About 250× growth in three years. Chat apps often give you a smaller window than the model\'s API maximum, and free tiers usually get less than paid ones.')}`
    },
    {
      title: 'When the desk overflows, or just gets cluttered',
      html: `<p>What happens when a conversation grows past the window? Different apps handle it differently, but the options are the same:</p>
      <table>
        <tr><th>Strategy</th><th>What it does</th><th>What you notice</th></tr>
        <tr><td>✂️ Truncation</td><td>The oldest messages silently fall off the desk.</td><td>The bot "forgets" instructions you gave at the start.</td></tr>
        <tr><td>🗜️ Summarising (compaction)</td><td>Older parts are replaced by a short summary.</td><td>It remembers the gist, but loses details and exact wording.</td></tr>
        <tr><td>🔎 Retrieval</td><td>Only the relevant parts of big documents are fetched for each question.</td><td>Good answers about specific facts. Can miss the bigger picture. (This is RAG: [[m:4.3]].)</td></tr>
        <tr><td>🚫 Hard limit</td><td>The app refuses: "This conversation is too long."</td><td>You have to start a new chat.</td></tr>
      </table>
      <p>There's a subtler problem. Even when everything fits, <b>a fuller desk is not a better desk</b>. Research has shown that models are best at using information near the start and end of the context and worse at using details buried in the middle. This is the [[lost-in-the-middle|"lost in the middle"]] effect. More generally, answer quality tends to drop as the context fills with loosely related material, which practitioners call <b>context rot</b>.</p>
      <p>Play with the budget below. Switch the window size back to 4K (ChatGPT in 2022), then try 1M, and watch the warnings change as you add a big PDF or a long chat history.</p>
      <div data-widget="deskBudget"></div>
      <div class="callout key"><span class="ic">🔑</span><div><b>The skill this creates:</b> deciding <i>what goes on the desk</i> is one of the most important AI skills of 2025–26. It even has a name, <b>context engineering</b>, and gets a full module later: [[m:3.6]]. For now, remember: <b>relevant beats more</b>.</div></div>`
    },
    {
      title: 'Token economics: why tokens are money',
      html: `<p>Every time a model runs to produce an answer (this is called [[inference]]), it costs real computing power. AI companies therefore measure and charge by the token. Even if you only use free chat apps, tokens shape your experience through usage limits, window sizes and speed.</p>
      ${D.fig(D.compare([
        { t: 'Input tokens', icon: '📥', c: 'blue', s: 'everything the model reads', items: ['System prompt, history, files, your question', 'Cheaper per token', 'Re-sent on <b>every</b> turn of a chat', 'Repeated input is often discounted (caching)'] },
        { t: 'Output tokens', icon: '📤', c: 'pink', s: 'everything the model writes', items: ['The answer you see', 'Usually <b>several times pricier</b> per token than input', 'Includes hidden "thinking" tokens of reasoning models', 'Also the slowest part: generated one by one'] }
      ]), 'API prices are quoted per million tokens, with separate rates for input and output. Exact prices change often, so always check the provider\'s pricing page.')}
      <p>Because chat apps re-send the whole history, <b>long conversations get more expensive with every turn</b>, even if each new message is short:</p>
      ${D.fig(D.bars([
        { t: 'Turn 1', v: 0.5, c: 'green' },
        { t: 'Turn 5', v: 2.5, c: 'cyan' },
        { t: 'Turn 10', v: 5, c: 'blue' },
        { t: 'Turn 20', v: 10, c: 'purple' },
        { t: 'Turn 40', v: 20, c: 'pink' }
      ], { unit: 'K tokens', title: 'Input tokens per turn, if each exchange adds ~500 tokens' }), 'Turn 40 reads 40× more input than turn 1. Across a 20-turn chat the model reads about 105,000 input tokens in total, though you only typed a few thousand.')}
      <p>Walk through a realistic cost estimate step by step:</p>
      <div data-widget="costSteps"></div>
      <div class="callout example"><span class="ic">📝</span><div><b>For chat-app users:</b> free tiers and subscriptions turn token costs into <b>usage limits</b> (e.g. a number of messages per few hours, smaller windows, or fewer uses of the most powerful models). Long chats, huge uploads and reasoning modes use up those limits fastest.</div></div>`
    },
    {
      title: 'Habits that get more value from every token',
      html: `<p>You don't need to count tokens by hand. You do need a few habits that keep the desk clean and the bill low:</p>
      <table>
        <tr><th>Habit</th><th>Why it works</th></tr>
        <tr><td>🆕 Start a new chat for a new topic</td><td>Old, unrelated messages clutter the desk and still cost tokens on every turn.</td></tr>
        <tr><td>📌 Restate key instructions in long chats</td><td>Early instructions can be truncated, summarised away or lost in the middle.</td></tr>
        <tr><td>✂️ Paste only the relevant part</td><td>Three relevant pages beat a 300-page PDF for a specific question: better focus, lower cost.</td></tr>
        <tr><td>🧾 Carry over a summary</td><td>Before switching chats, ask: "Summarise our decisions so far in 10 bullet points", then paste that into the new chat.</td></tr>
        <tr><td>📏 Ask for the length you need</td><td>Output tokens are the priciest and slowest. "In 5 bullets" is faster and cheaper than an essay.</td></tr>
        <tr><td>🌐 Expect more tokens in other languages and code</td><td>Budget for it, and measure with a tokenizer before building anything at scale.</td></tr>
      </table>
      <div class="callout tip"><span class="ic">💡</span><div><b>How this makes you better with AI:</b> when an answer goes wrong in a long session, your first question is now <i>"what is actually on the desk?"</i> That single question fixes a surprising number of problems, and it is the foundation for [[m:3.6|context engineering]], [[m:4.3|RAG]] and agents later in the hub.</div></div>`
    }
  ],

  widgets: {
    tokPlay: {
      type: 'tokenizer',
      title: 'Tokenizer playground',
      text: 'Unbelievably, the 2026 tokenizer split "antidisestablishmentarianism" into many pieces, but "the cat sat" stayed simple. नमस्ते दुनिया!'
    },
    tokWhy: {
      type: 'reveal',
      title: 'Think first, then reveal: blame the tokens',
      items: [
        { q: 'Why does a model sometimes fail to spell a word backwards, letter by letter?', a: 'It sees a few chunks such as "lol" + "lip" + "op", not individual letters. Reversing letters means taking apart pieces it never sees separately. Asking it to first list each letter on its own line usually fixes this.' },
        { q: 'Why can it make mistakes adding two long numbers?', a: 'Long numbers are split into irregular chunks of digits (e.g. "123" + "456" + "78"), so the columns don\'t line up the way they do on paper. That is why good assistants hand arithmetic to a calculator or code tool.' },
        { q: 'You asked for "exactly 100 words" and got 87. Why?', a: 'The model generates tokens, not words, and has no built-in word counter. Word counts are approximate unless it counts carefully or uses a tool. Ask for a range ("90–110 words") or check with a word counter.' },
        { q: 'In a very long chat, it ignores a rule you set at the very start. Why?', a: 'The rule may have been truncated or summarised away when the conversation outgrew the context window, or it may be "lost in the middle" of a huge context. Restate important rules, or start a fresh chat with a summary.' },
        { q: 'Why might a Hindi conversation hit the length limit sooner than the same conversation in English?', a: 'Many tokenizers split Hindi text into more tokens per word than English, so the same meaning uses more of the window (and costs more on pay-per-token APIs).' }
      ]
    },
    deskBudget: {
      type: 'contextBudget',
      title: 'Your chat\'s desk: what fills the context window?',
      parts: [
        { k: 'Hidden system prompt (app rules)', v: 4, c: '#a78bfa', max: 30 },
        { k: 'Memory & custom instructions', v: 2, c: '#22d3ee', max: 20 },
        { k: 'Earlier messages in this chat', v: 25, c: '#60a5fa', max: 600 },
        { k: 'Uploaded PDFs / pasted text', v: 40, c: '#34d399', max: 900 },
        { k: 'Your new question', v: 1, c: '#f472b6', max: 10 },
        { k: 'Room for the answer (incl. thinking)', v: 16, c: '#facc15', max: 100 }
      ],
      windows: [[4, '4K (ChatGPT at launch, 2022)'], [128, '128K (common from 2024)'], [200, '200K'], [1000, '1M (frontier models, 2025–26)']]
    },
    costSteps: {
      type: 'stepper',
      title: 'Estimate the cost: summarising a 30-page report',
      steps: [
        { title: '1 · Count the input tokens', html: '<p>A 30-page report is about 15,000 words. Using the rule of thumb (1 token ≈ ¾ word), that is about <b>20,000 tokens</b>. Add ~100 tokens for your instruction: <b>≈ 20,100 input tokens</b>.</p>' },
        { title: '2 · Estimate the output tokens', html: '<p>You ask for a 500-word summary ≈ <b>670 output tokens</b>. If you use a reasoning model, it may also "think" before answering. Say <b>2,000 hidden thinking tokens</b>, which are normally billed as output too.</p>' },
        { title: '3 · Apply the prices', html: '<p>Using <b>example rates only</b> (not a real price list): $1 per million input tokens and $5 per million output tokens.</p><ul><li>Input: 20,100 × $1 / 1,000,000 ≈ <b>2.0¢</b></li><li>Visible output: 670 × $5 / 1,000,000 ≈ <b>0.34¢</b></li><li>Thinking: 2,000 × $5 / 1,000,000 = <b>1.0¢</b></li></ul><p>Total ≈ <b>3.4¢</b> (roughly ₹3) per report.</p>', diagram: D.bars([{ t: 'Input (20,100 tok)', v: 2.0, c: 'blue' }, { t: 'Thinking (2,000 tok)', v: 1.0, c: 'purple' }, { t: 'Answer (670 tok)', v: 0.34, c: 'pink' }], { unit: '¢', title: 'Where the money goes (example rates)' }) },
        { title: '4 · Multiply by volume', html: '<p>One report costs pennies. A company summarising <b>1,000 reports a day</b> pays about $34 a day, roughly $1,000 a month. Now small choices matter: a shorter prompt, a cheaper model for easy reports, discounted caching for repeated instructions, or turning off "thinking" when it isn\'t needed. This is the start of AI cost engineering (see <a href="#/m/7.2">Module 7.2</a>).</p>' }
      ]
    }
  },

  deeper: [
    {
      title: 'How a tokenizer learns its vocabulary (byte-pair encoding)',
      html: `<p>Most LLM tokenizers use a variant of [[byte-pair-encoding|byte-pair encoding (BPE)]]. Start with single bytes (which can represent any character in any language). Scan a huge text collection, find the pair of neighbouring pieces that appears most often (say "t" + "h"), and merge it into a new token "th". Repeat: "th" + "e" becomes "the", and so on, tens of thousands of times until the vocabulary reaches its target size. Frequent words end up as single tokens. Rare words are built from pieces. Because the merges depend on the training text, <b>each model family has its own tokenizer</b>, so the same sentence can have different token counts in different models. Because it starts from bytes, a BPE tokenizer never meets an "unknown" character: emojis and rare scripts just cost more tokens.</p>`
    },
    {
      title: 'Why can\'t we just make the window infinite?',
      html: `<p>In a standard Transformer, every token "attends" to every other token (see [[m:1.7]]). Doubling the input roughly quadruples that attention work, so long contexts are slower and more expensive to process. Labs use many engineering tricks to make million-token windows practical, but cost and speed still grow with length. And size isn't the only issue: the 2023 paper <i>Lost in the Middle</i> showed models using information at the start and end of long inputs far better than information in the middle. Later studies of "context rot" (e.g. by Chroma in 2025) found that performance on many tasks drops as input length grows, even on simple tasks. A big window is a capacity, not a guarantee of attention.</p>`
    },
    {
      title: 'Images, audio and video are tokens too',
      html: `<p>Multimodal models (see [[m:2.2]]) convert other media into tokens as well. An image is cut into small patches, and each patch becomes one or more tokens, so a single image can cost hundreds to over a thousand tokens depending on its size and the model. Audio and video are converted into tokens per second of content, so an hour-long video can fill a large share of even a million-token window. Providers document exact rates in their token-counting guides. The desk rule still applies: everything, whatever its form, competes for the same space.</p>`
    },
    {
      title: 'Counting tokens precisely',
      html: `<p>The rule of thumb is fine for planning. For exact numbers, use the provider's own tool: web tokenizer pages (such as OpenAI's Tokenizer), token-counting functions in the official SDKs, or the token usage numbers returned with every API response. Always count with the tokenizer of the model you will actually use, since counts differ between model families. API responses usually report input, output and (for reasoning models) thinking tokens separately, which is exactly what you need for a cost dashboard.</p>`
    }
  ],

  misconceptions: [
    { myth: 'A token is the same as a word.', truth: 'A token is often a <i>piece</i> of a word. In English, 100 tokens ≈ 75 words. Code, numbers and many other languages use more tokens per word.' },
    { myth: 'The chatbot remembers our past conversations by itself.', truth: 'The model is stateless. Within a chat, the app re-sends the history each turn. Across chats, any "memory" feature works by saving notes and putting them back on the desk.' },
    { myth: 'A million-token window means I can paste everything and the model will use it all perfectly.', truth: 'Fitting is not the same as attending. Models miss details buried in huge contexts ("lost in the middle", context rot). Relevant, focused context gives better answers and costs less.' },
    { myth: 'Only my typed question counts toward the limit and the cost.', truth: 'The system prompt, memory, earlier messages, uploaded files, the answer, and any hidden thinking all use tokens from the same window, and on APIs you pay for all of them.' },
    { myth: 'The model can easily count letters or words because it is a computer.', truth: 'It sees tokens, not letters, and has no built-in counter. Exact counting is a weakness unless it spells things out or uses a tool.' }
  ],

  takeaways: [
    'Models read and write tokens: words or word-pieces. In English, 1 token ≈ ¾ word ≈ 4 characters.',
    'Many odd failures (spelling backwards, letter counting, exact word counts, long arithmetic) come from seeing tokens, not letters.',
    'The context window is the model\'s desk: system prompt, memory, history, files, question and answer all share it.',
    'The model is stateless. Chat apps re-send the whole conversation each turn, so long chats cost more and older parts may be dropped.',
    'Bigger windows (4K in 2022 → ~1M in 2025–26) help, but cluttered context still hurts quality. Relevant beats more.',
    'Tokens are money: APIs charge per million tokens, output costs more than input, and thinking tokens count as output.',
    'Non-English text and code often need more tokens, which means higher cost and a fuller desk.'
  ],

  tryIt: {
    title: 'Measure tokens and test the desk',
    time: '15 min',
    intro: '<p>Two quick experiments: one to see tokens in a real tokenizer, one to feel the context window in a real chat.</p>',
    steps: [
      '<b>Real tokenizer:</b> open the OpenAI Tokenizer or Tiktokenizer in your browser. Paste a paragraph of English and note the token count and the words-to-tokens ratio.',
      '<b>The token tax:</b> ask any chatbot to translate that paragraph into Hindi (or another language you know), paste the translation into the same tokenizer, and compare the counts. Write down the ratio.',
      '<b>Odd mistakes:</b> ask a chatbot <i>"Spell the word \'lollipop\' backwards."</i> Then ask <i>"Write each letter of \'lollipop\' on its own line, then reverse the list."</i> Compare reliability.',
      '<b>The desk test:</b> start a new chat and say <i>"My code word is MANGO. Remember it."</i> Paste a long article (or several) and ask questions about it for a while. Then ask <i>"What was my code word?"</i> In a long enough session, see whether it still remembers.',
      '<b>Cost estimate:</b> pick a task you would like to automate (e.g. summarising 50 emails a day). Use the rule of thumb to estimate daily input and output tokens. Then look up one provider\'s current price per million tokens and calculate a monthly cost.'
    ],
    tools: ['OpenAI Tokenizer (free, web)', 'Tiktokenizer (free, web)', 'ChatGPT / Gemini / Claude (free)'],
    outro: '<p>Write your token ratios and your monthly cost estimate in the notes below. You will reuse them when choosing models in <a href="#/m/2.5">Module 2.5</a>.</p>'
  },

  quiz: [
    { q: 'Roughly how many tokens is a 750-word English essay?', options: ['About 75', 'About 1,000', 'About 7,500', 'About 750,000'], answer: 1, explain: '1 token ≈ ¾ word, so 750 words ≈ 1,000 tokens.' },
    { q: 'Deep into a long chat, the assistant ignores a formatting rule you gave in your first message. What is the best response?', options: ['Assume the model is broken and switch apps', 'Raise the temperature', 'Write your next message in capital letters', 'Restate the rule (or start a new chat with a short summary), since early messages may have been dropped, summarised or lost in the middle'], answer: 3, explain: 'Long chats can outgrow or clutter the context window. Restating key instructions or starting fresh with a summary puts them back on the desk.' },
    { q: 'Why does a model often struggle to count how many times a letter appears in a word?', options: ['It sees tokens (word-pieces) rather than individual letters', 'It has not been trained on English', 'Its context window is too small for one word', 'Counting is blocked for safety reasons'], answer: 0, explain: 'The word reaches the model as a few token IDs, so the letters inside each piece are not directly visible to it.' },
    { q: 'On a typical pay-per-token API, which part of a request usually costs the most per token?', options: ['The system prompt', 'Input tokens from uploaded files', 'Output tokens, including any hidden thinking tokens', 'Tokens are always free once you have an API key'], answer: 2, explain: 'Output tokens are usually several times pricier than input tokens, and reasoning models\' thinking tokens are normally billed as output.' },
    { q: 'You are building a support chatbot for Hindi-speaking users. What should you expect compared with an English version?', options: ['Exactly the same token counts', 'More tokens for the same meaning, so higher cost and a context window that fills sooner', 'Fewer tokens, because Hindi words are shorter', 'Hindi cannot be tokenized at all'], answer: 1, explain: 'Many tokenizers split Hindi into more tokens per word. Measure with the real tokenizer and budget accordingly.' }
  ],

  terms: ['token', 'tokenizer', 'token-vocabulary', 'byte-pair-encoding', 'context-window', 'lost-in-the-middle', 'inference', 'llm'],

  resources: [
    { title: 'OpenAI Tokenizer', url: 'https://platform.openai.com/tokenizer', type: 'tool', note: 'Paste text and see exactly how GPT models split it into tokens.' },
    { title: 'Andrej Karpathy — Let\'s build the GPT Tokenizer', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', type: 'video', note: 'A long, hands-on deep dive into BPE and why tokenization causes so many LLM quirks. Watch the first 20 minutes for intuition.' },
    { title: 'Google — Understand and count tokens (Gemini API)', url: 'https://ai.google.dev/gemini-api/docs/tokens', type: 'doc', note: 'Official guide to tokens, including how images, audio and video are counted.' },
    { title: 'Anthropic — Context windows (Claude docs)', url: 'https://docs.claude.com/en/docs/build-with-claude/context-windows', type: 'doc', note: 'Clear diagrams of how conversation turns and thinking fill the context window.' },
    { title: 'Chroma — Context Rot: How increasing input tokens impacts LLM performance', url: 'https://research.trychroma.com/context-rot', type: 'article', note: 'Research showing why a fuller window often means worse answers.' }
  ],

  connects: ['1.2', '1.7', '1.8', '2.2', '3.6', '4.3', '7.2']
});
