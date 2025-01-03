import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useToast from "../components/hooks/useToast";

const Recovery = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [sendingLink, setSendingLink] = useState(false);
  const [email, setEmail] = useState("");
  const { toastError, toastInfo } = useToast();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSendingLink(true);
    try {
      await axios.post("/auth/send-recovery", { email });
      toastInfo("Recovery link sent!");
      setEmail("");
      navigate("/sign-in");
    } catch (error) {
      const errorMessage =
        error.response.data || "Failed to send recovery link.";
      toastError(`${errorMessage}`);
      console.error(error);
    } finally {
      setSendingLink(false);
    }
  };

  return (
    <div
      className="flex flex-col p-4 justify-center items-center h-full w-full
      text-primary-foreground bg-primary rounded-md"
    >
      <Helmet>
        <title>Account Recovery</title>
      </Helmet>
      <form
        className="flex flex-col w-[250px] max-w-full p-4 gap-4 text-xs text-primary-foreground
        border border-secondary-accent rounded-md"
        onSubmit={submit}
      >
        <h2 className="w-full text-center text-lg font-bold">
          Account Recovery
        </h2>
        <p className="text-primary-foreground text-xs">
          Enter your email address to receive a recovery link.
        </p>
        <Input
          required={true}
          type="email"
          placeholder="Email"
          id="email"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          disabled={sendingLink}
          text={`${sendingLink ? "Sending..." : "Send Recovery Link"}`}
        />
      </form>
    </div>
  );
};

export default Recovery;
