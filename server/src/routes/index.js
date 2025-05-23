const router = require('express').Router();
const userRoute = require("./user.route");
const projectRoute = require("./project.route");

router.use("/user", userRoute);
router.use("/project", projectRoute);

module.exports = router;