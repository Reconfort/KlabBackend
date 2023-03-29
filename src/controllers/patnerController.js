import Partner from '../models/partnersModel';
import { uploadToCloud } from '../helper/cloud';

// CREATE - POST
export const createPartner = async (req, res) => {
  try {
    const result = await uploadToCloud(req.file, res);

    const partner = new Partner({
      name: req.body.name,
      profile: result.secure_url,
      link: req.body.link,
      details: req.body.details,
    });
    await partner.save();
    return res.status(201).json({
      message: "Partner created successfully!",
      partner
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to create partner." });
  }
};

// READ - GET ALL
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    return res.status(200).json(partners);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to retrieve partners." });
  }
};

// READ - GET ONE
export const getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findById(id);
    if (!partner) throw Error("Partner not found.");
    return res.status(200).json(partner);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Partner not found." });
  }
};

// UPDATE - PUT
// export const updatePartnerById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await uploadToCloud(req.file, res);
//     const partner = await Partner.findByIdAndUpdate(id, {
//       name: req.body.name,
//       profile: result.secure_url,
//       link: req.body.link,
//       details: req.body.details
//     }, { new: true });
//     return  res.status(200).json(partner);
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({ error: "Partner not found." });
//   }
// };

export const updatePartnerById = async (req, res, next) => {
  try {
      const { id } = req.params;
      // const result = await uploadToCloud(req.file, res);
      const partner = await Partner.findByIdAndUpdate(id, {
          name: req.body.name,
          // profile: result.secure_url,
          link: req.body.link,
          details: req.body.details
      }, { new: true });
     return  res.status(200).json(partner);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// DELETE - DELETE
export const deletePartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    await Partner.findByIdAndRemove(id);
    return res.status(200).json({
      message: "Partner deleted successfully!",
      id
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Partner not found." });
  }
};
