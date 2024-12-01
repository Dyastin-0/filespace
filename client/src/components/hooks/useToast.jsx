import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, color) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, color }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed flex flex-col bottom-5 gap-3 left-[50%] transform -translate-x-1/2 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              color={toast.color}
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const { addToast } = useContext(ToastContext);

  const toastSuccess = (message) => addToast(message, "text-success");
  const toastError = (message) => addToast(message, "text-danger");
  const toastInfo = (message) => addToast(message, "text-primary-foreground");

  return { toastSuccess, toastError, toastInfo };
};

const Toast = ({ message, onClose, id, color = "text-primary-foreground" }) => {
  return (
    <motion.div
      key={id}
      initial={{
        y: 5,
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: 999,
      }}
      className={`flex justify-between border border-secondary-accent items-center gap-2
      bg-secondary text-xs ${color} font-semibold rounded-md p-2 relative`}
    >
      <p>{message}</p>
      <Button
        variant="default_rounded"
        onClick={onClose}
        icon={faX}
        className="justify-between"
      />
    </motion.div>
  );
};

export default useToast;
