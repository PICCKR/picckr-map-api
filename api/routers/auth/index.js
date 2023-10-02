import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  signIn,
  logout,
  signUp,
  verify,
} from "./mutation.js";

const authRouter = Router();

authRouter.post("/", signUp);
authRouter.post("/login", signIn);
authRouter.post("/verify", verify);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/logout", logout);

export default authRouter;
