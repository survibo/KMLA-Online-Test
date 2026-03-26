import { createMainFooterData } from "@/blocks/main/footer/mock"
import { createMainHeaderData } from "@/blocks/main/header/mock"

import type { MainHeaderContentFooterData } from "./types"

export const baseMainHeaderContentFooterData: MainHeaderContentFooterData = {
  header: createMainHeaderData(),
  footer: createMainFooterData(),
}

export function createMainHeaderContentFooterData(
  overrides: Partial<MainHeaderContentFooterData> = {}
): MainHeaderContentFooterData {
  return {
    ...baseMainHeaderContentFooterData,
    ...overrides,
    header: overrides.header ?? baseMainHeaderContentFooterData.header,
    footer: overrides.footer ?? baseMainHeaderContentFooterData.footer,
  }
}

