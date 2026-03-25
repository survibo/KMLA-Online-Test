import { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupPost } from "@/blocks/group/types"
import {
  GroupCommentComposer,
  GroupCommentsEmptyState,
  GroupCommentsThread,
} from "@/blocks/group/shared-comments"
import {
  GroupPostOverflowMenuButton,
  GroupPostOverflowMenuDrawer,
  GroupPostSummary,
} from "@/blocks/group/shared"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

export function GroupPostDetail({
  post,
  commentItems = [],
  className,
}: GroupPostDetailProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [composerContainer, setComposerContainer] =
    useState<HTMLDivElement | null>(null)
  const [composerOffset, setComposerOffset] = useState(0)
  const openMenuPostId = searchParams.get("menu")
  const isMenuOpen = openMenuPostId === post.id

  useEffect(() => {
    if (!composerContainer || typeof ResizeObserver === "undefined") {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      setComposerOffset(composerContainer.offsetHeight)
    })

    resizeObserver.observe(composerContainer)

    return () => {
      resizeObserver.disconnect()
    }
  }, [composerContainer])

  function updateMenuQuery(nextPostId: string | null, replace = false) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextPostId) {
      nextSearchParams.set("menu", nextPostId)
    } else {
      nextSearchParams.delete("menu")
    }

    const nextSearch = nextSearchParams.toString()

    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      {
        replace,
        state: nextPostId
          ? {
              ...location.state,
              menuDrawerSourcePath: `${location.pathname}${location.search}`,
              menuDrawerPostId: nextPostId,
            }
          : location.state,
      }
    )
  }

  function handleMenuOpen() {
    if (isMenuOpen) return

    updateMenuQuery(post.id)
  }

  function handleMenuOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      handleMenuOpen()
      return
    }

    if (!isMenuOpen) return

    const sourcePath =
      typeof location.state?.menuDrawerSourcePath === "string"
        ? location.state.menuDrawerSourcePath
        : null
    const currentPath = `${location.pathname}${location.search}`

    if (sourcePath && sourcePath !== currentPath) {
      navigate(-1)
      return
    }

    updateMenuQuery(null, true)
  }

  return (
    <section className={cn("min-h-screen w-full bg-background", className)}>
      <div
        className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6"
        style={{
          paddingBottom: composerOffset
            ? `calc(${composerOffset}px + 1.5rem)`
            : undefined,
        }}
      >
        <GroupPostSummary
          post={post}
          trailing={<GroupPostOverflowMenuButton onClick={handleMenuOpen} />}
        />

        <div className="space-y-5">
          <Separator className="bg-border" />
          {commentItems.length > 0 ? (
            <GroupCommentsThread
              commentItems={commentItems}
              postAuthorId={post.author_id}
              className="gap-4"
            />
          ) : (
            <GroupCommentsEmptyState />
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
        <div
          ref={setComposerContainer}
          className="mx-auto w-full max-w-4xl px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6"
        >
          <GroupCommentComposer />
        </div>
      </div>

      <GroupPostOverflowMenuDrawer
        open={isMenuOpen}
        onOpenChange={handleMenuOpenChange}
      />
    </section>
  )
}
