# V2-RESTSCHULD — bbz-Dialog

Stand: 2026-07-13 · Branch `refactor/produktiv`

Inventar aller Punkte, die bei der Migration **Deck → Produktiv** (Schritte a/b/c:
Theme einbinden, Farb-/Reset-Duplikate entfernen, `font-size` `vw/vh` → `--fs-*`)
**bewusst nicht** vollständig migriert wurden und im v2-Repo (`bbz-dialog-v2`)
sauber gelöst werden sollen. Datenfluss/Logik/Grids blieben unangetastet.

---

## 1. Dynamische JS-Schriftgrössen (noch in `vh`)

Diese `font-size` werden zur Laufzeit aus der Eintrags-Anzahl berechnet, um den
Inhalt in die **feste 16:9-Canvas-Höhe** einzupassen. Sie sind NICHT im
statischen CSS, tauchen daher nicht im Grep-Check auf und wurden per Beschluss
belassen (Umbau = Render-Logik = Regressionsfläche). **v2:** auf rem-Tier-Map
portieren (z. B. `≤5 → --fs-lg`, `≤7 → --fs-md`, `≤9 → --fs-base`, sonst `--fs-sm`).

| Datei | Zeile | Funktion | Element | Tier-Werte (vh) | Bedingung |
|---|---|---|---|---|---|
| `01_agenda.html` | 455 (Def. 450) | `renderTraktanden()` | `.trak-text` | 2.4 / 2.1 / 1.9 / 1.7 | Anzahl ≤5 / ≤7 / ≤9 / sonst |
| `01_agenda.html` | 468 (Def. 466) | `renderErwartungen()` | `.exp-quote` | 2.1 / 1.9 / 1.7 | Anzahl ≤3 / ≤5 / sonst |

Kein weiteres Modul enthält dynamische JS-`font-size` in `vh/vw` (repo-weit geprüft).

---

## 2. Dekorative Glyphen → feste `12rem`

Grosse, sehr schwache Hintergrund-Ziffern/Glyphen (`font-weight:900`, niedrige
`opacity`, `overflow`-geklippt). Für solche Grössen existiert kein Typo-Token
(Skala endet bei `--fs-3xl` ≈ 40–60px). Per genehmigter Konvention auf eine
**feste `12rem`** gesetzt (Referenzwert). **v2:** ggf. eigenes `--fs-deco`-Token
oder `clamp()` definieren, statt Literal.

| Datei | Zeile | Element | War |
|---|---|---|---|
| `01_agenda.html` | 127 | `.deco` (Traktanden-Ziffer) | `22vh` |
| `02_bank.html` | 137 | Karten-Watermark-Ziffer | `13vh` |
| `07b_anlegen.html` | 253 | Schritt-Watermark-Glyph | `8vw` |
| `09_feedback.html` | 271 | Watermark-Ziffer | `16vh` |

---

## 3. Hinweise (kein Handlungsbedarf, nur Transparenz)

- **Grosse Headings** (`5vh`, `5.5vh`, `7vh`, `clamp(…7vh…)`) wurden regulär auf
  `--fs-3xl` gemappt — kein Sonderfall, hier nur zur Nachvollziehbarkeit notiert.
- **Fluide `clamp(px, N vh, px)`-Schriften** (u. a. in `02_bank.html`) wurden
  über den inneren `vh/vw`-Wert regulär auf `--fs-*`-Tokens gemappt.
- **Layout-`vw/vh`** (Spaltenbreiten, Paddings, Gaps, `grid-template-rows`,
  `.canvas` 16:9) wurde bewusst **nicht** angefasst — das war Auftrag der
  Schritte d/e (Shell/Nav), die für v2 zurückgestellt sind.
- Modul-spezifische `:root`-Variablen ohne Theme-Pendant blieben erhalten:
  `04_philosophie` (`--phase-1..4`), `05_cockpit` (`--red-dk`, `--red-lt`),
  `06_ziele` (`--red-lt`, `--green-lt`, `--amber-lt`).

---

## 4. Vor-Merge-Gate: Layout-Befunde (rem-Schrift in fixen vh-Zeilen)

Automatisierte Overflow-/Clip-Messung (iframe bei **exakt** 1920×1080 und 1366×768)
+ visuelle Kontrolle, jeweils gegen die main-Baseline (vh-Original) verglichen.
**Kein** Struktur-Overflow (keine horizontale Scrollbar, kein Canvas über Viewport,
kein Grid-Sprengen) auf **keiner** der 13 Seiten. Drei Elemente klippen vertikal;
**nicht gefixt** (keine Layout-Chirurgie in diesem Repo) — Entscheid pro Befund beim v2.

| # | Seite | Element | Baseline (vh) | Branch (rem) | Migrations-verursacht? | Betroffener Inhalt / Schwere |
|---|---|---|---|---|---|---|
| B1 | `01_agenda` | `.trak-col` | cut 14–19px | cut 17–18px | **Nein** (Baseline klippt gleich) | Kein sichtbarer Textverlust; zentrierte Spalte. **Keine Regression.** |
| B2 | `02_bank` | `.pillar-card` ×4 | cut 19–25px | cut 35–39px | Teilweise (+~15px durch rem) | Geklippt: Hover-Link «Mehr erfahren →» — **auch im Original geklippt** (Design-Intent). Sichtbar (Icon/Label/Ziffer) unversehrt. Schwere: **kosmetisch/tief.** |
| B3 | `05_cockpit` | `.chart-ctrl` (+`.chart-main` +9px) | 0 (sauber) | cut 27px @768 | **Ja** (neu durch rem) | Nur ≤768px Höhe: Steuer-Panel der Simulation klippt ~27px; die Zeile «Sparquote einbeziehen: Ja/Nein» sitzt an/knapp hinter der Klippkante. Bei 1080px sauber. Schwere: **tief–mittel** (Control kann auf Laptop teils verdeckt sein). |

**Ursache B2/B3:** rem-Label/-Werte minim höher als die früheren `vh`-Werte → in
fix gehöhten Karten/Grid-Zeilen entsteht wenige px mehr Klipp. **v2-Fix** (im
Shell-/Layout-Umbau, hier bewusst nicht): Kartenhöhe/Grid-Zeile auf `auto`/`min-content`
bzw. Panel scrollbar (`overflow-y:auto`) statt fixer `vh`-Höhe.
