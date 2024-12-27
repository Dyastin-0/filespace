import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../hooks/useAxios";
import useFiles from "../../hooks/useFiles";
import useDir from "../../hooks/useDir";
import useConfirm from "../hooks/useConfirm";
import useToast from "../hooks/useToast";
import FolderExplorer from "../FolderExplorer";
import Button from "../ui/Button";
import GenericModal from "./GenericModal";
import Tooltip from "../ui/Tooltip";
import useModal from "../hooks/useModal";

const MoveFile = ({ SelectedFile }) => {
  const { mutate } = useFiles();
  const { setOpen } = useModal();
  const confirm = useConfirm();
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { currentDir } = useDir();

  const handleMove = () => {
    if (SelectedFile.path === currentDir.path)
      return toastInfo("File is already in this folder.");

    confirm({
      title: SelectedFile.type === "directory" ? "Move Folder" : "Move File",
      message: `Are you sure you want to move ${SelectedFile.name} to ${currentDir.name}?`,
      onConfirm: () => {
        toastInfo(`Moving ${SelectedFile.name}...`);
        api
          .put("/files/move", {
            file: {
              name: SelectedFile.name,
              path: SelectedFile.path,
              type: SelectedFile.type,
            },
            targetPath: currentDir.path,
          })
          .then(() => {
            mutate();
            toastInfo(`Moved ${SelectedFile.name}`);
          })
          .catch((error) => {
            toastInfo(
              `Error moving ${SelectedFile.name}, ${error.response.data}`
            );
          });
      },
    });
  };

  return (
    <GenericModal title={`Move ${SelectedFile.name}`}>
      <FolderExplorer />
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button
          className="w-full"
          text="Cancel"
          variant="ghost"
          type="button"
          onClick={() => setOpen(false)}
        />
        <Tooltip
          text={`Move ${
            SelectedFile.type === "directory" ? "folder" : "file"
          } to ${currentDir.path}`}
        >
          <Button
            text="Move"
            icon={SelectedFile?.type === "directory" ? faFolder : faFile}
            onClick={handleMove}
            className="w-full"
          />
        </Tooltip>
      </div>
    </GenericModal>
  );
};

export default MoveFile;
