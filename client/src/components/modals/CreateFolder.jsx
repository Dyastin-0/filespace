import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import useAxios from "../../hooks/useAxios";
import useTabs from "../../hooks/useTabs";
import useFiles from "../../hooks/useFiles";
import useToast from "../hooks/useToast";
import NormalInput from "../ui/NormalInput";
import GenericModal from "./GenericModal";

const CreateFolder = () => {
  const { setOpen } = useModal();
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { currentTab } = useTabs();
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

    api
      .post("/files/folder", {
        folderName,
        path: currentTab.path,
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
        <Button type="submit" text="Create" className="w-fit" />
      </form>
    </GenericModal>
  );
};

export default CreateFolder;
