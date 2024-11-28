import { useState } from "react";
import generateFileTree from "../helpers/tree"; // Generates tree structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";

const MainContent = ({ files }) => {
  if (!files) return null;

  const [fileTree] = useState(generateFileTree(files)); // Tree structure
  const [tabs, setTabs] = useState([
    { name: "Root", path: "", content: fileTree.children }, // Root's children
  ]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Handle folder click to open a new tab
  const handleFolderClick = (folderNode) => {
    const newTab = {
      name: folderNode.name,
      path: folderNode.path,
      content: folderNode.children,
    };

    setTabs((prevTabs) => [...prevTabs.slice(0, currentTabIndex + 1), newTab]);
    setCurrentTabIndex(currentTabIndex + 1);
  };

  // Render files and folders within a tab
  const renderContent = (nodes) => {
    if (!nodes) return <div>No files or folders found</div>;

    return nodes.map((node) => {
      const isFolder = node.type === "directory";

      return (
        <div
          key={node.path}
          className="flex items-center p-2 cursor-pointer hover:bg-secondary rounded"
          onClick={() => isFolder && handleFolderClick(node)}
        >
          <FontAwesomeIcon
            icon={isFolder ? faFolder : faFile}
            className={`mr-2 ${isFolder ? "text-blue-500" : "text-gray-500"}`}
          />
          <span>{node.name}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary p-4 gap-2 rounded-md text-xs">
      <h1 className="font-semibold">Files</h1>

      {/* Tabs */}
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
