import type { GroupPost } from "@/blocks/group-post/types"

export type GroupPostListData = GroupPost[]

export type GroupPostListGroup = {
  id: string
  name: string
  description: string | null
  is_official: boolean
  is_personal: boolean
  created_at: string
  posts: GroupPostListData
}
