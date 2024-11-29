import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { displayCopy, preventDefault } from "../helpers/drop";
import Folder from "./Folder";
import File from "./File";
import useAxios from "../hooks/useAxios";
import useFiles from "../hooks/useFiles";
import useToast from "./hooks/useToast";

const Directory = ({ files, handleFolderClick }) => {
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { toastInfo } = useToast();

  const handleDrop = (e) => {
    preventDefault(e);
    const newFiles = Array.from(e.dataTransfer.files);

    const formData = new FormData();
    formData.append("path", files.path);
    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    toastInfo("Uploading...");

    api
      .post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        mutate();
        toastInfo("Uploaded successfully");
      });
  };

  return (
    <div
      className="flex flex-col w-full h-full border-secondary rounded p-4"
      onDragOver={displayCopy}
      onDragLeave={preventDefault}
      onDrop={handleDrop}
    >
      {files?.content?.map((file) => {
        const isFolder = file.type === "directory";
        return (
          <div
            key={file.path}
            className="flex items-center p-2 cursor-pointer hover:bg-secondary rounded text-xs"
            onClick={() => isFolder && handleFolderClick(file)}
          >
            <FontAwesomeIcon
              icon={isFolder ? faFolder : faFile}
              className={`mr-2 ${
                isFolder ? "text-primary-highlight" : "text-primary-foreground"
              }`}
            />
            {isFolder ? <Folder file={file} /> : <File file={file} />}
          </div>
        );
      })}
    </div>
  );
};

export default Directory;
