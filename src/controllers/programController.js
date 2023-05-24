import Programs from "../models/programModel";
import { uploadToCloud } from "../helper/cloud";

// create program
export const createProgram = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "file program",
      });
    }
    const result = await uploadToCloud(req.file, res);

    // console.log(req.body);
    // console.log(req.file);
    const program = new Programs({
      title: req.body.title,
      profile: result.secure_url,
      cohort: req.body.cohort,
      tags: req.body.tags,
      details: req.body.details,
      location: req.body.location,
      // category: req.body.category,
      deadline: req.body.deadline,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    next(error);
  }
};

// get all programs
export const getPrograms = async (req, res, next) => {
  try {
    const programs = await Programs.find();
    res.status(200).json(programs);
  } catch (error) {
    return res.status(500).json({
      status: "404 Not Found",
      error: error.message,
    });
  }
};

// get program by id

export const getProgramById = async (req, res) => {
  try {
    const program = await Programs.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ msg: "Programs not found" });
    }
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// update program
export const updateProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    let newData;
    const programData = await Programs.findByIdAndUpdate(id, newData);
    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      newData = {
        ...req.body,
        profile: result.secure_url,
      };
    } else {
      newData = { ...req.body, profile: programData.profile };
    }

    const program = await Programs.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return res.status(200).json(program);
  } catch (error) {
    next(error);
  }
};

// delete programs
export const deleteProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Programs.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      message: "Program deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
