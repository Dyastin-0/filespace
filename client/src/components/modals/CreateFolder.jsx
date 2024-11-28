import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import useAxios from "../../hooks/useAxios";

const CreateFolder = () => {
  const { setOpen } = useModal();
  const { api } = useAxios();

  const handleCreate = (event) => {
    event.preventDefault();
    api.post("/files/folder", {
      folderName: event.target[0].value,
    });
  };

  return (
    <div
      className="flex flex-col w-[400px] max-w-full p-4 gap-2 rounded-md bg-primary
			text-xs text-primary-foreground"
    >
      <div className="flex justify-between items-end">
        <h2 className="font-semibold">Create a folder</h2>
        <Button icon={faX} onClick={() => setOpen(false)} />
      </div>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Folder name"
          className="w-full p-2 rounded-md bg-secondary placeholder:text-secondary-foreground
					outline-none transition-all duration-300
					hover:shadow-[var(--accent-secondary)_0_0_0_2px] focus:shadow-[var(--accent-secondary)_0_0_0_2px]
					active:shadow-[var(--highlight)_0_0_0_2px]"
        />
      </form>
    </div>
  );
};

export default CreateFolder;
