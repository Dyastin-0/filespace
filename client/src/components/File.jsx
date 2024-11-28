import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const File = ({ file }) => {
  const isMb = file.size >= 1024;

  return (
    <div className="flex w-full gap-4">
      <div className="flex-1">
        <a
          href={file.link}
          target="_blank"
          rel="noreferrer"
          className="font-semibold transition-all duration-300 text-ellipsis line-clamp-1
						hover:text-primary-highlight hover:underline hover:underline-offset-4"
        >
          {file.name}
        </a>
      </div>
      <div className="flex-1 text-secondary-foreground">{file.parent.name}</div>
      <div className="flex-1 text-primary-foreground">
        {isMb ? (file.size / 1024).toFixed(2) : file.size.toFixed(2)}{" "}
        {isMb ? "MB" : "KB"}
      </div>
      <div className="flex-1 text-primary-foreground">
        {dayjs.unix(dayjs(file.createdAt).unix()).fromNow()}
      </div>
    </div>
  );
};

export default File;
