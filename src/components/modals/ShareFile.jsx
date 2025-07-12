import React, { useEffect, useRef, useState } from "react";
import GenericModal from "./GenericModal";
import Button from "../ui/Button";
import NormalInput from "../ui/NormalInput";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import useConfirm from "../hooks/useConfirm";
import useToast from "../hooks/useToast";
import { testEmail } from "../../helpers/regex";
import useAxios from "../../hooks/useAxios";
import Checkbox from "../ui/Checkbox";
import Tooltip from "../ui/Tooltip";
import useModal from "../hooks/useModal";

const expirationOptions = [
  {
    value: 30 * 60 * 1000,
    text: "30 minutes",
  },
  {
    value: 60 * 60 * 1000,
    text: "an hour",
  },
  {
    value: 24 * 60 * 60 * 1000,
    text: "a day",
  },
  {
    value: 7 * 24 * 60 * 60 * 1000,
    text: "a week",
  },
];

const ShareFile = ({ file }) => {
  const confirm = useConfirm();
  const { toastInfo } = useToast();
  const { api } = useAxios();
  const { setOpen } = useModal();

  const [expiration, setExpiration] = useState(expirationOptions[0]);

  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    if (!testEmail(email)) return toastInfo("Invalid email.");

    confirm({
      title: `Send ${file.name}`,
      message: `Are you sure you want to send ${file.name} to ${e.target[0].value}?`,
      onConfirm: () => {
        toastInfo(`Sending ${file.name}...`);
        api
          .post("/files/share", {
            email,
            file: file.path,
            expiration: expiration,
          })
          .then(() => {
            toastInfo(`Sent ${file.name}`);
          })
          .catch((error) => {
            toastInfo(error.response.data);
          });
      },
    });
  };

  return (
    <GenericModal title={`Share ${file.name}`}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h2 className="text-xs text-secondary-foreground">Send to</h2>
        <NormalInput ref={inputRef} placeholder="Email" type="email" />
        <div className="flex flex-col flex-wrap gap-2">
          <h2 className="text text-secondary-foreground">Link expiration</h2>
          <div className="flex flex-wrap gap-2">
            {expirationOptions.map((option) => (
              <Tooltip key={option.value} text={`Expires in ${option.text}`}>
                <Checkbox
                  name={option.text}
                  value={expiration.value === option.value}
                  onChecked={(e) => {
                    e.preventDefault();
                    setExpiration(option);
                  }}
                />
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 justify-end w-full">
          <Button
            text="Cancel"
            type="button"
            onClick={() => setOpen(false)}
            variant="ghost"
          />
          <Tooltip text="Copy link to clipboard">
            <Button
              className="w-full"
              type="button"
              text="Copy link"
              icon={faLink}
              onClick={() => {
                navigator.clipboard.writeText(file.link);
                toastInfo("Link copied.");
              }}
            />
          </Tooltip>
          <Tooltip text="Send email">
            <Button
              className="w-full"
              type="submit"
              text="Send"
              icon={faEnvelope}
            />
          </Tooltip>
        </div>
      </form>
    </GenericModal>
  );
};

export default ShareFile;
