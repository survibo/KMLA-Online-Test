import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
  getGroupPostById,
  getGroupPostComments,
  type GroupPostMockData,
} from "@/blocks/group/mock"

import type {
  GroupPostDetailCommentData,
  GroupPostDetailData,
} from "./types"

export const baseGroupPostDetailPost = createGroupPostDetailPostFromMockData()
export const baseGroupPostDetailComments =
  createGroupPostDetailCommentsFromMockData()

export function createGroupPostDetailPostFromMockData(
  postId = baseGroupPostPrimaryPostId,
  data: GroupPostMockData = baseGroupPostMockData
): GroupPostDetailData {
  return getGroupPostById(postId, data)
}

export function createGroupPostDetailCommentsFromMockData(
  postId = baseGroupPostPrimaryPostId,
  data: GroupPostMockData = baseGroupPostMockData
): GroupPostDetailCommentData[] {
  return getGroupPostComments(postId, data)
}

export function createGroupPostDetailPost(
  postId = baseGroupPostPrimaryPostId,
  overrides: Partial<GroupPostMockData> = {}
): GroupPostDetailData {
  return createGroupPostDetailPostFromMockData(
    postId,
    createGroupPostMockData(overrides)
  )
}

export function createGroupPostDetailComments(
  postId = baseGroupPostPrimaryPostId,
  overrides: Partial<GroupPostMockData> = {}
) {
  return createGroupPostDetailCommentsFromMockData(
    postId,
    createGroupPostMockData(overrides)
  )
}
