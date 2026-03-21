import { useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { ChatAvatar } from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"

import type { ChatMessageThreadData } from "./types"

type ChatMessageProps = {
  data: ChatMessageThreadData
  className?: string
}

function formatChatDividerLabel(isoString: string) {
  const date = new Date(isoString)

  if (Number.isNaN(date.getTime())) return isoString

  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

function shouldShowDivider(previousCreatedAt: string | undefined, createdAt: string) {
  if (!previousCreatedAt) return true

  const previous = new Date(previousCreatedAt).getTime()
  const current = new Date(createdAt).getTime()

  return current - previous >= 1000 * 60 * 60 * 5
}

function isSeparatedByLongGap(
  previousCreatedAt: string | undefined,
  createdAt: string
) {
  if (!previousCreatedAt) return true

  const previous = new Date(previousCreatedAt).getTime()
  const current = new Date(createdAt).getTime()

  return current - previous >= 1000 * 60 * 60 * 5
}

export function ChatMessage({ data, className }: ChatMessageProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)

  function updateScrollState(node: HTMLDivElement) {
    const distanceFromBottom =
      node.scrollHeight - node.scrollTop - node.clientHeight

    setShowScrollToBottom(distanceFromBottom > 160)
  }

  useLayoutEffect(() => {
    const node = scrollContainerRef.current

    if (!node) return

    node.scrollTop = node.scrollHeight
    updateScrollState(node)
  }, [data.messages])

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div
        ref={scrollContainerRef}
        onScroll={(event) => updateScrollState(event.currentTarget)}
        className="h-full w-full overflow-y-auto px-2 py-1 text-zinc-950"
      >
        <div className="w-full pb-7">
          {data.messages.map((message, index) => {
            const isOwn = message.sender_id === data.current_user_id
            const previousMessage = data.messages[index - 1]
            const nextMessage = data.messages[index + 1]
            const hasLongGapFromPrevious = isSeparatedByLongGap(
              previousMessage?.created_at,
              message.created_at
            )
            const hasLongGapToNext = nextMessage
              ? isSeparatedByLongGap(message.created_at, nextMessage.created_at)
              : true
            const isContinuation =
              previousMessage?.sender_id === message.sender_id && !hasLongGapFromPrevious
            const continuesToNext =
              nextMessage?.sender_id === message.sender_id && !hasLongGapToNext
            const showDivider = shouldShowDivider(
              previousMessage?.created_at,
              message.created_at
            )
            const showName = !isOwn && (!isContinuation || showDivider)
            const showAvatar =
              !isOwn &&
              (nextMessage?.sender_id !== message.sender_id || hasLongGapToNext)

            return (
              <div
                key={message.id}
                className={cn(
                  "space-y-1.5",
                  isContinuation ? "mt-0.5" : index === 0 ? "" : "mt-6"
                )}
              >
                {showDivider ? (
                  <div className="flex items-center justify-center py-1.5">
                    <p className="text-[0.82rem] font-medium text-zinc-400">
                      {formatChatDividerLabel(message.created_at)}
                    </p>
                  </div>
                ) : null}

                {showName ? (
                  <p className="pl-14 text-[0.95rem] font-medium text-zinc-500">
                    {message.sender.name}
                  </p>
                ) : null}

                <div
                  className={cn(
                    "flex items-end gap-2.5",
                    isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  {!isOwn ? (
                    showAvatar ? (
                      <ChatAvatar user={message.sender} className="size-10 shrink-0" />
                    ) : (
                      <div className="w-10 shrink-0" />
                    )
                  ) : null}

                  <div
                    className={cn(
                      "flex max-w-[76%] flex-col",
                      isOwn ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-full rounded-[1.45rem] px-3.5 py-2 text-left text-[0.98rem] leading-[1.45]",
                        isOwn && isContinuation && "rounded-tr-md",
                        isOwn && continuesToNext && "rounded-br-md",
                        !isOwn && isContinuation && "rounded-tl-md",
                        !isOwn && continuesToNext && "rounded-bl-md",
                        isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-100 text-zinc-800"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-keep [overflow-wrap:anywhere]">
                        {message.content}
                      </p>
                    </div>

                    {isOwn && nextMessage?.sender_id !== message.sender_id ? (
                      <p className="pr-1 text-[0.8rem] font-medium text-indigo-500">
                        {message.is_edited ? "수정됨" : ""}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showScrollToBottom ? (
        <Button
          type="button"
          size="icon"
          className="absolute bottom-5 left-1/2 z-10 size-11 -translate-x-1/2 rounded-full bg-white text-zinc-700 shadow-md hover:bg-zinc-50"
          onClick={() => {
            const node = scrollContainerRef.current

            if (!node) return

            node.scrollTo({
              top: node.scrollHeight,
              behavior: "smooth",
            })
          }}
          aria-label="Scroll to latest message"
        >
          <ChevronDown className="size-5" strokeWidth={2.4} />
        </Button>
      ) : null}
    </div>
  )
}
