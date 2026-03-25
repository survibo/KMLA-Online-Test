import {
  baseChatMessageThreadData,
  createChatMessageThreadData,
} from "@/blocks/chat/message/mock"
import { baseChatCurrentUserId } from "@/blocks/chat/mock"

import type { ChatRoomScreenData } from "./types"

const fallbackParticipant = {
  id: baseChatCurrentUserId,
  name: "김민준",
  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
}

function getParticipant(data: typeof baseChatMessageThreadData) {
  return (
    data.messages.find((message) => message.sender_id !== data.current_user_id)?.sender ??
    data.messages[0]?.sender ??
    fallbackParticipant
  )
}

export const baseChatRoomScreenData: ChatRoomScreenData = {
  ...baseChatMessageThreadData,
  participant: getParticipant(baseChatMessageThreadData)!,
}

export function createChatRoomScreenData(
  overrides: Partial<ChatRoomScreenData> = {}
): ChatRoomScreenData {
  const messageData = createChatMessageThreadData(overrides)

  return {
    ...messageData,
    ...overrides,
    participant: overrides.participant ?? getParticipant(messageData)!,
  }
}
