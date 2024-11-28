import express from "express";

import {
  handleCreateFolder,
  handleFetchFiles,
  handleUploadFile,
} from "../../controllers/api/file.js";

import upload from "../../middlewares/multer.js";
const router = express.Router();

router
  .route("/")
  .post(upload.array("files", 5), handleUploadFile)
  .get(handleFetchFiles);

router.route("/folder").post(handleCreateFolder);

export default router;
