import { createMainFooterData } from "@/blocks/main/footer/mock"

import type { MainContentFooterData } from "./types"

export const baseMainContentFooterData: MainContentFooterData = {
  footer: createMainFooterData(),
}

export function createMainContentFooterData(
  overrides: Partial<MainContentFooterData> = {}
): MainContentFooterData {
  return {
    ...baseMainContentFooterData,
    ...overrides,
    footer: overrides.footer ?? baseMainContentFooterData.footer,
  }
}

