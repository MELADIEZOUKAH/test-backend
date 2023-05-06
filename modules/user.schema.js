const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 35
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
});

User.methods.generateToken = function(){
    const token = jwt.sign({id: this._id},'privatekey' )
    return token;
}

const userValidate = joi.object({
        fullname: joi.string().min(4).max(35).required(),
        email: joi.string().min(4).required().email(),
        password: joi.string().min(8).max(1014).required()
    });


const Users = mongoose.model('Users', User, 'Users');
module.exports = {
    Users,
    userValidate
};