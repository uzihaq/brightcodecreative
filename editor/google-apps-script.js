// INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Add headers in Row 1: Timestamp | Name | Company | Email | Services | Project | Timeline | Budget
// 3. Go to Extensions → Apps Script
// 4. Paste this code and save
// 5. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy the URL and give it to Uzair
// 7. Done — form submissions will appear as new rows

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.company || "",
    data.email || "",
    data.services || "",
    data.project || "",
    data.timeline || "",
    data.budget || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
