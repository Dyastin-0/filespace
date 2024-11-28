import {
  faFile,
  faFolder,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import CreateFolder from "./modals/CreateFolder";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import useModal from "./hooks/useModal";
import { useRef } from "react";
import useAxios from "../hooks/useAxios";

const SideContent = () => {
  const fileInputRef = useRef(null);
  const { setModal, setOpen } = useModal();
  const { api } = useAxios();

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    await api.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="min-w-fit h-full bg-primary rounded-md p-4">
      <Dropdown name="Upload or create" icon={faPlusSquare} className="w-fit">
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

export default SideContent;
