import { faker } from "@faker-js/faker";
import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import { Id } from "../../domain/values/Id";
import { ChatDto } from "../dtos/ChatDto";
import { MessageDto } from "../dtos/MessageDto";
import { EventEmitter, Readable } from "stream";

const data = createFakeData();

const NewMessageEvent = "newMessage";

export class ChatsService {
  newMessagesEventEmitter = new EventEmitter();

  constructor() {}

  async listChats(): Promise<ChatDto[]> {
    const chats = [...data.chats];
    chats.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());

    return chats.map((chat) => new ChatDto(chat));
  }

  async getChat(id: string): Promise<ChatDto> {
    const chat = data.chats.find((c) => c.id.value === id);
    if (!chat) throw new Error("Chat not found");
    return new ChatDto(chat);
  }

  async listRecentMessages(chatId: string, limit: number) {
    const messages = data.messages.filter((m) => m.chatId.value === chatId);
    messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return messages.slice(-limit).map((m) => new MessageDto(m));
  }

  async listRecentMessagesStream(chatId: string) {
    const stream = new Readable({ objectMode: true, read() {} });

    const messages = data.messages
      .filter((m) => m.chatId.value === chatId)
      .map((m) => new MessageDto(m));

    for (const message of messages) {
      stream.push(message);
    }

    function onNewMessage(message: MessageDto) {
      if (message.chatId === chatId) {
        stream.push(message);
      }
    }
    this.newMessagesEventEmitter.on(NewMessageEvent, onNewMessage);
    stream.on("end", () => {
      this.newMessagesEventEmitter.off(NewMessageEvent, onNewMessage);
    });

    return stream;
  }

  async sendMessage({
    chatId,
    userId,
    content,
  }: {
    chatId: string;
    userId: string;
    content: string;
  }) {
    const chat = data.chats.find((c) => c.id.value === chatId);
    if (!chat) throw new Error("Chat not found");

    const user = data.users.find((u) => u.value === userId);
    if (!user) throw new Error("User not found");

    const newMessage = new Message(new Id(), user, chat.id, content);
    data.messages.push(newMessage);

    chat.updatedAt = new Date();

    const messageDto = new MessageDto(newMessage);

    this.newMessagesEventEmitter.emit(NewMessageEvent, messageDto);

    return messageDto;
  }
}

function createFakeData() {
  const users = Array.from({ length: 10 }).map(() => new Id());

  const chats = Array.from({ length: 10 }).map(
    () => new Chat(new Id(), faker.lorem.sentence())
  );

  const messages = Array.from({ length: 200 }).map(
    () =>
      new Message(
        new Id(),
        users[Math.floor(Math.random() * users.length)],
        chats[Math.floor(Math.random() * chats.length)].id,
        faker.lorem.sentence(),
        faker.date.recent()
      )
  );

  return { users, chats, messages };
}
