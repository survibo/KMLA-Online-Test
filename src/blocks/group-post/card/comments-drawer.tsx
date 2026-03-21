import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { GroupCommentThread } from "@/blocks/group-post/shared"
import type { GroupComment } from "@/blocks/group-post/types"

type GroupPostCommentsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentItems?: GroupComment[]
}

export function GroupPostCommentsDrawer({
  open,
  onOpenChange,
  commentItems = [],
}: GroupPostCommentsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="group-post-comments-drawer">
        <DrawerHeader className="px-4 pb-3 pt-5 text-left sm:px-6">
          <DrawerTitle className="text-lg font-semibold text-zinc-950">
            댓글
          </DrawerTitle>
        </DrawerHeader>

        <Separator className="bg-zinc-200" />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {commentItems.length > 0 ? (
            <GroupCommentThread commentItems={commentItems} />
          ) : (
            <div className="rounded-2xl bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 px-4 py-4 sm:px-6">
          <div className="space-y-3">
            <Textarea
              placeholder="이 게시글에 댓글 남기기"
              className="group-post-comment-input"
            />
            <div className="flex justify-end">
              <Button
                type="button"
                className="group-post-submit-button"
              >
                댓글 작성
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
