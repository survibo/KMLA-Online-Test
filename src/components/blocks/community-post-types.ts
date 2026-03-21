export type CommunityUser = {
  id: string
  name: string
  img?: string | null
}

export type CommunityPostImage = {
  id: string
  post_id: string
  url: string
  sort_order: number
  created_at: string
  alt?: string
  width?: number | null
  height?: number | null
}

export type CommunityReaction = {
  id: string
  post_id?: string
  comment_id?: string
  user_id: string
  type: string
  created_at: string
}

export type CommunityComment = {
  id: string
  post_id: string
  author_id: string
  parent_id?: string | null
  content: string
  reply_count?: number
  created_at: string
  updated_at?: string | null
  deleted_at?: string | null
  author: CommunityUser
  comment_reactions?: CommunityReaction[]
}

export type CommunityPost = {
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
  author: CommunityUser
  post_images?: CommunityPostImage[]
  post_reactions?: CommunityReaction[]
}
