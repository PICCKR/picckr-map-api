import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routers from "./routers/index.js";
import swaggerDocs from "./routers/swagger.js";
// import { sendMessage } from "./routers/chatroom/mutation.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE || "PROD";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

// io.on("connection", (socket) => {
//   console.log("A user connected, socket id: ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("A user disconnected, socket id: ", socket.id);
//   });

//   // Handle custom events here
//   socket.on("send-message", async (messageData) => {
//     try {
//       let message = await sendMessage(messageData);
//       io.to(messageData.chatRoomId).emit("new-message", message);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${MODE} mode`);
  swaggerDocs(app, PORT);
});
