const { transcriptService } = require("../services");

const create = async (req, res) => {
    const user = req.user;
    const {project, name, transcript} = req.body;
    try {
        await transcriptService.create(user, project, name, transcript);
        res.status(201).send({message: "Transcript created successfully."});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const transcript = async (req, res) => { 
    const {transcript} = req.params;
    try {
        const transcriptData = await transcriptService.transcript(transcript);
        if(transcriptData)
            res.status(200).send({message: "Transcript fetched successfully.", transcriptData});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};
const upadteTranscriptText = async (req, res) => {
    const {transcriptId, text} = req.body;
    try {
        await transcriptService.upadteTranscriptText(transcriptId, text); 
        res.status(200).send({message: "Transcript updated successfully."});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const deleteTranscript = async (req, res) => { 
    const {transcript} = req.params;
    try {
        await transcriptService.deleteTranscript(transcript); 
        res.status(200).send({message: "Transcript deleted successfully."});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const transcripts = async (req, res) => {
    const user = req.user;
    const {project} = req.params;
    try {
        const transcripts = await transcriptService.transcripts(user, project);
        if(transcripts)
            res.status(200).send({message: "Transcripts fetched successfully.", transcripts});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports = {create, upadteTranscriptText, deleteTranscript, transcripts, transcript}