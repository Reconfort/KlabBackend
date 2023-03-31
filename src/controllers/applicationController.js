import Application from "../models/applicationModel";
import { uploadToCloud } from "../helper/cloud";

// create a new application
export const createApplication = async (req, res) => {
  console.log(req.body);
  try {
    const result = await uploadToCloud(req.file, res);

    const application = new Application({
      email: req.body.email,
      fullname: req.body.fullname,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      agerange: req.body.agerange,
      country: req.body.country,
      province: req.body.province,
      district: req.body.district,
      areyougraduate: req.body.areyougraduate,
      educationlevel: req.body.educationlevel,
      fieldofstudy: req.body.fieldofstudy,
      categoryfitin: req.body.categoryfitin,
      schoolfrom: req.body.schoolfrom,
      yearstudy: req.body.yearstudy,
      areyoudev: req.body.areyoudev,
      skillyouwantjoin: req.body.skillyouwantjoin,
      skilldesc: req.body.skilldesc,
      gitlink: req.body.gitlink,
      linkedinlink: req.body.linkedinlink,
      profile: result.secure_url,
      devcvlink: req.body.devcvlink,
      entInnovationdesc: req.body.entInnovationdesc,
      shareInnovationModel: req.body.shareInnovationModel,
      entcvlink: req.body.entcvlink,
    });
    await application.save();
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get a single application by id
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update an existing application by id
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// delete an existing application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
