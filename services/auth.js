const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET;
const cookieParser = require("cookie-parser");
require('dotenv').config()

const generateToken=(email,hashPassword)=>{
    
    const token = jwt.sign({ email,hashPassword}, SECRET_KEY);
    return token;

}

const authenticateJWT = (req, res, next) => {
    const token = req.cookies;
    

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token is not valid',error:err }); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided, authorization denied' }); // Unauthorized
    }
};


module.exports = {
    generateToken,
    authenticateJWT
 
};