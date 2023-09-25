import { Router } from "express";
import { deleteChatRoomByTrackerId, openChatRoom } from "./mutation.js";
import { getAllChatRooms, getChatRoomByTrackerId } from "./query.js";

const chatRoomRouter = Router();

chatRoomRouter.post("/", openChatRoom);
chatRoomRouter.get("/", getAllChatRooms);
chatRoomRouter.get("/trackerid/:id", getChatRoomByTrackerId);
chatRoomRouter.delete("/trackerid/:id", deleteChatRoomByTrackerId);

export default chatRoomRouter;
