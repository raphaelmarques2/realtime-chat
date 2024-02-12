import { MessageList } from "@/components/MessageList";
import { MessageListStream } from "@/components/MessageListStream";
import { MessageSender } from "@/components/MessageSender";
import { Chat } from "@/dtos/Chat";
import Link from "next/link";

async function getData(id: string) {
  const chatUrl = process.env.CHAT_URL;

  const res = await fetch(`${chatUrl}/api/chats/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const chat: Chat = await res.json();

  return { chat };
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { chat } = await getData(params.id);

  const isStream = true;

  return (
    <main className="flex flex-col h-screen">
      <div className="flex items-center space-x-2">
        <Link href="/chats" className="btn btn-secondary btn-sm">
          Back
        </Link>
        <h1>{chat.name}</h1>
      </div>
      <div id="messageList" className="flex-1 overflow-y-auto p-4">
        {isStream ? (
          <MessageListStream chatId={chat.id} />
        ) : (
          <MessageList chatId={chat.id} />
        )}
      </div>
      <MessageSender chatId={chat.id} userId={"1"} />
    </main>
  );
}
