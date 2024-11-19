const ProjectModel = require('../Models/ProjectModel');

const CreateProject = async (req, res) => {
    try {
        const addProject = await ProjectModel.create(req.body);
        if (addProject) { return res.json({ message: "Project has been created successfully" }); }
        else { return res.json({ message: "An error occured saving the project " }); }
    } catch (error) {
        return res.json({message:"server error", error});
    }
} 

