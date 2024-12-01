import Create from "./Create";
import Storage from "./Storage";
import RootFolders from "./RootFolders";
import Separator from "./ui/Separator";

const SideContent = () => {
  return (
    <div className="flex flex-col min-w-[220px] h-full bg-primary rounded-md gap-2 p-4">
      <Create />
      <Separator />
      <RootFolders />
      <Separator />
      <Storage />
    </div>
  );
};

export default SideContent;
