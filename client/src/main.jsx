import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { ModalProvider } from "./components/hooks/useModal.jsx";
import { FilesProvider } from "./hooks/useFiles.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ModalProvider>
        <ToastProvider>
          <FilesProvider>
            <App />
          </FilesProvider>
        </ToastProvider>
      </ModalProvider>
    </BrowserRouter>
  </AuthProvider>
);
