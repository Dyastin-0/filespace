import { createContext, useContext, useState, useEffect } from "react";
import useFiles from "../hooks/useFiles";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const { fileMap } = useFiles();
  const [currentDir, setCurrentdir] = useState(null);

  useEffect(() => {
    if (!fileMap) return;

    setCurrentdir(fileMap.get(currentDir?.path || ""));
  }, [fileMap]);

  const switchDir = (dir) => {
    setCurrentdir(dir);
  };

  return (
    <TabContext.Provider value={{ currentDir, switchDir }}>
      {children}
    </TabContext.Provider>
  );
};

const useDir = () => useContext(TabContext);

export default useDir;
