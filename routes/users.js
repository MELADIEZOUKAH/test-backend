const express = require('express');
const router = express.Router();
const {Users, userValidate} = require('../modules/user.schema');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// router.get('/', (req, res)=> res.render('signup'))

router.post('/', async (req,res)=>{
    const {error} = userValidate.validate(req.body);
    if(error) res.status(404).send(error.message );
    
    let user = await Users.findOne({fullname: req.body.fullname});
    if(user) res.status(404).send('it is used');

    res.cookie('fullname', req.body.fullname);
    const soultRound = 10;
    const soult = await bcrypt.genSalt(soultRound);
    req.body.password = await bcrypt.hash(req.body.password,soultRound);
    user = await Users.create(_.pick(req.body, ['fullname','email','password']));
    const token = user.generateToken();
    
    // res.header('x-user-jwt',token).send(_.pick(user, ['fullname','email','_id']));
    res.cookie('password', req.body.password).header('x-user-jwt',token).redirect('/auth');
});

module.exports = router;