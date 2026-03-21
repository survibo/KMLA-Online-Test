import {
  baseGroupPostFourthPostId,
  baseGroupPostLatestPostId,
  baseGroupPostListGroupId,
  baseGroupPostMockData,
  baseGroupPostSecondPostId,
  baseGroupPostThirdPostId,
} from "@/blocks/group/mock"

import type { GroupPostListGroup } from "./types"
import {
  createGroupPostListGroup,
  createGroupPostListGroupFromMockData,
  groupPostListModes,
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
  description: "도메인 raw mock에서 최신 글 순으로 projection한 기본 목록 상태",
  group: createGroupPostListGroup(),
}

export const groupPostListSparseScenario: GroupPostListScenario = {
  id: "sparse",
  label: "게시글 적음",
  description: "게시글 수가 적은 목록 밀도를 확인하는 상태",
  group: createGroupPostListGroup(baseGroupPostListGroupId, {
    posts: baseGroupPostMockData.posts.filter(
      (post) =>
        post.group_id !== baseGroupPostListGroupId ||
        post.id === baseGroupPostLatestPostId ||
        post.id === baseGroupPostSecondPostId
    ),
  }),
}

export const groupPostListModeSellScenario: GroupPostListScenario = {
  id: "mode-sell",
  label: "모드 있음 - 팝니다",
  description: "상단 모드 버튼이 있고 팝니다 탭이 선택된 상태",
  group: createGroupPostListGroup(
    baseGroupPostListGroupId,
    {},
    {
      modes: groupPostListModes,
      activeModeId: "sell",
      postModeById: {
        [baseGroupPostLatestPostId]: "sell",
        [baseGroupPostSecondPostId]: "buy",
        [baseGroupPostThirdPostId]: "sell",
        [baseGroupPostFourthPostId]: "buy",
      },
    }
  ),
}

export const groupPostListModeBuyScenario: GroupPostListScenario = {
  id: "mode-buy",
  label: "모드 있음 - 삽니다",
  description: "상단 모드 버튼이 있고 삽니다 탭이 선택된 상태",
  group: createGroupPostListGroup(
    baseGroupPostListGroupId,
    {},
    {
      modes: groupPostListModes,
      activeModeId: "buy",
      postModeById: {
        [baseGroupPostLatestPostId]: "sell",
        [baseGroupPostSecondPostId]: "buy",
        [baseGroupPostThirdPostId]: "sell",
        [baseGroupPostFourthPostId]: "buy",
      },
    }
  ),
}

export const groupPostListScenarios: GroupPostListScenario[] = [
  groupPostListDefaultScenario,
  groupPostListModeSellScenario,
  groupPostListModeBuyScenario,
]

export const activeGroupPostListScenarioIndex = 0 // 0 ~ 2, total 3 scenarios

export const activeGroupPostListScenario =
  groupPostListScenarios[activeGroupPostListScenarioIndex]
