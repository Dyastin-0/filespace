export const getSize = (file) => {
  if (file.children && file.children.length > 0)
    return file.children.reduce(
      (total, child) => parseInt(total) + parseInt(getSize(child)),
      0
    );

  return file.size || 0;
};
