import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
dayjs.extend(relativeTime);

const getSize = (file) => {
  if (file.children && file.children.length > 0) {
    return file.children.reduce((total, child) => total + getSize(child), 0);
  }

  return file.size || 0;
};

const Folder = ({ file }) => {
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
      <Dropdown icon={faEllipsisV} className="place-self-end"></Dropdown>
    </div>
  );
};

export default Folder;
