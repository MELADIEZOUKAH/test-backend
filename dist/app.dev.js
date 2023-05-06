"use strict";

var express = require('express');

var app = express();
var port = 5000 || process.env.PORT;

var connection = require('./connection');

var books = require('./routes/books');

var Software = require('./routes/software');

var users = require('./routes/users');

var auth = require('./routes/auth');

var path = require('path'); // to make post playing on the server


app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // To access all files in the View folder

app.set('view engine', 'ejs'); // To content static files

app.use(express["static"](path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express["static"]('node_modules'));
app.get('/', function (req, res) {
  return res.render('index', {
    mytitle: "Express"
  });
});
app.use('/books', books);
app.use('/Software', Software);
app.use('/users', users);
app.use('/auth', auth);
app.listen(port, function () {
  console.log("connect at http://localhost:".concat(port));
}); // if url is not found 

app.use(function (req, res, next) {
  return res.status(404).redirect("/");
});