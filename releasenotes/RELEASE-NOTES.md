# BBZ Beratungsplattform — Release Notes

---

## Session 2026-04-12

### Geänderte Dateien
| Datei | Status |
|---|---|
| `bbz-data.js` | ✅ Aktuell |
| `05_cockpit.html` | ✅ Aktuell |
| `07a_finanzieren.html` | ✅ Aktuell |
| `07b_anlegen.html` | ✅ Aktuell |
| `10_abschluss.html` | ✅ Aktuell |

---

### bbz-data.js
- `cockpit_ausgaben` entfernt (war nie aktiv beschrieben — toter Key)
- `cockpit_verpflichtungen` neu deklariert (`number`, session)
- `cockpit_data` neu deklariert (`object`, session) — für vollständigen State-Reload

---

### 05_cockpit.html
- **Bug-Fix:** State `S` wird beim Laden aus `bbzData` (`cockpit_data`) wiederhergestellt → Daten bleiben beim Tab-Wechsel erhalten
- **Datenlogik:** `cockpit_einkommen` wird korrekt × 12 hochgerechnet wenn Frequenz = monatlich
- **Datenlogik:** `cockpit_verpflichtungen` = nur Leasing + Unterhalt (ohne Haushalt & übrige Ausgaben)
- **Datenlogik:** `cockpit_anlage_f` schreibt neu den berechneten Wert `anlageF` (Liquidität − Wohlfahrtsreserve) statt dem manuellen `S.anlegen.volumen`
- **Datenlogik:** `cockpit_pk_saldo` wird korrekt aus `S.vorsorgen.pkSaldo` geschrieben
- **UI:** Titel von «Beratungsplattform» auf «Finanz-Cockpit» korrigiert
- **UI:** Aktive KPI-Kachel von `#004078` auf `#1a6bad` geändert — klar unterscheidbar vom Header

---

### 07a_finanzieren.html
- **Datenlogik:** Verpflichtungen-Feld liest neu `cockpit_verpflichtungen` statt dem nicht existierenden `cockpit_ausgaben`
- **Datenlogik:** PK-Guthaben wird nicht mehr ins `pensionWithdraw`-Feld geprefilled
- **UI:** PK-Guthaben erscheint als dezentes Info-Label (`1.1vh`, grau `#94a3b8`) unterhalb der 2. Säule-Felder
- **Bug-Fix:** Doppeltes `pensionPledge`-Feld entfernt (Überbleibsel aus früherer Iteration)
- **UI:** Reihenfolge korrigiert: Vorbezug → Verpfändung → PK-Info-Label

---

### 07b_anlegen.html
- **Datenlogik:** Investitionsbetrag wird aus `cockpit_anlage_f` (anlagefähiges Kapital) vorausgefüllt
- **UI:** Dezenter Hinweis unterhalb des Betragsfelds: «Ihr anlagefähiges Kapital aus dem Finanz-Cockpit: CHF X»

---

### 10_abschluss.html
- **Bug-Fix:** `bbz-data.js` war nicht eingebunden → `BBZ` undefiniert → Name/Datum leer. Script-Tag ergänzt.
- **Bug-Fix:** Verwaiste `fnav`-Chips (Cockpit + Agenda) ausserhalb `</footer>` entfernt
- **Bug-Fix:** Upload-Button «Hintergrundbild ändern» in `.main`-Container verschoben (war ausserhalb Canvas → `overflow:hidden` schnitt ihn ab)

---

### Bekannte offene Punkte
- `03_berater.html` — Icon-Zentrierung im weissen Feld noch offen (Änderungen verworfen)
- Topbar-Migration: nicht für alle Module bestätigt vollständig abgeschlossen
- Unified Icon Set: wenn eingeführt, zuerst `04_beratungsphilosophie.html` aktualisieren
