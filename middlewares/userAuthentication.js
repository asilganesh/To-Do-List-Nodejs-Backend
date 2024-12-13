require('dotenv').config();
const jwt = require('jsonwebtoken'); 

const verifyToken = (req, res, next) => {
    const authorization = req.headers['authorization']; 
    const token = authorization && authorization.split(" ")[1]; 
console.log(authorization)
    if (!token) {
        return res.status(401).json({ message: "Token not found, Please login" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" }); 
        }
        req.user = data; 
        next();
    });
};

module.exports = verifyToken;
