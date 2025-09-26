const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file

// const KEYFILEPATH = path.join(__dirname, "../config/credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
    credentials:{
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_url: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_secret: process.env.CLIENT_SECRET,
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        private_key_id: process.env.PRIVATE_KEY_ID,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN,
    },
    scopes: SCOPES,
});

const drive = google.drive({
    version: 'v3',
    auth
});

/**
 * Upload file to Google Drive
 * @param {Object} file - File object from multer
 * @returns {Promise<string>} public file URL
 */

async function uploadFileToDrive(file) {
    console.log('Uploading file:', file);
    const fileMetadata = {
        name: file.originalname,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
    }

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
    }

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id, webViewLink, webContentLink",
    })

    const fileId = response.data.id;

    await drive.permissions.create({
        fileId,
        requestBody:{
            role: 'reader',
            type: 'anyone',
        }
    })

    // Generate public link
    const result = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
    })

    // Delete file from server after upload to Google Drive
    fs.unlinkSync(file.path);

    return {
        fileId,
        url: result.data.webContentLink
    };
}

async function deleteFileFromDrive(fileId) {
  try {
    await drive.files.delete({ fileId });
    console.log(`Deleted file with ID: ${fileId}`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

module.exports = { uploadFileToDrive, deleteFileFromDrive };

