const router = require("express").Router(); 
const { transcriptController } = require("../controller");

router.post("/create", transcriptController.create);
router.get("/:project", transcriptController.transcripts);
router.get("/:transcript", transcriptController.transcript);
router.patch("/", transcriptController.upadteTranscriptText);
router.delete("/:transcript", transcriptController.deleteTranscript);

module.exports = router;