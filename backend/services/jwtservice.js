const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

class JWTService {
    static signAccessToken(payload,expiryTime){
        return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn: expiryTime});
    }

    static verifyAccessToken(token){
        console.log(ACCESS_TOKEN_SECRET);
        return jwt.verify(token,ACCESS_TOKEN_SECRET);
    }
}

module.exports = JWTService;