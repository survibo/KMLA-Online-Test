import { useState } from "react"
import { ArrowLeft, CircleAlert, Plus, SendHorizonal } from "lucide-react"

import { ChatMessage } from "@/blocks/chat/message"
import { ChatAvatar } from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import type { ChatRoomScreenData } from "./types"

type ChatRoomProps = {
  data: ChatRoomScreenData
  className?: string
}

export function ChatRoom({ data, className }: ChatRoomProps) {
  const [draftMessage, setDraftMessage] = useState("")

  return (
    <section
      className={cn(
        "flex h-screen flex-col overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
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
          className="rounded-full text-text-faint hover:bg-muted hover:text-text-strong"
          aria-label="Room info"
        >
          <CircleAlert className="size-5" strokeWidth={2.2} />
        </Button>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden px-0 py-0 sm:px-1">
        <ChatMessage data={data} className="h-full" />
      </div>

      <div className="sticky bottom-0 z-10 bg-background/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
        <div className="flex items-end gap-2 rounded-[1.75rem] bg-muted px-3 py-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
            aria-label="Add attachment"
          >
            <Plus className="size-5" strokeWidth={2.3} />
          </Button>
          <Textarea
            placeholder="메시지 입력"
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            rows={1}
            enterKeyHint="enter"
            className="min-h-9 max-h-32 resize-none border-0 bg-transparent px-0 py-2 shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            size="icon"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Send message"
          >
            <SendHorizonal className="size-4" strokeWidth={2.3} />
          </Button>
        </div>
      </div>
    </section>
  )
}
