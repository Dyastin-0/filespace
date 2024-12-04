import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import TruncatedText from "../ui/TruncatedText";

const GenericModal = ({ title, children }) => {
  const { setOpen } = useModal();

  return (
    <div
      className="relative flex flex-col w-[400px] max-w-full p-4 gap-4 rounded-md bg-primary
			text-xs text-primary-foreground border border-secondary-accent overfflow-hidden z-50"
    >
      <div className="flex items-end font-bold gap-2 text-sm">
        <div className="flex-1 min-w-0">
          <TruncatedText text={title} />
        </div>
        <Button
          icon={faX}
          onClick={() => setOpen(false)}
          variant="ghost"
          className="w-fit"
        />
      </div>

      {children}
    </div>
  );
};

export default GenericModal;
