const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token) res.status(401).json({msg: 'no token, not valid'})
    try{
        const decoded = jwt.verify(token, 'secretosupersecreto')
        req.user = decoded;
        next()
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Token not valid'})
    }
    
}

module.exports = auth;