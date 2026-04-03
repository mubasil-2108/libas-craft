const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const googleConfig = require("../config/googleConfig.js");
const open = (...args) =>
  import("open").then(({ default: open }) => open(...args));


const TOKEN_PATH = path.join(__dirname, "../token.json");

async function authorize() {
  const oAuth2Client = new google.auth.OAuth2(
    googleConfig.web.client_id,
    googleConfig.web.client_secret,
    googleConfig.web.redirect_uris[0]
  );

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error("❌ No token found. Please authenticate via /auth/google");
  }

  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
  // oAuth2Client.setCredentials(tokens);

  // return oAuth2Client;
  // ✅ Guard: catch missing refresh_token early
  if (!tokens.refresh_token) {
    throw new Error(
      "❌ No refresh_token in token.json. Delete token.json and re-authenticate via /auth/google"
    );
  }

  oAuth2Client.setCredentials(tokens);

  // ✅ Auto-save updated tokens whenever they get refreshed
  oAuth2Client.on("tokens", (newTokens) => {
    const updated = { ...tokens, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2));
    console.log("🔄 Tokens refreshed and saved.");
  });

  return oAuth2Client;
}


async function uploadFile(filePath, folderName) {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: path.basename(filePath),
    parents: folderName === 'reviews' ?
      [process.env.GOOGLE_DRIVE_REVIEWS_FOLDER_ID] :
      folderName === 'packages' ?
        [process.env.GOOGLE_DRIVE_PACKAGE_FOLDER_ID] :
        folderName === 'siteLogo' ?
          [process.env.GOOGLE_DRIVE_SITELOGO_FOLDER_ID] :
          folderName === 'newDealImage' ?
            [process.env.GOOGLE_DRIVE_DEALIMAGE_FOLDER_ID] :
            folderName === 'blogImages' ?
              [process.env.GOOGLE_DRIVE_BLOGIMAGE_FOLDER_ID] :
              [process.env.GOOGLE_DRIVE_FOLDER_ID],
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
