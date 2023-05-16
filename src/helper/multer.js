import multer  from "multer";
import path from "path"


const fileUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".pdf",
      ".svg",
      ".zip",
      ".rar",
      ".gif",
      ".tif",
      ".webp",
      ".bmp",
      ".tiff",
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Invalid file type"));
    }
    req.fileFormat = ext === ".pdf" ? "application/pdf" : file.mimetype;
    cb(null, true);
  },
});


export  default fileUpload;