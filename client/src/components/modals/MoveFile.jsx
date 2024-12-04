import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../hooks/useAxios";
import useFiles from "../../hooks/useFiles";
import useTabs from "../../hooks/useTabs";
import useConfirm from "../hooks/useConfirm";
import useToast from "../hooks/useToast";
import RootFolders from "../RootFolders";
import Button from "../ui/Button";
import GenericModal from "./GenericModal";

const MoveFile = ({ SelectedFile }) => {
  const { mutate } = useFiles();
  const confirm = useConfirm();
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { currentTab } = useTabs();

  const handleMove = () => {
    if (SelectedFile.path === currentTab.path)
      return toastInfo("File is already in this folder.");

    confirm({
      title: SelectedFile.type === "directory" ? "Move Folder" : "Move File",
      message: `Are you sure you want to move ${SelectedFile.name} to ${currentTab.name}?`,
      onConfirm: () => {
        toastInfo(`Moving ${SelectedFile.name}...`);
        api
          .put("/files", {
            file: SelectedFile.name,
            filePath: `${SelectedFile.path}`,
            path: `${currentTab.path}`,
            type: SelectedFile.type,
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
      <RootFolders />
      <Button
        text="Move"
        icon={SelectedFile?.type === "directory" ? faFolder : faFile}
        onClick={handleMove}
      />
    </GenericModal>
  );
};

export default MoveFile;
