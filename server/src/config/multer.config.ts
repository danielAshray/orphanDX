import { NextFunction, Request, Response } from "express";
import { BASE_UPLOAD_PATH, MAX_FILE_SIZE } from "../constants";
import multer from "multer";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/apiService";

const uploadDir = path.resolve(BASE_UPLOAD_PATH);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: Function) => {
    const fileName = file.originalname.split(".")[0];
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);

    cb(null, `${fileName}-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single("pdf")(req, res, (err: any) => {
    if (err) {
      return next(ApiError.internal("File upload failed", err.message));
    }
    next();
  });
};
