import useAuth from "../hooks/useAuth";
import { useState, useEffect, useMemo } from "react";

const MAX_STORAGE_LIMIT = 1 * 1024 * 1024 * 1024;

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 MB";
  const KB = bytes / 1024;
  const MB = KB / 1024;
  return `${MB.toFixed(2)} MB`;
};

const easeOutCubic = (t) => --t * t * t + 1;

const Storage = () => {
  const { user } = useAuth();
  const usedStorage = user?.usedStorage || 0;
  const [displayedStorage, setDisplayedStorage] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const increment = easeOutCubic(Math.min(progress / duration, 1));
      setDisplayedStorage(usedStorage * increment);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [usedStorage]);

  const usagePercentage = useMemo(
    () => Math.min((displayedStorage / MAX_STORAGE_LIMIT) * 100, 100),
    [displayedStorage]
  );

  return (
    <div
      className="flex flex-col place-self-end gap-2 w-full max-w-md mx-auto text-xs text-primary-foreground
    bg-secondary p-2 rounded-md"
    >
      <div className="flex w-full gap-1 font-semibold">
        <p className="text-start">Storage usage</p>
        <div className="text-secondary-foreground">
          {usagePercentage.toFixed(2)}%
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary rounded-full h-3">
        <div
          className="rounded-full h-3 w-full transition-all duration-300"
          style={{
            background: `linear-gradient(to right, var(--highlight) ${usagePercentage}%, var(--bg-primary) ${usagePercentage}%)`,
          }}
        />
      </div>
      <span className="font-semibold">
        {formatBytes(displayedStorage)} of {formatBytes(MAX_STORAGE_LIMIT)} used
      </span>
    </div>
  );
};

export default Storage;
