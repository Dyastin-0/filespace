import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import generateFileTree from "../helpers/tree";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import useSWR from "swr";
import Separator from "./ui/Separator";
import File from "./File";
import Folder from "./Folder";

const Files = () => {
  const { api, isAxiosReady } = useAxios();
  const { user } = useAuth();

  const { data: fileTree } = useSWR(
    isAxiosReady && user ? `${user._id}/files` : null,
    async () => {
      const response = await api.get("/files");
      return generateFileTree(response.data);
    }
  );

  const [tabs, setTabs] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(
    () =>
      fileTree &&
      setTabs([{ name: "Root", path: "", content: fileTree.children }]),
    [fileTree]
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
          {isFolder ? <Folder file={file} /> : <File file={file} />}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary gap-2 rounded-md text-xs">
      <h1 className="font-semibold">{`${user?.username}${
        user?.username.endsWith("s") ? "'" : "'s"
      } files`}</h1>
      <div className="flex overflow-x-auto border-secondary gap-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.path}
            className={`w-fit p-2 cursor-pointer rounded-md
							transition-all duration-300 
							${
                index === currentTabIndex
                  ? "bg-secondary text-highlight"
                  : "text-primary-foreground"
              }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex flex-col">
        {tabs.length > 0 && renderContent(tabs[currentTabIndex].content)}
      </div>
    </div>
  );
};

export default Files;
