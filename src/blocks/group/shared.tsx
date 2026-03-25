import { useState, type ReactNode } from "react"
import {
  EllipsisVertical,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { formatIsoDateTime, formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type {
  GroupPost,
  GroupPostImage,
  GroupUser,
} from "@/blocks/group/types"

export function getGroupInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function GroupPostAvatar({
  author,
  size = "lg",
  className,
}: {
  author: GroupUser
  size?: "xs" | "sm" | "lg"
  className?: string
}) {
  const avatarClassName =
    size === "xs" ? "size-7" : size === "sm" ? "size-9" : "size-10"
  const avatarSize = size === "lg" ? "lg" : "default"

  return (
    <Avatar size={avatarSize} className={cn(avatarClassName, "shrink-0", className)}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-muted font-semibold text-text-faint">
        {getGroupInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function GroupPostHeader({
  author,
  createdAt,
  timeVariant = "absolute",
  onAvatarClick,
  trailing,
}: {
  author: GroupUser
  createdAt: string
  timeVariant?: "absolute" | "relative"
  onAvatarClick?: () => void
  trailing?: ReactNode
}) {
  const formattedCreatedAt =
    timeVariant === "relative"
      ? formatRelativeTime(createdAt)
      : formatIsoDateTime(createdAt)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-2.5">
        <button
          type="button"
          className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={`${author.name} 프로필 보기`}
          onClick={onAvatarClick}
        >
          <GroupPostAvatar author={author} />
        </button>
        <div className="min-w-0">
          <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-text-strong">
            {author.name}
          </p>
          <p className="mt-0.5 text-[0.875rem] leading-5 font-medium text-text-faint">
            {formattedCreatedAt}
          </p>
        </div>
      </div>

      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  )
}

export function GroupPostOverflowMenuButton({
  onClick,
}: {
  onClick?: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full text-text-faint hover:bg-muted hover:text-text-strong"
      aria-label="More options"
      onClick={(event) => {
        event.currentTarget.blur()
        onClick?.()
      }}
    >
      <EllipsisVertical className="size-5" />
    </Button>
  )
}

export function GroupPostOverflowMenuDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-[32rem] rounded-t-[1.5rem] bg-background data-[vaul-drawer-direction=bottom]:h-auto data-[vaul-drawer-direction=bottom]:max-h-[80vh]">
        <DrawerHeader className="px-4 pb-2 pt-5 text-left sm:px-5">
          <DrawerTitle className="text-base font-semibold text-text-strong">
            게시글 메뉴
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            게시글에 대해 실행할 수 있는 동작 목록
          </DrawerDescription>
        </DrawerHeader>

        <Separator className="bg-border" />

        <div className="px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-4">
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start rounded-2xl px-4 text-base text-text-strong hover:bg-muted"
            onClick={() => onOpenChange(false)}
          >
            Share
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start rounded-2xl px-4 text-base text-text-strong hover:bg-muted"
            onClick={() => onOpenChange(false)}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start rounded-2xl px-4 text-base text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onOpenChange(false)}
          >
            Report
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function GroupPostOverflowMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GroupPostOverflowMenuButton onClick={() => setOpen(true)} />
      <GroupPostOverflowMenuDrawer open={open} onOpenChange={setOpen} />
    </>
  )
}

export function GroupPostContent({
  post,
  className,
}: {
  post: GroupPost
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {post.title ? (
        <h2 className="text-[1.35rem] leading-[1.12] font-bold tracking-[-0.03em] text-text-strong">
          {post.title}
        </h2>
      ) : null}

      {post.content ? (
        <GroupPostBodyText content={post.content} />
      ) : null}

      <GroupPostGallery
        images={post.post_images}
        altFallback={`${post.title ?? "Post"} attached image`}
      />
    </div>
  )
}

function GroupPostBodyText({
  content,
}: {
  content: string
}) {
  return <p className="whitespace-pre-line break-keep text-text-soft">{content}</p>
}

export function GroupPostGallery({
  images = [],
  altFallback = "Post attachment preview",
}: {
  images?: GroupPostImage[]
  altFallback?: string
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order)
  const featuredImage = sortedImages[0]

  if (!featuredImage) return null

  function openImageViewer(imageId: string) {
    navigate(
      {
        pathname: "/photo",
        search: `?image=${imageId}`,
      },
      {
        state: {
          fromPath: `${location.pathname}${location.search}`,
        },
      }
    )
  }

  return (
    <button
      type="button"
      className="relative block w-full overflow-hidden rounded-[1.5rem] bg-muted"
      onClick={() => openImageViewer(featuredImage.id)}
      aria-label={
        sortedImages.length > 1
          ? `게시글 이미지 ${sortedImages.length}장을 크게 보기`
          : "게시글 이미지를 크게 보기"
      }
    >
      <img
        src={featuredImage.url}
        alt={featuredImage.alt ?? altFallback}
        className="aspect-square w-full object-cover transition-transform duration-200 hover:scale-[1.01]"
      />
      {sortedImages.length > 1 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-6xl font-bold text-white">
          +{sortedImages.length - 1}
        </div>
      ) : null}
    </button>
  )
}

export function GroupPostStats({
  post,
  onCommentClick,
}: {
  post: GroupPost
  onCommentClick?: () => void
}) {
  const likes = post.reaction_count ?? post.post_reactions?.length ?? 0
  const comments =
    post.comment_count ??
    post.post_comments?.filter((comment) => comment.parent_id === null).length ??
    0

  return (
    <div className="-ml-1.5 flex items-center gap-0.5 text-sm text-text-faint">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 [&_svg]:size-5.5"
      >
        <ThumbsUp className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-text-faint hover:bg-muted hover:text-text-strong [&_svg]:size-5.5"
        onClick={(event) => {
          event.currentTarget.blur()
          onCommentClick?.()
        }}
      >
        <MessageCircle className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-text-faint hover:bg-muted hover:text-text-strong [&_svg]:size-5.5"
        aria-label="Share post"
      >
        <Share2 className="size-5" strokeWidth={2.2} />
      </Button>
    </div>
  )
}

export function GroupPostSummary({
  post,
  timeVariant = "absolute",
  onAvatarClick,
  trailing,
  showOverflowMenu = true,
  onCommentClick,
  className,
}: {
  post: GroupPost
  timeVariant?: "absolute" | "relative"
  onAvatarClick?: () => void
  trailing?: ReactNode
  showOverflowMenu?: boolean
  onCommentClick?: () => void
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <GroupPostHeader
        author={post.author}
        createdAt={post.created_at}
        timeVariant={timeVariant}
        onAvatarClick={onAvatarClick}
        trailing={trailing ?? (showOverflowMenu ? <GroupPostOverflowMenu /> : null)}
      />
      <div className="space-y-0.5">
        <GroupPostContent post={post} />
        <GroupPostStats post={post} onCommentClick={onCommentClick} />
      </div>
    </div>
  )
}
