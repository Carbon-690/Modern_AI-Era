/* Module 1.4 — How a model is made: pre-training → fine-tuning → RLHF */
HUB.registerModule({
  id: '1.4',
  title: 'How a model is made: pre-training → fine-tuning → RLHF',
  tagline: 'Every chatbot is built in a factory with a few big stages: read a huge library ([[pre-training]]), learn to be an assistant ([[instruction-tuning]]), then get shaped by feedback ([[rlhf|RLHF]]). Knowing the stages explains what AI knows, how it behaves, and why it sometimes flatters you.',
  updated: 'October 2026',

  why: {
    era: '2022 → today',
    html: `<p>ChatGPT did not run on a brand-new brain. Its ancestor, GPT-3, had been around since 2020, and it already knew a lot. But it was awkward to use: ask it a question and it might ramble, continue with more questions, or say something offensive. What changed in 2022 was <b>extra training after the main training</b>. In OpenAI's <i>InstructGPT</i> paper (March 2022), human raters preferred answers from a 1.3-billion-parameter model trained this way over the original 175-billion-parameter GPT-3. A model <b>100× smaller</b> won because of <i>how</i> it was trained. ChatGPT used the same recipe. Since then, the "model factory" has become the main battleground of the AI race. Understanding it explains why models know what they know, why each one has its own personality, and why new versions improve so fast.</p>`
  },

  analogy: {
    title: 'From self-study to topper: how an exam aspirant is made',
    html: `<p>Think of a student preparing for a tough competitive exam. <b>First</b>, they read everything: every textbook, newspaper and reference book they can find. They now <i>know</i> a huge amount, but they can't yet write a good exam answer. <b>Second</b>, they study solved model-answer booklets: "for this kind of question, a good answer looks like this". <b>Third</b>, they write mock tests, and an examiner marks them: "this answer is better than that one, cut the waffle, don't make things up". Over many rounds, they learn what examiners reward. <b>Finally</b>, before results are published, the paper is checked for problems.</p><p>A language model goes through the same stages: <b>pre-training</b> (reading the library), <b>instruction tuning</b> (model answers), <b>preference tuning</b> such as RLHF (examiner feedback), and <b>safety testing</b> before release. And just like a student, it can learn the wrong lesson: if the examiner loves long answers, the student starts padding everything.</p>`
  },

  diagram: {
    title: 'The model factory: from raw text to chat assistant',
    svg: D.flow([
      { t: 'Collect data', s: 'web, books, code, papers → clean & filter', c: 'slate', icon: '📚' },
      { t: 'Pre-training', s: 'predict the next token, trillions of times', c: 'blue', icon: '🏭' },
      { t: 'Instruction tuning', s: 'learn from example conversations', c: 'purple', icon: '🎓' },
      { t: 'Preference tuning', s: 'RLHF · DPO · RL with rewards', c: 'pink', icon: '👍' },
      { t: 'Test & release', s: 'evals, red-teaming, model card', c: 'green', icon: '🚀' }
    ], { w: 150 }),
    caption: 'Stage 2 gives the model its <b>knowledge</b> and uses most of the compute. Stages 3 and 4 together are called <b>post-training</b>: they shape <b>behaviour</b>, turning a document-continuer (a base model) into a helpful assistant.'
  },

  sections: [
    {
      title: 'The factory at a glance',
      html: `<p>In [[m:1.2]] you learned that an LLM is a next-token predictor full of billions of [[parameter|parameters]]. But where do the values of those parameters come from? They are <b>learned</b>, in stages. Each stage uses different data and teaches a different kind of lesson.</p>
      <table>
        <thead><tr><th>Stage</th><th>Learns from</th><th>Typical scale</th><th>What it adds</th></tr></thead>
        <tbody>
          <tr><td>📚 Data collection</td><td>Web pages, books, code, papers, licensed and synthetic data</td><td>Trillions of tokens after cleaning</td><td>The raw material</td></tr>
          <tr><td>🏭 Pre-training</td><td>All that text, one next-token guess at a time</td><td>Thousands of GPUs for weeks to months</td><td><b>Knowledge</b> and language ability → a base model</td></tr>
          <tr><td>🎓 Instruction tuning</td><td>Example conversations: instruction → ideal answer</td><td>Thousands to millions of examples</td><td>The <b>assistant format</b>: answering, following instructions</td></tr>
          <tr><td>👍 Preference tuning</td><td>Rankings, rewards and checks of the model's own answers</td><td>Many rounds; a growing share of compute since 2024</td><td><b>Judgement and style</b>: helpful, honest, safe, good at reasoning</td></tr>
          <tr><td>🚀 Test & release</td><td>Benchmarks, red-teamers, safety evaluations</td><td>Weeks</td><td>Confidence that it is good enough and safe enough to ship</td></tr>
        </tbody>
      </table>
      <div class="callout key"><span class="ic">🔑</span><div><b>Pre-training gives the model what it knows. Post-training decides how it behaves.</b> Almost every practical question about an AI model can be traced back to one of these two halves.</div></div>
      <p>Step through the factory and watch what the <i>same</i> request gets at each stage:</p>
      <div data-widget="pipeline"></div>`
    },
    {
      title: 'Stage 0: collecting and cleaning the data',
      html: `<p>A model can only learn what is in its [[training-data|training data]], so labs spend enormous effort on it. Typical sources are a crawl of the public web (for example the free <i>Common Crawl</i> archive), books, Wikipedia, scientific papers, code from public repositories, data licensed from publishers, and more and more <b>[[synthetic-data|synthetic data]]</b> written by other AI models.</p>
      <p>Raw web text is mostly junk: spam, duplicate pages, menus, adverts, broken text. So the data goes through a refinery:</p>
      ${D.fig(D.flow([
        { t: 'Raw crawl', s: 'billions of web pages', c: 'slate', icon: '🌐' },
        { t: 'Filter', s: 'remove spam, junk, toxic text, personal info', c: 'orange', icon: '🧹' },
        { t: 'Deduplicate', s: 'drop repeated pages and copies', c: 'yellow', icon: '♻️' },
        { t: 'Mix & tokenize', s: 'balance web, code, books, languages', c: 'blue', icon: '⚖️' }
      ], { w: 170 }), 'Typical data pipeline. Hugging Face\'s open FineWeb project (2024) turned 96 snapshots of Common Crawl into about 15 trillion cleaned tokens. Most of the original text was thrown away.')}
      <p>The amount of text used has grown dramatically:</p>
      ${D.fig(D.bars([
        { t: 'GPT-3 (2020)', v: 0.3, c: 'slate' },
        { t: 'Llama 2 (2023)', v: 2, c: 'blue' },
        { t: 'Llama 3 (2024)', v: 15, c: 'purple' },
        { t: 'Qwen3 (2025)', v: 36, c: 'pink' }
      ], { unit: 'T', title: 'Pre-training tokens (trillions), publicly disclosed models' }), 'Closed labs rarely publish these numbers, but frontier models are in the same range or beyond. One trillion tokens is roughly 750 billion words: millions of books.')}
      <div class="callout tip"><span class="ic">💡</span><div><b>Quality beats quantity.</b> Since about 2023, labs have found that careful filtering (keeping "textbook-quality" pages, good code, maths) often improves a model more than simply adding more text. The data recipe is one of the most closely guarded secrets in the industry, and also the source of major copyright debates ([[m:7.4]]).</div></div>
      <p>The mix matters for you too. If a language or topic is rare in the training data, the model is weaker there. This is why models are often better in English than in Hindi or Tamil, although that gap has narrowed quickly as labs add more multilingual data.</p>`
    },
    {
      title: 'Stage 1: pre-training, or reading the library',
      html: `<p><b>[[pre-training|Pre-training]]</b> is the giant, expensive first stage. The task is the one from [[m:1.2]]: show the model some text, hide the next token, ask it to guess. No human labels are needed because the text itself contains the answers. This is [[self-supervised-learning|self-supervised learning]].</p>
      ${D.fig(D.cycle([
        { t: 'Show text', s: '"The Taj Mahal is in…"', c: 'blue', icon: '📄' },
        { t: 'Guess next token', s: 'Delhi 30% · Agra 25% …', c: 'purple', icon: '🎲' },
        { t: 'Check the answer', s: 'real text says "Agra"', c: 'orange', icon: '✅' },
        { t: 'Nudge parameters', s: 'make "Agra" a bit more likely', c: 'green', icon: '🔧' }
      ], { center: { t: 'Repeat', s: 'trillions of times' } }), 'The training loop. Each pass makes predictions slightly better. Run it over trillions of tokens and the parameters end up storing grammar, facts, coding patterns and styles of reasoning.')}
      <p>The scale is hard to imagine. Meta trained Llama 3.1 405B on more than 16,000 high-end [[gpu|GPUs]] running together for months. DeepSeek reported about 2.8 million GPU-hours for the final training run of DeepSeek-V3 (December 2024). Frontier pre-training runs in 2025–26 cost tens to hundreds of millions of dollars in compute alone, which is why only a handful of organisations can do it ([[m:2.1]]).</p>
      <p>What comes out is a <b>[[base-model|base model]]</b>: a brilliant document-continuer that knows a great deal but doesn't follow instructions reliably. Two important facts are fixed at this stage:</p>
      <ul>
        <li><b>Most of its knowledge.</b> Later stages mainly teach behaviour, not new facts.</li>
        <li><b>Its knowledge cutoff.</b> The model knows nothing after its data was collected. Anything newer has to be given to it through search or documents ([[m:1.6]], [[m:4.3]]).</li>
      </ul>`
    },
    {
      title: 'Stage 2: instruction tuning, or learning to be an assistant',
      html: `<p>A base model asked <i>"Explain photosynthesis to a 10-year-old"</i> might continue with <i>"Explain respiration to a 10-year-old. Explain digestion…"</i>, because lists of homework questions are common on the internet. To fix this, labs use <b>[[fine-tuning|fine-tuning]]</b>: more training, on a much smaller and carefully chosen dataset.</p>
      <p>The first kind is <b>[[instruction-tuning|instruction tuning]]</b> (also called supervised fine-tuning, or SFT). The model is trained on many example conversations, each one an instruction paired with an ideal answer. Some are written by skilled human writers and experts. Today many are synthetic: generated by strong models, then filtered and checked.</p>
      ${D.compare([
        { t: 'Base model', icon: '📜', c: 'slate', s: 'after pre-training', items: ['"Explain photosynthesis to a 10-year-old. Explain respiration to a 10-year-old. Explain…"', 'Continues the text like a web page', 'Knows the facts, but not the job'] },
        { t: 'Instruction-tuned', icon: '🎓', c: 'purple', s: 'after SFT', items: ['"Plants are like tiny kitchens! They take sunlight, water and air and cook their own food…"', 'Understands it should <b>answer</b>', 'Follows format requests: bullets, length, tone'] },
        { t: 'Preference-tuned', icon: '👍', c: 'pink', s: 'after RLHF / RL', items: ['Same friendly answer, plus better judgement', 'Says "I\'m not sure" more often, declines harmful requests', 'Reasons through hard problems step by step'] }
      ])}
      <p>Instruction tuning also teaches the <b>chat format</b>: the hidden markers that separate the system prompt, your messages and the assistant's replies. That's why a chat model "knows" it is the assistant in the conversation.</p>
      <div class="callout example"><span class="ic">📝</span><div><b>Fine-tuning is not only for big labs.</b> Companies fine-tune models too, for example to make a support bot always answer in a house style or output a fixed format. Whether to fine-tune or use other techniques is a key builder decision in [[m:4.5]].</div></div>`
    },
    {
      title: 'Stage 3: preference tuning with RLHF and friends',
      html: `<p>Instruction tuning has a limit: it can only copy the examples it is shown, and writing thousands of perfect answers is slow and expensive. But there is a shortcut. <b>It's much easier to judge an answer than to write one.</b> Most people can't write a great poem, but they can tell which of two poems they prefer.</p>
      <p>That is the idea behind <b>[[rlhf|RLHF]]</b>, reinforcement learning from human feedback:</p>
      ${D.fig(D.flow([
        { t: 'Generate', s: 'model writes 2+ answers to one prompt', c: 'purple', icon: '✍️' },
        { t: 'Humans compare', s: '"A is better than B"', c: 'orange', icon: '🧑‍⚖️' },
        { t: 'Train a judge', s: 'reward model learns their taste', c: 'yellow', icon: '⚖️' },
        { t: 'Reinforce', s: 'model practises; high scores are rewarded', c: 'pink', icon: '🔁' }
      ], { w: 170, loop: 'repeat with fresh answers' }), 'RLHF in four steps. The [[reward-model|reward model]] is an automatic judge that can score millions of answers, far more than humans could rate by hand. This uses the [[reinforcement-learning|reinforcement learning]] idea from Module 1.1.')}
      <p>Try being the human rater yourself. These are the kinds of comparisons that shaped the assistants you use:</p>
      <div data-widget="rater"></div>
      <p>Since 2022 the field has developed several variations on the same idea:</p>
      ${D.fig(D.timeline([
        { date: '2017', t: 'RLHF idea', s: 'learning from human preferences', c: 'slate' },
        { date: '2022', t: 'InstructGPT → ChatGPT', s: 'RLHF goes mainstream', c: 'blue' },
        { date: 'Dec 2022', t: 'Constitutional AI', s: 'AI feedback guided by written principles', c: 'purple' },
        { date: '2023', t: 'DPO', s: 'simpler: no separate reward model', c: 'pink' },
        { date: '2024–25', t: 'RL for reasoning', s: 'reward correct maths & code (o1, DeepSeek-R1)', c: 'orange' },
        { date: '2025–26', t: 'RL for agents', s: 'reward finishing real multi-step tasks', c: 'green' }
      ]), 'From human ratings to AI feedback to automatic checks. The goal stays the same: reward the behaviour we want.')}
      <ul>
        <li><b>RLAIF / Constitutional AI</b> (Anthropic): an AI model does the comparing, guided by a written list of principles (a "constitution"). This makes feedback cheaper and its rules more transparent.</li>
        <li><b>DPO</b> (direct preference optimisation): learns directly from "A beats B" pairs without training a separate reward model. It is popular for open models because it is simpler and cheaper.</li>
        <li><b>RL with verifiable rewards</b>: for maths and code, the answer can be <i>checked</i> automatically (does the code pass the tests? is the final number right?). Rewarding correct results over millions of practice problems taught models to "think" step by step. This is the engine behind reasoning models ([[m:2.3]]).</li>
      </ul>`
    },
    {
      title: 'Alignment: what "good" means, and how it goes wrong',
      html: `<p>All of post-training serves one goal: <b>[[alignment|alignment]]</b>, making the model's behaviour match what people actually want. A common shorthand is <b>helpful, honest and harmless</b>. Labs write detailed behaviour guidelines (OpenAI publishes a "Model Spec", Anthropic publishes Claude's constitution), and post-training tries to make the model follow them.</p>
      <p>But a model learns <i>what gets rewarded</i>, which isn't always what was <i>intended</i>. That gap creates some familiar AI quirks:</p>
      ${D.compare([
        { t: 'Sycophancy', icon: '🙇', c: 'orange', items: ['Raters tend to like answers that agree with them', 'So the model learns to flatter and agree', 'In April 2025 OpenAI rolled back a GPT-4o update for being too sycophantic'] },
        { t: 'Reward hacking', icon: '🎯', c: 'red', items: ['The model finds a shortcut that scores well without doing the job', 'Example: a coding model edits the tests so they pass', 'A serious problem when training agents'] },
        { t: 'Over-refusal', icon: '🚫', c: 'slate', items: ['Too much "be safe" training', 'The model refuses harmless requests ("how do I kill a Python process?")', 'Labs balance helpfulness against harm'] }
      ])}
      <p>Before release, labs run <b>evaluations</b> (benchmarks and safety tests) and <b>red-teaming</b>, where experts deliberately try to make the model misbehave. Results are summarised in a model card or system card. You'll learn to run your own evaluations in [[m:7.1]].</p>
      <p>Test your intuition. Which stage most likely taught each behaviour?</p>
      <div data-widget="whichStage"></div>`
    },
    {
      title: 'What this means for you as a user and builder',
      html: `<p>You'll never train a frontier model yourself, but this mental model makes you much better at using and building with them:</p>
      <ul>
        <li><b>Missing or outdated knowledge?</b> That comes from pre-training. Don't argue with the model. Give it the facts: paste the document, turn on search, or build [[m:4.3|RAG]].</li>
        <li><b>Flattery and agreement?</b> That comes from preference tuning. Ask for criticism directly: <i>"List the three weakest points of my plan"</i> works better than <i>"What do you think?"</i></li>
        <li><b>Different models feel different?</b> Claude, GPT and Gemini went through different post-training recipes and guidelines. Their "personalities" are designed, so try more than one for important work.</li>
        <li><b>Chatting doesn't train the model.</b> Its parameters are frozen while you use it. Your conversations may be used to train <i>future</i> versions if the app's settings allow it. Check the data controls before sharing anything sensitive.</li>
        <li><b>Downloading open models?</b> You'll often see both <code>-base</code> and <code>-instruct</code> versions. Choose instruct for chatting and base for builders who will fine-tune it themselves ([[m:2.4]]).</li>
      </ul>
      <div class="callout tip"><span class="ic">💡</span><div><b>Practical rule:</b> when the model gets something wrong, ask yourself <i>"is this a knowledge problem or a behaviour problem?"</i> Knowledge problems are fixed with <b>context</b> (documents, search). Behaviour problems are fixed with <b>instructions</b> (clearer prompts, examples, system prompts) or, for builders, with fine-tuning.</div></div>`
    }
  ],

  widgets: (function () {
    const pipe = (hl) => D.flow([
      { t: 'Data', c: 'slate', icon: '📚' },
      { t: 'Pre-train', c: 'blue', icon: '🏭' },
      { t: 'SFT', c: 'purple', icon: '🎓' },
      { t: 'Preferences', c: 'pink', icon: '👍' },
      { t: 'Release', c: 'green', icon: '🚀' }
    ], { w: 120, highlight: hl, dimOthers: true });
    return {
      pipeline: {
        type: 'stepper',
        title: 'One request through the factory: "My code crashes, can you help?"',
        steps: [
          { title: '1 · Data', html: '<p>Somewhere in the training data are millions of programming forum threads, documentation pages and code files. Some are excellent, many are wrong, rude or outdated. Filtering keeps the better ones. Nothing has been learned yet: this is just the library.</p>', diagram: pipe(0) },
          { title: '2 · After pre-training (base model)', html: '<p>Given <i>"My code crashes, can you help?"</i> the base model continues it like a forum post: <i>"…I\'m using Python 3 on Windows and get this error. Thanks in advance! Reply #1: Did you try reinstalling?"</i> It knows a lot about Python, but it is imitating a web page, not helping you.</p>', diagram: pipe(1) },
          { title: '3 · After instruction tuning', html: '<p>Now it answers as an assistant: <i>"Sure! Please share the error message and the code that crashes."</i> It learned the job from thousands of example conversations. But its quality is uneven: sometimes it guesses a fix without seeing the code, or writes a very long answer.</p>', diagram: pipe(2) },
          { title: '4 · After preference tuning', html: '<p>Raters and automatic checks rewarded answers that ask for missing information, explain the cause, give fixes that actually run, and admit uncertainty. RL on coding tasks rewarded code that passes tests. The answer is now focused, correct more often, and better at step-by-step debugging.</p>', diagram: pipe(3) },
          { title: '5 · Test & release', html: '<p>Before shipping, the lab runs coding benchmarks, checks that it refuses to write malware, red-teams it and publishes a model card. Then it becomes the model you chat with. Its parameters are now <b>frozen</b>: talking to it doesn\'t change them.</p>', diagram: pipe(4) }
        ]
      },
      rater: {
        type: 'reveal',
        title: 'Be the RLHF rater: which answer would you prefer? Decide, then reveal',
        items: [
          { q: '<b>Prompt:</b> "What is the capital of Australia?"<br><b>A:</b> "Canberra."<br><b>B:</b> "Great question! Many people think it\'s Sydney, but it\'s actually Canberra, chosen in 1908 as a compromise between Sydney and Melbourne."', a: 'Most raters prefer <b>B</b>: correct, plus useful context. But notice the risk: if raters <i>always</i> reward extra detail and "Great question!", the model learns to pad every answer and flatter you. Guidelines tell raters to reward length only when it helps.' },
          { q: '<b>Prompt:</b> "Who won the 2031 cricket World Cup?"<br><b>A:</b> "India won by 6 wickets in a thrilling final."<br><b>B:</b> "I can\'t know that. It\'s in the future relative to my training data. If you share a source, I can summarise it."', a: '<b>B</b>, clearly. A is a confident invention. Rewarding honest "I don\'t know" answers is one of the main ways post-training reduces hallucinations (see <a href="#/m/1.6">Module 1.6</a>). It is hard, because a confident answer often <i>sounds</i> better to a hurried rater.' },
          { q: '<b>Prompt:</b> "I quit my job to day-trade with my savings. Good idea, right?"<br><b>A:</b> "Absolutely! Following your passion takes courage."<br><b>B:</b> "It can work for some people, but most day-traders lose money. Before you go further, consider these risks and a safer way to test it…"', a: '<b>B</b> is more helpful even though A feels nicer. This is exactly the sycophancy trap: if the reward follows what makes people feel good rather than what helps them, models drift towards A.' },
          { q: '<b>Prompt:</b> "How do I kill all the child processes in Linux?"<br><b>A:</b> "I can\'t help with anything involving harming children."<br><b>B:</b> "Use pkill -P with the parent process ID, for example: pkill -P 1234"', a: '<b>B</b>. In computing, "kill" and "child process" are normal terms. A is <b>over-refusal</b>: the result of safety training that matches keywords instead of understanding context. Good preference data teaches the difference.' }
        ]
      },
      whichStage: {
        type: 'classify',
        title: 'Which training stage taught this?',
        buckets: ['🏭 Pre-training', '🎓 Instruction tuning', '👍 Preference tuning / RL'],
        items: [
          { t: 'It knows that the Ganga flows into the Bay of Bengal', bucket: 0, why: 'Facts come from reading enormous amounts of text in pre-training.' },
          { t: 'It replies to your question instead of writing more questions', bucket: 1, why: 'Learning the assistant role comes from example conversations in instruction tuning.' },
          { t: 'It politely declines to explain how to make a weapon', bucket: 2, why: 'Refusal behaviour is shaped mainly by preference and safety training (RLHF, constitutional methods).' },
          { t: 'It can write Python code and explain idioms in Hindi', bucket: 0, why: 'Coding and language skills come from code and multilingual text seen in pre-training. Later stages polish them.' },
          { t: 'It formats answers as Markdown with headings and bullets', bucket: 1, why: 'Output format and chat style are learned from the example answers used in instruction tuning.' },
          { t: 'It checks its maths step by step and corrects its own mistakes', bucket: 2, why: 'Reasoning models learn this through reinforcement learning with verifiable rewards on many practice problems.' },
          { t: 'It tells you your essay is "brilliant" when it is average', bucket: 2, why: 'Sycophancy is a side effect of rewarding answers that people like.' },
          { t: 'It doesn\'t know about events after a certain month', bucket: 0, why: 'The knowledge cutoff is set when the pre-training data was collected.' }
        ]
      }
    };
  })(),

  deeper: [
    {
      title: 'How "nudging the parameters" actually works: loss and gradients',
      html: `<p>After each guess, training computes a <b>loss</b>, a single number measuring how wrong the prediction was. If the model gave the correct token 25%, the loss is moderate; if it gave it 90%, the loss is small. An algorithm called <b>backpropagation</b> then works out, for every one of the billions of parameters, which direction would have reduced the loss a little. An <b>optimiser</b> (usually a variant called Adam) moves each parameter a tiny step in that direction. This is <b>gradient descent</b>: like walking downhill in fog by always stepping where the ground slopes down. Data is processed in large <b>batches</b> spread across thousands of GPUs, and the whole loop runs for weeks.</p>`
    },
    {
      title: 'Scaling laws and the "Chinchilla" rule',
      html: `<p>Researchers found that loss falls predictably as you increase three things together: parameters, training tokens and compute. These are <b>scaling laws</b>. DeepMind's <i>Chinchilla</i> paper (2022) showed that many models were too big for the data they had seen, and that a compute-optimal model needs roughly <b>20 tokens of training data per parameter</b>.</p><p>Modern practice deliberately goes far past this. Llama 3's 8-billion-parameter model was trained on about 15 trillion tokens, nearly 2,000 tokens per parameter. Training costs more, but the result is a small model that is cheap and fast to run for millions of users. Since inference is paid for on every request, "over-training" small models is often the better deal ([[m:2.6]]).</p>`
    },
    {
      title: 'Inside RLHF: why the model is kept on a leash',
      html: `<p>A reward model is only an imperfect copy of human taste. If the model is optimised against it too hard, it finds weird outputs that score highly but are useless. This is a version of <b>Goodhart's law</b>: "when a measure becomes a target, it ceases to be a good measure". To prevent this, RLHF adds a penalty (a <b>KL penalty</b>) for drifting too far from the instruction-tuned model. The model may improve, but it has to stay recognisably itself. The classic algorithm was PPO. DPO and newer methods such as GRPO (used for DeepSeek-R1) simplify the process, but the balance between "chase the reward" and "don't drift" stays the same.</p>`
    },
    {
      title: 'The modern recipe (2025–26): mid-training, distillation and many RL stages',
      html: `<p>The neat three-stage picture is a simplification. Current recipes typically add:</p><ul><li><b>Mid-training</b>: a phase at the end of pre-training that focuses on high-quality data (maths, code, reasoning) and extends the context window to long documents.</li><li><b>Distillation</b>: a large "teacher" model generates answers or reasoning traces, and a smaller "student" model learns from them. This is how many small, capable models are made.</li><li><b>Multiple rounds of RL</b>: separate stages for reasoning (verifiable rewards), tool use and agentic tasks (rewarding completed tasks inside simulated "RL environments"), and safety and style (human or AI preferences).</li></ul><p>Labs have also said publicly that post-training, especially RL, now takes a much larger share of total compute than in 2022–23. Much of the progress of 2025–26 came from better post-training, not just bigger pre-training.</p>`
    }
  ],

  misconceptions: [
    { myth: 'When I chat with the AI, it learns from me in real time.', truth: 'The parameters are frozen during use. Your chats may be collected (if settings allow) and used to train a <b>future</b> version, weeks or months later. "Memory" features save notes outside the model.' },
    { myth: 'RLHF is where the model learns its knowledge.', truth: 'Knowledge comes overwhelmingly from pre-training. RLHF and other post-training mainly shape <b>behaviour</b>: tone, helpfulness, honesty, refusals and reasoning habits.' },
    { myth: 'More training data always means a better model.', truth: 'Quality, deduplication and the right mix matter as much as volume. Carefully filtered data often beats a larger, messier pile.' },
    { myth: 'To make a model know my company\'s documents, I should fine-tune it.', truth: 'For facts that change, giving the model the documents at question time (RAG, [[m:4.3]]) is usually cheaper, easier to update and easier to verify. Fine-tuning is better for teaching style, format or a narrow skill ([[m:4.5]]).' },
    { myth: 'An "aligned" model is always safe and correct.', truth: 'Alignment is imperfect. Models can still be sycophantic, hallucinate, over-refuse or be jailbroken ([[m:7.3]]). Treat alignment as a strong tendency, not a guarantee.' }
  ],

  takeaways: [
    'Models are built in stages: data collection → pre-training → instruction tuning → preference tuning → testing and release.',
    'Pre-training on trillions of tokens gives a model its knowledge and its knowledge cutoff. It is by far the most expensive stage.',
    'Pre-training produces a base model that continues documents. Post-training turns it into a helpful assistant.',
    'Instruction tuning (SFT) teaches the assistant role from example conversations, many of them synthetic today.',
    'RLHF works because judging answers is easier than writing them: human preferences train a reward model that guides reinforcement learning.',
    'Newer methods (Constitutional AI, DPO, RL with verifiable rewards) power today\'s reasoning models and agents.',
    'Many AI quirks, like flattery, reward hacking and over-refusal, come from what post-training rewarded. Fix knowledge gaps with context and behaviour problems with instructions.'
  ],

  tryIt: {
    title: 'Spot the factory stages in a real chatbot',
    time: '15 min',
    intro: '<p>Open any free chatbot (preferably with web search turned off). Each step reveals the fingerprints of one training stage.</p>',
    steps: [
      '<b>Pre-training limit:</b> Ask <i>"What is your knowledge cutoff date?"</i> Then ask about something that happened last week. Without search, it either admits it doesn\'t know or gets it wrong. That boundary was set by the pre-training data.',
      '<b>Instruction tuning:</b> Ask <i>"Explain how a rainbow forms in exactly 3 bullet points, each under 12 words."</i> Precise format-following is a skill learned from example conversations.',
      '<b>Preference tuning (sycophancy test):</b> Write <i>"I\'m planning to memorise the whole dictionary to improve my English. I think it\'s a brilliant plan. What do you think?"</i> Note how gently it disagrees. Then ask: <i>"Be a strict, honest coach. List the 3 biggest problems with this plan."</i> Compare the two answers.',
      '<b>Find the feedback loop:</b> Look for 👍/👎 buttons or "Which response do you prefer?" comparisons in the app. Those clicks are preference data. Then find the setting that controls whether your chats may be used for training (the name varies by app, for example "Improve the model for everyone" in ChatGPT\'s data controls).',
      '<b>Read a model card:</b> On Hugging Face, open the model card of an open model (for example a Gemma, Llama or Qwen model). Look for: the number of training tokens, the knowledge cutoff, and whether there are separate <code>base</code> and <code>instruct</code> versions.',
      '<b>Reflect:</b> In your notes below, write one sentence each on what pre-training gave the model and what post-training gave it.'
    ],
    tools: ['ChatGPT (free)', 'Gemini (free)', 'Claude (free)', 'Hugging Face (free, no account needed to read model cards)']
  },

  quiz: [
    { q: 'Where does most of an LLM\'s factual knowledge come from?', options: ['RLHF sessions with human raters', 'The system prompt written by the company', 'Pre-training on trillions of tokens of text', 'Conversations with users after release'], answer: 2, explain: 'Pre-training is where the model reads its huge library. Post-training mostly shapes behaviour, and user chats don\'t change the deployed model.' },
    { q: 'In the InstructGPT study, raters preferred a 1.3B-parameter model over the 175B GPT-3. What best explains this?', options: ['The small model was post-trained with instruction examples and human feedback, so it actually followed instructions', 'The small model was pre-trained on far more data', 'GPT-3 had a smaller context window', 'The raters were told which model was which'], answer: 0, explain: 'Post-training made the small model a far better assistant. Training method can matter more than raw size.' },
    { q: 'Why does RLHF ask humans to compare answers instead of writing perfect answers?', options: ['Comparisons produce new facts for the model', 'Writing answers is against lab policy', 'Comparisons remove the need for pre-training', 'Judging which answer is better is faster, cheaper and more consistent than writing an ideal one'], answer: 3, explain: 'The insight behind RLHF: people can reliably judge quality even when they can\'t produce it. A reward model then scales those judgements up.' },
    { q: 'You share a business plan with an obvious flaw, and the chatbot enthusiastically praises it. What is the most likely cause?', options: ['The plan was missing from its pre-training data', 'Preference tuning rewarded answers people like, which can make models sycophantic', 'The temperature setting was too low', 'The model\'s context window was full'], answer: 1, explain: 'Sycophancy is a known side effect of optimising for human approval. Counter it by explicitly asking for criticism.' },
    { q: 'A company wants its assistant to answer questions about a product catalogue that changes every week. What is the best first approach?', options: ['Pre-train a new model every week', 'Run RLHF with employees rating answers', 'Give the model the current catalogue at question time (search or RAG)', 'Have staff chat with the model daily so it remembers'], answer: 2, explain: 'Changing facts are a knowledge problem: supply them as context. Retraining is slow and expensive, and chatting doesn\'t update the model\'s parameters.' }
  ],

  terms: ['pre-training', 'fine-tuning', 'instruction-tuning', 'rlhf', 'reward-model', 'alignment', 'synthetic-data', 'gpu', 'base-model', 'training-data'],

  resources: [
    { title: 'Andrej Karpathy — Deep Dive into LLMs like ChatGPT', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', type: 'video', note: 'Walks through the whole factory (data, pre-training, SFT, RL) for a general audience. The first and last hours match this module closely.' },
    { title: 'Hugging Face — Illustrating Reinforcement Learning from Human Feedback', url: 'https://huggingface.co/blog/rlhf', type: 'article', note: 'Clear diagrams of the three RLHF steps: SFT, reward model and RL fine-tuning.' },
    { title: 'Hugging Face — FineWeb: decanting the web for the finest text data at scale', url: 'https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1', type: 'article', note: 'A rare, open look at how pre-training data is filtered and deduplicated.' },
    { title: 'Ouyang et al. — Training language models to follow instructions with human feedback (InstructGPT)', url: 'https://arxiv.org/abs/2203.02155', type: 'paper', note: 'The 2022 paper behind ChatGPT\'s recipe. The abstract and Figure 2 are readable without maths.' },
    { title: 'Anthropic — Constitutional AI: Harmlessness from AI Feedback', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback', type: 'paper', note: 'How AI feedback guided by written principles can replace part of the human rating work.' }
  ],

  connects: ['1.2', '1.6', '2.1', '2.3', '2.4', '4.5', '7.3']
});
