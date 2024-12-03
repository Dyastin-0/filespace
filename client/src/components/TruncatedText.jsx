import clsx from "clsx";
import { useState } from "react";

const TruncatedText = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx("relative truncate", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{text}</span>
      {isHovered && (
        <div className="absolute top-full left-0 mt-1 w-max bg-gray-800 text-white text-sm p-2 rounded shadow-lg z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
