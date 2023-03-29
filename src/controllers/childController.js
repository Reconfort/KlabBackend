import Child from "../models/childModel";

export const ApplyChild = async (req, res) => {
  const {
    parentname,
    fullname,
    email,
    gender,
    ageRange,
    dob,
    district,
    sector,
    cell,
    education,
    educationType,
    schoolFrom,
    yearStudy,
  } = req.body;

  try {
    const child = new Child({
      parentname,
      fullname,
      email,
      gender,
      ageRange,
      dob,
      district,
      sector,
      cell,
      education,
      educationType,
      schoolFrom,
      yearStudy,
    });
    await child.save();
    res
      .status(201)
      .json({ message: "Child created successfully", data: child });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// get children
export const getChildren = async (req, res) => {
  try {
    const child = await Child.find();
    res.status(200).json({ message: "All Child", data: child });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// get Child
export const getChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    res.status(200).json({ message: "Child found", data: child });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update child controller function
export const updateChild = async (req, res) => {
  try {
    const childId = req.params.id; // Get the child ID from the request parameter
    const {
      parentname,
      fullname,
      email,
      gender,
      ageRange,
      dob,
      district,
      sector,
      cell,
      education,
      educationType,
      schoolFrom,
      yearStudy,
    } = req.body; // Destructure the updated child data from the request body

    const updatedChild = await Child.findByIdAndUpdate(
      childId,
      {
        parentname,
        fullname,
        email,
        gender,
        ageRange,
        dob,
        district,
        sector,
        cell,
        education,
        educationType,
        schoolFrom,
        yearStudy,
      },
      { new: true } // Return the updated child instead of the old one
    );

    if (!updatedChild) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json(updatedChild);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete child controller function
export const deleteChild = async (req, res) => {
  try {
    const { attribute, value } = req.params; // Get the attribute and value to match from the request parameters

    // Find and delete the child with the given attribute and value
    const deletedChild = await Child.findOneAndDelete({ [attribute]: value });

    if (!deletedChild) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.status(200).json({ message: 'Child deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
