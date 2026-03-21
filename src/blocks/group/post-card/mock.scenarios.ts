import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
} from "@/blocks/group/mock"

import type { GroupPostCardData } from "./types"
import {
  createGroupPostCardPost,
  createGroupPostCardPostFromMockData,
} from "./mock"

export type GroupPostCardScenario = {
  id: string
  label: string
  description: string
  post: GroupPostCardData
}

const busyDiscussionMockData = createGroupPostMockData({
  posts: baseGroupPostMockData.posts.map((post) =>
    post.id === baseGroupPostPrimaryPostId
      ? { ...post, comment_count: 4, reaction_count: 10 }
      : post
  ),
  post_images: [],
  post_comments: [
    ...baseGroupPostMockData.post_comments,
    {
      id: "6c8155aa-4350-4f8a-9f69-5a97828674cf",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
      parent_id: null,
      content: "현장 수령 가능한 날짜도 미리 알려 주시면 좋겠습니다.",
      reply_count: 2,
      created_at: "2026-03-20T15:21:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "ad67b8de-47e8-4d6d-9fb2-6dc60bc8c136",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      parent_id: "6c8155aa-4350-4f8a-9f69-5a97828674cf",
      content: "수령 일정은 이번 주 금요일 공지로 따로 올리겠습니다.",
      reply_count: 0,
      created_at: "2026-03-20T15:24:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "e34f3732-0f54-44dc-bf77-f76f626d4b58",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5",
      parent_id: "6c8155aa-4350-4f8a-9f69-5a97828674cf",
      content: "저도 같은 일정이면 바로 신청하려고 합니다.",
      reply_count: 0,
      created_at: "2026-03-20T15:26:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "5b19e38d-d31d-4a1f-83d7-f7a1a6f7fd8a",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "890aa09e-7a2f-4963-bd48-e7214efd2a0d",
      parent_id: null,
      content: "추가 주문이 가능하면 사이즈 교환 일정도 같이 안내 부탁드립니다.",
      reply_count: 2,
      created_at: "2026-03-20T15:27:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "1c586281-fb7a-45e8-b0b8-78d81bbcb11d",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      parent_id: "5b19e38d-d31d-4a1f-83d7-f7a1a6f7fd8a",
      content: "교환 일정은 수요 조사 끝난 뒤에 한 번 더 열어둘 예정입니다.",
      reply_count: 1,
      created_at: "2026-03-20T15:29:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "4e4d956a-5a18-4a26-bdff-5824c71a6ab2",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      parent_id: "1c586281-fb7a-45e8-b0b8-78d81bbcb11d",
      content: "그럼 1차 배부 이후에도 신청 창구가 열리는 걸로 이해하면 될까요?",
      reply_count: 0,
      created_at: "2026-03-20T15:31:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "903f7dc9-fd4f-44da-bdb0-f7b2b2359421",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
      parent_id: "5b19e38d-d31d-4a1f-83d7-f7a1a6f7fd8a",
      content: "현장 수령이 어려운 학생은 대리 수령도 가능한지 궁금합니다.",
      reply_count: 0,
      created_at: "2026-03-20T15:33:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "e5cf85b0-2c5a-4610-8e29-4d637710c085",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "b27f2ebf-e715-49b2-8380-626c29bcfed6",
      parent_id: null,
      content: "이번 신청은 신입생도 바로 가능한지 확인 부탁드립니다.",
      reply_count: 1,
      created_at: "2026-03-20T15:34:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "9426f38f-a117-4d48-b963-3c920b31e3a2",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      parent_id: "e5cf85b0-2c5a-4610-8e29-4d637710c085",
      content: "네, 학번 등록만 되어 있으면 신입생도 바로 신청 가능합니다.",
      reply_count: 0,
      created_at: "2026-03-20T15:36:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
  ],
  post_reactions: [
    ...baseGroupPostMockData.post_reactions,
    {
      id: "1706dedb-3c52-4d76-b47f-d05059bca652",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "c2ecfe2d-e2e2-4808-ac65-f2014cf03efa",
      type: "laugh",
      created_at: "2026-03-20T15:22:00+09:00",
    },
    {
      id: "cca1f973-7eca-41d5-ac1e-6a3d084ccf46",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "890aa09e-7a2f-4963-bd48-e7214efd2a0d",
      type: "wow",
      created_at: "2026-03-20T15:23:00+09:00",
    },
    {
      id: "8d9c5798-f191-4637-b34e-f4790c3eb34d",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5",
      type: "like",
      created_at: "2026-03-20T15:25:00+09:00",
    },
    {
      id: "36f6b596-2741-4b5f-a43f-21ce7f613c08",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "f6fdb3ab-fab2-4c70-9c3b-c3b78cca5140",
      type: "love",
      created_at: "2026-03-20T15:28:00+09:00",
    },
  ],
})

export const groupPostCardWithImageScenario: GroupPostCardScenario = {
  id: "with-image",
  label: "이미지 있음",
  description: "대표 이미지와 기본 액션이 함께 있는 기본 카드 상태",
  post: createGroupPostCardPost(),
}

export const groupPostCardBusyDiscussionScenario: GroupPostCardScenario = {
  id: "busy-discussion",
  label: "댓글 여러 개",
  description: "최상위 댓글 여러 개와 답글이 길게 이어지는 토론형 카드 상태",
  post: createGroupPostCardPostFromMockData(
    baseGroupPostPrimaryPostId,
    busyDiscussionMockData
  ),
}

export const groupPostCardWithoutCommentsScenario: GroupPostCardScenario = {
  id: "without-comments",
  label: "댓글 없음",
  description: "댓글 수가 0으로 보이는 카드 상태",
  post: createGroupPostCardPost(baseGroupPostPrimaryPostId, {
    posts: baseGroupPostMockData.posts.map((post) =>
      post.id === baseGroupPostPrimaryPostId
        ? { ...post, comment_count: 0 }
        : post
    ),
    post_comments: baseGroupPostMockData.post_comments.filter(
      (comment) => comment.post_id !== baseGroupPostPrimaryPostId
    ),
  }),
}

export const groupPostCardWithoutImageWithoutCommentsScenario: GroupPostCardScenario = {
  id: "without-image-without-comments",
  label: "이미지도 없고 댓글도 없음",
  description: "대표 이미지 없이 텍스트와 액션만 남는 카드 상태",
  post: createGroupPostCardPost(baseGroupPostPrimaryPostId, {
    posts: baseGroupPostMockData.posts.map((post) =>
      post.id === baseGroupPostPrimaryPostId
        ? { ...post, comment_count: 0 }
        : post
    ),
    post_images: [],
    post_comments: baseGroupPostMockData.post_comments.filter(
      (comment) => comment.post_id !== baseGroupPostPrimaryPostId
    ),
  }),
}

export const groupPostCardScenarios: GroupPostCardScenario[] = [
  groupPostCardWithImageScenario,
  groupPostCardBusyDiscussionScenario,
  groupPostCardWithoutCommentsScenario,
  groupPostCardWithoutImageWithoutCommentsScenario,
]

export const activeGroupPostCardScenarioIndex = 0 // 0 ~ 3, total 4 scenarios

export const activeGroupPostCardScenario =
  groupPostCardScenarios[activeGroupPostCardScenarioIndex]
