const passportJWT = require('passport-jwt');
const { Strategy : JwtStrategy, ExtractJwt} = passportJWT; 
const { jwtSecret } = require("./config"); 
const User = require("../models/user.model");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

const jwtVerify = async (jwt_payload, done) => { 
    try {
        const user = await User.findById(jwt_payload.id);
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false); 
        }
    } catch (error) {
        return done(error, false);
    } 
}


const jwtstrategy = new JwtStrategy(opts, jwtVerify);

module.exports = jwtstrategy;