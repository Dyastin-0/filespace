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
      <DirectoryTabs />
      <Separator />
      {fileMap?.size > 0 && <Directory />}
    </div>
  );
};

export default Files;
