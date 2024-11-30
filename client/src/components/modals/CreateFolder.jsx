import { useEffect, useRef } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import useAxios from "../../hooks/useAxios";
import useTabs from "../../hooks/useTabs";
import useFiles from "../../hooks/useFiles";
import useToast from "../hooks/useToast";
import NormalInput from "../ui/NormalInput";

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
    <div
      className="flex flex-col w-[400px] max-w-full p-4 gap-4 rounded-md bg-primary
			text-xs text-primary-foreground"
    >
      <div className="flex justify-between items-end">
        <h2 className="font-semibold text-sm">Create a folder</h2>
        <Button icon={faX} onClick={() => setOpen(false)} variant="ghost" />
      </div>
      <form onSubmit={handleCreate} className="flex flex-col items-end gap-4">
        <NormalInput ref={inputRef} placeholder="Folder name" />
        <Button type="submit" text="Create" className="w-fit" />
      </form>
    </div>
  );
};

export default CreateFolder;
