const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('../modules/user.schema');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// passport-local-strategy
module.exports = passportConfig = passport =>{
    passport.use('Login-passport', new LocalStrategy({
        usernameField: "fullname", 
        passwordField: "password",
        passReqToCallback: true
    },  async(req, fullname, password, done)=>{
        const user = await Users.findOne({fullname: fullname})
        console.log('the value in user:')

        if(!user) {
            return done(null, false, {message: "User not found"});
        }
    const checkpassword = await bcrypt.compare(password,user.password);
        if( !checkpassword) {
            return done(null, false, {message: "Wrong password"});
        }
           
        return done(null, user);
    }));
    passport.serializeUser((user, done)=> done(null, user.id));
    passport.deserializeUser((id, done)=> done(null, Users.findById(id)));
};
