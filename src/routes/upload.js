import { Router } from "express";
import { removeImages, uploadImages } from "../controllers/images.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig.js";
import multer from "multer";

const routerImages = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nodejs-project",
    format: "jpg",
  },
});

const upload = multer({ storage: storage });

routerImages.post("/upload", upload.array("images", 10), uploadImages);
routerImages.delete("/remove/:publicId", removeImages);

export default routerImages;
