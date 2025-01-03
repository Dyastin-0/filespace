class File {
  constructor(type, name, path, link, size, created, parent = null) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.link = link;
    this.created = created;
    this.size = size;
    this.children = type === "directory" ? [] : null;
    this.parent = parent;
  }

  addChild(childFile) {
    if (this.type === "directory") {
      const pos = this.findInsertPosition(childFile);
      this.children.splice(pos, 0, childFile);
      this.updateSize();
    }
  }

  findInsertPosition(newChild) {
    let low = 0,
      high = this.children.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.compareFiles(newChild, this.children[mid]);
      if (comparison < 0) high = mid;
      else low = mid + 1;
    }
    return low;
  }

  compareFiles(a, b) {
    if (a.type === "directory" && b.type !== "directory") return -1;
    if (a.type !== "directory" && b.type === "directory") return 1;
    return a.name.localeCompare(b.name);
  }

  updateSize() {
    if (this.type === "directory") {
      this.size = this.children.reduce((total, child) => {
        return total + child.size;
      }, 0);
      if (this.parent) {
        this.parent.updateSize();
      }
    }
  }
}

const generateFileTreeWithMap = (files) => {
  const tree = new File("directory", "Your files", "", null, 0, null);
  const map = new Map();

  map.set(tree.path, tree);

  if (files.length === 0) {
    return { tree, map };
  }

  files.forEach((file) => {
    const filePath = file.Name;
    const parts = filePath.split("/").filter(Boolean);
    let currentNode = tree;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const isDirectory = filePath.endsWith("/");

      let childNode = currentNode.children.find((child) => child.name === part);

      if (!childNode) {
        const type = isLastPart && !isDirectory ? "file" : "directory";
        const fullPath = parts.slice(0, index + 1).join("/");

        childNode =
          type === "directory"
            ? new File(type, part, fullPath, null, 0, file.Created, currentNode)
            : new File(
                type,
                part,
                fullPath,
                file.Link,
                file.Size,
                file.Created,
                currentNode
              );

        currentNode.addChild(childNode);
        map.set(fullPath, childNode);
      }

      currentNode = childNode;
    });
  });

  return { tree, map };
};

export default generateFileTreeWithMap;
