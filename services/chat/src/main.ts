import cors from "cors";
import express, { Router } from "express";
import "express-async-errors";
import { ChatsService } from "./application/services/ChatsService";

import dotenv from "dotenv";
import { createRouter } from "./router";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const chatsService = new ChatsService();

app.get("/", (req, res) => {
  res.send("chat service");
});

app.use("/api", createRouter({ chatsService }));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  console.log(`DB_URL: ${process.env.DB_URL}`);
});
