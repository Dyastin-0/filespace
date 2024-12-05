import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ children, text, disableTooltip }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const updateTooltipPosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setTooltipPosition({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - tooltipRect.width - 16),
      });
    }
  };

  const handleMouseEnter = () => {
    if (disableTooltip) {
      setIsHovered(false);
      return;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("scroll", updateTooltipPosition, {
        passive: true,
      });
      window.addEventListener("resize", updateTooltipPosition);

      setTimeout(updateTooltipPosition, 0);
    }

    return () => {
      window.removeEventListener("scroll", updateTooltipPosition);
      window.removeEventListener("resize", updateTooltipPosition);
    };
  }, [isHovered]);

  return (
    <div
      className="relative"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered &&
        !disableTooltip &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={tooltipRef}
              className="fixed bg-secondary border border-secondary-accent
              whitespace-normal break-words text-[0.60rem] text-primary-foreground rounded-md p-2 z-[9999]
              "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
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
