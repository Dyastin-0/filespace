import Tooltip from "./ui/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useDir from "../hooks/useDir";
import useFiles from "../hooks/useFiles";

const Tab = ({ tab }) => {
  const { fileMap } = useFiles();
  const { currentDir, switchDir } = useDir();

  return (
    <div className="flex items-center">
      <Tooltip text={`Navigate to ${tab.name}`}>
        <div
          className={`flex gap-2 p-2 w-fit cursor-pointer rounded-md transition-all duration-300
					justify-center items-center
					hover:bg-secondary ${
            tab.path === currentDir?.path
              ? "bg-secondary text-highlight"
              : "text-primary-foreground"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            switchDir(fileMap.get(tab.path));
          }}
        >
          {tab.icon}
          {tab.name && <span>{tab.name}</span>}
        </div>
      </Tooltip>
      <div className="flex justify-center items-center h-full p-2">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default Tab;
