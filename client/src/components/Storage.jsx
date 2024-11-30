import useAuth from "../hooks/useAuth";
import { useMemo } from "react";

const MAX_STORAGE_LIMIT = 1 * 1024 * 1024 * 1024;

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 MB";
  const KB = bytes / 1024;
  const MB = KB / 1024;
  return `${MB.toFixed(2)} MB`;
};

const Storage = () => {
  const { user } = useAuth();
  const usedStorage = user?.usedStorage || 0;

  const usagePercentage = useMemo(
    () => Math.min((usedStorage / MAX_STORAGE_LIMIT) * 100, 100),
    [usedStorage]
  );

  return (
    <div className="flex flex-col place-self-end gap-2 w-full max-w-md mx-auto text-xs text-primary-foreground">
      <div className="flex flex-col w-full gap-2 font-semibold">
        <p className="text-start">Storage usage</p>
        <span className="font-semibold">
          {formatBytes(usedStorage)} / {formatBytes(MAX_STORAGE_LIMIT)}
        </span>
      </div>
      <div className="flex flex-col w-full bg-secondary rounded-full h-3">
        <div
          className="rounded-full h-3 w-[180px] transition-all duration-500"
          style={{
            background: `linear-gradient(to right, var(--highlight) ${usagePercentage}%, var(--bg-secondary) ${usagePercentage}%)`,
          }}
        />
      </div>
      <div className="text-right text-secondary-foreground">
        {usagePercentage.toFixed(2)}% used
      </div>
    </div>
  );
};

export default Storage;
