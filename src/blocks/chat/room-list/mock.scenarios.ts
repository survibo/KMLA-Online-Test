import {
  baseChatRoomWithChoiId,
  createChatMockData,
  type ChatMockData,
} from "@/blocks/chat/mock"

import type { ChatRoomListData } from "./types"
import { createChatRoomListDataFromMockData } from "./mock"

export type ChatRoomListScenario = {
  id: string
  label: string
  description: string
  rawData: ChatMockData
  data: ChatRoomListData
}

function createChatRoomListScenario({
  id,
  label,
  description,
  dataOverrides = {},
}: {
  id: string
  label: string
  description: string
  dataOverrides?: Parameters<typeof createChatMockData>[0]
}): ChatRoomListScenario {
  const rawData = createChatMockData(dataOverrides)

  return {
    id,
    label,
    description,
    rawData,
    data: createChatRoomListDataFromMockData(rawData, rawData.current_user_id),
  }
}

export const chatRoomListDefaultScenario = createChatRoomListScenario({
  id: "default",
  label: "기본",
  description: "공용 raw chat mock에서 최근 메시지 순으로 정렬한 기본 채팅방 목록",
})

export const chatRoomListQuietScenario = createChatRoomListScenario({
  id: "quiet",
  label: "방 적음",
  description: "room 하나만 남겨 목록 밀도와 상단 간격을 확인하는 상태",
  dataOverrides: (() => {
    const rawData = createChatMockData()

    return {
      rooms: rawData.rooms.filter((room) => room.id === baseChatRoomWithChoiId),
      room_members: rawData.room_members.filter(
        (member) => member.room_id === baseChatRoomWithChoiId
      ),
      messages: rawData.messages.filter(
        (message) => message.room_id === baseChatRoomWithChoiId
      ),
    }
  })(),
})

export const chatRoomListScenarios: ChatRoomListScenario[] = [
  chatRoomListDefaultScenario,
]

export const activeChatRoomListScenarioIndex = 0 // 0 ~ 0, total 1 scenario

export const activeChatRoomListScenario =
  chatRoomListScenarios[activeChatRoomListScenarioIndex]
