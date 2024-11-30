import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useFiles from "../hooks/useFiles";
import { getSize } from "../helpers/size";

dayjs.extend(relativeTime);

const Folder = ({ file }) => {
  const { mutate } = useFiles();
  const { api } = useAxios();
  const { toastInfo } = useToast();

  const sizeBytes = getSize(file);
  const sizeKB = (sizeBytes / 1024).toFixed(2);
  const sizeMB = (sizeKB / 1024).toFixed(2);

  const isMB = sizeMB >= 1;

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
