import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
  getGroupPostById,
  type GroupPostMockData,
} from "@/blocks/group/mock"

import type { GroupPostCardData } from "./types"

function countTopLevelComments(postComments: GroupPostCardData["post_comments"] = []) {
  return postComments.filter((comment) => comment.parent_id === null).length
}

export const baseGroupPostCardPost = createGroupPostCardPostFromMockData()

export function createGroupPostCardPostFromMockData(
  postId = baseGroupPostPrimaryPostId,
  data: GroupPostMockData = baseGroupPostMockData
): GroupPostCardData {
  const post = getGroupPostById(postId, data)

  return {
    ...post,
    post_images: post.post_images,
    post_comments: post.post_comments,
    comment_count: countTopLevelComments(post.post_comments),
  }
}

export function createGroupPostCardPost(
  postId = baseGroupPostPrimaryPostId,
  overrides: Partial<GroupPostMockData> = {}
): GroupPostCardData {
  return createGroupPostCardPostFromMockData(
    postId,
    createGroupPostMockData(overrides)
  )
}
