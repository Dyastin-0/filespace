import SideContent from "../components/SideContent";
import MainContent from "../components/MainConent";

const Home = () => {
  return (
    <div className="flex w-full h-full gap-4 p-4">
      <SideContent />
      <MainContent />
    </div>
  );
};

export default Home;
