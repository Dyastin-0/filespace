import { createContext, useContext, useState, useEffect } from "react";
import { setCurrentDirectory } from "../helpers/tabs";
import useFiles from "../hooks/useFiles";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const { files } = useFiles();
  const [tabs, setTabs] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    if (!files) return;

    setTabs((prevTabs) => {
      return setCurrentDirectory(prevTabs, currentTabIndex, files);
    });
  }, [files, currentTabIndex]);

  const addTab = (folderNode) => {
    const newTab = {
      name: folderNode.name,
      path: folderNode.path,
      content: folderNode.children,
    };

    setTabs((prevTabs) => [...prevTabs.slice(0, currentTabIndex + 1), newTab]);
    setCurrentTabIndex((prevIndex) => prevIndex + 1);
  };

  const switchTab = (index) => {
    setCurrentTabIndex(index);
    setTabs((prevTabs) => prevTabs.slice(0, index + 1));
  };

  const currentTab = tabs[currentTabIndex] || {};

  return (
    <TabContext.Provider
      value={{
        currentTab,
        currentTabIndex,
        tabs,
        addTab,
        switchTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

const useTabs = () => useContext(TabContext);

export default useTabs;
