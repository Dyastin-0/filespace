import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
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

  console.log(SelectedFile.type);
  const handleMove = () => {
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
          });
      },
    });
  };

  return (
    <GenericModal title={`Move ${SelectedFile.name}`}>
      <RootFolders />
      <Button text="Move" icon={faFolderPlus} onClick={handleMove} />
    </GenericModal>
  );
};

export default MoveFile;