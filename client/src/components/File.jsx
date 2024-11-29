import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown } from "./ui/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
dayjs.extend(relativeTime);

const File = ({ file }) => {
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
      <Dropdown icon={faEllipsisV} className="place-self-end"></Dropdown>
    </div>
  );
};

export default File;
