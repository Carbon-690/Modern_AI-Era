/* =========================================================
   D — tiny diagram toolkit (pure string generation, no DOM)
   Every function returns an SVG/HTML string styled by style.css.
   Colors: 'blue','purple','pink','orange','green','cyan','yellow','red','slate'
   Item format: 'text'  or  { t:'Title', s:'subtitle', c:'blue', icon:'🧠' }
   ========================================================= */
(function (root) {
  'use strict';
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const norm = (x) => (typeof x === 'string' ? { t: x } : (x || {}));
  const r1 = (n) => Math.round(n * 10) / 10;

  function wrap(text, maxChars) {
    const out = [];
    String(text ?? '').split('\n').forEach((par) => {
      let line = '';
      par.split(/\s+/).forEach((w) => {
        if (!w) return;
        if ((line + ' ' + w).trim().length > maxChars && line) { out.push(line); line = w; }
        else line = line ? line + ' ' + w : w;
      });
      out.push(line);
    });
    return out;
  }
  const LH_T = 17, LH_S = 15;
  function lines(it, w) {
    const maxT = Math.max(6, Math.floor((w - 18) / 8.3));
    const maxS = Math.max(8, Math.floor((w - 14) / 6.5));
    const tl = wrap((it.icon ? it.icon + ' ' : '') + (it.t || ''), maxT);
    const sl = it.s ? wrap(it.s, maxS) : [];
    return { tl, sl };
  }
  function needH(item, w) {
    const { tl, sl } = lines(norm(item), w);
    return Math.max(52, tl.length * LH_T + (sl.length ? sl.length * LH_S + 4 : 0) + 24);
  }
  function txt(x, y, s, cls, anchor) {
    return `<text x="${r1(x)}" y="${r1(y)}" class="${cls || 'd-text'}" text-anchor="${anchor || 'middle'}" dominant-baseline="middle">${esc(s)}</text>`;
  }
  function multiTxt(x, cy, arr, cls, lh, anchor) {
    const start = cy - ((arr.length - 1) * lh) / 2;
    return arr.map((l, i) => txt(x, start + i * lh, l, cls, anchor)).join('');
  }
  function node(x, y, w, h, item, opts) {
    opts = opts || {};
    const it = norm(item);
    const c = it.c ? ` d-c-${it.c}` : '';
    const hl = opts.hl ? ' d-hl' : '';
    const dim = opts.dim ? ' d-dim' : '';
    const { tl, sl } = lines(it, w);
    const total = tl.length * LH_T + (sl.length ? sl.length * LH_S + 4 : 0);
    const cx = x + w / 2;
    const ty = y + h / 2 - total / 2 + LH_T / 2;
    let out = `<g class="d-node${c}${hl}${dim}"><rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${opts.rx ?? 12}" class="d-box"/>`;
    tl.forEach((l, i) => { out += txt(cx, ty + i * LH_T, l, 'd-text'); });
    const sy = ty - LH_T / 2 + tl.length * LH_T + 4 + LH_S / 2;
    sl.forEach((l, i) => { out += txt(cx, sy + i * LH_S, l, 'd-sub'); });
    return out + '</g>';
  }
  function label(x, y, s) {
    if (!s) return '';
    const w = String(s).length * 6.6 + 10;
    return `<rect x="${r1(x - w / 2)}" y="${r1(y - 9)}" width="${r1(w)}" height="18" rx="5" class="d-label-bg"/>` + txt(x, y, s, 'd-label');
  }
  function arrow(x1, y1, x2, y2, o) {
    o = o || {};
    const cls = 'd-line' + (o.accent ? ' accent' : '') + (o.dashed ? ' dashed' : '') + (o.flowing ? ' d-flowing' : '');
    const m = o.accent ? 'url(#arr-accent)' : 'url(#arr)';
    const ends = (o.noHead ? '' : ` marker-end="${m}"`) + (o.both ? ` marker-start="${m}"` : '');
    let s = `<path d="M${r1(x1)},${r1(y1)} L${r1(x2)},${r1(y2)}" class="${cls}"${ends}/>`;
    if (o.label) s += label((x1 + x2) / 2 + (o.lx || 0), (y1 + y2) / 2 + (o.ly || 0), o.label);
    return s;
  }
  function pathArrow(d, o) {
    o = o || {};
    const cls = 'd-line' + (o.accent ? ' accent' : '') + (o.dashed ? ' dashed' : '') + (o.flowing ? ' d-flowing' : '');
    const m = o.accent ? 'url(#arr-accent)' : 'url(#arr)';
    return `<path d="${d}" class="${cls}"${o.noHead ? '' : ` marker-end="${m}"`}${o.both ? ` marker-start="${m}"` : ''}/>`;
  }
  function svg(W, H, inner, title) {
    return `<svg class="d-svg" viewBox="0 0 ${r1(W)} ${r1(H)}" style="max-width:${Math.round(W)}px" role="img" aria-label="${esc(title || 'diagram')}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }
  function titleBar(o, W) { return o.title ? txt(W / 2, 16, o.title, 'd-title') : ''; }
  const TOP = (o) => (o.title ? 34 : 0);

  const D = {};
  D.esc = esc;
  D.wrap = wrap;

  /** Wrap any diagram string in a <figure> with optional caption. */
  D.fig = function (content, caption, opts) {
    opts = opts || {};
    return `<figure class="diagram${opts.bare ? ' bare' : ''}">${opts.title ? `<div class="fig-title">${esc(opts.title)}</div>` : ''}${content}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  };

  /** Steps connected by arrows. o: {dir:'h'|'v', w, h, gap, highlight, loop:'label'|true, title, accent:true} */
  D.flow = function (steps, o) {
    o = o || {};
    steps = steps.map(norm);
    const dir = o.dir || 'h';
    const w = o.w || (dir === 'h' ? 150 : 280);
    const hasEdge = steps.some((s) => s.edge);
    const gap = o.gap || (dir === 'h' ? (hasEdge ? 70 : 46) : (hasEdge ? 46 : 34));
    const h = o.h || Math.max(...steps.map((s) => needH(s, w)));
    const top = TOP(o) + (dir === 'h' && hasEdge ? 6 : 0);
    let W, H;
    if (dir === 'h') { W = steps.length * w + (steps.length - 1) * gap + 24; H = top + h + 24 + (o.loop ? 46 : 0); }
    else { W = w + 24 + (o.loop ? 70 : 0) + (hasEdge ? 0 : 0); H = top + steps.length * h + (steps.length - 1) * gap + 24; }
    let inner = titleBar(o, W);
    const hl = (i) => (Array.isArray(o.highlight) ? o.highlight.includes(i) : o.highlight === i);
    steps.forEach((s, i) => {
      const x = dir === 'h' ? 12 + i * (w + gap) : 12;
      const y = dir === 'h' ? top + 12 : top + 12 + i * (h + gap);
      inner += node(x, y, w, h, s, { hl: hl(i), dim: o.dimOthers && o.highlight !== undefined && !hl(i) });
      if (i < steps.length - 1) {
        if (dir === 'h') inner += arrow(x + w + 3, y + h / 2, x + w + gap - 5, y + h / 2, { accent: o.accent, label: s.edge, ly: -14 });
        else inner += arrow(x + w / 2, y + h + 3, x + w / 2, y + h + gap - 5, { accent: o.accent, label: s.edge, lx: 0 });
      }
    });
    if (o.loop) {
      const lab = typeof o.loop === 'string' ? o.loop : '';
      if (dir === 'h') {
        const y0 = top + 12 + h + 4, yb = y0 + 30;
        const xl = 12 + (steps.length - 1) * (w + gap) + w / 2, xf = 12 + w / 2;
        inner += pathArrow(`M${xl},${y0} L${xl},${yb} L${xf},${yb} L${xf},${y0 + 4}`, { accent: true, dashed: true });
        if (lab) inner += label((xl + xf) / 2, yb, lab);
      } else {
        const x0 = 12 + w + 4, xr = x0 + 40;
        const yl = top + 12 + (steps.length - 1) * (h + gap) + h / 2, yf = top + 12 + h / 2;
        inner += pathArrow(`M${x0},${yl} L${xr},${yl} L${xr},${yf} L${x0 + 4},${yf}`, { accent: true, dashed: true });
        if (lab) inner += `<g transform="rotate(-90 ${xr} ${(yl + yf) / 2})">${label(xr, (yl + yf) / 2, lab)}</g>`;
      }
    }
    return svg(W, H, inner, o.title);
  };

  /** Nodes on a circle with clockwise arrows — perfect for loops (agent loop, feedback loop). o: {center, r, w, highlight, title} */
  D.cycle = function (steps, o) {
    o = o || {};
    steps = steps.map(norm);
    const n = steps.length;
    const w = o.w || 150;
    const h = o.h || Math.max(...steps.map((s) => needH(s, w)));
    const R = o.r || (n <= 3 ? 125 : n <= 5 ? 155 : n <= 6 ? 180 : 205);
    const top = TOP(o);
    const W = 2 * R + w + 40, H = 2 * R + h + 40 + top;
    const cx = W / 2, cy = top + (H - top) / 2;
    let inner = titleBar(o, W);
    const ang = (i) => (-90 + (i * 360) / n) * Math.PI / 180;
    const pos = steps.map((_, i) => ({ x: cx + R * Math.cos(ang(i)), y: cy + R * Math.sin(ang(i)) }));
    const inside = (px, py, p) => Math.abs(px - p.x) < w / 2 + 8 && Math.abs(py - p.y) < h / 2 + 8;
    // arcs
    for (let i = 0; i < n; i++) {
      const a0 = ang(i), a1 = ang(i + 1 === n ? n : i + 1) + (i + 1 === n ? 0 : 0);
      const p0 = pos[i], p1 = pos[(i + 1) % n];
      let s = a0, e = (i + 1 === n) ? ang(0) + 2 * Math.PI : a1;
      const step = 0.005;
      while (inside(cx + R * Math.cos(s), cy + R * Math.sin(s), p0) && s < e) s += step;
      while (inside(cx + R * Math.cos(e), cy + R * Math.sin(e), p1) && e > s) e -= step;
      const xs = cx + R * Math.cos(s), ys = cy + R * Math.sin(s), xe = cx + R * Math.cos(e), ye = cy + R * Math.sin(e);
      const large = (e - s) > Math.PI ? 1 : 0;
      inner += pathArrow(`M${r1(xs)},${r1(ys)} A${R},${R} 0 ${large} 1 ${r1(xe)},${r1(ye)}`, { accent: o.accent !== false, flowing: o.flowing });
      if (steps[i].edge) {
        const am = (s + e) / 2;
        inner += label(cx + (R + 0) * Math.cos(am), cy + (R + 0) * Math.sin(am), steps[i].edge);
      }
    }
    steps.forEach((s, i) => { inner += node(pos[i].x - w / 2, pos[i].y - h / 2, w, h, s, { hl: o.highlight === i }); });
    if (o.center) {
      const c = norm(o.center);
      const cl = wrap(c.t, 16);
      inner += multiTxt(cx, cy - (c.s ? 8 : 0), cl, 'd-title', 18);
      if (c.s) inner += multiTxt(cx, cy + cl.length * 9 + 6, wrap(c.s, 22), 'd-sub', 15);
    }
    return svg(W, H, inner, o.title);
  };

  /** Stacked horizontal layers (top → bottom). o: {w, h, gap, highlight, brackets:[{from,to,label,c}], title} */
  D.layers = function (items, o) {
    o = o || {};
    items = items.map(norm);
    const hasBr = (o.brackets || []).length > 0;
    const w = o.w || 640, h = o.h || 56, gap = o.gap ?? 10, brW = hasBr ? 130 : 0;
    const top = TOP(o);
    const W = w + 24 + brW, H = top + items.length * h + (items.length - 1) * gap + 24;
    let inner = titleBar(o, W);
    const tW = o.titleW || Math.round(w * 0.34);
    items.forEach((it, i) => {
      const x = 12, y = top + 12 + i * (h + gap);
      const c = it.c ? ` d-c-${it.c}` : '';
      inner += `<g class="d-node${c}${o.highlight === i ? ' d-hl' : ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="d-box"/>`;
      inner += multiTxt(x + 18, y + h / 2, wrap((it.icon ? it.icon + ' ' : '') + it.t, Math.floor((tW - 24) / 8.3)), 'd-text', 17, 'start');
      if (it.s) inner += multiTxt(x + tW, y + h / 2, wrap(it.s, Math.floor((w - tW - 16) / 6.5)), 'd-sub', 15, 'start');
      inner += '</g>';
    });
    (o.brackets || []).forEach((b) => {
      const y1 = top + 12 + b.from * (h + gap), y2 = top + 12 + b.to * (h + gap) + h;
      const x = 12 + w + 14;
      inner += `<g class="${b.c ? 'd-c-' + b.c : ''}"><path d="M${x},${y1} L${x + 10},${y1} L${x + 10},${y2} L${x},${y2}" class="d-line" style="stroke:var(--c,var(--accent));stroke-width:2"/>`;
      inner += multiTxt(x + 18, (y1 + y2) / 2, wrap(b.label, 13), 'd-text', 17, 'start') + '</g>';
    });
    return svg(W, H, inner, o.title);
  };

  /** Nested containers, outermost first: [{t,s,c}]. o: {w, h, step, vstep} */
  D.nested = function (items, o) {
    o = o || {};
    items = items.map(norm);
    const n = items.length;
    const step = o.step || 40, vstep = o.vstep || 48;
    const W = o.w || 600, top = TOP(o);
    const innerH = o.innerH || 70;
    const H = top + 24 + (n - 1) * vstep * 2 + innerH + (n > 1 ? 0 : 0);
    let inner = titleBar(o, W);
    items.forEach((it, i) => {
      const x = 12 + i * step, y = top + 12 + i * vstep;
      const w = W - 24 - 2 * i * step, h = H - top - 24 - 2 * i * vstep;
      const c = it.c || ['slate', 'blue', 'purple', 'pink', 'orange', 'green'][i % 6];
      inner += `<g class="d-c-${c}${o.highlight === i ? ' d-hl' : ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${22 - i * 2}" class="d-nest d-box"/>`;
      if (i < n - 1) {
        inner += txt(x + w / 2, y + 18, (it.icon ? it.icon + ' ' : '') + it.t, 'd-text');
        if (it.s) inner += txt(x + w / 2, y + 35, it.s, 'd-sub');
      } else {
        inner += txt(x + w / 2, y + h / 2 - (it.s ? 9 : 0), (it.icon ? it.icon + ' ' : '') + it.t, 'd-text');
        if (it.s) inner += multiTxt(x + w / 2, y + h / 2 + 12, wrap(it.s, Math.floor(w / 7)), 'd-sub', 15);
      }
      inner += '</g>';
    });
    return svg(W, H, inner, o.title);
  };

  /** Hub & spokes. o: {r, w, both:true, highlight, title, spokeLabel} */
  D.hub = function (center, spokes, o) {
    o = o || {};
    spokes = spokes.map(norm);
    const c = Object.assign({ c: 'purple' }, norm(center));
    const n = spokes.length;
    const w = o.w || 140;
    const h = o.h || Math.max(...spokes.map((s) => needH(s, w)));
    const cw = o.cw || 170, ch = o.ch || Math.max(70, needH(c, cw));
    const R = o.r || Math.max(170, n * 30);
    const top = TOP(o);
    const W = 2 * R + w + 40, H = 2 * R + h + 40 + top;
    const cx = W / 2, cy = top + (H - top) / 2;
    let inner = titleBar(o, W);
    spokes.forEach((s, i) => {
      const a = (-90 + (i * 360) / n) * Math.PI / 180;
      const px = cx + R * Math.cos(a), py = cy + R * Math.sin(a);
      // clip line to boxes
      const dx = px - cx, dy = py - cy;
      const tC = Math.min(Math.abs((cw / 2 + 6) / (dx || 1e-6)), Math.abs((ch / 2 + 6) / (dy || 1e-6)));
      const tS = Math.min(Math.abs((w / 2 + 6) / (dx || 1e-6)), Math.abs((h / 2 + 6) / (dy || 1e-6)));
      inner += arrow(cx + dx * tC, cy + dy * tC, px - dx * tS, py - dy * tS, { both: o.both !== false, accent: o.highlight === i, label: s.edge || o.spokeLabel, dashed: s.dashed });
    });
    spokes.forEach((s, i) => {
      const a = (-90 + (i * 360) / n) * Math.PI / 180;
      inner += node(cx + R * Math.cos(a) - w / 2, cy + R * Math.sin(a) - h / 2, w, h, s, { hl: o.highlight === i });
    });
    inner += node(cx - cw / 2, cy - ch / 2, cw, ch, c, { hl: o.highlight === 'center', rx: 18 });
    return svg(W, H, inner, o.title);
  };

  /** A spectrum bar with points. left/right: labels. points: [{t, pos:0..1, s, c}] */
  D.spectrum = function (left, right, points, o) {
    o = o || {};
    const W = o.w || 720, top = TOP(o);
    const H = top + 190;
    const x0 = 40, x1 = W - 40, y = top + 95;
    let inner = titleBar(o, W);
    inner += `<defs><linearGradient id="spg${(o.id || '')}" x1="0" x2="1"><stop offset="0" stop-color="${o.from || 'var(--accent-2)'}"/><stop offset="1" stop-color="${o.to || 'var(--accent)'}"/></linearGradient></defs>`;
    inner += `<rect x="${x0}" y="${y - 7}" width="${x1 - x0}" height="14" rx="7" fill="url(#spg${(o.id || '')})" class="d-grad-bar"/>`;
    inner += txt(x0, y + 30, left, 'd-text', 'start') + txt(x1, y + 30, right, 'd-text', 'end');
    (points || []).map(norm).forEach((p, i) => {
      const px = x0 + (x1 - x0) * (p.pos ?? 0.5);
      const up = i % 2 === 0;
      const ly = up ? y - 46 : y + 62;
      inner += `<g class="${p.c ? 'd-c-' + p.c : ''}"><line x1="${px}" y1="${y}" x2="${px}" y2="${up ? ly + 10 : ly - 22}" class="d-line thin"/><circle cx="${px}" cy="${y}" r="9" class="d-dot" stroke="var(--card)" stroke-width="3"/>`;
      inner += txt(px, up ? ly - (p.s ? 8 : 0) : ly - 8, p.t, 'd-text');
      if (p.s) inner += txt(px, up ? ly + 8 : ly + 8, p.s, 'd-sub');
      inner += '</g>';
    });
    return svg(W, H, inner, o.title);
  };

  /** Horizontal timeline. items: [{date, t, s, c}] */
  D.timeline = function (items, o) {
    o = o || {};
    items = items.map(norm);
    const n = items.length;
    const colW = o.colW || 150;
    const W = Math.max(o.w || 0, n * colW + 40), top = TOP(o);
    const H = top + 230, y = top + 110;
    let inner = titleBar(o, W);
    inner += `<line x1="20" y1="${y}" x2="${W - 20}" y2="${y}" class="d-line" style="stroke-width:3"/>`;
    items.forEach((it, i) => {
      const x = 20 + colW / 2 + i * ((W - 40 - colW) / Math.max(1, n - 1));
      const up = i % 2 === 0;
      const c = it.c || 'blue';
      inner += `<g class="d-c-${c}${o.highlight === i ? ' d-hl' : ''}"><circle cx="${x}" cy="${y}" r="8" class="d-dot" stroke="var(--card)" stroke-width="3"/>`;
      inner += `<line x1="${x}" y1="${up ? y - 12 : y + 12}" x2="${x}" y2="${up ? y - 30 : y + 30}" class="d-line thin"/>`;
      if (it.date) inner += txt(x, up ? y + 24 : y - 22, it.date, 'd-label');
      const tl = wrap(it.t, Math.floor(colW / 8.6)), sl = it.s ? wrap(it.s, Math.floor(colW / 6.8)) : [];
      const block = [...tl.map((l) => [l, 'd-text', 16]), ...sl.map((l) => [l, 'd-sub', 14])];
      const totalH = block.reduce((a, b) => a + b[2], 0);
      let yy = up ? y - 36 - totalH + 8 : y + 44;
      block.forEach(([l, cls, lh]) => { inner += txt(x, yy, l, cls); yy += lh; });
      inner += '</g>';
    });
    return svg(W, H, inner, o.title);
  };

  /** Decision/hierarchy tree. root: {t,s,c, edge, children:[...]}. o: {w, h, hgap, vgap} */
  D.tree = function (root, o) {
    o = o || {};
    const w = o.w || 150, hgap = o.hgap || 18, vgap = o.vgap || 54;
    let slot = 0, maxD = 0;
    const all = [];
    (function lay(nd, d) {
      nd = Object.assign(nd, norm(nd));
      nd._d = d; maxD = Math.max(maxD, d); all.push(nd);
      if (nd.children && nd.children.length) {
        nd.children.forEach((ch, i) => { nd.children[i] = Object.assign(ch, norm(ch)); lay(nd.children[i], d + 1); });
        nd._x = (nd.children[0]._x + nd.children[nd.children.length - 1]._x) / 2;
      } else nd._x = slot++;
    })(root, 0);
    const h = o.h || Math.max(...all.map((nd) => needH(nd, w)));
    const top = TOP(o);
    const W = slot * (w + hgap) - hgap + 24, H = top + (maxD + 1) * (h + vgap) - vgap + 24;
    const X = (nd) => 12 + nd._x * (w + hgap);
    const Y = (nd) => top + 12 + nd._d * (h + vgap);
    let inner = titleBar(o, W);
    all.forEach((nd) => (nd.children || []).forEach((ch) => {
      const x1 = X(nd) + w / 2, y1 = Y(nd) + h, x2 = X(ch) + w / 2, y2 = Y(ch);
      const my = y1 + vgap / 2;
      inner += pathArrow(`M${r1(x1)},${r1(y1 + 2)} L${r1(x1)},${r1(my)} L${r1(x2)},${r1(my)} L${r1(x2)},${r1(y2 - 4)}`, { accent: ch.hl });
      if (ch.edge) inner += label(x2, my + 12 > y2 - 10 ? my : (my + y2) / 2 + 2, ch.edge);
    }));
    all.forEach((nd) => { inner += node(X(nd), Y(nd), w, h, nd, { hl: nd.hl }); });
    return svg(W, H, inner, o.title);
  };

  /** Sequence diagram. actors: ['User', {t:'Model', c:'purple'}], msgs: [{from:0,to:1,t:'label',dashed,note}] */
  D.seq = function (actors, msgs, o) {
    o = o || {};
    actors = actors.map(norm);
    msgs = msgs.map((m) => (Array.isArray(m) ? { from: m[0], to: m[1], t: m[2], dashed: m[3] } : m));
    const colW = o.colW || 190, top = TOP(o);
    const W = actors.length * colW, rowH = o.rowH || 46, headH = 50;
    const H = top + headH + 26 + msgs.length * rowH + 20;
    const cx = (i) => colW * i + colW / 2;
    let inner = titleBar(o, W);
    actors.forEach((a, i) => {
      inner += `<line x1="${cx(i)}" y1="${top + headH}" x2="${cx(i)}" y2="${H - 8}" class="d-line dashed thin"/>`;
      inner += node(cx(i) - (colW - 30) / 2, top + 4, colW - 30, headH - 6, a);
    });
    msgs.forEach((m, k) => {
      const y = top + headH + 34 + k * rowH;
      const acc = o.highlight === k;
      if (m.note !== undefined && m.from === undefined) {
        inner += label(W / 2, y, m.note);
        return;
      }
      if (m.from === m.to) {
        const x = cx(m.from);
        inner += pathArrow(`M${x},${y - 8} L${x + 40},${y - 8} L${x + 40},${y + 10} L${x + 4},${y + 10}`, { accent: acc, dashed: m.dashed });
        inner += txt(x + 48, y + 1, m.t, 'd-label', 'start');
      } else {
        const x1 = cx(m.from), x2 = cx(m.to), dir = x2 > x1 ? 1 : -1;
        inner += arrow(x1 + dir * 3, y + 6, x2 - dir * 5, y + 6, { accent: acc, dashed: m.dashed });
        inner += label((x1 + x2) / 2, y - 8, m.t);
      }
    });
    return svg(W, H, inner, o.title);
  };

  /** Horizontal bar chart. items: [{t, v, c, s}] o: {max, unit, w} */
  D.bars = function (items, o) {
    o = o || {};
    items = items.map(norm);
    const max = o.max || Math.max(...items.map((i) => i.v || 0));
    const lw = o.labelW || 170, bw = o.barW || 420, rowH = 36, top = TOP(o);
    const W = lw + bw + 90, H = top + items.length * rowH + 16;
    let inner = titleBar(o, W);
    items.forEach((it, i) => {
      const y = top + 8 + i * rowH;
      const v = it.v || 0, bl = Math.max(2, (bw * v) / max);
      inner += txt(lw - 10, y + rowH / 2 - 2, it.t, 'd-text', 'end');
      inner += `<rect x="${lw}" y="${y + 6}" width="${bw}" height="${rowH - 16}" rx="6" class="d-box"/>`;
      inner += `<g class="d-c-${it.c || 'blue'}"><rect x="${lw}" y="${y + 6}" width="${r1(bl)}" height="${rowH - 16}" rx="6" class="d-dot"/></g>`;
      inner += txt(lw + bw + 10, y + rowH / 2 - 2, (o.fmt ? o.fmt(v) : v) + (o.unit || ''), 'd-label', 'start');
    });
    return svg(W, H, inner, o.title);
  };

  /** Side-by-side comparison columns (HTML). cols: [{t, s, c, icon, items:['html', ...]}] */
  D.compare = function (cols) {
    return `<div class="d-compare" style="--cols:${cols.length}">` + cols.map((c) =>
      `<div class="d-col d-c-${c.c || 'blue'}"><div class="d-col-h">${c.icon ? c.icon + ' ' : ''}${esc(c.t)}</div>${c.s ? `<div class="d-col-s">${c.s}</div>` : ''}<ul>${(c.items || []).map((i) => `<li>${i}</li>`).join('')}</ul></div>`
    ).join('') + '</div>';
  };

  /** Grid of boxes (e.g., matrix / landscape map). groups: [{t, c, items:[...]}] */
  D.groups = function (groups, o) {
    o = o || {};
    groups = groups.map(norm);
    const cols = o.cols || Math.min(3, groups.length);
    const gw = o.gw || 230, iw = gw - 24, ih = o.ih || 34, top = TOP(o);
    const gh = groups.map((g) => 46 + (g.items || []).length * (ih + 8) + 6);
    const rows = Math.ceil(groups.length / cols);
    const rowH = [];
    for (let r = 0; r < rows; r++) rowH.push(Math.max(...gh.slice(r * cols, r * cols + cols)));
    const W = cols * (gw + 16) + 8, H = top + rowH.reduce((a, b) => a + b + 16, 0) + 8;
    let inner = titleBar(o, W);
    groups.forEach((g, k) => {
      const r = Math.floor(k / cols), c = k % cols;
      const x = 12 + c * (gw + 16), y = top + 12 + rowH.slice(0, r).reduce((a, b) => a + b + 16, 0);
      inner += `<g class="d-c-${g.c || 'blue'}"><rect x="${x}" y="${y}" width="${gw}" height="${rowH[r]}" rx="16" class="d-area"/>`;
      inner += txt(x + gw / 2, y + 22, (g.icon ? g.icon + ' ' : '') + g.t, 'd-text');
      (g.items || []).map(norm).forEach((it, j) => {
        inner += node(x + 12, y + 42 + j * (ih + 8), iw, ih, Object.assign({ c: g.c }, it), { rx: 9 });
      });
      inner += '</g>';
    });
    return svg(W, H, inner, o.title);
  };

  // low-level helpers for hand-made diagrams
  D.svg = svg; D.node = node; D.arrow = arrow; D.path = pathArrow; D.text = txt; D.label = label; D.needH = needH;

  root.D = D;
  if (typeof module !== 'undefined' && module.exports) module.exports = D;
})(typeof window !== 'undefined' ? window : globalThis);
