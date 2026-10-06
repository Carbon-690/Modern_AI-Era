/* Glossary — Level 1 terms. Format: { id, term, def, module, aka? }  (def may use [[links]]) */
HUB.addTerms([
  { id: 'llm', term: 'LLM (Large Language Model)', aka: ['language model'], def: 'A neural network trained on huge amounts of text to predict the next token. The engine behind ChatGPT, Gemini, Claude and others.', module: '1.2' },
  { id: 'token', term: 'Token', def: 'The unit of text a model reads and writes — a word, part of a word, or punctuation. Roughly ¾ of an English word. Models are priced and limited in tokens.', module: '1.3' },
  { id: 'next-token-prediction', term: 'Next-token prediction', def: 'The core training objective of an LLM: given text so far, assign probabilities to every possible next token.', module: '1.2' },
  { id: 'autoregressive', term: 'Autoregressive generation', def: 'Producing output one token at a time, feeding each new token back in as input for the next prediction.', module: '1.2' },
  { id: 'parameter', term: 'Parameter', aka: ['weight'], def: 'One of the billions of adjustable numbers inside a neural network, tuned during training. "70B model" = 70 billion parameters.', module: '1.2' },
  { id: 'base-model', term: 'Base model', aka: ['foundation model', 'pre-trained model'], def: 'A model straight out of pre-training: it continues text like a document but doesn\'t reliably follow instructions until further tuned.', module: '1.2' },
  { id: 'neural-network', term: 'Neural network', def: 'A mathematical function made of layers of simple units ("neurons") connected by weights, loosely inspired by the brain. It learns patterns from examples.', module: '1.1' },
  { id: 'logits-softmax', term: 'Logits & softmax', def: 'Logits are the raw scores a model gives each possible next token; softmax converts them into probabilities that add up to 100%.', module: '1.2' },
  { id: 'hallucination', term: 'Hallucination', aka: ['confabulation'], def: 'When an AI produces fluent, confident output that is false or made up — a side effect of generating plausible rather than verified text.', module: '1.6' },
  // ---- Module 1.1
  { id: 'artificial-intelligence', term: 'Artificial intelligence (AI)', aka: ['AI'], def: 'The broad field of making computers do things we would call smart if a person did them — from hand-written rule systems to modern LLMs.', module: '1.1' },
  { id: 'machine-learning', term: 'Machine learning (ML)', aka: ['ML'], def: 'The part of AI where a computer learns its rules from examples (training data) instead of a programmer writing them.', module: '1.1' },
  { id: 'deep-learning', term: 'Deep learning', def: 'Machine learning that uses neural networks with many layers. It took off around 2012 and powers modern vision, speech and language AI.', module: '1.1' },
  { id: 'generative-ai', term: 'Generative AI', aka: ['GenAI'], def: 'Deep-learning models that create new content — text, images, audio, video or code — rather than only labelling or predicting.', module: '1.1' },
  { id: 'training-data', term: 'Training data', def: 'The examples a model learns from. Everything a trained model "knows", including its gaps and biases, comes from this data.', module: '1.1' },
  { id: 'supervised-learning', term: 'Supervised learning', def: 'Learning from labelled examples, where each input comes with the correct answer (e.g. email → "spam").', module: '1.1' },
  { id: 'self-supervised-learning', term: 'Self-supervised learning', def: 'Learning where the data provides its own answers, e.g. hiding the next word and predicting it. It lets LLMs learn from huge amounts of unlabelled text.', module: '1.1' },
  { id: 'reinforcement-learning', term: 'Reinforcement learning (RL)', aka: ['RL'], def: 'Learning by trial and error: the model takes actions, receives rewards or penalties, and gradually learns a strategy that scores well.', module: '1.1' },
  // ---- Module 1.3
  { id: 'tokenizer', term: 'Tokenizer', def: 'The program that cuts text into tokens and maps each one to a number (token ID) before the model sees it. Each model family has its own tokenizer.', module: '1.3' },
  { id: 'token-vocabulary', term: 'Token vocabulary', aka: ['vocabulary'], def: 'The fixed list of all tokens a model knows — typically about 100,000–200,000 entries in modern LLMs.', module: '1.3' },
  { id: 'byte-pair-encoding', term: 'Byte-pair encoding (BPE)', aka: ['BPE'], def: 'The common method for building a token vocabulary: start from single bytes and repeatedly merge the most frequent neighbouring pair into a new token.', module: '1.3' },
  { id: 'context-window', term: 'Context window', aka: ['context length'], def: 'The maximum number of tokens a model can take in at once — system prompt, history, files, your question and its answer all share it. The model\'s "desk".', module: '1.3' },
  { id: 'lost-in-the-middle', term: 'Lost in the middle', def: 'The tendency of LLMs to use information at the start and end of a long context better than information buried in the middle.', module: '1.3' },
  { id: 'inference', term: 'Inference', def: 'Running an already-trained model to produce output. Every chat reply is inference, and APIs charge for it per token.', module: '1.3' },
  // ---- Module 1.4
  { id: 'pre-training', term: 'Pre-training', aka: ['pretraining'], def: 'The first and by far most expensive training stage: the model learns to predict the next token over trillions of tokens of text, absorbing language, facts and patterns. It produces a base model.', module: '1.4' },
  { id: 'fine-tuning', term: 'Fine-tuning', def: 'Further training of an already-trained model on a smaller, focused dataset to change its behaviour, style or speciality. Instruction tuning is one kind.', module: '1.4' },
  { id: 'instruction-tuning', term: 'Instruction tuning', aka: ['supervised fine-tuning', 'SFT'], def: 'Fine-tuning a base model on example conversations (instruction → ideal answer) so it learns to act as a helpful assistant.', module: '1.4' },
  { id: 'rlhf', term: 'RLHF (reinforcement learning from human feedback)', aka: ['RLHF'], def: 'Post-training in which humans compare model answers, a reward model learns their preferences, and reinforcement learning pushes the model towards preferred answers. The step that made ChatGPT feel helpful.', module: '1.4' },
  { id: 'reward-model', term: 'Reward model', def: 'A model trained to score answers the way human raters would. RLHF uses it as an automatic judge that can rate millions of answers.', module: '1.4' },
  { id: 'alignment', term: 'Alignment', aka: ['AI alignment'], def: 'Making an AI system behave the way people actually intend: helpful, honest and harmless. Also the research field that studies how to do this reliably.', module: '1.4' },
  { id: 'synthetic-data', term: 'Synthetic data', def: 'Training data generated by AI models rather than written by people, such as example conversations or solved maths problems. It is usually filtered and checked before use.', module: '1.4' },
  { id: 'gpu', term: 'GPU (graphics processing unit)', aka: ['GPU'], def: 'A chip with thousands of small cores that do many calculations in parallel. Originally built for graphics, it is now the workhorse for training and running AI models.', module: '1.4' },
  // ---- Module 1.5
  { id: 'temperature', term: 'Temperature', def: 'A setting that controls how random a model\'s word choices are. Low = focused and repeatable; high = varied, then chaotic. It reshapes the probabilities but adds no knowledge.', module: '1.5' },
  { id: 'sampling', term: 'Sampling', def: 'Picking the next token at random according to the model\'s probabilities, like rolling weighted dice. It is the reason the same prompt can give different answers.', module: '1.5' },
  { id: 'greedy-decoding', term: 'Greedy decoding', def: 'Always choosing the single most likely next token (equivalent to temperature 0). Consistent, but not necessarily correct, and it can be bland or repetitive.', module: '1.5' },
  { id: 'top-k', term: 'Top-k sampling', aka: ['top-k'], def: 'A sampling filter that only considers the k most likely next tokens (for example the top 40) and discards the rest before picking.', module: '1.5' },
  { id: 'top-p', term: 'Top-p sampling', aka: ['nucleus sampling', 'top-p'], def: 'A sampling filter that keeps the smallest set of most likely tokens whose probabilities add up to p (for example 90%). The shortlist shrinks when the model is confident and grows when it is unsure.', module: '1.5' },
  // ---- Module 1.6
  { id: 'knowledge-cutoff', term: 'Knowledge cutoff', aka: ['training cutoff', 'cutoff date'], def: 'The point in time when a model\'s training data was collected. The model knows nothing after it unless the information is supplied through search, documents or the prompt.', module: '1.6' },
  { id: 'grounding', term: 'Grounding', def: 'Making a model answer from provided or retrieved sources (documents, search results, databases) instead of from memory alone, ideally with citations you can check. The main defence against hallucination.', module: '1.6' },
  { id: 'sycophancy', term: 'Sycophancy', def: 'A model\'s tendency to agree with the user, flatter them or follow a wrong premise, learned because preference training rewarded answers people liked.', module: '1.6' }
]);
