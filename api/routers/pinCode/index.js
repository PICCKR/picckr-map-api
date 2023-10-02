import { Router } from "express";
import { createPinCode, verifyPinCode } from "./mutation.js";

const pinCodeRouter = Router();

pinCodeRouter.post("/", createPinCode);
pinCodeRouter.post("/verify", verifyPinCode);

export default pinCodeRouter;
