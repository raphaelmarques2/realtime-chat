import { Message } from "../../domain/entities/Message";

export class MessageDto {
  id: string;
  userId: string;
  chatId: string;
  content: string;
  createdAt: Date;

  constructor(message: Message) {
    this.id = message.id.value;
    this.userId = message.userId.value;
    this.chatId = message.chatId.value;
    this.content = message.content;
    this.createdAt = message.createdAt;
  }
}
