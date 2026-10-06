/* Module 1.5 — Temperature & randomness: why answers differ */
(function () {
  // Shared demo data: logits for "For breakfast today I had …" (illustrative numbers)
  const BF = [['idli', 5.0, 'blue'], ['dosa', 4.7, 'purple'], ['poha', 4.3, 'pink'], ['toast', 4.0, 'orange'], ['eggs', 3.6, 'green'], ['pizza', 1.8, 'red']];
  const SUM = [['4', 9.5, 'green'], ['four', 4.2, 'blue'], ['5', 3.0, 'red'], ['?', 2.2, 'slate'], ['22', 1.5, 'orange']];
  const soft = (arr, T) => { const ex = arr.map((a) => Math.exp(a[1] / T)); const s = ex.reduce((x, y) => x + y, 0); return ex.map((e) => e / s); };
  const pct = (v) => (v >= 0.995 ? '100%' : v < 0.005 ? '<1%' : Math.round(v * 100) + '%');
  const topK = (p, k) => { const kept = p.map((v, i) => (i < k ? v : 0)); const s = kept.reduce((a, b) => a + b, 0); return kept.map((v) => v / s); };
  const topP = (p, P) => { let acc = 0; const kept = p.map((v) => { if (acc >= P) return 0; acc += v; return v; }); const s = kept.reduce((a, b) => a + b, 0); return kept.map((v) => v / s); };
  const barsOf = (arr, p, title) => D.bars(arr.map((a, i) => ({ t: a[0], v: +(p[i] * 100).toFixed(1), c: p[i] === 0 ? 'slate' : a[2] })), { max: 100, unit: '', fmt: (v) => (v === 0 ? '✂ cut' : v < 0.5 ? '<1%' : Math.round(v) + '%'), title: title, labelW: 110, barW: 380 });

  const signature = (function () {
    const temps = [[0.2, 'Cold · T = 0.2', 'focused, predictable', 'blue'], [1.0, 'Default · T = 1.0', 'natural variety', 'green'], [1.8, 'Hot · T = 1.8', 'flat and risky', 'red']];
    const W = 840, H = 290, pw = 250, gap = 20, x0 = (W - (3 * pw + 2 * gap)) / 2, top = 40, chartH = 150, bw = 30, bg = 8;
    let s = D.text(W / 2, 18, 'Prompt: "For breakfast today I had …"  →  chance of each next word', 'd-text');
    temps.forEach(([T, title, sub, c], k) => {
      const px = x0 + k * (pw + gap);
      s += `<g class="d-c-${c}"><rect x="${px}" y="${top}" width="${pw}" height="${H - top - 8}" rx="14" class="d-area"/></g>`;
      s += D.text(px + pw / 2, top + 18, title, 'd-text');
      s += D.text(px + pw / 2, top + 36, sub, 'd-sub');
      const p = soft(BF, T), barsW = BF.length * bw + (BF.length - 1) * bg, bx0 = px + (pw - barsW) / 2, base = top + 58 + chartH;
      p.forEach((v, i) => {
        const h = Math.max(2, v * chartH), x = bx0 + i * (bw + bg);
        s += `<g class="d-c-${BF[i][2]}"><rect x="${x}" y="${(base - h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="4" class="d-dot"/></g>`;
        s += D.text(x + bw / 2, base - h - 9, pct(v), 'd-label');
        s += D.text(x + bw / 2, base + 14, BF[i][0], 'd-sub');
      });
    });
    return D.svg(W, H, s, 'The same probabilities at three temperatures');
  })();

  const pT1 = soft(BF, 1), pSum = soft(SUM, 1);

  HUB.registerModule({
    id: '1.5',
    title: 'Temperature & randomness: why answers differ',
    tagline: 'Ask the same question twice and you get two different answers. That is not a bug: the model rolls weighted dice for every [[token]], and a dial called [[temperature]] decides how wild those dice are.',
    updated: 'October 2026',

    why: {
      era: 'Early 2023',
      html: `<p>One of the first things ChatGPT users noticed was the <b>Regenerate</b> button: click it and the same question produced a new answer. People wondered whether the AI was unreliable, or even "changing its mind". Developers using the API saw two mysterious settings, <code>temperature</code> and <code>top_p</code>, and had no idea what to set them to. The explanation goes back to [[m:1.2]]: a model doesn't produce <i>an</i> answer, it produces <b>probabilities</b>, and something has to choose from them. Understanding that choice tells you when variation is a gift (brainstorming, writing), when it is a risk (facts, data extraction), and what you can do about it, with or without a settings panel.</p>`
    },

    analogy: {
      title: 'A chef deciding what to cook tonight',
      html: `<p>A chef has a list of dishes they could make, each with a "how fitting is this tonight?" score. A <b>cautious chef</b> (low temperature) always cooks the top dish, so every visit tastes the same. A <b>balanced chef</b> (medium temperature) usually picks a favourite but sometimes surprises you with the second or third choice. A <b>reckless chef</b> (high temperature) treats all dishes almost equally, so one night you might get pickle ice cream.</p><p>Notice what temperature does <i>not</i> do: it doesn't teach the chef new recipes or make them more skilled. It only changes <b>how adventurously they choose</b> from what they already know.</p>`
    },

    diagram: {
      title: 'One dial, three personalities: the same probabilities at different temperatures',
      svg: signature,
      caption: '<b>Illustrative numbers.</b> The model\'s underlying scores never change, only the temperature. Cold sharpens the distribution until the favourite wins almost every time. Hot flattens it, so unlikely words like "pizza" get a real chance. In a real model with 100,000+ possible tokens, flattening also lifts thousands of odd tokens that are each tiny but add up.'
    },

    sections: [
      {
        title: 'Why the same question gets different answers',
        html: `<p>Recall the generation loop from [[m:1.2]]. At every step the model outputs a probability for each possible next token, for example <i>idli 35%, dosa 26%, poha 17%…</i> Then a small piece of software called the <b>sampler</b> picks one. Most chat apps don't simply take the top word. They <b>[[sampling|sample]]</b>: they roll weighted dice, so "idli" wins about 35% of the time and "poha" about 17% of the time.</p>
        <div class="callout key"><span class="ic">🔑</span><div><b>Variation is designed in.</b> The model computes the same probabilities every time, but the sampler picks differently. Because each picked token becomes part of the input for the next one, one different early word can send the whole answer in a new direction.</div></div>
        <p>Why not always pick the top word? Because it produces flat, repetitive text. Researchers found that human writing is full of words that are <i>likely but not the most likely</i>. Always choosing the single favourite often leads to dull prose or loops like <i>"I think that I think that I think…"</i>. A little randomness makes text sound natural, gives you fresh options when you click regenerate, and lets the model explore different solutions.</p>`
      },
      {
        title: 'Temperature: one dial that reshapes the odds',
        html: `<p><b>[[temperature|Temperature]]</b> is a number, usually between 0 and 2, that the sampler applies <i>before</i> rolling the dice:</p>
        <ul>
          <li><b>Low (close to 0):</b> differences get exaggerated. The favourite becomes overwhelmingly likely. Output is focused, consistent and a bit plain.</li>
          <li><b>Around 1:</b> the model's natural probabilities are used as they are. This is the default for most models.</li>
          <li><b>High (above about 1.3):</b> differences get squashed. Unlikely words become competitive. Output is surprising at first, then chaotic, then nonsense.</li>
        </ul>
        <p>Try it. Pick a prompt, move the slider, and sample 20 times at different temperatures. Watch how the tally changes:</p>
        <div data-widget="dial"></div>
        <p>Two things to notice. For <i>"2 + 2 ="</i> the model is so confident that even a fairly high temperature rarely changes the answer. For the breakfast prompt, many answers are reasonable, so temperature makes a big visible difference. <b>Temperature matters most when the model is genuinely unsure.</b></p>
        <div class="callout warn"><span class="ic">⚠️</span><div><b>Temperature is not an intelligence or creativity knob.</b> It can't add knowledge or ideas the model doesn't have. "Creative" output at high temperature is simply less likely output, and past a point less likely means worse.</div></div>`
      },
      {
        title: 'Where the dials sit, and the special case of temperature 0',
        html: `<p>Here is the full path from the model's raw scores to the word you see. Everything after the neural network is just a few lines of arithmetic, which is why these settings are cheap to change:</p>
        ${D.fig(D.flow([
          { t: 'Raw scores', s: 'one logit per token', c: 'slate', icon: '🧠' },
          { t: '÷ temperature', s: 'sharpen or flatten', c: 'orange', icon: '🌡️' },
          { t: 'Softmax', s: 'scores → probabilities', c: 'purple', icon: '📊' },
          { t: 'Filter', s: 'top-k / top-p cut the tail', c: 'pink', icon: '✂️' },
          { t: 'Roll the dice', s: 'pick one token', c: 'green', icon: '🎲' }
        ], { w: 150 }), 'The sampling pipeline that runs for every single token. Temperature and the filters are settings, not part of the trained model.')}
        <p>At <b>temperature 0</b>, the dice are thrown away and the sampler simply takes the most likely token every time. This is called <b>[[greedy-decoding|greedy decoding]]</b>.</p>
        ${D.compare([
          { t: 'Greedy (temperature 0)', icon: '🎯', c: 'blue', items: ['Always takes the top token', 'Nearly the same answer every run', 'Good for extraction, classification, tests', 'Risk: bland, repetitive, can loop'] },
          { t: 'Sampling (temperature > 0)', icon: '🎲', c: 'green', items: ['Rolls weighted dice each step', 'Different wording each run', 'Good for writing, ideas, conversation', 'Risk: occasional odd or wrong turn'] }
        ])}
        <p>Greedy is not the same as <i>correct</i>. If the model's top guess is wrong, temperature 0 will give you the same wrong answer every time, just very consistently.</p>`
      },
      {
        title: 'Top-k and top-p: cutting off the long tail',
        html: `<p>A model's vocabulary has 100,000 or more tokens ([[m:1.3]]). Most get tiny probabilities, like 0.001%, but there are so many of them that together they can add up to a few percent. Pick one of those by bad luck and the answer derails, because the model then treats the strange word as intentional and continues from it:</p>
        ${D.fig(D.flow([
          { t: 'One unlucky pick', s: '"For breakfast I had… gravel"', c: 'red', icon: '🎲' },
          { t: 'Model plays along', s: 'it continues as if that was meant', c: 'orange', icon: '🤷' },
          { t: 'Drift compounds', s: 'each token builds on the last', c: 'yellow', icon: '🌀' },
          { t: 'Derailed answer', s: 'off-topic or nonsense', c: 'slate', icon: '💥' }
        ], { w: 165 }), 'Why rare tokens are dangerous. There is no "undo" in generation: every token becomes part of the input for the next one.')}
        <p>Two common filters remove the tail <i>before</i> the dice are rolled:</p>
        <ul>
          <li><b>[[top-k|Top-k]]</b>: keep only the <i>k</i> most likely tokens (for example the top 40) and discard the rest.</li>
          <li><b>[[top-p|Top-p]]</b> (nucleus sampling): keep the smallest group of top tokens whose probabilities add up to <i>p</i> (for example 90%). The shortlist <b>adapts</b>: it is tiny when the model is confident and larger when it is unsure.</li>
        </ul>
        <p>Step through what each filter does to real-looking distributions:</p>
        <div data-widget="filters"></div>
        <div class="callout tip"><span class="ic">💡</span><div><b>Rule of thumb from the API docs:</b> adjust temperature <i>or</i> top-p, not both at once. Providers usually choose sensible defaults for the filters, so most people only ever touch temperature, if anything.</div></div>`
      },
      {
        title: 'Choosing settings in practice (2026)',
        html: `<p>For classic chat models, the usual guidance is to match the setting to how many right answers the task has:</p>
        ${D.fig(D.spectrum('Exactly one right answer', 'Many good answers', [
          { t: 'Extract data / classify', pos: 0.05, s: '≈ 0–0.2', c: 'blue' },
          { t: 'Code, facts, summaries', pos: 0.28, s: '≈ 0.2–0.5', c: 'cyan' },
          { t: 'Everyday chat', pos: 0.55, s: 'default ≈ 0.7–1.0', c: 'green' },
          { t: 'Brainstorm, fiction', pos: 0.82, s: '≈ 1.0–1.3', c: 'orange' }
        ]), 'Traditional starting points, not laws. Above about 1.5 most models start producing nonsense.')}
        <div class="callout warn"><span class="ic">⚠️</span><div><b>Reasoning models change this advice.</b> Reasoning models ([[m:2.3]]) learned to think while sampling at their default temperature, and their long chains of thought depend on it. Several 2025–26 reasoning APIs ignore or reject custom temperature values. Google explicitly recommends keeping Gemini 3 models at the default of 1.0, warning that lower values can cause looping or worse performance on maths and reasoning. <b>For reasoning models, leave temperature alone and steer with your prompt.</b></div></div>
        <p>Also, you may not have a dial at all. Consumer apps like ChatGPT, Gemini and Claude don't show temperature controls. The settings appear in developer tools like Google AI Studio and in the APIs ([[m:4.1]]).</p>
        <p>Test yourself: where would you set things for each job?</p>
        <div data-widget="pick"></div>`
      },
      {
        title: 'Using randomness as a tool, even without a slider',
        html: `<p>Randomness is something you can use deliberately, not just a quirk to tolerate:</p>
        <ul>
          <li><b>Regenerate for options.</b> For names, headlines, or ways to explain something, regenerate 3 times and combine the best parts. You are sampling the space of good answers.</li>
          <li><b>Ask several times to check facts.</b> If you ask a factual question in three fresh chats and get the same answer, that is a good sign. If the answers disagree, the model is unsure and may be making things up. This idea, called <i>self-consistency</i>, is a cheap early warning for [[hallucination|hallucinations]] ([[m:1.6]]).</li>
          <li><b>Steer with words.</b> In chat apps without a dial, prompts do the job. <i>"Give me 10 wildly different, unusual ideas"</i> pushes toward variety. <i>"Answer precisely and conservatively; say 'I don't know' if unsure"</i> pushes toward focus.</li>
          <li><b>Builders: lock it down where needed.</b> For pipelines that must be repeatable (tagging data, grading, tests), use a low temperature on non-reasoning models, a fixed output format, and a <code>seed</code> parameter if the API offers one.</li>
        </ul>
        <div class="callout key"><span class="ic">🔑</span><div><b>The practical summary:</b> variation is a feature for creative work and a warning signal for factual work. Better prompts beat fiddling with dials almost every time.</div></div>`
      }
    ],

    widgets: {
      dial: {
        type: 'nextToken',
        title: 'Turn the temperature dial and sample',
        scenarios: [
          { prompt: 'For breakfast today I had', next: BF.map((a) => [a[0], a[1]]).concat([['gravel', -1.0]]) },
          { prompt: 'The detective opened the door and saw a', next: [['body', 5.2], ['man', 5.0], ['letter', 4.8], ['shadow', 4.7], ['cat', 4.2], ['dragon', 2.0], ['sandwich', 1.0]] },
          { prompt: 'Translate to Hindi: "Thank you" →', next: [['धन्यवाद', 9.0], ['शुक्रिया', 7.4], ['थैंक', 4.5], ['नमस्ते', 3.0]] },
          { prompt: '2 + 2 =', next: SUM.map((a) => [a[0], a[1]]) }
        ]
      },
      filters: {
        type: 'stepper',
        title: 'What top-k and top-p keep (temperature 1)',
        steps: [
          { title: '1 · The full distribution', html: '<p>For <i>"For breakfast today I had…"</i> the model spreads its bets over several good options, plus a small chance of "pizza". (A real model would also have thousands of tiny-probability tokens, omitted here.)</p>', diagram: barsOf(BF, pT1, 'No filter') },
          { title: '2 · Top-k = 3', html: '<p>Keep only the 3 most likely tokens, then rescale them so they add up to 100%. "toast", "eggs" and "pizza" are cut, even though toast and eggs were perfectly reasonable. Top-k uses a <b>fixed</b> shortlist size, whatever the situation.</p>', diagram: barsOf(BF, topK(pT1, 3), 'Top-k = 3') },
          { title: '3 · Top-p = 0.9', html: '<p>Add up tokens from the top until you reach 90%: idli + dosa + poha + toast ≈ 90%. Keep those four and cut the rest. Only the unlikely tail ("eggs", "pizza") is removed, and the reasonable options survive.</p>', diagram: barsOf(BF, topP(pT1, 0.9), 'Top-p = 0.9') },
          { title: '4 · Top-p when the model is confident', html: '<p>For <i>"2 + 2 ="</i> the model gives "4" over 99%. Top-p = 0.9 keeps <b>only "4"</b>: the shortlist shrinks automatically. Top-k = 3 would still keep three options here, including the wrong "5". This adaptiveness is why top-p (or a similar filter) is the most common default.</p>', diagram: barsOf(SUM, topP(pSum, 0.9), 'Top-p = 0.9 on "2 + 2 ="') }
        ]
      },
      pick: {
        type: 'classify',
        title: 'Low, default, or high? Sort each task',
        buckets: ['🧊 Low (≈ 0–0.3)', '⚖️ Leave at default', '🔥 Higher (≈ 1.0–1.3)'],
        items: [
          { t: 'Pulling names, dates and amounts out of 500 invoices into a table', bucket: 0, why: 'One correct answer per field, and you want the same result every run. (Assuming a non-reasoning model.)' },
          { t: 'Asking a reasoning model to solve a tricky maths problem', bucket: 1, why: 'Reasoning models are trained to think at their default temperature. Lowering it can cause loops or worse answers. Steer with the prompt instead.' },
          { t: 'Brainstorming 30 names for a new chai brand', bucket: 2, why: 'Many good answers exist and you want variety. Slightly higher temperature (plus asking for "unusual" ideas) helps.' },
          { t: 'Labelling customer reviews as positive, negative or neutral', bucket: 0, why: 'Classification should be consistent: the same review should get the same label every time.' },
          { t: 'Everyday chat: explaining a concept, drafting an email', bucket: 1, why: 'The defaults are tuned for exactly this kind of general use.' },
          { t: 'Writing a surreal short story with unexpected twists', bucket: 2, why: 'Surprise is the goal. Just don\'t push past about 1.5, where text turns into nonsense.' },
          { t: 'Generating test answers for an automated grading pipeline', bucket: 0, why: 'Repeatability matters for pipelines and tests. Add a fixed format and a seed if the API supports it.' }
        ]
      }
    },

    deeper: [
      {
        title: 'The maths of temperature (one line)',
        html: `<p>The model outputs logits <i>z</i> (raw scores). Probabilities are computed with softmax: <code>p<sub>i</sub> = exp(z<sub>i</sub> / T) / Σ exp(z<sub>j</sub> / T)</code>. Dividing by a small <i>T</i> makes the gaps between scores bigger, so the top token dominates. Dividing by a large <i>T</i> shrinks the gaps, so all tokens look alike. With the breakfast numbers above, "idli" and "dosa" differ by 0.3 in score. At T = 1 that is a ratio of about 1.35 : 1. At T = 0.2 the gap becomes 1.5, a ratio of about 4.5 : 1. At T → 0 only the top token survives (greedy). The name comes from physics, where the same formula describes how particles spread across energy levels as a system heats up.</p>`
      },
      {
        title: 'Why temperature 0 isn\'t perfectly repeatable',
        html: `<p>You might expect greedy decoding to give identical output every time. In practice, hosted models sometimes vary slightly even at temperature 0. The reason is in the hardware: GPUs add up numbers in slightly different orders depending on how many other requests are processed in the same batch, and with floating-point numbers the order affects the last digits. When two tokens are nearly tied, a tiny difference can flip the choice, and the rest of the answer follows. Research in 2025 (for example from Thinking Machines Lab) showed this can be fixed with special "batch-invariant" computation, at some cost in speed. Some APIs offer a <code>seed</code> parameter for "best-effort" repeatability. Design systems that tolerate small variations.</p>`
      },
      {
        title: 'Beyond top-k and top-p: min-p, penalties and beam search',
        html: `<p>Other decoding tricks you may see in settings panels:</p><ul><li><b>Min-p</b> (2024): keep tokens whose probability is at least some fraction of the top token's probability. It adapts like top-p and is popular in open-model tools for creative writing at higher temperatures.</li><li><b>Frequency and presence penalties</b>: reduce the score of tokens that have already appeared, to discourage repetition.</li><li><b>Beam search</b>: explore several candidate sentences in parallel and keep the best-scoring overall. It was popular in machine translation, but for open-ended text it tends to produce bland, repetitive output. The 2019 paper that introduced top-p ("The Curious Case of Neural Text Degeneration") showed why.</li></ul>`
      },
      {
        title: 'Why reasoning models want their default temperature',
        html: `<p>Reasoning models are trained with reinforcement learning ([[m:1.4]]): they generate many attempts at a problem by sampling, and attempts that reach correct answers are rewarded. Their habits of exploring, checking and backtracking were learned under the sampling settings used in training. Push the temperature much lower and the model can get stuck repeating the same line of thought. Push it higher and long chains of reasoning drift off course. That is why providers increasingly fix or strongly recommend the default for these models, and why "set temperature to 0 for accuracy" is outdated advice for them.</p>`
      }
    ],

    misconceptions: [
      { myth: 'Temperature 0 makes the AI accurate.', truth: 'It makes the AI <b>consistent</b>. If its top guess is wrong, you will get the same wrong answer every time. Accuracy comes from knowledge, context and good prompts.' },
      { myth: 'Higher temperature makes the AI more creative or intelligent.', truth: 'It only makes less likely tokens more likely. A little helps variety; a lot produces nonsense. It adds no new knowledge or ideas.' },
      { myth: 'If I get a different answer each time, the model is broken.', truth: 'Variation is designed in through sampling. Use it: regenerate for options, and treat disagreement on factual questions as a signal to verify.' },
      { myth: 'For important tasks, always set temperature to 0.', truth: 'That was common advice in 2023. For modern reasoning models, providers recommend the default, and lowering it can hurt quality. A clearer prompt usually helps more.' },
      { myth: 'Temperature 0 is fully deterministic.', truth: 'Usually close, but hosted models can still vary slightly because of how GPUs batch and add numbers. Don\'t build systems that depend on byte-identical outputs.' }
    ],

    takeaways: [
      'The model outputs probabilities; a sampler rolls weighted dice to pick each token. That is why answers differ.',
      'Temperature reshapes the odds: low = focused and repeatable, about 1 = natural, high = flat and chaotic.',
      'Temperature 0 (greedy decoding) is consistent, not necessarily correct.',
      'Top-k and top-p cut off the long tail of unlikely tokens. Top-p adapts to how confident the model is.',
      'Low settings suit extraction and classification; higher settings suit brainstorming. Reasoning models should usually stay at their default.',
      'In apps without a dial, steer with your prompt, regenerate for options, and use disagreement between answers as a warning sign.'
    ],

    tryIt: {
      title: 'Turn the dial yourself',
      time: '15 min',
      intro: '<p>You need a free Google account for Google AI Studio. Panel names can change, so look for "Run settings" or a settings icon next to the chat.</p>',
      steps: [
        '<b>Find the dials:</b> Open Google AI Studio and start a new chat prompt. Locate the <b>Temperature</b> slider, and the <b>Top-P</b> setting (often under "Advanced settings"). Note the default values.',
        '<b>Cold:</b> Choose a fast, non-reasoning model if one is available, and set temperature to 0. Ask <i>"Suggest one name for a tea stall near a college. Reply with the name only."</i> Run it 3 times. Are the names identical or nearly identical?',
        '<b>Default and hot:</b> Repeat at 1.0, then at 1.8. Then ask for <i>"a four-line poem about the monsoon"</i> at 1.8. At what point does creativity turn into nonsense?',
        '<b>No dial:</b> In a regular chat app, ask a factual question you know the answer to (for example, <i>"In which year did India launch Chandrayaan-3?"</i>) in 3 fresh chats. Then ask a creative question 3 times. Which one varied, and what does that tell you about trusting a single answer?',
        '<b>Steer with words:</b> In the chat app, ask for 5 tea stall names, first with <i>"safe, conventional names"</i> and then with <i>"bizarre, surprising names"</i>. You just did "temperature by prompt".',
        '<b>Reflect:</b> In your notes, write the temperature you would choose for (a) your own study notes summary and (b) a birthday poem, and why.'
      ],
      tools: ['Google AI Studio (free)', 'ChatGPT / Gemini / Claude (free)']
    },

    quiz: [
      { q: 'You ask a chatbot the same question twice and get differently worded answers. What is the main reason?', options: ['The model learned something new between your questions', 'The sampler picks each token randomly according to probabilities, so the path differs each run', 'The servers are overloaded', 'The model has two different personalities'], answer: 1, explain: 'The probabilities are the same each time; sampling picks differently, and each choice changes what follows.' },
      { q: 'What does lowering the temperature towards 0 do?', options: ['Adds more knowledge to the answer', 'Makes the model think longer', 'Makes rare words more likely', 'Makes the most likely token dominate, so output becomes focused and repeatable'], answer: 3, explain: 'Low temperature sharpens the distribution. At 0, the sampler always takes the top token (greedy decoding).' },
      { q: 'A model gives "4" a 99% probability for "2 + 2 =". With top-p = 0.9, which tokens remain as candidates?', options: ['Only "4"', 'The top 3 tokens', 'All tokens, rescaled', 'Every token above 0.9%'], answer: 0, explain: '"4" alone already exceeds 90%, so the nucleus contains just that one token. Top-p shrinks the shortlist when the model is confident.' },
      { q: 'You are building a pipeline that labels 10,000 support tickets by category using a non-reasoning model. Which setup fits best?', options: ['Temperature 1.8 for variety', 'Temperature 1.0 and regenerate each ticket until the label looks right', 'Low temperature (≈ 0–0.2) with a fixed list of allowed labels', 'Top-k = 1,000 for coverage'], answer: 2, explain: 'Classification has one right answer per item and should be consistent. Low temperature plus a constrained format gives repeatable labels.' },
      { q: 'A colleague says, "Always set temperature to 0 when using reasoning models for maths, it makes them more accurate." What is the best response?', options: ['Agree: temperature 0 always maximises accuracy', 'Disagree: providers recommend the default for reasoning models, and lowering it can cause loops or worse answers', 'Agree, but only for top-p models', 'Disagree: reasoning models need temperature 2'], answer: 1, explain: 'Reasoning models learned to think at their default sampling settings. Google, for example, recommends keeping Gemini 3 at 1.0.' }
    ],

    terms: ['temperature', 'sampling', 'greedy-decoding', 'top-k', 'top-p', 'logits-softmax', 'next-token-prediction', 'token-vocabulary'],

    resources: [
      { title: 'Hugging Face — How to generate text: using different decoding methods', url: 'https://huggingface.co/blog/how-to-generate', type: 'article', note: 'Classic visual walkthrough of greedy search, beam search, top-k and top-p sampling, with charts like the ones in this module.' },
      { title: 'Google — Gemini 3 developer guide (temperature section)', url: 'https://ai.google.dev/gemini-api/docs/gemini-3', type: 'doc', note: 'Official guidance to keep reasoning-era Gemini models at the default temperature of 1.0, and why.' },
      { title: 'Holtzman et al. — The Curious Case of Neural Text Degeneration', url: 'https://arxiv.org/abs/1904.09751', type: 'paper', note: 'The 2019 paper that introduced nucleus (top-p) sampling. The first two figures show why always picking the top word fails.' },
      { title: 'Thinking Machines Lab — Defeating Nondeterminism in LLM Inference', url: 'https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/', type: 'article', note: 'Why temperature 0 still varies on real servers, and how it can be fixed. Technical, but the introduction is readable.' },
      { title: 'Google AI Studio', url: 'https://aistudio.google.com/', type: 'tool', note: 'Free playground with temperature and top-p controls. Used in this module\'s Try it exercise.' }
    ],

    connects: ['1.2', '1.3', '1.6', '2.3', '3.4', '4.1']
  });
})();
