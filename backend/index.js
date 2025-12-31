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
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/settings', settingRoutes);

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