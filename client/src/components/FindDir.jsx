import { faChevronRight, faComputer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFiles from "../hooks/useFiles";
import useDir from "../hooks/useDir";
import useToast from "./hooks/useToast";
import { useEffect, useRef } from "react";

const SearchFile = ({ focus, setFocus }) => {
  const { fileMap } = useFiles();
  const { switchDir, currentDir } = useDir();
  const { toastInfo } = useToast();
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const file = fileMap.get(inputRef.current.value);
      if (file && file.type === "directory") {
        switchDir(file);
      } else {
        toastInfo("Directory not found");
      }
    }
  };

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = currentDir?.path;
    }
  }, [focus]);

  return (
    <div className="flex w-full h-full gap-2 justify-center items-center">
      <div className="flex h-full justify-center items-center">
        <div className="flex h-full justify-center items-center p-2">
          <FontAwesomeIcon icon={faComputer} />
        </div>
        <div className="flex h-full justify-center items-center p-2">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <input
        ref={inputRef}
        className="outline-none w-full h-[32px] bg-secondary rounded-md p-2"
        onBlur={() => setFocus(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchFile;
