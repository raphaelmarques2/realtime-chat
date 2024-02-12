"use client";

import { Message } from "@/dtos/Message";
import { useEffect, useState } from "react";
import { MessageItem } from "./MessageItem";

export function MessageListStream({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/chats/${chatId}/sse-messages`);

    eventSource.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => eventSource.close();
  }, [chatId]);

  useEffect(() => {
    const messageList = document.getElementById("messageList");
    if (!messageList) return;

    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

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
