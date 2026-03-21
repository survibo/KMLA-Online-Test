import type { GroupPost } from "@/blocks/group/types"

export type GroupPostListData = GroupPost[]

export type GroupPostListModeId = "sell" | "buy"

export type GroupPostListMode = {
  id: GroupPostListModeId
  label: string
}

export type GroupPostListGroup = {
  id: string
  name: string
  description: string | null
  is_official: boolean
  is_personal: boolean
  created_at: string
  posts: GroupPostListData
  modes?: GroupPostListMode[]
  activeModeId?: GroupPostListModeId
  postModeById?: Partial<Record<string, GroupPostListModeId>>
}
