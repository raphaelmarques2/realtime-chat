import { Router } from "express";
import { ChatsService } from "./application/services/ChatsService";

export function createRouter({ chatsService }: { chatsService: ChatsService }) {
  const router = Router();

  router.get("/chats", async (req, res) => {
    const chats = await chatsService.listChats();
    res.json(chats);
  });

  router.get("/chats/:id", async (req, res) => {
    const chat = await chatsService.getChat(req.params.id);
    res.json(chat);
  });

  router.get("/chats/:id/messages", async (req, res) => {
    const messages = await chatsService.listRecentMessages(req.params.id, 10);
    res.json(messages);
  });

  router.post("/chats/:id/messages", async (req, res) => {
    const chatId = req.params.id;
    const { content, userId } = req.body;

    const newMessage = await chatsService.sendMessage({
      chatId,
      userId,
      content,
    });
    res.json(newMessage);
  });

  router.get("/chats/:id/sse-messages", async (req, res) => {
    //return messages as ServerSentEvents
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = await chatsService.listRecentMessagesStream(req.params.id);

    stream.on("data", (message) => {
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    });

    res.on("close", () => {
      stream.emit("end");
      res.end();
    });
  });

  return router;
}
