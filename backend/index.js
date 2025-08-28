// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const errorHandler = require('./middlewares/error');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(errorHandler);

// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => {
//         console.log('connected to database');
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     return res.json({
//         message: `Backend is running ${process.pid}`
//     })
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const cluster = require('node:cluster');
const os = require('os');

const numOfCPU = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < numOfCPU; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(errorHandler);

    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log('connected to database');
        })
        .catch((err) => {
            console.log(err);
        })


    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
        return res.json({
            message: `Backend is running ${process.pid}`
        })
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}