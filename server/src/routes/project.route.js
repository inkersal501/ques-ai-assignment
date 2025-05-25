const router = require("express").Router();
const { projectController } = require("../controller"); 
 
router.post("/create", projectController.create);
router.get("/all", projectController.projects);

module.exports = router;