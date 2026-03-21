import { useRef, useState } from "react"
import { MessageCircle, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupUser } from "@/blocks/group/types"

type GroupPostCommentsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentItems?: GroupComment[]
  postAuthorId?: string
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function GroupCommentAvatar({
  author,
  size = "sm",
}: {
  author: GroupUser
  size?: "xs" | "sm"
}) {
  const className = size === "xs" ? "size-7" : "size-9"

  return (
    <Avatar size="default" className={cn(className, "shrink-0")}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

type GroupCommentMeta = {
  item: GroupComment
  depth: number
  replyCount: number
  parentAuthorName: string | null
}

type GroupCommentRowProps = GroupCommentMeta & {
  postAuthorId?: string
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

function countDirectReplies(commentItems: GroupComment[], parentId: string) {
  return commentItems.filter((item) => item.parent_id === parentId).length
}

function flattenGroupComments(commentItems: GroupComment[]) {
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))
  const rootComments = sortedCommentItems.filter((item) => item.parent_id === null)

  return rootComments.map((item) => ({
    item,
    depth: 0,
    replyCount: item.reply_count ?? countDirectReplies(sortedCommentItems, item.id),
    parentAuthorName: null,
  }))
}

function getDirectReplies(
  commentItems: GroupComment[],
  parentId: string
): GroupCommentMeta[] {
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))

  return sortedCommentItems
    .filter((item) => item.parent_id === parentId)
    .map((item) => ({
      item,
      depth: 1,
      replyCount: item.reply_count ?? countDirectReplies(sortedCommentItems, item.id),
      parentAuthorName: getParentAuthorName(item, commentMap),
    }))
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
  parentAuthorName,
  postAuthorId,
}: GroupCommentRowProps) {
  const likes = item.comment_reactions?.length ?? 0
  const isPostAuthor = item.author_id === postAuthorId

  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-7")}>
      <div className="pt-1">
        <GroupCommentAvatar author={item.author} size={depth > 0 ? "xs" : "sm"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="py-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-semibold text-zinc-900">{item.author.name}</p>
            {isPostAuthor ? (
              <span className="text-[0.8125rem] font-medium text-zinc-400">
                작성자
              </span>
            ) : null}
            <span className="text-[0.8125rem] text-zinc-400">
              {formatRelativeTime(item.created_at)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line text-zinc-700">
            {parentAuthorName ? (
              <span className="mr-1.5 font-medium text-sky-700">
                @{parentAuthorName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-zinc-500">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {depth === 0 ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

function GroupReplyToggle({
  replyCount,
  expanded,
  onToggle,
}: {
  replyCount: number
  expanded: boolean
  onToggle: () => void
}) {
  if (replyCount <= 0) {
    return null
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="mt-1 h-7 px-0 text-sm font-medium text-zinc-500 hover:bg-transparent hover:text-zinc-700"
      onClick={onToggle}
    >
      {expanded ? "답글 숨기기" : `답글 보기 ${replyCount}`}
    </Button>
  )
}

function GroupCommentThread({
  commentItems = [],
  postAuthorId,
}: {
  commentItems?: GroupComment[]
  postAuthorId?: string
}) {
  const flattenedComments = flattenGroupComments(commentItems)
  const [expandedCommentIds, setExpandedCommentIds] = useState<string[]>([])

  if (flattenedComments.length === 0) return null

  function toggleReplies(commentId: string) {
    setExpandedCommentIds((currentIds) =>
      currentIds.includes(commentId)
        ? currentIds.filter((id) => id !== commentId)
        : [...currentIds, commentId]
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {flattenedComments.map(({ item, ...meta }, index) => {
        const isExpanded = expandedCommentIds.includes(item.id)
        const directReplies = getDirectReplies(commentItems, item.id)

        return (
          <div key={item.id ?? `${item.author.name}-${index}`}>
            <GroupCommentRow
              item={item}
              postAuthorId={postAuthorId}
              {...meta}
            />
            <GroupReplyToggle
              replyCount={meta.replyCount}
              expanded={isExpanded}
              onToggle={() => toggleReplies(item.id)}
            />
            {directReplies.length > 0 ? (
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity,transform] duration-250 ease-out",
                  isExpanded
                    ? "mt-3 grid-rows-[1fr] opacity-100 translate-y-0"
                    : "grid-rows-[0fr] opacity-0 -translate-y-1"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-5 pt-0.5">
                    {directReplies.map(
                      ({ item: replyItem, ...replyMeta }, replyIndex) => (
                        <GroupCommentRow
                          key={replyItem.id ?? `${replyItem.author.name}-${replyIndex}`}
                          item={replyItem}
                          postAuthorId={postAuthorId}
                          {...replyMeta}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function GroupPostCommentsDrawer({
  open,
  onOpenChange,
  commentItems = [],
  postAuthorId,
}: GroupPostCommentsDrawerProps) {
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [draftComment, setDraftComment] = useState("")
  const [isComposerActive, setIsComposerActive] = useState(false)
  const shouldShowSubmitButton =
    isComposerActive && draftComment.trim().length > 0

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex w-full max-w-[800px] flex-col rounded-t-[1.75rem] bg-white">
        <DrawerHeader className="px-4 pb-3 pt-5 text-left sm:px-6">
          <DrawerTitle className="text-lg font-semibold text-zinc-950">
            댓글
          </DrawerTitle>
        </DrawerHeader>

        <Separator className="bg-zinc-200" />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {commentItems.length > 0 ? (
            <GroupCommentThread
              commentItems={commentItems}
              postAuthorId={postAuthorId}
            />
          ) : (
            <div className="rounded-2xl bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 px-4 py-4 sm:px-6">
          <div
            ref={composerRef}
            className="flex flex-col gap-3"
            onFocusCapture={() => setIsComposerActive(true)}
            onBlurCapture={(event) => {
              const nextFocusedElement = event.relatedTarget as Node | null

              if (nextFocusedElement && composerRef.current?.contains(nextFocusedElement)) {
                return
              }

              if (!draftComment.trim()) {
                setIsComposerActive(false)
              }
            }}
          >
            <Textarea
              placeholder="이 게시글에 댓글 남기기"
              value={draftComment}
              onChange={(event) => setDraftComment(event.target.value)}
              className="min-h-10 rounded-2xl border-zinc-200 bg-zinc-50 px-4 py-3 text-sm shadow-none focus-visible:border-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-200"
            />
            {shouldShowSubmitButton ? (
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="rounded-full bg-emerald-500 px-4 text-white hover:bg-emerald-600"
                >
                  댓글 작성
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
