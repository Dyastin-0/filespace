import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import TruncatedText from "../TruncatedText";

const GenericModal = ({ title, children }) => {
  const { setOpen } = useModal();

  return (
    <div
      className="flex flex-col w-[400px] max-w-full p-4 gap-4 rounded-md bg-primary
			text-xs text-primary-foreground border border-secondary-accent"
    >
      <div className="flex justify-between items-end">
        <TruncatedText text={title} className="font-semibold text-sm" />
        <Button icon={faX} onClick={() => setOpen(false)} variant="ghost" />
      </div>
      {children}
    </div>
  );
};

export default GenericModal;
