"use client";
import { useState } from "react";

export function MessageSender({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) {
  const [message, setMessage] = useState("");

  async function sendMessage() {
    const res = await fetch(`/api/chats/${chatId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message, userId }),
    });
    if (!res.ok) {
      throw new Error("Failed to send message");
    }
    setMessage("");
  }

  return (
    <div className="p-2 flex space-x-2 bg-base-300">
      <input
        className="flex-1 input input-bordered input-sm"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="btn btn-primary btn-sm" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
