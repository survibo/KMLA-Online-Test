import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  getLatestGroupComment,
  GroupCommentThread,
  GroupLatestCommentPreview,
  GroupPostGallery,
  GroupPostHeader,
  GroupPostStats,
} from "@/blocks/group-post-shared";
import type { GroupPost } from "@/blocks/group-post-types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type GroupPostCardProps = {
  post: GroupPost;
  timeVariant?: "absolute" | "relative";
  className?: string;
};

export function GroupPostCard({
  post,
  timeVariant = "absolute",
  className,
}: GroupPostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const commentItems = post.post_comments ?? [];
  const latestComment = getLatestGroupComment(commentItems);
  const totalComments =
    post.comment_count ??
    commentItems.filter((comment) => comment.parent_id === null).length;

  return (
    <>
      <article
        className={cn(
          "w-full border-b border-zinc-200 bg-white text-zinc-950",
          className
        )}
      >
        <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-4 sm:px-6">
          <GroupPostHeader
            author={post.author}
            createdAt={post.created_at}
            timeVariant={timeVariant}
          />

          <div className="space-y-3">
            {post.title || post.content ? (
              <div className="space-y-2">
                {post.title ? (
                  <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                    {post.title}
                  </h2>
                ) : null}
                {post.content ? (
                  <p className="break-keep text-zinc-600">{post.content}</p>
                ) : null}
              </div>
            ) : null}

            <GroupPostGallery
              images={post.post_images}
              altFallback={`${post.title ?? "Post"} attached image`}
            />
          </div>

          {latestComment ? (
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setIsCommentsOpen(true)}
              aria-label="Open latest comment"
            >
              <GroupLatestCommentPreview comment={latestComment} />
            </button>
          ) : null}

          <GroupPostStats
            post={post}
            onCommentClick={() => setIsCommentsOpen(true)}
          />
        </div>
      </article>

      <Drawer open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DrawerContent className="mx-auto flex w-full max-w-[560px] flex-col rounded-t-[1.75rem] bg-white data-[vaul-drawer-direction=bottom]:h-[80vh] data-[vaul-drawer-direction=bottom]:max-h-[80vh]">
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
                className="min-h-24 rounded-2xl border-zinc-200 bg-zinc-50 px-4 py-3 text-sm shadow-none focus-visible:border-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-200"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="rounded-full bg-emerald-500 px-4 text-white hover:bg-emerald-600"
                >
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
