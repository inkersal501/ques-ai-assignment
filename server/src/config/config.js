const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port : process.env.PORT,
    dbURI : process.env.DB_URI,
    jwtSecret : process.env.JWT_SECRET,
    jwtexpire : process.env.JWT_ACCESS_EXPIRATION,
};