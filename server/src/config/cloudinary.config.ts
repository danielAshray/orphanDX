import { v2 as cloudinary } from "cloudinary";
import AppConfig from "./app.config";
cloudinary.config({
  cloud_name: AppConfig.CLOUDINARY_CLOUD_NAME,
  api_key: AppConfig.CLOUDINARY_API_KEY,
  api_secret: AppConfig.CLOUDINARY_API_SECRET,
});
const uploadToCLoudinary = async (filePath: string) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(filePath, {
    folder: "pdfs",
  });
  return { secure_url, public_id };
};

export const deleteFileFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
};

export default uploadToCLoudinary;
