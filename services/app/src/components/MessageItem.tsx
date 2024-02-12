import { Message } from "@/dtos/Message";

export function MessageItem({ message }: { message: Message }) {
  const isMyMessage = Math.random() > 0.5;

  const time = new Date(message.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble ${
          isMyMessage && "bg-primary text-primary-content"
        }`}
      >
        <div className="chat-header">
          <span className={`font-bold ${!isMyMessage && "text-primary"}`}>
            {isMyMessage ? "You" : "Obi-Wan Kenobi"}
          </span>
          <time className="text-xs opacity-50 ml-2">{time}</time>
        </div>
        {message.content}
      </div>
    </div>
  );
}
