import express from "express";
import { handleAuth, handleGoogleAuth } from "../controllers/auth.js";
import handleRefreshAccessToken from "../controllers/refreshAccessToken.js";
import handleSignout from "../controllers/signout.js";
import handleSignup from "../controllers/signup.js";
import {
  handleSendVerification,
  handleVerifyEmail,
} from "../controllers/security.js";

const router = express.Router();

router.post("/", handleAuth);
router.get("/refresh", handleRefreshAccessToken);
router.post("/sign-up", handleSignup);
router.post("/sign-out", handleSignout);
router.post("/verify", handleVerifyEmail);
router.post("/send/verification", handleSendVerification);

export default router;
