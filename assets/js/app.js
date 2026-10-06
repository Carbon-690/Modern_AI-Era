/* =========================================================
   App — registry, persistence, router, pages, search.
   ========================================================= */
(function () {
  'use strict';
  const C = window.CURRICULUM;
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- Persistence ---------- */
  const KEY = 'mai-hub-v1';
  const store = {
    get() {
      try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); return Object.assign({ done: {}, quiz: {}, notes: {}, last: null, theme: null }, s); }
      catch (e) { return { done: {}, quiz: {}, notes: {}, last: null, theme: null }; }
    },
    update(fn) { const s = this.get(); fn(s); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable */ } return s; }
  };

  /* ---------- Registry ---------- */
  const META = {}; C.modules.forEach((m, i) => { META[m.id] = Object.assign({ index: i }, m); });
  const LEVEL = {}; C.levels.forEach((l) => { LEVEL[l.id] = l; });
  const HUB = window.HUB = {
    modules: {}, glossary: {}, cheatsheets: [], resources: [], status: {},
    registerModule(def) {
      if (!def || !def.id) { console.error('registerModule: missing id', def); return; }
      if (!META[def.id]) console.warn('registerModule: id not in curriculum', def.id);
      this.modules[def.id] = def;
    },
    addTerms(arr) { (arr || []).forEach((t) => { if (t && t.id) this.glossary[t.id] = t; }); },
    addCheatsheets(arr) { this.cheatsheets.push(...(arr || [])); },
    addResources(arr) { this.resources.push(...(arr || [])); },
    store
  };

  function loadScript(src) {
    return new Promise((res) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = () => res(true); s.onerror = () => res(false);
      document.head.appendChild(s);
    });
  }

  /* ---------- Helpers ---------- */
  const modsOf = (lid) => C.modules.filter((m) => m.level === lid);
  const isDone = (id) => !!store.get().done[id];
  const available = (id) => !!HUB.modules[id];
  const diffLabel = { beginner: '🟢 Beginner', intermediate: '🟡 Intermediate', advanced: '🔴 Advanced' };
  const resIcon = { video: '🎬', doc: '📘', docs: '📘', paper: '📄', article: '📰', course: '🎓', tool: '🧰', book: '📚', repo: '💻', podcast: '🎧' };

  /** [[term-id]] / [[term-id|label]] → glossary link; [[m:4.3]] / [[m:4.3|label]] → module link */
  function linkify(html) {
    if (!html) return '';
    return String(html).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (all, id, lab) => {
      id = id.trim();
      if (id.startsWith('m:')) {
        const mid = id.slice(2); const m = META[mid];
        return `<a href="#/m/${mid}">${lab || (m ? `${mid} ${esc(m.title)}` : mid)}</a>`;
      }
      const t = HUB.glossary[id];
      const def = t ? (t.term.length > 1 && t.term[1] === t.term[1].toLowerCase() ? t.term[0].toLowerCase() + t.term.slice(1) : t.term).replace(/\s*\(.*\)$/, '') : id;
      return `<a class="gl" href="#/glossary/${encodeURIComponent(id)}" data-term="${esc(id)}">${lab || esc(def)}</a>`;
    });
  }

  /* ---------- Sidebar ---------- */
  function renderNav() {
    const st = store.get();
    const cur = location.hash.match(/#\/m\/([^/]+)/)?.[1];
    const curLevel = cur ? META[cur]?.level : (location.hash.match(/#\/level\/(L\d)/)?.[1]);
    $('#nav').innerHTML = C.levels.map((l) => {
      const ms = modsOf(l.id);
      const done = ms.filter((m) => st.done[m.id]).length;
      const open = l.id === curLevel || (window.__navOpen || {})[l.id];
      return `<div class="nav-level lvl-${l.id}${open ? ' open' : ''}" data-l="${l.id}">
        <button><span class="chev">▶</span><span class="lv-dot">${l.num}</span><span>${esc(l.title)}</span><span class="lv-count">${done}/${ms.length}</span></button>
        <div class="nav-mods">${ms.map((m) => `<a href="#/m/${m.id}" class="${m.id === cur ? 'active' : ''} ${available(m.id) ? '' : 'soon'}"><span class="num">${m.id}</span><span>${esc(m.title)}</span>${st.done[m.id] ? '<span class="tick">✓</span>' : ''}</a>`).join('')}
        <a href="#/level/${l.id}" style="font-size:.78rem"><span class="num"></span><span>Level overview →</span></a></div></div>`;
    }).join('');
    $('#nav').querySelectorAll('.nav-level > button').forEach((b) => b.addEventListener('click', () => {
      const lv = b.parentElement; lv.classList.toggle('open');
      window.__navOpen = window.__navOpen || {}; window.__navOpen[lv.dataset.l] = lv.classList.contains('open');
    }));
    const total = C.modules.length, done = C.modules.filter((m) => st.done[m.id]).length;
    $('#overall-bar').style.width = `${(done / total) * 100}%`;
    $('#overall-text').textContent = `${done} of ${total} modules complete (${Math.round((done / total) * 100)}%)`;
  }

  /* ---------- Pages ---------- */
  function pageHome() {
    const st = store.get();
    const total = C.modules.length, done = C.modules.filter((m) => st.done[m.id]).length;
    const mins = C.modules.reduce((a, m) => a + m.minutes, 0);
    const quizzes = Object.keys(st.quiz).length;
    const next = st.last && META[st.last] ? META[st.last] : C.modules.find((m) => !st.done[m.id]) || C.modules[0];
    const avail = C.modules.filter((m) => available(m.id)).length;
    return `
      <section class="hero">
        <h1>Catch up on the <span class="g">entire modern AI era</span> — from ChatGPT to autonomous agents.</h1>
        <p>A visual, concept-first path from absolute beginner to advanced builder. Every skill that emerged between <b>Nov 2022</b> and <b>${esc(C.updated)}</b> — explained with diagrams, interactive demos, hands-on tasks and quizzes.</p>
        <div class="actions">
          <a class="btn primary" href="#/m/${next.id}">${st.last ? '▶ Continue: ' : '▶ Start: '}${esc(next.id)} ${esc(next.title)}</a>
          <a class="btn" href="#/map">🗺 Concept map</a>
          <a class="btn" href="#/glossary">📖 Glossary</a>
        </div>
      </section>
      <div class="stats">
        <div class="stat"><b>${done}/${total}</b><span>modules complete</span></div>
        <div class="stat"><b>${quizzes}</b><span>quizzes taken</span></div>
        <div class="stat"><b>~${Math.round(mins / 60)}h</b><span>total learning time</span></div>
        <div class="stat"><b>${Object.keys(HUB.glossary).length}</b><span>glossary terms</span></div>
      </div>
      ${avail < total ? `<div class="callout key"><span class="ic">🚧</span><div><b>${avail} of ${total} modules are published.</b> Faded items in the sidebar are coming in the next phase.</div></div>` : ''}
      <div class="section-title"><h2>Learning path</h2><span>Beginner → Advanced. Each level builds on the previous one.</span></div>
      <div class="level-cards">${C.levels.map((l) => {
        const ms = modsOf(l.id); const d = ms.filter((m) => st.done[m.id]).length; const av = ms.filter((m) => available(m.id)).length;
        return `<a class="level-card lvl-${l.id} ${av ? '' : 'soon'}" href="#/level/${l.id}"><div class="lv">Level ${l.num}</div><h3>${esc(l.title)}</h3><p>${esc(l.subtitle)}</p>
          <div class="meta"><span>${ms.length} modules · ~${Math.round(ms.reduce((a, m) => a + m.minutes, 0) / 6) / 10}h</span><span>${av ? `${d}/${ms.length} done` : `Phase ${l.phase}`}</span></div><div class="bar"><span style="width:${(d / ms.length) * 100}%"></span></div></a>`;
      }).join('')}</div>
      <div class="section-title"><h2>Pick a track</h2><span>Short on time? Follow the path that matches your goal.</span></div>
      <div class="tracks">${C.tracks.map((t) => `<div class="track"><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p><div class="chips">${t.modules.map((id) => `<a class="pill ${st.done[id] ? 'beginner' : ''}" href="#/m/${id}" title="${esc(META[id]?.title)}">${st.done[id] ? '✓ ' : ''}${id}</a>`).join('')}</div></div>`).join('')}</div>`;
  }

  function pageLevel(lid) {
    const l = LEVEL[lid]; if (!l) return pageNotFound();
    const st = store.get(); const ms = modsOf(lid);
    return `<div class="crumbs"><a href="#/">Home</a> › Level ${l.num}</div>
      <div class="mod-head lvl-${l.id}"><span class="num">Level ${l.num}</span><h1>${esc(l.title)}</h1><p class="tagline">${esc(l.subtitle)}</p></div>
      <div class="res-list">${ms.map((m) => {
        const def = HUB.modules[m.id];
        return `<a class="res lvl-${l.id}" href="#/m/${m.id}" style="${available(m.id) ? '' : 'opacity:.55'}"><span class="ic" style="color:var(--c);font-weight:800;min-width:34px">${m.id}</span><span><span class="t">${esc(m.title)}</span><span class="n">${def ? esc(def.tagline || '') : 'Coming in phase ' + l.phase}</span></span><span class="ty" style="display:flex;gap:6px;align-items:center">${st.done[m.id] ? '<span class="pill beginner">✓ Done</span>' : ''}<span class="pill ${m.difficulty}">${diffLabel[m.difficulty]}</span><span class="pill">⏱ ${m.minutes}m</span></span></a>`;
      }).join('')}</div>`;
  }

  function pageModule(id) {
    const m = META[id]; if (!m) return pageNotFound();
    const l = LEVEL[m.level];
    const def = HUB.modules[id];
    const st = store.get();
    const prev = C.modules[m.index - 1], next = C.modules[m.index + 1];
    const pager = `<div class="pager">${prev ? `<a href="#/m/${prev.id}"><small>← Previous</small>${prev.id} ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="#/m/${next.id}"><small>Next →</small>${next.id} ${esc(next.title)}</a>` : '<span></span>'}</div>`;
    const head = `<div class="crumbs"><a href="#/">Home</a> › <a href="#/level/${l.id}">Level ${l.num}: ${esc(l.title)}</a></div>
      <div class="mod-head"><span class="num">Module ${m.id}</span><h1>${esc(def?.title || m.title)}</h1>${def?.tagline ? `<p class="tagline">${linkify(def.tagline)}</p>` : ''}
      <div class="pills"><span class="pill ${m.difficulty}">${diffLabel[m.difficulty]}</span><span class="pill">⏱ ${m.minutes} min</span>${m.prereqs.length ? `<span class="pill">Builds on: ${m.prereqs.map((p) => `<a href="#/m/${p}">${p}</a>`).join(', ')}</span>` : ''}${st.done[id] ? '<span class="pill beginner">✓ Completed</span>' : ''}</div>${def?.contributor ? `<div class="contrib-badge" style="margin-top:8px;font-size:0.84rem;color:var(--text-muted)">✍️ Contributed by <b>${esc(def.contributor.name)}</b>${def.contributor.github ? ` (<a href="https://github.com/${esc(def.contributor.github)}" target="_blank" rel="noopener">@${esc(def.contributor.github)}</a>)` : ''}</div>` : ''}</div>`;
    if (!def) {
      return `<div class="lvl-${l.id}">${head}<div class="empty"><div class="big">🚧</div><h2>Coming in Phase ${l.phase}</h2><p>This module is planned and will appear here automatically once it's written.</p></div>${pager}</div>`;
    }
    let n = 0;
    const sec = (title, inner, ic) => `<section class="mod-section"><h2><span class="sn">${ic || String(++n).padStart(2, '0')}</span>${title}</h2>${inner}</section>`;
    let html = `<div class="lvl-${l.id}">${head}`;
    if (def.why) html += `<div class="card why"><div class="card-label"><span class="ic">💡</span>Why was this invented?${def.why.era ? `<span class="pill era">${esc(def.why.era)}</span>` : ''}</div>${linkify(def.why.html)}</div>`;
    if (def.analogy) html += `<div class="card analogy"><div class="card-label"><span class="ic">🧠</span>Mental model</div>${def.analogy.title ? `<h3>${linkify(def.analogy.title)}</h3>` : ''}${linkify(def.analogy.html)}</div>`;
    if (def.diagram) html += `<figure class="diagram">${def.diagram.title ? `<div class="fig-title">${esc(def.diagram.title)}</div>` : ''}${def.diagram.svg || ''}${def.diagram.caption ? `<figcaption>${linkify(def.diagram.caption)}</figcaption>` : ''}</figure>`;
    (def.sections || []).forEach((s) => { html += sec(linkify(s.title), linkify(s.html)); });
    if (def.deeper && def.deeper.length) {
      html += `<details class="deeper"><summary>🔍 Go deeper — for the curious<span class="pill advanced">Optional</span></summary>${def.deeper.map((d) => `<div class="deep-item"><h3>${linkify(d.title)}</h3>${linkify(d.html)}</div>`).join('')}</details>`;
    }
    if (def.misconceptions && def.misconceptions.length) {
      html += sec('Common misconceptions', `<div class="myths">${def.misconceptions.map((x) => `<div class="myth"><div class="m"><b>❌ Myth</b>${linkify(x.myth)}</div><div class="t"><b>✅ Reality</b>${linkify(x.truth)}</div></div>`).join('')}</div>`, '⚠️');
    }
    if (def.takeaways && def.takeaways.length) html += sec('Key takeaways', `<ul class="takeaways">${def.takeaways.map((t) => `<li><span>${linkify(t)}</span></li>`).join('')}</ul>`, '📌');
    if (def.tryIt) {
      const t = def.tryIt;
      html += `<div class="card tryit"><div class="card-label"><span class="ic">🛠</span>Try it yourself${t.time ? `<span class="pill" style="margin-left:auto">⏱ ${esc(t.time)}</span>` : ''}</div>${t.title ? `<h3 style="margin:0 0 6px">${linkify(t.title)}</h3>` : ''}${t.intro ? linkify(t.intro) : ''}<ol>${(t.steps || []).map((s) => `<li>${linkify(s)}</li>`).join('')}</ol>${t.tools && t.tools.length ? `<div class="tool-chips"><span class="muted" style="font-size:.84rem">Tools:</span>${t.tools.map((x) => `<span class="pill">${esc(x)}</span>`).join('')}</div>` : ''}${t.outro ? linkify(t.outro) : ''}</div>`;
    }
    if (def.quiz && def.quiz.length) html += sec('Quick check', `<div class="card" id="quiz"></div>`, '❓');
    if (def.terms && def.terms.length) html += sec('Key terms', `<div class="terms">${def.terms.map((t) => { const g = HUB.glossary[t]; return `<a class="term-chip" data-term="${esc(t)}" href="#/glossary/${encodeURIComponent(t)}">${esc(g ? g.term : t)}</a>`; }).join('')}</div>`, '🏷');
    if (def.resources && def.resources.length) html += sec('Go further — curated resources', `<div class="res-list">${def.resources.map((r) => `<a class="res" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="ic">${resIcon[r.type] || '🔗'}</span><span><span class="t">${esc(r.title)}</span>${r.note ? `<span class="n">${esc(r.note)}</span>` : ''}</span><span class="pill ty">${esc(r.type || 'link')}</span></a>`).join('')}</div>`, '🔗');
    if (def.connects && def.connects.length) html += sec('Where this connects', `<div class="connects">${def.connects.map((c) => { const cm = META[c]; return cm ? `<a class="conn lvl-${cm.level}" href="#/m/${c}"><small>${c}</small>${esc(cm.title)}</a>` : ''; }).join('')}</div>`, '➡');
    html += `<section class="mod-section notes"><h2><span class="sn">✍</span>My notes</h2><textarea id="notes" placeholder="Write what you understood in your own words — it's the fastest way to learn. Saved automatically on this device.">${esc(st.notes[id] || '')}</textarea></section>`;
    html += `<div class="complete-bar"><span class="msg">${st.done[id] ? '✅ You completed this module.' : 'Finished reading, tried the exercise and took the quiz?'}</span><button class="btn ${st.done[id] ? '' : 'primary'}" id="done-btn">${st.done[id] ? '↺ Mark as not done' : '✓ Mark as complete'}</button></div>`;
    html += pager;
    if (def.updated) html += `<div class="updated">Content accurate as of ${esc(def.updated)}. AI moves fast — tool names change, concepts last.</div>`;
    return html + '</div>';
  }

  function afterModule(id) {
    const def = HUB.modules[id]; if (!def) return;
    const view = $('#view');
    window.Widgets.hydrate(view, def);
    const q = $('#quiz'); if (q) window.Quiz.render(q, id, def.quiz, store);
    const notes = $('#notes');
    if (notes) { let t; notes.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => store.update((s) => { s.notes[id] = notes.value; }), 400); }); }
    $('#done-btn')?.addEventListener('click', () => {
      store.update((s) => { if (s.done[id]) delete s.done[id]; else s.done[id] = Date.now(); });
      const wasDone = isDone(id);
      render();
      if (wasDone) { const nx = C.modules[META[id].index + 1]; if (nx) setTimeout(() => $('.pager .next')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50); }
    });
    store.update((s) => { s.last = id; });
  }

  function pageGlossary(focus) {
    const terms = Object.values(HUB.glossary).sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
    const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase().replace(/[^A-Z]/, '#')))];
    let cur = '';
    const body = terms.map((t) => {
      const L = t.term[0].toUpperCase().replace(/[^A-Z]/, '#');
      const hdr = L !== cur ? `<div class="gl-letter" id="L-${L}">${L}</div>` : ''; cur = L;
      const m = META[t.module];
      return `${hdr}<div class="gl-item" id="t-${esc(t.id)}" data-s="${esc((t.term + ' ' + (t.aka || []).join(' ') + ' ' + t.def).toLowerCase())}"><span class="t">${esc(t.term)}</span>${t.aka && t.aka.length ? `<span class="aka">also: ${esc(t.aka.join(', '))}</span>` : ''}<p class="d">${linkify(t.def)}</p>${m ? `<a class="from" href="#/m/${m.id}">📍 Learn in ${m.id} · ${esc(m.title)}</a>` : ''}</div>`;
    }).join('');
    setTimeout(() => {
      const inp = $('#gl-search');
      inp?.addEventListener('input', () => {
        const q = inp.value.toLowerCase().trim();
        document.querySelectorAll('.gl-item').forEach((el) => { el.style.display = !q || el.dataset.s.includes(q) ? '' : 'none'; });
        document.querySelectorAll('.gl-letter').forEach((el) => { el.style.display = q ? 'none' : ''; });
      });
      if (focus) { const el = document.getElementById('t-' + focus); if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); } }
    }, 30);
    return `<div class="page-head"><h1>📖 Glossary</h1><p>${terms.length} terms from the modern AI era, explained in plain language. Each one links to the module where you learn it properly.</p></div>
      <div class="gl-tools"><input id="gl-search" type="search" placeholder="Filter terms…"></div>
      <div class="az">${letters.map((L) => `<a href="javascript:void(0)" onclick="document.getElementById('L-${L}').scrollIntoView({behavior:'smooth'})">${L}</a>`).join('')}</div>${body || '<p class="muted">Glossary is loading…</p>'}`;
  }

  function pageMap() {
    const st = store.get();
    const colW = 200, nodeW = 176, nodeH = 46, gapY = 14, top = 40;
    const maxRows = Math.max(...C.levels.map((l) => modsOf(l.id).length));
    const W = C.levels.length * colW + 20, H = top + maxRows * (nodeH + gapY) + 20;
    const pos = {};
    C.levels.forEach((l, ci) => modsOf(l.id).forEach((m, ri) => { pos[m.id] = { x: 10 + ci * colW + (colW - nodeW) / 2, y: top + ri * (nodeH + gapY) }; }));
    let edges = '';
    C.modules.forEach((m) => m.prereqs.forEach((p) => {
      const a = pos[p], b = pos[m.id]; if (!a || !b) return;
      const x1 = a.x + nodeW, y1 = a.y + nodeH / 2, x2 = b.x, y2 = b.y + nodeH / 2;
      const d = x2 > x1 ? `M${x1},${y1} C${x1 + 40},${y1} ${x2 - 40},${y2} ${x2},${y2}` : `M${a.x + nodeW / 2},${a.y + nodeH} C${a.x + nodeW / 2 + 60},${(a.y + b.y) / 2 + nodeH} ${b.x + nodeW / 2 + 60},${(a.y + b.y) / 2} ${b.x + nodeW / 2},${b.y}`;
      edges += `<path class="medge" data-from="${p}" data-to="${m.id}" d="${d}"/>`;
    }));
    const cols = C.levels.map((l, ci) => `<text class="mcol lvl-${l.id}" x="${10 + ci * colW + colW / 2}" y="22" text-anchor="middle">L${l.num} · ${esc(l.title.toUpperCase().slice(0, 22))}</text>`).join('');
    const nodes = C.modules.map((m) => {
      const p = pos[m.id]; const lines = window.D.wrap(m.title, 26).slice(0, 2);
      return `<g class="mnode lvl-${m.level} ${st.done[m.id] ? 'done' : ''} ${available(m.id) ? '' : 'soon'}" data-id="${m.id}" transform="translate(${p.x},${p.y})"><rect width="${nodeW}" height="${nodeH}" rx="10"/><text x="8" y="${lines.length > 1 ? 17 : 27}"><tspan font-weight="800">${m.id}</tspan> ${esc(lines[0])}</text>${lines[1] ? `<text x="8" y="34">${esc(lines[1])}${window.D.wrap(m.title, 26).length > 2 ? '…' : ''}</text>` : ''}</g>`;
    }).join('');
    setTimeout(() => {
      const svgEl = $('.map-svg'); if (!svgEl) return;
      svgEl.querySelectorAll('.mnode').forEach((g) => {
        const id = g.dataset.id;
        g.addEventListener('mouseenter', () => {
          svgEl.querySelectorAll(`.medge[data-to="${id}"], .medge[data-from="${id}"]`).forEach((e) => e.classList.add('on'));
          $('#map-info').innerHTML = `<b>${id} ${esc(META[id].title)}</b> · builds on: ${META[id].prereqs.map((p) => `${p}`).join(', ') || 'nothing — start here'} · unlocks: ${C.modules.filter((x) => x.prereqs.includes(id)).map((x) => x.id).join(', ') || '—'}`;
        });
        g.addEventListener('mouseleave', () => svgEl.querySelectorAll('.medge.on').forEach((e) => e.classList.remove('on')));
        g.addEventListener('click', () => { location.hash = `#/m/${id}`; });
      });
    }, 30);
    return `<div class="page-head"><h1>🗺 Concept map</h1><p>Every module and what it builds on. Hover a concept to see its prerequisites and what it unlocks; click to open it. Filled boxes = completed.</p></div>
      <div class="meter" id="map-info" style="margin-bottom:12px">Hover over a concept…</div>
      <div class="map-wrap"><svg class="map-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${edges}${cols}${nodes}</svg></div>`;
  }

  function pageResources() {
    const all = [];
    C.modules.forEach((m) => (HUB.modules[m.id]?.resources || []).forEach((r) => all.push(Object.assign({ mod: m }, r))));
    const general = HUB.resources;
    const types = [...new Set([...all, ...general].map((r) => r.type || 'link'))];
    setTimeout(() => {
      document.querySelectorAll('[data-ft]').forEach((b) => b.addEventListener('click', () => {
        const t = b.dataset.ft;
        document.querySelectorAll('[data-ft]').forEach((x) => x.classList.toggle('primary', x === b));
        document.querySelectorAll('.res[data-type]').forEach((r) => { r.style.display = t === 'all' || r.dataset.type === t ? '' : 'none'; });
      }));
    }, 30);
    const item = (r) => `<a class="res" data-type="${esc(r.type || 'link')}" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="ic">${resIcon[r.type] || '🔗'}</span><span><span class="t">${esc(r.title)}</span><span class="n">${esc(r.note || '')}${r.mod ? ` · from ${r.mod.id}` : ''}</span></span><span class="pill ty">${esc(r.type || 'link')}</span></a>`;
    return `<div class="page-head"><h1>🔗 Resource library</h1><p>Hand-picked videos, official docs, papers and courses — collected from every module. (These open online.)</p></div>
      <div class="gl-tools"><button class="btn small primary" data-ft="all">All</button>${types.map((t) => `<button class="btn small" data-ft="${esc(t)}">${resIcon[t] || '🔗'} ${esc(t)}</button>`).join('')}</div>
      ${general.length ? `<h2>Start here — best overall resources</h2><div class="res-list">${general.map(item).join('')}</div>` : ''}
      ${C.levels.map((l) => { const rs = all.filter((r) => r.mod.level === l.id); return rs.length ? `<h2 class="lvl-${l.id}" style="margin-top:30px"><span style="color:var(--c)">Level ${l.num}</span> · ${esc(l.title)}</h2><div class="res-list">${rs.map(item).join('')}</div>` : ''; }).join('')}`;
  }

  function pageCheatsheets() {
    const cs = HUB.cheatsheets;
    if (!cs.length) return `<div class="page-head"><h1>📋 Cheat sheets</h1></div><div class="empty"><div class="big">🚧</div><h2>Coming in Phase 3</h2><p>One-page summaries: prompt patterns, model chooser, agent patterns, and more.</p></div>`;
    setTimeout(() => window.Widgets.hydrate($('#view'), { widgets: Object.assign({}, ...cs.map((c) => c.widgets || {})) }), 30);
    return `<div class="page-head"><h1>📋 Cheat sheets</h1><p>One-page summaries to keep open while you work with AI. Print-friendly.</p></div>
      <div class="gl-tools">${cs.map((c, i) => `<a class="btn small" href="javascript:void(0)" onclick="document.getElementById('cs-${i}').scrollIntoView({behavior:'smooth'})">${esc(c.title)}</a>`).join('')}</div>
      ${cs.map((c, i) => `<div class="card" id="cs-${i}"><h2>${esc(c.title)}</h2>${c.subtitle ? `<p class="muted">${esc(c.subtitle)}</p>` : ''}${linkify(c.html)}</div>`).join('')}`;
  }

  function pageNotFound() { return `<div class="empty"><div class="big">🤷</div><h2>Page not found</h2><p><a href="#/">Back home</a></p></div>`; }

  /* ---------- Router ---------- */
  function render() {
    const hash = location.hash || '#/';
    const view = $('#view');
    let html, after = null, wide = false;
    let mm;
    if ((mm = hash.match(/^#\/m\/([^/?]+)/))) { const id = decodeURIComponent(mm[1]); html = pageModule(id); after = () => afterModule(id); }
    else if ((mm = hash.match(/^#\/level\/(L\d)/))) html = pageLevel(mm[1]);
    else if ((mm = hash.match(/^#\/glossary(?:\/(.+))?/))) html = pageGlossary(mm[1] ? decodeURIComponent(mm[1]) : null);
    else if (hash.startsWith('#/map')) { html = pageMap(); wide = true; }
    else if (hash.startsWith('#/resources')) html = pageResources();
    else if (hash.startsWith('#/cheatsheets')) html = pageCheatsheets();
    else if (hash === '#/' || hash === '#' || hash === '') html = pageHome();
    else html = pageNotFound();
    view.classList.toggle('wide', wide);
    view.innerHTML = html;
    if (after) after();
    renderNav();
    $('#sidebar').classList.remove('open');
    if (!hash.startsWith('#/glossary/')) window.scrollTo(0, 0);
    const t = HUB.modules[hash.match(/^#\/m\/([^/?]+)/)?.[1]]?.title;
    document.title = (t ? t + ' · ' : '') + 'Modern AI Era — Learning Hub';
  }

  /* ---------- Tooltips for glossary terms ---------- */
  function initTooltips() {
    let tip = null;
    document.addEventListener('mouseover', (e) => {
      const a = e.target.closest('[data-term]'); if (!a) return;
      const t = HUB.glossary[a.dataset.term]; if (!t) return;
      tip = tip || document.body.appendChild(Object.assign(document.createElement('div'), { className: 'tooltip' }));
      tip.innerHTML = `<b>${esc(t.term)}</b>${linkify(t.def).replace(/<a [^>]*>|<\/a>/g, '')}`;
      const r = a.getBoundingClientRect();
      tip.style.display = 'block';
      const tw = Math.min(340, window.innerWidth - 20);
      tip.style.left = Math.max(10, Math.min(r.left, window.innerWidth - tw - 10)) + 'px';
      const below = r.bottom + 8 + tip.offsetHeight < window.innerHeight;
      tip.style.top = (below ? r.bottom + 8 : r.top - tip.offsetHeight - 8) + 'px';
    });
    document.addEventListener('mouseout', (e) => { if (tip && e.target.closest('[data-term]')) tip.style.display = 'none'; });
  }

  /* ---------- Search ---------- */
  function initSearch() {
    const inp = $('#search'), box = $('#search-results');
    let sel = -1, items = [];
    function strip(h) { return String(h || '').replace(/<[^>]+>/g, ' ').replace(/\[\[(?:m:)?([^\]|]+)(?:\|([^\]]+))?\]\]/g, (a, b, c) => c || b); }
    function index() {
      const idx = [];
      C.modules.forEach((m) => {
        const d = HUB.modules[m.id];
        const body = d ? [d.tagline, d.analogy?.title, ...(d.sections || []).map((s) => s.title + ' ' + strip(s.html))].join(' ') : '';
        idx.push({ kind: 'module', href: `#/m/${m.id}`, title: `${m.id} ${m.title}`, hay: (m.title + ' ' + body).toLowerCase(), snip: d?.tagline || '' });
      });
      Object.values(HUB.glossary).forEach((t) => idx.push({ kind: 'term', href: `#/glossary/${encodeURIComponent(t.id)}`, title: t.term, hay: (t.term + ' ' + (t.aka || []).join(' ') + ' ' + t.def).toLowerCase(), snip: strip(t.def), boost: t.term.toLowerCase() }));
      return idx;
    }
    let IDX = null;
    function show() {
      const q = inp.value.toLowerCase().trim();
      if (!q) { box.hidden = true; return; }
      IDX = IDX || index();
      items = IDX.map((it) => {
        let s = 0;
        if (it.title.toLowerCase().includes(q)) s += 10;
        if (it.boost === q) s += 20;
        if (it.boost && it.boost.startsWith(q)) s += 6;
        if (it.hay.includes(q)) s += 2;
        return [s, it];
      }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 12).map((x) => x[1]);
      sel = -1;
      box.innerHTML = items.length ? items.map((it, i) => `<a href="${it.href}" data-i="${i}"><span class="kind">${it.kind}</span>${esc(it.title)}${it.snip ? `<span class="snip">${esc(strip(it.snip).slice(0, 110))}</span>` : ''}</a>`).join('') : '<div class="muted" style="padding:10px">No results</div>';
      box.hidden = false;
    }
    inp.addEventListener('input', show);
    inp.addEventListener('focus', show);
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); sel = Math.max(0, Math.min(items.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
        box.querySelectorAll('a').forEach((a, i) => a.classList.toggle('sel', i === sel));
      } else if (e.key === 'Enter' && items.length) { location.hash = items[Math.max(0, sel)].href; box.hidden = true; inp.blur(); }
      else if (e.key === 'Escape') { box.hidden = true; inp.blur(); }
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) box.hidden = true; else if (e.target.closest('.search-results a')) { box.hidden = true; inp.value = ''; } });
    document.addEventListener('keydown', (e) => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); inp.focus(); } });
    HUB.resetSearch = () => { IDX = null; };
  }

  /* ---------- Boot ---------- */
  async function boot() {
    const st = store.get();
    if (st.theme) document.documentElement.dataset.theme = st.theme;
    $('#theme-btn').addEventListener('click', () => {
      const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = t; store.update((s) => { s.theme = t; });
    });
    $('#menu-btn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    initTooltips(); initSearch();
    window.addEventListener('hashchange', render);
    document.addEventListener('hub:progress', renderNav);
    $('#view').innerHTML = '<div class="empty"><div class="big">◆</div><p>Loading the hub…</p></div>';
    await Promise.all([
      ...C.glossaryFiles.map((g) => loadScript(`content/glossary/${g}.js`)),
      ...C.modules.map((m) => loadScript(`content/modules/${m.file}.js`).then((ok) => { HUB.status[m.id] = ok; })),
      loadScript('content/resources.js'),
      loadScript('content/cheatsheets.js')
    ]);
    HUB.resetSearch && HUB.resetSearch();
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
