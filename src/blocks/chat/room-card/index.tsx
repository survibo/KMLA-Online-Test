import { cn } from "@/lib/utils"
import {
  ChatRoomAvatar,
  getChatRoomDisplayName,
} from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"

import type { ChatRoomCardRoom } from "./types"

type ChatRoomCardProps = {
  room: ChatRoomCardRoom
  currentUserId: string
  className?: string
  onClick?: () => void
}

export function ChatRoomCard({
  room,
  currentUserId,
  className,
  onClick,
}: ChatRoomCardProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="default"
      onClick={onClick}
      aria-label={`${getChatRoomDisplayName(room, currentUserId)} 채팅방 열기`}
      className={cn(
        "h-auto w-full cursor-pointer items-center justify-start gap-4 rounded-[1.75rem] px-4 py-3 text-left hover:bg-muted active:bg-muted/80",
        className
      )}
    >
      <ChatRoomAvatar
        room={room}
        currentUserId={currentUserId}
        className="size-14"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[1.05rem] font-semibold tracking-tight text-text-strong">
            {getChatRoomDisplayName(room, currentUserId)}
          </p>
          {room.has_unread ? (
            <span className="size-3 shrink-0 rounded-full bg-emerald-300" />
          ) : null}
        </div>

        <p className="mt-1 line-clamp-1 text-[0.98rem] leading-6 text-text-soft">
          {room.preview_message?.content ?? "아직 메시지가 없습니다."}
        </p>
      </div>
    </Button>
  )
}
