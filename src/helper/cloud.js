import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDNAME ,
    api_key: process.env.APIKEY,
    api_secret: process.env.APIKEY_SECRET,
});
export const uploadToCloud = async (file, res) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: "profile",
      use_filename: true,
    });
    return profilePicture;
  } catch (error) {
    return res.status(500).send(error);
  }
};