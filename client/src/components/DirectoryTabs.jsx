const DirectoryTabs = ({ tabs, handleTabClick, currentTabIndex }) => {
  return (
    <div className="flex overflow-x-auto border-secondary gap-2">
      {tabs.map((tab, index) => (
        <div
          key={tab.path}
          className={`w-fit p-2 cursor-pointer rounded-md
							transition-all duration-300 
							${
                index === currentTabIndex
                  ? "bg-secondary text-highlight"
                  : "text-primary-foreground"
              }`}
          onClick={() => handleTabClick(index)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default DirectoryTabs;
