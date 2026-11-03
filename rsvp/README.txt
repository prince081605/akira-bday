RSVP form -> Google Sheet
=========================

The RSVP form on the site saves every answer as a row in a Google Sheet that only
you can open. Setup takes about 5 minutes and you only do it once.

1. Make the sheet
   - Signed in to your Google account, go to https://sheets.new
   - Name it, e.g. "Akira's RSVPs".

2. Add the script
   - In the sheet, open Extensions > Apps Script.
   - Delete the code that is already there. Copy everything in google-sheet-script.gs
     (in this folder), paste it in, and click the Save icon.

3. Put it online
   - Click Deploy > New deployment.
   - Click the gear next to "Select type" and choose Web app.
   - Execute as: Me
     Who has access: Anyone
   - Click Deploy, then Authorize access, and pick your account.
     If Google says "Google hasn't verified this app", click Advanced, then
     "Go to ... (unsafe)", then Allow. That is expected for your own script.
   - Copy the Web app URL. It ends in /exec.

4. Check it
   - Open that URL in your browser. It should say "The RSVP sheet is connected".
     Your sheet now has its column headers.

5. Connect the site
   - In script.js, paste the link into formUrl:
       formUrl: "https://script.google.com/macros/s/..../exec",
   - Fill in rsvp.by (the reply-by date) and contact too, if you haven't yet.
   - Save, commit and push. Then send a test RSVP from the live site and check
     that a row appears in the sheet. Delete the test row afterwards.

Reading the sheet
- One row per guest. "Seats" counts the guest plus everyone they are bringing,
  and "Coming with them" lists those names.
- "Total seats" (top right) adds up everyone who is coming.
- If a guest changes their answer on the same phone, their row is updated instead
  of a new one being added. From a different phone it adds a new row, so if you
  see the same name twice, keep the newest one and delete the other.

Changing the script later
- After editing it, use Deploy > Manage deployments > pencil icon >
  Version: New version > Deploy. This keeps the same link.
  ("New deployment" would make a new link you'd have to paste again.)
