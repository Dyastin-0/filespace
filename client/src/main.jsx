import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { ModalProvider } from "./components/hooks/useModal.jsx";
import { FilesProvider } from "./hooks/useFiles.jsx";
import { TabProvider } from "./hooks/useTabs.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <FilesProvider>
        <TabProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </TabProvider>
      </FilesProvider>
    </AuthProvider>
  </ToastProvider>
);
