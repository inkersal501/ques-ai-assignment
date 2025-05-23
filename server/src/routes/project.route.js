const router = require("express").Router();
const { projectController } = require("../controller");
const { authMiddleware } = require("../middleware");
 
router.post("/create", authMiddleware, projectController.create);
router.get("/all", authMiddleware, projectController.projects);

module.exports = router;