import useAuth from "../hooks/useAuth";
import { useMemo } from "react";

const MAX_STORAGE_LIMIT = 1 * 1024 * 1024 * 1024;

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 MB";
  const KB = bytes / 1024;
  const MB = KB / 1024;
  return `${MB.toFixed(2)} MB`;
};

const Limit = () => {
  const { user } = useAuth();
  const usedStorage = user?.usedStorage || 0;

  const usagePercentage = useMemo(
    () => Math.min((usedStorage / MAX_STORAGE_LIMIT) * 100, 100),
    [usedStorage]
  );

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center gap-2 text-sm font-semibold">
        <span>Storage Usage</span>
        <span>
          {formatBytes(usedStorage)} / {formatBytes(MAX_STORAGE_LIMIT)}
        </span>
      </div>

      <div className="flex flex-col w-full bg-secondary rounded-full h-3 text-xs">
        <div
          className="rounded-full h-3 transition-all duration-500"
          style={{
            background: `linear-gradient(to right, var(--highlight) ${usagePercentage}%, var(--bg-secondary) ${usagePercentage}%)`,
          }}
        />
      </div>

      <div className="text-xs text-right text-secondary-foreground">
        {usagePercentage.toFixed(2)}% used
      </div>
    </div>
  );
};

export default Limit;
