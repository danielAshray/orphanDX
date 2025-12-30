import { Request } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

type CbDestination = (error: Error | null, destination: string) => void;
type File = Express.Multer.File;

const uploadDir = path.join(__dirname, "../../../uploads/results");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req: Request, _file: File, cb: CbDestination) =>
    cb(null, uploadDir),
  filename: (_req: Request, file: File, cb: CbDestination) =>
    cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req: Request, file: File, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only Pdf are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
