const mongoose = require('mongoose');

const Software = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    path_img:{
        type : String,
        required : true
    },
    path_software:{
        type : String,
        required : true
    },
    discription:{
        type : String,
        required : true
    },
    createAt:{
        type : Date,
        required : true
    },
    isVisibale:{
        type : Boolean,
        required : true
    }
})

const newSoftware = mongoose.model('Software', Software,'Software');
module.exports = newSoftware;