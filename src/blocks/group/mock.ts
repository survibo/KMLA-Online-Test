import type {
  GroupComment,
  GroupCommentRecord,
  GroupPost,
  GroupPostImage,
  GroupPostRecord,
  GroupReaction,
  GroupRecord,
  GroupUser,
} from "./types"

export type GroupPostMockData = {
  users: GroupUser[]
  groups: GroupRecord[]
  posts: GroupPostRecord[]
  post_images: GroupPostImage[]
  post_comments: GroupCommentRecord[]
  post_reactions: GroupReaction[]
  comment_reactions: GroupReaction[]
}

export const baseGroupPostMainGroupId = "c108d2a4-1f4d-4db5-bd75-5b413d4e6a29"
export const baseGroupPostListGroupId = "6f6e9a30-6078-4f80-99e7-42f6d4f6b0c7"

export const baseGroupPostPrimaryPostId = "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1"
export const baseGroupPostLatestPostId = "24ba4ff5-0b6d-49cd-8de7-93f7659b92eb"
export const baseGroupPostSecondPostId = "712c98eb-e5f8-4f0f-a7df-0fca91e277cb"
export const baseGroupPostThirdPostId = "0f29f5de-28c0-46be-9274-f8ba70e8e428"
export const baseGroupPostFourthPostId = "d969b2ea-c27a-43aa-b809-fcb67948320a"

export const baseGroupPostUsers: GroupUser[] = [
  { id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", name: "이주형", img: null },
  { id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", name: "박채은", img: null },
  { id: "77709928-52dc-4f5f-ae81-dc18edb641e6", name: "김서윤", img: null },
  { id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49", name: "정수민", img: null },
  { id: "890aa09e-7a2f-4963-bd48-e7214efd2a0d", name: "오민재", img: null },
  { id: "c2ecfe2d-e2e2-4808-ac65-f2014cf03efa", name: "최도현", img: null },
  { id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5", name: "강하린", img: null },
  { id: "f6fdb3ab-fab2-4c70-9c3b-c3b78cca5140", name: "한지우", img: null },
  { id: "b27f2ebf-e715-49b2-8380-626c29bcfed6", name: "남도윤", img: null },
]

export const baseGroupPostGroups: GroupRecord[] = [
  {
    id: baseGroupPostMainGroupId,
    name: "학생자치회",
    description: "기숙사 운영과 생활 공지를 관리하는 공식 그룹",
    is_official: true,
    is_personal: false,
    created_at: "2026-03-01T09:00:00+09:00",
  },
  {
    id: baseGroupPostListGroupId,
    name: "행정위원회",
    description: "기숙사 운영과 생활 공지를 관리하는 공식 그룹",
    is_official: true,
    is_personal: false,
    created_at: "2026-03-01T09:00:00+09:00",
  },
]

function createListPostRecord(
  id: string,
  createdAt: string,
  title: string,
  content: string,
  authorId: string
): GroupPostRecord {
  return {
    id,
    group_id: baseGroupPostListGroupId,
    author_id: authorId,
    title,
    content,
    comment_count: 1,
    reaction_count: 3,
    created_at: createdAt,
    updated_at: null,
    deleted_at: null,
  }
}

export const baseGroupPostRecords: GroupPostRecord[] = [
  {
    id: baseGroupPostPrimaryPostId,
    group_id: baseGroupPostMainGroupId,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    title: "민사관 의류장 납품 안내",
    content:
      "안녕하세요. 38대 학생자치회입니다.\n의류장 비용 납품 관련 안내드립니다.",
    comment_count: 1,
    reaction_count: 6,
    created_at: "2026-03-20T14:55:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  createListPostRecord(
    baseGroupPostLatestPostId,
    "2026-03-21T00:03:00+09:00",
    "세탁실 점검 일정 안내",
    "이번 주 금요일 오전 7시부터 세탁실 점검이 진행됩니다.",
    "0859f193-a0f4-4eeb-b4dc-a3bc69980c49"
  ),
  createListPostRecord(
    baseGroupPostSecondPostId,
    "2026-03-20T14:55:00+09:00",
    "민사관 의류장 납품 안내",
    "안녕하세요. 38대 학생자치회입니다.\n의류장 비용 납품 관련 안내드립니다.",
    "1d41df50-5d98-4e37-b12e-e9d830f04f34"
  ),
  createListPostRecord(
    baseGroupPostThirdPostId,
    "2026-03-19T10:15:00+09:00",
    "주말 자습실 운영 변경",
    "주말 자습실은 시험 기간 동안 24시간 개방으로 전환됩니다.",
    "77709928-52dc-4f5f-ae81-dc18edb641e6"
  ),
  createListPostRecord(
    baseGroupPostFourthPostId,
    "2026-03-18T08:30:00+09:00",
    "체육관 사용 신청",
    "동아리 체육관 사용은 수요일까지 신청서를 제출해 주세요.",
    "c2ecfe2d-e2e2-4808-ac65-f2014cf03efa"
  ),
]

export const baseGroupPostImages: GroupPostImage[] = [
  {
    id: "f29e9590-8e2c-4758-b0a2-67d9e413bb11",
    post_id: baseGroupPostPrimaryPostId,
    url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    sort_order: 0,
    alt: "흰 반팔 티셔츠 전면 사진",
    width: 1200,
    height: 1600,
    created_at: "2026-03-20T14:55:00+09:00",
  },
  {
    id: "d4f72f6a-ea36-4d49-9600-d85fd5516a6b",
    post_id: baseGroupPostPrimaryPostId,
    url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    sort_order: 1,
    alt: "검은 티셔츠 측면 사진",
    width: 900,
    height: 1350,
    created_at: "2026-03-20T14:55:00+09:00",
  },
  {
    id: "4e2c8dd3-3011-470f-b829-28d47779fba8",
    post_id: baseGroupPostPrimaryPostId,
    url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
    sort_order: 2,
    alt: "매장 내부 의류 진열 사진",
    width: 900,
    height: 1350,
    created_at: "2026-03-20T14:55:00+09:00",
  },
  {
    id: "fbf6ea6e-c1de-459a-8c65-97a140a62f62",
    post_id: baseGroupPostPrimaryPostId,
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    sort_order: 3,
    alt: "추가 의류 스타일 사진",
    width: 900,
    height: 1350,
    created_at: "2026-03-20T14:55:00+09:00",
  },
]

export const baseGroupPostComments: GroupCommentRecord[] = [
  {
    id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    post_id: baseGroupPostPrimaryPostId,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: null,
    content: "명단은 오늘 저녁까지 댓글로 남겨 주세요.",
    reply_count: 3,
    created_at: "2026-03-20T14:55:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "fc53113f-9c62-4e17-934a-845f4a74d1cf",
    post_id: baseGroupPostPrimaryPostId,
    author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
    parent_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    content: "사이즈 체크표도 같이 올려 주실 수 있을까요?",
    reply_count: 0,
    created_at: "2026-03-20T15:11:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "4335601d-50dd-4d4f-87df-c4528965e1cf",
    post_id: baseGroupPostPrimaryPostId,
    author_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
    parent_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    content: "납부 마감 시간이 몇 시인지도 함께 알려 주세요.",
    reply_count: 0,
    created_at: "2026-03-20T15:16:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "1ac87654-188c-4527-a115-d8f6d589c51b",
    post_id: baseGroupPostPrimaryPostId,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79",
    content: "네, 오늘 공지 본문에 사이즈표 이미지도 추가하겠습니다.",
    reply_count: 0,
    created_at: "2026-03-20T15:18:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "latest-root-comment",
    post_id: baseGroupPostLatestPostId,
    author_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
    parent_id: null,
    content: "점검 시작 전에 세탁물을 꼭 비워 주세요.",
    reply_count: 1,
    created_at: "2026-03-21T00:10:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "latest-reply-comment",
    post_id: baseGroupPostLatestPostId,
    author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
    parent_id: "latest-root-comment",
    content: "건조기는 점검 대상에서 제외인지도 궁금합니다.",
    reply_count: 0,
    created_at: "2026-03-21T00:14:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "second-root-comment",
    post_id: baseGroupPostSecondPostId,
    author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    parent_id: null,
    content: "명단은 오늘 저녁까지 댓글로 남겨 주세요.",
    reply_count: 1,
    created_at: "2026-03-20T14:55:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "second-reply-comment",
    post_id: baseGroupPostSecondPostId,
    author_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
    parent_id: "second-root-comment",
    content: "사이즈 체크표도 같이 올려 주실 수 있을까요?",
    reply_count: 0,
    created_at: "2026-03-20T15:11:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "third-root-comment",
    post_id: baseGroupPostThirdPostId,
    author_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
    parent_id: null,
    content: "야간 출입 카드 등록도 같이 필요한가요?",
    reply_count: 0,
    created_at: "2026-03-19T10:21:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: "fourth-root-comment",
    post_id: baseGroupPostFourthPostId,
    author_id: "c2ecfe2d-e2e2-4808-ac65-f2014cf03efa",
    parent_id: null,
    content: "신청 전에 장비 반입 여부도 함께 적어 주세요.",
    reply_count: 0,
    created_at: "2026-03-18T08:41:00+09:00",
    updated_at: null,
    deleted_at: null,
  },
]

export const baseGroupPostReactions: GroupReaction[] = [
  { id: "22b4f681-bde1-4d9b-b655-b08dc3a728d6", post_id: baseGroupPostPrimaryPostId, user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", type: "like", created_at: "2026-03-20T15:00:00+09:00" },
  { id: "90d828c1-cd3b-45ae-b793-d544c6db63da", post_id: baseGroupPostPrimaryPostId, user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "love", created_at: "2026-03-20T15:01:00+09:00" },
  { id: "87ec1b2d-7be0-4f06-9540-7b8d7719617d", post_id: baseGroupPostPrimaryPostId, user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6", type: "like", created_at: "2026-03-20T15:03:00+09:00" },
  { id: "11102cc8-3e34-4a75-bf75-bc518dd6bd0d", post_id: baseGroupPostPrimaryPostId, user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49", type: "wow", created_at: "2026-03-20T15:07:00+09:00" },
  { id: "f4f44e91-1d8f-4623-acd6-a989cf90666f", post_id: baseGroupPostPrimaryPostId, user_id: "b27f2ebf-e715-49b2-8380-626c29bcfed6", type: "like", created_at: "2026-03-20T15:08:00+09:00" },
  { id: "c4d3a96b-4117-488d-aac2-a0a79ad0a36c", post_id: baseGroupPostPrimaryPostId, user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5", type: "like", created_at: "2026-03-20T15:10:00+09:00" },
  { id: "latest-post-like-1", post_id: baseGroupPostLatestPostId, user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "like", created_at: "2026-03-21T00:05:00+09:00" },
  { id: "latest-post-like-2", post_id: baseGroupPostLatestPostId, user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6", type: "like", created_at: "2026-03-21T00:06:00+09:00" },
  { id: "latest-post-love-1", post_id: baseGroupPostLatestPostId, user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", type: "love", created_at: "2026-03-21T00:07:00+09:00" },
  { id: "second-post-like-1", post_id: baseGroupPostSecondPostId, user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", type: "like", created_at: "2026-03-20T15:00:00+09:00" },
  { id: "second-post-love-1", post_id: baseGroupPostSecondPostId, user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "love", created_at: "2026-03-20T15:01:00+09:00" },
  { id: "second-post-like-2", post_id: baseGroupPostSecondPostId, user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6", type: "like", created_at: "2026-03-20T15:03:00+09:00" },
  { id: "third-post-like-1", post_id: baseGroupPostThirdPostId, user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", type: "like", created_at: "2026-03-19T10:18:00+09:00" },
  { id: "third-post-like-2", post_id: baseGroupPostThirdPostId, user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49", type: "like", created_at: "2026-03-19T10:19:00+09:00" },
  { id: "third-post-love-1", post_id: baseGroupPostThirdPostId, user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "love", created_at: "2026-03-19T10:20:00+09:00" },
  { id: "fourth-post-like-1", post_id: baseGroupPostFourthPostId, user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6", type: "like", created_at: "2026-03-18T08:35:00+09:00" },
  { id: "fourth-post-like-2", post_id: baseGroupPostFourthPostId, user_id: "4f2d6bd8-7399-47ea-9be9-5be2f83750a5", type: "like", created_at: "2026-03-18T08:36:00+09:00" },
  { id: "fourth-post-wow-1", post_id: baseGroupPostFourthPostId, user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49", type: "wow", created_at: "2026-03-18T08:37:00+09:00" },
]

export const baseGroupCommentReactions: GroupReaction[] = [
  { id: "7ff70689-b3a7-4e06-a370-c2b7a895633c", comment_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79", user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "like", created_at: "2026-03-20T14:57:00+09:00" },
  { id: "fa3ca570-8baa-47c3-b772-e97d85dc79fd", comment_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79", user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6", type: "like", created_at: "2026-03-20T14:58:00+09:00" },
  { id: "425f11d2-b20c-4682-89b7-0fa7560f9b58", comment_id: "b741b315-d9c5-4568-bfb8-97a58c48bc79", user_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49", type: "like", created_at: "2026-03-20T15:00:00+09:00" },
  { id: "418ec39d-a8ce-42d3-b503-5dfc4d4bcae7", comment_id: "fc53113f-9c62-4e17-934a-845f4a74d1cf", user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34", type: "like", created_at: "2026-03-20T15:12:00+09:00" },
  { id: "9b8d150c-a196-41b7-a030-41f75ba8f136", comment_id: "1ac87654-188c-4527-a115-d8f6d589c51b", user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67", type: "love", created_at: "2026-03-20T15:19:00+09:00" },
]

export const baseGroupPostMockData: GroupPostMockData = {
  users: baseGroupPostUsers,
  groups: baseGroupPostGroups,
  posts: baseGroupPostRecords,
  post_images: baseGroupPostImages,
  post_comments: baseGroupPostComments,
  post_reactions: baseGroupPostReactions,
  comment_reactions: baseGroupCommentReactions,
}

function cloneUser(user: GroupUser) {
  return { ...user }
}

function cloneGroup(group: GroupRecord) {
  return { ...group }
}

function clonePost(post: GroupPostRecord) {
  return { ...post }
}

function cloneImage(image: GroupPostImage) {
  return { ...image }
}

function cloneComment(comment: GroupCommentRecord) {
  return { ...comment }
}

function cloneReaction(reaction: GroupReaction) {
  return { ...reaction }
}

export function createGroupPostMockData(
  overrides: Partial<GroupPostMockData> = {}
): GroupPostMockData {
  return {
    users: (overrides.users ?? baseGroupPostMockData.users).map(cloneUser),
    groups: (overrides.groups ?? baseGroupPostMockData.groups).map(cloneGroup),
    posts: (overrides.posts ?? baseGroupPostMockData.posts).map(clonePost),
    post_images: (overrides.post_images ?? baseGroupPostMockData.post_images).map(
      cloneImage
    ),
    post_comments: (
      overrides.post_comments ?? baseGroupPostMockData.post_comments
    ).map(cloneComment),
    post_reactions: (
      overrides.post_reactions ?? baseGroupPostMockData.post_reactions
    ).map(cloneReaction),
    comment_reactions: (
      overrides.comment_reactions ?? baseGroupCommentReactions
    ).map(cloneReaction),
  }
}

function findUser(users: GroupUser[], userId: string) {
  const user = users.find((item) => item.id === userId)

  if (!user) {
    throw new Error(`Missing group user for ${userId}`)
  }

  return user
}

function findGroup(groups: GroupRecord[], groupId: string) {
  const group = groups.find((item) => item.id === groupId)

  if (!group) {
    throw new Error(`Missing group for ${groupId}`)
  }

  return group
}

export function getGroupPostComments(
  postId: string,
  data: GroupPostMockData = baseGroupPostMockData
): GroupComment[] {
  return data.post_comments
    .filter((comment) => comment.post_id === postId && !comment.deleted_at)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map((comment) => ({
      ...comment,
      author: findUser(data.users, comment.author_id),
      comment_reactions: data.comment_reactions
        .filter((reaction) => reaction.comment_id === comment.id)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map(cloneReaction),
    }))
}

export function getGroupPostById(
  postId: string,
  data: GroupPostMockData = baseGroupPostMockData
): GroupPost {
  const post = data.posts.find((item) => item.id === postId && !item.deleted_at)

  if (!post) {
    throw new Error(`Missing group post for ${postId}`)
  }

  return {
    ...post,
    author: findUser(data.users, post.author_id),
    post_images: data.post_images
      .filter((image) => image.post_id === post.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(cloneImage),
    post_comments: getGroupPostComments(post.id, data),
    post_reactions: data.post_reactions
      .filter((reaction) => reaction.post_id === post.id)
      .sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .map(cloneReaction),
  }
}

export function getGroupPostListGroupById(
  groupId: string,
  data: GroupPostMockData = baseGroupPostMockData
) {
  const group = findGroup(data.groups, groupId)
  const posts = data.posts
    .filter((post) => post.group_id === groupId && !post.deleted_at)
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((post) => getGroupPostById(post.id, data))

  return {
    ...group,
    posts,
  }
}
