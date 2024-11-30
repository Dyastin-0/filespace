import Button from "./ui/Button";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="flex flex-col w-[350px] max-w-[90%] h-fit bg-primary rounded-md p-4 gap-4">
      <p className="text-xs text-primary-foreground font-bold break-words">
        {message}
      </p>
      <div className="flex w-full justify-end gap-2">
        <Button variant="ghost" text="No" onClick={onCancel} />
        <Button text="Yes" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default ConfirmDialog;
