/* =========================================================
   Quiz engine — instant feedback + explanations, best score saved.
   question: { q, options:[...], answer:index, explain }
   ========================================================= */
(function () {
  'use strict';
  window.Quiz = {
    render(el, modId, questions, store) {
      if (!questions || !questions.length) { el.innerHTML = '<p class="muted">No quiz for this module.</p>'; return; }
      let answered = 0, correct = 0;
      const keys = 'ABCDEFG';
      el.innerHTML = questions.map((q, i) => `
        <div class="quiz-q" data-i="${i}">
          <div class="qt"><span class="qn">Q${i + 1}.</span>${q.q}</div>
          <div class="quiz-opts">${q.options.map((o, k) => `<button data-k="${k}"><span class="k">${keys[k]}</span><span>${o}</span></button>`).join('')}</div>
          <div class="qe"></div>
        </div>`).join('') + `<div class="quiz-score" hidden><b data-sc></b><span data-msg class="muted"></span><span style="margin-left:auto"></span><button class="btn small" data-retry>↺ Retry</button></div>`;
      const best = store.get().quiz[modId];
      if (best) {
        const s = el.querySelector('.quiz-score');
        s.hidden = false;
        s.querySelector('[data-sc]').textContent = `Best: ${best.score}/${best.total}`;
        s.querySelector('[data-msg]').textContent = 'You can retake the quiz anytime.';
      }
      el.querySelectorAll('.quiz-q').forEach((qe) => {
        const q = questions[+qe.dataset.i];
        qe.querySelectorAll('.quiz-opts button').forEach((b) => b.addEventListener('click', () => {
          const k = +b.dataset.k;
          const ok = k === q.answer;
          qe.querySelectorAll('.quiz-opts button').forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add('correct'); });
          if (!ok) b.classList.add('wrong');
          qe.querySelector('.qe').innerHTML = `<div class="quiz-explain">${ok ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> '}${q.explain || ''}</div>`;
          answered++; if (ok) correct++;
          if (answered === questions.length) {
            const s = el.querySelector('.quiz-score');
            s.hidden = false;
            s.querySelector('[data-sc]').textContent = `${correct} / ${questions.length}`;
            const pct = correct / questions.length;
            s.querySelector('[data-msg]').textContent = pct === 1 ? '🏆 Perfect! You really got it.' : pct >= 0.7 ? '👍 Solid understanding. Review the explanations above.' : '📚 Worth re-reading the core section — then retry.';
            store.update((st) => { const prev = st.quiz[modId]; if (!prev || correct >= prev.score) st.quiz[modId] = { score: correct, total: questions.length, at: Date.now() }; });
            document.dispatchEvent(new CustomEvent('hub:progress'));
          }
        }));
      });
      el.querySelector('[data-retry]').addEventListener('click', () => this.render(el, modId, questions, store));
    }
  };
})();
