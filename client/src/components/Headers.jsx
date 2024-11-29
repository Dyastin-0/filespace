const Headers = () => {
  return (
    <div className="flex items-center p-2 cursor-pointer hover:bg-secondary rounded text-xs">
      <div className="mr-2 w-[12px]" />
      <div className="grid grid-cols-5 w-full items-center gap-2">
        <span>Name</span>
        <span>Parent</span>
        <span>Size</span>
        <span>Created</span>
        <span className="place-self-end">Actions</span>
      </div>
    </div>
  );
};

export default Headers;
