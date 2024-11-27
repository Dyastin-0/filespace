import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as DomLink, useLocation } from "react-router-dom";

const Link = ({ path, icon, name, onClick }) => {
  const location = useLocation();

  return (
    <DomLink
      onClick={onClick}
      to={path}
      className={`flex items-center justify-center text-md text-center font-semibold
      transition-all duration-300 outline-none rounded-full
      hover:shadow-[var(--accent-secondary)_0_0_0_2px] hover:cursor-pointer
      focus:shadow-[var(--accent-secondary)_0_0_0_2px]
      active:shadow-[var(--highlight)_0_0_0_2px]
      ${
        path === location.pathname
          ? "text-primary-highlight"
          : "text-primary-foreground"
      }`}
    >
      {icon && (
        <span className="flex w-[30px] h-[30px] justify-center items-center">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {name && <span className="text-xs p-2">{name}</span>}
    </DomLink>
  );
};

export default Link;
