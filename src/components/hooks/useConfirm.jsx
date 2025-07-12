import { useCallback } from "react";
import useModal from "./useModal";
import ConfirmDialog from "../ConfirmDialog";

const useConfirm = () => {
  const { setModal, setOpen } = useModal();

  const confirm = useCallback(
    ({ title, message, onConfirm }) => {
      setModal(
        <ConfirmDialog
          title={title}
          message={message}
          onConfirm={() => {
            onConfirm();
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      );

      setOpen(true);
    },
    [setModal, setOpen]
  );

  return confirm;
};

export default useConfirm;
