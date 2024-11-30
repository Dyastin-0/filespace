import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { displayCopy, preventDefault } from "../helpers/drop";
import Folder from "./Folder";
import File from "./File";
import useAxios from "../hooks/useAxios";
import useFiles from "../hooks/useFiles";
import useToast from "./hooks/useToast";
import Headers from "./Headers";
import useTabs from "../hooks/useTabs";
import { getFileIcon } from "../helpers/icon";

const Directory = ({ files }) => {
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { toastInfo } = useToast();
  const { addTab } = useTabs();

  const handleDrop = (e) => {
    preventDefault(e);
    const newFiles = Array.from(e.dataTransfer.files);

    if (newFiles.length > 25) {
      toastInfo("You can only upload up to 5 files at a time");
      return;
    }

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
      <Headers />
      {files?.content?.map((file) => {
        const icon = getFileIcon(file.name);
        const isFolder = file.type === "directory";
        return (
          <div
            key={file.path}
            className="flex items-center p-2 cursor-pointer hover:bg-secondary rounded text-xs"
            onClick={() => isFolder && addTab(file)}
          >
            <FontAwesomeIcon
              icon={isFolder ? faFolder : icon}
              className={`mr-2 w-[12px] ${
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
