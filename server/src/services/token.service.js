var jwt = require('jsonwebtoken'); 
const { jwtSecret, jwtexpire } = require("../config/config"); 

const generateToken = (userId) => {
    const token = jwt.sign({id: userId}, jwtSecret, {expiresIn: `${jwtexpire}d`});
    return token;
};

module.exports = generateToken;