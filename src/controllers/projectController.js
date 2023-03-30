import Project from "../models/ProjectModel";
import { uploadToCloud } from "../helper/cloud";

// Create project controller function
export const createProject = async (req, res) => {
  try {
    const result = await uploadToCloud(req.file, res);

    const project = new Project({
      companyName: req.body.companyName,
      email: req.body.email,
      ProjectName: req.body.ProjectName,
      phone: req.body.phone,
      category: req.body.category,
      desc: req.body.desc,
      profile: result.secure_url,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// get all projects
export const getProjects = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json({ message: "All Projects", data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// get single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project found", data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// update project 
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await uploadToCloud(req.file, res);
    const project = await Project.findByIdAndUpdate(
      id,
      {
        companyName: req.body.companyName,
        email: req.body.email,
        ProjectName: req.body.ProjectName,
        phone: req.body.phone,
        category: req.body.category,
        desc: req.body.desc,
        profile: result.secure_url,
      },
      { new: true }
    );
    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
