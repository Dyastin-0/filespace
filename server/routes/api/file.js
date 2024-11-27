import express from "express";

import { handleUploadFile } from "../../controllers/api/file.js";

import upload from "../../middlewares/multer.js";
const router = express.Router();

router.route("/").post(upload.array("files", 5), handleUploadFile);

export default router;
