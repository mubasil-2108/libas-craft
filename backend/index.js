// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('./config/passport');
const errorHandler = require('./middlewares/error');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/reviews');
const likesRoutes = require('./routes/likes');
const packageRoutes = require('./routes/specialPackage');
const settingRoutes = require('./routes/setting');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');

const fs = require("fs");
const { google } = require("googleapis");
const googleConfig = require("./config/googleConfig");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    })


app.use(
    cors(
        {
            origin: process.env.FRONTEND_URL,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'Cache-Control',
                'Expires',
                'Pragma',
            ],
            preflightContinue: false,
            optionsSuccessStatus: 204
        }
    )
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());


app.get("/", (req, res) => {
    return res.json({
        message: `Backend is running ${process.pid}`
    })
})

const TOKEN_PATH = path.join(__dirname, "token.json");

const getOAuthClient = () =>
  new google.auth.OAuth2(
    googleConfig.web.client_id,
    googleConfig.web.client_secret,
    googleConfig.web.redirect_uris[0]  // this is "http://localhost:5000/oauth2callback"
  );

app.get("/auth/google", (req, res) => {
  const oAuth2Client = getOAuthClient();
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });
  console.log("🔗 Redirecting to:", authUrl);
  res.redirect(authUrl);
});

// ✅ Fixed: matches googleConfig.web.redirect_uris[0]
app.get("/oauth2callback", async (req, res) => {
  try {
    const code = req.query.code;
    console.log("📩 Received code:", code);

    const oAuth2Client = getOAuthClient();
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("🎟️ Tokens received:", tokens);

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log("✅ token.json saved at:", TOKEN_PATH);

    res.send(`
      <h2>✅ Authentication Successful!</h2>
      <p>token.json has been saved.</p>
      <p>Refresh token present: <b>${!!tokens.refresh_token}</b></p>
    `);
  } catch (err) {
    console.error("❌ Callback error:", err.message);
    res.status(500).send("Authentication failed: " + err.message);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const errorHandler = require('./middlewares/error');
// const cluster = require('node:cluster');
// const os = require('os');

// const numOfCPU = os.cpus().length;

// if (cluster.isPrimary) {
//     for (let i = 0; i < numOfCPU; i++) {
//         cluster.fork();
//     }
// } else {
//     const app = express();
//     const PORT = process.env.PORT || 5000;

//     app.use(errorHandler);

//     mongoose
//         .connect(process.env.MONGO_URL)
//         .then(() => {
//             console.log('connected to database');
//         })
//         .catch((err) => {
//             console.log(err);
//         })


//     app.use(cors());
//     app.use(express.json());
//     app.use(cookieParser());
//     app.use(express.urlencoded({ extended: false }));
//     app.use(bodyParser.json());

//     app.get("/", (req, res) => {
//         return res.json({
//             message: `Backend is running ${process.pid}`
//         })
//     })

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`)
//     })
// }