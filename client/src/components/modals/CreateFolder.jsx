import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import useAxios from "../../hooks/useAxios";
import useTabs from "../../hooks/useTabs";
import useFiles from "../../hooks/useFiles";
import useToast from "../hooks/useToast";

const CreateFolder = () => {
  const { setOpen } = useModal();
  const { api } = useAxios();
  const { mutate } = useFiles();
  const { currentTab } = useTabs();
  const { toastInfo } = useToast();

  const handleCreate = (event) => {
    event.preventDefault();

    const folderName = event.target[0].value;

    if (!folderName) {
      toastInfo("Folder name cannot be empty.");
      return;
    }

    toastInfo("Creating folder...");

    api
      .post("/files/folder", {
        folderName,
        path: currentTab.path,
      })
      .then(() => {
        mutate();
        toastInfo("Folder created.");
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
        <input
          type="text"
          placeholder="Folder name"
          className="w-full p-2 rounded-md bg-secondary placeholder:text-secondary-foreground
					outline-none transition-all duration-300
					hover:shadow-[var(--accent-secondary)_0_0_0_2px] focus:shadow-[var(--accent-secondary)_0_0_0_2px]
					active:shadow-[var(--highlight)_0_0_0_2px]"
        />
        <Button type="submit" text="Create" className="w-fit" />
      </form>
    </div>
  );
};

export default CreateFolder;
