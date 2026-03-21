export type GroupUser = {
  id: string
  name: string
  img: string | null
}

export type GroupRecord = {
  id: string
  name: string
  description: string | null
  is_official: boolean
  is_personal: boolean
  created_at: string
}

export type GroupPostImage = {
  id: string
  post_id: string
  url: string
  sort_order: number
  created_at: string
  alt: string | null
  width?: number | null
  height?: number | null
}

export type GroupReactionType =
  | "like"
  | "love"
  | "laugh"
  | "wow"
  | "sad"
  | "angry"

export type GroupReaction = {
  id: string
  post_id?: string
  comment_id?: string
  user_id: string
  type: GroupReactionType
  created_at: string
}

export type GroupPostRecord = {
  id: string
  group_id: string
  author_id: string
  title?: string | null
  content?: string | null
  comment_count?: number
  reaction_count?: number
  created_at: string
  updated_at?: string | null
  deleted_at?: string | null
}

export type GroupCommentRecord = {
  id: string
  post_id: string
  author_id: string
  parent_id?: string | null
  content: string
  reply_count?: number
  created_at: string
  updated_at?: string | null
  deleted_at?: string | null
}

export type GroupComment = {
  id: string
  post_id: string
  author_id: string
  parent_id?: string | null
  content: string
  reply_count?: number
  created_at: string
  updated_at?: string | null
  deleted_at?: string | null
  author: GroupUser
  comment_reactions?: GroupReaction[]
}

export type GroupPost = {
  id: string
  group_id: string
  author_id: string
  title?: string | null
  content?: string | null
  comment_count?: number
  reaction_count?: number
  created_at: string
  updated_at?: string | null
  deleted_at?: string | null
  author: GroupUser
  post_images?: GroupPostImage[]
  post_comments?: GroupComment[]
  post_reactions?: GroupReaction[]
}
