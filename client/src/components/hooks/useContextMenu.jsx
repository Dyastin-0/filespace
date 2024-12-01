import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const useContextMenu = (menuOptions = []) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const menuRef = useRef(null);

  const onContextMenu = (e) => {
    e.preventDefault();
    if (e.button === 2) {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ContextMenu = () => (
    <AnimatePresence>
      {contextMenu.visible && (
        <motion.div
          ref={menuRef}
          className="absolute z-10 transition-all duration-300 rounded-md bg-secondary text-primary-foreground p-2 border border-secondary-accent"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <ul className="text-xs text-primary-highlight-foreground font-semibold">
            {menuOptions.map((option, index) => (
              <li
                key={index}
                className="flex p-2 gap-1 justify-end items-center cursor-pointer transition-all rounded-md duration-300 hover:bg-primary"
                onClick={() => {
                  option.onClick();
                  closeContextMenu();
                }}
              >
                {option.label} <FontAwesomeIcon icon={option.icon} />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return {
    contextMenu,
    onContextMenu,
    closeContextMenu,
    ContextMenu,
  };
};

export default useContextMenu;
