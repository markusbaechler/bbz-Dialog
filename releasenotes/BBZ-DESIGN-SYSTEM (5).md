# BBZ Beratungsplattform — Design System Referenz
Version 2.3 | April 2026

Dieses Dokument ist die **verbindliche und vollständige Grundlage** für alle interaktiven Module der bbz-Beratungsreihe. Es enthält nicht nur die Regeln, sondern auch die Begründungen dahinter – damit neue Chats bei Edge Cases richtig entscheiden, nicht raten.

---

## So startest du einen neuen Chat (Checkliste)

Folgende Dateien **immer zusammen** in den neuen Chat laden:

1. `BBZ-DESIGN-SYSTEM.md` ← dieses Dokument
2. `bbz-theme.css` ← CSS-Variablen (Referenz)
3. `07a_finanzieren.html` ← aktuelles Referenzmodul (visueller Standard, Navigation, localStorage)

**PROMPT FÜR NEUE CHATS – KOPIEREN UND ANPASSEN:**

> Ich baue modulare Beratungs-Tools für die bbz bank. Die beigelegten Dateien definieren den verbindlichen Standard. Lies zuerst `BBZ-DESIGN-SYSTEM.md` vollständig, dann `bbz-theme.css`, dann `07a_finanzieren.html` als aktuelles Referenzmodul für Navigation und localStorage-Patterns.
>
> Erstelle jetzt das Modul **[MODULNAME]** als Datei `[dateiname.html]`.
>
> Halte dich strikt an alle Design-Entscheidungen. Frage nach, wenn etwas unklar ist – baue nicht auf Annahmen.

---

## Projekt-Kontext

Modulare Web-App für Beratungsgespräche der bbz bank st.gallen. Jedes Modul ist eine **autarke HTML-Datei** (kein Framework, kein Build-Step). Die Module werden während eines Kundengesprächs auf einem Bildschirm im 16:9-Format gezeigt.

**Deployment:** GitHub Pages (`markusbaechler.github.io/bbz-Dialog/`)

**Wichtig:** Die App funktioniert nicht persistent im **Inkognito-Modus** — `localStorage` wird beim Schliessen des Fensters geleert. Immer im normalen Browser-Modus verwenden.

---

## Technischer Stack

| Was | Entscheid | Begründung |
|---|---|---|
| Format | Einzelne `.html`-Dateien, CSS inline per `<style>` | Keine Build-Pipeline, direkt deploybar |
| Navigation | Hardcodiert als Bottom-Tab-Leiste im Footer jedes Moduls | Kein externes Script, kein Injection-Risiko |
| Datenpersistenz | `bbz-data.js` extern + `localStorage` Objekt `bbzData` | Kein Server nötig |
| Schrift | DM Sans (Google Fonts) | Professionell, warm, präzise |
| Drag & Drop | SortableJS via CDN (cdnjs.cloudflare.com) | Bewährt, kein npm nötig |
| Charts | Chart.js via CDN (cdn.jsdelivr.net) | Für Balken- und Vergleichsvisualisierungen |
| Framework | Keins – vanilla HTML/CSS/JS | Maximale Portabilität |
| Layout | 16:9 Canvas | Präsentationsformat |
| Einheiten | `vh`/`vw` für alle Schriftgrössen | Skaliert proportional mit Canvas |
| Entwicklung | GitHub Pages oder Live Server | `file://` unterstützt kein localStorage |

### Pflicht-Einbindungen im `<head>` (Reihenfolge einhalten)
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<script src="bbz-data.js"></script>
```

---

## Dateinamen (verbindlich)

| # | Dateiname | Status | Inhalt |
|---|---|---|---|
| – | `index.html` | ✅ Fertig | Hub / Stammdaten-Erfassung |
| 01 | `01_agenda.html` | ✅ Fertig | Traktanden, Gesprächsziel, Erwartungen |
| 02 | `02_bank.html` | ✅ Fertig | bbz bank – Positionierung, Leistungen |
| 03 | `03_berater.html` | ✅ Fertig | Berater:in – Person, Werdegang |
| 04 | `04_philosophie.html` | ✅ Fertig | Werte, Beratungsansatz |
| 05 | `05_cockpit.html` | ✅ Fertig | Kundenbild – Vermögen, Einkommen, Verpflichtungen |
| 06 | `06_ziele.html` | ✅ Fertig | Ziele, Wünsche, Geldeingänge auf Zeitachse |
| 07a | `07a_finanzieren.html` | ✅ Fertig | Eigenheimfinanzierung – Tragbarkeit + Variantenvergleich |
| 07b | `07b_anlegen.html` | ✅ Fertig | Anlegerprofil, Risikobereitschaft, Stresstest, MiFID II, ESG |
| 08 | `08_vereinbarungen.html` | ✅ Fertig | Vereinbarungen & nächste Schritte |
| 09 | `09_feedback.html` | ✅ Fertig | Zufriedenheitsdialog, Emotionsslider |
| 10 | `10_abschluss.html` | ✅ Fertig | Gesprächsabschluss |
| – | `admin.html` | ✅ Fertig | Beraterprofile verwalten |

**Alle Module sind fertig gebaut und deployed. Es gibt kein fehlendes Modul — nicht nach fehlendem Modulbau fragen.**

**Hinweise:**
- `index.html` ist von der Bottom-Navigation explizit ausgeschlossen — eigene Logik
- `admin.html` ist nicht Teil des Beratungsflusses — kein Bottom-Nav, eigene Topbar

**Offene Punkte (Erweiterungen, kein Neubau):**
- `03_berater.html` — Icon-Zentrierung im weissen Kachel-Feld noch offen
- `07b_anlegen.html` — Ausbau Risikoprofil + Produktwahllayer
- Unified Icon Set: wenn eingeführt, zuerst `04_philosophie.html` aktualisieren (hat noch handgemachte SVG-Piktogramme)

---

## Leitfarben

| Variable | Hex | Verwendung |
|---|---|---|
| `--blue` | `#004078` | Primärfarbe – Header, Struktur, Zahlen, Akzente |
| `--blue-dk` | `#002d57` | Body-Hintergrund, dunkle Hover-States |
| `--blue-md` | `#00528a` | Optionale Zwischentöne |
| `--blue-lt` | `#dce8f4` | Zeilen-Hover, aktiver Nav-Tab, sekundäre Amort-Balken |
| `--red` | `#950e13` | **AUSSCHLIESSLICH** client-generierter Inhalt (Zitate, Erwartungen, Wünsche) |
| `--green` | `#15803d` | Kapitalzuflüsse / Ersparnisse |
| `--amber` | `#b45309` | **AUSSCHLIESSLICH** Zeithorizont Mittelfristig |
| `--ink` | `#0f172a` | Hauptüberschriften |
| `--ink-2` | `#334155` | Fliesstext |
| `--ink-3` | `#64748b` | Untertitel, sekundärer Text |
| `--ink-4` | `#94a3b8` | Labels, Hints, deaktivierte Elemente |
| `--surface` | `#ffffff` | Weisse Hauptflächen |
| `--bg` | `#f1f5f9` | Grauer Seitenhintergrund |
| `--line` | `#e2e8f0` | Trennlinien, Borders |
| `--font` | `'DM Sans', sans-serif` | Schrift |

**Variablen-Konvention:** Alle Module verwenden `--blue`, `--red` etc. (ohne `bbz-`-Prefix).

### Kritische Farb-Verbote

| Verboten | Warum | Alternative |
|---|---|---|
| Amber/Orange für Warn-Zustände | Kollision mit Zeithorizont-System | Gedämpftes Blau oder `--red` |
| Rot auf blauem Hintergrund | Kontrastverlust, aggressiv | Weiss oder `--blue-lt` |
| Grün für Langfristig | Verwechslungsgefahr mit Geldeingängen | Slate `#475569` |
| Amber für Amortisations-Balken | Kollision mit Zeithorizont-System | `--blue-lt` für Verpfändung, `--blue` für 2. Hypo |
| Menschliche Gesichter in Hintergrundbildern | Ablenkung | Nur abstrakte/atmosphärische Bilder |
| Rot für UI-Zustände oder Warnungen | Reserviert für Kundeninhalt | `--ink-3` oder gedämpftes Blau |

### Zeithorizont-Farbsystem (verbindlich ab Modul 06)

| Horizont | Farbe | Hex |
|---|---|---|
| Kurzfristig (≤2 J.) | Blau | `#004078` |
| Mittelfristig (3–5 J.) | Amber | `#b45309` |
| Langfristig (6+ J.) | Slate | `#475569` |
| Zeitpunkt offen | Grau | `#64748b` |
| Erwartete Geldeingänge | Grün | `#15803d` |
| Wünsche | Rot | `#950e13` |

---

## Navigation

### Konzept

Zwei klar getrennte Navigationsbereiche mit unterschiedlichen Rollen:

| Bereich | Rolle | Inhalt |
|---|---|---|
| **Topbar** | Meta-Navigation | Zurück zu `index.html`, Bearbeiten-Funktion, Brand |
| **Bottom-Nav** | Beratungsprozess | Die 11 Beratungsschritte als Tabs |

- **`index.html`** ist von der Bottom-Navigation explizit ausgeschlossen — eigene Navigationslogik
- **Modulspezifische Navigation** wird situativ pro Modul gelöst und ist nicht Teil der globalen Nav
- **Kein `bbz-nav.js`** — Navigation ist hardcodiert in jedem Modul

### Topbar-Struktur (verbindlich)

```html
<header class="topbar">
  <div class="logo">
    <div class="logo-mark">bbz</div>
    <span class="logo-name">Modulname</span>
  </div>
  <div class="topbar-right">
    <!-- Optional: Edit-Icon oder Bearbeiten-Button (modulspezifisch) -->
    <a href="index.html" class="home-btn" title="Home">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10"/>
      </svg>
    </a>
    <span class="topbar-brand">bbz bank</span>
  </div>
</header>
```

### Topbar Admin-Elemente

**Edit-Icon (Stift)** — für Module mit Präsentations-/Bearbeitungsmodus (03, 04):
```html
<button class="edit-icon-btn active" id="edit-icon-btn" onclick="toggleMode()" title="Bearbeitungsmodus">
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
  </svg>
</button>
```

**Bearbeiten-Button (Text)** — für Module die ein Modal öffnen (02, 07a, 07b):
```html
<button class="edit-btn" onclick="openModal(...)">Bearbeiten</button>
```

### Topbar CSS

```css
.topbar {
  background: var(--blue);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2vw 0 2.2vw; gap: 1vw;
}
.topbar-right { display: flex; align-items: center; gap: 0.6vw; flex-shrink: 0; }
.topbar-brand { color: rgba(255,255,255,0.18); font-size: 0.5vw; font-weight: 600; }
.edit-btn {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.28); font-size: 0.5vw;
  font-family: var(--font); font-weight: 600; padding: 0; transition: color 0.15s;
}
.edit-btn:hover { color: rgba(255,255,255,0.7); }
.edit-icon-btn {
  background: rgba(255,255,255,0.12); border: none; border-radius: 5px;
  padding: 0.42vh 0.42vw; cursor: pointer; color: rgba(255,255,255,0.28);
  display: flex; align-items: center; transition: all 0.15s; flex-shrink: 0;
}
.edit-icon-btn:hover { color: rgba(255,255,255,0.7); }
.edit-icon-btn.active { color: white; }
.edit-icon-btn svg { width: 13px; height: 13px; display: block; }
.home-btn {
  background: rgba(255,255,255,0.12); border: none; border-radius: 5px;
  padding: 0.42vh 0.42vw; cursor: pointer; color: white;
  display: flex; align-items: center; transition: background 0.15s;
  text-decoration: none; flex-shrink: 0;
}
.home-btn:hover { background: rgba(255,255,255,0.22); }
.home-btn svg { width: 13px; height: 13px; display: block; }
```

### Bottom-Nav HTML

```html
<div class="footer">
  <a href="01_agenda.html" class="nav-tab active">Agenda</a>
  <a href="02_bank.html" class="nav-tab">Bank</a>
  <a href="03_berater.html" class="nav-tab">Berater:in</a>
  <a href="04_philosophie.html" class="nav-tab">Philosophie</a>
  <a href="05_cockpit.html" class="nav-tab">Cockpit</a>
  <a href="06_ziele.html" class="nav-tab">Ziele</a>
  <div class="nav-tab-split">
    <a href="07a_finanzieren.html" class="nav-tab-half">Finanzieren</a>
    <a href="07b_anlegen.html" class="nav-tab-half">Anlegen</a>
  </div>
  <a href="08_vereinbarungen.html" class="nav-tab">Vereinbarungen</a>
  <a href="09_feedback.html" class="nav-tab">Feedback</a>
  <a href="10_abschluss.html" class="nav-tab">Abschluss</a>
  <div class="nav-spacer"></div>
  <span class="nav-brand">bbz bank</span>
</div>
```

### Bottom-Nav CSS

```css
.footer {
  background: var(--surface); border-top: 1px solid var(--line);
  display: flex; align-items: center; padding: 0 1vw; gap: 0.1vw;
}
.nav-tab {
  display: flex; align-items: center; justify-content: center;
  height: 100%; padding: 0 0.75vw;
  font-size: 0.52vw; font-weight: 600; color: var(--ink-4);
  white-space: nowrap; flex-shrink: 0; text-decoration: none;
  border-radius: 3px; transition: color 0.15s, background 0.15s;
}
.nav-tab:hover { color: var(--ink-3); background: var(--bg); }
.nav-tab.active { background: var(--blue-lt); color: var(--blue); font-weight: 700; }
.nav-tab-split {
  display: flex; align-items: center; height: 100%;
  flex-shrink: 0; border-radius: 3px; overflow: hidden;
}
.nav-tab-half {
  display: flex; align-items: center; justify-content: center;
  height: 100%; padding: 0 0.65vw;
  font-size: 0.52vw; font-weight: 600; color: var(--ink-4);
  white-space: nowrap; text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.nav-tab-half:hover { color: var(--ink-3); background: var(--bg); }
.nav-tab-half.active { background: var(--blue-lt); color: var(--blue); font-weight: 700; }
.nav-spacer { flex: 1; }
.nav-brand { font-size: 0.48vw; color: var(--line); font-weight: 600; padding: 0 0.3vw; flex-shrink: 0; }
```

---

## Canvas-Grundstruktur

```
┌─────────────────────────────────────┐
│  Topbar (6vh) – blau                │
├─────────────────────────────────────┤
│  Inhalt (flex: 1 / 1fr)             │
├─────────────────────────────────────┤
│  Bottom-Nav (4vh) – weiss           │
└─────────────────────────────────────┘
```

```css
.canvas {
  width: 95vw;
  aspect-ratio: 16/9;
  max-height: 95vh;
  display: grid;
  grid-template-rows: 6vh 1fr 4vh;
  overflow: hidden;
  box-shadow: 0 50px 120px rgba(0,0,0,0.55);
}
```

**Wichtig:** Jedes Modul definiert `grid-template-rows` lokal — der Mittelbereich kann mehrere Rows haben.

### Responsivität im Browser (Letter-Boxing)

```css
body {
  background: var(--blue-dk);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}
```

---

## Datenpersistenz – localStorage-Standard

### bbzData (Session + Config)

Alle Module verwenden das globale `BBZ`-Objekt aus `bbz-data.js`:

```js
BBZ.get('p1name')
BBZ.set('cockpit_einkommen', 85000)
BBZ.setIfEmpty('price', 850000)   // Prefill: nur wenn leer
BBZ.merge({ p1name: 'Anna' })
BBZ.fmt(85000)                     // → «85'000»
BBZ.age('1980-03-15')              // → Alter als number
BBZ.clearSession()                 // Session-Keys löschen, Config-Keys behalten
```

**Scopes:**
- `session` — wird bei «Neue Beratung» (`BBZ.clearSession()`) gelöscht
- `config` — bleibt dauerhaft erhalten (Berater-Einstellungen, Modulbilder)

### bbzAdmin (Beraterprofile)

Beraterprofile werden in einem **separaten** localStorage-Key `bbzAdmin` als Array gespeichert — nie in `bbzData`. `BBZ.clearSession()` berührt `bbzAdmin` nie.

```js
// Struktur
[
  {
    id: 1,
    name: 'Vorname Nachname',
    titel: 'Kundenberater:in',
    kacheln: [
      { titel: 'Wer ich bin',                     foto_b64: null, content: '' },
      { titel: 'Was ich mag',                     foto_b64: null, content: '' },
      { titel: 'Was Sie von mir erwarten können', foto_b64: null, content: '' },
    ]
  }
]
```

**Wichtig:** `bbzAdmin` ist gerätespezifisch — jeder Berater muss sein Profil einmalig lokal im normalen Browser erfassen. Kein zentrales Backend vorhanden.

### Stammdaten-Felder

| Feld | Typ | Scope | Beschreibung |
|---|---|---|---|
| `p1name` | String | session | Name Person 1 |
| `p1geb` | Date-String | session | Geburtsdatum Person 1 (ISO: `YYYY-MM-DD`) |
| `p2name` | String | session | Name Person 2 (optional) |
| `p2geb` | Date-String | session | Geburtsdatum Person 2 (optional) |
| `beratungsdatum` | Date-String | session | Automatisch gesetzt |
| `aktiverBerater` | number | config | ID des aktiven Beraters |
| `beraterName` | String | config | Name Berater:in (gespiegelt aus bbzAdmin) |
| `beraterTitel` | String | config | Rolle / Titel (gespiegelt aus bbzAdmin) |

### Modul-spezifische Felder

| Modul | Feld | Typ | Scope | Beschreibung |
|---|---|---|---|---|
| 01 | `agenda_traktanden` | Array\<String\> | session | Traktanden |
| 01 | `agenda_erwartungen` | Array\<String\> | session | Kundenerwartungen → 09 |
| 05 | `cockpit_einkommen` | number | session | Bruttoeinkommen p.a. |
| 05 | `cockpit_verpflichtungen` | number | session | Leasing + Unterhalt p.a. |
| 05 | `cockpit_pk_saldo` | number | session | PK-Guthaben (nur Info-Label in 07a) |
| 05 | `cockpit_anlage_f` | number | session | Anlagebetrag = Liq. − Reserve → 07b |
| 05 | `cockpit_data` | object | session | Vollständiger Cockpit-State für Reload |
| 06 | `ziele` | Array\<Ziel\> | session | Ziele und Wünsche |
| 08 | `vereinbarungen` | Array | session | Vereinbarungen |
| 08 | `vereinbarungenHeroImage` | string | **config** | Hintergrundbild Vereinbarungen |
| 09 | `fb_ratings` | Array | session | Bewertungen pro Erwartung |
| 09 | `fb_q_text_0` | string | session | Frage 1 (editierbar) |
| 09 | `fb_q_text_1` | string | session | Frage 2 (editierbar) |
| 09 | `fb_s1_img` | string | **config** | Titelbild Step 1 Feedback |
| 10 | `abschluss_bgImage` | string | **config** | Hintergrundbild Abschluss |

### Prefill-Kette
```
index.html  →  p1geb                        →  07a_finanzieren (Alter)
01_agenda   →  agenda_erwartungen           →  09_feedback
05_cockpit  →  cockpit_einkommen            →  07a_finanzieren
05_cockpit  →  cockpit_verpflichtungen      →  07a_finanzieren
05_cockpit  →  cockpit_pk_saldo             →  07a_finanzieren (Info-Label)
05_cockpit  →  cockpit_anlage_f             →  07b_anlegen
```

**Beträge immer als `number` speichern — nie als formatierten String.**

### Ziel-Schema (Modul 06)
```js
{
  id: 'z_' + Date.now(),
  katId: 'wohnen',
  typ: 'ziel' | 'zufluss',
  insp: 'Erstwohnung kaufen',
  name: 'Eigene Bezeichnung',
  jahr: 2031,        // number | null
  betrag: 800000,    // number | null – IMMER als number
  prob: 'wahrscheinlich',
  notiz: ''
}
```

---

## Typografie

**Schrift: DM Sans – keine andere.**

| Element | Grösse | Gewicht | Kontext |
|---|---|---|---|
| Haupttitel | 5.8vh | 800 | Willkommen, grosse Headlines |
| Untertitel | 2.4vh | 400 | Begleittext zu Titeln |
| Spalten-Labels | 1vw | 700 | «Traktanden», «Erwartungen» |
| Metadaten-Labels | 1.1vh | 600 | «Datum», «Uhrzeit» |
| Metadaten-Werte | 2.8vh | 700 | «11.04.2026» |
| Gesprächsziel | 1.5vw | 700 | Weiss auf Blau |
| Kunden-Zitate | 2vh | 500 | Rot, Border-Left |
| Nav-Tabs | 0.52vw | 600/700 | Bottom-Nav |

**Verbote:**

| Verboten | Warum |
|---|---|
| `text-transform: uppercase` | Wirkt aggressiv |
| `letter-spacing > 0` auf Brand-Text | Explizit abgelehnt |
| `font-style: italic` bei echten Inhalten | Nur für Platzhalter/Hints |
| `px` oder `rem` für Schriftgrössen | Nur `vh`/`vw` |
| `clamp()` | Ausnahme: nur auf Hero-Overlay-Text erlaubt |

---

## Layout-Prinzipien

### Sidebar + Content (Modul 07+)
```
.main (grid: 15.5vw 1fr)
  .sidebar (weiss, border-right)   ← Eingaben / Parameter
  .content (position: relative)    ← Views
```

### Layout-Verbote

| Verboten | Alternative |
|---|---|
| `position: absolute` für Panels/Sidebars | Echte Flex-/Grid-Kinder |
| `overflow: hidden` auf Bubble-Containern | Nur auf Canvas-Ebene |
| Panels als `position: absolute` rechts | Flex-Sibling mit fixer Breite |

---

## Interaktionsverhalten

| Element | Verhalten |
|---|---|
| `contenteditable="true"` | Direkt im Präsentationsmodus tippbar |
| Klickbare Bereiche | Öffnen Modal zur Bearbeitung |
| Modal | Backdrop-Klick oder X schliesst; **ausserhalb des Canvas** positioniert |
| Hover-Hints | Nur beim Hover sichtbar |
| Drag & Drop | Jahresposition auf Zeitachse (Modul 06) |
| Chart-Tabs | `switchTab()` mit doppeltem `requestAnimationFrame` |

### Click vs. Drag – Trennung (kritisch für SVG)

```js
// RICHTIG
element.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  openModal(id);
}, true);
// FALSCH: onclick-Attribut (wird von SVG-Kindern geblockt)
```

### Modal-Platzierung

```html
</div><!-- /canvas -->
<!-- Modals NACH dem Canvas, nie darin -->
<div id="myModal" class="modal-ov">...</div>
```

### Modal-Zustandsverwaltung

```js
// Öffnen
document.getElementById('myModal').style.display = 'flex';

// Schliessen + persistieren
function closeModal() {
  document.getElementById('myModal').style.display = 'none';
  persist(); // NACH dem Schliessen, nicht beim Öffnen
}
```

---

## Visualisierungs-Patterns

### Tragbarkeits-Gauge (07a)
```js
const offset = 282 - (Math.min(affordPct, 60) / 60) * 282;
gaugePath.style.stroke = affordPct > 40 ? 'var(--red)' : affordPct > 33.5 ? '#f59e0b' : 'var(--blue)';
```

### Amortisations-Balken (07a)
- 2. Hypothek: `var(--blue)`, opacity 0.55 — Verpfändung: `#dce8f4` — **Kein Amber**

### Varianten-Chart (Chart.js, 07a)
```js
const globalMax = Math.max(kalkV, rentV, ...allVariantTotals) * 1.4;
requestAnimationFrame(() => requestAnimationFrame(() => {
  S.variants.forEach((_, i) => renderVChart(i));
}));
```

### Stresstest / Crash-Chart (07b)
- Fällt auf –20%, **keine Recovery-Linie** — Recovery zeigen ist psychologisch manipulativ

### Renditeerwartungen (realistisch, netto nach Kosten, 07b)

| Strategie | Bereich |
|---|---|
| Einkommen | 0.5–1.5% |
| Konservativ | 1.5–2.5% |
| Ausgewogen | 3.0–4.5% |
| Wachstum | 5.0–6.5% |
| Dynamisch | 7.0–8.5% |

---

## Zahlenformatierung

`BBZ.fmt()` ist die **einzige** zu verwendende Formatierungsfunktion:

```js
BBZ.fmt(150000)      // → «150'000»
BBZ.fmt(1234.5, 2)   // → «1'234.50»
BBZ.fmt(null)        // → «–»
```

Lokale `fmt`-Funktionen in Modulen sind Legacy-Code — bei Überarbeitungen durch `BBZ.fmt()` ersetzen.

---

## Sprach-Regeln

| Was | Richtig | Falsch |
|---|---|---|
| Firmenname | bbz bank | BBZ Bank / bbz Bank |
| Fusszeile | bbz bank st.gallen ag © 2026 | BBZ ST.GALLEN AG |
| Anführungszeichen | «» | "" / '' |
| Berater:in | Doppelpunkt-Schreibweise | BeraterIn / Berater/in |
| Kunden-Wording | «Ungefährer Betrag» | «Geschätzter Betrag» |
| Kunden-Wording | «Erwartete Geldeingänge» | «Kapitalzufluss» |
| Kunden-Wording | «Zeitpunkt offen» | «Kein Datum» |
| Kunden-Wording | «Aktuelle Wohnkosten» | «Miete» |
| Positives Feedback | «Solide Ausgangslage» | «Bravo» / «Herzlichen Glückwunsch» |

---

## Bekannte Fallstricke

| Problem | Ursache | Lösung |
|---|---|---|
| localStorage leer | `file://`-Protokoll | GitHub Pages oder Live Server verwenden |
| Daten weg nach Fenstern schliessen | Inkognito-Modus | Normalen Browser verwenden |
| String-Konkatenation statt Addition | Betrag als String gespeichert | Immer `number` in localStorage |
| Modal wird abgeschnitten | Modal innerhalb Canvas mit `overflow:hidden` | Modal nach Canvas ins Body |
| SVG click blockiert | Kind-Elemente schlucken Events | `mousedown` + `capture: true` |
| Chart falsch ausgerichtet | Container hat noch keine Pixel-Dimensionen | Doppeltes `requestAnimationFrame` |
| Topbar nicht rechtsbündig | `justify-content: space-between` fehlt | Immer auf `.topbar` setzen |
| bbzAdmin-Profile weg nach Reload | `beforeunload` nicht gefeuert | Auto-Save bei jedem Input in admin.html |
| bbzAdmin korrumpiert | Anderes Modul schreibt auf `bbzAdmin` via `BBZ.merge()` | `bbzAdmin` darf nur `admin.html` schreiben |

---

## Qualitätscheckliste

- [ ] DM Sans eingebunden
- [ ] `bbz-data.js` im `<head>`
- [ ] Kein `bbz-nav.js` — Navigation ist hardcodiert
- [ ] Topbar: `justify-content: space-between`, Logo links, Admin-Links rechts
- [ ] Topbar: kein Nav-HTML in der Mitte
- [ ] Bottom-Nav: korrekter Tab als `.active` markiert
- [ ] Bottom-Nav: Finanzieren/Anlegen als `.nav-tab-split` ohne Trenner
- [ ] Kein `text-transform: uppercase`
- [ ] Kein `letter-spacing > 0` auf Brand-Text
- [ ] Alle Schriftgrössen in `vh`/`vw`
- [ ] Beträge als `number` in localStorage (nie als String)
- [ ] Modals ausserhalb des Canvas
- [ ] Click-Events mit `mousedown + capture:true` (SVG)
- [ ] Kein `position:absolute` für Panels
- [ ] Zeithorizont-Farben korrekt (kein Amber für UI-Zustände)
- [ ] Kein Amber/Orange für Haus-Fill oder Amort-Balken
- [ ] Rot nur für client-generierten Inhalt — nie für UI-Zustände oder Warnungen
- [ ] Zahlen mit de-CH Locale (Apostroph via `BBZ.fmt()`)
- [ ] Kunden-Wording geprüft (kein Bankjargon)
- [ ] Prefill aus bbzData implementiert (`BBZ.setIfEmpty`)
- [ ] Chart-Render mit doppeltem `requestAnimationFrame`
- [ ] Stresstest ohne Recovery-Linie
- [ ] Hintergrundbilder: keine menschlichen Gesichter
- [ ] Bildkeys die dauerhaft erhalten bleiben sollen: scope `config` in bbz-data.js
