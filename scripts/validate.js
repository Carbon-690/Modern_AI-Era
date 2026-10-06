#!/usr/bin/env node
/* =========================================================
   Content validator for the Modern AI Era hub.
   Usage:
     node scripts/validate.js                # validate everything that exists
     node scripts/validate.js --level L1     # only one level's modules
     node scripts/validate.js --strict       # missing module files are errors
     node scripts/validate.js --browser      # + headless Chromium runtime check of every module page
   ========================================================= */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const BROWSER = args.includes('--browser');
const LEVEL = args.includes('--level') ? args[args.indexOf('--level') + 1] : null;

const errors = [], warnings = [];
const err = (where, msg) => errors.push(`✗ [${where}] ${msg}`);
const warn = (where, msg) => warnings.push(`! [${where}] ${msg}`);

// ---- sandbox
const registered = [], terms = {}, termSrc = {};
const ctx = { console, Math, JSON, Object, Array, String, Number, Date, RegExp, Set, Map };
ctx.window = ctx; ctx.globalThis = ctx;
ctx.HUB = {
  registerModule: (d) => registered.push(d),
  addTerms: (arr) => (arr || []).forEach((t) => {
    if (terms[t.id]) err('glossary', `duplicate term id "${t.id}" (in ${termSrc[t.id]} and ${ctx.__file})`);
    terms[t.id] = t; termSrc[t.id] = ctx.__file;
  }),
  addCheatsheets: () => {}, addResources: () => {}
};
vm.createContext(ctx);
function run(file) {
  ctx.__file = path.relative(ROOT, file);
  try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file }); return true; }
  catch (e) { err(path.relative(ROOT, file), `JS error: ${e.message}`); return false; }
}
run(path.join(ROOT, 'assets/js/diagrams.js'));
run(path.join(ROOT, 'content/curriculum.js'));
const C = ctx.CURRICULUM;
const META = Object.fromEntries(C.modules.map((m) => [m.id, m]));
const widgetSrc = fs.readFileSync(path.join(ROOT, 'assets/js/widgets.js'), 'utf8');
const WIDGET_TYPES = new Set([...widgetSrc.matchAll(/T\.(\w+)\s*=\s*function/g)].map((m) => m[1]));

// ---- glossary
for (const g of C.glossaryFiles) {
  const f = path.join(ROOT, 'content/glossary', g + '.js');
  if (fs.existsSync(f)) run(f);
}
for (const t of Object.values(terms)) {
  if (!t.term || !t.def) err('glossary', `term "${t.id}" missing term/def`);
  if (t.module && !META[t.module]) err('glossary', `term "${t.id}" points to unknown module ${t.module}`);
}

// ---- modules
const stats = { present: 0, missing: [] };
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const toCheck = C.modules.filter((m) => (!LEVEL || m.level === LEVEL) && (!ONLY || ONLY.includes(m.id)));
function collectStrings(obj, out = []) {
  if (typeof obj === 'string') out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((x) => collectStrings(x, out));
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((x) => collectStrings(x, out));
  return out;
}
for (const m of toCheck) {
  const f = path.join(ROOT, 'content/modules', m.file + '.js');
  if (!fs.existsSync(f)) { stats.missing.push(m.id); if (STRICT) err(m.id, `missing file ${m.file}.js`); continue; }
  const before = registered.length;
  if (!run(f)) continue;
  const regs = registered.slice(before);
  if (regs.length !== 1) { err(m.id, `file must call HUB.registerModule exactly once (got ${regs.length})`); continue; }
  const d = regs[0];
  stats.present++;
  const W = m.id;
  if (d.id !== m.id) err(W, `registered id "${d.id}" ≠ curriculum id "${m.id}"`);
  for (const k of ['title', 'tagline', 'updated']) if (!d[k] || typeof d[k] !== 'string') err(W, `missing "${k}"`);
  if (!d.why || !d.why.html) err(W, 'missing why.html');
  if (!d.analogy || !d.analogy.html) err(W, 'missing analogy.html');
  if (!d.diagram || typeof d.diagram.svg !== 'string' || !d.diagram.svg.includes('<')) err(W, 'missing diagram.svg (main diagram)');
  if (!Array.isArray(d.sections) || d.sections.length < 3) err(W, `needs ≥3 sections (has ${d.sections ? d.sections.length : 0})`);
  (d.sections || []).forEach((s, i) => { if (!s.title || !s.html) err(W, `section ${i + 1} missing title/html`); });
  if (!Array.isArray(d.misconceptions) || d.misconceptions.length < 2) err(W, 'needs ≥2 misconceptions');
  (d.misconceptions || []).forEach((x, i) => { if (!x.myth || !x.truth) err(W, `misconception ${i + 1} needs myth & truth`); });
  if (!Array.isArray(d.takeaways) || d.takeaways.length < 3) err(W, 'needs ≥3 takeaways');
  if (!d.tryIt || !Array.isArray(d.tryIt.steps) || d.tryIt.steps.length < 3) err(W, 'tryIt needs ≥3 steps');
  if (!Array.isArray(d.quiz) || d.quiz.length < 4) err(W, `needs ≥4 quiz questions (has ${d.quiz ? d.quiz.length : 0})`);
  (d.quiz || []).forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length < 2) err(W, `quiz ${i + 1} malformed`);
    else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) err(W, `quiz ${i + 1} answer index out of range`);
    if (!q.explain) warn(W, `quiz ${i + 1} has no explanation`);
  });
  const ansDist = (d.quiz || []).map((q) => q.answer);
  if (ansDist.length >= 4 && new Set(ansDist).size === 1) warn(W, 'all quiz answers have the same index — vary them');
  if (!Array.isArray(d.terms) || d.terms.length < 3) err(W, 'needs ≥3 terms');
  (d.terms || []).forEach((t) => { if (!terms[t]) err(W, `term "${t}" not found in any glossary file`); });
  if (!Array.isArray(d.resources) || d.resources.length < 2) err(W, 'needs ≥2 resources');
  (d.resources || []).forEach((r, i) => { if (!r.title || !/^https:\/\//.test(r.url || '')) err(W, `resource ${i + 1} needs title & https url`); });
  (d.connects || []).forEach((c) => { if (!META[c]) err(W, `connects to unknown module ${c}`); });
  if (!d.connects || !d.connects.length) warn(W, 'no "connects"');
  if (m.level !== 'L8' && (!d.deeper || !d.deeper.length)) warn(W, 'no "deeper" items');

  // links, widgets, offline-safety, svg balance
  const strs = collectStrings(d);
  const all = strs.join('\n');
  for (const mm of all.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
    const id = mm[1].trim();
    if (id.startsWith('m:')) { if (!META[id.slice(2)]) err(W, `broken module link [[${id}]]`); }
    else if (!terms[id]) err(W, `broken glossary link [[${id}]]`);
  }
  for (const mm of all.matchAll(/data-widget="([^"]+)"/g)) {
    const key = mm[1];
    const cfg = d.widgets && d.widgets[key];
    const type = cfg ? cfg.type : key;
    if (!WIDGET_TYPES.has(type)) err(W, `data-widget="${key}" → unknown widget type "${type}"`);
  }
  if (d.widgets) for (const [k, cfg] of Object.entries(d.widgets)) {
    if (!WIDGET_TYPES.has(cfg.type)) err(W, `widgets.${k}: unknown type "${cfg.type}"`);
    if (!all.includes(`data-widget="${k}"`)) warn(W, `widgets.${k} defined but never placed`);
    if (cfg.type === 'quiz') err(W, 'use the quiz field, not a widget');
    if (cfg.type === 'decision' && cfg.nodes) {
      if (!cfg.nodes[cfg.start]) err(W, `widgets.${k}: start node "${cfg.start}" missing`);
      for (const [nid, n] of Object.entries(cfg.nodes)) (n.options || []).forEach((o) => { if (!cfg.nodes[o.next]) err(W, `widgets.${k}: node ${nid} → missing "${o.next}"`); });
    }
    if (cfg.type === 'classify') (cfg.items || []).forEach((it, i) => { if (!(it.bucket >= 0 && it.bucket < cfg.buckets.length)) err(W, `widgets.${k}: item ${i + 1} bad bucket`); });
  }
  if (/<script|<iframe|src=["']https?:/i.test(all)) err(W, 'external/embedded src or <script>/<iframe> found — must work offline');
  const cnt = (re) => (all.match(re) || []).length;
  if (cnt(/<svg[\s>]/g) !== cnt(/<\/svg>/g)) err(W, 'unbalanced <svg> tags');
  if (cnt(/<g[\s>]/g) !== cnt(/<\/g>/g)) err(W, 'unbalanced <g> tags');
  if (cnt(/<details[\s>]/g) !== cnt(/<\/details>/g)) err(W, 'unbalanced <details>');
  if (cnt(/<div[\s>]/g) !== cnt(/<\/div>/g)) err(W, `unbalanced <div> tags (${cnt(/<div[\s>]/g)} open vs ${cnt(/<\/div>/g)} close)`);
  const words = all.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
  if (words < 900 && m.level !== 'L0') warn(W, `only ~${words} words — modules should be substantial (aim 1500+)`);
}

// ---- browser runtime check
if (BROWSER && !errors.length) {
  const chrome = ['chromium', 'chromium-browser', 'google-chrome'].find((b) => { try { execFileSync('which', [b], { stdio: 'ignore' }); return true; } catch (e) { return false; } });
  if (!chrome) warn('browser', 'no chromium found, skipping');
  else {
    const ids = toCheck.filter((m) => fs.existsSync(path.join(ROOT, 'content/modules', m.file + '.js'))).map((m) => m.id);
    const routes = ['#/', '#/map', '#/glossary', '#/resources', ...ids.map((i) => '#/m/' + i)];
    for (const r of routes) {
      let out = '', stderr = '';
      try {
        out = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--allow-file-access-from-files', '--virtual-time-budget=4000', '--enable-logging=stderr', '--v=0', '--dump-dom', `file://${ROOT}/index.html${r}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 40000, maxBuffer: 64 * 1024 * 1024 });
      } catch (e) { out = e.stdout || ''; stderr = String(e.stderr || ''); }
      if (/Widget failed|Unknown widget/.test(out)) err(`browser ${r}`, 'a widget failed to render');
      if (r.startsWith('#/m/') && !/class="mod-head"/.test(out)) err(`browser ${r}`, 'module page did not render');
      if (r.startsWith('#/m/') && /Coming in Phase/.test(out)) err(`browser ${r}`, 'module file did not register in browser');
      const ce = (stderr.match(/CONSOLE.*(Error|Uncaught)[^\n]*/g) || []);
      ce.forEach((l) => err(`browser ${r}`, l.slice(0, 200)));
    }
    console.log(`browser: checked ${routes.length} routes`);
  }
}

// ---- report
console.log(`\nModules present: ${stats.present}/${toCheck.length}${stats.missing.length ? `  (pending: ${stats.missing.join(', ')})` : ''}`);
console.log(`Glossary terms: ${Object.keys(terms).length}`);
if (warnings.length) console.log('\nWarnings:\n' + warnings.join('\n'));
if (errors.length) { console.log('\nErrors:\n' + errors.join('\n')); console.log(`\n${errors.length} error(s).`); process.exit(1); }
console.log('\n✓ All checks passed.');
