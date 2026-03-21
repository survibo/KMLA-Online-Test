import type {
  GroupPostDetailCommentData,
  GroupPostDetailData,
} from "./types"

const POST_ID = "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1"
const ROOT_COMMENT_ID = "b741b315-d9c5-4568-bfb8-97a58c48bc79"

export const baseGroupPostDetailPost: GroupPostDetailData = {
  id: POST_ID,
  group_id: "c108d2a4-1f4d-4db5-bd75-5b413d4e6a29",
  author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
  author: {
    id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    name: "28기 이주형",
    img: null,
  },
  created_at: "2026-03-20T14:55:00+09:00",
  updated_at: null,
  deleted_at: null,
  title: "민사관 의류장 납품 안내",
  content:
    "안녕하세요. 38대 학생자치회입니다.\n의류장 비용 납품 관련 안내드립니다.",
  comment_count: 1,
  reaction_count: 6,
  post_images: [
    {
      id: "f29e9590-8e2c-4758-b0a2-67d9e413bb11",
      post_id: POST_ID,
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      sort_order: 0,
      alt: "흰 반팔 티셔츠 전면 사진",
      width: 1200,
      height: 1600,
      created_at: "2026-03-20T14:55:00+09:00",
    },
    {
      id: "d4f72f6a-ea36-4d49-9600-d85fd5516a6b",
      post_id: POST_ID,
      url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      sort_order: 1,
      alt: "검은 티셔츠 측면 사진",
      width: 900,
      height: 1350,
      created_at: "2026-03-20T14:55:00+09:00",
    },
    {
      id: "4e2c8dd3-3011-470f-b829-28d47779fba8",
      post_id: POST_ID,
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
      sort_order: 2,
      alt: "매장 내부 의류 진열 사진",
      width: 900,
      height: 1350,
      created_at: "2026-03-20T14:55:00+09:00",
    },
    {
      id: "fbf6ea6e-c1de-459a-8c65-97a140a62f62",
      post_id: POST_ID,
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      sort_order: 3,
      alt: "추가 의류 스타일 사진",
      width: 900,
      height: 1350,
      created_at: "2026-03-20T14:55:00+09:00",
    },
  ],
  post_reactions: [
    {
      id: "22b4f681-bde1-4d9b-b655-b08dc3a728d6",
      post_id: POST_ID,
      user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      type: "like",
      created_at: "2026-03-20T15:00:00+09:00",
    },
    {
      id: "90d828c1-cd3b-45ae-b793-d544c6db63da",
      post_id: POST_ID,
      user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      type: "love",
      created_at: "2026-03-20T15:01:00+09:00",
    },
    {
      id: "87ec1b2d-7be0-4f06-9540-7b8d7719617d",
      post_id: POST_ID,
      user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
      type: "like",
      created_at: "2026-03-20T15:03:00+09:00",
    },
    {
      id: "11102cc8-3e34-4a75-bf75-bc518dd6bd0d",
      post_id: POST_ID,
      user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
      type: "wow",
      created_at: "2026-03-20T15:07:00+09:00",
    },
    {
      id: "f4f44e91-1d8f-4623-acd6-a989cf90666f",
      post_id: POST_ID,
      user_id: "b27f2ebf-e715-49b2-8380-626c29bcfed6",
      type: "like",
      created_at: "2026-03-20T15:08:00+09:00",
    },
    {
      id: "c4d3a96b-4117-488d-aac2-a0a79ad0a36c",
      post_id: POST_ID,
      user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5",
      type: "like",
      created_at: "2026-03-20T15:10:00+09:00",
    },
  ],
}

export const baseGroupPostDetailComments: GroupPostDetailCommentData[] = [
  {
    id: ROOT_COMMENT_ID,
    post_id: POST_ID,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: null,
    author: {
      id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      name: "28기 이주형",
      img: null,
    },
    content: "명단은 오늘 저녁까지 댓글로 남겨 주세요.",
    reply_count: 3,
    created_at: "2026-03-20T14:55:00+09:00",
    updated_at: null,
    deleted_at: null,
    comment_reactions: [
      {
        id: "7ff70689-b3a7-4e06-a370-c2b7a895633c",
        comment_id: ROOT_COMMENT_ID,
        user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
        type: "like",
        created_at: "2026-03-20T14:57:00+09:00",
      },
      {
        id: "fa3ca570-8baa-47c3-b772-e97d85dc79fd",
        comment_id: ROOT_COMMENT_ID,
        user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
        type: "like",
        created_at: "2026-03-20T14:58:00+09:00",
      },
      {
        id: "425f11d2-b20c-4682-89b7-0fa7560f9b58",
        comment_id: ROOT_COMMENT_ID,
        user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
        type: "like",
        created_at: "2026-03-20T15:00:00+09:00",
      },
    ],
  },
  {
    id: "fc53113f-9c62-4e17-934a-845f4a74d1cf",
    post_id: POST_ID,
    author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
    parent_id: ROOT_COMMENT_ID,
    author: {
      id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      name: "28기 박채은",
      img: null,
    },
    content: "사이즈 체크표도 같이 올려 주실 수 있을까요?",
    reply_count: 0,
    created_at: "2026-03-20T15:11:00+09:00",
    updated_at: null,
    deleted_at: null,
    comment_reactions: [
      {
        id: "418ec39d-a8ce-42d3-b503-5dfc4d4bcae7",
        comment_id: "fc53113f-9c62-4e17-934a-845f4a74d1cf",
        user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
        type: "like",
        created_at: "2026-03-20T15:12:00+09:00",
      },
    ],
  },
  {
    id: "4335601d-50dd-4d4f-87df-c4528965e1cf",
    post_id: POST_ID,
    author_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
    parent_id: ROOT_COMMENT_ID,
    author: {
      id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
      name: "29기 김서윤",
      img: null,
    },
    content: "납부 마감 시간이 몇 시인지도 함께 알려 주세요.",
    reply_count: 0,
    created_at: "2026-03-20T15:16:00+09:00",
    updated_at: null,
    deleted_at: null,
    comment_reactions: [],
  },
  {
    id: "1ac87654-188c-4527-a115-d8f6d589c51b",
    post_id: POST_ID,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: ROOT_COMMENT_ID,
    author: {
      id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      name: "28기 이주형",
      img: null,
    },
    content: "네, 오늘 공지 본문에 사이즈표 이미지도 추가하겠습니다.",
    reply_count: 0,
    created_at: "2026-03-20T15:18:00+09:00",
    updated_at: null,
    deleted_at: null,
    comment_reactions: [
      {
        id: "9b8d150c-a196-41b7-a030-41f75ba8f136",
        comment_id: "1ac87654-188c-4527-a115-d8f6d589c51b",
        user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
        type: "love",
        created_at: "2026-03-20T15:19:00+09:00",
      },
    ],
  },
]

function cloneComment(
  comment: GroupPostDetailCommentData
): GroupPostDetailCommentData {
  return {
    ...comment,
    author: { ...comment.author },
    comment_reactions: comment.comment_reactions?.map((reaction) => ({
      ...reaction,
    })),
  }
}

export function createGroupPostDetailPost(
  overrides: Partial<GroupPostDetailData> = {}
): GroupPostDetailData {
  return {
    ...baseGroupPostDetailPost,
    ...overrides,
    author: { ...(overrides.author ?? baseGroupPostDetailPost.author) },
    post_images: (overrides.post_images ?? baseGroupPostDetailPost.post_images)?.map(
      (image) => ({ ...image })
    ),
    post_reactions: (
      overrides.post_reactions ?? baseGroupPostDetailPost.post_reactions
    )?.map((reaction) => ({ ...reaction })),
  }
}

export function createGroupPostDetailComments(
  comments: GroupPostDetailCommentData[] = baseGroupPostDetailComments
) {
  return comments.map(cloneComment)
}
