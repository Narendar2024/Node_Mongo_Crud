require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 4000;

// ##### DATABASE CONNECTION ##### //
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected Successfully'));

// #### MIDDLEWARES #### //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(session({
    secret: '... . -.-. .-. . .--',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


// #### SETTING TAMPLATE ENGINE #### //
app.set('view engine', 'ejs');

// app.get("/", (req, res) => {
//     res.send("Welcome to Node Js");
// });


// #### Route Prefix #### //
app.use('', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})