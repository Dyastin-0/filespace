import useAuth from "../hooks/useAuth";
import Directory from "./Directory";
import DirectoryTabs from "./DirectoryTabs";
import Separator from "./ui/Separator";
import useFiles from "../hooks/useFiles";

const Files = () => {
  const { user } = useAuth();
  const { fileMap } = useFiles();

  return (
    <div className="flex flex-col w-full h-full bg-primary gap-2 rounded-md text-xs">
      <div className="flex gap-2 items-center">
        <h1 className="font-semibold">{`${user?.Username}${
          user?.Username.endsWith("s") ? "'" : "'s"
        } files`}</h1>
        <DirectoryTabs />
      </div>
      <Separator />
      {fileMap?.size > 0 && <Directory />}
    </div>
  );
};

export default Files;
