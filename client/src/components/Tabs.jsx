import { useState, useRef, useEffect } from "react";
import useFiles from "../hooks/useFiles";
import useDir from "../hooks/useDir";
import useToast from "./hooks/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faComputer,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "./Tab";
import SearchFile from "./SearchFile";

const Tabs = () => {
  const { currentDir } = useDir();
  const [inputFocused, setInputFocused] = useState(false);

  const pathParts = currentDir?.path.split("/").filter(Boolean);

  const tabs = pathParts?.map((part, index) => {
    const fullPath = pathParts.slice(0, index + 1).join("/");

    return {
      icon: <FontAwesomeIcon icon={faFolder} />,
      name: part,
      path: fullPath,
    };
  });

  const rootTab = {
    icon: <FontAwesomeIcon icon={faComputer} />,
    name: null,
    path: "",
  };

  tabs?.unshift(rootTab);

  return (
    <div
      className="flex w-full gap-2 hover:cursor-text"
      onClick={() => setInputFocused(true)}
    >
      {inputFocused ? (
        <SearchFile focus={inputFocused} setFocus={setInputFocused} />
      ) : (
        tabs?.map((tab) => <Tab key={tab.path} tab={tab} />)
      )}
    </div>
  );
};

export default Tabs;
