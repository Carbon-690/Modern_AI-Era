/* Module 1.1 — AI vs ML vs Deep Learning vs Generative AI */
HUB.registerModule({
  id: '1.1',
  title: 'AI vs ML vs Deep Learning vs Generative AI',
  tagline: 'Four buzzwords, one picture: they are not rivals, they are rings inside each other. Learn the rings once and every AI headline becomes easy to place.',
  updated: 'October 2026',

  why: {
    era: '1956 → 2022',
    html: `<p>Since the [[chatgpt-moment|ChatGPT moment]] in late 2022, almost every product calls itself "AI": phone cameras, washing machines, banking apps and chatbots alike. News articles swap the words <b>AI</b>, <b>machine learning</b>, <b>deep learning</b> and <b>generative AI</b> as if they meant the same thing. They don't. Each word was coined in a different decade to name a different idea, and each idea is <b>inside</b> the one before it. If you know which ring a product sits in, you know roughly what it can do, how it was built, and how it is likely to fail.</p>`
  },

  analogy: {
    title: 'Russian dolls (or: vehicle → car → electric car → self-driving car)',
    html: `<p>Think of the word <b>vehicle</b>. Every car is a vehicle, but not every vehicle is a car (bicycles, trains). Every electric car is a car, but not every car is electric. Every self-driving electric car is electric, but most electric cars don't drive themselves. AI words work the same way: <b>AI</b> is the big doll, <b>machine learning</b> sits inside it, <b>deep learning</b> sits inside that, and <b>generative AI</b> is the smallest, newest doll in the middle. ChatGPT is generative AI, so it is <i>also</i> deep learning, machine learning and AI, all at once.</p>`
  },

  diagram: {
    title: 'The nested rings of modern AI',
    svg: D.nested([
      { t: 'Artificial Intelligence', s: 'any technique that makes machines act smart (1956 →)', c: 'slate', icon: '🤖' },
      { t: 'Machine Learning', s: 'systems that learn rules from data instead of being told (1959 →)', c: 'blue', icon: '📈' },
      { t: 'Deep Learning', s: 'machine learning with many-layered neural networks (2012 boom)', c: 'purple', icon: '🧠' },
      { t: 'Generative AI', s: 'creates new text, images, audio, code (2022 boom)', c: 'pink', icon: '✨' },
      { t: 'LLMs', s: 'generative models for language: ChatGPT, Gemini, Claude', c: 'orange', icon: '💬' }
    ], { w: 640 }),
    caption: 'Each ring is a <b>subset</b> of the ring around it. An LLM is generative AI, which is deep learning, which is machine learning, which is AI. The reverse is not true: most AI is not generative.'
  },

  sections: [
    {
      title: 'Four words, one picture',
      html: `<p>Here is each ring in one plain sentence. Read them from the outside in.</p>
      <table>
        <tr><th>Ring</th><th>Plain meaning</th><th>Everyday example</th></tr>
        <tr><td>🤖 [[artificial-intelligence|Artificial intelligence]]</td><td>Any method that makes a computer do something we would call "smart" if a person did it.</td><td>A chess program, Google Maps finding the fastest route, a spam filter, ChatGPT.</td></tr>
        <tr><td>📈 [[machine-learning|Machine learning]]</td><td>AI where the computer <b>learns the rules from examples</b> instead of a programmer writing them.</td><td>A bank model that learned which transactions look like fraud from millions of past cases.</td></tr>
        <tr><td>🧠 [[deep-learning|Deep learning]]</td><td>Machine learning using big [[neural-network|neural networks]] with many layers. Great with messy data such as photos, sound and text.</td><td>Face unlock on your phone, voice typing, Google Photos finding all pictures of your dog.</td></tr>
        <tr><td>✨ [[generative-ai|Generative AI]]</td><td>Deep learning models that <b>create</b> new content instead of only labelling or predicting.</td><td>ChatGPT writing an essay, an app turning a sentence into an image, AI music and video tools.</td></tr>
        <tr><td>💬 [[llm|LLMs]]</td><td>Generative models trained on huge amounts of text that write by predicting the next word piece.</td><td>ChatGPT, Gemini, Claude, Llama, DeepSeek.</td></tr>
      </table>
      <div class="callout key"><span class="ic">🔑</span><div><b>The one rule to remember:</b> going inward, every ring is <i>more specific</i> and <i>newer</i>. "AI" tells you almost nothing about how a product works. "Generative AI built on an LLM" tells you a lot: it was trained on data, it predicts plausible output, and it can [[hallucination|hallucinate]].</div></div>
      <p>This is why careful people ask <i>"what kind of AI?"</i> when they hear the word. A rule-based chess engine from the 1990s and ChatGPT are both "AI", but they share almost nothing in how they are built, what they are good at, or how they fail.</p>`
    },
    {
      title: 'The big flip: from writing rules to learning rules',
      html: `<p>For decades, most AI was <b>rule-based</b>. Experts sat with programmers and wrote thousands of <code>if … then …</code> rules: <i>"if the email contains 'lottery' and 'urgent', mark it spam."</i> These "expert systems" worked in narrow areas, but they broke whenever the world did something the rule-writers had not imagined. Spammers simply wrote "l0ttery".</p>
      <p>[[machine-learning|Machine learning]] flips the process. Instead of giving the computer rules, you give it <b>examples with answers</b> (thousands of emails already marked "spam" or "not spam") and it works out the rules itself. Those examples are called [[training-data|training data]].</p>
      ${D.fig(D.compare([
        { t: 'Traditional programming', icon: '✍️', c: 'slate', s: 'humans write the rules', items: ['<b>Input:</b> rules + data', '<b>Output:</b> answers', 'Predictable and easy to explain', 'Breaks on situations nobody wrote a rule for', 'Example: a tax calculator, a GPS route planner'] },
        { t: 'Machine learning', icon: '📈', c: 'blue', s: 'the computer finds the rules', items: ['<b>Input:</b> data + answers (examples)', '<b>Output:</b> rules (a trained model)', 'Handles messy, fuzzy patterns', 'Only as good as its examples; can be wrong in surprising ways', 'Example: fraud detection, face unlock, ChatGPT'] }
      ]), 'The flip that defines machine learning: you supply examples and answers, and the machine produces the rules.')}
      <p>Once trained, the model is used on new inputs it has never seen. Training is the expensive "studying" phase. Using the model afterwards is the cheap "taking the exam" phase.</p>
      ${D.fig(D.flow([
        { t: 'Examples', s: 'emails marked spam / not spam', c: 'cyan', icon: '📚', edge: 'train' },
        { t: 'Learning algorithm', s: 'adjusts numbers to reduce mistakes', c: 'blue', icon: '⚙️', edge: 'produces' },
        { t: 'Trained model', s: 'the learned "rules" as numbers', c: 'purple', icon: '🧩', edge: 'use on' },
        { t: 'New email', s: '→ "92% spam"', c: 'green', icon: '📨' }
      ], { w: 150 }), 'The machine-learning workflow. The "rules" end up as millions or billions of numbers called [[parameter|parameters]], not as readable sentences.')}
      <div class="callout tip"><span class="ic">💡</span><div><b>Why this matters to you:</b> everything a learned model knows came from its examples. Biased, outdated or missing examples give biased, outdated or missing knowledge. This single fact explains a large share of AI's strange behaviour, from knowledge cutoffs to stereotypes.</div></div>`
    },
    {
      title: 'Three ways machines learn (and the trick that made LLMs possible)',
      html: `<p>Machine learning has a few classic "teaching styles". You don't need the maths, but knowing the styles helps you understand how ChatGPT was built in [[m:1.4]].</p>
      <div data-widget="learnStyles"></div>
      <p>The breakthrough behind LLMs is the last tab, [[self-supervised-learning|self-supervised learning]]. Labelling data by hand is slow and expensive. But any text already contains its own answers: hide the next word, ask the model to guess it, then reveal it. That turns the whole internet into free practice questions, which is exactly the [[next-token-prediction|next-token prediction]] you'll study in [[m:1.2]].</p>
      <div class="callout example"><span class="ic">📝</span><div><b>Exam-prep analogy.</b> <b>Supervised</b> = solving past papers with an answer key. <b>Unsupervised</b> = sorting a pile of questions into topics without being told the topics. <b>Reinforcement</b> = a mock-test coach who only says "better" or "worse" after each attempt. <b>Self-supervised</b> = covering the next line of your textbook with your hand and guessing it, millions of times.</div></div>`
    },
    {
      title: 'Deep learning: why "deep", and why 2012 changed everything',
      html: `<p>A [[neural-network|neural network]] is a stack of layers made of simple maths units, loosely inspired by brain cells. Each layer takes numbers in, transforms them, and passes them on. "Deep" just means <b>many layers</b>, from a handful to more than a hundred.</p>
      <p>Why does depth help? Each layer can build on what the layer below found. In an image model, early layers learn to spot edges, middle layers combine edges into shapes, and later layers combine shapes into objects. Nobody programs those stages. They emerge from training.</p>
      ${D.fig(D.layers([
        { t: 'Output', s: '"It\'s a cat (97%)"', c: 'green', icon: '✅' },
        { t: 'Deep layers', s: 'whole objects: faces, ears, whiskers', c: 'purple', icon: '🐱' },
        { t: 'Middle layers', s: 'shapes and textures: circles, fur, stripes', c: 'blue', icon: '🔷' },
        { t: 'Early layers', s: 'simple edges and colour blobs', c: 'cyan', icon: '➖' },
        { t: 'Input', s: 'raw pixels: just a grid of numbers', c: 'slate', icon: '🔢' }
      ], { brackets: [{ from: 1, to: 3, label: 'learned automatically', c: 'purple' }] }), 'Read bottom to top. Each layer turns simpler patterns into richer ones. Language models do the same with words: letters → words → phrases → meaning.')}
      <p>Neural networks are an old idea (1950s–80s), but for decades they were too slow and too data-hungry to beat other methods. Around <b>2012</b> three ingredients finally came together. That year a deep network called AlexNet won the ImageNet image-recognition contest by a huge margin, and the deep-learning boom began.</p>
      ${D.fig(D.flow([
        { t: 'Big data', s: 'the internet: billions of photos and pages', c: 'cyan', icon: '🌐' },
        { t: 'Fast chips', s: 'GPUs built for games do the maths in parallel', c: 'orange', icon: '🎮' },
        { t: 'Better methods', s: 'training tricks that make deep stacks work', c: 'blue', icon: '🛠️' },
        { t: 'Deep learning boom', s: 'vision, speech, translation → LLMs', c: 'purple', icon: '🚀' }
      ], { w: 150 }), 'The same three ingredients, scaled up enormously, still drive progress in 2026: more data, more compute, smarter methods.')}
      <p>In 2017 Google researchers introduced the [[m:1.7|Transformer]] design, a kind of deep network that is very good with sequences such as sentences. Almost every modern LLM is a Transformer.</p>`
    },
    {
      title: 'Generative vs predictive: making vs judging',
      html: `<p>Before 2022, most deep learning was <b>predictive</b> (often called <i>discriminative</i>): it looked at something and gave a label or a number. <i>Is this a cat? Is this transaction fraud? What will this house sell for?</i> [[generative-ai|Generative AI]] does the opposite job: it <b>produces new content</b> that looks like the data it learned from.</p>
      ${D.fig(D.compare([
        { t: 'Predictive AI (judges)', icon: '🔍', c: 'blue', s: 'input → label or number', items: ['"Is this X-ray showing a tumour?" → yes / no', '"Will this customer cancel?" → 73%', '"Which song next?" → a ranked list', 'Output is short and easy to check', 'Most AI in apps before 2022'] },
        { t: 'Generative AI (makes)', icon: '✨', c: 'pink', s: 'prompt → brand-new content', items: ['"Write a cover letter" → a full letter', '"A tiger reading a newspaper, watercolour" → an image', '"Turn this text into speech" → audio', 'Output is long, creative and harder to check', 'The wave that began in 2022'] }
      ]), 'Same deep-learning roots, opposite jobs. Generative models must invent something plausible, which is also why they can invent things that are false.')}
      <p>Generative AI covers several kinds of content. They use different model designs, but all are deep learning:</p>
      <table>
        <tr><th>Creates</th><th>Typical model type</th><th>Examples (e.g.)</th></tr>
        <tr><td>Text and code</td><td>[[llm|Large language models]] (Transformers)</td><td>ChatGPT, Gemini, Claude, Llama</td></tr>
        <tr><td>Images</td><td>Diffusion models (start from noise, clean it up step by step) and others</td><td>Midjourney, Stable Diffusion, image modes inside Gemini and ChatGPT</td></tr>
        <tr><td>Audio and music</td><td>Speech and audio generators</td><td>Text-to-speech voices, AI music apps</td></tr>
        <tr><td>Video</td><td>Video diffusion / Transformer hybrids</td><td>Text-to-video tools from Google, OpenAI and others</td></tr>
      </table>
      <div class="callout warn"><span class="ic">⚠️</span><div><b>The trade-off you inherit:</b> a predictive model can be wrong, but its answer is short and easy to verify. A generative model produces long, fluent output that <i>sounds</i> right whether or not it is. That is why "always verify" is a core skill (see [[m:1.6]]).</div></div>
      <p>Modern frontier systems blur the line. An LLM can classify an email ("spam or not?") simply by <i>writing</i> the answer, and many 2026 models are <b>multimodal</b>: one model reads and writes text, images and audio (see [[m:2.2]]). The rings still hold, though. All of these are generative deep learning.</p>`
    },
    {
      title: 'Test yourself: which ring is it in?',
      html: `<p>Sort each system into the <b>innermost</b> ring it belongs to. Remember: something in an inner ring also belongs to all the outer rings, so always pick the smallest one that fits.</p>
      <div data-widget="ringSort"></div>
      <p>Struggled with one? Ask two questions: <b>(1) Did it learn from examples, or did someone write the rules?</b> <b>(2) Does it create new content, or does it label and predict?</b> Those two questions place almost anything.</p>`
    },
    {
      title: 'Using the map: decode any "AI-powered" label',
      html: `<p>The rings are not trivia. They are a fast way to judge any product, news story or job description that says "AI". Walk through this checker with a product you know.</p>
      <div data-widget="labelDecoder"></div>
      <div class="callout tip"><span class="ic">💡</span><div><b>How this makes you better with AI:</b> once you know a tool is <i>generative</i> and <i>learned from data</i>, you automatically expect three things: it can be wrong while sounding confident, it only knows what was in its training data (up to a cutoff date), and the way you ask changes what you get. The rest of Level 1 explains each of these, starting with [[m:1.2]].</div></div>`
    }
  ],

  widgets: {
    learnStyles: {
      type: 'tabs',
      title: 'Teaching styles of machine learning',
      tabs: [
        { label: '🏷️ Supervised', html: `<p><b>Learning from labelled examples.</b> Every training example comes with the correct answer: this photo → "cat", this email → "spam", this house → ₹85 lakh. The model guesses, compares with the answer, and adjusts.</p><p><b>Used for:</b> spam filters, medical image diagnosis, price prediction, voice-to-text.</p><p><b>Catch:</b> someone has to label all those examples, which is slow and costly.</p>` },
        { label: '🧩 Unsupervised', html: `<p><b>Finding structure without answers.</b> The model gets data with no labels and groups similar things together or spots unusual ones.</p><p><b>Used for:</b> grouping shoppers with similar habits, spotting odd bank transactions, organising news stories by topic.</p><p><b>Catch:</b> the groups it finds may not match what you care about.</p>` },
        { label: '🎮 Reinforcement', html: `<p><b>Learning by trial, error and reward.</b> The model takes actions and gets a score: higher for good outcomes, lower for bad ones. Over many attempts it learns a strategy.</p><p><b>Used for:</b> game-playing AI (e.g. DeepMind\'s AlphaGo, 2016), robotics, and the final polishing of chatbots using human or automatic feedback (RLHF, see <a href="#/m/1.4">Module 1.4</a>). Reasoning models in 2024–26 also rely heavily on it (<a href="#/m/2.3">Module 2.3</a>).</p><p><b>Catch:</b> if the reward is badly designed, the model learns to game the score.</p>` },
        { label: '🙈 Self-supervised', html: `<p><b>The data labels itself.</b> Hide part of the data and ask the model to fill it in: the next word of a sentence, a masked word, a missing patch of an image. The hidden part <i>is</i> the answer, so no human labelling is needed.</p><p><b>Used for:</b> pre-training every modern LLM on trillions of words (<a href="#/m/1.2">Module 1.2</a>, <a href="#/m/1.4">Module 1.4</a>).</p><p><b>Why it matters:</b> it removed the labelling bottleneck, so models could learn from almost the entire public internet. That scale is what made ChatGPT-level ability possible.</p>` }
      ]
    },
    ringSort: {
      type: 'classify',
      title: 'Pick the innermost ring',
      buckets: ['AI, rule-based (no learning)', 'Machine learning (not deep)', 'Deep learning (predictive)', 'Generative AI'],
      items: [
        { t: 'A 1990s chess program that searches moves using hand-written scoring rules', bucket: 0, why: 'Clever search plus rules written by experts. Smart behaviour, but it did not learn from data.' },
        { t: 'A maps app computing the shortest route between two places with a classic algorithm', bucket: 0, why: 'Route-finding algorithms are classic AI search. No training data is needed to find a shortest path.' },
        { t: 'A spreadsheet model that predicts house prices from area, location and age', bucket: 1, why: 'It learns from past sales (machine learning) with a simple model, no deep neural network required.' },
        { t: 'A bank scoring loan applications with a decision-tree model trained on past loans', bucket: 1, why: 'Learned from examples, but decision trees are classic ML, not deep networks.' },
        { t: 'Your phone recognising your face to unlock', bucket: 2, why: 'A deep neural network judges "is this the owner?" It labels, it does not create.' },
        { t: 'A hospital tool that flags possible tumours in X-ray images', bucket: 2, why: 'Deep learning excels at images, and here it predicts a label rather than generating content.' },
        { t: 'ChatGPT drafting a reply to your email', bucket: 3, why: 'An LLM generating brand-new text: generative AI (and therefore also deep learning, ML and AI).' },
        { t: 'An app that turns "a cat astronaut, oil painting" into a picture', bucket: 3, why: 'Image generators (often diffusion models) create new images: generative AI.' },
        { t: 'An old customer-support bot that replies only from a fixed if-then script', bucket: 0, why: 'Scripted rules, no learning. Many "chatbots" before 2022 worked like this.' },
        { t: 'A tool that writes a new song from a text description', bucket: 3, why: 'It creates new audio, so it is generative AI.' }
      ]
    },
    labelDecoder: {
      type: 'decision',
      title: 'Decode an "AI-powered" label',
      start: 'learn',
      nodes: {
        learn: { q: 'Did the system learn its behaviour from examples (data), or did people write its rules?', hint: 'Look for words like "trained on", "model", "learns". Scripted menus and fixed rules mean no learning.', options: [{ label: 'People wrote the rules', next: 'rules' }, { label: 'It learned from data', next: 'create' }, { label: 'I can\'t tell', next: 'unknown' }] },
        create: { q: 'Does it create new content (text, images, audio, code), or does it label, score or recommend?', options: [{ label: 'It creates new content', next: 'genai' }, { label: 'It labels, scores or recommends', next: 'predictive' }] },
        rules: { result: 'Rule-based AI', icon: '📏', html: '<p>Predictable and explainable, but rigid. It fails on cases nobody anticipated. Many "AI" labels on simple products are really this. Test it with unusual inputs: rule systems usually break quickly.</p>' },
        predictive: { result: 'Predictive machine learning / deep learning', icon: '🔍', html: '<p>It learned patterns from data and outputs a label, score or ranking. Ask: what data was it trained on, how accurate is it, and could the data be biased? Errors are usually easy to spot because outputs are short.</p>' },
        genai: { result: 'Generative AI', icon: '✨', html: '<p>Almost certainly a deep-learning model, often an LLM or a diffusion model. Expect fluent output that can be confidently wrong, knowledge limited to its training data, and big quality changes depending on how you ask. Verify important facts. Start with <a href="#/m/1.2">Module 1.2</a> to see why.</p>' },
        unknown: { result: 'Ask what kind of AI it is', icon: '❓', html: '<p>"AI-powered" alone tells you almost nothing. Ask the vendor or check the docs: is it rule-based, a trained predictive model, or a generative model? Which model? Trained on what data? A clear answer is a good sign. Vague answers are a warning.</p>' }
      }
    }
  },

  deeper: [
    {
      title: 'Where the words came from (a 70-year glossary)',
      html: `<p><b>"Artificial intelligence"</b> was coined by John McCarthy and colleagues in their 1955 proposal for the 1956 Dartmouth summer workshop, which is usually treated as the birth of the field. <b>"Machine learning"</b> was popularised by Arthur Samuel at IBM around 1959, describing a checkers program that improved by playing itself. <b>"Deep learning"</b> became the standard label in the late 2000s and 2010s, when multi-layer neural networks started winning contests (AlexNet, 2012). <b>"Generative AI"</b> existed in research earlier (e.g. GANs in 2014), but became a household term in 2022, when image generators and then ChatGPT reached the public. Each new word marked a new <i>method</i>, not a replacement: rule-based AI and classic ML are still widely used today.</p>`
    },
    {
      title: 'Classic ML is not dead: when simpler beats deeper',
      html: `<p>Deep learning wins on messy, high-volume data: images, audio, free text. For neat tables of numbers (sales records, loan data, sensor readings), classic methods such as linear regression, decision trees and gradient-boosted trees are often just as accurate, much cheaper, faster, and easier to explain to a regulator. A good AI builder picks the <b>smallest ring that solves the problem</b>. Using an LLM to add up a column of numbers is like hiring a novelist to do your accounts: it may work, but a calculator is cheaper and never "hallucinates" a total.</p>`
    },
    {
      title: 'What "learning" actually means inside a model',
      html: `<p>A model is a giant mathematical function with adjustable numbers called [[parameter|parameters]] (or weights). Training repeats a simple loop billions of times: make a prediction, measure how wrong it was (the <i>loss</i>), and nudge every parameter slightly in the direction that would have reduced the error. This nudging method is called <i>gradient descent</i>, and the way the error is passed backwards through the layers is called <i>backpropagation</i>. Frontier LLMs in 2026 have from billions to trillions of parameters. No one writes these numbers by hand, and no one can read them like sentences, which is why understanding <i>why</i> a model said something is an active research area (interpretability).</p>`
    },
    {
      title: 'Narrow AI, general AI and where LLMs fit',
      html: `<p>Almost all AI before 2022 was <b>narrow</b>: one system per task (a chess engine cannot recognise faces). LLMs surprised researchers by being much more <b>general</b>: one model can translate, summarise, write code, tutor and plan. They are still not "artificial general intelligence" (AGI) in the full sense; they make odd mistakes no human expert would and depend heavily on the context you give them. Whether and when AGI arrives is debated, and is covered in [[m:7.5]]. For now, think of LLMs as <i>broad but unreliable generalists</i> that become far more useful with good prompts, tools and verification.</p>`
    }
  ],

  misconceptions: [
    { myth: 'AI, machine learning and generative AI are competing technologies, and generative AI replaced the others.', truth: 'They are <b>nested</b>, not competing. Generative AI is a kind of deep learning, which is a kind of machine learning, which is a kind of AI. Rule-based systems and classic ML are still everywhere, from route planners to fraud scoring.' },
    { myth: 'If a product says "AI-powered", it must be like ChatGPT.', truth: 'The label covers everything from a few if-then rules to frontier LLMs. Ask <i>what kind</i> of AI: rule-based, predictive ML, or generative.' },
    { myth: 'Machine learning means the computer understands things the way people do.', truth: 'It means the computer found statistical patterns in examples. Those patterns can be extremely useful and still fail in ways no human would, especially on situations unlike its training data.' },
    { myth: 'Deep learning is a new invention from the ChatGPT era.', truth: 'Neural networks date back decades. Deep learning took off around 2012 when big data, GPUs and better training methods came together. ChatGPT (2022) was built on that ten-year foundation plus the 2017 Transformer design.' },
    { myth: 'Generative AI looks things up in a database of facts.', truth: 'A plain generative model produces <i>new</i> output from learned patterns. It does not retrieve stored facts unless it is connected to search or documents (see RAG in Module 4.3). That is why it can produce confident errors.' }
  ],

  takeaways: [
    'AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI ⊃ LLMs. Each ring is inside the one before it.',
    'Rule-based AI follows rules people wrote. Machine learning learns the rules from examples (training data).',
    'Deep learning uses many-layered neural networks and took off around 2012 thanks to data, GPUs and better methods.',
    'Predictive AI labels and scores. Generative AI creates new content, which makes it powerful and harder to verify.',
    'LLMs became possible through self-supervised learning: text provides its own answers, so the whole internet became practice data.',
    'When you see "AI-powered", ask: did it learn from data, and does it create or just predict?'
  ],

  tryIt: {
    title: 'Ring-spotting in your own life',
    time: '15 min',
    intro: '<p>You use all four rings every day without noticing. Let\'s find them, then use a chatbot to test your understanding.</p>',
    steps: [
      '<b>Phone audit (5 min):</b> list five features on your phone that might use AI: e.g. face unlock, keyboard suggestions, photo search, maps, a voice assistant, a chatbot app. For each, write which ring you think it belongs to.',
      '<b>Ask a chatbot to check you:</b> paste your list into a free assistant and ask: <i>"For each feature, tell me whether it is rule-based AI, classic machine learning, predictive deep learning, or generative AI, and explain why in one line."</i> Compare with your guesses.',
      '<b>Generate vs predict:</b> ask the same assistant <i>"Is this review positive or negative: \'The food was cold but the staff were lovely.\'"</i> Then ask <i>"Write a 3-line restaurant review in the same style."</i> Notice the first task is predictive (a label), the second is generative (new text), yet one LLM does both.',
      '<b>Spot the hype:</b> find any product page or news article that says "AI-powered". Use the decoder above to guess which ring it really is. Note what extra information you would need to be sure.',
      '<b>Reflect:</b> in your notes, write one sentence explaining the difference between AI and generative AI to a friend who missed 2022–2026.'
    ],
    tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)', 'Your own phone'],
    outro: '<p>If you could place most features confidently, you are ready for <a href="#/m/1.2">Module 1.2</a>, which opens up the innermost ring: the LLM.</p>'
  },

  quiz: [
    { q: 'Which statement about the AI terms is correct?', options: ['Generative AI replaced machine learning in 2022', 'Every generative AI system is also a machine-learning system', 'Deep learning and machine learning are unrelated fields', 'All AI systems learn from data'], answer: 1, explain: 'The rings are nested: generative AI ⊂ deep learning ⊂ machine learning ⊂ AI. Not all AI learns from data; rule-based AI does not.' },
    { q: 'A company\'s customer-support bot answers only from a fixed menu of scripted replies written by staff. What is it?', options: ['Generative AI', 'Deep learning', 'Rule-based AI (no machine learning)', 'An LLM'], answer: 2, explain: 'People wrote all the rules and replies. It does not learn from data and does not generate new text.' },
    { q: 'A hospital tool looks at X-rays and outputs "possible tumour: 87%". Which ring fits best?', options: ['Predictive deep learning', 'Generative AI', 'Rule-based AI', 'It is not AI at all'], answer: 0, explain: 'It learned from labelled images (deep learning is strong with images) and outputs a judgement, not new content, so it is predictive rather than generative.' },
    { q: 'What made it possible to train LLMs on almost the entire public internet without humans labelling the data?', options: ['Reinforcement learning from games', 'Hand-written grammar rules', 'Faster internet connections', 'Self-supervised learning: hiding the next word and using the real word as the answer'], answer: 3, explain: 'Text contains its own answers. Predicting hidden or next words removes the labelling bottleneck, so models can learn from trillions of words.' },
    { q: 'You need to predict next month\'s sales from a clean spreadsheet of past sales. A colleague suggests using a giant LLM. What is the best response?', options: ['Agree: bigger AI is always better', 'Consider classic machine learning first: it is often as accurate, cheaper and easier to explain for tabular data', 'Use a rule-based system because ML cannot handle numbers', 'Use an image generator to plot the data'], answer: 1, explain: 'Pick the smallest ring that solves the problem. Classic ML often matches deep models on neat tabular data at a fraction of the cost.' }
  ],

  terms: ['artificial-intelligence', 'machine-learning', 'deep-learning', 'generative-ai', 'neural-network', 'training-data', 'supervised-learning', 'self-supervised-learning', 'reinforcement-learning', 'llm'],

  resources: [
    { title: '3Blue1Brown — But what is a neural network?', url: 'https://www.youtube.com/watch?v=aircAruvnKk', type: 'video', note: 'The best visual introduction to how the layers of a neural network work.' },
    { title: 'IBM — AI vs. machine learning vs. deep learning vs. neural networks', url: 'https://www.ibm.com/think/topics/ai-vs-machine-learning-vs-deep-learning-vs-neural-networks', type: 'article', note: 'A clear written explanation of the same nested rings.' },
    { title: 'Elements of AI (University of Helsinki)', url: 'https://www.elementsofai.com/', type: 'course', note: 'A free, beginner-friendly online course on what AI is and is not. No maths required.' },
    { title: 'Andrew Ng — AI For Everyone (Coursera)', url: 'https://www.coursera.org/learn/ai-for-everyone', type: 'course', note: 'A short non-technical course on what machine learning can and cannot do. Free to audit.' },
    { title: 'Google — Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', type: 'course', note: 'Optional next step if you want to see how classic ML models are actually trained.' }
  ],

  connects: ['0.1', '1.2', '1.4', '1.7', '2.2', '1.6']
});
