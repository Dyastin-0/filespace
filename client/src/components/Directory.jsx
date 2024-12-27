import { useRef } from "react";
import { displayCopy, preventDefault } from "../helpers/drop";
import Folder from "./Folder";
import File from "./File";
import useAxios from "../hooks/useAxios";
import useFiles from "../hooks/useFiles";
import useToast from "./hooks/useToast";
import Headers from "./Headers";
import useDir from "../hooks/useDir";
import useContextMenu from "./hooks/useContextMenu";
import { faFileUpload, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import useModal from "./hooks/useModal";
import CreateFolder from "./modals/CreateFolder";

const Directory = () => {
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { toastInfo } = useToast();
  const { currentDir: files } = useDir();
  const { setModal, setOpen } = useModal();

  const fileInputRef = useRef(null);

  const menuOptions = [
    {
      label: "New Folder",
      icon: faFolderPlus,
      onClick: () => {
        setModal(<CreateFolder />);
        setOpen(true);
      },
    },
    {
      label: "Upload Files",
      icon: faFileUpload,
      onClick: () => fileInputRef.current.click(),
    },
  ];

  const { onContextMenu, ContextMenu } = useContextMenu(menuOptions);

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const formData = new FormData();

    formData.append("path", files.path);
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    toastInfo("Uploading...");

    await api
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

    const message = newFiles.length > 1 ? "files" : "file";

    toastInfo(`Uploading ${newFiles.length} ${message}...`);

    api
      .post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        mutate();
        toastInfo(`Uploaded ${newFiles.length} ${message}`);
      });
  };

  return (
    <div
      className="flex flex-col w-full h-full bg-secondary gap-2 p-4 rounded-md"
      onDragOver={displayCopy}
      onDragLeave={preventDefault}
      onDrop={handleDrop}
      onContextMenu={onContextMenu}
    >
      <Headers />
      {files?.children?.map((file) => {
        const isFolder = file.type === "directory";
        return isFolder ? (
          <Folder key={file.path} file={file} />
        ) : (
          <File key={file.path} file={file} />
        );
      })}
      <ContextMenu />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Directory;
