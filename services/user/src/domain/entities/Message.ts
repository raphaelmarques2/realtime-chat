import { Id } from "../values/Id";

export class Message {
  id: Id;
  userId: Id;
  chatId: Id;
  content: string;
  createdAt: Date;

  constructor(
    id: Id,
    userId: Id,
    chatId: Id,
    content: string,
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.chatId = chatId;
    this.content = content;
    this.createdAt = createdAt ?? new Date();
  }
}
