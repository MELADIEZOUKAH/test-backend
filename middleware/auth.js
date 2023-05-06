const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-jwt');
    console.log(token);
    if(!token){
        return res.status(401).send('Invalid authentication');
    }
    try{
        const decodedToken = jwt.decode(token);
        req.user = decodedToken;
        next();
    }catch(err){
        res.send('access rejected');
    }
}