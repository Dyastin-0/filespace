import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import useAxios from "../../hooks/useAxios";
import useDir from "../../hooks/useDir";
import useFiles from "../../hooks/useFiles";
import useToast from "../hooks/useToast";
import NormalInput from "../ui/NormalInput";
import GenericModal from "./GenericModal";
import Tooltip from "../ui/Tooltip";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const CreateFolder = () => {
  const { setOpen } = useModal();
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { currentDir } = useDir();
  const { toastInfo } = useToast();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCreate = (event) => {
    event.preventDefault();

    const folderName = event.target[0].value;

    if (!folderName) {
      toastInfo("Folder name cannot be empty.");
      return;
    }

    toastInfo(`Creating ${folderName}...`);

    const formData = new FormData();

    formData.append("folder", folderName);
    formData.append("path", currentDir?.path || "");

    api
      .post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        mutate();
        toastInfo(`Folder ${folderName} created`);
        setOpen(false);
      });
  };

  return (
    <GenericModal title="Create folder">
      <form onSubmit={handleCreate} className="flex flex-col items-end gap-4">
        <NormalInput ref={inputRef} placeholder="Folder name" />
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            type="button"
            text="Cancel"
            variant="ghost"
            className="w-full"
            onClick={() => setOpen(false)}
          />
          <Tooltip text="Create folder">
            <Button
              type="submit"
              text="Create"
              icon={faFolder}
              className="w-full"
            />
          </Tooltip>
        </div>
      </form>
    </GenericModal>
  );
};

export default CreateFolder;
