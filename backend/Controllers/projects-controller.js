const axios = require('axios');
const ProjectModel = require('../models/ProjectModel');


// Global variables to use 
var activeStatus = "Active";
var inactiveStatus = "In-Active";

// Function to upload image to ImgBB
const uploadImageToImgBB = async (imagePath) => {
    try {
        const formData = new FormData();
        formData.append('image', imagePath);

        const response = await axios.post(
            'https://api.imgbb.com/1/upload?key=adce5d9026cd006ed040c469a3200ae6',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        return response.data.data.url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
};

// Create project API
const CreateProject = async (req, res) => {
    try {
        let coverUrl = req.body.cover ? await uploadImageToImgBB(req.body.cover) : null;
        let screenshotUrl = req.body.screenshot ? await uploadImageToImgBB(req.body.screenshot) : null;

        const newProject = await ProjectModel.create({
            ...req.body,
            cover: coverUrl, // Store the ImgBB URL
            screenshot: screenshotUrl, // Store the ImgBB URL
        });
        return res.json({ message: "Project created successfully", projectData: newProject });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Get all projects API
const GetAllProjects = async (req, res) => {
    try {
        const allProjects = await ProjectModel.find();
        if (!allProjects) {
            return res.json({ message: "No projects found" });
        }
        return res.json({ message: "Here are all the projects", projectData: allProjects });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Update specific project API
const updateSpecificProject = async (req, res) => {
    try {
        let coverUrl = req.body.cover ? await uploadImageToImgBB(req.body.cover) : req.body.cover;
        let screenshotUrl = req.body.screenshot ? await uploadImageToImgBB(req.body.screenshot) : req.body.screenshot;

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, cover: coverUrl, screenshot: screenshotUrl },
            { new: true }
        );

        return res.json({ message: "Project updated successfully", projectData: updatedProject });
    } catch (error) {
        return res.status(500).json({ message: "Update failed", error });
    }
};

// Activate Projects API
const activateSingleProject = async (req, res) => {
    try {
        var specificProjectId = req.params.id;
        var specificProject = await ProjectModel.findOne(specificProjectId);

        if (specificProject.status === activeStatus) { return res.json({ message: "This project is already active" }); }
        var statusActivation = await ProjectModel.findByIdAndUpdate(specificProjectId, { status: activeStatus }, { new: true });
        if (statusActivation) { return res.json({ message: "This project has been activated", data: statusActivation }) };

    } catch (error) {
        return res.json({ message: "Server error", error })
    }

}


// Deactivate project API
const deactivateSingleProject = async (req, res) => {
    try {
        var specificProjectId = req.params.id;
        var specificProject = await ProjectModel.findOne(specificProjectId);

        if (specificProject.status === inactiveStatus) { return res.json({ message: "This project is already In-Active" }); }
        var statusDeactivation = await ProjectModel.findByIdAndUpdate(specificProjectId, { status: inactiveStatus }, { new: true });
        if (statusDeactivation) { return res.json({ message: "This project has been deactivated", data: statusActivation }) };

    } catch (error) {
        return res.json({ message: "Server error", error })
    }

}

// get all active projects API
const getActiveProjects = async (req, res) => {
    try {
        var projects = await ProjectModel.find({ status: activeStatus });
        if (!projects) { return res.json({ message: "No active projects found" }); }
        return res.json({ message: "Here are the active projects", projects: projects });
    } catch (error) {
        return res.json({ mesage: "Server error", error })
    }
}


// get all inactive projects 
const getInactiveProjects = async (req, res) => {
    try {
        var inaActiveProjects = await ProjectModel.find({ status: inactiveStatus });
        if (!inaActiveProjects) { return res.json({ message: "No inactive projects found", projects: inaActiveProjects }) }
        return res.json({ message: "No inactive projects found", projects: inaActiveProjects });

    } catch (error) {
        return res.json({ message: "Server error", error })
    }
}

// Delete projects API
const deleteProject = async (req, res) => {
    try {
        var projectId = req.params.id;
        var removeProject = await ProjectModel.findByIdAndDelete(projectId);
        if (!removeProject) { return res.json({ message: "Some error occured" }); }
        return res.json({ message: "Project has been deleted" });

    } catch (error) {
        return res.json({ message: "Server error", error });
    }
}



module.exports = { CreateProject, GetAllProjects, updateSpecificProject, activateSingleProject, deactivateSingleProject, getActiveProjects, getInactiveProjects, deleteProject };
