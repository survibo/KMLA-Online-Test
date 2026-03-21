import type { GroupPostCardData } from "./types"
import {
  baseGroupPostCardDiscussionComments,
  createGroupPostCardPost,
} from "./mock"

export type GroupPostCardScenario = {
  id: string
  label: string
  description: string
  post: GroupPostCardData
}

export const groupPostCardWithImageScenario: GroupPostCardScenario = {
  id: "with-image",
  label: "이미지 있음",
  description: "대표 이미지와 최상위 댓글 1개가 함께 있는 기본 카드 상태",
  post: createGroupPostCardPost({
    id: "group-post-card-with-image",
    reaction_count: 3,
  }),
}

export const groupPostCardBusyDiscussionScenario: GroupPostCardScenario = {
  id: "busy-discussion",
  label: "댓글 여러 개",
  description: "최상위 댓글 2개와 답글이 함께 있는 토론형 카드 상태",
  post: createGroupPostCardPost({
    id: "group-post-card-busy-discussion",
    reaction_count: 7,
    post_images: [],
    post_comments: baseGroupPostCardDiscussionComments,
  }),
}

export const groupPostCardWithoutCommentsScenario: GroupPostCardScenario = {
  id: "without-comments",
  label: "댓글 없음",
  description: "최신 댓글 미리보기 없이 카드만 보이는 상태",
  post: createGroupPostCardPost({
    id: "group-post-card-no-comments",
    comment_count: 0,
    post_comments: [],
  }),
}

export const groupPostCardScenarios: GroupPostCardScenario[] = [
  groupPostCardWithImageScenario,
  groupPostCardBusyDiscussionScenario,
  groupPostCardWithoutCommentsScenario,
]

export const activeGroupPostCardScenarioIndex = 0 // 0 ~ 2, total 3 scenarios

export const activeGroupPostCardScenario =
  groupPostCardScenarios[activeGroupPostCardScenarioIndex]
