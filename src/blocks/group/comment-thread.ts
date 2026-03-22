import type { GroupComment } from "@/blocks/group/types"

export type GroupCommentMeta = {
  item: GroupComment
  depth: number
  replyCount: number
  parentAuthorName: string | null
}

type GroupCommentLookup = {
  sortedComments: GroupComment[]
  commentMap: Map<string, GroupComment>
  directReplyCountByParentId: Map<string, number>
  directRepliesByParentId: Map<string, GroupComment[]>
}

function sortCommentsByCreatedAt(commentItems: GroupComment[]) {
  return [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
}

function getParentAuthorName(
  comment: GroupComment,
  commentMap: Map<string, GroupComment>
) {
  if (!comment.parent_id || comment.parent_id === comment.id) {
    return null
  }

  const parentComment = commentMap.get(comment.parent_id)

  if (!parentComment || parentComment.id === comment.id) {
    return null
  }

  if (parentComment.author.id === comment.author.id) {
    return null
  }

  return parentComment.author.name
}

function createGroupCommentLookup(commentItems: GroupComment[]): GroupCommentLookup {
  const sortedComments = sortCommentsByCreatedAt(commentItems)
  const commentMap = new Map(sortedComments.map((item) => [item.id, item]))
  const directReplyCountByParentId = new Map<string, number>()
  const directRepliesByParentId = new Map<string, GroupComment[]>()

  for (const comment of sortedComments) {
    const parentId = comment.parent_id

    if (!parentId) continue

    directReplyCountByParentId.set(
      parentId,
      (directReplyCountByParentId.get(parentId) ?? 0) + 1
    )

    const replies = directRepliesByParentId.get(parentId) ?? []
    replies.push(comment)
    directRepliesByParentId.set(parentId, replies)
  }

  return {
    sortedComments,
    commentMap,
    directReplyCountByParentId,
    directRepliesByParentId,
  }
}

function createCommentMeta(
  comment: GroupComment,
  depth: number,
  lookup: GroupCommentLookup
): GroupCommentMeta {
  return {
    item: comment,
    depth,
    replyCount:
      comment.reply_count ?? lookup.directReplyCountByParentId.get(comment.id) ?? 0,
    parentAuthorName: getParentAuthorName(comment, lookup.commentMap),
  }
}

function getTopLevelParentId(
  comment: GroupComment,
  commentMap: Map<string, GroupComment>
) {
  let currentParentId = comment.parent_id ?? null

  while (currentParentId) {
    const parentComment = commentMap.get(currentParentId)

    if (!parentComment?.parent_id) {
      return parentComment?.id ?? currentParentId
    }

    currentParentId = parentComment.parent_id
  }

  return null
}

export function createGroupCardCommentThread(commentItems: GroupComment[]) {
  const lookup = createGroupCommentLookup(commentItems)
  const rootComments = lookup.sortedComments.filter((item) => item.parent_id === null)
  const topLevelComments = rootComments.map((comment) =>
    createCommentMeta(comment, 0, lookup)
  )
  const directRepliesByParentId = new Map<string, GroupCommentMeta[]>()

  for (const rootComment of rootComments) {
    const directReplies = lookup.directRepliesByParentId.get(rootComment.id) ?? []

    directRepliesByParentId.set(
      rootComment.id,
      directReplies.map((reply) => createCommentMeta(reply, 1, lookup))
    )
  }

  return {
    topLevelComments,
    directRepliesByParentId,
  }
}

export function createGroupDetailCommentThread(commentItems: GroupComment[]) {
  const lookup = createGroupCommentLookup(commentItems)
  const childMap = new Map<string | null, GroupComment[]>()

  for (const comment of lookup.sortedComments) {
    const parentKey = getTopLevelParentId(comment, lookup.commentMap)
    const siblings = childMap.get(parentKey) ?? []
    siblings.push(comment)
    childMap.set(parentKey, siblings)
  }

  const flattenedComments: GroupCommentMeta[] = []

  function walkComments(parentId: string | null, actualDepth: number) {
    const children = childMap.get(parentId) ?? []

    for (const child of children) {
      flattenedComments.push(createCommentMeta(child, Math.min(actualDepth, 1), lookup))
      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return flattenedComments
}
