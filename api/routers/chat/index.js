import { Router } from "express";

const chatRouter = Router();

function createChatRoom(req, res) {
  const { roomId } = req.params;

  return res.json({
    roomId,
  });
}

function sendMessage(req, res) {
  const { roomId } = req.params;

  return res.json({
    roomId,
  });
}

function closeChatRoom(req, res) {
  const { roomId } = req.params;

  return res.json({
    roomId,
  });
}

chatRouter.post("/create-room/:roomId", createChatRoom);
chatRouter.post("/send-message/:roomId", sendMessage);
chatRouter.post("/close-room/:roomId", closeChatRoom);

export default chatRouter;
