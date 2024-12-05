import React, { useState } from "react";
import GenericModal from "./GenericModal";
import Button from "../ui/Button";
import NormalInput from "../ui/NormalInput";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useConfirm from "../hooks/useConfirm";
import useToast from "../hooks/useToast";
import { testEmail } from "../../helpers/regex";
import useAxios from "../../hooks/useAxios";
import { Dropdown, DropdownItem } from "../ui/Dropdown";
import Checkbox from "../ui/Checkbox";
import Tooltip from "../ui/Tooltip";

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

const SendFile = ({ file }) => {
  const confirm = useConfirm();
  const { toastInfo } = useToast();
  const { api } = useAxios();

  const [expiration, setExpiration] = useState(expirationOptions[0].value);

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
          .post("/files/send", {
            email,
            file: file.path,
            expiration: expiration,
          })
          .then(() => {
            toastInfo(`Sent ${file.name}`);
          });
      },
    });
  };

  return (
    <GenericModal title={`Send ${file.name}`}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <NormalInput placeholder="Email" type="email" />
        <div className="flex flex-col flex-wrap gap-2">
          <h2 className="text-xs font-semibold">Link expiration</h2>
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
        <Button type="submit" text="Send" icon={faEnvelope} />
      </form>
    </GenericModal>
  );
};

export default SendFile;
