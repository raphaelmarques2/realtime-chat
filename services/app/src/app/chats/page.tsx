import { Chat } from "@/dtos/Chat";
import Link from "next/link";

async function getData() {
  const chatUrl = process.env.CHAT_URL;

  const res = await fetch(`${chatUrl}/api/chats`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const chats: Chat[] = await res.json();

  return { chats };
}

export default async function ChatsPage() {
  const { chats } = await getData();

  return (
    <main className="">
      <h1>Chats</h1>
      <div className="flex flex-col space-y-1">
        {chats.map((chat) => (
          <Link
            className="w-full btn btn-ghost btn-sm justify-start"
            key={chat.id}
            href={`/chats/${chat.id}`}
          >
            {chat.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
