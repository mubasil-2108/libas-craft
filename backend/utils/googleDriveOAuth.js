const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const googleConfig = require("../config/googleConfig.js");
const open = (...args) =>
  import("open").then(({ default: open }) => open(...args));


const TOKEN_PATH = path.join(__dirname, "token.json");
// const CREDENTIALS_PATH = path.join(__dirname, "../config/oauth2.keys.json");

// Load client secrets
// function loadCredentials() {
//   return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
// }

async function authorize() {
  // const credentials = loadCredentials();
  // const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
    googleConfig.web.client_id,
    googleConfig.web.client_secret,
    googleConfig.web.redirect_uris[0]
  );

  // Check if token already exists
  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
    return oAuth2Client;
  }

  // Get new token
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });

  console.log("Authorize this app by visiting this url:", authUrl);
  await open(authUrl);

  return new Promise((resolve) => {
    console.log("Paste the code from that page here:");
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", async (code) => {
      const { tokens } = await oAuth2Client.getToken(code.trim());
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log("Token stored to", TOKEN_PATH);
      resolve(oAuth2Client);
      process.stdin.pause();
    });
  });
}

async function uploadFile(filePath, folderName) {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: path.basename(filePath),
    parents: folderName === 'reviews' ? [process.env.GOOGLE_DRIVE_REVIEWS_FOLDER_ID] : folderName === 'packages' ? [process.env.GOOGLE_DRIVE_PACKAGE_FOLDER_ID] : [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };
  const media = {
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink, webContentLink",
  });

  const fileId = response.data.id;

  // 2. Make file public (anyone can view)
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  // 3. Get updated metadata (so links work immediately)
  const fileMeta = await drive.files.get({
    fileId,
    fields: "id, name, webViewLink, webContentLink",
  });
  console.log("File uploaded:", fileMeta.data);

  return fileMeta.data;
}

/**
 * Update/replace an existing file on Google Drive
 */
async function updateFile(fileId, filePath) {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: path.basename(filePath),
  };
  const media = {
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.update({
    fileId,
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink, webContentLink",
  });

  return {
    fileId: response.data.id,
    webViewLink: response.data.webViewLink,
    webContentLink: response.data.webContentLink,
  };
}

/**
 * Delete file from Google Drive
 */
async function deleteFileFromDrive(fileId) {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  await drive.files.delete({ fileId });
  console.log(`File with ID ${fileId} deleted from Google Drive.`);
  return true;
}

module.exports = { uploadFile, updateFile, deleteFileFromDrive };
