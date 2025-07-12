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
    e.stopPropagation();

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
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
    document.addEventListener("scroll", closeContextMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", closeContextMenu);
    };
  }, []);

  useEffect(() => {
    if (contextMenu.visible && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();

      setContextMenu((prev) => ({
        ...prev,
        x: Math.min(prev.x, window.innerWidth - menuRect.width - 8),
        y: Math.min(prev.y, window.innerHeight - menuRect.height - 8),
      }));
    }
  }, [contextMenu.visible]);

  const ContextMenu = () => (
    <AnimatePresence>
      {contextMenu.visible && (
        <motion.div
          ref={menuRef}
          onMouseEnter={(e) => e.stopPropagation()}
          className="fixed z-50 rounded-md bg-primary text-primary-foreground p-2 border border-secondary-accent shadow-lg"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="text-xs font-semibold">
            {menuOptions.map((option, index) => (
              <li
                key={index}
                className="flex p-2 gap-1 justify-end items-center cursor-pointer transition-all rounded-md duration-300 hover:bg-secondary"
                onClick={() => {
                  option.onClick();
                  closeContextMenu();
                }}
              >
                {option.label}
                {option.icon && <FontAwesomeIcon icon={option.icon} />}
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
