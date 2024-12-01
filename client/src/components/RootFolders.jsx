import { faFolder } from "@fortawesome/free-solid-svg-icons";
import useFiles from "../hooks/useFiles";
import Button from "./ui/Button";
import useTabs from "../hooks/useTabs";
import Separator from "./ui/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RootFolders = () => {
  const { files } = useFiles();
  const { updateTabsToCurrentPath } = useTabs();

  return (
    <div className="flex flex-col w-full rounded-md gap-2">
      <div
        tabIndex={0}
        key={files?.path}
        className="grid grid-cols-4 p-2 text-xs rounded cursor-pointer focus:bg-secondary hover:bg-secondary
        transition-all duration-300"
        onClick={() => updateTabsToCurrentPath(files)}
      >
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faFolder} className="text-primary-highlight" />
          <span className="font-semibold">{files?.name}</span>
        </div>
      </div>
      {files?.children?.map(
        (file) =>
          file.type === "directory" && (
            <div
              tabIndex={0}
              key={file.path}
              className="flex flex-col p-2 text-xs rounded cursor-pointer focus:bg-secondary hover:bg-secondary
              transition-all duration-300"
              onClick={() => updateTabsToCurrentPath(file)}
            >
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-primary-highlight"
                />
                <span className="font-semibold">{file.name}</span>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default RootFolders;
