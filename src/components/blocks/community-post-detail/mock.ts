import type {
  CommunityPostDetailCommentData,
  CommunityPostDetailData,
} from "./types"

export const sampleCommunityPostDetailPost: CommunityPostDetailData = {
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
    {
      id: "d4f72f6a-ea36-4d49-9600-d85fd5516a6b",
      post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
      url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      sort_order: 1,
      created_at: "2026-03-20 14:55",
      alt: "의류장 측면 사진",
    },
    {
      id: "4e2c8dd3-3011-470f-b829-28d47779fba8",
      post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
      sort_order: 2,
      created_at: "2026-03-20 14:55",
      alt: "의류장 내부 사진",
    },
    {
      id: "fbf6ea6e-c1de-459a-8c65-97a140a62f62",
      post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      sort_order: 3,
      created_at: "2026-03-20 14:55",
      alt: "의류장 추가 사진",
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
    {
      user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
      type: "wow",
      created_at: "2026-03-20 15:07",
    },
    {
      user_id: "b27f2ebf-e715-49b2-8380-626c29bcfed6",
      type: "like",
      created_at: "2026-03-20 15:08",
    },
    {
      user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5",
      type: "like",
      created_at: "2026-03-20 15:10",
    },
  ],
  comment_count: 2,
}

export const sampleCommunityPostDetailComments: CommunityPostDetailCommentData[] = [
  {
    id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: null,
    author: {
      id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      name: "28기 이주형",
      img: null,
    },
    created_at: "2026-03-20 14:55",
    updated_at: null,
    deleted_at: null,
    content: "명단은 아래에 첨부해두었습니다.",
    comment_reactions: [
      {
        user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
        type: "like",
        created_at: "2026-03-20 14:57",
      },
      {
        user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
        type: "like",
        created_at: "2026-03-20 14:58",
      },
      {
        user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
        type: "like",
        created_at: "2026-03-20 15:00",
      },
      {
        user_id: "b27f2ebf-e715-49b2-8380-626c29bcfed6",
        type: "like",
        created_at: "2026-03-20 15:02",
      },
      {
        user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5",
        type: "love",
        created_at: "2026-03-20 15:03",
      },
      {
        user_id: "8cb96d24-e86d-410f-a7c6-99c2e0b394ea",
        type: "like",
        created_at: "2026-03-20 15:04",
      },
    ],
  },
  {
    id: "fc53113f-9c62-4e17-934a-845f4a74d1cf",
    post_id: "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1",
    author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
    parent_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    author: {
      id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      name: "28기 박지윤",
      img: null,
    },
    created_at: "2026-03-20 15:11",
    updated_at: null,
    deleted_at: null,
    content: "사이즈 체크용 마크도 같이 올려주실 수 있나요?",
    comment_reactions: [
      {
        user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
        type: "like",
        created_at: "2026-03-20 15:12",
      },
    ],
  },
]
