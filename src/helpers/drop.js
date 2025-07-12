export const preventDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const displayCopy = (e) => {
  preventDefault(e);
  e.dataTransfer.dropEffect = "copy";
};
