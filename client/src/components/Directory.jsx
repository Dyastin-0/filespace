import { displayCopy, preventDefault } from "../helpers/drop";
import Folder from "./Folder";
import File from "./File";
import useAxios from "../hooks/useAxios";
import useFiles from "../hooks/useFiles";
import useToast from "./hooks/useToast";
import Headers from "./Headers";
import React from "react";
import useTabs from "../hooks/useTabs";

const Directory = () => {
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { toastInfo } = useToast();
  const { currentTab: files } = useTabs();

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
    >
      <Headers />
      {files?.content?.map((file) => {
        const isFolder = file.type === "directory";
        return isFolder ? (
          <Folder key={file.path} file={file} />
        ) : (
          <File key={file.path} file={file} />
        );
      })}
    </div>
  );
};

export default Directory;
