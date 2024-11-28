class Node {
  constructor(type, name, path, link, size, createdAt, parent = null) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.link = link;
    this.createdAt = createdAt;
    this.size = size / 1024;
    this.children = type === "directory" ? [] : null;
    this.parent = parent;
  }

  addChild(childNode) {
    if (this.type === "directory") {
      this.children.push(childNode);
      this.children.sort((a, b) => {
        if (a.type === "directory" && b.type !== "directory") return -1;
        if (a.type !== "directory" && b.type === "directory") return 1;
        return a.name.localeCompare(b.name);
      });
    }
  }
}

const generateFileTree = (files) => {
  const root = new Node("directory", "root", "", null, 0);

  files.forEach((file) => {
    const filePath = file.name;
    const parts = filePath.split("/").filter(Boolean);
    let currentNode = root;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const isDirectory = filePath.endsWith("/");

      let childNode = currentNode.children.find((child) => child.name === part);

      if (!childNode) {
        const type = isLastPart && !isDirectory ? "file" : "directory";
        const fullPath = parts.slice(0, index + 1).join("/");
        childNode =
          type === "directory"
            ? new Node(
                type,
                part,
                fullPath,
                null,
                0,
                file.createdAt,
                currentNode
              )
            : new Node(
                type,
                part,
                fullPath,
                file.link,
                file.size,
                file.createdAt,
                currentNode
              );
        currentNode.addChild(childNode);
      }

      currentNode = childNode;
    });
  });

  return root;
};

export default generateFileTree;
