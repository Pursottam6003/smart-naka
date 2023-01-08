const express = require('express');
const app = express();
const cors = require('cors');
const cookies = require('cookie-parser')
require('dotenv').config();
const dbo = require('./db/conn');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(cors({
    origin: process.env.ORIGIN
}));
app.use(cookies());
app.use(express.json());

app.use(require('./routes/record'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    dbo.connectToServer(err => {
        if (err) throw err;
    });

    console.log(`Server is running on port ${port}...`);
});