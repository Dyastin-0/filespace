import { createContext, useContext } from "react";
import useSWR from "swr";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import generateFileTreeWithMap from "../helpers/tree";

const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const { api, isAxiosReady } = useAxios();
  const { user, token } = useAuth();

  const { data: files, mutate } = useSWR(
    isAxiosReady && user && token ? `${user._id}/files` : null,
    async () => {
      const response = await api.get("/files");
      return generateFileTreeWithMap(response.data || []);
    },
    {
      revalidateOnFocus: false,
    }
  );

  const value = { files: files?.tree, fileMap: files?.map, mutate };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
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
