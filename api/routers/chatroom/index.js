import { Router } from "express";
import { openChatRoom } from "./mutation.js";

const chatRoomRouter = Router();

chatRoomRouter.post("/", openChatRoom);

export default chatRoomRouter;
