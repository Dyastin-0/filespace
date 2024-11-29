import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket("filespace-bucket");

const handleUploadFile = async (req, res) => {
  const { id } = req.user;
  const { files: _files } = req;
  const { path } = req.body;

  if (!_files || _files.length === 0)
    return res.status(400).send("No file/s to upload.");

  try {
    const files = Array.isArray(_files) ? _files : [_files];

    const fileUploads = files.map(async (file) => {
      const fileName = `${id}/${path}/${file.originalname}`;

      const newFile = bucket.file(fileName);

      await newFile.save(file.buffer, {
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      await newFile.setMetadata({
        metadata: {
          owner: id,
        },
      });

      return newFile;
    });

    const fileUploadResults = await Promise.all(fileUploads);

    return res.status(200).send(fileUploadResults);
  } catch (error) {
    console.error(error);
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

        return {
          name: file.metadata.name.replace(`${id}/`, ""),
          link: url,
          owner: file.metadata.owner,
          size: file.metadata.size,
          updated: file.metadata.updated,
          contentType: file.metadata.contentType,
          createdAt: file.metadata.timeCreated,
          type: file.metadata.contentType.split("/").pop(),
          metadata: file.metadata.metadata,
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
    const folderPath = `${id}/${path}/${folderName}/`;

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

export { handleUploadFile, handleFetchFiles, handleCreateFolder };
