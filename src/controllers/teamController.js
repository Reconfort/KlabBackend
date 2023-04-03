import Team from "../models/TeamModel";
import { uploadToCloud } from "../helper/cloud";

// create new Team 
export const createTeam = async (req, res) => {
    try {
        console.log(req.file)
        const result = await uploadToCloud(req.file, res);
        
        const team = new Team({
            title: req.body.title,
            profile: result.secure_url,
            details: req.body.details,
            facebookLink: req.body.facebookLink,
            twitterLink: req.body.twitterLink,
            linkedinLink: req.body.linkedinLink,
            instagramLink: req.body.instagramLink,
            createdAt: Date.now()
        })

        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single team by ID
export const getSingleTeam = async (req, res) => {
  const id = req.params.id;

  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: `Team with id ${id} not found.` });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update team by ID
export const updateTeam = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const team = await Team.findByIdAndUpdate(id, updates, { new: true });
    if (!team) {
      return res.status(404).json({ message: `Team with id ${id} not found.` });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete team by ID
export const deleteTeam = async (req, res) => {
  const id = req.params.id;

  try {
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: `Team with id ${id} not found.` });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
