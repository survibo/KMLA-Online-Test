import type { ChatRoomScreenData } from "./types"
import {
  baseChatRoomScreenData,
  createChatRoomScreenData,
} from "./mock"

export type ChatRoomScenario = {
  id: string
  label: string
  description: string
  data: ChatRoomScreenData
}

export const chatRoomDefaultScenario: ChatRoomScenario = {
  id: "default",
  label: "기본",
  description: "메시지 block을 재사용한 기본 채팅방 화면",
  data: createChatRoomScreenData(),
}

export const chatRoomEmptyScenario: ChatRoomScenario = {
  id: "empty",
  label: "메시지 없음",
  description: "아직 대화가 시작되지 않은 빈 채팅방 상태",
  data: createChatRoomScreenData({
    messages: [],
  }),
}

export const chatRoomScenarios: ChatRoomScenario[] = [
  chatRoomDefaultScenario,
  chatRoomEmptyScenario,
]

export const activeChatRoomScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeChatRoomScenario =
  chatRoomScenarios[activeChatRoomScenarioIndex]
