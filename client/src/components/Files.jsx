import useAuth from "../hooks/useAuth";
import Directory from "./Directory";
import DirectoryTabs from "./DirectoryTabs";
import Separator from "./ui/Separator";
import useTabs from "../hooks/useTabs";

const Files = () => {
  const { user } = useAuth();
  const { tabs, currentTabIndex, currentTab, addTab, switchTab } = useTabs();

  const handleFolderClick = (folderNode) => {
    addTab(folderNode);
  };

  const handleTabClick = (index) => {
    switchTab(index);
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary gap-2 rounded-md text-xs">
      <h1 className="font-semibold">{`${user?.username}${
        user?.username.endsWith("s") ? "'" : "'s"
      } files`}</h1>
      <DirectoryTabs
        tabs={tabs}
        handleTabClick={handleTabClick}
        currentTabIndex={currentTabIndex}
      />
      <Separator />
      {tabs.length > 0 && (
        <Directory files={currentTab} handleFolderClick={handleFolderClick} />
      )}
    </div>
  );
};

export default Files;
