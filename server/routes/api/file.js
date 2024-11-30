import express from "express";

import {
  handleCreateFolder,
  handleDeleteFile,
  handleDeleteFolder,
  handleFetchFiles,
  handleUploadFile,
} from "../../controllers/api/file.js";

import upload from "../../middlewares/multer.js";
import checkStorageLimit from "../../middlewares/storage.js";
const router = express.Router();

router
  .route("/")
  .post(upload.array("files", 25), checkStorageLimit, handleUploadFile)
  .get(handleFetchFiles)
  .delete(handleDeleteFile);

router.route("/folder").post(handleCreateFolder).delete(handleDeleteFolder);

export default router;
