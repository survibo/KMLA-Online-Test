import { baseChatCurrentUserId } from "@/blocks/chat/mock"

import type { ChatMessageThreadData } from "./types"

const ROOM_ID = "0cfe4e9f-bac0-47ec-a3fd-5dab195cdf15"
const CURRENT_USER_ID = baseChatCurrentUserId
const OTHER_USER_ID = "2f30f324-f46d-4494-bd27-1c1952004eb0"

const currentUser = {
  id: CURRENT_USER_ID,
  name: "김민준",
  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
}

const otherUser = {
  id: OTHER_USER_ID,
  name: "정창운",
  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
}

function createMessage(
  id: string,
  senderId: string,
  content: string,
  createdAt: string
) {
  return {
    id,
    room_id: ROOM_ID,
    sender_id: senderId,
    parent_id: null,
    content,
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: createdAt,
    sender: senderId === CURRENT_USER_ID ? currentUser : otherUser,
    message_reactions: [],
    message_reads: [],
  }
}

export const baseChatMessageThreadData: ChatMessageThreadData = {
  current_user_id: CURRENT_USER_ID,
  room_name: "정창운",
  messages: [
    createMessage("message-01", OTHER_USER_ID, "일어났어?", "2026-01-01T08:12:00+09:00"),
    createMessage("message-02", OTHER_USER_ID, "오늘 아침 회의 9시 반인 거 기억하지", "2026-01-01T08:12:18+09:00"),
    createMessage("message-03", CURRENT_USER_ID, "방금 일어남", "2026-01-01T08:13:02+09:00"),
    createMessage("message-04", CURRENT_USER_ID, "세수만 하고 바로 나갈게", "2026-01-01T08:13:20+09:00"),
    createMessage("message-05", OTHER_USER_ID, "오케이", "2026-01-01T08:13:44+09:00"),
    createMessage("message-06", OTHER_USER_ID, "자료는 어제 올린 거 그대로 들고 오면 돼", "2026-01-01T08:14:10+09:00"),
    createMessage("message-07", CURRENT_USER_ID, "usb에도 넣어갈까?", "2026-01-01T08:14:52+09:00"),
    createMessage("message-08", OTHER_USER_ID, "응 혹시 모르니까", "2026-01-01T08:15:10+09:00"),
    createMessage("message-09", OTHER_USER_ID, "프로젝터 또 말썽이면 답없음", "2026-01-01T08:15:28+09:00"),
    createMessage("message-10", CURRENT_USER_ID, "ㅋㅋㅋ 알겠음", "2026-01-01T08:16:03+09:00"),
    createMessage("message-11", CURRENT_USER_ID, "노트북 충전기도 챙긴다", "2026-01-01T08:16:19+09:00"),
    createMessage("message-12", OTHER_USER_ID, "완벽", "2026-01-01T08:16:42+09:00"),
    createMessage("message-13", OTHER_USER_ID, "회의 생각보다 빨리 끝났다", "2026-01-01T14:28:00+09:00"),
    createMessage("message-14", OTHER_USER_ID, "근데 교수님이 랜딩 페이지 쪽 피드백 길게 주셨어", "2026-01-01T14:28:24+09:00"),
    createMessage("message-15", CURRENT_USER_ID, "어떤 부분?", "2026-01-01T14:29:10+09:00"),
    createMessage("message-16", OTHER_USER_ID, "로그인 진입이 너무 뒤에 있다고 느낀대", "2026-01-01T14:29:44+09:00"),
    createMessage("message-17", OTHER_USER_ID, "처음 들어왔을 때 뭐하는 서비스인지보다 가입 흐름이 먼저 보여야 한다고", "2026-01-01T14:30:11+09:00"),
    createMessage("message-18", CURRENT_USER_ID, "그럼 문서에 적을까 아니면 여기서 바로 정리할까", "2026-01-01T14:31:05+09:00"),
    createMessage("message-19", OTHER_USER_ID, "문서에 적을까, 아니면 여기서 바로 정리할까?", "2026-01-01T14:31:30+09:00"),
    createMessage("message-20", CURRENT_USER_ID, "docs에요", "2026-01-01T14:32:03+09:00"),
    createMessage("message-21", OTHER_USER_ID, "확인", "2026-01-01T14:39:00+09:00"),
    createMessage("message-22", OTHER_USER_ID, "랜딩 페이지에 로그인이 있는 게 낫겠다", "2026-01-01T14:39:21+09:00"),
    createMessage("message-23", OTHER_USER_ID, "생각해보니 페북도 첫 화면에서 바로 로그인 보이잖아", "2026-01-01T14:39:49+09:00"),
    createMessage("message-24", CURRENT_USER_ID, "그런데 pending 페이지를 따로 둔 이유가", "2026-01-01T14:41:02+09:00"),
    createMessage("message-25", CURRENT_USER_ID, "외부인이 가입하는거 막으려고 한건데", "2026-01-01T14:41:19+09:00"),
    createMessage("message-26", CURRENT_USER_ID, "아닌가 어차피 상관없나 사용자 입장에서는", "2026-01-01T14:41:42+09:00"),
    createMessage("message-27", OTHER_USER_ID, "아 그 pending이 그거였어?", "2026-01-01T20:12:00+09:00"),
    createMessage("message-28", OTHER_USER_ID, "나는 그냥 승인 대기 화면 정도로만 이해하고 있었음", "2026-01-01T20:12:18+09:00"),
    createMessage("message-29", CURRENT_USER_ID, "응 맞아", "2026-01-01T20:13:04+09:00"),
    createMessage("message-30", CURRENT_USER_ID, "학교 인증 전까지는 거기 묶는 느낌으로 생각했어", "2026-01-01T20:13:31+09:00"),
    createMessage("message-31", OTHER_USER_ID, "그러면 랜딩에서 로그인 눌렀을 때 pending으로 자연스럽게 이어지는 흐름이면 괜찮겠네", "2026-01-01T20:14:08+09:00"),
    createMessage("message-32", CURRENT_USER_ID, "오 그건 괜찮다", "2026-01-01T20:15:01+09:00"),
    createMessage("message-33", CURRENT_USER_ID, "회원가입 못 막더라도 사용자한테는 왜 대기인지 설명이 되니까", "2026-01-01T20:15:26+09:00"),
    createMessage("message-34", OTHER_USER_ID, "내일 오전에 그 플로우 한 번만 같이 다시 그려보자", "2026-01-01T20:16:03+09:00"),
    createMessage("message-35", CURRENT_USER_ID, "좋아", "2026-01-01T20:16:30+09:00"),
    createMessage("message-36", CURRENT_USER_ID, "내가 아침에 초안 먼저 적어둘게", "2026-01-01T20:16:44+09:00"),
    createMessage("message-37", CURRENT_USER_ID, "초안 적어놨다", "2026-01-02T09:08:00+09:00"),
    createMessage("message-38", CURRENT_USER_ID, "랜딩 -> 로그인 -> 인증 상태 확인 -> pending 또는 홈 진입", "2026-01-02T09:08:19+09:00"),
    createMessage("message-39", CURRENT_USER_ID, "일단 이렇게 네 단계로 단순화함", "2026-01-02T09:08:37+09:00"),
    createMessage("message-40", OTHER_USER_ID, "좋네", "2026-01-02T09:18:00+09:00"),
    createMessage("message-41", OTHER_USER_ID, "거기서 인증 안 된 사용자한테 문구만 조금 더 친절하게 붙이면 될 듯", "2026-01-02T09:18:17+09:00"),
    createMessage("message-42", OTHER_USER_ID, "왜 기다려야 하는지랑 보통 얼마나 걸리는지", "2026-01-02T09:18:33+09:00"),
    createMessage("message-43", CURRENT_USER_ID, "아 맞다 처리 시간 안내", "2026-01-02T09:19:02+09:00"),
    createMessage("message-44", CURRENT_USER_ID, "그거 없으면 그냥 막힌 화면처럼 느낄 수 있겠다", "2026-01-02T09:19:21+09:00"),
    createMessage("message-45", OTHER_USER_ID, "응", "2026-01-02T09:19:48+09:00"),
    createMessage("message-46", OTHER_USER_ID, "그리고 문의할 곳도 같이 있어야 할 것 같아", "2026-01-02T09:20:03+09:00"),
    createMessage("message-47", CURRENT_USER_ID, "그럼 하단에 학생회 연락처 넣는 건 어때", "2026-01-02T09:21:10+09:00"),
    createMessage("message-48", OTHER_USER_ID, "좋음", "2026-01-02T09:21:43+09:00"),
    createMessage("message-49", OTHER_USER_ID, "연락처 문구만 너무 길지 않으면 괜찮을 듯", "2026-01-02T09:21:58+09:00"),
    createMessage("message-50", CURRENT_USER_ID, "문구는 내가 한 번 짧게 다시 써볼게", "2026-01-02T09:22:30+09:00"),
    createMessage("message-51", CURRENT_USER_ID, "오후에 시안 같이 보면 되겠다", "2026-01-02T09:22:47+09:00"),
    createMessage("message-52", OTHER_USER_ID, "지금 보니까 버튼 문구도 애매하네", "2026-01-02T16:47:00+09:00"),
    createMessage("message-53", OTHER_USER_ID, "로그인 계속하기보다는 인증 상태 확인하기 같은 말이 더 맞을 수도", "2026-01-02T16:47:29+09:00"),
    createMessage("message-54", CURRENT_USER_ID, "오 그거 좋다", "2026-01-02T16:48:10+09:00"),
    createMessage("message-55", CURRENT_USER_ID, "continue보다 지금 상태를 확인하러 가는 느낌이 더 살아 있네", "2026-01-02T16:48:28+09:00"),
    createMessage("message-56", OTHER_USER_ID, "응 그리고 홈 가는 버튼이랑 역할도 덜 헷갈릴 듯", "2026-01-02T16:49:01+09:00"),
    createMessage("message-57", CURRENT_USER_ID, "그럼 primary는 인증 상태 확인", "2026-01-02T16:49:32+09:00"),
    createMessage("message-58", CURRENT_USER_ID, "secondary는 문의하기 정도로 둘까", "2026-01-02T16:49:51+09:00"),
    createMessage("message-59", OTHER_USER_ID, "ㅇㅇ 괜찮아", "2026-01-02T16:50:12+09:00"),
    createMessage("message-60", OTHER_USER_ID, "문의하기가 부담되면 도움 요청하기도 괜찮고", "2026-01-02T16:50:33+09:00"),
    createMessage("message-61", CURRENT_USER_ID, "내일 오전에 문구 확정하자", "2026-01-02T16:51:00+09:00"),
    createMessage("message-62", CURRENT_USER_ID, "오늘은 여기까지만 할래", "2026-01-02T16:51:19+09:00"),
    createMessage("message-63", OTHER_USER_ID, "좋아 고생했어", "2026-01-02T16:51:44+09:00"),
    createMessage("message-64", OTHER_USER_ID, "아침에 다시 보자", "2026-01-02T16:51:58+09:00"),
    createMessage("message-65", CURRENT_USER_ID, "문구 두 버전 뽑아놨음", "2026-01-03T10:06:00+09:00"),
    createMessage("message-66", CURRENT_USER_ID, "1안은 인증 상태 확인하기", "2026-01-03T10:06:16+09:00"),
    createMessage("message-67", CURRENT_USER_ID, "2안은 가입 상태 확인하기", "2026-01-03T10:06:31+09:00"),
    createMessage("message-68", OTHER_USER_ID, "나는 1안", "2026-01-03T10:11:00+09:00"),
    createMessage("message-69", OTHER_USER_ID, "가입 상태는 이미 가입이 끝난 사람 기준처럼 들려서 처음 보는 사람한테는 덜 직관적일 수도 있어", "2026-01-03T10:11:29+09:00"),
    createMessage("message-70", CURRENT_USER_ID, "나도 1안 쪽이 더 맞는 것 같았어", "2026-01-03T10:12:08+09:00"),
    createMessage("message-71", CURRENT_USER_ID, "그럼 이걸로 고정하고 설명문만 조금 더 다듬자", "2026-01-03T10:12:24+09:00"),
    createMessage("message-72", OTHER_USER_ID, "설명문은 너무 딱딱하지 않게만 가자", "2026-01-03T10:13:10+09:00"),
    createMessage("message-73", OTHER_USER_ID, "학교 구성원 확인 중입니다 정도면 무난할 듯", "2026-01-03T10:13:26+09:00"),
    createMessage("message-74", CURRENT_USER_ID, "좋아", "2026-01-03T10:14:04+09:00"),
    createMessage("message-75", CURRENT_USER_ID, "그 밑에 처리까지 최대 하루 정도 소요될 수 있습니다 붙일게", "2026-01-03T10:14:22+09:00"),
    createMessage("message-76", OTHER_USER_ID, "좋네", "2026-01-03T10:14:47+09:00"),
    createMessage("message-77", OTHER_USER_ID, "그 정도면 사용자도 왜 기다리는지 납득할 것 같아", "2026-01-03T10:15:03+09:00"),
    createMessage("message-78", CURRENT_USER_ID, "이따가 피그마에 반영하고 링크 보낼게", "2026-01-03T10:15:44+09:00"),
    createMessage("message-79", OTHER_USER_ID, "오케이", "2026-01-03T10:16:08+09:00"),
    createMessage("message-80", OTHER_USER_ID, "보내주면 점심 전에 보고 코멘트 남길게", "2026-01-03T10:16:23+09:00"),
  ],
}

export function createChatMessageThreadData(
  overrides: Partial<ChatMessageThreadData> = {}
): ChatMessageThreadData {
  return {
    ...baseChatMessageThreadData,
    ...overrides,
    messages: (overrides.messages ?? baseChatMessageThreadData.messages).map(
      (message) => ({
        ...message,
        sender: { ...message.sender },
        message_reactions: message.message_reactions?.map((reaction) => ({
          ...reaction,
        })),
        message_reads: message.message_reads?.map((read) => ({
          ...read,
        })),
      })
    ),
  }
}
