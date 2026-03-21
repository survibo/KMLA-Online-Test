import { MessageSquareText } from "lucide-react"

import { ChatRoomCard } from "@/blocks/chat/room-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ChatRoomListData } from "./types"

type ChatRoomListProps = {
  data: ChatRoomListData
  className?: string
}

export function ChatRoomList({ data, className }: ChatRoomListProps) {
  return (
    <section
      className={cn("min-h-screen bg-white text-zinc-950", className)}
    >
      <header className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <MessageSquareText className="size-8 text-zinc-950" strokeWidth={2.2} />
          <h1 className="text-[2rem] leading-none font-semibold tracking-tight">
            {data.title}
          </h1>
        </div>
        <p className="mt-7 text-lg text-zinc-500">{data.subtitle}</p>
      </header>

      <div className="px-2 pb-8">
        {data.rooms.map((room) => (
          <ChatRoomCard
            key={room.id}
            room={room}
            currentUserId={data.current_user_id}
            className="px-4"
          />
        ))}
      </div>

      <div className="px-6 pb-8">
        <Button
          type="button"
          variant="ghost"
          className="h-auto rounded-full px-4 py-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
        >
          더 보기
        </Button>
      </div>
    </section>
  )
}
