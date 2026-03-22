import { Users } from "lucide-react"

import "./styles.css"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import type { ChatRoom, ChatUser } from "./types"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function getOtherMembers(room: ChatRoom, currentUserId?: string) {
  return room.members.filter((member) => member.user_id !== currentUserId)
}

export function getChatRoomDisplayName(room: ChatRoom, currentUserId?: string) {
  if (room.name) return room.name

  const otherMembers = getOtherMembers(room, currentUserId)

  return otherMembers[0]?.user.name ?? room.members[0]?.user.name ?? "새 채팅"
}

export function ChatAvatar({
  user,
  className,
}: {
  user: ChatUser
  className?: string
}) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={user.img} alt={user.name} />
      <AvatarFallback className="bg-muted font-semibold text-text-faint">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function ChatRoomAvatar({
  room,
  currentUserId,
  className,
}: {
  room: ChatRoom
  currentUserId?: string
  className?: string
}) {
  const otherMembers = getOtherMembers(room, currentUserId)
  const primaryUser = otherMembers[0]?.user ?? room.members[0]?.user

  if (!room.is_group && primaryUser) {
    return <ChatAvatar user={primaryUser} className={className} />
  }

  return (
    <div
      className={cn(
        "chat-room-avatar-group flex items-center justify-center rounded-full text-text-strong",
        className
      )}
    >
      <Users className="size-5" strokeWidth={2.2} />
    </div>
  )
}
