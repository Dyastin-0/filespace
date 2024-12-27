import useFiles from "../hooks/useFiles";
import useDir from "../hooks/useDir";
import Tooltip from "./ui/Tooltip";

const Tabs = () => {
  const { fileMap } = useFiles();
  const { currentDir, switchDir } = useDir();

  const pathParts = currentDir?.path.split("/").filter(Boolean);

  const tabs = pathParts?.map((part, index) => {
    const fullPath = pathParts.slice(0, index + 1).join("/");

    return {
      name: part,
      path: fullPath,
    };
  });

  const rootTab = {
    name: "Your files",
    path: "",
  };

  tabs?.unshift(rootTab);

  return (
    <div className="flex gap-2">
      {tabs?.map((tab) => (
        <Tooltip key={tab.path} text={`Navigate to ${tab.name}`}>
          <div
            className={`w-fit p-2 cursor-pointer rounded-md transition-all duration-300
              hover:bg-secondary ${
                tab.path === currentDir?.path
                  ? "bg-secondary text-highlight"
                  : "text-primary-foreground"
              }`}
            onClick={() => switchDir(fileMap.get(tab.path))}
          >
            {tab.name}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default Tabs;
