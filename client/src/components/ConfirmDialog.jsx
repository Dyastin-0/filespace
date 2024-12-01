import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/Button";

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="flex flex-col w-[350px] max-w-[90%] border border-secondary-accent h-fit bg-primary rounded-md p-4 gap-4">
      <div className="flex justify-between items-end text-sm">
        <h1 className="font-bold">{title}</h1>
        <Button
          variant="default_rounded"
          icon={faX}
          onClick={onCancel}
          className="bg-transparent"
        />
      </div>
      <p className="text-xs text-primary-foreground break-words">{message}</p>
      <div className="flex w-full justify-end gap-2">
        <Button variant="ghost" text="No" onClick={onCancel} />
        <Button text="Yes" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default ConfirmDialog;
