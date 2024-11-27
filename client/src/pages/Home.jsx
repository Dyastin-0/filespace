import { useRef } from "react";
import {
  faFile,
  faFolder,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem } from "../components/ui/Dropdown";
import useAxios from "../hooks/useAxios";
import useSWR from "swr";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { api, isAxiosReady } = useAxios();
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const { data: files } = useSWR(
    isAxiosReady && user ? `${user._id}/files` : null,
    async () => {
      const response = await api.get("/files");
      return response.data;
    },
    {
      onSuccess: (data) => console.log("Files fetched successfully:", data),
    }
  );

  return (
    <div className="flex w-full h-full gap-4 p-4">
      <div className="w-[200px] h-full bg-primary rounded-md p-4">
        <Dropdown name="Upload" icon={faPlusSquare} className="w-fit">
          <DropdownItem
            text="Folder"
            icon={faFolder}
            onClick={handleSelectFile}
          />
          <DropdownItem text="File" icon={faFile} onClick={handleSelectFile} />
        </Dropdown>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex flex-col w-full h-full bg-primary p-4 gap-2 rounded-md text-xs">
        <h1 className="font-semibold">Files</h1>
        <div className="flex flex-col gap-2">
          {files ? (
            files.map((file) => (
              <div key={file.name} className="flex justify-between gap-2">
                <a href={file.url} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
                <span>{file.type}</span>
                <span>{(file.size / 1024).toFixed(2)} kb</span>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
