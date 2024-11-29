import useTabs from "../hooks/useTabs";

const DirectoryTabs = ({ tabs, currentTab }) => {
  const { switchTab } = useTabs();

  return (
    <div className="flex overflow-x-auto border-secondary">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`w-fit p-2 cursor-pointer rounded-md transition-all duration-300 ${
            tab.path === currentTab?.path
              ? "bg-secondary text-highlight"
              : "text-primary-foreground"
          }`}
          onClick={() => switchTab(tab)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default DirectoryTabs;
