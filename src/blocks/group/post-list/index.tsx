import { memo, useMemo } from "react"
import { ArrowLeft, ChevronDown, Plus, Search } from "lucide-react"

import { GroupPostCard } from "@/blocks/group/post-card"
import { GroupPostCommentsDrawer } from "@/blocks/group/post-card/comments-drawer"
import {
  GroupPostOverflowMenuDrawer,
} from "@/blocks/group/shared"
import { useQueryDrawerState } from "@/blocks/group/use-query-drawer-state"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { GroupPost } from "@/blocks/group/types"
import type { GroupPostListGroup } from "./types"

type GroupPostListProps = {
  group: GroupPostListGroup
  className?: string
}

export function GroupPostList({ group, className }: GroupPostListProps) {
  const hasModes = Boolean(group.modes?.length && group.activeModeId)
  const posts = useMemo(
    () =>
      hasModes
        ? group.posts.filter(
            (post) =>
              (group.postModeById?.[post.id] ?? group.activeModeId) ===
              group.activeModeId
          )
        : group.posts,
    [group.activeModeId, group.postModeById, group.posts, hasModes]
  )
  const commentsDrawer = useQueryDrawerState({
    queryKey: "comments",
    sourcePathStateKey: "commentsDrawerSourcePath",
    sourceIdStateKey: "commentsDrawerPostId",
  })
  const menuDrawer = useQueryDrawerState({
    queryKey: "menu",
    sourcePathStateKey: "menuDrawerSourcePath",
    sourceIdStateKey: "menuDrawerPostId",
  })
  const openCommentsPostId = commentsDrawer.openId
  const activeCommentsPost =
    posts.find((post) => post.id === openCommentsPostId) ??
    group.posts.find((post) => post.id === openCommentsPostId) ??
    null
  const openMenuPostId = menuDrawer.openId
  const activeMenuPost =
    posts.find((post) => post.id === openMenuPostId) ??
    group.posts.find((post) => post.id === openMenuPostId) ??
    null

  function handleCommentsOpen(postId: string) {
    commentsDrawer.open(postId)
  }

  function handleCommentsOpenChange(nextOpen: boolean) {
    if (nextOpen || !openCommentsPostId) return

    commentsDrawer.close()
  }

  function handleMenuOpen(postId: string) {
    menuDrawer.open(postId)
  }

  function handleMenuOpenChange(nextOpen: boolean) {
    if (nextOpen || !openMenuPostId) return

    menuDrawer.close()
  }

  return (
    <section className={cn("min-h-screen bg-background text-foreground", className)}>
      <header className="sticky top-0 z-10 border-b border-border/60 bg-card/95 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-text-faint hover:bg-muted hover:text-text-strong"
                aria-label="Go back"
              >
                <ArrowLeft className="size-5" strokeWidth={2.35} />
              </Button>
              <h1 className="truncate text-[1.45rem] leading-none font-semibold tracking-tight">
                {group.name}
              </h1>
            </div>
          </div>

          {hasModes ? (
            <div className="mt-3 flex items-center gap-2.5">
              {group.modes?.map((mode) => {
                const isActive = mode.id === group.activeModeId

                return (
                  <Button
                    key={mode.id}
                    type="button"
                    className={cn(
                      "h-10 rounded-full border px-5 text-sm font-semibold shadow-none transition-colors",
                      isActive
                        ? "border-brand-green-light bg-brand-green-light text-brand-green-foreground hover:bg-emerald-400"
                        : "border-border bg-background/80 text-text-strong hover:bg-muted"
                    )}
                    aria-pressed={isActive}
                  >
                    {mode.label}
                  </Button>
                )
              })}
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-2.5">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-faint"
                strokeWidth={2.1}
              />
              <Input
                type="search"
                placeholder="게시글 검색"
                className="h-9 rounded-xl border-border bg-background/70 pr-3.5 pl-9 text-sm shadow-none placeholder:text-text-faint focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 rounded-xl border border-border bg-background/80 px-3.5 text-sm font-medium text-text-faint shadow-none hover:bg-muted hover:text-text-strong"
                >
                  최신순
                  <ChevronDown className="size-4" strokeWidth={2.1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 rounded-xl">
                <DropdownMenuItem>최신순</DropdownMenuItem>
                <DropdownMenuItem>인기순</DropdownMenuItem>
                <DropdownMenuItem>댓글순</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <GroupPostListCards
        posts={posts}
        onCommentOpen={handleCommentsOpen}
        onMenuOpen={handleMenuOpen}
      />

      <div className="pointer-events-none fixed right-0 bottom-0 left-0 flex justify-end px-4 pb-10 pt-12 sm:px-6">
        <Button
          type="button"
          size="icon"
          className="pointer-events-auto size-14 rounded-full bg-brand-green text-brand-green-foreground shadow-[0_14px_32px_rgba(52,211,153,0.35)] hover:bg-emerald-500"
          aria-label="Create post"
        >
          <Plus className="size-7" strokeWidth={2.2} />
        </Button>
      </div>

      <GroupPostCommentsDrawer
        open={Boolean(activeCommentsPost)}
        onOpenChange={handleCommentsOpenChange}
        commentItems={activeCommentsPost?.post_comments ?? []}
        postAuthorId={activeCommentsPost?.author_id}
      />

      <GroupPostOverflowMenuDrawer
        open={Boolean(activeMenuPost)}
        onOpenChange={handleMenuOpenChange}
      />
    </section>
  )
}

const GroupPostListCards = memo(function GroupPostListCards({
  posts,
  onCommentOpen,
  onMenuOpen,
}: {
  posts: GroupPost[]
  onCommentOpen: (postId: string) => void
  onMenuOpen: (postId: string) => void
}) {
  return (
    <div>
      {posts.map((post) => (
        <GroupPostCard
          key={post.id}
          post={post}
          timeVariant="relative"
          onCommentClick={() => onCommentOpen(post.id)}
          onOverflowMenuClick={() => onMenuOpen(post.id)}
        />
      ))}
    </div>
  )
})
