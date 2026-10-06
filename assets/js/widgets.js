/* =========================================================
   Widgets — interactive learning components.
   Usage inside module HTML:  <div data-widget="key"></div>
   Config: module.widgets[key] = { type:'stepper', ... }
   If no config exists, key is used as the type (e.g. data-widget="tokenizer").
   ========================================================= */
(function () {
  'use strict';
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  function shell(el, title, badge, right) {
    el.classList.add('widget');
    el.innerHTML = `<div class="widget-head"><span class="wt">${title}</span>${badge ? `<span class="badge">${badge}</span>` : ''}<div class="right">${right || ''}</div></div><div class="widget-body"></div>`;
    return el.querySelector('.widget-body');
  }
  const T = {};

  /* ---------- Stepper: walk through steps, each optionally with a diagram ---------- */
  T.stepper = function (el, cfg) {
    const steps = cfg.steps || [];
    let i = 0;
    const body = shell(el, cfg.title || 'Step by step', 'Interactive', `<div class="step-dots"></div>`);
    const foot = h(`<div class="widget-foot"><button class="btn small" data-a="prev">← Back</button><span class="grow muted" style="font-size:.84rem"></span><button class="btn small primary" data-a="next">Next →</button></div>`);
    el.appendChild(foot);
    const dots = el.querySelector('.step-dots');
    dots.innerHTML = steps.map((_, k) => `<button aria-label="step ${k + 1}"></button>`).join('');
    function render() {
      const s = steps[i];
      body.innerHTML = `<div class="step-anim">${s.diagram ? `<div style="margin-bottom:14px">${s.diagram}</div>` : ''}<div class="step-title">${s.title || ''}</div><div>${s.html || ''}</div></div>`;
      [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
      foot.querySelector('.grow').textContent = `Step ${i + 1} of ${steps.length}`;
      foot.querySelector('[data-a=prev]').disabled = i === 0;
      const nx = foot.querySelector('[data-a=next]');
      nx.textContent = i === steps.length - 1 ? '↺ Restart' : 'Next →';
    }
    foot.addEventListener('click', (e) => {
      const a = e.target.dataset.a; if (!a) return;
      if (a === 'prev' && i > 0) i--;
      if (a === 'next') i = i === steps.length - 1 ? 0 : i + 1;
      render();
    });
    dots.addEventListener('click', (e) => { const k = [...dots.children].indexOf(e.target); if (k >= 0) { i = k; render(); } });
    render();
  };

  /* ---------- Decision tree: questions → result ---------- */
  T.decision = function (el, cfg) {
    const body = shell(el, cfg.title || 'Decision helper', 'Interactive', `<button class="btn small" data-a="reset">↺ Restart</button>`);
    let path = [];
    function show(id) {
      const n = cfg.nodes[id];
      if (!n) return;
      const crumbs = path.length ? `<div class="dec-path">${path.map((p) => esc(p)).join(' → ')}</div>` : '';
      if (n.result) {
        body.innerHTML = `<div class="step-anim">${crumbs}<div class="dec-result"><h4>${n.icon || '✅'} ${n.result}</h4>${n.html || ''}</div></div>`;
      } else {
        body.innerHTML = `<div class="step-anim">${crumbs}<div class="dec-q">${n.q}</div>${n.hint ? `<p class="muted" style="margin-top:-6px">${n.hint}</p>` : ''}<div class="dec-opts">${n.options.map((o, k) => `<button data-k="${k}">${o.label}</button>`).join('')}</div></div>`;
        body.querySelectorAll('.dec-opts button').forEach((b) => b.addEventListener('click', () => {
          const o = n.options[+b.dataset.k];
          path.push(o.label.replace(/<[^>]+>/g, ''));
          show(o.next);
        }));
      }
    }
    el.querySelector('[data-a=reset]').addEventListener('click', () => { path = []; show(cfg.start); });
    show(cfg.start);
  };

  /* ---------- Tabs ---------- */
  T.tabs = function (el, cfg) {
    el.classList.add('widget');
    el.innerHTML = `${cfg.title ? `<div class="widget-head"><span class="wt">${cfg.title}</span></div>` : ''}<div class="tabs-nav">${cfg.tabs.map((t, k) => `<button data-k="${k}">${t.label}</button>`).join('')}</div><div class="widget-body"></div>`;
    const body = el.querySelector('.widget-body');
    const btns = el.querySelectorAll('.tabs-nav button');
    function show(k) { btns.forEach((b, j) => b.classList.toggle('on', j === k)); body.innerHTML = `<div class="step-anim">${cfg.tabs[k].html}</div>`; }
    btns.forEach((b) => b.addEventListener('click', () => show(+b.dataset.k)));
    show(0);
  };

  /* ---------- Flip cards ---------- */
  T.flipcards = function (el, cfg) {
    const body = shell(el, cfg.title || 'Flip cards — test yourself', 'Click to flip');
    body.innerHTML = `<div class="flip-grid">${cfg.cards.map((c) => `<div class="flip"><div class="flip-inner"><div class="flip-face flip-front">${c.front}</div><div class="flip-face flip-back">${c.back}</div></div></div>`).join('')}</div>`;
    body.querySelectorAll('.flip').forEach((f) => f.addEventListener('click', () => f.classList.toggle('on')));
  };

  /* ---------- Reveal (Q → click to show A) ---------- */
  T.reveal = function (el, cfg) {
    const body = shell(el, cfg.title || 'Think first, then reveal', 'Interactive');
    body.innerHTML = cfg.items.map((it) => `<div class="reveal-item"><button>❓ ${it.q}</button><div class="a">${it.a}</div></div>`).join('');
    body.querySelectorAll('.reveal-item').forEach((r) => r.querySelector('button').addEventListener('click', () => r.classList.toggle('on')));
  };

  /* ---------- Classify: put each item in the right bucket ---------- */
  T.classify = function (el, cfg) {
    const body = shell(el, cfg.title || 'Sort it out', 'Game', `<span class="muted" style="font-size:.8rem" data-s></span>`);
    const items = cfg.items.slice();
    let i = 0, score = 0;
    const sc = el.querySelector('[data-s]');
    function render() {
      sc.textContent = `${score}/${items.length}`;
      if (i >= items.length) {
        body.innerHTML = `<div class="dec-result"><h4>🎉 Done — ${score} / ${items.length} correct</h4><button class="btn small" data-a="again">Play again</button></div>`;
        body.querySelector('[data-a=again]').addEventListener('click', () => { i = 0; score = 0; render(); });
        return;
      }
      const it = items[i];
      body.innerHTML = `<div class="step-anim"><div class="muted" style="font-size:.8rem;margin-bottom:6px">Item ${i + 1} of ${items.length} — which bucket?</div><div class="cls-item">${it.t}</div><div class="cls-buckets">${cfg.buckets.map((b, k) => `<button data-k="${k}">${b}</button>`).join('')}</div><div data-fb></div></div>`;
      body.querySelectorAll('.cls-buckets button').forEach((b) => b.addEventListener('click', () => {
        const k = +b.dataset.k;
        const ok = k === it.bucket;
        if (ok) score++;
        body.querySelectorAll('.cls-buckets button').forEach((x) => (x.disabled = true));
        body.querySelector('[data-fb]').innerHTML = `<div class="cls-fb ${ok ? 'ok' : 'no'}">${ok ? '✅ Correct!' : `❌ It's <b>${cfg.buckets[it.bucket]}</b>.`} ${it.why || ''}<div style="margin-top:8px"><button class="btn small primary" data-a="n">Next →</button></div></div>`;
        sc.textContent = `${score}/${items.length}`;
        body.querySelector('[data-a=n]').addEventListener('click', () => { i++; render(); });
      }));
    }
    render();
  };

  /* ---------- Chat playback: scripted conversation / agent trace ---------- */
  T.chat = function (el, cfg) {
    const msgs = cfg.messages || [];
    const body = shell(el, cfg.title || 'Conversation', cfg.badge || 'Playback', `<button class="btn small" data-a="all">Show all</button><button class="btn small" data-a="reset">↺</button>`);
    const foot = h(`<div class="widget-foot"><span class="grow muted" style="font-size:.84rem"></span><button class="btn small primary" data-a="next">Play next ▶</button></div>`);
    el.appendChild(foot);
    body.innerHTML = '<div class="chat"></div>';
    const chat = body.querySelector('.chat');
    const labels = { user: 'You', ai: 'AI', system: 'System', tool: 'Tool result', thought: 'Thinking' };
    let i = 0;
    function add(m) { chat.appendChild(h(`<div class="msg ${m.role}"><span class="who">${m.who || labels[m.role] || m.role}</span>${m.text}</div>`)); }
    function upd() { foot.querySelector('.grow').textContent = `${i} / ${msgs.length} messages`; foot.querySelector('[data-a=next]').disabled = i >= msgs.length; }
    el.addEventListener('click', (e) => {
      const a = e.target.dataset.a; if (!a) return;
      if (a === 'next' && i < msgs.length) add(msgs[i++]);
      if (a === 'all') while (i < msgs.length) add(msgs[i++]);
      if (a === 'reset') { chat.innerHTML = ''; i = 0; if (cfg.autoFirst !== false && msgs.length) add(msgs[i++]); }
      upd();
    });
    if (cfg.autoFirst !== false && msgs.length) add(msgs[i++]);
    upd();
  };

  /* ---------- Tokenizer (approximation of BPE-style tokenization) ---------- */
  const COMMON_SUFFIX = ['ization', 'ation', 'ments', 'ment', 'ness', 'ing', 'tion', 'sion', 'able', 'ible', 'less', 'ful', 'ous', 'ive', 'est', 'ers', 'ed', 'ly', 'er', 's'];
  const COMMON_WORDS = new Set('the a an of to in is it and or for on with as at by be this that are was i you he she we they not but from have has had do does can will what how why when which who your my our their his her its about into over just more most than then so if no yes all any some one two new use make like get go see know think good time people way day ai model learn data'.split(' '));
  function tokenize(text) {
    const out = [];
    const re = /(\s*)([A-Za-z]+|\d+|[^\sA-Za-z\d])/g;
    let m;
    while ((m = re.exec(text))) {
      if (m[1].includes('\n')) out.push('\n');
      const sp = m[1].length && !m[1].endsWith('\n') ? ' ' : '';
      let w = m[2];
      if (/^\d+$/.test(w)) { // numbers split in chunks of 3
        const parts = w.match(/\d{1,3}/g);
        parts.forEach((p, k) => out.push((k === 0 ? sp : '') + p));
        continue;
      }
      if (/^[A-Za-z]+$/.test(w) && w.length > 6 && !COMMON_WORDS.has(w.toLowerCase())) {
        const pieces = [];
        let rest = w;
        for (const suf of COMMON_SUFFIX) {
          if (rest.length - suf.length >= 3 && rest.toLowerCase().endsWith(suf)) { pieces.unshift(rest.slice(-suf.length)); rest = rest.slice(0, -suf.length); break; }
        }
        while (rest.length > 6) { pieces.unshift(rest.slice(-4)); rest = rest.slice(0, -4); }
        pieces.unshift(rest);
        pieces.forEach((p, k) => out.push((k === 0 ? sp : '') + p));
      } else out.push(sp + w);
    }
    return out;
  }
  function hashId(s) { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0) % 100000; }
  T.tokenizer = function (el, cfg) {
    const body = shell(el, cfg.title || 'Tokenizer playground', 'Interactive', `<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-ids> show token IDs</label>`);
    body.innerHTML = `<textarea data-in>${esc(cfg.text || 'ChatGPT launched on November 30, 2022. Unbelievably, tokenization splits uncommon words into smaller pieces!')}</textarea>
      <div style="margin:14px 0 6px" class="muted">How the model "sees" your text:</div>
      <div class="tok-wrap" data-out></div>
      <div class="tok-stats"><div><b data-t>0</b><span>tokens</span></div><div><b data-w>0</b><span>words</span></div><div><b data-c>0</b><span>characters</span></div><div><b data-r>0</b><span>tokens per word</span></div></div>
      <p class="muted" style="font-size:.8rem;margin:12px 0 0">≈ Approximation for learning. Real tokenizers (BPE) learn their vocabulary from data — rule of thumb in English: <b>1 token ≈ ¾ of a word ≈ 4 characters</b>. Other languages (e.g. Hindi) often use more tokens per word.</p>`;
    const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#fb923c', '#34d399', '#22d3ee', '#facc15'];
    const inp = body.querySelector('[data-in]'), out = body.querySelector('[data-out]'), ids = el.querySelector('[data-ids]');
    function run() {
      const toks = tokenize(inp.value);
      out.innerHTML = toks.map((t, k) => {
        const c = colors[k % colors.length];
        return `<span class="tok" style="background:color-mix(in srgb, ${c} 22%, transparent);border-color:color-mix(in srgb, ${c} 50%, transparent)">${esc(t.replace(/\n/g, '⏎'))}${ids.checked ? `<span class="id">${hashId(t)}</span>` : ''}</span>`;
      }).join('');
      const words = (inp.value.match(/\S+/g) || []).length;
      body.querySelector('[data-t]').textContent = toks.length;
      body.querySelector('[data-w]').textContent = words;
      body.querySelector('[data-c]').textContent = inp.value.length;
      body.querySelector('[data-r]').textContent = words ? (toks.length / words).toFixed(2) : '0';
    }
    inp.addEventListener('input', run); ids.addEventListener('change', run); run();
  };

  /* ---------- Next-token predictor with temperature ---------- */
  const NT_DEFAULT = [
    { prompt: 'The capital of France is', next: [['Paris', 8.6], ['a', 4.9], ['the', 4.4], ['located', 3.6], ['known', 3.2], ['Lyon', 1.2]] },
    { prompt: 'Once upon a time, there was a', next: [['little', 6.2], ['young', 5.7], ['king', 5.4], ['girl', 5.2], ['dragon', 4.9], ['robot', 3.9], ['banana', 1.0]] },
    { prompt: 'My favourite way to learn something new is', next: [['by', 7.0], ['to', 6.6], ['reading', 5.2], ['through', 5.0], ['watching', 4.6], ['asking', 4.0], ['sleeping', 1.2]] },
    { prompt: '2 + 2 =', next: [['4', 9.5], ['5', 3.0], ['four', 4.2], ['22', 1.5], ['?', 2.2]] }
  ];
  T.nextToken = function (el, cfg) {
    const sc = cfg.scenarios || NT_DEFAULT;
    const body = shell(el, cfg.title || 'Be the language model: next-token prediction', 'Interactive');
    body.innerHTML = `<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px"><label>Prompt:</label><select data-sc>${sc.map((s, k) => `<option value="${k}">${esc(s.prompt)} …</option>`).join('')}</select></div>
      <div class="gen-out" data-out></div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin-bottom:6px"><div><label>Temperature: <b data-tv>1.0</b> <span class="muted" data-tl></span></label><input type="range" min="0" max="2" step="0.1" value="1" data-t></div>
      <div style="display:flex;gap:8px"><button class="btn small primary" data-a="one">Sample 1</button><button class="btn small" data-a="many">Sample ×20</button></div></div>
      <div data-bars></div><div class="tally" data-tally></div>`;
    const sel = body.querySelector('[data-sc]'), tIn = body.querySelector('[data-t]');
    let cur = sc[0], picked = null;
    function probs() {
      const T = +tIn.value;
      if (T === 0) { const mx = Math.max(...cur.next.map((x) => x[1])); return cur.next.map((x) => [x[0], x[1] === mx ? 1 : 0]); }
      const ex = cur.next.map((x) => [x[0], Math.exp(x[1] / T)]); const s = ex.reduce((a, b) => a + b[1], 0);
      return ex.map((x) => [x[0], x[1] / s]);
    }
    function sample() { const p = probs(); let r = Math.random(), acc = 0; for (const [w, v] of p) { acc += v; if (r <= acc) return w; } return p[p.length - 1][0]; }
    function render() {
      const T = +tIn.value;
      body.querySelector('[data-tv]').textContent = T.toFixed(1);
      body.querySelector('[data-tl]').textContent = T === 0 ? '(always picks the top word — deterministic)' : T < 0.6 ? '(focused, predictable)' : T <= 1.2 ? '(balanced)' : '(creative… and chaotic)';
      body.querySelector('[data-out]').innerHTML = `${esc(cur.prompt)} ${picked ? `<span class="new">${esc(picked)}</span>` : '<span class="muted">▁</span>'}`;
      body.querySelector('[data-bars]').innerHTML = probs().sort((a, b) => b[1] - a[1]).map(([w, v]) => `<div class="prob-row ${w === picked ? 'picked' : ''}"><span class="w">${esc(w)}</span><span class="pb"><span style="width:${(v * 100).toFixed(1)}%"></span></span><span class="pv">${(v * 100).toFixed(1)}%</span></div>`).join('');
    }
    sel.addEventListener('change', () => { cur = sc[+sel.value]; picked = null; body.querySelector('[data-tally]').innerHTML = ''; render(); });
    tIn.addEventListener('input', () => { body.querySelector('[data-tally]').innerHTML = ''; render(); });
    el.addEventListener('click', (e) => {
      const a = e.target.dataset.a;
      if (a === 'one') { picked = sample(); render(); }
      if (a === 'many') {
        const t = {}; for (let k = 0; k < 20; k++) { const w = sample(); t[w] = (t[w] || 0) + 1; }
        body.querySelector('[data-tally]').innerHTML = '<span class="muted" style="border:0;background:none">20 samples →</span>' + Object.entries(t).sort((a, b) => b[1] - a[1]).map(([w, n]) => `<span><b>${esc(w)}</b> × ${n}</span>`).join('');
      }
    });
    render();
  };

  /* ---------- Context window budget ---------- */
  T.contextBudget = function (el, cfg) {
    const parts = cfg.parts || [
      { k: 'System prompt & rules', v: 3, c: '#a78bfa', max: 40 },
      { k: 'Tool definitions', v: 6, c: '#fb923c', max: 60 },
      { k: 'Conversation history', v: 20, c: '#60a5fa', max: 400 },
      { k: 'Retrieved docs / files', v: 30, c: '#34d399', max: 800 },
      { k: 'Your current question', v: 1, c: '#f472b6', max: 20 },
      { k: 'Reserved for the answer', v: 8, c: '#facc15', max: 64 }
    ];
    const windows = cfg.windows || [[8, '8K (GPT-3.5 era, 2023)'], [128, '128K (common 2024)'], [200, '200K'], [1000, '1M (2025–26 long-context)']];
    const body = shell(el, cfg.title || 'Context window budget — the model\'s desk', 'Interactive');
    body.innerHTML = `<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><label>Window size:</label><select data-win>${windows.map((w, k) => `<option value="${w[0]}" ${k === 1 ? 'selected' : ''}>${w[1]}</option>`).join('')}</select><span class="muted" style="font-size:.84rem">(values in thousands of tokens)</span></div>
      <div class="budget-bar" data-bar></div><div class="muted" style="font-size:.84rem" data-used></div>
      <div class="budget-legend">${parts.map((p, k) => `<div><div class="row"><span class="sw" style="background:${p.c}"></span><span>${p.k}</span><b data-v="${k}">${p.v}K</b></div><input type="range" min="0" max="${p.max}" value="${p.v}" data-k="${k}"></div>`).join('')}</div>
      <div class="meter" data-meter></div>`;
    const win = body.querySelector('[data-win]');
    function render() {
      const W = +win.value; const total = parts.reduce((a, p) => a + p.v, 0);
      const bar = body.querySelector('[data-bar]');
      bar.innerHTML = parts.map((p) => `<div title="${p.k}: ${p.v}K" style="width:${Math.min(100, (p.v / Math.max(W, total)) * 100)}%;background:${p.c}"></div>`).join('');
      const pct = (total / W) * 100;
      body.querySelector('[data-used]').innerHTML = `Using <b>${total}K</b> of <b>${W}K</b> tokens (${pct.toFixed(0)}%)`;
      let msg;
      if (pct > 100) msg = `🚫 <b>Overflow!</b> Something must be cut, summarised ("compaction") or retrieved more selectively — otherwise the oldest content silently falls off the desk.`;
      else if (pct > 70) msg = `⚠️ <b>Crowded desk.</b> Even when it fits, models get worse at finding the important bit in a huge pile ("context rot" / "lost in the middle"). Curate!`;
      else if (pct > 40) msg = `🟡 <b>Comfortable but watch it.</b> Is every item here actually useful for <i>this</i> question?`;
      else msg = `🟢 <b>Focused context.</b> Lean, relevant context usually gives the best answers — and costs less.`;
      body.querySelector('[data-meter]').innerHTML = msg;
    }
    body.querySelectorAll('input[type=range]').forEach((r) => r.addEventListener('input', () => { const k = +r.dataset.k; parts[k].v = +r.value; body.querySelector(`[data-v="${k}"]`).textContent = r.value + 'K'; render(); }));
    win.addEventListener('change', render);
    render();
  };

  /* ---------- Embedding space (2-D toy) ---------- */
  const EMB = [
    ['king', 72, 22, 'royal'], ['queen', 86, 36, 'royal'], ['prince', 66, 30, 'royal'], ['princess', 80, 44, 'royal'], ['man', 52, 26, 'people'], ['woman', 66, 40, 'people'], ['boy', 47, 34, 'people'], ['girl', 61, 48, 'people'],
    ['cat', 18, 70, 'animal'], ['dog', 24, 76, 'animal'], ['puppy', 28, 82, 'animal'], ['kitten', 14, 78, 'animal'], ['lion', 30, 62, 'animal'], ['tiger', 26, 58, 'animal'],
    ['apple', 82, 80, 'food'], ['banana', 88, 72, 'food'], ['mango', 92, 82, 'food'], ['pizza', 76, 90, 'food'],
    ['Python', 12, 18, 'tech'], ['JavaScript', 20, 12, 'tech'], ['code', 16, 26, 'tech'], ['computer', 26, 20, 'tech'], ['GPU', 30, 10, 'tech'],
    ['happy', 48, 66, 'feeling'], ['joyful', 52, 72, 'feeling'], ['sad', 40, 78, 'feeling'], ['angry', 36, 70, 'feeling']
  ];
  const EMB_C = { royal: '#a78bfa', people: '#60a5fa', animal: '#fb923c', food: '#34d399', tech: '#22d3ee', feeling: '#f472b6' };
  T.embedSpace = function (el, cfg) {
    const body = shell(el, cfg.title || 'Embedding space — meaning as coordinates', 'Interactive', `<button class="btn small" data-a="analogy">king − man + woman = ?</button>`);
    const W = 640, H = 420, sx = (x) => 20 + (x / 100) * (W - 40), sy = (y) => 20 + (y / 100) * (H - 40);
    body.innerHTML = `<svg class="embed-svg" viewBox="0 0 ${W} ${H}"><g data-lines></g>${EMB.map(([w, x, y, g]) => `<g class="pt" data-w="${w}"><circle cx="${sx(x)}" cy="${sy(y)}" r="6" fill="${EMB_C[g]}"/><text x="${sx(x) + 9}" y="${sy(y) + 4}">${w}</text></g>`).join('')}</svg>
      <div class="meter" data-info>👆 Click any word to see its nearest neighbours. Words with similar meaning live close together.</div>`;
    const lines = body.querySelector('[data-lines]'), info = body.querySelector('[data-info]');
    const P = Object.fromEntries(EMB.map((e) => [e[0], e]));
    const dist = (a, b) => Math.hypot(a[1] - b[1], a[2] - b[2]);
    body.querySelectorAll('.pt').forEach((g) => g.addEventListener('click', () => {
      const me = P[g.dataset.w];
      const nn = EMB.filter((e) => e !== me).sort((a, b) => dist(me, a) - dist(me, b)).slice(0, 3);
      lines.innerHTML = nn.map((n) => `<line x1="${sx(me[1])}" y1="${sy(me[2])}" x2="${sx(n[1])}" y2="${sy(n[2])}" class="d-line accent d-flowing"/>`).join('');
      const far = EMB.slice().sort((a, b) => dist(me, b) - dist(me, a))[0];
      info.innerHTML = `<b>${me[0]}</b> → nearest: ${nn.map((n) => `<b>${n[0]}</b> (${dist(me, n).toFixed(0)})`).join(', ')} &nbsp;·&nbsp; farthest: <b>${far[0]}</b>. In real models each word is a list of <b>hundreds or thousands</b> of numbers, not just 2.`;
    }));
    el.querySelector('[data-a=analogy]').addEventListener('click', () => {
      const k = P.king, m = P.man, w = P.woman, q = P.queen;
      const rx = k[1] - m[1] + w[1], ry = k[2] - m[2] + w[2];
      lines.innerHTML = `<line x1="${sx(m[1])}" y1="${sy(m[2])}" x2="${sx(w[1])}" y2="${sy(w[2])}" class="d-line accent" marker-end="url(#arr-accent)"/>
        <line x1="${sx(k[1])}" y1="${sy(k[2])}" x2="${sx(rx)}" y2="${sy(ry)}" class="d-line accent d-flowing" marker-end="url(#arr-accent)"/>
        <circle cx="${sx(rx)}" cy="${sy(ry)}" r="14" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3"/>`;
      info.innerHTML = `The arrow <b>man → woman</b> captures a "gender direction". Start at <b>king</b>, move the same direction… you land right next to <b>${q[0]}</b>! Directions in embedding space encode relationships.`;
    });
  };

  /* ---------- Prompt builder ---------- */
  const PB_DEFAULT = {
    task: { label: 'Task', text: 'Make me a study plan for learning modern AI.' },
    parts: [
      { label: 'Role', c: '#a78bfa', text: 'You are an experienced tutor who teaches complex tech to busy beginners.' },
      { label: 'Context', c: '#60a5fa', text: 'I just finished a competitive exam and missed everything in AI since 2022. I have some technical background but I am not a regular coder. I can study 2 hours per day.' },
      { label: 'Goal', c: '#34d399', text: 'In 8 weeks I want to be able to build a small web app using AI coding agents.' },
      { label: 'Format', c: '#fb923c', text: 'Give a week-by-week table with: topic, why it matters, one hands-on task.' },
      { label: 'Constraints', c: '#f472b6', text: 'Use only free tools. Keep jargon minimal and explain any new term in one line.' },
      { label: 'Example', c: '#22d3ee', text: 'Example row: | Week 1 | How LLMs work | Foundation for everything | Ask a chatbot the same question 3 times and compare |' }
    ],
    outputs: [
      'Sure! Here is a study plan:\n1. Learn Python\n2. Learn machine learning\n3. Learn deep learning\n4. Practice\n…(generic, could be for anyone, ignores your situation)',
      'Here\'s a structured plan… (better tone, but still generic — doesn\'t know your time, level or goal)',
      'Since you have ~2h/day and a technical background, here\'s a focused plan… (personalised, but the format is a wall of text)',
      'Week 1–8 plan aimed at building a web app with AI agents… (clear goal and pacing, format is better)',
      '| Week | Topic | Why it matters | Hands-on task |\n| 1 | How LLMs work | … | … |\n(right format, free tools only, jargon explained)',
      '| Week | Topic | Why it matters | Hands-on task |\n| 1 | How LLMs work | Foundation for everything | Ask a chatbot the same question 3× and compare |\n| 2 | Prompt → context engineering | … | … |\n… ✅ Exactly the shape, tone and level you wanted — first try.'
    ]
  };
  T.promptBuilder = function (el, cfg) {
    const d = Object.assign({}, PB_DEFAULT, cfg);
    const on = d.parts.map(() => false);
    const body = shell(el, cfg.title || 'Prompt builder — add ingredients, watch the answer improve', 'Interactive');
    body.innerHTML = `<div class="pb-toggles">${d.parts.map((p, k) => `<button data-k="${k}" style="--c:${p.c}">+ ${p.label}</button>`).join('')}</div>
      <div class="grid-2"><div><div class="muted" style="font-size:.8rem;margin-bottom:6px">YOUR PROMPT</div><div class="pb-out pb-prompt" data-p></div></div>
      <div><div class="muted" style="font-size:.8rem;margin-bottom:6px">LIKELY AI ANSWER (simulated)</div><div class="pb-out" data-o></div></div></div>
      <div class="meter"><span>Prompt quality</span><div class="quality"><span data-q></span></div><b data-qn></b></div>`;
    function render() {
      const sel = d.parts.filter((_, k) => on[k]);
      body.querySelector('[data-p]').innerHTML = sel.filter((p) => p.label !== 'Example').map((p) => `<span class="part" style="background:color-mix(in srgb, ${p.c} 18%, transparent)">${esc(p.text)}</span>`).join('\n') + (sel.length ? '\n' : '') + `<b>${esc(d.task.text)}</b>` + sel.filter((p) => p.label === 'Example').map((p) => `\n<span class="part" style="background:color-mix(in srgb, ${p.c} 18%, transparent)">${esc(p.text)}</span>`).join('');
      const n = sel.length;
      body.querySelector('[data-o]').textContent = d.outputs[Math.min(n, d.outputs.length - 1)];
      body.querySelector('[data-q]').style.width = `${10 + (n / d.parts.length) * 90}%`;
      body.querySelector('[data-qn]').textContent = `${n}/${d.parts.length}`;
      body.querySelectorAll('.pb-toggles button').forEach((b, k) => { b.classList.toggle('on', on[k]); b.textContent = (on[k] ? '✓ ' : '+ ') + d.parts[k].label; });
    }
    body.querySelectorAll('.pb-toggles button').forEach((b) => b.addEventListener('click', () => { const k = +b.dataset.k; on[k] = !on[k]; render(); }));
    render();
  };

  /* ---------- Hydration ---------- */
  window.Widgets = {
    types: T,
    hydrate(container, mod) {
      container.querySelectorAll('[data-widget]').forEach((el) => {
        const key = el.dataset.widget;
        const cfg = (mod && mod.widgets && mod.widgets[key]) || { type: key };
        const fn = T[cfg.type || key];
        if (!fn) { el.innerHTML = `<div class="callout warn">Unknown widget: ${esc(key)}</div>`; return; }
        try { fn(el, cfg); } catch (err) { console.error('Widget error', key, err); el.innerHTML = `<div class="callout warn">Widget failed to load: ${esc(key)}</div>`; }
      });
    }
  };
})();
