"use client";

import { Message } from "@/dtos/Message";
import { useEffect, useState } from "react";
import { MessageItem } from "./MessageItem";

async function fetchMessages(chatId: string) {
  const res = await fetch(`/api/chats/${chatId}/messages`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const messages: Message[] = await res.json();
  return messages;
}

export function MessageList({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchData() {
      const messages = await fetchMessages(chatId);
      setMessages(messages);
    }
    fetchData();
  }, [chatId]);

  return (
    <div>
      <div>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
