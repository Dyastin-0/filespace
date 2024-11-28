const Folder = ({ file }) => {
  return (
    <div className="flex gap-1">
      <span className="font-semibold">{file.name}</span>
      <span className="text-secondary-foreground">{file.parent.name}</span>
    </div>
  );
};

export default Folder;
