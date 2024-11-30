import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useFiles from "../hooks/useFiles";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useConfirm from "./hooks/useConfirm";
dayjs.extend(relativeTime);

const File = ({ file }) => {
  const confirm = useConfirm();
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();

  const sizeKB = (file.size / 1024).toFixed(2);
  const sizeMB = (sizeKB / 1024).toFixed(2);

  const isMB = sizeMB >= 1;

  const handleDelete = () => {
    confirm({
      message: `Are you sure you want to delete ${file.name}?`,
      onConfirm: () => {
        toastInfo(`Deleting ${file.name}...`);
        api.delete("/files", { data: { path: file.path } }).then(() => {
          mutate();
          toastInfo(`Deleted ${file.name}`);
        });
      },
    });
  };

  return (
    <div className="grid grid-cols-5 w-full items-center gap-2">
      <a
        href={file.link}
        target="_blank"
        rel="noreferrer"
        className="font-semibold transition-all duration-300
          text-ellipsis line-clamp-1 block w-full
          hover:text-primary-highlight"
      >
        {file.name}
      </a>
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

export default File;
