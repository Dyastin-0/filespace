import { createContext, useContext, useState, useEffect } from "react";
import useFiles from "../hooks/useFiles";
import { getUpdatedDirectory } from "../helpers/tabs";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const { files } = useFiles();
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);

  useEffect(() => {
    if (!files) return;

    // If no tabs are set, initialize with the root
    if (tabs.length === 0) {
      const rootTab = { name: "Your files", path: "", content: files.children };
      setTabs([rootTab]);
      setCurrentTab(rootTab);
    } else {
      setTabs((prevTabs) => {
        const updatedTabs = prevTabs.map((tab) => {
          const updatedContent = getUpdatedDirectory(tab.path, files);
          return { ...tab, content: updatedContent };
        });

        // Ensure currentTab is updated to reflect the current directory
        if (currentTab) {
          const currentTabPath = currentTab.path;
          const currentTabExists = updatedTabs.some(
            (tab) => tab.path === currentTabPath
          );

          // If the current tab exists in updatedTabs, keep it, otherwise set the first tab
          if (currentTabExists) {
            setCurrentTab(
              (prevTab) =>
                updatedTabs.find((tab) => tab.path === prevTab.path) ||
                updatedTabs[0]
            );
          } else {
            setCurrentTab(updatedTabs[0]);
          }
        }

        return updatedTabs;
      });
    }
  }, [files]);

  const addTab = (folderNode) => {
    const rootTab = { name: "Your files", path: "", content: files.children };

    const pathParts = folderNode.path.split("/").filter(Boolean);
    let currentContent = files.children;
    const newTabs = [rootTab];

    for (const part of pathParts) {
      const folder = currentContent.find(
        (item) => item.type === "directory" && item.name === part
      );
      if (!folder) break;
      newTabs.push({
        name: folder.name,
        path: folder.path,
        content: folder.children,
      });
      currentContent = folder.children;
    }

    if (!newTabs.some((tab) => tab.path === folderNode.path)) {
      newTabs.push({
        name: folderNode.name,
        path: folderNode.path,
        content: folderNode.children,
      });
    }

    setTabs(newTabs);
    setCurrentTab({
      name: folderNode.name,
      path: folderNode.path,
      content: folderNode.children,
    });
  };

  const switchTab = (targetTab) => {
    const rootTab = { name: "Your files", path: "", content: files.children };
    const pathParts = targetTab.path.split("/").filter(Boolean);
    let currentContent = files.children;
    const newTabs = [rootTab];

    for (const part of pathParts) {
      const folder = currentContent.find(
        (item) => item.type === "directory" && item.name === part
      );
      if (!folder) break;

      newTabs.push({
        name: folder.name,
        path: folder.path,
        content: folder.children,
      });

      currentContent = folder.children;
    }

    setTabs(newTabs);
    setCurrentTab(targetTab);
  };

  const updateTabsToCurrentPath = (folderNode) => {
    const existingTab = tabs.find((tab) => tab.path === folderNode.path);

    if (existingTab) {
      switchTab(existingTab);
    } else {
      addTab(folderNode);
    }
  };

  return (
    <TabContext.Provider
      value={{
        currentTab,
        tabs,
        addTab,
        switchTab,
        updateTabsToCurrentPath,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

const useTabs = () => useContext(TabContext);

export default useTabs;
