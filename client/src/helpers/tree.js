class Node {
  constructor(type, name, path) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.children = type === "directory" ? [] : null;
  }

  addChild(childNode) {
    if (this.type === "directory") {
      this.children.push(childNode);
    }
  }
}

const generateFileTree = (files) => {
  const root = new Node("directory", "root", "");

  files.forEach((file) => {
    const filePath = file.name;
    const parts = filePath.split("/").filter(Boolean);
    let currentNode = root;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const isDirectory = filePath.endsWith("/");

      // Find or create the node at the current level
      let childNode = currentNode.children.find((child) => child.name === part);

      if (!childNode) {
        const type = isLastPart && !isDirectory ? "file" : "directory";
        const fullPath = parts.slice(0, index + 1).join("/");
        childNode = new Node(type, part, fullPath);
        currentNode.addChild(childNode);
      }

      currentNode = childNode;
    });
  });

  return root;
};

export default generateFileTree;
