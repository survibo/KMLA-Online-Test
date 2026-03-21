import {
  baseGroupPostListGroupId,
  createGroupPostMockData,
  getGroupPostListGroupById,
  type GroupPostMockData,
} from "@/blocks/group/mock"

import type {
  GroupPostListGroup,
  GroupPostListMode,
  GroupPostListModeId,
} from "./types"

export const groupPostListModes: GroupPostListMode[] = [
  { id: "sell", label: "팝니다" },
  { id: "buy", label: "삽니다" },
]

export const baseGroupPostListGroup =
  createGroupPostListGroupFromMockData(baseGroupPostListGroupId)
export const baseGroupPostListPosts = baseGroupPostListGroup.posts

export function createGroupPostListGroupFromMockData(
  groupId = baseGroupPostListGroupId,
  data?: GroupPostMockData,
  options?: {
    modes?: GroupPostListMode[]
    activeModeId?: GroupPostListModeId
    postModeById?: Partial<Record<string, GroupPostListModeId>>
  }
): GroupPostListGroup {
  const group = getGroupPostListGroupById(groupId, data)

  return {
    ...group,
    modes: options?.modes,
    activeModeId: options?.activeModeId,
    postModeById: options?.postModeById,
  }
}

export function createGroupPostListGroup(
  groupId = baseGroupPostListGroupId,
  overrides: Partial<GroupPostMockData> = {},
  options?: {
    modes?: GroupPostListMode[]
    activeModeId?: GroupPostListModeId
    postModeById?: Partial<Record<string, GroupPostListModeId>>
  }
): GroupPostListGroup {
  return createGroupPostListGroupFromMockData(
    groupId,
    createGroupPostMockData(overrides),
    options
  )
}
