import type { MainHeaderContentFooterData } from "./types"
import { createMainHeaderContentFooterData } from "./mock"

export type MainHeaderContentFooterScenario = {
  id: string
  label: string
  description: string
  data: MainHeaderContentFooterData
}

export const mainHeaderContentFooterDefaultScenario: MainHeaderContentFooterScenario =
  {
    id: "default",
    label: "기본",
    description: "상단 header와 하단 footer를 함께 가지는 기본 shell",
    data: createMainHeaderContentFooterData(),
  }

export const mainHeaderContentFooterScenarios: MainHeaderContentFooterScenario[] = [
  mainHeaderContentFooterDefaultScenario,
]

export const activeMainHeaderContentFooterScenarioIndex = 0 // 0 ~ 0, total 1 scenario

export const activeMainHeaderContentFooterScenario =
  mainHeaderContentFooterScenarios[activeMainHeaderContentFooterScenarioIndex]

