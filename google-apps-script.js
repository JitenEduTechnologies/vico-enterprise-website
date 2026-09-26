function doPost(e) {
var lock = LockService.getScriptLock();
lock.tryLock(10000);
try {
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
if (sheet.getLastRow() === 0) {
sheet.appendRow([
"Submission ID",
"Date & Time",
"Full Name",
"Email",
"Phone",
"Interested In",
"Experience Level",
"Preferred Contact",
"Message",
"Source Page",
"Status"
]);
sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#dcefe8");
}
var data = {};
if (e.postData && e.postData.contents) {
try {
data = JSON.parse(e.postData.contents);
} catch (err) {
data = e.parameter;
}
} else {
data = e.parameter;
}
if (data.website_hp && data.website_hp.trim() !== "") {
return ContentService
.createTextOutput(JSON.stringify({ status: "success", message: "Thank you — we've received your enquiry." }))
.setMimeType(ContentService.MimeType.JSON);
}
var fullName = (data.full_name || "").trim();
var email = (data.email || "").trim();
var phone = (data.phone || "").trim();
var interestedIn = (data.interested_in || "Other").trim();
var experienceLevel = (data.experience_level || "Not Specified").trim();
var preferredContact = (data.preferred_contact || "Email").trim();
var message = (data.message || "").trim();
var sourcePage = (data.source_page || "contact.html").trim();
if (!fullName || !email || !phone || !message) {
return ContentService
.createTextOutput(JSON.stringify({ status: "error", message: "Please fill in all required fields." }))
.setMimeType(ContentService.MimeType.JSON);
}
if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
return ContentService
.createTextOutput(JSON.stringify({ status: "error", message: "Invalid email address format." }))
.setMimeType(ContentService.MimeType.JSON);
}
var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
var submissionId = "VICO-" + Math.floor(100000 + Math.random() * 900000);
sheet.appendRow([
submissionId,
timestamp,
fullName,
email,
phone,
interestedIn,
experienceLevel,
preferredContact,
message,
sourcePage,
"NEW"
]);
return ContentService
.createTextOutput(JSON.stringify({
status: "success",
message: "Thank you — we've received your enquiry.",
submissionId: submissionId
}))
.setMimeType(ContentService.MimeType.JSON);
} catch (error) {
return ContentService
.createTextOutput(JSON.stringify({ status: "error", message: "Server error. Please try again later." }))
.setMimeType(ContentService.MimeType.JSON);
} finally {
lock.releaseLock();
}
}