const router = require('express').Router();
const userRoute = require("./user.route");
const projectRoute = require("./project.route");
const transcriptRoute = require("./transcript.route");
const { authMiddleware } = require('../middleware');

router.use("/user", userRoute);
router.use(authMiddleware);
router.use("/project", projectRoute);
router.use("/transcript", transcriptRoute);

module.exports = router;