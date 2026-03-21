import type { GroupPostListGroup } from "./types"
import {
  baseGroupPostListPosts,
  createGroupPostListGroup,
} from "./mock"

export type GroupPostListScenario = {
  id: string
  label: string
  description: string
  group: GroupPostListGroup
}

export const groupPostListDefaultScenario: GroupPostListScenario = {
  id: "default",
  label: "기본",
  description: "같은 카드 데이터를 여러 개 쌓아 보는 기본 목록 상태",
  group: createGroupPostListGroup(),
}

export const groupPostListSparseScenario: GroupPostListScenario = {
  id: "sparse",
  label: "게시글 적음",
  description: "게시글 수가 적은 목록 밀도를 확인하는 상태",
  group: createGroupPostListGroup({
    posts: baseGroupPostListPosts.slice(0, 2),
  }),
}

export const groupPostListScenarios: GroupPostListScenario[] = [
  groupPostListDefaultScenario,
  groupPostListSparseScenario,
]

export const activeGroupPostListScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeGroupPostListScenario =
  groupPostListScenarios[activeGroupPostListScenarioIndex]
