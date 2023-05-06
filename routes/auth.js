const express = require('express');
const passport = require('passport');
const router = express.Router();
const {Users} = require('../modules/user.schema');
const joi = require('joi');

router.get('/', (req, res)=> {
    res.render('login');
})

router.post('/',passport.authenticate('Login-passport',{
    successRedirect:'/',
    failureRedirect: "/auth",
    failureFlash: false
}) ,async (req,res)=>{
    // const {error} = validate.validate(req.body);
    // if(error) res.send('error');

    // const token = user.generateToken();

    res.redirect('/');
});

const validate = joi.object({
    fullname: joi.string().min(4).required(),
    password: joi.string().min(8).max(2014).required()
});

module.exports = router;