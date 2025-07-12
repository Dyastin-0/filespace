const Headers = () => {
  return (
    <div className="flex items-center p-2 rounded text-xs">
      <div className="grid grid-cols-4 gap-2 w-full items-center font-semibold">
        <span>Name</span>
        <span>Parent</span>
        <span>Size</span>
        <span>Created</span>
      </div>
    </div>
  );
};

export default Headers;
