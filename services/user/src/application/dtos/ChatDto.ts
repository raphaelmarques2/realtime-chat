import { Chat } from "../../domain/entities/Chat";

export class ChatDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(chat: Chat) {
    this.id = chat.id.value;
    this.name = chat.name;
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
  }
}
