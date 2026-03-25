import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { ChatAvatar } from "@/blocks/chat/shared"
import { Button } from "@/components/ui/button"
import {
  formatIsoMeridiemTime,
  formatIsoMonthDayMeridiemTime,
  getIsoTimestamp,
  isSameIsoDay,
} from "@/lib/datetime"
import { cn } from "@/lib/utils"

import type { ChatMessageThreadData } from "./types"

type ChatMessageProps = {
  data: ChatMessageThreadData
  className?: string
}

const CHAT_DIVIDER_GAP_MS = 1000 * 60 * 60 * 5
const CHAT_TIME_LABEL_GAP_MS = 1000 * 60 * 60
const SCROLL_TO_BOTTOM_THRESHOLD = 160

function hasLongGap(previousTime: number | null, currentTime: number | null) {
  if (previousTime === null || currentTime === null) return true

  return currentTime - previousTime >= CHAT_DIVIDER_GAP_MS
}

function hasTimeLabelGap(previousTime: number | null, currentTime: number | null) {
  if (previousTime === null || currentTime === null) return false

  return currentTime - previousTime >= CHAT_TIME_LABEL_GAP_MS
}

function createMessageLayout(
  messages: ChatMessageThreadData["messages"],
  currentUserId: string
) {
  const messageTimes = messages.map((message) =>
    message.created_at ? getIsoTimestamp(message.created_at) : null
  )

  return messages.map((message, index) => {
    const previousMessage = messages[index - 1]
    const nextMessage = messages[index + 1]
    const previousTime = index > 0 ? messageTimes[index - 1] : null
    const currentTime = messageTimes[index]
    const nextTime = index < messages.length - 1 ? messageTimes[index + 1] : null
    const isOwn = message.sender_id === currentUserId
    const startsNewBlock =
      previousMessage?.sender_id !== message.sender_id ||
      hasLongGap(previousTime, currentTime)
    const endsBlock =
      nextMessage?.sender_id !== message.sender_id ||
      hasLongGap(currentTime, nextTime)
    const showDateDivider = !isSameIsoDay(
      previousMessage?.created_at,
      message.created_at
    )

    return {
      message,
      isOwn,
      startsNewBlock,
      endsBlock,
      showDateDivider,
      showTimeGapLabel:
        !showDateDivider && hasTimeLabelGap(previousTime, currentTime),
    }
  })
}

export function ChatMessage({ data, className }: ChatMessageProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollStateAnimationFrameRef = useRef<number | null>(null)
  const pendingScrollNodeRef = useRef<HTMLDivElement | null>(null)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const messageLayout = useMemo(
    () => createMessageLayout(data.messages, data.current_user_id),
    [data.messages, data.current_user_id]
  )
  const visibleSelectedMessageId = useMemo(
    () =>
      selectedMessageId &&
      data.messages.some((message) => message.id === selectedMessageId)
        ? selectedMessageId
        : null,
    [data.messages, selectedMessageId]
  )

  function readShouldShowScrollToBottom(node: HTMLDivElement) {
    const distanceFromBottom =
      node.scrollHeight - node.scrollTop - node.clientHeight

    return distanceFromBottom > SCROLL_TO_BOTTOM_THRESHOLD
  }

  function updateScrollState(node: HTMLDivElement) {
    const nextShowScrollToBottom = readShouldShowScrollToBottom(node)

    setShowScrollToBottom((previousShowScrollToBottom) =>
      previousShowScrollToBottom === nextShowScrollToBottom
        ? previousShowScrollToBottom
        : nextShowScrollToBottom
    )
  }

  function scheduleScrollStateUpdate(node: HTMLDivElement) {
    pendingScrollNodeRef.current = node

    if (scrollStateAnimationFrameRef.current !== null) return

    scrollStateAnimationFrameRef.current = window.requestAnimationFrame(() => {
      scrollStateAnimationFrameRef.current = null

      const pendingNode = pendingScrollNodeRef.current

      if (!pendingNode) return

      updateScrollState(pendingNode)
    })
  }

  useLayoutEffect(() => {
    const node = scrollContainerRef.current

    if (!node) return

    node.scrollTop = node.scrollHeight
    updateScrollState(node)
  }, [data.messages])

  useEffect(() => {
    return () => {
      if (scrollStateAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollStateAnimationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div
        ref={scrollContainerRef}
        onScroll={(event) => scheduleScrollStateUpdate(event.currentTarget)}
        className="h-full w-full overflow-y-auto px-1 py-4 text-text-strong [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-2"
      >
        <div className="pb-10">
          {messageLayout.map(
            (
              {
                message,
                isOwn,
                startsNewBlock,
                endsBlock,
                showDateDivider,
                showTimeGapLabel,
              },
              index
            ) => {
              const isSelected = visibleSelectedMessageId === message.id

              return (
                <div
                  key={message.id}
                  className={cn(
                    index === 0 ? "" : startsNewBlock ? "mt-3" : "mt-0.5"
                  )}
                >
                  {showDateDivider ? (
                    <div className="mb-6 text-center text-xs font-medium text-text-faint">
                      {formatIsoMonthDayMeridiemTime(message.created_at)}
                    </div>
                  ) : null}

                  {showTimeGapLabel ? (
                    <div className="mb-3 text-center text-[0.6875rem] font-normal text-text-faint">
                      {formatIsoMeridiemTime(message.created_at)}
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
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`메시지 발송 시각 ${formatIsoMeridiemTime(message.created_at)} 보기`}
                        onClick={() =>
                          setSelectedMessageId((previousSelectedMessageId) =>
                            previousSelectedMessageId === message.id ? null : message.id
                          )
                        }
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" && event.key !== " ") return

                          event.preventDefault()
                          setSelectedMessageId((previousSelectedMessageId) =>
                            previousSelectedMessageId === message.id ? null : message.id
                          )
                        }}
                        className={cn(
                          "inline-block max-w-full cursor-pointer px-4 py-2.5 text-[0.9375rem] leading-[1.45] shadow-none outline-none",
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
                            : "bg-muted text-text-strong",
                          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        )}
                      >
                        <span className="whitespace-normal break-keep wrap-anywhere">
                          {message.content}
                        </span>
                      </div>

                      {isSelected ? (
                        <div
                          className={cn(
                            "mt-1 px-1 text-[0.6875rem] leading-none text-text-faint",
                            isOwn ? "text-left" : "text-right"
                          )}
                        >
                          {formatIsoMeridiemTime(message.created_at)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            }
          )}
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
