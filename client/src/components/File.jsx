import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useFiles from "../hooks/useFiles";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
dayjs.extend(relativeTime);

const File = ({ file }) => {
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();

  const isMb = file.size >= 1024;

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
        {isMb ? (file.size / 1024).toFixed(2) : file.size.toFixed(2)}{" "}
        {isMb ? "MB" : "KB"}
      </span>
      <span className="text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </span>
      <Dropdown icon={faEllipsisV} className="place-self-end">
        <DropdownItem
          text="Delete"
          onClick={() => {
            toastInfo("Deleting...");
            api.delete("/files", { data: { path: file.path } }).then(() => {
              mutate();
              toastInfo(`Deleted ${file.name}`);
            });
          }}
        />
      </Dropdown>
    </div>
  );
};

export default File;
