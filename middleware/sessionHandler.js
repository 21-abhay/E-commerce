
const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
module.exports = session({
    secret: process.env.session_secret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true
});

