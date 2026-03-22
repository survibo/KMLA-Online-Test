import { useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { ChatAvatar } from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"
import { formatIsoDateTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"

import type { ChatMessageThreadData } from "./types"

type ChatMessageProps = {
  data: ChatMessageThreadData
  className?: string
}

function formatChatDividerLabel(isoString: string) {
  return formatIsoDateTime(isoString)
}

function hasLongGap(previousCreatedAt: string | undefined, createdAt: string) {
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
        className="h-full w-full overflow-y-auto px-1 py-4 text-text-strong [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-2"
      >
        <div className="pb-10">
          {data.messages.map((message, index) => {
            const previousMessage = data.messages[index - 1]
            const nextMessage = data.messages[index + 1]
            const isOwn = message.sender_id === data.current_user_id
            const startsNewBlock =
              previousMessage?.sender_id !== message.sender_id ||
              hasLongGap(previousMessage?.created_at, message.created_at)
            const endsBlock =
              nextMessage?.sender_id !== message.sender_id ||
              hasLongGap(message.created_at, nextMessage?.created_at ?? "")
            const showDivider = hasLongGap(
              previousMessage?.created_at,
              message.created_at
            )

            return (
              <div
                key={message.id}
                className={cn(
                  index === 0 ? "" : startsNewBlock ? "mt-3" : "mt-0.5"
                )}
              >
                {showDivider ? (
                  <div className="mb-6 text-center text-xs font-medium text-text-faint">
                    {formatChatDividerLabel(message.created_at)}
                  </div>
                ) : null}

                {!isOwn && startsNewBlock ? (
                  <div className="mb-0.5 pl-13 text-[0.8125rem] font-normal text-text-faint">
                    {message.sender.name}
                  </div>
                ) : null}

                <div
                  className={cn(
                    "flex items-end",
                    isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      isOwn
                        ? "max-w-[70%]"
                        : "relative max-w-[70%] pl-11"
                    )}
                  >
                    {!isOwn && endsBlock ? (
                      <ChatAvatar
                        user={message.sender}
                        className="absolute bottom-0 left-0 size-9"
                      />
                    ) : null}

                    <div
                      className={cn(
                        "inline-block max-w-full px-4 py-2.5 text-[0.9375rem] leading-[1.45] shadow-none",
                        startsNewBlock
                          ? "rounded-t-[22px]"
                          : isOwn
                            ? "rounded-tr-[8px]"
                            : "rounded-tl-[8px]",
                        endsBlock
                          ? "rounded-b-[22px]"
                          : isOwn
                            ? "rounded-br-[8px]"
                            : "rounded-bl-[8px]",
                        isOwn ? "rounded-l-[22px]" : "rounded-r-[22px]",
                        isOwn
                          ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                          : "bg-muted text-text-strong"
                      )}
                    >
                      <span className="whitespace-normal break-keep [overflow-wrap:anywhere]">
                        {message.content}
                      </span>
                    </div>
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
          className="absolute bottom-5 left-1/2 z-10 size-11 -translate-x-1/2 rounded-full border border-border bg-background text-text-faint shadow-md hover:bg-muted hover:text-text-strong"
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
