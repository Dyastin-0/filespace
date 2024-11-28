import { useState } from "react";
import generateFileTree from "../helpers/tree"; // Generates tree structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";

const MainContent = ({ files }) => {
  if (!files) return null;

  const [fileTree] = useState(generateFileTree(files));
  const [tabs, setTabs] = useState([
    { name: "Root", path: "", content: fileTree.children },
  ]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleFolderClick = (folderNode) => {
    const newTab = {
      name: folderNode.name,
      path: folderNode.path,
      content: folderNode.children,
    };

    setTabs((prevTabs) => [...prevTabs.slice(0, currentTabIndex + 1), newTab]);
    setCurrentTabIndex(currentTabIndex + 1);
  };

  const renderContent = (files) => {
    if (!files) return <div>No files or folders found</div>;

    return files.map((file) => {
      const isFolder = file.type === "directory";

      return (
        <div
          key={file.path}
          className="flex items-center p-2 cursor-pointer hover:bg-secondary rounded text-xs"
          onClick={() => isFolder && handleFolderClick(file)}
        >
          <FontAwesomeIcon
            icon={isFolder ? faFolder : faFile}
            className={`mr-2 ${
              isFolder ? "text-primary-highlight" : "text-primary-foreground"
            }`}
          />
          {isFolder ? (
            <span className="font-semibold">{file.name}</span>
          ) : (
            <a href={file.link} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary p-4 gap-2 rounded-md text-xs">
      <h1 className="font-semibold">Files</h1>

      <div className="flex overflow-x-auto border-b border-secondary mb-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.path}
            className={`p-2 cursor-pointer ${
              index === currentTabIndex
                ? "bg-secondary text-highlight"
                : "text-primary-foreground"
            }`}
            onClick={() => setCurrentTabIndex(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Render content of the current tab */}
      <div className="flex flex-col gap-2 p-2">
        {renderContent(tabs[currentTabIndex].content)}
      </div>
    </div>
  );
};

export default MainContent;
