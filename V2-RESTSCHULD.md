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
