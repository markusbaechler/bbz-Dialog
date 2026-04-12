/**
 * bbz-data.js — Gemeinsame Datenschicht
 * Einbinden: <script src="bbz-data.js"></script>
 *
 * Globales Objekt: BBZ
 * BBZ.get('p1name')                → Wert oder Default
 * BBZ.set('cockpit_einkommen', 85000) → Speichern (type-safe)
 * BBZ.merge({ p1name: 'Anna' })    → Mehrere Keys auf einmal
 * BBZ.setIfEmpty('price', 850000)  → Nur wenn noch leer (Prefill)
 * BBZ.clearSession()               → Neue Beratung (Config bleibt)
 * BBZ.getProfile()                 → Promise → aktives Berater-Profil
 * BBZ.fmt(85000)                   → "85'000"
 * BBZ.parseNum("85'000")           → 85000
 * BBZ.fmtDate('1980-03-15')        → '15.03.1980'
 * BBZ.age('1980-03-15')            → 46
 */

(function (global) {

  const STORAGE_KEY = 'bbzData';

  // ── SCHEMA ──────────────────────────────────────────────────────────────
  // scope 'session' = wird bei clearSession() gelöscht
  // scope 'config'  = bleibt erhalten (Berater, Module-Config)
  const SCHEMA = {
    // ── Stammdaten ───────────────────────────────────────────────────────
    p1name:               { type: 'string',  scope: 'session', default: '' },
    p1geb:                { type: 'string',  scope: 'session', default: '' },
    p2name:               { type: 'string',  scope: 'session', default: '' },
    p2geb:                { type: 'string',  scope: 'session', default: '' },
    beratungsdatum:       { type: 'string',  scope: 'session', default: '' },

    // ── Agenda (01) ──────────────────────────────────────────────────────
    agenda_traktanden:    { type: 'array',   scope: 'session', default: [] },
    agenda_erwartungen:   { type: 'array',   scope: 'session', default: [] },

    // ── Bank (02) — config, bleibt bei clearSession ──────────────────────
    bankTexts:            { type: 'object',  scope: 'config',  default: {} },
    bankHeroSub:          { type: 'string',  scope: 'config',  default: '' },

    // ── Cockpit (05) ─────────────────────────────────────────────────────
    // Hinweis: cockpit_income war Legacy — korrekt ist cockpit_einkommen
    cockpit_einkommen:       { type: 'number',  scope: 'session', default: null },
    cockpit_verpflichtungen: { type: 'number',  scope: 'session', default: null },
    cockpit_pk_saldo:        { type: 'number',  scope: 'session', default: null },
    cockpit_anlage_f:        { type: 'number',  scope: 'session', default: null },
    cockpit_data:            { type: 'object',  scope: 'session', default: null },

    // ── Ziele (06) ───────────────────────────────────────────────────────
    ziele:                { type: 'array',   scope: 'session', default: [] },
    wuensche:             { type: 'array',   scope: 'session', default: [] },

    // ── Anlegen (07b) ────────────────────────────────────────────────────
    anlage_horizont:      { type: 'number',  scope: 'session', default: null },
    anlage_betrag:        { type: 'number',  scope: 'session', default: null },
    anlage_strategie:     { type: 'string',  scope: 'session', default: '' },
    anlage_reaktion:      { type: 'string',  scope: 'session', default: '' },
    anlage_profil:        { type: 'string',  scope: 'session', default: '' },
    anlage_kenntnisse:    { type: 'object',  scope: 'session', default: null },
    anlage_esg:           { type: 'object',  scope: 'session', default: null },
    anlage_impl:          { type: 'object',  scope: 'session', default: null },

    // ── Vereinbarungen (08) ──────────────────────────────────────────────
    vereinbarungen:       { type: 'array',   scope: 'session', default: [] },
    vereinbarungen_v1:    { type: 'object',  scope: 'session', default: null },
    vereinbarungenHeroImage: { type: 'string', scope: 'session', default: '' },

    // ── Feedback (09) ────────────────────────────────────────────────────
    fb_ratings:           { type: 'array',   scope: 'session', default: [] },
    fb_q_text_0:          { type: 'string',  scope: 'session', default: '' },
    fb_q_text_1:          { type: 'string',  scope: 'session', default: '' },

    // ── Abschluss (10) ───────────────────────────────────────────────────
    abschluss_bgImage:    { type: 'string',  scope: 'session', default: '' },

    // ── Config (bleibt bei clearSession) ────────────────────────────────
    aktiverBerater:       { type: 'number',  scope: 'config',  default: 1 },
    beraterName:          { type: 'string',  scope: 'config',  default: '' },
    beraterTitel:         { type: 'string',  scope: 'config',  default: '' },
    beratervorstellung:   { type: 'object',  scope: 'config',  default: {} },
    activeBranches:       { type: 'object',  scope: 'config',  default: {} },
    disabled:             { type: 'object',  scope: 'config',  default: {} },
  };

  function _load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function _save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch (e) { console.warn('bbz-data: localStorage write failed', e); }
  }

  function _coerce(key, value) {
    const schema = SCHEMA[key];
    if (!schema || value === null || value === undefined) return value;
    if (schema.type === 'number') {
      return typeof value === 'string'
        ? parseFloat(value.replace(/['\s]/g, '').replace(',', '.')) || null
        : Number(value);
    }
    return value;
  }

  const BBZ = {

    get(key) {
      const data = _load();
      if (key in data) return data[key];
      return (SCHEMA[key] || {}).default ?? null;
    },

    set(key, value) {
      const data = _load();
      data[key] = _coerce(key, value);
      _save(data);
    },

    merge(obj) {
      const data = _load();
      Object.entries(obj).forEach(([k, v]) => { data[k] = _coerce(k, v); });
      _save(data);
    },

    all() { return _load(); },

    setIfEmpty(key, value) {
      const cur = this.get(key);
      if (cur === null || cur === '' || cur === undefined) this.set(key, value);
    },

    clearSession() {
      // bbzData: nur config-Keys behalten
      const data = _load();
      const kept = {};
      Object.entries(SCHEMA).forEach(([k, def]) => {
        if (def.scope === 'config' && k in data) kept[k] = data[k];
      });
      _save(kept);

      // bbzCockpit: Session-Felder löschen, Config-Felder behalten
      try {
        const ck = JSON.parse(localStorage.getItem('bbzCockpit') || '{}');
        const ckKept = {};
        if (ck.aktiverBerater !== undefined) ckKept.aktiverBerater = ck.aktiverBerater;
        if (ck.disabled !== undefined)       ckKept.disabled = ck.disabled;
        if (ck.branches !== undefined)       ckKept.branches = ck.branches;
        // beratungsdatum ist session → nicht behalten
        localStorage.setItem('bbzCockpit', JSON.stringify(ckKept));
      } catch (e) {}

      // bbzBgImage: session → löschen
      try { localStorage.removeItem('bbzBgImage'); } catch (e) {}
    },

    clearAll() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    },

    async getProfile(id) {
      try {
        const activeId = id || this.get('aktiverBerater') || 1;
        const res = await fetch('data/berater.json');
        if (!res.ok) return null;
        const profiles = await res.json();
        return profiles.find(p => p.id === activeId) || profiles[0] || null;
      } catch (e) { return null; }
    },

    async getAllProfiles() {
      try {
        const res = await fetch('data/berater.json');
        if (!res.ok) return [];
        return await res.json();
      } catch (e) { return []; }
    },

    setAktiveBerater(id) {
      this.set('aktiverBerater', Number(id));
    },

    // ── Hilfsfunktionen ──────────────────────────────────────────────────
    fmt(n, decimals = 0) {
      if (n === null || n === undefined || isNaN(n)) return '–';
      const abs = Math.abs(n).toFixed(decimals).split('.');
      abs[0] = abs[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      return (n < 0 ? '-' : '') + abs.join('.');
    },

    parseNum(s) {
      if (typeof s === 'number') return s;
      return parseFloat(String(s || '').replace(/['\s]/g, '').replace(',', '.')) || 0;
    },

    fmtDate(iso) {
      if (!iso) return '–';
      try {
        return new Date(iso).toLocaleDateString('de-CH', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        });
      } catch (e) { return iso; }
    },

    age(isoDate) {
      if (!isoDate) return null;
      const geb   = new Date(isoDate);
      const heute = new Date();
      const alter = heute.getFullYear() - geb.getFullYear()
        - (heute < new Date(heute.getFullYear(), geb.getMonth(), geb.getDate()) ? 1 : 0);
      return alter > 0 && alter < 130 ? alter : null;
    },

    SCHEMA,
  };

  global.BBZ = BBZ;

})(window);
