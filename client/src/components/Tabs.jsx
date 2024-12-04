import useTabs from "../hooks/useTabs";
import Tooltip from "./ui/Tooltip";

const Tabs = () => {
  const { tabs, currentTab, switchTab } = useTabs();

  return tabs.map((tab) => (
    <Tooltip key={tab.path} text={`Navigate to ${tab.name}`}>
      <div
        className={`w-fit p-2 cursor-pointer rounded-md transition-all duration-300
          hover:bg-secondary ${
            tab.path === currentTab?.path
              ? "bg-secondary text-highlight"
              : "text-primary-foreground"
          }`}
        onClick={() => switchTab(tab)}
      >
        {tab.name}
      </div>
    </Tooltip>
  ));
};

export default Tabs;
