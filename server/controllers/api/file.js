import Users from "../../models/user.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket("filespace-bucket");

const handleUploadFile = async (req, res) => {
  const { id } = req.user;
  const { files: _files, size } = req;
  const { path } = req.body;

  try {
    const files = Array.isArray(_files) ? _files : [_files];

    const fileUploads = files.map(async (file) => {
      const fileName =
        path === ""
          ? `${id}/${file.originalname}`
          : `${id}/${path}/${file.originalname}`;

      const newFile = bucket.file(fileName);

      await newFile.save(file.buffer, {
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      await Users.updateOne({ _id: id }, { $inc: { usedStorage: size } });

      await newFile.setMetadata({
        metadata: {
          owner: id,
        },
      });

      return { fileName, size };
    });

    const fileUploadResults = await Promise.all(fileUploads);
    return res.status(200).send(fileUploadResults);
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleFetchFiles = async (req, res) => {
  const { id } = req.user;

  try {
    const [files] = await bucket.getFiles({
      prefix: `${id}/`,
    });

    const filesMetaData = await Promise.all(
      files.map(async (file) => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 15 * 60 * 1000,
        });

        console.log(file.metadata.size);

        return {
          name: file.metadata.name.replace(`${id}/`, ""),
          link: url,
          owner: file.metadata.metadata.owner,
          size: file.metadata.size,
          updated: file.metadata.updated,
          contentType: file.metadata.contentType,
          createdAt: file.metadata.timeCreated,
          type: file.metadata.contentType.split("/").pop(),
        };
      })
    );

    return res.status(200).send(filesMetaData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleCreateFolder = async (req, res) => {
  const { id } = req.user;
  const { folderName, path } = req.body;

  if (!folderName) {
    return res.status(400).send("No folder name provided.");
  }

  try {
    const folderPath =
      path === "" ? `${id}/${folderName}/` : `${id}/${path}/${folderName}/`;

    const newFolder = bucket.file(folderPath);

    await newFolder.save("", {
      metadata: {
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        metadata: {
          owner: id,
        },
      },
    });

    return res.status(200).send(`Folder created successfully: ${folderName}`);
  } catch (error) {
    console.error("Error creating folder:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleDeleteFile = async (req, res) => {
  const { id } = req.user;
  const { path } = req.body;

  if (!path) {
    return res.status(400).send("No file name provided.");
  }

  try {
    const file = bucket.file(`${id}/${path}`);

    const [metadata] = await file.getMetadata();
    const fileSize = parseInt(metadata.size, 10);

    await file.delete();
    await Users.updateOne({ _id: id }, { $inc: { usedStorage: -fileSize } });

    return res.status(200).send(`File deleted successfully: ${path}`);
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).send("File not found.");
    }

    console.error("Error deleting file:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleDeleteFolder = async (req, res) => {
  const { id } = req.user;
  const { path } = req.body;

  if (!path) {
    return res.status(400).send("No folder name provided.");
  }

  try {
    const [files] = await bucket.getFiles({
      prefix: `${id}/${path}/`,
    });

    const totalSize = files.reduce(
      (sum, file) => sum + parseInt(file.metadata.size, 10),
      0
    );

    await Promise.all(files.map(async (file) => await file.delete()));

    await Users.updateOne({ _id: id }, { $inc: { usedStorage: -totalSize } });

    return res.status(200).send(`Folder deleted successfully: ${path}`);
  } catch (error) {
    console.error("Error deleting folder:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  handleUploadFile,
  handleFetchFiles,
  handleCreateFolder,
  handleDeleteFile,
  handleDeleteFolder,
};
