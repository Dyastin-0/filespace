import express from "express";

import {
  handleCreateFolder,
  handleDeleteFile,
  handleDeleteFolder,
  handleFetchFiles,
  handleUploadFile,
} from "../../controllers/api/file.js";

import upload from "../../middlewares/multer.js";
const router = express.Router();

router
  .route("/")
  .post(upload.array("files", 5), handleUploadFile)
  .get(handleFetchFiles)
  .delete(handleDeleteFile);

router.route("/folder").post(handleCreateFolder).delete(handleDeleteFolder);

export default router;
