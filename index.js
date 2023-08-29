import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
