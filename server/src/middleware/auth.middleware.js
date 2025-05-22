const passport = require("passport");

const auth = (req, res, next) => {
    
    passport.authenticate("jwt", { session: false }, (err, user, info) => { 
    if (err || !user) {
      return res.status(401).send({ msg: "Unauthorized. Please login to continue." });
    }
    
    req.user = user; 
    next(); 
  })(req, res, next);

}

module.exports = auth;