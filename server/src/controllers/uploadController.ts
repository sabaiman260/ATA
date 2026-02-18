import { Request, Response } from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file && !req.body.image) {
      return res.status(400).json({ message: "No image provided" });
    }

    // If using multipart form (multer), file buffer is in req.file.buffer
    if (req.file && req.file.path) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: "inventory_products" });
      return res.json({ url: result.secure_url });
    }

    // If sending base64 in body
    if (req.body.image) {
      const base64 = req.body.image;
      const result = await cloudinary.v2.uploader.upload(base64, { folder: "inventory_products" });
      return res.json({ url: result.secure_url });
    }

    return res.status(400).json({ message: "Invalid image payload" });
  } catch (error) {
    console.error("uploadImage error:", error);
    return res.status(500).json({ message: "Image upload failed" });
  }
};
