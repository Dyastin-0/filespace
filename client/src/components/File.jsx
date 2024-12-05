import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFileIcon } from "../helpers/icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useFiles from "../hooks/useFiles";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useConfirm from "./hooks/useConfirm";
import useContextMenu from "./hooks/useContextMenu";
import useTabs from "../hooks/useTabs";
import useModal from "./hooks/useModal";
import MoveFile from "./modals/MoveFile";
import TruncatedText from "./ui/TruncatedText";
import Tooltip from "./ui/Tooltip";

dayjs.extend(relativeTime);

const File = ({ file }) => {
  const confirm = useConfirm();
  const { setModal, setOpen } = useModal();
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { addTab } = useTabs();

  const sizeKB = (file.size / 1024).toFixed(2);
  const sizeMB = (sizeKB / 1024).toFixed(2);

  const isMB = sizeMB >= 1;

  const handleDelete = () => {
    confirm({
      title: "Delete File",
      message: `Are you sure you want to delete ${file.name} file?`,
      onConfirm: () => {
        toastInfo(`Deleting ${file.name}...`);
        api.delete("/files", { data: { path: file.path } }).then(() => {
          mutate();
          toastInfo(`Deleted ${file.name}`);
        });
      },
    });
  };

  const handleMove = () => {
    setModal(<MoveFile SelectedFile={file} />);
    setOpen(true);
  };

  const menuOptions = [
    {
      label: "Delete",
      icon: faTrash,
      onClick: handleDelete,
    },
    {
      label: "Move to",
      icon: faFolder,
      onClick: handleMove,
    },
    {
      label: "Copy",
      icon: faCopy,
      onClick: () => console.log("Option 3 clicked"),
    },
  ];

  const { onContextMenu, closeContextMenu, ContextMenu } =
    useContextMenu(menuOptions);

  const icon = getFileIcon(file.name);
  const isFolder = file.type === "directory";

  return (
    <Tooltip text={file.name}>
      <div
        tabIndex={0}
        key={file.path}
        className="grid grid-cols-4 p-2 gap-2 text-xs rounded cursor-pointer focus:bg-primary hover:bg-primary
      transition-all duration-300"
        onDoubleClick={() => isFolder && addTab(file)}
        onContextMenu={onContextMenu}
        onBlur={closeContextMenu}
      >
        <div className="flex gap-2">
          <FontAwesomeIcon icon={icon} />
          <a
            href={file.link}
            target="_blank"
            rel="noreferrer"
            className="font-semibold transition-all duration-300 w-full
          hover:text-primary-highlight block truncate"
          >
            <TruncatedText text={file.name} tooltip={false} />
          </a>
        </div>
        <TruncatedText text={file.parent.name} tooltip={false} />
        <TruncatedText
          tooltip={false}
          text={isFolder ? "-" : isMB ? `${sizeMB} MB` : `${sizeKB} KB`}
        />
        <TruncatedText
          tooltip={false}
          text={dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
        />
        <ContextMenu />
      </div>
    </Tooltip>
  );
};

export default File;
