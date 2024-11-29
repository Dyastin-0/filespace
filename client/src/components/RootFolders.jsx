import { faFolder } from "@fortawesome/free-solid-svg-icons";
import useFiles from "../hooks/useFiles";
import Button from "./ui/Button";
import useTabs from "../hooks/useTabs";

const RootFolders = () => {
  const { files } = useFiles();
  const { updateTabsToCurrentPath } = useTabs();

  return (
    <div className="flex flex-col w-ful gap-2">
      {files?.children?.map(
        (file) =>
          file.type === "directory" && (
            <Button
              onClick={() => {
                updateTabsToCurrentPath(file);
              }}
              variant="ghost"
              key={file.name}
              text={file.name}
              icon={faFolder}
              className="w-full"
              end={true}
            />
          )
      )}
    </div>
  );
};

export default RootFolders;
