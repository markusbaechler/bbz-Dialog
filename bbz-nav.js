/**
 * bbz-nav.js — Globale Navigation
 * Einbinden: <script src="bbz-nav.js" data-active="01"></script>
 */

(function () {

  const MODULES = [
    { id: '01',  label: 'Agenda',         file: '01_agenda.html' },
    { id: '02',  label: 'Bank',           file: '02_bank.html' },
    { id: '03',  label: 'Berater:in',     file: '03_berater.html' },
    { id: '04',  label: 'Philosophie',    file: '04_philosophie.html' },
    { id: '05',  label: 'Cockpit',        file: '05_cockpit.html' },
    { id: '06',  label: 'Ziele',          file: '06_ziele.html' },
    { id: '07a', label: 'Finanzieren',    file: '07a_finanzieren.html', sub: true },
    { id: '07b', label: 'Anlegen',        file: '07b_anlegen.html',     sub: true },
    { id: '08',  label: 'Vereinbarungen', file: '08_vereinbarungen.html' },
    { id: '09',  label: 'Feedback',       file: '09_feedback.html' },
    { id: '10',  label: 'Abschluss',      file: '10_abschluss.html' },
  ];

  const scriptTag = document.currentScript;
  const activeId  = scriptTag ? scriptTag.getAttribute('data-active') : null;

  const style = document.createElement('style');
  style.textContent = `
    .bbz-mod-nav {
      display: flex; align-items: center; gap: 0.15vw;
      flex: 1; justify-content: center; overflow: hidden;
    }
    .bbz-mod-chip {
      display: flex; align-items: center; gap: 0.2vw;
      padding: 0.3vh 0.48vw; border-radius: 4px;
      font-size: 0.52vw; font-weight: 700; font-family: 'DM Sans', sans-serif;
      color: rgba(255,255,255,0.35); text-decoration: none;
      white-space: nowrap; transition: color 0.15s, background 0.15s;
      flex-shrink: 0;
    }
    .bbz-mod-chip:hover { color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.07); }
    .bbz-mod-chip.active { background: white; color: #004078; pointer-events: none; }
    .bbz-chip-num { font-size: 0.44vw; font-weight: 900; opacity: 0.55; }
    .bbz-mod-chip.active .bbz-chip-num { opacity: 0.45; }
    .bbz-nav-sep {
      width: 1px; height: 1.8vh;
      background: rgba(255,255,255,0.15);
      flex-shrink: 0; margin: 0 0.18vw;
    }
    .bbz-sub-group { display: flex; align-items: center; gap: 0.18vw; flex-shrink: 0; }
    .bbz-sub-group-inner { display: flex; flex-direction: column; gap: 2px; }
    .bbz-sub-branch { display: flex; flex-direction: column; align-items: center; }
    .bbz-sub-branch-line { width: 1px; background: rgba(255,255,255,0.22); }
    .bbz-sub-branch-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.32); }
    .bbz-sub-branch-fork { display: flex; gap: 5px; }
    .bbz-sub-branch-fork-line { width: 1px; background: rgba(255,255,255,0.18); }
    .bbz-mod-chip.sub { padding: 0.25vh 0.46vw; font-size: 0.5vw; }
    .bbz-home-btn {
      background: rgba(255,255,255,0.1); border: none; border-radius: 5px;
      padding: 0.42vh 0.42vw; cursor: pointer; color: white;
      display: flex; align-items: center; transition: background 0.15s;
      text-decoration: none; flex-shrink: 0;
    }
    .bbz-home-btn:hover { background: rgba(255,255,255,0.2); }
    .bbz-home-btn svg { width: 13px; height: 13px; display: block; }
  `;
  document.head.appendChild(style);

  function buildNav() {
    const nav = document.createElement('nav');
    nav.className = 'bbz-mod-nav';
    const before07 = MODULES.filter(m => !m.sub && parseInt(m.id) < 7);
    const sub07    = MODULES.filter(m => m.sub);
    const after07  = MODULES.filter(m => !m.sub && parseInt(m.id) >= 8);
    before07.forEach(m => nav.appendChild(makeChip(m)));
    nav.appendChild(makeSep());
    nav.appendChild(makeSubGroup(sub07));
    nav.appendChild(makeSep());
    after07.forEach(m => nav.appendChild(makeChip(m)));
    return nav;
  }

  function makeChip(m) {
    const a = document.createElement('a');
    a.href = m.file;
    a.className = 'bbz-mod-chip' + (m.id === activeId ? ' active' : '');
    a.innerHTML = '<span class="bbz-chip-num">' + m.id + '</span>' + m.label;
    return a;
  }

  function makeSep() {
    const d = document.createElement('div');
    d.className = 'bbz-nav-sep';
    return d;
  }

  function makeSubGroup(mods) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bbz-sub-group';
    const branch = document.createElement('div');
    branch.className = 'bbz-sub-branch';
    branch.innerHTML =
      '<div class="bbz-sub-branch-line" style="height:0.85vh;"></div>' +
      '<div class="bbz-sub-branch-dot"></div>' +
      '<div class="bbz-sub-branch-fork">' +
        '<div class="bbz-sub-branch-fork-line" style="height:0.85vh;"></div>' +
        '<div class="bbz-sub-branch-fork-line" style="height:0.85vh;"></div>' +
      '</div>';
    wrapper.appendChild(branch);
    const inner = document.createElement('div');
    inner.className = 'bbz-sub-group-inner';
    mods.forEach(m => {
      const a = document.createElement('a');
      a.href = m.file;
      a.className = 'bbz-mod-chip sub' + (m.id === activeId ? ' active' : '');
      a.innerHTML = '<span class="bbz-chip-num">' + m.id + '</span>' + m.label;
      inner.appendChild(a);
    });
    wrapper.appendChild(inner);
    return wrapper;
  }

  function inject() {
    // 1. Ersetze existierende .mod-nav falls vorhanden
    const existing = document.querySelector('.mod-nav');
    if (existing) { existing.replaceWith(buildNav()); return; }

    const topbar = document.querySelector('.topbar, .bbz-topbar');
    if (!topbar) return;

    const nav = buildNav();

    // 2. Vor .topbar-right einfügen falls vorhanden
    const right = topbar.querySelector('.topbar-right, .bbz-topbar-right');
    if (right) { topbar.insertBefore(nav, right); return; }

    // 3. Fallback: nach dem .logo Element einfügen (NICHT ans Ende)
    const logo = topbar.querySelector('.logo, .bbz-logo');
    if (logo && logo.nextSibling) {
      topbar.insertBefore(nav, logo.nextSibling);
    } else if (logo) {
      logo.insertAdjacentElement('afterend', nav);
    } else {
      // Letzter Fallback: ans Ende
      topbar.appendChild(nav);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
