import { createProfileData } from "./mock"
import type { ProfileData } from "./types"

export type ProfileScenario = {
  id: string
  label: string
  description: string
  data: ProfileData
}

function createProfileScenario({
  id,
  label,
  description,
  data,
}: ProfileScenario): ProfileScenario {
  return {
    id,
    label,
    description,
    data,
  }
}

export const profileDefaultScenario = createProfileScenario({
  id: "default",
  label: "기본",
  description: "정보 탭이 선택된 기본 프로필 화면",
  data: createProfileData(),
})

export const profileScenarios: ProfileScenario[] = [profileDefaultScenario]

export const activeProfileScenarioIndex = 0 // 0 ~ 0, total 1 scenario

export const activeProfileScenario = profileScenarios[activeProfileScenarioIndex]
