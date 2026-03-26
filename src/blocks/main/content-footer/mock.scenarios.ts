import type { MainContentFooterData } from "./types"
import { createMainContentFooterData } from "./mock"

export type MainContentFooterScenario = {
  id: string
  label: string
  description: string
  data: MainContentFooterData
}

export const mainContentFooterDefaultScenario: MainContentFooterScenario = {
  id: "default",
  label: "기본",
  description: "본문 영역 아래에 메인 footer가 붙는 기본 shell",
  data: createMainContentFooterData(),
}

export const mainContentFooterScenarios: MainContentFooterScenario[] = [
  mainContentFooterDefaultScenario,
]

export const activeMainContentFooterScenarioIndex = 0 // 0 ~ 0, total 1 scenario

export const activeMainContentFooterScenario =
  mainContentFooterScenarios[activeMainContentFooterScenarioIndex]

