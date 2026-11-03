/* ============================================================
   RSVP → Google Sheet
   Paste this whole file into Extensions > Apps Script of your RSVP Google Sheet,
   then deploy it as a web app. The steps are in README.txt in this folder.
   ============================================================ */
const SHEET_NAME = "RSVPs";
const HEADERS = ["Last updated", "Name", "Attending", "Seats", "Coming with them", "Note", "ID"];
const ID_COLUMN = HEADERS.length;

// The website sends each RSVP here.
function doPost(e) {
  const p = e.parameter;
  const name = clean(p.name);
  if (!name) return reply({ ok: false, error: "Missing name" });

  const attending = p.attending === "yes";
  const guests = attending
    ? String(p.guests || "").split("\n").map((guest) => clean(guest)).filter(Boolean).slice(0, 10)
    : [];
  const id = String(p.id || "").replace(/[^\w-]/g, "").slice(0, 64);
  const row = [
    new Date(),
    name,
    attending ? "Yes" : "No",
    attending ? 1 + guests.length : 0,
    guests.join(", "),
    clean(p.message, 500),
    id,
  ];

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    // A guest who answers again from the same phone updates their row instead of adding one.
    const found = id && sheet.getRange(1, ID_COLUMN, sheet.getMaxRows(), 1)
      .createTextFinder(id).matchEntireCell(true).findNext();
    if (found) sheet.getRange(found.getRow(), 1, 1, row.length).setValues([row]);
    else sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

// Opening the web app link in a browser shows this, so you can check it works.
function doGet() {
  getSheet();
  return ContentService.createTextOutput("The RSVP sheet is connected ✓  Put this link in formUrl in script.js.");
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0].setName(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
    sheet.getRange("I1").setValue("Total seats").setFontWeight("bold");
    sheet.getRange("J1").setFormula("=SUM(D2:D)").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trims the text, keeps it short, and stops it from being read as a formula.
function clean(value, max = 80) {
  const text = String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
