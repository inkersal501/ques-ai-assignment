const { projectModel } = require("../models");

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
        if(projectList.length > 0)  
            return projectList;
        else
            throw new Error("No project found."); 
    } catch (error) {
        throw new Error("Error fetching projects."); 
    }
};

module.exports = { create, projects };