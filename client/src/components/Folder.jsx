import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  faCopy,
  faFolder,
  faFolderMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getSize } from "../helpers/size";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useFiles from "../hooks/useFiles";
import useConfirm from "./hooks/useConfirm";
import useContextMenu from "./hooks/useContextMenu";
import { getFileIcon } from "../helpers/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTabs from "../hooks/useTabs";

dayjs.extend(relativeTime);

const Folder = ({ file }) => {
  const confirm = useConfirm();
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { addTab } = useTabs();

  const sizeBytes = getSize(file);
  const sizeKB = (sizeBytes / 1024).toFixed(2);
  const sizeMB = (sizeKB / 1024).toFixed(2);

  const isMB = sizeMB >= 1;

  const handleDelete = () => {
    confirm({
      title: "Delete Folder",
      message: `Are you sure you want to delete ${file.name} folder?`,
      onConfirm: () => {
        toastInfo(`Deleting ${file.name}...`);
        api.delete("/files/folder", { data: { path: file.path } }).then(() => {
          mutate();
          toastInfo(`Deleted ${file.name}`);
        });
      },
    });
  };

  const menuOptions = [
    {
      label: "Delete",
      icon: faTrash,
      onClick: handleDelete,
    },
    {
      label: "Move to",
      icon: faFolderMinus,
      onClick: () => console.log("Option 2 clicked"),
    },
    {
      label: "Copy",
      icon: faCopy,
      onClick: () => console.log("Option 3 clicked"),
    },
  ];

  const { onContextMenu, ContextMenu } = useContextMenu(menuOptions);

  const isFolder = file.type === "directory";

  return (
    <div
      tabIndex={0}
      key={file.path}
      className="grid grid-cols-4 p-2 gap-2 text-xs rounded cursor-pointer focus:bg-primary hover:bg-primary
        transition-all duration-300"
      onDoubleClick={() => isFolder && addTab(file)}
      onContextMenu={onContextMenu}
    >
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faFolder} className="text-primary-highlight" />
        <span className="block truncate font-semibold">{file.name}</span>
      </div>
      <span className="block truncate text-secondary-foreground">
        {file.parent.name}
      </span>
      <span className="block truncate text-primary-foreground">
        {isMB ? sizeMB : sizeKB} {isMB ? "MB" : "KB"}
      </span>
      <span className="block truncate text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </span>
      <ContextMenu />
    </div>
  );
};

export default Folder;
