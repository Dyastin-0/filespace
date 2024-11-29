import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useFiles from "../hooks/useFiles";

dayjs.extend(relativeTime);

const getSize = (file) => {
  if (file.children && file.children.length > 0) {
    return file.children.reduce((total, child) => total + getSize(child), 0);
  }

  return file.size || 0;
};

const Folder = ({ file }) => {
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();

  const size = getSize(file);
  const isMb = size >= 1024;

  return (
    <div className="grid grid-cols-5 w-full items-center gap-2">
      <span className="font-semibold">{file.name}</span>
      <span className="text-secondary-foreground">{file.parent.name}</span>
      <span className="text-primary-foreground">
        {isMb ? (size / 1024).toFixed(2) : size.toFixed(2)} {isMb ? "MB" : "KB"}
      </span>
      <span className="text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </span>
      <Dropdown icon={faEllipsisV} className="place-self-end">
        <DropdownItem
          text="Delete"
          onClick={() => {
            toastInfo("Deleting...");
            api
              .delete("/files/folder", { data: { path: file.path } })
              .then(() => {
                mutate();
                toastInfo(`Deleted ${file.name}`);
              });
          }}
        />
      </Dropdown>
    </div>
  );
};

export default Folder;
