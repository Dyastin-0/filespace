export const getUpdatedDirectory = (currentPath, files) => {
  if (currentPath === "") return files.children;

  let currentContent = files.children;
  const pathParts = currentPath.split("/");

  for (const part of pathParts) {
    const folder = currentContent.find(
      (item) => item.type === "directory" && item.name === part
    );
    if (!folder) break;
    currentContent = folder.children;
  }

  return currentContent || [];
};

export const setCurrentDirectory = (prevTabs, currentDirPath, files) => {
  if (prevTabs.length === 0) {
    return [{ name: "Your files", path: "", content: files.children }];
  }

  return prevTabs.map((tab) => {
    if (tab.path === currentDirPath) {
      const updatedContent = getUpdatedDirectory(tab.path, files);
      return {
        ...tab,
        content: updatedContent,
      };
    }
    return tab;
  });
};
