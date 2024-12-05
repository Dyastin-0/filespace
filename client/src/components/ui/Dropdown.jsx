import { useState, useRef } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./Tooltip";

export const Dropdown = ({
  name,
  icon,
  children,
  className,
  variant,
  tooltip,
  p = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleBlur = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={clsx("relative flex items-center", className)}
      ref={dropdownRef}
    >
      <Tooltip text={tooltip}>
        <Button
          icon={icon}
          variant={variant}
          text={name}
          onClick={toggle}
          onBlur={handleBlur}
          className={clsx(p && "p-[0rem]")}
        />
      </Tooltip>
      <motion.div
        initial={{ scaleY: 0, opacity: 0, y: -50 }}
        animate={
          isOpen
            ? { scaleY: 1, opacity: 1, y: 0 }
            : { scaleY: 0, opacity: 0, y: -50 }
        }
        transition={0}
        onFocus={() => setIsOpen(true)}
        className={`absolute flex flex-col items-end top-full mt-2 right-0
					text-primary-foreground text-xs bg-secondary
					w-fit max-h-[200px] overflow-auto z-30
					p-1.5 gap-1.5 shadow-md rounded-md`}
        onBlur={handleBlur}
        onMouseUp={() => setIsOpen(false)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const DropdownItem = ({
  onClick,
  children,
  setOpen,
  asChild,
  text,
  icon,
  type,
}) => {
  return asChild ? (
    children
  ) : (
    <button
      className="flex text-right w-full justify-end items-center
      text-nowrap text-primary-foreground text-xs z-50
      outline-none p-2 rounded-md transition-all duration-300 gap-1
			hover:bg-primary hover:cursor-pointer focus:bg-primary
      active:shadow-[var(--highlight)_0_0_0_2px]"
      onFocus={setOpen}
      type={type}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      {text}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};
