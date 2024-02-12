import cors from "cors";
import express from "express";
import "express-async-errors";
import { ChatsService } from "./application/services/ChatsService";

const app = express();

app.use(express.json());
app.use(cors());

const chatsService = new ChatsService();

app.get("/", (req, res) => {
  res.send("user service 4");
});

app.get("/api/users", async (req, res) => {
  res.json([
    { id: "1", name: "Anderson" },
    { id: "2", name: "Barbara" },
    { id: "3", name: "Carlos" },
    { id: "4", name: "Daniel" },
    { id: "5", name: "Elise" },
  ]);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
