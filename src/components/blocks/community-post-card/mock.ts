import type { CommunityPostCardData } from "./types"

export const sampleCommunityPostCardPost: CommunityPostCardData = {
  id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
  group_id: "c108d2a4-1f4d-4db5-bd75-5b413d4e6a29",
  author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
  author: {
    id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    name: "28기 이주형",
    img: null,
  },
  created_at: "2026-03-20 14:55",
  updated_at: null,
  deleted_at: null,
  title: "민사관 의류장 납품 안내",
  content:
    "안녕하세요. 38대 학생자치회입니다.\n의류장 비용 납품 관련 안내드립니다.",
  post_images: [
    {
      id: "f29e9590-8e2c-4758-b0a2-67d9e413bb11",
      post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      sort_order: 0,
      created_at: "2026-03-20 14:55",
      alt: "의류장 정면 사진",
    },
  ],
  post_reactions: [
    {
      user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      type: "like",
      created_at: "2026-03-20 15:00",
    },
    {
      user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      type: "love",
      created_at: "2026-03-20 15:01",
    },
    {
      user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
      type: "like",
      created_at: "2026-03-20 15:03",
    },
  ],
  comment_count: 2,
}
