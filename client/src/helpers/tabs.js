const getUpdatedDirectory = (currentPath, files) => {
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

export const setCurrentDirectory = (prevTabs, currentTabIndex, files) => {
  if (prevTabs.length === 0) {
    return [{ name: "Root", path: "", content: files.children }];
  }

  return prevTabs.map((tab, index) => {
    if (index === currentTabIndex) {
      const updatedContent = getUpdatedDirectory(tab.path, files);
      return {
        ...tab,
        content: updatedContent,
      };
    }
    return tab;
  });
};
