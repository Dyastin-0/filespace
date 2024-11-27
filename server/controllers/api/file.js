import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket("filespace-bucket");

const handleUploadFile = async (req, res) => {
  const { _id } = req.user;
  const files = req.files;

  if (!files || files.length === 0) {
    return res
      .status(400)
      .send("No file uploaded, there's no files to upload.");
  }

  try {
    const filesToUpload = Array.isArray(files) ? files : [files];

    const uploadPromises = filesToUpload.map(async (file) => {
      const fileName = `${_id}/${Date.now()}-${file.originalname}`;

      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        file.stream.pipe(stream).on("finish", resolve).on("error", reject);
      });

      await fileUpload.makePublic();

      return `File uploaded successfully: ${fileName}`;
    });

    const uploadResults = await Promise.all(uploadPromises);

    return res.status(200).send(uploadResults);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { handleUploadFile };
