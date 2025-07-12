import Create from "./Create";
import Storage from "./Storage";
import FolderExplorer from "./FolderExplorer";
import Separator from "./ui/Separator";

const SideContent = () => {
  return (
    <div className="flex flex-col min-w-[220px] h-full bg-primary rounded-md gap-2 p-4">
      <Create />
      <Separator />
      <FolderExplorer />
      <Separator />
      <Storage />
    </div>
  );
};

export default SideContent;
