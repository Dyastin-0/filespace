import { useState } from "react";
import useDir from "../hooks/useDir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faFolder } from "@fortawesome/free-solid-svg-icons";
import Tab from "./Tab";
import FindDir from "./FindDir";

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
    name: "Your files",
    path: "",
  };

  tabs?.unshift(rootTab);

  return (
    <div
      className="flex w-full h-[32px] gap-2 hover:cursor-text"
      onClick={() => setInputFocused(true)}
    >
      {inputFocused ? (
        <FindDir focus={inputFocused} setFocus={setInputFocused} />
      ) : (
        tabs?.map((tab, index) => (
          <Tab
            key={tab.path}
            tab={tab}
            isLastPart={index === tabs.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Tabs;
