import type {
  ProfileActionId,
  ProfileData,
  ProfileUserContact,
  ProfileUserRecord,
} from "./types"

export const baseProfileUser: ProfileUserRecord = {
  id: "user-park-gwanghyeon",
  name: "박광현",
  student_number: 0,
  class_no: 0,
  grade: 28,
  phone_number: "010-1234-5678",
  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  description: "안녕하세요 28기 박광현입니다.",
  status: "accepted",
  room: 0,
  created_at: "2026-03-10T09:00:00+09:00",
}

export const baseProfileContact: ProfileUserContact = {
  email: "tim.jennings@example.com",
}

export function createProfileData({
  user = {},
  contact = {},
  activeAction = "info",
}: {
  user?: Partial<ProfileUserRecord>
  contact?: Partial<ProfileUserContact>
  activeAction?: ProfileActionId
} = {}): ProfileData {
  const rawUser = {
    ...baseProfileUser,
    ...user,
  }

  const rawContact = {
    ...baseProfileContact,
    ...contact,
  }

  return {
    rawUser,
    rawContact,
    displayName: `${rawUser.grade}기 ${rawUser.name}`,
    subtitle: null,
    avatarUrl: rawUser.img,
    bio: rawUser.description ?? "소개가 아직 없습니다.",
    phoneNumber: rawUser.phone_number ?? "등록된 전화번호가 없습니다.",
    email: rawContact.email ?? "등록된 이메일이 없습니다.",
    activeAction,
  }
}

export const baseProfileData = createProfileData()
