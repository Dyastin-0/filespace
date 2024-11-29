import { useEffect, useState } from "react";
import Separator from "./ui/Separator";
import useFiles from "../hooks/useFiles";
import useAuth from "../hooks/useAuth";
import Directory from "./Directory";
import DirectoryTabs from "./DirectoryTabs";

const Files = () => {
  const { files } = useFiles();
  const { user } = useAuth();

  const [tabs, setTabs] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(
    () =>
      files && setTabs([{ name: "Root", path: "", content: files.children }]),
    [files]
  );

  const handleFolderClick = (folderNode) => {
    const newTab = {
      name: folderNode.name,
      path: folderNode.path,
      content: folderNode.children,
    };

    setTabs((prevTabs) => [...prevTabs.slice(0, currentTabIndex + 1), newTab]);
    setCurrentTabIndex((prevIndex) => prevIndex + 1);
  };

  const handleTabClick = (index) => {
    setCurrentTabIndex(index);
    setTabs((prevTabs) => prevTabs.slice(0, index + 1));
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
        <Directory
          files={tabs[currentTabIndex]}
          handleFolderClick={handleFolderClick}
        />
      )}
    </div>
  );
};

export default Files;
