import Files from "./Files";

const MainContent = ({ files }) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary p-4 gap-2 rounded-md text-xs">
      <Files files={files} />
    </div>
  );
};

export default MainContent;
