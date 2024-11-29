import { createContext, useContext } from "react";
import useSWR from "swr";
import generateFileTree from "../helpers/tree";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const { api, isAxiosReady } = useAxios();
  const { user } = useAuth();

  const { data: files, mutate } = useSWR(
    isAxiosReady && user ? `${user._id}/files` : null,
    async () => {
      const response = await api.get("/files");
      return generateFileTree(response.data);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <FilesContext.Provider value={{ files, mutate }}>
      {children}
    </FilesContext.Provider>
  );
};

const useFiles = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider");
  }
  return context;
};

export default useFiles;
