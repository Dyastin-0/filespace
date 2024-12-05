import React from "react";
import GenericModal from "./GenericModal";
import Button from "../ui/Button";
import NormalInput from "../ui/NormalInput";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useConfirm from "../hooks/useConfirm";
import useToast from "../hooks/useToast";
import { testEmail } from "../../helpers/regex";
import useAxios from "../../hooks/useAxios";

const SendFile = ({ file }) => {
  const confirm = useConfirm();
  const { toastInfo } = useToast();
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    if (!testEmail(email)) return toastInfo("Invalid email.");

    confirm({
      title: `Send ${file.name}`,
      message: `Are you sure you want to send ${file.name} to ${e.target[0].value}?`,
      onConfirm: () => {
        toastInfo(`Sending ${file.name}...`);
        api.post("/files/send", { email, file: file.path }).then(() => {
          toastInfo(`Sent ${file.name}`);
        });
      },
    });
  };

  return (
    <GenericModal title={`Send ${file.name}`}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <NormalInput placeholder="Email" type="email" />
        <Button type="submit" text="Send" icon={faEnvelope} />
      </form>
    </GenericModal>
  );
};

export default SendFile;
