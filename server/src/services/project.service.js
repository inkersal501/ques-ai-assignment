const { projectModel, transcriptModel } = require("../models");
const { transcripts } = require("./transcript.service");

const create = async (user, name) => {
    if(name === "") 
        throw new Error("Project Name can't be empty."); 

    try {
        await projectModel.create({user: user._id, name});  
        return true;
    } catch (error) {
        throw new Error("Error creating project."); 
    }
};

const projects = async (user) => {
    try {
        const projectList = await projectModel.find({user: user._id}).lean();
    
        const projectTranscripts = await Promise.all(projectList.map( async (project) => {
            const transcriptsList = await transcripts(user, project._id);
            return {...project, transcripts: transcriptsList.length};
        })); 
        return projectTranscripts;
      
    } catch (error) {
        throw new Error("Error fetching projects."); 
    }
};

module.exports = { create, projects };