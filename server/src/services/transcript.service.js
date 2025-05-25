const {transcriptModel, projectModel} = require("../models");

const create = async (user, project, name, transcript) => {     
    try {
        await transcriptModel.create({project, name, transcript, user});
        const projectData = await projectModel.findById(project);
        projectData.lastUpdated = new Date();
        await projectData.save();
        return true;
    } catch (error) { 
        throw new Error("Error creating Transcript.");
    }
};

const transcript = async (transcript) => {
    try {
        const transcriptData = await transcriptModel.findById(transcript).lean();
        return transcriptData; 
    } catch (error) {
        throw new Error("Error fetching transcript."); 
    }
};
const upadteTranscriptText = async (transcriptId, text) => { 
    try {
        const transcriptData = await transcriptModel.findById(transcriptId);
        transcriptData.transcript = text;
        await transcriptData.save();

        const project = await projectModel.findById(transcriptData.project);
        project.lastUpdated = new Date();
        await project.save();      
        return true; 
    } catch (error) { 
        throw new Error("Error deleting transcript."); 
    }
};

const deleteTranscript = async (transcript) => { 
    try {
        const transcriptData = await transcriptModel.findById(transcript).lean();
        const project = await projectModel.findById(transcriptData.project);
        project.lastUpdated = new Date();
        await project.save();
        await transcriptModel.deleteOne({_id: transcript});         
        return true; 
    } catch (error) { 
        throw new Error("Error deleting transcript."); 
    }
};

const transcripts = async (user, project) => {
    try {
        const transcriptList = await transcriptModel.find({user: user._id, project}).lean();
        return transcriptList; 
    } catch (error) {
        throw new Error("Error fetching transcripts."); 
    }
};

module.exports = {create, upadteTranscriptText, deleteTranscript, transcripts, transcript};