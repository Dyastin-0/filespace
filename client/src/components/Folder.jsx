import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getSize } from "../helpers/size";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useFiles from "../hooks/useFiles";
import useConfirm from "./hooks/useConfirm";

dayjs.extend(relativeTime);

const Folder = ({ file }) => {
  const confirm = useConfirm();
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();

  const sizeBytes = getSize(file);
  const sizeKB = (sizeBytes / 1024).toFixed(2);
  const sizeMB = (sizeKB / 1024).toFixed(2);

  const isMB = sizeMB >= 1;

  const handleDelete = () => {
    confirm({
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

  return (
    <div className="grid grid-cols-5 w-full items-center gap-2">
      <span className="font-semibold">{file.name}</span>
      <span className="text-secondary-foreground">{file.parent.name}</span>
      <span className="text-primary-foreground">
        {isMB ? sizeMB : sizeKB} {isMB ? "MB" : "KB"}
      </span>
      <span className="text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </span>
      <Dropdown icon={faEllipsisV} className="place-self-end">
        <DropdownItem text="Delete" onClick={handleDelete} />
      </Dropdown>
    </div>
  );
};

export default Folder;
