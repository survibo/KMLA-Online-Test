import {
  createChatMockData,
  type ChatMockData,
} from "@/blocks/chat/mock"

import type { ChatRoomCardRoom } from "./types"
import {
  baseChatRoomCardCurrentUserId,
  baseChatRoomCardDefaultRoomId,
  baseChatRoomCardReadRoomId,
  createChatRoomCardRoomFromMockData,
} from "./mock"

export type ChatRoomCardScenario = {
  id: string
  label: string
  description: string
  currentUserId: string
  roomId: string
  rawData: ChatMockData
  room: ChatRoomCardRoom
}

function createChatRoomCardScenario({
  id,
  label,
  description,
  roomId,
  currentUserId = baseChatRoomCardCurrentUserId,
  dataOverrides = {},
}: {
  id: string
  label: string
  description: string
  roomId: string
  currentUserId?: string
  dataOverrides?: Partial<ChatMockData>
}): ChatRoomCardScenario {
  const rawData = createChatMockData(dataOverrides)

  return {
    id,
    label,
    description,
    currentUserId,
    roomId,
    rawData,
    room: createChatRoomCardRoomFromMockData(roomId, currentUserId, rawData),
  }
}

export const chatRoomCardDefaultScenario = createChatRoomCardScenario({
  id: "default",
  label: "기본",
  description: "최정욱 room의 raw room_members/messages에서 unread dot과 최신 메시지를 계산한 카드",
  roomId: baseChatRoomCardDefaultRoomId,
})

export const chatRoomCardReadScenario = createChatRoomCardScenario({
  id: "read",
  label: "읽음",
  description: "전지강 room의 last_read_at이 최신 메시지 이후라 unread dot이 사라지는 카드",
  roomId: baseChatRoomCardReadRoomId,
})

export const chatRoomCardEditedPreviewScenario = createChatRoomCardScenario({
  id: "edited-preview",
  label: "미리보기 변경",
  description: "같은 raw 구조를 유지한 채 최신 메시지 content만 바꿔 카드 preview를 확인하는 상태",
  roomId: baseChatRoomCardDefaultRoomId,
  dataOverrides: {
    messages: createChatMockData().messages.map((message) =>
      message.id === "m-choi-3"
        ? {
            ...message,
            content: "지금은 좀 괜찮아졌어",
            is_edited: true,
            edited_at: "2026-03-21T09:10:30+09:00",
          }
        : message
    ),
  },
})

export const chatRoomCardScenarios: ChatRoomCardScenario[] = [
  chatRoomCardDefaultScenario,
  chatRoomCardReadScenario,
]

export const activeChatRoomCardScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeChatRoomCardScenario =
  chatRoomCardScenarios[activeChatRoomCardScenarioIndex]
