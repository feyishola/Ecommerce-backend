const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    console.log('token',token);
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            console.log('decoded',decoded);

        } catch (error) {
            return res.status(403).json({response:"invalid token"})
    
        }
        
                
    }else{
        return res.status(400).json({response:"token required for authentication"})
        
    }

    return next()
}

module.exports = verifyToken