import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  getLatestGroupComment,
  GroupLatestCommentPreview,
  GroupPostGallery,
  GroupPostHeader,
  GroupPostStats,
} from "@/blocks/group-post/shared";
import type { GroupPost } from "@/blocks/group-post/types";
import { GroupPostCommentsDrawer } from "./comments-drawer";

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

      <GroupPostCommentsDrawer
        open={isCommentsOpen}
        onOpenChange={setIsCommentsOpen}
        commentItems={commentItems}
      />
    </>
  );
}
