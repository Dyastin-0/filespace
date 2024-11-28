import useAxios from "../hooks/useAxios";
import useSWR from "swr";
import useAuth from "../hooks/useAuth";
import generateFileTree from "../helpers/tree";
import SideContent from "../components/SideContent";
import MainContent from "../components/MainConent";

const Home = () => {
  const { api, isAxiosReady } = useAxios();

  const { user } = useAuth();

  const { data: files } = useSWR(
    isAxiosReady && user ? `${user._id}/files` : null,
    async () => {
      const response = await api.get("/files");
      return response.data;
    },
    {
      onSuccess: (data) => generateFileTree(data),
    }
  );

  return (
    <div className="flex w-full h-full gap-4 p-4">
      <SideContent />
      <MainContent files={files} />
    </div>
  );
};

export default Home;
