const router = require("express").Router();
const {userController} = require("../controller");
const {authMiddleware} = require("../middleware");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/:userId", authMiddleware, userController.getUser);

module.exports = router;