import { useRef } from "react";
import {
  faFile,
  faFolder,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import CreateFolder from "./modals/CreateFolder";
import useModal from "./hooks/useModal";
import useAxios from "../hooks/useAxios";
import useTabs from "../hooks/useTabs";
import useFiles from "../hooks/useFiles";
import useToast from "./hooks/useToast";
import Separator from "./ui/Separator";

const Create = () => {
  const { currentTab } = useTabs();
  const { setModal, setOpen } = useModal();
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { toastInfo } = useToast();

  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const formData = new FormData();

    formData.append("path", currentTab.path);
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

  return (
    <div>
      <Dropdown
        tooltip="Create files"
        name="Upload or create"
        icon={faPlusSquare}
        className="w-fit"
      >
        <DropdownItem
          text="Folder"
          icon={faFolder}
          onClick={() => {
            setModal(<CreateFolder />);
            setOpen(true);
          }}
        />
        <DropdownItem
          text="File"
          icon={faFile}
          onClick={() => fileInputRef.current.click()}
        />
      </Dropdown>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Create;
