import Create from "./Create";
import Limit from "./Limit";
import RootFolders from "./RootFolders";

const SideContent = () => {
  return (
    <div className="flex flex-col min-w-fit h-full bg-primary rounded-md gap-4 p-4">
      <Create />
      <RootFolders />
      <Limit />
    </div>
  );
};

export default SideContent;
