# bbz-Dialog

**Digitale Beratungsplattform der bbz bank st.gallen ag**
Interaktive Gesprächsführung für Kundenberatungen — präsentiert im Browser, 16:9-Vollformat.

---

## Übersicht

Die Plattform besteht aus 11 selbstständigen HTML-Modulen, die über eine zentrale Startseite (`index.html`) gestartet werden. Jedes Modul entspricht einer Gesprächsphase und ist einzeln aufrufbar. Kundendaten, Cockpit-Werte und Gesprächsergebnisse werden modulübergreifend über `localStorage` (`bbzData`) synchronisiert.

---

## Technologie

- Vanilla HTML / CSS / JavaScript — kein Framework, keine Build-Pipeline
- Lokale Schriftart: [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Datenpersistenz: `localStorage` (Key `bbzData`) über `bbz-data.js`
- Navigation: `bbz-nav.js` (chip-basierte Topbar)
- Darstellung: 16:9-Canvas (`width: 95vw`, `max-height: 95vh`), optimiert für Full-HD-Präsentation
- Starten: Datei lokal öffnen (z.B. via VS Code Live Server) oder auf einem Webserver ablegen

---

## Dateistruktur

```
bbz-Dialog/
├── index.html                  # Startseite: Berater wählen, Kundendaten, Modulauswahl
├── admin.html                  # Beraterprofile verwalten
├── bbz-data.js                 # Zentrale Datenschicht (BBZ-Objekt, Schema, localStorage)
├── bbz-nav.js                  # Globale Chip-Navigation (wird per <script> eingebunden)
│
├── 01_agenda.html              # Gesprächsagenda & Erwartungen
├── 02_bank.html                # Vorstellung bbz bank (Tradition, Innovation, …)
├── 03_berater.html             # Berater-Vorstellung (3 Kacheln, Präsentation/Bearbeitung)
├── 04_philosophie.html         # Beratungsphilosophie (4-Phasen-Flow mit Modals)
├── 05_cockpit.html             # Finanz-Cockpit (Einkommen, Ausgaben, Vorsorge, Anlagen)
├── 06_ziele.html               # Ziele & Wünsche (Zeitachse, Lebensplanung)
├── 07a_finanzieren.html        # Eigenheimfinanzierung & Tragbarkeit
├── 07b_anlegen.html            # Anlegerprofilierung & Kostenvergleich
├── 08_vereinbarungen.html      # Vereinbarungen & nächste Schritte
├── 09_feedback.html            # Zufriedenheitsdialog (Erwartungsabgleich)
├── 10_abschluss.html           # Gesprächsabschluss & Beratungsbericht
│
├── data/
│   └── berater.json            # Beraterprofile (Name, Titel, Fotos, Kacheltexte)
│
└── img/
    ├── abschluss/              # abschluss.jpg
    ├── bank/                   # bbzbank.jpg
    ├── berater/                # berater1a–5c.jpg (3 Fotos pro Profil)
    ├── feedback/               # feedback_a.jpg, feedback_b.jpg, feedback_c.jpg
    ├── philosophie/            # philosophie_a–d.jpg
    └── vereinbarungen/         # vereinbarungen.jpg
```

---

## Module

| # | Datei | Gesprächsphase | Daten schreiben | Daten lesen |
|---|---|---|---|---|
| 01 | `01_agenda.html` | Gesprächseinstieg | `agenda_traktanden`, `agenda_erwartungen` | — |
| 02 | `02_bank.html` | Banksvorstellung | `bankTexts`, `bankHeroSub` | — |
| 03 | `03_berater.html` | Beratervorstellung | `beratervorstellung` | `aktiverBerater` |
| 04 | `04_philosophie.html` | Beratungsphilosophie | `bbz_beratungsphilosophie_v1`¹ | — |
| 05 | `05_cockpit.html` | Finanzsituation | `cockpit_einkommen`, `cockpit_verpflichtungen`, `cockpit_pk_saldo`, `cockpit_anlage_f`, `cockpit_data` | — |
| 06 | `06_ziele.html` | Ziele & Wünsche | `ziele`, `wuensche` | `p1name`, `p1geb`, `p2name`, `p2geb` |
| 07a | `07a_finanzieren.html` | Eigenheimfinanzierung | — | `cockpit_einkommen`, `cockpit_verpflichtungen`, `cockpit_pk_saldo` |
| 07b | `07b_anlegen.html` | Anlegerprofilierung | `anlage_kenntnisse`, `anlage_esg`, `anlage_konklusion`, `anlage_produktwahl`, `anlage_preise` | `cockpit_anlage_f` |
| 08 | `08_vereinbarungen.html` | Vereinbarungen | `vereinbarungen`, `vereinbarungen_v1` | `p1name`, `beraterName` |
| 09 | `09_feedback.html` | Zufriedenheitsdialog | `fb_ratings`, `fb_q_text_0`, `fb_q_text_1` | `agenda_erwartungen` |
| 10 | `10_abschluss.html` | Gesprächsabschluss | — | Alle relevanten Keys |

¹ `04_philosophie.html` nutzt einen eigenen localStorage-Key (`bbz_beratungsphilosophie_v1`) und ist nicht in `BBZ.clearSession()` eingebunden.

---

## Datenschicht (`bbz-data.js`)

Das globale `BBZ`-Objekt ist die einzige Schnittstelle zum `localStorage`:

```js
BBZ.get('p1name')                  // Wert lesen (mit Schema-Default als Fallback)
BBZ.set('cockpit_einkommen', 85000) // Wert schreiben (type-safe)
BBZ.merge({ p1name: 'Anna', ... }) // Mehrere Keys auf einmal
BBZ.setIfEmpty('price', 850000)    // Nur schreiben wenn leer (Prefill)
BBZ.clearSession()                 // Neue Beratung (Config-Keys bleiben erhalten)
BBZ.getProfile()                   // Promise → aktives Berater-Profil
BBZ.fmt(85000)                     // → "85'000"
BBZ.fmtDate('1980-03-15')          // → '15.03.1980'
BBZ.age('1980-03-15')              // → Alter in Jahren
```

**Scopes:**
- `session` — wird bei «Neue Beratung» (`clearSession()`) gelöscht
- `config` — bleibt erhalten (Beraterauswahl, Modulkonfiguration, Hintergrundbilder)

---

## Beraterprofile

Profile werden in `data/berater.json` definiert (bis zu 5 Profile). Jedes Profil enthält Name, Titel und drei Kacheln mit je einem Foto und einem Freitext.

Profile können im **Admin-Bereich** (`admin.html`) direkt im Browser bearbeitet werden. Änderungen werden in `localStorage` (`bbzAdmin`) gespeichert und überschreiben `berater.json`.

**Bildpfade je Profil** (Konvention): `img/berater/beraterNa.jpg`, `beraterNb.jpg`, `beraterNc.jpg` (N = Profil-ID).

---

## Neue Beratung starten

1. `index.html` öffnen
2. Berater:in auswählen
3. Kundendaten (Name + Geburtsdatum Person 1) erfassen
4. Beratungsdatum setzen
5. Vertiefungsmodule wählen (Finanzieren und/oder Anlegen)
6. «Beratung starten» — navigiert zum ersten aktiven Modul

«Alle Daten zurücksetzen» löscht alle Session-Daten (Kundendaten, Cockpit, Ziele, Vereinbarungen). Beraterauswahl und Modulkonfiguration bleiben erhalten.

---

## Bilder austauschen

Jedes Modul mit Hintergrundbild hat einen dezenten Upload-Button (erscheint beim Hover). Hochgeladene Bilder werden als Base64 in `bbzData` gespeichert und beim nächsten Öffnen wiederhergestellt.

Standardbilder liegen im `/img/`-Verzeichnis:

| Modul | Standardbild(er) |
|---|---|
| 02 Bank | `img/bank/bbzbank.jpg` |
| 03 Berater | `img/berater/beraterNa–c.jpg` |
| 04 Philosophie | `img/philosophie/philosophie_a–d.jpg` |
| 08 Vereinbarungen | `img/vereinbarungen/vereinbarungen.jpg` |
| 09 Feedback (Step 1) | `img/feedback/feedback_a.jpg` |
| 09 Feedback (Step 3) | `img/feedback/feedback_b.jpg`, `feedback_c.jpg` |
| 10 Abschluss | `img/abschluss/abschluss.jpg` |

---

## Design-Grundsätze

- **Farben:** `#004078` (bbz-blau), `#950e13` (bbz-rot)
- **Schrift:** DM Sans, Grössen ausschliesslich in `vh` (kein `px`/`rem` für Text)
- **Canvas:** `width: 95vw`, `aspect-ratio: 16/9`, `max-height: 95vh`
- **Rot** ist reserviert für kundengenerierte Inhalte (Zitate, Erwartungen)
- **Amber `#b45309`** ist reserviert für Zeithorizont «Mittelfristig» in Modul 06
- Keine Grossbuchstaben, kein `letter-spacing`, keine Kursivschrift auf bbz-Markentexten
- Keine menschlichen Gesichter in Hintergrundbildern (nur abstrakte/atmosphärische Motive)
- Modals müssen ausserhalb des Canvas-Divs platziert werden (verhindert `overflow:hidden`-Clipping)

---

## Bekannte offene Punkte

- `03_berater.html` — Icon-Zentrierung im weissen Kachel-Feld noch offen
- `04_philosophie.html` — nutzt handgemachte SVG-Piktogramme; bei Einführung eines einheitlichen Icon-Sets als erstes Modul aktualisieren
- `bbz-nav.js` ist vollständig implementiert, aber noch nicht in alle Module eingebunden (aktuell nutzen mehrere Module eine inline-Navigation)
- `anlage_strategie`, `anlage_profil` etc. (Schema-Keys) werden von `07b_anlegen.html` nicht direkt geschrieben — `10_abschluss.html` liest `anlage_konklusion` stattdessen

---

*bbz bank st.gallen ag © 2026*
