export type ProfileActionId = "info" | "conversation" | "posts"

export type ProfileUserRecord = {
  id: string
  name: string
  student_number: number
  class_no: number | null
  grade: number | null
  phone_number: string | null
  img: string | null
  description: string | null
  status: "none" | "pending" | "accepted" | "rejected"
  room: number | null
  created_at: string
}

export type ProfileUserContact = {
  email: string | null
}

export type ProfileData = {
  rawUser: ProfileUserRecord
  rawContact: ProfileUserContact
  displayName: string
  subtitle?: string | null
  avatarUrl: string | null
  bio: string
  phoneNumber: string
  email: string
  activeAction: ProfileActionId
}
