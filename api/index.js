import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
// import sockertIO from "socket.io";
import routers from "./routers/index.js";
import swaggerDocs from "./routers/swagger.js";
// import { sendMessage } from "./routers/chatroom/mutation.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE || "PROD";

const httpServer = http.createServer(app);

// const io = sockertIO(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

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
// });

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${MODE} mode`);
  swaggerDocs(app, PORT);
});
