// getting started.js
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://melad:abcd1234@cluster0.tm3ybse.mongodb.net/test",{useNewUrlParser:true})
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))
db.once('open',function(){
    // we're connected
    console.log('we are connected')
})