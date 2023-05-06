const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const connection = require('./connection');
const books = require('./routes/books');
const Software= require('./routes/software');
const users = require('./routes/users');
const auth = require('./routes/auth');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

const {isAuthenticated} = require('./middleware/isAuthenticated');

app.use(cors({
    origin: ["http://localhost:3000"]
}));

require('./middleware/middleware')(app,passport);
require('./config/passport')(passport);

// passport express
app.use(passport.initialize());
app.use(passport.session())

// To access all files in the View folder
app.set('view engine', 'ejs')

// To content static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('node_modules'));


app.get('/', isAuthenticated, (req, res) => res.render('index'));
app.use('/books', books);
app.use('/Software', Software);
app.use('/users', users);
app.use('/auth', auth);

app.listen(port ,()=>{
    console.log(`connect at http://localhost:${port}`);
})

// if url is not found 
app.use((req, res, next) => res.status(404).redirect("/"))