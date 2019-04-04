const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express()
dotenv.config();
const db = mongoose.connection;
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;


mongoose.connect(DB_URL, { useNewUrlParser: true ,useCreateIndex: true,});
db.on('error', error => console.log(error));


app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', routes)

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.listen(PORT, () => {
    console.log("Server started on http://localhost:" + PORT)
})

module.exports = app;