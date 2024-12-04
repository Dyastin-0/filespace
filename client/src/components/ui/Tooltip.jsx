import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  useEffect(() => {
    if (isHovered && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      if (tooltipRect.right > window.innerWidth) {
        setTooltipPosition((prev) => ({
          ...prev,
          left: window.innerWidth - tooltipRect.width - 16,
        }));
      } else if (tooltipRect.left < 0) {
        setTooltipPosition((prev) => ({ ...prev, left: 16 }));
      }

      if (tooltipRect.bottom > window.innerHeight) {
        setTooltipPosition((prev) => ({
          ...prev,
          top: window.innerHeight - tooltipRect.height - 16,
        }));
      }
    }
  }, [isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={tooltipRef}
              className="fixed bg-secondary border border-secondary-accent whitespace-normal break-words text-xs text-primary-foreground rounded-md p-2 shadow-lg z-[9999] max-w-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
              }}
            >
              {text}
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
