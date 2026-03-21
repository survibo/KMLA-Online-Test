import { ArrowLeft, CircleAlert, Plus, SendHorizonal } from "lucide-react"

import { ChatMessage } from "@/blocks/chat/message"
import { ChatAvatar } from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import type { ChatRoomScreenData } from "./types"

type ChatRoomProps = {
  data: ChatRoomScreenData
  className?: string
}

export function ChatRoom({ data, className }: ChatRoomProps) {
  return (
    <section
      className={cn(
        "flex h-screen flex-col overflow-hidden bg-white text-zinc-950",
        className
      )}
    >
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-300 bg-white/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" strokeWidth={2.3} />
        </Button>
        <ChatAvatar user={data.participant} className="size-11" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[1.08rem] font-semibold tracking-tight">
            {data.room_name}
          </h1>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-zinc-500"
          aria-label="Room info"
        >
          <CircleAlert className="size-5" strokeWidth={2.2} />
        </Button>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden px-0 py-0 sm:px-1">
        <ChatMessage data={data} className="h-full" />
      </div>

      <div className="sticky bottom-0 z-10 bg-white/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
            aria-label="Add attachment"
          >
            <Plus className="size-5" strokeWidth={2.3} />
          </Button>
          <Input
            placeholder="메시지 입력"
            className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            size="icon"
            className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
            aria-label="Send message"
          >
            <SendHorizonal className="size-4" strokeWidth={2.3} />
          </Button>
        </div>
      </div>
    </section>
  )
}
