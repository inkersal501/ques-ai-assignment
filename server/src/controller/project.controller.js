const { projectService } = require("../services");

const create = async (req, res) => {
    const user = req.user;
    const {name} = req.body;
    try {
        const project = await projectService.create(user, name);
        if(project)
            res.status(201).send({message: "Project created successfully."});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
    
};

const projects = async (req, res) => {
    const user = req.user;
    try {
        const projects = await projectService.projects(user);
        if(projects)
            res.status(200).send({message: "Project fetched successfully.", projects});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports = { create, projects };