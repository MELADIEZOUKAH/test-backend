const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
// const StroeMongo = require('connect-mongo')(session);

module.exports = (app, passport)=>{
    // to make post playing on the server
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(flash())
    app.use(session({
        name: 'sessionId',
        secret: 'meladiezoukah2000-09-02',
        resave: false,
        saveUninitialized: false,
        cookie:{
            secure: false,
            httpOnly: false,
            express: new Date(Date.now() *60 *60 *100) // 1 hour
        }
    }));
}