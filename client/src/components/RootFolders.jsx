import { useState } from "react";
import { faFolder, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import useFiles from "../hooks/useFiles";
import useTabs from "../hooks/useTabs";

const FolderExplorer = ({ folder, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren =
    folder.children &&
    folder.children.some((child) => child.type === "directory");

  const handleFolderClick = () => {
    onClick(folder);
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const variants = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col">
      <div
        tabIndex={0}
        key={folder.path}
        className="flex items-center p-2 text-xs rounded cursor-pointer focus:bg-primary hover:bg-primary transition-all duration-300"
        onClick={handleFolderClick}
      >
        {hasChildren && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-secondary-foreground mr-1 transition-all duration-300 ${
              isOpen ? "-rotate-90" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          />
        )}
        <FontAwesomeIcon icon={faFolder} className="text-primary-highlight" />
        <span className="font-semibold ml-2">{folder.name}</span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            className="ml-4 overflow-hidden"
          >
            {folder.children.map(
              (child) =>
                child.type === "directory" && (
                  <FolderExplorer
                    key={child.path}
                    folder={child}
                    onClick={onClick}
                  />
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RootFolders = () => {
  const { files } = useFiles();
  const { updateTabsToCurrentPath } = useTabs();

  if (!files) return null;

  return (
    <div className="flex flex-col w-full bg-secondary rounded-md p-2 gap-2">
      <FolderExplorer folder={files} onClick={updateTabsToCurrentPath} />
    </div>
  );
};

export default RootFolders;
