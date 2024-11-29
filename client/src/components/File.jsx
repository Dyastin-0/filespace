import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const File = ({ file }) => {
  const isMb = file.size >= 1024;

  return (
    <div className="grid grid-cols-4 w-full">
      <a
        href={file.link}
        target="_blank"
        rel="noreferrer"
        className="font-semibold transition-all duration-300
          text-ellipsis line-clamp-1 block
          hover:text-primary-highlight"
      >
        {file.name}
      </a>
      <div className="text-secondary-foreground">{file.parent.name}</div>
      <div className="text-primary-foreground">
        {isMb ? (file.size / 1024).toFixed(2) : file.size.toFixed(2)}{" "}
        {isMb ? "MB" : "KB"}
      </div>
      <div className="text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </div>
    </div>
  );
};

export default File;
